---
layout: post
title: "Mobile torrentry"
date: 2008-01-14 12:01:00
tags:
- j2me
- programming
---
After owning a motorola v3x for the better part of a year it finally dawned upon me the other day that it runs Java applications therefore because I know java (well I hadn't written any in over a year, but hey its like learning to ride a bike right?) I could write an application for my phone. Turns out it was pretty easy to do, I just downloaded the [Motorola Java ME SDK v6.4 for Motorola OS Products](http://developer.motorola.com/docstools/sdks/motorola64) which includes a plugin for the java eclipse 3.2 IDE and I was able to use the software simulator (image below) to debug and test before deploying onto an actual mobile device.  

{% include image.html src="/assets/images/news/Hlxe3ar5RUSbvYVoU5w27Q.jpg" %}

So with everything set up I needed an idea for an application, my first thought was toward some sort of remote control device for my PC, this idea eventually morphed into a mobile monitor/control for bittorrent downloads. Since my phone is capable of making http requests It would be a matter of writing or finding a server application that my phone could interact with which would in turn control the bittorrent client.  

I already have [utorrent](http://www.utorrent.com/) set up as a service on a dedicated machine, so It was a matter of finding something a way to expose utorrents functionality to the web, luckily for me utorrent has a [webUI component](http://forum.utorrent.com/viewtopic.php?id=14565) that allows you to view and control your torrents via a web page from anywhere in the world. So far, so good, but it gets even better. The webui also has an [API](http://forum.utorrent.com/viewtopic.php?pid=272592) which returns data in JSON format.  

So with utorrent and the webui all set up (heres a good guide [here](http://www.geekzilla.co.uk/View838302ED-E806-4314-AC3A-89872D6F8C9B.htm)) all I had to do was write an application which called the utorrent API and boom, remote torrent action on your mobile! Of course it was easier said than done, but on the whole J2ME was pretty easy going and it didn't take long to write the mobile client. The most difficult part was writing a J2ME compatible API for accessing the utorrent webui web services. Below are a few screenshots of the finished application.  

{% include image.html src="/assets/images/news/55c9JmCevEyzoU9YIpgUcQ.jpg" %}
{% include image.html src="/assets/images/news/JOmVYOHMF0yC7Yn1ryyTbw.jpg" %}

You can download the application [here](/downloads/utorrentmobile_bin.zip) The source is also available [here](https://github.com/mrsharpoblunto/utorrentmobile)
