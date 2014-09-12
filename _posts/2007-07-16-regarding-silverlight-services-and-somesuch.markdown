---
layout: post
title: "Regarding silverlight, services and somesuch."
date: 2007-07-16 06:07:00 UTC
tags:
- silverlight
- programming
---

After hearing a lot about Microsoft's [Silverlight](http://silverlight.net/Default.aspx) recently (that and the possibility of loot to be had via a Silverlight coding competition at work :)), I decided to try my hand at a bit of Silverlight development. Basically the idea was to try and build a small demo app that showed off some really wacky stuff that isn't really possible (or practical) to implement using existing web based technologies.     

I pretty soon settled on the vague idea of interacting with some sort of third party web service in order to test out Silverlight's ability to leverage existing services and visualise them in strange new ways. Once I'd decided on this I pretty quickly decided to do something with [Amazon.com](http://www.amazon.com/)'s [e-commerce API](http://docs.amazonwebservices.com/AWSECommerceService/2007-06-13/DG/) as I had had some previous experience using it. At the same time I was also fooling around with creating a game based around [swarm intelligence](http://en.wikipedia.org/wiki/Swarm_intelligence) (and since got bored of before finishing) which had me thinking about cells and networks.     

Combining these two thoughts gave me the idea of writing an application which could search over Amazon's catalogue of books and visualise the results as a group of physical nodes. The user would then be able to drill down into the nodes to find books that were similar, where similar nodes would be connected to the original node creating a visual network.     

So after coming up with the idea I looked into actually implementing it and to my dismay I found that Silverlight 1.1 was designed only to work with the upcoming Visual studio Orcas, not Visual Studio 2005. However with a bit of [jiggery pokery](http://blogs.sqlxml.org/bryantlikes/archive/2007/05/02/silverlight-hello-world-in-c-from-vs-2005.aspx) I was able to get it all running fine in Visual Studio 2005 sans the ability to debug (but my programs contain no errors anyway so that was no problem!). 

#### The web service     

Silverlight 1.1 has the ability to with asmx web services using JSON, however it (as of the alpha release) allow you to make cross domain web service calls. This meant that in order to query Amazon's services I would have to write a proxy web service sitting on the same domain that forward the requests on to Amazon then send the results back to the Silverlight client. Though this makes accessing 3rd party services more work, it is relatively painless as there is no difference in writing a Silverlight accessible web service from a standard asmx web service apart from tagging the service class with the [ScriptService] attribute.    

#### Rag-doll physics?  
Since I was going to create a visual representation of nodes and links, I thought that the whole app would function much better if everything had a physical tactile feel to it and that the nodes would self arrange in to easily viewable formations, and that meant adding... [physics](http://athome.web.cern.ch/athome/LHC/lhc.html). In the end I decided to model the system as a series of particles which repel one another (meaning that they would arrange themselves nicely on screen) and can optionally be connected by springs (for related nodes).     
I implemented this physics model using a simplified Verlet integration scheme (sounds very elaborate but its actually quite straightforward - there's a good article on implementing it [here](http://www.gamasutra.com/resource_guide/20030121/jacobson_pfv.htm)). This method used to be quite popular in the games industry for simulating cloth and rag-doll effects and was used in titles such as [Hitman: codename 47](http://au.pc.ign.com/objects/013/013441.html) before the industry moved toward more advanced techniques such as inverse kinematics and constrained-rigid-body approaches.     
A handy thing I found while developing the physics engine was that because Silverlight uses the same CLR as the full .net framework I could write the physics engine as a standard .net 2.0 class library and test it using a simple Winforms client (as I couldn't do any debugging with Silverlight) then when I was happy with it, I could import it straight into my Silverlight solution, and after changing some references from the standard .net assemblies to the silverlight assemblies it ran fine.     

#### Silverlight client      
After implementing the web service back-end and the physics model it was time to hook it all up with some Silverlight eye-candy. Due to the fact the I was working with an alpha release, there is very little in the way of user controls available. This means that unfortunately many standard components such as text boxes and buttons have to be made from scratch. In saying this though, Dave Relyea has produced a controls framework ([found here](http://blogs.msdn.com/devdave/archive/2007/05/17/silverlight-1-1-alpha-layout-system-and-controls-framework.aspx)) containing many of these standard controls and though I didn't use his framework I did use some elements of his text-box control when developing my own.     

While most of the effects found in WPF are present in Silverlight there are still a few omissions which I found to be a bit annoying, in particular the bitmap effects such as blur are not included in Silverlight which meant that I couldn't add in all the effects I had originally planned, hopefully these effects will be added in for the final release.     

On the plus side, I was impressed by Silverlight's rendering speed even at this early stage in its development, as I went out of my way to fill the whole screen up with as many shiny gradients and subtle animations as possible (in addition to the physics modelling) and it still ran along at a decent clip and was responsive to user input even on lower spec machines. 

![Untitled-3](/assets/images/news/40ai4zyT402YMYSsoqeo6w.jpg "Untitled-3") 

 
#### Not just eye candy     
In addition to the draggable books and physics already in-place I wanted to try and implement something that would at least hint at the fact the having all this rich client functionality allows developers to create experiences that are not only more attractive, but also more responsive and in some ways fundamentally different to what is possible using traditional web technologies. My attempt at this was to implement some gesture based controls into the application such that if you shook a book that was connected to another book it would break the link between them, this made it much easier to keep books you wanted on screen and delete unwanted items in a way that felt natural given the physical representation of the books on-screen. While I didn't have the opportunity to pursue further gesture based controls, It certainly would have been possible to remove almost all the buttons from the GUI and have an entirely gesture based interface. 

![Untitled-1](/assets/images/news/9sMwVn_MmUmpBbaNjlaAjA.jpg "Untitled-1") 

 
While its very debatable whether my application is useful rather than just fun to play around with, I think it does illustrate the point that Silverlight has a lot of potential to create some very interesting and powerful experiences on the web, and while there are certainly some issues present in the current releases, I can only see it getting better from here.     

If you want to check it out my app, I've got a demo [here](http://tarantula.sharpoblunto.com). If you want to take a look at the source code I've got a copy [here](https://github.com/mrsharpoblunto/tarantula) (updated to run with Silverlight)
