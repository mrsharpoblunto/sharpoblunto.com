---
layout: post
title: "Silverlight redux"
date: 2008-04-16 13:04:00
tags:
- silverlight
- programming
---

After my [earlier experiments](http://www.sharpoblunto.com/News/2007/07/16/regarding-silverlight-services-and-somesuch) with the alpha releases of Silverlight 1.1 I was extremely keen to give the newly released Silverlight 2.0 Beta 1 a run for its money and port my Tarantula silverlight application from Silverlight 1.1 to silverlight 2.0. 



[![image[9]](/assets/images/news/jwVpyM_JH0iLGpwXScGyhA.jpg "image[9]")](/assets/images/news/Po0tVugPf0-riQmc7lm8WQ.jpg) 



Now This was easier said than done, not because silverlight 2.0 is difficult to work with (compared to the alphas its a breeze) but because pretty much everything has changed. 



The addition of user controls (no need to create custom text boxes anymore!) has meant that the xaml markup is a lot closer to what you'd find in WPF, with grid and stackpanel layouts, control styles, and control templates. This means that you can now separate style from structure in the xaml much more effectively and apply consistent styling to user controls. Unfortunately there is a lack of events that control templates expose, for example on mouse exit is not exposed for button templates meaning that fade out effects on buttons are not possible without custom code/markup.



Whereas before silverlight app's were deployed as a collection of DLL's and xaml files, they are now deployed into a .xap package, which is just a zip file containing the DLLs, but its a lot tidier and shrinks the download size for silverlight app's.



Web service support has drastically improved since the alpha releases. In 1.1 cross domain http requests were not allowed meaning that in order to create a silverlight mashup utilizing external web services you had to actually implement a server side web service proxy to the external services. This was a huge hassle and has thankfully been done away with in 2.0 as you can now make cross domain requests provided that your domain is permitted by their [cross domain policy](http://scorbs.com/2008/04/15/silverlight-http-networking-stack-part-2-cross-domain-communication-overview/) file. Another annoyance in 1.1 was that only JSON web services could be consumed. this has been changed and now it is possible to consume WCF and standard SOAP web services.



[![image[14]](/assets/images/news/eXo1BXrP9E23FOEf57w8kw.jpg "image[14]")](/assets/images/news/USxqeVS9x0-IYzeC44xYZA.jpg) 



The result of all these changes was that I had to pretty much rewrite all my xaml, and the back end web service code. However thanks to the wonders of the Model View Presenter (MVP) pattern, In particular the [Passive View](http://martinfowler.com/eaaDev/PassiveScreen.html) variation of MVP I didn't need to change any of my application logic. The other great thing about the Passive view pattern is that because the View can easily be implemented as mock objects ([using Inversion of control and dependency injection](http://martinfowler.com/articles/injection.html)) the controllers can be completely unit testable (though I was to lazy to implement any tests :)).



The final result is that my application is functionally identical to the original application, though it was much easier to get it all up and running this time than it was the first time, Silverlight is progressing nicely and I am looking forward to the next release. You can find my application [here](http://tarantula.sharpoblunto.com) and source code is available for download [here](https://github.com/mrsharpoblunto/tarantula)