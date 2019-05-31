#!/usr/bin/env python
#-*-coding: utf-8 -*-

import os
import json
import re

POSTS_DIR = '../src/posts/'
'''
    @key filename String 
    @key title String
    @key date String
    @key desc String 
    @key blog String 
    @key tags[] String[]
'''
class Posts():
    def __init__(self, filename):
        self.filename = filename

    def generate_header_unit(self, rowStr):
        if (rowStr[0:3] == '---'):
            return None
        row_list = rowStr.split(' ');
        if (len(row_list) < 2 or row_list[1] != ''):
            return None

        header_key = row_list[0].strip(':');
        header_val = ' '.join(list(filter(lambda x: x!= '', row_list[1:]))).strip('\n');
        '''
            title:  xxx xxxxx
        '''
        return { header_key: header_val }

    def load(self):
        content = ''
        header = dict({ 'filename': self.filename });
        isInHeader = False
        for line in open(POSTS_DIR + self.filename, 'r', encoding='utf-8'):
            if (line[0:3] == '---'):
                isInHeader = bool(1 - isInHeader);
            if (isInHeader):
                header_unit = self.generate_header_unit(line)
                if header_unit: 
                    header.update(header_unit)
            else:
                pass

            content = content + line
        self.content = content
        self.header = header
        return self.content

if __name__ == '__main__':
    posts = filter(lambda x: x.split('.')[-1] == 'markdown', os.listdir(POSTS_DIR))
    ret_list = []
    for post_name in posts:
        cur_post_obj = Posts(post_name)
        cur_post_obj.load()
        ret_list.append(cur_post_obj.header)

    try:
        out_file = open(POSTS_DIR + 'index.json', "w")
        out_file.write(json.dumps(ret_list))
        print('dump post success')
    except Exception as e:
        raise e
