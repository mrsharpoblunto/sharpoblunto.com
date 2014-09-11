---
layout: post
title: "Since we last spoke"
date: 2012-11-04 22:11:36
tags:
- dotnet
- MGDF
- programming
---

I wrote recently on junkship.net about [porting Junkship to use DirectX 11](http://junkship.net/News/2012/11/04/porting-to-directx-11-a-code-odyssey). In order to do this I also had to port my game framework MGDF to use DirectX 11 as well. I’m happy to announce that the latest MGDF SDK is now available from [matchstickframework.org](http://www.matchstickframework.org/) (you can also [download the source from GitHub](https://github.com/mrsharpoblunto/MGDF) if you’re so inclined). In addition to DX11 support to this I added a whole bunch of fixes and new features including:



*   An improved Save game API that makes it impossible to corrupt existing save games if a save fails partway through.
*   An upgraded input system using RawInput for mouse and keyboard input
*   Now using JSON for all configuration files
*   Game updates now specify when they want to upgrade the base framework version (framework updates are no longer centralized – each game decides for itself what framework version it wants to use)
*   MSAA settings are now split into two separate settings, the back buffer MSAA level, and the recommended render target MSAA level. This allows more flexibility for applying MSAA specially when doing post processing effects.  



NOTE: The old DirectX 9 version is still on GitHub but on the DX9 branch of the MGDF repo. This version is now deprecated and will not receive any further updates.



In other news, twitter announced a few months ago that with the release of their 1.1 API that the 1.0 API is officially deprecated and will be shut off early next year. In addition to this all requests to the new API have to be signed using oauth 1.0. In order to ensure that the twitter control above continues to work I had to update the code to use the new API and to generate signed requests. In doing so I wrote a small C# library to generate signed requests to the twitter API, its [available on GitHub](https://github.com/mrsharpoblunto/TwitterAuth) for anyone who’s interested in checking it out. Using the library is pretty straightforward as shown in the example below.

{% highlight c# %}
//use your real Twitter API tokens here
string consumerKey = "XXX";
string consumerSecret = "XXX";
string accessToken = "XXX";
string accessTokenSecret = "XXX";

TwitterAPI api = new TwitterAPI(consumerKey,consumerSecret,accessToken, accessTokenSecret);

//generate a signed http get request for the specified twitter API URL
HttpWebRequest signedRequest = api.GenerateSignedGetRequest("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=mr_sharpoblunto");

//you can now use the signedRequest object to query the twitter API
HttpResponse = (HttpWebResponse)request.GetResponse();
{% endhighlight %}

I also took the liberty over the last couple of months of moving the source code for most of the apps hosted on this site (along with some other random bits and pieces) over to GitHub. They range from a Lua based web MVC framework prototype, to remote automation servers, to website monitoring tools. Check out my [GitHub page](https://github.com/mrsharpoblunto) if you’re interested.
