'use strict';
/**
 * content 上下文 data后期需要挂在的数据
 */
//<link href="/static/css/main.css" rel="stylesheet">
exports.layout = function (content, initState) {
    return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link href="/main.css" rel="stylesheet">
    <style type="text/css">
        body {
            margin: 0
        }
    </style>
    <title>Eckid Blooooooog</title>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"> ${content}</div>
    <script>window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>
    <script type="text/javascript" src="/babel-polyfill.[aaa].js"></script>
    <script type="text/javascript" src="/react.[aaa].js"></script>
    <script type="text/javascript" src="/react-dom.[aaa].js"></script>
    <script type="text/javascript" src="/vendor.[aaa].js"></script>
    <script type="text/javascript" src="/app.[aaa].js"></script>
</body>

</html>
`;
};
