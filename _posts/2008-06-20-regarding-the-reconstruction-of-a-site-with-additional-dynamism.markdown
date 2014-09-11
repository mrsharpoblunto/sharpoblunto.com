---
layout: post
title: "Regarding the reconstruction of a site with additional dynamism"
date: 2008-06-20 13:06:00
tags:
- dotnet
- programming
---

Of late I've done a redesign of the home page for one of my side projects [Junkship.](http://www.junkship.net) While most of the site was simply static content that I migrated from PHP to asp.net on a new hosting environment, I did add a few new spiffy features around the sites image gallery. Because I'm not a fan of the bloated ASP.NET AJAX framework with its update panels and such, I went for a light weight approach to adding Ajax functionality (I would have liked to redo the whole site using the excellent ASP.NET MVC framework but alas my webhost only supports asp.net 2.0 sites).



![image_thumb[6]](/assets/images/news/Le0Zm2JdQ0SxEtJgGMAS1A.jpg "image_thumb[6]") 



All Ajax postbacks are done using the [prototype library](http://www.prototypejs.org) which provides a simple and clean means to make Ajax requests to the server, at which point the server renders the desired controls and sends back the html, which prototype can then inject into the page DOM to be rendered.

Returning html controls from AJAX postbacks has a few nice advantages over returning raw xml data that has to be parsed and rendered on the client through JavaScript processing. Firstly it reduces the JavaScript processing that has to be done in order to update the page, as all the client has to do is inject the html subtree into the DOM rather than build its own by picking bits from the response xml. The other nice advantage is that the control rendering only needs to be written once on the server side, not duplicated on the JavaScript side.



An issue that comes up when designing Ajax enabled pages is the issue of the browsers back button, namely the breaking thereof. For my image gallery I wanted the back button to take you back a step, but not necessarily to the previous page as you can browse between many images on the same page via Ajax calls. To make this possible I tried to write my own solution by injecting anchor tags into the page via JavaScript, which worked.... on firefox and not much else :). I decided that surely someone else must have already written such a framework, but done a better job and made it cross browser, and it turns out I was right. Its called the [RSH framework](http://code.google.com/p/reallysimplehistory/) (Really simple history) and it allows you to specify when you would like to create a snapshot of the page that you would like to return to when the user uses the back or forward buttons. You can add as many of these points as you want and there is a callback system which notifies your JavaScript of page back/forward events and allows you to restore the desired page state based on the snapshot data. It works really well in practice (though I couldn't get it to work on Safari which isn't great because I use safari a lot now on my ipod touch) and means that the page behaves as you would expect.



You can view the gallery (and my awesome artwork :)) [here](http://www.junkship.net/gallery)