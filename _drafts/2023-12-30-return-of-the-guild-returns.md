---
layout: post
title: "Adventures in programmer archaeology"
date: 2023-12-30 06:07:00
tags:
- qbasic
---

I recently came across a discovery from the distant past. It didn't seem as such at first glance, just a few text files comprising a program written in an obsolete programming language, but it's not an exaggeration to say that the direction of my life and career are all a direct consequence of this programs development and presumed destruction. 

*This is a story of the recovery of a long lost project, how I got it running again, and reflections on a youth well wasted.*

It's 1998 and I'm playing Total Annihilation. Its a skirmish in the painted desert and the framerate is even slower than usual. My hard drive has started making ticking noises which are unfamiliar to me (I've internalized all the regular patterns of clicking and whirring that typically accompany my PC's regular usage). The game also begins stuttering for seconds at a time, but things are still mostly playable, so I stick with it and the pauses get progressively worse until the game finally freezes completely. I'm assuming at this point that my game is over & a few half hearted ctrl-alt-delete attempts later with no response I have no choice but to press the reset button and wait for the BIOS POST sequence. However this time the sequence is different, in the terminal I see the words: `DISK BOOT FAILURE, INSERT SYSTEM DISK AND PRESS ENTER`. Simple words, plainly stated - they were telling me that my hard drive had just failed, they were telling me that I had just lost several years of work. Saved games I could get over, but I'd lost something more than that, I'd lost the source code to my unfinished masterpiece, an RPG I'd been writing in the first and only programming language I was aware of - QBasic.

I'd been introduced to the concept of programming a year or two before by a friend. He told me there was this weird blue text editor where you could write commands and make the computer draw images and play sounds. I took a look on my windows 95 PC and sure enough, there it was, QBasic 1.1. I tried it out and despite experiencing the frustrations that I'm sure are familiar to any beginner programmer (wtf is a Syntax error?) I was hooked by the possibilities of what I saw, a blank slate upon which I could create whatever I wanted (if I was clever enough) - and what I wanted to create were games.

{% include image.html caption="A blue screen full of promise" src="/assets/images/projects/guild/startup-screen.png" %}

It didn't really occur to me previously that games or software in general were things that people actually made. From my perspective they were just there and sometimes new ones came out, and some were better than others, but the notion of someone deciding to actually build a computer game wasn't something I'd really considered. This newfound knowledge of programming changed that for me though and I started thinking through what it would take for me to create a game using QBasic. I spent enormous amounts of time in front of that blue screen, writing small demo's and projects and slowly improving to the point where it seemed feasable to do something bigger. The same friend who introduced me to QBasic in the first place shared similar interests and sensibilities, so we spent a lot of time comparing notes on how to solve programming problems and theorizing on how we could make the best game ever. This all eventually cohered into an effort to build something that my 13 year old self considered relatively achievable. It was going to be an epic JRPG with the strange and awkward name of "Guild The Return" and it was going to have a huge sprawling plot, multiple characters, and a complex battle system.

Of course as we've already covered things didn't quite pan out and Guild would never be completed, but considering how little I knew and how limited the tools available to me, I actually got quite far. I wrote the beginnings of a story and built a couple of levels where you (a red square) could walk around some basic geometric environments, talk to other characters, solve some basic puzzles, buy items, and engage in questionably entertaining combat. To speed up development I wrote a level editor which allowed me to draw out environments in a rough paint-like interface. Performance was always a problem and I would be frequently stumped by QBasic's limitations, but having near infinite time especially during holidays I could waste away days trying literally everything in the tree of possibilities until I found something that worked.

Once I was faced with the reality that all this was lost, I must admit I wasn't really saddened, it was all too sudden and brutal and left me feeling more numb than anything else. I made myself a promise that I would *always back everything important to me up in triplicate* (which I have kept), and after briefly considering rewriting everything from memory, decided that maybe it was time to move on - I'd heard interesting things from a few friends about this thing called C & C++ which were what *"real"* games were made out of. That journey continued on into what I now refer to as my career and while I've still never actually completed a game, every new attempt has taught me something.

So fast forwarding to the present, I was digging around inside my "d:\installers" folder and seeing if there was anything worth keeping. I used to use it to studiously keep copies of downloaded programs and their installers, but since the ubiquity of broadband it became basically a junkyard I hadn't looked at in years. As I was looking around I found a folder named "floppies" and remembered that before I removed the last 3.5" floppy drive from my computer I had gone through my small pile of remaining disks and dumped their contents into this folder "just in case" there was anything useful on them. I must have done this sometime around 2009, because this was after Windows 7 was released, meaning that I no longer needed to use a floppy disk drive to install software RAID drivers for Windows XP (*remember that thing about triplicate backups...*). Anyway, I never really looked at what was there at the time, so I was curious enough to take took a look inside and noticed among a bunch of fragments of old DOS games & programs along with a bunch of files with the extension ".BAS".

