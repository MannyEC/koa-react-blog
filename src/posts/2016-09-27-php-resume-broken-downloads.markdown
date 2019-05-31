---
layout:     post
title:      PHP 断点续传
subtitle:   
type:       blog
date:       2016-09-27
tags:       other
---

# PHP 断点续传

在开发中遇到一个问题，我需要提供下载的文件大小由十几MB变成了2.5G以上，原有的下载方式已经不能满足需求。

原因在于PHP在处理文件下载时，读取文件将会写入缓存，默认情况下php.ini中设置的缓存阈值memory-limit为128M。所以在较大文件进行直接读取下载时，会出现下载文件大小为0的情况。对于大文件，可以做断点续传的处理。

### Range 与 Content-Range()

Range位于用户请求头中，指定第一个字节的位置和最后一个字节的位置，如（Range：200-300）

Content-Range用于响应头，表示整个资源中实体表示的字节范围。


请求下载整个文件: 

<pre>
GET  /test.rar  HTTP/1.1
Connection:  close
Host:  116.1.219.219
Range:  bytes=0-100
</pre>

Range头域可以请求实体的一个或者多个子范围，Range的值为0表示第一个字节，也就是Range计算字节数是从0开始的

表示头500个字节：bytes=0-499

表示第二个500字节：bytes=500-999

表示最后500个字节：bytes=-500

表示500字节以后的范围：bytes=500-

第一个和最后一个字节：bytes=0-0,-1

同时指定几个范围：bytes=500-600,601-999

服务器将会返回`HTTP/1.1 206 Partial Content`，表示成功执行了范围(Range)请求。

## PHP断点续传

<pre>
function resumeBrokenDownloads($filePath) {
    set_time_limit(0);
    ini_set('memory_limit','1024M');

    if(!is_file($filePath)){
    	die("<b>404 File not found!</b>");
    }

    $filename = basename($filePath);
    header("Cache-Control: public");
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=".$filename);
    header("Content-Transfer-Encoding: binary");
    header("Accept-Ranges: bytes");
    $size = filesize($filePath);
    $range=0;

    if (isset($_SERVER['HTTP_RANGE'])){
        list($a,$range) = explode("=",$_SERVER['HTTP_RANGE']);
        $size2 = $size - 1;
        $new_length = $size2 - $range;
        header("HTTP/1.1 206 Partial Content");
        header("Content-Length: {$new_length}");
        header("Content-Range: bytes {$range}-{$size2}/{$size}");
    }else{
        $size2 = $size - 1;
        header("Content-Range: bytes 0-{$size2}/{$size}");
        header("Content-Length:".$size);
    }

    $fp = fopen("{$filePath}", "rb" );
    fseek($fp, $range);
        
    ob_clean();
    flush();
    while(!feof($fp)){
        print(fread($fp,1024*8));
        ob_flush();
        flush();
    }
    fclose($fp);
    exit();
}
</pre>

## flush()与 ob_flush()

php执行过程中，输出并非即刻执行，而是将echo或print的内容先写入buffer，当buffer满时，或者PHP执行完毕之后才会进行输出。php.ini的`output_buffering`参数用于配置buffer大小。

数据的流向为echo/pring -> php buffer -> tcp buffer -> browser。

位于buffer中的内容相当于处于一种**等待输出状态**，而`flush()`能将等待输出的内容输出到客户端。在开启了缓存的服务器环境中，脚本输出的内容进入了输出缓存中，尚未处于等待输出状态，此时用`flush()`将不会把这些内容发送到客户端，我么可以用`ob_flush（）`将其设为等待输出状态，故在服务器中`flush()`需要和`ob_flush()`配套使用。

`ob_flush()` 把数据从PHP的缓冲中释放出来,即刷新PHP缓冲区

`flush()` 把不在缓冲中的或者说是被释放出来的数据发送到浏览器。

所以当缓冲存在的时候，我们必须`ob_flush()`和`flush()`同时使用。正确使用的顺序是：先用`ob_flush()`，后用`flush()`。

另外 `ob_clean()`用于清空先前缓冲区内容。