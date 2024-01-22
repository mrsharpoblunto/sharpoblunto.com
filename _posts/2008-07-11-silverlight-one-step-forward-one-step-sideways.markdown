---
layout: post
title: "Silverlight, one step forward, one step sideways"
date: 2008-07-11 13:07:00
tags:
- silverlight
- programming
---

I finally got around to updating my silverlight Amazon.com search engine Tarantula to work with silverlight 2 beta 2 ([see it in action here](http://tarantula.sharpoblunto.com)). This update included some relatively minor (as opposed to the wholesale changes from 1.1 alpha to 2.0 beta 1) though essential enhancements. Most of the changes that have been made have been in the area of control templates which were a bit lacking in the first beta release. The introduction of the visual state manager is great and allows for smooth transitions from one control state to another, so I could re add the nice button highlight effects present in the original alpha version of tarantula but which I had to remove in the first beta.

However the reason that I took so long to update Tarantula to work with beta 2 is that Microsoft in their wisdom decided to change the format of remoteaccess.xml files which silverlight applications will accept. To cut a long story short this means that the remoteaccess.xml files used by the amazon.com web services and many other web service providers is now incompatible with silverlight beta 2 clients, rendering those services inaccessible.

So to remedy this I had to write a proxy for the amazon.com services that was hosted on an accessible domain. However I could not be bothered writing a wrapper for the Amazon.com web services (like I did for the alpha version of silverlight) So I wrote a general purpose soap proxy component to do the work for me. 

It works as an ASP.Net httphandler and maps local proxy endpoints to their real locations elsewhere on the net. To get it working all you need to do is have an ASP.Net website that will operate as the proxy, add a few config elements to the web.config, then point the silverlight client to the proxy address, and it will all just work as if you were communicating with the services hosted on an inaccessible domain.

In addition to the usual web.config changes to add an httphandler (detailed in the instructions bundled with the soapproxy components download) I had to add the following config entry to the tarantula.sharpoblunto.com site to map the proxy end point to the real amazon service endpoint

``` xml
<soapProxyComponent>    
 <endPointMappings>     
  <mapping 
    proxyEndPoint="amazon.ashx" 
    remoteEndPoint="http://soap.amazon.com/onca/soap?Service=AWSECommerceService" 
  />     
 </endPointMappings> 
</soapProxyComponent>
```

Then in Tarantula I had to change the service endpoint in the ServiceReferences.ClientConfig to point to the proxy address instead of the real endpoint.

``` xml
<endpoint 
  address="http://www.sharpoblunto.com/amazon.ashx"    
  binding="basicHttpBinding" 
  bindingConfiguration="AWSECommerceServiceBinding" 
  contract="Tarantula.AmazonWebService.AWSECommerceServicePortType" 
  name="AWSECommerceServicePort" 
/>
```

In practice it's worked perfectly. I hope this tip comes in handy for those trying to access third party web services from silverlight beta 2 apps.
