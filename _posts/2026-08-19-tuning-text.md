---
layout: post
title: "Tuning text"
date: 2026-08-19 06:07:00
tags:
  - programming
  - automation
---

While the venerable keyboard and a good text editor are sufficient for most forms of text manipulation, there are cases where more specific tasks call for more specific hardware solutions. One such task I've found myself doing more recently is editing numerical/float values in large JSON files. I have a game engine [Junkship.net](https://Junkship.net) that has a JSON config file full of all sorts of magic numbers that control rendering, controls, world generation etc. and my engine will hot reload those values on changes to the config file. The workflow for editing these values gets pretty tedious because its mostly small increments/decrements to the values, and often there are multiple values which interact with each other and need to be edited at the same time.

So I thought to myself is there some hardware that I could use that would allow fine manipulation of numerical values as well as quick editing of multiple values in parallel? Turns out that music production has this exact same problem and has built all sorts of cool hardware solutions - namely the MIDI controller! These come in all shapes and sizes, consisting of knobs, dials, switches, buttons etc. but in my case I wanted a small device with a bunch of rotary encoder knobs (with click buttons), and after looking around for a bit I determined that the [Intech EN16](https://intech.studio/us/shop/en16?sku=grid3-en16-s&gad_source=1&gad_campaignid=23780549513&gbraid=0AAAAApOhnTeIp31unEkAYa-LnDdD7gvmT&gclid=CjwKCAjwqJXUBhBNEiwA8BgG7jvs4n7rkWvhaBYVkvNpdUt63hpiFUulq9prk4ML9y3RyU3ATL8OrBoCGp8QAvD_BwE) would be ideal for my usecase.

![The Intech EN16 MIDI controller](/assets/images/projects/knobby/intech-en16.jpeg)

Once I had it hooked up, I needed to figure out how to actually map the interactions effectively into a text editor. The method I ended up going for was to have each knobs button press 'capture' any value under the cursor that matched a int/float regex, and once captured, the knobs rotary motion would increment or decrement that value, regardless of what other edits were going on or where the cursor went after the capture, pressing the knob again would 'release' that value. Each knob can capture a different value, so its possible to edit a dozen different values via knob control at the same time. To decide what the increment/decrement value should be for a captured value, I default to the least significant power of 10 in the value e.g. when capturing 10.2, the increment value becomes 0.1. To make it a bit easier to edit the increment/decrement as well as navigating between captured values I specified a navigation knob which cycles between the next/previous capturable value in the document, and added another knob that multiplies/divides the currently captured values multiplier by 10.

I built all this into a vibe coded [Neovim plugin](https://github.com/mrsharpoblunto/knobby), which after a few tweaks worked basically the way I wanted. This is the part of the project that honestly would have probably prevented me from being bothered if I had to re-learn Lua & do it by hand, but in this case it was very quick to have a working version up & running. Below is a quick screengrab showing the editing working in action. The highlights in parenthesis represent captured values and when the values change up/down thats me using the knob controllers to bump the values.

<video controls autoplay loop muted playsinline style="width: 100%; height: auto;">
  <source src="/assets/images/projects/knobby/screencap.mp4" type="video/mp4">
  <a href="/assets/images/projects/knobby/screencap.mp4">Watch the knob-controlled editing demo.</a>
</video>
