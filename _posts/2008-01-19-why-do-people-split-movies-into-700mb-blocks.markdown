---
layout: post
title: "why do people split movies into 700mb blocks?"
date: 2008-01-19 12:01:00
tags:
- dotnet
- programming
---
For the love of god people, its 2008, I haven't burned a CD in at least 3 years, we all have hundreds of gigabytes of disk space, USB flash drives which hold multiple gigabytes, and high speed wireless LAN connections in our homes... So why is it that people still distribute movies split into 700mb blocks? who actually needs a movie to fit on a CD nowadays?  

For me one of the most annoying things in the world is for a great movie to stop halfway through, right when you're immersed in the story and atmosphere, abruptly forcing you back into the mundane drudgeries of reality to get up off the couch, trudge over to the PC, find the second movie file and hit play. Its not that its a huge inconvieniance, its just that with today's storage technology we can quite happily distribute movie files in one multiple gigabyte file, using the 700mb CD storage limit is completely unecessary.  

So anyway, whenever I get a movie split into ridiculous 700mb blocks I insist on merging them into one single file, [VirtualDub](http://www.virtualdub.org/) is a great tool for this as it allows you to do a direct stream copy and append the second file to the first without having to re-encode the video or audio streams. This turns a job that can take upwards of an hour down to a few minutes and also means there is no loss of quality in the source material.  

However I am a fan of foreign language films which more often than not come with external subtitle files (usually in .srt format) This means that if you want to merge the video files together you have to do the same for the subtitle files. The problem with this is that its a serious amount of work to do it by hand, so to ease my pain (and possibly yours) I wrote a tool which merges .srt subtitle files together. All you have to do is specify the two subtitle files to merge and also specify the first movie file (so the program knows how far to offset the subtitle timings in the second subtitle file by).  

The source for this program is available [here](https://github.com/mrsharpoblunto/srtcombiner)  

Hasta Luevo.