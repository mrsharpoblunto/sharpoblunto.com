---
layout: post
title: "Hearing voices"
date: 2008-08-15 13:08:00
tags:
- dotnet
- programming
---
A quick post about a fun little app I wrote a few days ago (with potential to cause all sorts of awesome pranks to the unsuspecting). It allows you to remotely send text to the host computer which will then be read out on the speakers using microsoft text to speech. Its essentially just a windows service which runs an http server, to send speech you just need to make an http get request to the server url and enter the text as a query string e.g.  

http://localhost:8080?text=hello world  

The http server also accepts http POST's and assumes that the contents of the post contains the text to speak. This tool is not only useful for pranks, its easy to integrate it into notification systems i.e. broken build or code check-in notifiers.  

You can find the source for this application [here](https://github.com/mrsharpoblunto/voicenotifier)
