---
layout: post
title: "Building an automated garden watering system with a Raspberry Pi, Node, React & HomeKit"
date: 2016-01-31 06:07:00
tags:
- raspberrypi
- react
- redux
- node
assembly_carousel:
- src: /assets/images/projects/it-gets-the-hose-again/components.jpg
  caption: Most of the components
- src: /assets/images/projects/it-gets-the-hose-again/partial-assembly.jpg
  caption: The circuit layed out and soldered onto the protoboard
- src: /assets/images/projects/it-gets-the-hose-again/partial-test.png
  caption: The test rig used to test the solenoid was activating when the software set the GPIO port values
- src: /assets/images/projects/it-gets-the-hose-again/status-assembly.jpg
  caption: The LED status light assembly
- src: /assets/images/projects/it-gets-the-hose-again/leds.jpg
  caption: The front side of the LED status assembly
- src: /assets/images/projects/it-gets-the-hose-again/completed-assembly.png
  caption: The final assembly layed out in the enclosure
- src: /assets/images/projects/it-gets-the-hose-again/closed-assembly.jpg
  caption: Everything closed up and weather proofed
webui_carousel:
- src: /assets/images/projects/it-gets-the-hose-again/schedule-mobile.png
  caption: The main schedule screen on an iPhone 5s.
- src: /assets/images/projects/it-gets-the-hose-again/menu-mobile.png
  caption: The responsive slideout menu on an iPhone 5s
- src: /assets/images/projects/it-gets-the-hose-again/settings-mobile.png
  caption: The settings screen on an iPhone 5s
- src: /assets/images/projects/it-gets-the-hose-again/schedule-desktop.png
  caption: The schedule screen on a desktop browser
- src: /assets/images/projects/it-gets-the-hose-again/history-desktop.png
  caption: The history screen showing a list of all watering events
- src: /assets/images/projects/it-gets-the-hose-again/settings-desktop.jpg
  caption: The settings screen on a desktop browser
homekit_carousel:
- src: /assets/images/projects/it-gets-the-hose-again/siri-control.png
  caption: Asking Siri nicely to turn on the water valve
- src: /assets/images/projects/it-gets-the-hose-again/eve-accessory.png
  caption: The water valve installed as an accessory into Eve
- src: /assets/images/projects/it-gets-the-hose-again/eve-accessory-config.png
  caption: Configuration for the water valve HomeKit accessory
---

![Project image](/assets/images/projects/it-gets-the-hose-again/hero-image.jpg)

##### Get the source code and schematics here
{%include github-star.html repo="it-gets-the-hose-again" %}{%include github-follow.html %}

While I've always been interested in electronics, I mainly got into software because software affords the flexibility to make mistakes. The cost of failure is low and there is room for experimentation without the risk of wrecking anything expensive (most of the time). While this is great, I always get the gnawing feeling that somehow the things I build are less real, or least less understood than building physical objects. At the very least, hacking away on a keyboard is much less romantic than hammering & soldering in a workshop with some high voltage apparatus. So for someone like myself, the appearance of low cost general purpose computers such as the Raspberry Pi has been really exciting. It lowers that cost of failure in electronics and allows a pathway for bringing things I build into the physical world.

The thought of building something that was more than just software has been eating up real estate in the back of my mind for some time now, so I finally decided that I would make my contribution to the Internet of things. As someone who has began dabbling in gardening, and has also had to weather (pardon the pun) high water costs due to Californias drought - I decided to build some sort of intelligent drip irrigation system that would only water when weather conditions required it, saving myself the time of daily watering, and also some water (and $) in the process.

The general design I came up with was to use the Raspberry Pi running a web server, this server would host a web interface and a scheduler and would control a solenoid water valve attached to the Pi. I'd place the completed device in a waterproof enclosure attached to the water supply a set of drip irrigation piping. With this in mind I put together my initial shopping list.

<br />
#### The hardware

{% include carousel.html id="assembly-carousel" images=page.assembly_carousel %}

