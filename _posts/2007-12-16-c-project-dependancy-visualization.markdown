---
layout: post
title: "c# project dependancy visualization"
date: 2007-12-16 11:12:00
tags:
- dotnet
- programming
---

Have you ever wanted a way to quickly visualize the overall architecture of a c# solution in the form of some sort of pretty diagram?    

Well I had that thought yesterday, and figured that there must be some free tool out there that can take a solution file or directory and build a graph of all the underlying project files and dependancies. However to my dismay I found that there were no such tools (or they were commercial products or were completely over the top for what I wanted) so I decided to roll my own :)     

The end result is an app which builds a graph of all the projects and dependancies in a directory (plus its subdirectories) as well as the relative sizes of those projects. In addition the graph is fully moveable by the mouse and all the nodes and points behave with realistic physics (I reused my Tarantula physics engine developed [a while back](http://www.sharpoblunto.com/News/2007/07/16/regarding-silverlight-services-and-somesuch))     

{% include image.html src="/assets/images/news/1d0EXdJnSke-6EEOmgNF7g.jpg" alt="dependancyAnalyzer" %}

The app is written in c# 2.0 and is available in binary or source code form (under the conditions of the MIT license)     

Download the source [here](https://github.com/mrsharpoblunto/dependancyanalyzer)
