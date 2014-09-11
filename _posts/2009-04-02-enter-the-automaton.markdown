---
layout: post
title: "Enter the Automaton"
date: 2009-04-02 13:04:00
tags:
- dotnet
- programming
---

If you’re anything like me, you have a compulsive desire to link, network and otherwise connect every electronic apparatus in the house to every other electronic apparatus in order to create a complicated web of interconnected appliances.

The most obvious example of this is the TV-PC connection to allow me to run media center or [XBMC](http://xbmc.org/) from my PC to my TV in the lounge. While this is pretty standard stuff for any self respecting geek, the geographic distance of my PC to my TV (PC’s up stairs, TV is downstairs in the lounge) means I have to run 5 cables (5.1 surround sound is largely to blame for the cablefest) out of my study, down the stairs and across the lounge to the TV and speakers. This is all well and good, and combined with the [XBMC iPod app](http://www.appstoreapps.com/2008/09/13/xbmc-remote/) means I can control the Media center via my iPod or the infrared remote without having to go upstairs to my PC. 

However I still have to switch the monitor inputs from my usual dual monitor setup to a cloned desktop with one monitor and TV out before I can see anything on the TV downstairs. Up until now I would go upstairs and do this manually if I wanted to play anything on the computer while I was in the lounge… but obviously this will not do and in the word of infomercial protagonists from time immemorial, “There has to be a better way!”

My solution was to code my way out of this conundrum by writing a nice bit of home automation software I call “Automaton”. Its an http server that runs on my main PC and allows me to submit commands to my PC from any mobile device with a web browser (an iPod touch in my case). It uses a plug-in architecture so I can easily add more automation commands in future as I find myself getting progressively lazier.

The first command I implemented does the following, start media center (or XBMC), switch the monitor configuration to TV out, and when media center is closed revert the monitor configuration back to what it was before.

The other commands are to close the currently active application (i.e media center to revert the monitor configuration), and to shut down, or put the computer into standby. This means that as long as my PC is running I can turn on media center, turn it off and turn my PC off from downstairs… now all I need to to is find a way to turn my PC on remotely and I’ll never have to get up again (I should check out some of the iPod Wake on LAN apps for this purpose methinks)

below is a screenshot of it in action, as usual you can find the installer and source code [here](http://www.sharpoblunto.com/Apps/Index/X5VteF1EhkKbLY_INrD4Fw).

**Note:** By default the server runs on port 8086 (This can be changed in the configuration file) so to navigate to the server you should go to http://localhost:8086/

![image_thumb[7]](/assets/images/news/RL_CHAgV9kCABjFu8mBBmA.jpg "image_thumb[7]") 

Writing extra plug-ins should be fairly self explanatory (if you know c#) if you have a look at the source. but if its not, let me know :) and I’ll try to help you out.

[](http://lh3.ggpht.com/_BWKUna5vxZs/SdbxETgDNrI/AAAAAAAAAE4/j9SfSURUFyk/s1600-h/image%5B4%5D.png)