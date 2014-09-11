---
layout: post
title: "Getting a tolerable windows command line"
date: 2014-04-01 16:04:17
tags:
- ramblings
- programming
---

After being spoiled with the power of the command line and all the great text based tools on OSX and Linux it can be hard when one comes back to windows to be presented with the default windows cmd prompt in its full archaic glory. The good news though is that with a bit of messing around it is possible to get a halfway decent command line experience on windows. Below is a screenshot of my current command line setup which looks and behaves very similarly to my iterm2 setup on OSX. If you follow the instructions below, this too can be yours.



[![image](/assets/images/news/rb-eKHqOjEur9TFBC7I-ug.png "image")](/assets/images/news/oCBGFVBg80eeIhslXMiJGQ.png)



First install Clink ([http://mridgers.github.io/clink/](http://mridgers.github.io/clink/)). Clink offers bash style rich completion and history and integrates directly into the default windows cmd prompt. This goes a long way toward making the navigation experience easier.

Next Install Conemu ([http://code.google.com/p/conemu-maximus5/](http://code.google.com/p/conemu-maximus5/ "http://code.google.com/p/conemu-maximus5/")). Conemu provides tabbed/split pane console windows with customizable color schemes and layouts. In my case I use the solarized theme and choose to hide the default tab bar and status bar for a minimalist view. I also add a little transparency to the windows to help see the contents of windows underneath the command prompt.

Now to get some decent command line tools to use in our shiny new terminal interface. To do this we will Install the chocolatey package manager ([http://chocolatey.org/](http://chocolatey.org/ "http://chocolatey.org/") – Powered by Nuget, its basically apt for windows). Run the following powershell command to install chocolatey
  <pre>@powershell -NoProfile -ExecutionPolicy unrestricted -Command &quot;iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))&quot; &amp;&amp; SET PATH=%PATH%;%systemdrive%\chocolatey\bin</pre>

Now we’re going to install some packages containing some windows ports of some useful Unix tools. Firstly we never want to use notepad.exe again so lets install vim instead. Run the following command to install vim using chocolatey

<pre>cinst vim</pre>

In order to be able to use the standard Unix command line nomenclature such as 'ls' instead of 'dir' we are going to have to install some Cygwin packages. To do this we need to install some more chocolatey packages

<pre>cinst cyg-get
cyg-get default
cinst wget
cinst curl</pre>

You can also install openssh if you don't want to use PUTTY for ssh into your OSX/Linux machines

<pre>cyg-get openssh</pre>

Feel free to customize things further to your hearts content. This setup works for me, but I’m sure there's a multitude of tweaks and tools out there which could make it even better.