---
layout: post
title: "Exponential routine maintenance"
date: 2009-06-20 13:06:00
---
While its true that the things you own end up owning you. In my case its much more a case of the things I create end up owning me. The more apps, websites and samples I put up online, the more time I have to spend updating those apps and making sure old posts still have the right links as I move files around on my sites.  

Case in point I was recently looking over my ftp server logs and noticed a whole bunch of requests to non-existant yet very familiar sounding filenames. It turns out that I used to host most of my files on my home ftp server, but I've since shifted my files to apps.junkship.org but had neglected to update any of my old blog posts to point to the new files (I've since fixed all those links btw).  

I also had to update [Tarantula](http://tarantula.nudecoder.com) following amazon.com's announcement that all Amazon Advertising API calls (formerly Amazon ECS API) calls will require authentication as of August 15th 2009. This meant that I had to remove the old web services code and replace it with signed calls to the REST API (Silverlight and Amazon's SOAP API don't play nice anymore).  

As an aside, Amazon's API requiring authentication is kind of a blow to open source apps that use it as to authenticate a request you need to include both your AWS ID aswell as your AWS secret key (which you are not supposed to share with anyone). This is obviously not possible in an open source app, or a desktop client application for that matter as it is possible for malicious users to get a hold of your secret key by dissasembling your binaries.  

my apps site has also undergone a minor upgrade, mainly to improve performance and fix some long-standing bugs, but I've also added digg submission buttons for all the apps on the site.  

[www.junkship.org](http://www.junkship.org/) has also undergone some improvements, namely the [image gallery](http://www.junkship.org/gallery/) which now uses [jquery](http://jquery.com/) and [json.net](http://james.newtonking.com/pages/json-net.aspx) to do some fancy AJAX goodness.  

hopefully thats enough to keep things from falling apart for the near future.   