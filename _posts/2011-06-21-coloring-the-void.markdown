---
layout: post
title: "Coloring the void"
date: 2011-06-21 10:06:45
tags:
- ramblings
- programming
---

Things are happening over at [junkship.net](http://www.junkship.net) for the first time in a long time (Well they will be soon!) I've finally got my homebrew game development framework (MGDF) to the point where I think I can release it (as an alpha) and more importantly actually start building a game on top of it. 



MGDF is a framework built to focus on a couple of areas that I feel are neglected in most existing frameworks, in particular ease of distribution, updating, and ensuring all the boring but useful stuff gets done properly (logging, initializing DirectX, error reporting etc.) To achieve this, MGDF acts as an IOC ([Inversion Of Control](http://en.wikipedia.org/wiki/Inversion_of_control)) container that loads up your game logic and calls into it at appropriate times during the rendering and game simulation loops (Render, Update, Save, Load, etc.) The advantage of this approach is all the audio, input, file-system, and DirectX rendering objects are set up by the framework. All you have to do is provide the code which actually handles the game logic and rendering (the fun stuff!)



MGDF games are distributed as .mza files which are effectively zip files containing the game logic, the game content (in the form of compiled c++ dll’s), and some metadata that the framework needs. These packages can be published online to an MGDF game source (An online MGDF game repository) which allow users to download the game, and will allow the framework to check for and download updates for that game. Anyone can host or run a game source, and it uses a JSON API to allow easy interoperability and the ability for alternative game source implementations to be written (The reference implementation is written in ASP.NET). 



As a developer, pushing out updates to your game is just a matter of uploading the newer version to the online game source (you can also create update packages which contain only the differences between existing versions to allow for smaller update files). For developers wanting to publish non-free games the Game Source API has in built security controls that allow you to restrict access to certain game downloads to a set of authorized users (There are no forms of DRM built into the framework though, and there never will be :)) 



MGDF also has an optional statistics collection service (which is entirely opt-in by the end-user) which allows developers to collect statistics information on how users play their games. These statistics services also use a JSON API and can be hosted by anyone (there is no centralized stats tracking... no phoning home)



Its all pretty raw at the moment, and while there is a very basic SDK with a few docs that I've included, its all very much alpha software. I intend to use MGDF in my upcoming projects, and if there’s any interest by developers out there, I'll develop the SDK further. MGDF is released under the [MIT license](http://en.wikipedia.org/wiki/MIT_License#License_terms) and the source code can be downloaded from [github.com](http://www.github.com) (see [www.matchstickframework.org](http://www.matchstickframework.org) for more details)



So anyway, after winding our way through the ins and outs of MGDF, back to the original news - the changes over at junkship.net. As you may or may not know Junkship is a project that some friends and I had been working on on and off for some time, though for various reasons there was never really any concrete progress made. However, now that MGDF is in a workable state, it is now my intention to give Junkship a bit of a reboot and actually start some proper development. The main change is that the game is going to have less focus on a pre scripted story and be more heavily based on crafting, procedurally generated content, and hopefully multiplayer. I guess this reflects both my own changing taste in games, but also a sense of pragmatism as to what a small indie team is capable of accomplishing. 



Anyway if you want to know more I will be writing up more details on the junkship.net blog, which I plan to use more as a dev-diary from now on (I guess I should also give the Junkship site an bit of a revamp as the content is pretty out of date). Rants and non Junkship stuff will still be posted here though :) 