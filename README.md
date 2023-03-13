# Blog
A home for my blogs.

## Table of Contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [How to Use](#how-to-use)
+ [Demo](#demo)
+ [Features](#features)

## General Info
This project is one of two frontends of my blog website project. My complete blog website project consist of three parts, one backend that serves APIs for my blog and two different front-ends for accessing and editing my blog posts. This frontend site is for people that want to read and comment on my posts.

## Technologies
+ React
+ React routers
+ JWT (Json Web Token)
+ APIs

## Setup
This project depends on APIs from another project. So you need to setup that project first in order to run this project. Go to 
[blog API](https://github.com/Tanishka-2000/blog-api) to setup that. Once that done, to run this project locally

```
# clone this repository
git clone https://github.com/Tanishka-2000/blog-website.git

# Go into the repository
cd blog-website

# Install dependencies
npm install
```

## How to Use
You need to change the url used to fetch data in home.jsx (line 7) and post.jsx(line 7, 13, 28) to the url on which you serve your blog APIs (example: http://localhost:5173/) and suffix the url with request specific route (example: http://localhost:5173/api/posts).

```
# Start the site
npm run dev
```

## Demo
Here is the working live demo [https://tanishkablog.netlify.app/](https://tanishkablog.netlify.app/).

## Features
+ Home page show a list of all blogs.
+ Loading animation works in case of delay.
+ Read any blog by clicking on 'view more' button.
+ Each blog load on new route.
+ On each blog, you can post new comments and read other comments.\
+ Whole blog website is completely responsive.