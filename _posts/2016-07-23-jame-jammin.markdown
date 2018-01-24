---
layout: post
title: "Come on and Slam and welcome to the (game) Jam"
date: 2016-07-23 06:07:00
tags:
- gamedev
- webgl
- javascript
---

![Project image](/assets/images/projects/block-explorer/hero.jpg)

##### [Play the game here (Chrome recommended)](/projects/block-explorer/)

##### Source code
{%include github-star.html repo="webgl-starter" %}{%include github-follow.html %}

As part of work I recently had a chance to participate in a 3 day game-jam. In the past I've always steered clear of game jams because the ideas I'm usually interested in building have no way of being realized within the time limits. This time however I decided to give it a shot and decided to build a 3D game in the browser using webGL.

The initial idea revolved around driving a robotic rover that could transition from multi-legged movement into a crazy monowheel (inspired by a [desert spider](https://www.youtube.com/watch?v=brh8Fv7Lw9M) that does backflips to evade predators).

![Mono-wheel](/assets/images/projects/block-explorer/mono-wheel.jpg)

I didn't really have many gameplay ideas in mind other than trying to make it a fun and satisfying experience to just cruise around and get used to the weird locomotion mechanics. I figured if I got as far as having terrain generation working and a competent third person camera set up by the end of the jam that I would have exceeded my expectations.

With this in mind, I put together a nice WebGL starter framework based on the Component Entity System pattern - the really great thing about this pattern is that it completely separates state from logic - meaning that with the help of [Webpack](https://webpack.github.io/), one can implement hot reloading of all game logic while the game is running (without resetting the current game state). This is really cool and makes it easy to iterate on systems and effectively build the game while it runs. Check out the GitHub repo if you're interested in finding out more.

Now that you have an idea of what I wanted to build, and how I went about building it - check out what I actually ended up building, subject to the constraints of time. While its not the most fun game in the world, I'm happy with how it turned out and I have a new appreciation for the effort it takes to convey a fun sense of motion through controls, physics, and a camera.

I had so much fun building the game, that I'm considering starting work on the procedural mad-max-meets-kerbal-space-program-on-a-road-trip sim I've been thinking about for a while. I think it would be really cool to build a fully fledged game in the browser, with all the inherent advantages in rapid development that javascript & the browser offer, combined with all the performance problems that come with it that need to be overcome.

NOTE: So while the code started out nice and clean, over the course of 3 days of hacking it became a garbage fire of TODO's and HACK's, so I won't be posting the source up until I have a chance to clean it up :)





