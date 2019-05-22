#!/usr/bin/env python
#-*-coding: utf-8 -*-
import os

POSTS_DIR = '../src/posts/'

class Posts():
	def __init__(self, filename):
		self.filename = filename

	def get_content(self):
		with open(POSTS_DIR + self.filename, 'r') as f:
			self.content = f.read()
		return self.content

	def get_description(self):
		return self.get_content()

if __name__ == '__main__':
	posts = filter(lambda x: x.split('.')[-1] == 'markdown', os.listdir(POSTS_DIR))
	for post_name in posts:
		cur_post_obj = Posts(post_name)
		print(cur_post_obj.get_description())