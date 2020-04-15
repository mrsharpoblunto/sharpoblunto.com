---
layout: post
title: "Redundancy"
date: 2020-04-15 09:51:00
tags:
- programming
- automation
- openwrt
- networking
---

So like most people at the moment I'm stuck at home as part of the ongoing quarantine for Covid 19 & thankfully I'm fortunate enough to have a job where I can work from home. Unfortunately having most of the neighborhood at home streaming, video-calling, and also working from home during the day is wreaking havoc with the local internet infrastructure and my ISP is not coping well with the added load. This has resulted in multiple several-hour dropouts of my connection and several days of work time effectively lost. Now with that said, I do have a backup connection in the form of my iPhones LTE connection which I can connect through using its wifi hotspot - but it's limited in how many devices can connect to it concurrently & its also a pain to have to manually connect on every device that may need to access the internet during that time (especially home automation devices where switching WIFI is a pain).

So I decided to see if I could set up my home network with an automated failover system that would (in normal circumstances) have my main router use my cable internet as its WAN connection & then when that drops, have my router connect as a client to my phones WIFI hotspot and use that as its WAN connection. Also importantly I wanted to do this cheaply and not have to purchase any expensive enterprise networking hardware.

![Client bridge Dual WAN](/assets/images/projects/wifi/bridge-1.jpg)

After investigating it turns out that my [router](https://www.amazon.com/Dual-band-Dual-core-AiProtection-Compatible-RT-AC86U/dp/B0752FD3XJ/ref=sr_1_2?crid=8FNTIGG3MTUX&dchild=1&keywords=ac86u+router&qid=1586967898&sprefix=ac86%2Caps%2C216&sr=8-2) does support Dual WAN failover, but it can't connect to another WIFI network in client bridge mode to share the connection (well maybe it can with a different firmware like [DD-WRT](https://dd-wrt.com/) but I'm happy with the [AsusWRT Merlin](https://www.asuswrt-merlin.net/) firmware I'm running, so I didn't check). So I started looking around for a device that did support client bridge mode and came across this cheap [TPLink travel router](https://www.amazon.com/TP-Link-Wireless-Travel-Router-TL-WR902AC/dp/B01N5RCZQH/ref=sr_1_1?dchild=1&keywords=tplink+902ac&qid=1586968465&sr=8-1), you can pick one up for $35 and in addition to solving my main problem, its also a handy device to take with you when travelling for sharing WIFI & hotspot connections etc.

![Client bridge Dual WAN](/assets/images/projects/wifi/bridge-2.jpg)

However once I actually got my hands on one I found a problem. For whatever reason, the stock firmware doesn't work in the configuration I wanted. I set up the dual WAN on my Asus router & set the TPLink up to connect to my phones hotspot - but the Asus couldn't get a DHCP lease from my phone and nothing connected to the Asus could access the WAN. I played around with all the settings I could, but couldn't get it to work - so I decided to ditch the stock firmware on the TPLink and install [OpenWRT](https://openwrt.org) instead to see if I would have any more luck. Getting OpenWRT installed was a bit quirky, but ultimately not too difficult - you just need to follow the [instructions here](https://openwrt.org/toh/tp-link/tl-wr902ac_v3).

Once I had OpenWRT up and running I had to set up two network interfaces. A bridged LAN that runs on the 5GHz radio and the ethernet port, and a WAN that runs on the 2.4GHz radio. Once that's set up you just need to set up the 2.4GHz wireless to connect in client mode to the hotspot (and I also set up the 5GHz wireless as an access point to my existing WIFI network).

![WIFI interfaces](/assets/images/projects/wifi/interfaces.jpg)
![WIFI](/assets/images/projects/wifi/wifi.jpg)

Finally the TPLink has a slider switch that allows you to switch 'modes' (i.e. access point, ethernet sharing, hotspot) when using the stock firmware - this is a useful feature but doesn't work out of the box with OpenWRT, but since I only want the 5GHz radio running as an access point when I'm travelling (I already have good coverage at home with my existing router, so I don't need the extra access point) - I wanted to be able to switch this on/off without having to log into the configuration UI. To do this there's an open source package called [openwrt-slide-switch](https://github.com/jefferyto/openwrt-slide-switch) which adds support for this. To install I needed to enable SSH on the TPLink and once logged in run:


```
opkg update
opkg install slide-switch
```


You then need to configure the actions to take when the slide switch mode is changed. To do this, you need to add a couple of files into /etc/rc.button (and make sure they are chmodded to +x). The README on the github page above has all the details, but I ended up adding two 'modes' - one which enables the 5Ghz access point, and one which disables it.


*/etc/rc.button/mode-ap*
```
#!/bin/sh
[ "${ACTION}" = "pressed" ] || exit 0
uci set wireless.@wifi-device[1].disabled='1'
uci set wireless.@wifi-iface[1].disabled='1'
uci commit wireless
wifi
return 0
```


*/etc/rc.button/mode-share-hotspot*
```
#!/bin/sh
[ "${ACTION}" = "pressed" ] || exit 0
uci delete wireless.@wifi-device[1].disabled
uci delete wireless.@wifi-iface[1].disabled
uci commit wireless
wifi
return 0
```


With all this configured if my main internet connection goes down, I just need to enable my phones wireless hotspot and the TPLink will connect and automatically bridge the connection to all devices in the house until the main connection comes back online again.
