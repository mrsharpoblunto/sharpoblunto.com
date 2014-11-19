---
layout: post
title: "Carlos the Jekyll"
date: 2014-11-19 06:07:00
---

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