Those three letters are permanently etched into my brain, its short for "basic" and each file represented a QBasic program. I recognized the names of some of the programs and also saw a folder named "GUILD". Clicking into it I saw the familiar names "LEVEL0.BAS", "LEVEL1.BAS", "BATTLE.BAS", and a bunch of others. *No way this could be what it looked like*, but sure enough as I opened several of the files they contained QBasic code that despite the years still bore some familiarity and **I had to conclude that perhaps Guild wasn't lost in time after all.**

{% include image.html src="/assets/images/projects/guild/its-all-here.png" alt="A list of .BAS files" caption="Its all here!" %}

I think what must have happened is that at some point I copied Guild over to one of those floppy disks in order to take it around to my friends house to show what I'd been working on. Before access to fast internet we'd frequently pass stuff to one another via floppy disk, and I ended up having a large pile of disks of various provenance covered with scribble and crossed out names & I didn't really have any idea what was on most of them. I'm pretty sure I looked through my floppies after losing my hard drive and didn't find any recent copies of Guild, but its quite possible I just didn't check the right disks - or didn't notice one disk at the bottom of a drawer or in a school bag. That disk must have at some point found its way into my final and dwindling pile of floppies that I finally copied over before dumping them years later.

There was no way that whatever version of Guild and my other QBasic programs I had found were current with the versions that were lost in my hard drive crash, but maybe they were recent enough that a good chunk of the unfinished game was preserved. I took a look through some of the files and noticed that some of the .BAS files were corrupted (not surprising for floppies 10+ years old), but luckily all the files relating to Guild seemed to be ok so it seemed like there really was a possibility of seeing Guild running again after 25 years.

{% include image.html caption="Not everything that was copied over survived" src="/assets/images/projects/guild/corrupted.png" alt="A corrupted .bas file" %}

#### The Return of the Guild Returns - Getting it running again

