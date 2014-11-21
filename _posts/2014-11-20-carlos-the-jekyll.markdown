---
layout: post
title: "Carlos the Jekyll"
date: 2014-11-20 06:07:00
---

I recently decided to shift a bunch of my websites (http://sharpoblunto.com, http://junkship.net, http://matchstickframework.org) over from my ancient home built asp.net based framework to something a bit more reliable and low maintenance. I didn't really want to put a huge amount of effort in to port the sites over, so that cut out options that would involve learning whole new languages and frameworks. Also after looking over what my requirements were it pretty quickly became apparent that I didn't really require any dynamic functionality that couldn't be covered via client side javascript. Because of this it seemed like a static site generator would be the way to go - I already had the front-end html templates from the existing sites, I would just have to adapt them to whatever I chose.

After a quick look around [Jekyll](http://jekyllrb.com/) emerged as the most suitable solution, helped in part by the fact that one can host Jekyll powered sites for free on [GitHub](https://github.com/) using a custom domain name. Porting over the asp.net MVC view files to Jekyll templates was pretty straightforward (If your curious how it all looks, this sites source is available [here](https://github.com/mrsharpoblunto/sharpoblunto.com) on GitHub) 

The most time consuming job was transferring the content of my old blog archive database (where all the blog content was stored as html) and converting it to markdown that could be rendered by Jekyll. The first step was to write a bit of c# to dump each database post row into a file. Then I needed to convert the html to markdown; to do this I wrote a Node.js script based on the [to-markdown](https://github.com/domchristie/to-markdown) package to convert the html archive which I've included below.

{% highlight javascript %}

var toMarkdown = require('to-markdown').toMarkdown;
var fs = require('fs');

function processFile(file) {
    fs.readFile(file,"utf8",function(err,data) {
        var md = toMarkdown(data);

        fs.writeFile(file,md,function(err) {
            console.log('processed '+file);
        });
    });
}

fs.readdir('.',function(err,files) {
    for (var i = 0;i < files.length; ++i) {
        if (files[i].indexOf(".markdown") > 0)
            processFile(files[i]);
    }
});

{% endhighlight %}

Its weird how technology sometimes circles back on itself, some of the very first websites I ever built were static html, and now in 2014 I've ditched server side code and databases in favour of static html again. I guess it goes to show that sometimes the simplest solutions are often the best.
