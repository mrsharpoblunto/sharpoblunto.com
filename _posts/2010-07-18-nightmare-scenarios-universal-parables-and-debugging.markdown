---
layout: post
title: "Nightmare scenarios, universal parables, and debugging"
date: 2010-07-18 03:07:38
tags:
- ramblings
- programming
---

Do you ever get the feeling that you are a subject in some sort of roundabout moralistic parable that is designed to encourage humility and patience in others? For me the most probable cause for this mindset is when a seemingly reasonable task becomes unreasonably complicated and that in finding a solution for the said task I have forced to become a more rounded, knowledgeable, and enlightened individual. Often in these cases, the cause of the problems is due to someone else’s laziness which further enforces the feeling that the moral of the story is that in a greater cosmic sense, slacking off will only create more work for others, in some form or another, at some point in the future.



Changing tack slightly, I find the worst thing about developing a large piece of software is the nagging feeling that somewhere in the core foundation of your application is a subtle design problem that is going unnoticed (Be it a performance issue, or a platform issue, or simply an incorrect assumption as to what is and isn’t possible) and that at some point in the future it is going to rear its head as a unsolvable problem that is going to render the entire application as a worthless piece of junk. Its more an unfounded nightmare scenario because thinking rationally, I can quite quickly evaluate the probability of this happening as remote. The reason being that up until now I have never experienced such an issue, and in the end every bug I’ve ever had in software was solvable or could be satisfactorily worked around. However, just because something hasn’t happened yet doesn’t mean that it can’t happen.



Now to subtly link the two previous ideas together in a thrilling conclusion filled with sage wisdom, I get onto the problem I had today. I was finding that my game engine was taking over 30 seconds to load when using the Visual Studio 2008 debugger. Of course this made debugging an incredibly frustrating exercise in tedium, and because this is a project that I work on haphazardly in my spare time I wasn’t sure it this was a new issue, or if the engine had simply been getting slower and slower and I had just never noticed. This was this as an incarnation of the nightmare scenario, was my game engine just a slow and bloated piece of shit? Well thankfully no (not yet at least anyway). It turns out that having a bunch of break points set (possibly old invalid ones etc…) causes visual studio to hang for an arbitrarily long time until it gets its shit together and actually loads the program for debugging. Why it does this… no idea (though it reeks of slack coding), but the solution turned out to be simple. Click Debug-&gt;Clear all breakpoints and voila, the engine loads up in less than a second.



The ironic thing is is that in wrapping both the problem and solution for this issue in a pile of worthless prose, I have effectively made it much harder for anyone else who is looking for a simple solution to find it, and hence I am perpetuating the very feelings of frustration I was complaining about earlier. A sobering thought indeed, but for better or worse its written now, what would be the point of deleting it?