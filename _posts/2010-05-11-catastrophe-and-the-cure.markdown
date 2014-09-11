---
layout: post
title: "Catastrophe and the cure"
date: 2010-05-11 08:05:17
---

Sometimes it happens that the universe gives you a heads up before it decides to fuck with your proverbial shit. Case in point, a few weeks ago I decided to check up this website to make sure everything is still ticking along, but as happens from time to time code atrophies and the home page was displaying my unhelpfully worded error page. Nothing major that an app pool recycle didn’t fix, but it got me to thinking… I really have no idea when my sites are up or down, and that perhaps this was a bad thing.



So naively I thought there would be an abundance of simple command line apps that poll a website and send an email if anything is amiss, but much to my chagrin there was nothing but cheap crapware and online subscription garbage, so I had to go DIY on the issue. The result can be found [here](https://github.com/mrsharpoblunto/websitemonitor). It runs on my home serve and polls my websites every 15 minutes or so and sends out a panic email if anything is wrong (i.e a non 200 http response, the presence of unexpected content, or required content being missing). Its configurable etc. but its pretty raw and simple as I didn’t want to spend a whole lot of time on it.



Then as fortune would have it, one day after setting this up my webhost experienced a major database issue and the site went offline, and lo! I got an email telling me such, so that I could write emails of self righteous fury and indignation.