##### The components
- 1 Raspberry Pi (Running [Raspbian Jessie lite](https://www.raspberrypi.org/downloads/raspbian/))
- 1 x 32GB SD card
- 1 24V AC Solenoid water valve
- 1 protoboard
- 3 x 3.3V LEDs
- 5 x 1.2 kOhm resistors
- 1 x 2N2222 transistors
- 1 x 1N4148 diode
- 1 x 5V relay
- 1 x 5V DC micro USB power supply
- 1 x 24V AC transformer
- 1 x plastic electronics enclosure
- 1 x outdoor extension cord
- 1 x power splitter
- 1 x USB wifi dongle

<br />
#### Controlling the switch

I decided to use a 24V AC relay as it is the most commonly available solenoid valve. This meant that I was going to need to devise some control circuitry as the Raspberry Pi runs at 5.5v and its GPIO ports can only supply 3.3v so I wouldn't just be able to hook it up directly. The way I did this was to use a relay that would activate when 5v was put across one side, this would be used as a switch to control the 24vac switch. To activate the relay I used a transistor with the base attached to one of the Raspberry Pi's GPIO ports - the 3.3v is enough to energize the base of the transistor, which would complete the circuit to ground providing the 5v across the relay, letting us switch the solenoid via a single GPIO port being on/off. The circuit diagram for this is shown below.

![The sprinkler circuit](/assets/images/projects/it-gets-the-hose-again/sprinkler.png)

<br />
#### Status LEDs

As a last minute addition I noticed that once all the components were sealed away there would be no way of knowing if it was running or what the software was doing, so I decided to add a set of 3 status LED's. One LED would indicate power, one would indicate that the server software was running, and the 3rd would illuminate when the solenoid switch was activated. The circuit diagram for this is shown below.

![Status circuit](/assets/images/projects/it-gets-the-hose-again/status-board.png)

<br />
#### Initial testing

To control the GPIO ports I used the [onoff](https://github.com/fivdi/onoff) library which makes it simple to set the state of any of the Raspberry Pi's GPIO ports. I wrote the following test script to test my initial circuit. When running it toggles GPIO port 22 once every second, which meant that once I attached the circuit above, I should hear the relay click on and off once per second like a metronome.

``` javascript
import onoff from 'onoff';

output = new onoff.Gpio(22,'out');

let value = 0;
setInterval(() => {
  value = value ? 0 : 1;
  output.writeSync(value);
},1000);

process.on('SIGINT',() => output.unexport());
```

Initially nothing worked, I found after some multimeter testing that I had soldered the pin header on backwards so none of the outputs were going where I expected them to. After filing off the notch key on the parallel cable connecting the Pi to the protoboard and plugging it in the other way, everything worked! The relay clicked happily every time I ran my test script. After determining that everything was working, and with the help of some epoxy cement, superglue, silicon sealant, and some old parts from a PC case I got everything attached securely into the plastic enclosure and added waterproof cable glands to the entry points for the power and solenoid cables.


<br />
#### The web UI

{% include carousel.html id="webui-carousel" images=page.webui_carousel %}

##### Libraries/software used
- [Node.js](https://nodejs.org)
- [ExpressJS](http://expressjs.com/)
- [React.js](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [MaterializeCSS](http://materializecss.com/)

As mentioned previously, the idea was to build a server that would run a scheduler and a web UI, so you can set up an automated schedule as well as control the device directly from a PC or smart phone. To put the web UI part of this together I used React.js, Redux, and MaterializeCSS on the front-end, and an Express based http server on the backend. With these together I was able to put together a nice responsive interface in a short amount of time. 
The most complex part of the UI was implementing the configuration interface for the weather based intelligent watering (I didn't want to water the garden if it was already raining). To do this I used the [Google maps API](https://developers.google.com/maps/) along with the [HTML5 geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) to determine the users current location when they elect to switch on intelligent watering in the settings. With this I could collect the users latitude and longitude coordinates which I could pass into the [OpenWeatherMap](https://openweathermap.org/) API to determine the weather in the users area.
In addition to the web UI I implemented a scheduler which wakes up periodically to see if the user scheduled any waterings for the current time and runs the valve for a preset interval, unless of course intelligent watering is enabled, in which case it checks if its already raining and if it is, it doesn't bother watering.

<br />
#### HomeKit and voice activated control

{% include carousel.html id="homekit-carousel" images=page.homekit_carousel %}

##### Libraries/apps used
- [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS)
- [Elegato Eve](https://itunes.apple.com/us/app/elgato-eve/id917695792)

While having an intelligent watering device with a webUI was pretty cool, I wanted to take it to the next level by adding integration with Apples HomeKit, and enable voice activated control via Siri. For this to work I needed to implement a server that implemented the HomeKit accessory protocol. Luckily theres a really good library for Node.js called HAP-NodeJS which makes this a fairly simple process. You need to feed into it some configuration information about your accessory, and provide some callbacks into the HomeKit events such as toggling the power status. The second step is that you need an app to add the accessory to your HomeKit 'home' (For some reason Apple don't provide a built in app to do this), so in order to do this I downloaded the free Elegato Eve app. I can't really speak to its quality for the more advanced HomeKit features, but its free and it did what I wanted which was to register my accessory with HomeKit, so I could use Siri to control the valve.
Adding the accessory was simple - once I had the Hap-NodeJS server running on the PI, the water valve showed up as an accessory in the Eve app which I then added to my 'home'. Once I did that I could tell Siri to switch the valve on and off, and it worked!

##### Get the source code and schematics here
{%include github-star.html repo="it-gets-the-hose-again" %}{%include github-follow.html %}


