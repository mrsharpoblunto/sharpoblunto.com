---
layout: post
title: "The Dukebox of Hazzard, open source at last"
date: 2013-07-01 02:07:24
tags:
- dotnet
- dukes
- programming
---

The Dukebox of Hazzard (Dukes) is a media player built around the idea of fair and equal access – in particular those situations where there is only one set of speakers in a communal space, and multiple people who want to be able to play their music. Dukes is designed to prevent people cutting other peoples tracks off partway through (by design there’s no way to skip tracks), and ensures that all users get an equal chance to hear their music by running through a round-robin of all the users who have submitted tracks for playing.

I built Dukes about 2 years ago so my colleagues and I could play music in the office without getting into arguments, and it proved to work really well. We still got into terrible arguments over whatever nu-metal/80’s power ballad/[drone doom](http://www.youtube.com/watch?v=p34zA9wTRig) tracks some people were into, but Dukes ensured that no one had the power to shut anyone’s picks off the air.

Dukes consists of a C# application that indexes media on the host machine as well as running a standalone HTTP server that runs the players web UI. All the indexed music metadata is stored in a small [SQLite](http://www.sqlite.org/) database, the music player uses the [FMOD audio library](http://www.fmod.org/), and the web UI communicates with the Dukes server using a set of JSON API’s.

The only problems with Dukes were that the UI was pretty terrible, and due to the fact that it was a tool used in-house primarily be software developers, it was very much left in a *it works on my machine* state. I always intended to open source the app, but really wanted to file off some of those rough edges before I did so. So this weekend I did just that, I ripped out the old web UI and replaced it with a shiny minimalist UI based on [Bootstrap](http://twitter.github.io/bootstrap/) along with some help from [Handlebars.js](http://handlebarsjs.com/).



[![image](/assets/images/news/QI7spVXBcUuCN3fX4YYlqw.png "image")](/assets/images/news/FNxB69HWq0yr4WHyq3G4UQ.png)



I also ripped through the server side c# code and gave everything a good polish, which consisted of fixing a bunch of incorrect concurrency handling, and removing a pile of half baked unnecessary features. I also wrote an [NSIS](http://nsis.sourceforge.net/Download) installer script so that people can now easily install Dukes on their own machines.



[![image](/assets/images/news/sE5Kx_uV00-WEoZMUxLHKg.png "image")](/assets/images/news/8OmFhFFnuEmcHlGRDa667w.png)



You can get the source for Dukes [here on GitHub](https://github.com/mrsharpoblunto/dukes), or if you want you can download the installer from [my projects page](/projects#dukes). 

You might also have noticed that this site looks a little different as well – In addition to polishing up Dukes, I also went Bootstrap crazy and redid the skin for this site. The big plus from doing this is that the site now looks pretty nice on mobile devices without having to go through all the pain and suffering of having to build properly responsive CSS from scratch. Its definitely a simpler, and cleaner design than I had before, and hopefully its not too generically bootstrap’ish looking.