Now that it was sitting right in front of me I couldn't resist trying to get it going again. However it wasn't going to be as simple as downloading [QB64](https://github.com/QB64-Phoenix-Edition/QB64pe) opening 'start.bas' and pressing 'start'.

{% include image.html caption="Not a good start" src="/assets/images/projects/guild/fail.png" alt="Guild failing to start due to a missing file" %}

It turned out I was going to have to change quite a few things to get Guild working again, but I did this with the clear principle in mind that I would try to keep the original code (no matter how terrible) and game experience as similar as possible. The one exception I made to this was where I changed one of the locations in level1 from an empty corridor to an entrance to a shop so I could show an example of the shop system running (as I never hooked it up to anything originally).

#### Getting around module size limits
The original QBasic had a 160K memory limit for a given module. I wasn't really aware of this at the time, but I found that at a certain point I was unable to run my game without getting a "Program-memory overflow" error. To fix this, my teenage self broke the game into several separate executable modules, which could be shelled out to using the QBasic `Chain` command. In order to preserve the state of the game between these modules I also had to save state in a series of temp CSV files which I would then load from the newly chained module. The rough sequence of these looked like the following.

While this worked ok running in Windows 95, on a modern version of Windows this presented a number of problems. Firstly, QB64 programs don't run in fullscreen, so its very obvious that when chaining to another executable, one window closes and another one pops up rather than appearing as a seamless transition. The other problem is that managing the state between these transitions was messy and error prone, especially as I wanted to stitch together some of the levels & systems that were disconnected in the backed up version of the game I found.

To tidy this up I decided to do some more significant refactoring, taking advantage of the fact that QB64 doesn't have these module size limits & now has an $INCLUDE statement to pull in code from other files. Because my teenage self didn't really understand how functions or subroutines worked at the time, all the code for these modules existed in the top level file scope, with global variables & goto's for flow control. This meant that it was actually pretty simple to refactor each of these modules - I could just wrap the entire thing in a function & include it from the main entrypoint!

##### level1.bas BEFORE:
```vb
Dim Shared foo '... bunch of global variables

Goto game

menu:
'... a bunch of code

game:
'... a bunch of code
```

##### level1.bm AFTER
```vb
Function level1
  Dim foo '... bunch of locally scoped variables

  Goto game

  menu:
  '... a bunch of code

  game:
  '... a bunch of code

End Function
```

For some of the more complex entrypoints like the battle system I had to convert the logic that loaded everything from a series of CSV file into some structs that could be then passed into the function. Where possible I tried to keep the variable names as close to 1:1 so I didn't need to change the code within the functions themselves e.g.

##### Battle.bas before
```vb
Dim Shared brange As Integer
Dim Shared batcash As Integer
Dim Shared turndef As Integer
Dim Shared aggressor As Integer
Dim Shared healer As Integer

Open "c:\guild\temp3.gtr" For Input As #1
Do While Not EOF(1)
Input #1 brange, batcash, turndef, aggressor, healer

'... battle system code
```


#####Battle.bm after
```vb
Type BattleContext
    brange As Integer
    batcash As Integer
    turndef As Integer
    aggressor As Integer
    healer As Integer
End Type

Function doBattle (context As BattleContext)
  '... battle system code
End Function
```

In doing some of these changes I found that there was significant amounts of duplicated code between the modules, including that level1 contained its own (mostly) copy pasted version of the battle system within it. I was able to delete this & instead call into the newly wrapped up battle system instead. Likewise the in-game menu was also replicated in each of the levels - I was able to condense this down to a single shared function.

#### Writing to the local filesystem
In DOS & old versions of Windows programs were pretty much free to write anywhere in the filesystem they felt like, as such it was pretty typical for game to write save & temp files to their own directory. However on modern operating systems programs don't usually have write access to their own directory, so I had to make some changes so that a directory could be created in the users home folder so the game could write files there instead.
Luckily QB64 has some helpers to make this relatively easy, though the exact approach is a little different between Windows and OSX.

```vb
Function getDataDir$ ()
    If InStr(_OS$, "WINDOWS") Then
        datadir$ = _Dir$("local data") + "\guild\"
    Else
        datadir$ = Environ$("HOME") + "/.guild/"
    End If
    If Not _DirExists(datadir$) Then
        MkDir datadir$
    End If
    getDataDir$ = datadir$
End Function
```

#### System speed compensation
At this point the game actually started up & I could navigate the main menu, but one thing I noticed was all the animations were playing *far* to quickly, so there was obviously some problem with the animation timings that I would have to fix.

The original QBasic (to my knowledge) had no way of sleeping for less than one second & this was a problem if you wanted to control the speed of animations or gameplay elements across different PC's. Nowadays QB64 has some commands to solve this, but my teenage self originally solved it using some busy waiting as shown below

```vb
Print "COMPENSATING FOR SYSTEM SPEED....."
second = 0
exitsleeping = 0
Timer On
On Timer(1) GoSub exitsleep 'wait for one second and break out of the loop
Do
  second = second + 1
Loop Until exitsleeping = 1
Print "DONE"
exitsleeping = 1

' to wait half a second
a = 1
Do
  a = a + 1
Loop Until a > (second / 2)
```

Unfortunately this approach didn't seem to work at all on modern machines, the busy waiting loop executed in pretty much no time meaning all animations were far too fast. I didn't look into it really closely, but I suspect the second variable was actually overflowing from being too large, resulting in the waiting loop not actually doing nearly enough iterations to slow the machine down. I ended up just ripping this code out & replacing it with QB64's `_Delay` command which takes a floating point number & can wait for intervals as small as 10 milliseconds which was fine for my usecase.

#### Interesting observations & trivia

While just playing through the game was a blast, I had almost as much fun rememberring all the little tricks and methods I'd used to make the game as well as seeing the time-capsule of my then very rudimentary knowledge of software development.

Looking back the biggest difference in learning programming in 1998 vs 2023 (even if we exclude recent developments like LLM's) was that without regular access to the internet, I was limited to what I could find out through trial and error and without information beyond the included help documentation (which was not particularly readable to someone without a formal CS education). Because of this, I often encountered issues the cause of which I didn't really understand and I would just try different things until the error went away. This built some intuition of things to avoid, but not a solid grounding of exactly why.

#### My first stack overflow

My most vivid memory of this is encountering a "stack overflow" error when navigating around the in-game menu's of my game for too long. I remember that the pattern I was using was to handle any user input, then call the menu function again - something like the pattern below

```vb
Function menu()
  ' ... render the menu
  Do
    key$ = InKey$
    Select Case (key$) {
      ' ... handle user input & change state
    }
    menu
  Loop
End Function
```

Now anyone who knows about how function calls actually work can immediately see that this is unbounded recursion and will eventually exhaust the available stack space. Of course, I didn't know anything about memory allocation or stacks, but I did eventually figure out that if you just keep calling a function without returning, you would eventually see this error, so I rearchitected the menus to something like below to avoid this problem. I also added a bunch of comments in all caps saying that `'THIS CANNOT RUN OUT OF STACK SPACE FOR ANY REASON!!!!!!`, so I was obviously proud of myself.

```vb
Function menu()
  Do
    GoSub handleInput
    ' ... render the menu
  Loop

  handleInput:
    key$ = InKey$
    Select Case (key$)
      ' ... handle user input & change state
    End Select
    Return
End Function
```

#### Handmade fonts
QBasic has a draw command, that works a little similarly to the HTML5 Canvas 2D rendering context. You can pass it a series of instructions to draw lines, set colors etc, but in the case of QBasic you pass this as an encoded string e.g. `DRAW "c9 e20 f20 l5 h15 l5 br45"` draws a capital "A". I wanted to have a consistent font I could use across the game for titles and menus, so I wrote out draw commands for each letter of the alphabet and stored the command strings in a CSV file. Then to open and draw the custom font I did the following

```vb
Open getAppDir$ + "alphabet.gtr" For Input As #1
Do While Not EOF(1)
    Input #2, a$, B$, c$, d$, e$, f$, g$, h$, i$, j$, k$, l$, m$, n$, o$, p$, q$, r$, S$, t$, u$, v$, w$, x$, y$, z$
Loop
Close #1

'To draw a word
DRAW $p
DRAW $l
DRAW $a
DRAW $y
```

Which renders as
{% include image.html src="/assets/images/projects/guild/play.png" alt="Example of my pixel font saying play" %}

#### Reducing flicker with XOR

#### Particle effects



