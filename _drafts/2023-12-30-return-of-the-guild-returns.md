---
layout: post
title: "Adventures in programmer archaeology"
date: 2023-12-30 06:07:00
tags:
- qbasic
---

I recently came across a discovery from the distant past. It didn't seem as such at first glance, just a few text files comprising a program written in an obsolete programming language, but it's not an exaggeration to say that the direction of my life and career are all a direct consequence of this programs development and presumed destruction. 

*This is a story of the recovery of a long lost project, how I got it running again, and reflections on a youth well wasted.*

It's 1998 and I'm playing Total Annihilation. Its a skirmish in the painted desert and the framerate is even slower than usual. My hard drive has started making ticking noises which are unfamiliar to me (I've internalized all the regular patterns of clicking and whirring that typically accompany my PC's regular usage and what I'm hearing is something new to me). The game also begins stuttering for seconds at a time, but things are still mostly playable, so I stick with it while the pauses get progressively worse until the game finally freezes completely. At first annoyed, then slightly anxious I conclude at this point that my game is over & a reset will probably be required. A few half hearted ctrl-alt-delete attempts later with no response I have no choice but to press the reset button and wait for the BIOS POST sequence. However this time the sequence is different, in the terminal I see the words: `DISK BOOT FAILURE, INSERT SYSTEM DISK AND PRESS ENTER`. I didn't know what this meant yet, but I'd find out soon enough - they were telling me that my hard drive had just failed, they were telling me that I had just lost several years of work. Saved games I could get over, but I'd lost something more than that, I'd lost the source code to my unfinished masterpiece, an RPG I'd been writing in the first and only programming language I was aware of - QBasic.

I'd been introduced to the concept of programming a year or two before by a friend. He told me there was this weird blue text editor where you could write commands and make the computer draw images and play sounds. I took a look on my windows 95 PC and sure enough, there it was, QBasic 1.1. I tried it out and despite experiencing the frustrations that I'm sure are familiar to any beginner programmer (wtf is a Syntax error?) I was hooked by the possibilities of what I saw, a blank slate upon which I could create whatever I wanted (if I was clever enough) - and what I wanted to create were games.

{% include image.html caption="A blue screen full of promise" src="/assets/images/projects/guild/startup-screen.png" %}

It didn't really occur to me previously that games or software in general were things that people actually made. From my perspective they were just there and sometimes new ones came out, and some were better than others, but the notion of someone deciding to actually build a computer game wasn't something I'd really considered. This newfound knowledge of programming changed that for me though and I started thinking through what it would take for me to create a game using QBasic. I spent enormous amounts of time in front of that blue screen, writing small demo's and projects and slowly improving to the point where it seemed feasable to do something bigger (I also made my first money from software at this time, selling a QBasic learning course I created called *QBasic for losers and angry loners* - it sold 3 copies). The same friend who introduced me to QBasic in the first place shared similar interests and sensibilities, so we spent a lot of time comparing notes on how to solve programming problems and theorizing on how we could make the Best Game Ever. This all eventually cohered into an effort to build something that my 13 year old self considered relatively achievable. It was going to be an epic JRPG with the strange and awkward name of "Guild The Return" and it was going to have a huge sprawling plot, multiple characters, and a complex battle system.

Of course as we've already covered things didn't quite pan out and Guild would never be completed, but considering how little I knew and how limited the tools available to me, I actually got quite far. I wrote the beginnings of a story and built a couple of levels where you (a red square) could walk around some basic geometric environments, talk to other characters, solve some basic puzzles, buy items, and engage in questionably entertaining combat. To speed up development I wrote a level editor which allowed me to draw out environments in a rough paint-like interface. Performance was always a problem and I would be frequently stumped by QBasic's limitations, but having near infinite time especially during holidays I could waste away days trying literally everything in the tree of possibilities until I found something that worked.

Once I was faced with the reality that all this was lost, I must admit I wasn't really saddened, it was all too sudden and brutal and left me feeling more numb than anything else. I made myself a promise that I would *always back everything important to me up in triplicate* (which I have kept), and after briefly considering rewriting everything from memory, decided that maybe it was time to move on - I'd heard interesting things from a few friends about this thing called C & C++ which were what *"real"* games were made out of. That journey continued on into what I now refer to as *my career* and while I've still never actually completed a game, every new attempt has taught me something.

So fast forwarding to the present, I was digging around inside my "d:\installers" folder and seeing if there was anything worth keeping. I used to use it to studiously keep copies of downloaded programs and their installers, but since the ubiquity of broadband it was largely unecessary and had become a junkyard I hadn't looked at in years. As I was looking around I found a folder named "floppies" and remembered that before I removed the last 3.5" floppy drive from my computer I had gone through my small pile of remaining disks and dumped their contents into this folder "just in case" there was anything useful on them. I must have done this sometime around 2009, because this was after Windows 7 was released, meaning that I no longer needed to use a floppy disk drive to install software RAID drivers for Windows XP (*remember that thing about triplicate backups...*). Anyway, I never really looked at what was there at the time, so I was curious enough to take took a look inside and noticed among a bunch of fragments of old DOS games & programs along with a bunch of files with the extension ".BAS".

Those three letters are permanently etched into my brain, its short for "basic" and each file represented a QBasic program. I recognized the names of some of the programs and also saw a folder named "GUILD". Clicking into it I saw the familiar names "LEVEL0.BAS", "LEVEL1.BAS", "BATTLE.BAS", and a bunch of others. *No way this could be what it looked like*, but sure enough as I opened several of the files they contained QBasic code that despite the years still bore some familiarity and **I had to conclude that perhaps Guild wasn't lost to time after all.**

{% include image.html src="/assets/images/projects/guild/its-all-here.png" alt="A list of .BAS files" caption="Its all here!" %}

I think what must have happened is that at some point I copied Guild over to one of those floppy disks in order to take it around to my friends house to show what I'd been working on. Before access to fast internet we'd frequently pass stuff to one another via floppy disk, and I ended up having a large pile of disks of various provenance covered with scribble and crossed out names and I didn't really have any idea what was on most of them. I'm pretty sure I looked through my floppies after losing my hard drive and didn't find any recent copies of Guild, but its quite possible I just didn't check the right disks - or didn't notice one disk at the bottom of a drawer or in a school bag. That disk must have at some point found its way into my final and dwindling pile of floppies that I finally copied over before dumping them years later.

There was no way that whatever version of Guild and my other QBasic programs I had found were current with the versions that were lost in my hard drive crash, but maybe they were recent enough that a good chunk of the unfinished game was preserved. I took a look through some of the files and noticed that some of the .BAS files were corrupted (not surprising for floppies 10+ years old), luckily though it seemed no files related to Guild were affected so it seemed like **there really was a possibility of seeing Guild run again after 25 years.**

{% include image.html caption="Not everything that was copied over survived" src="/assets/images/projects/guild/corrupted.png" alt="A corrupted .bas file" %}

#### The Return of the Guild Returns - Getting it running again

Now that it was sitting right in front of me I couldn't resist trying to get it going. Luckily there's a fantastic open source project [QB64 Pheonix Edition](https://github.com/QB64-Phoenix-Edition/QB64pe) (a more active fork of the original QB64) that enables QBasic programs to run unmodified on modern operating systems along with providing some helpful new API's. So I downloaded it, opened 'start.bas', and held my breath as I pressed 'start'.

{% include image.html caption="Not a good start" src="/assets/images/projects/guild/fail.png" alt="Guild failing to start due to a missing file" %}

Unfortunately it turned out I was going to have to change quite a few things to get Guild working again, but I did this with the clear principle in mind that I would try to keep the original code (no matter how terrible) and game experience as similar as possible. The one exception I made to this was where I changed one of the locations in level1 from an empty corridor to an entrance to a shop so I could show an example of the shop system running (as I never hooked it up to anything originally).

#### Problems with state - its always state isn't it?
The reason that it was failing on startup was due to hardcoded absolute paths that were no longer correct, however even if I fixed that I was still going to run into problems due to how the game was structured. The game was actually split into several separate executable files, which would then shell out to each other using the QBasic `Chain` command. In order to preserve the state of the game between these modules I also had to save state in a series of temp CSV files which I would then load from the newly chained module. The rough sequence of these looked like the following:

{% include image.html caption="I'm not saying it's good, but this is how it worked" src="/assets/images/projects/guild/architecture.png" alt="system diagram of the overall game architecture" %}

While this worked ok running in Windows 95, on a modern version of Windows this presented a number of problems. Firstly, QB64 programs don't run in fullscreen, so its very obvious that when chaining to another executable, one window closes and another one pops up rather than appearing as a seamless transition. The other problem is that managing the state between these transitions was messy, with all the load/save code having to being copy pasted around multiple locations. I found a bunch of inconsistencies and level progression was actually broken in the version of the game I had - I had obviously been testing level2 and so level1 was being skipped entirely when starting a new game. Because of this I was going to need to refactor this especially as I wanted to stitch together as many of the levels & systems that were present in the version of the game I had.

As for the actual reason for this strange architecture - The original QBasic had a 160K memory limit for a given module. I wasn't really aware of this at the time, but I found that at a certain point I was unable to run my game without getting a `Program-memory overflow` error. To fix this, my teenage self found that by splitting a program up into separate modules this error could be avoided!

Lucklily, QB64 doesn't have any of these module size limits & now has an `$INCLUDE` statement to pull in code from other files, so I would be able to combine all the separate modules into a single executable. One thing that made this a lot simpler was the fact that my teenage self didn't really understand how functions or subroutines worked, so all the code for these modules existed in the top level file scope, with global variables & goto's for flow control. This meant that it was actually pretty simple to refactor each of these modules - I could just wrap the entire thing in a function & include it from the main entrypoint!

**level1.bas BEFORE:**
```vb
Dim Shared foo '... bunch of global variables

Goto game

menu:
'... a bunch of code

game:
'... a bunch of code
```

**level1.bm AFTER**
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

For some of the more complex entrypoints like the battle system I had to convert the logic that loaded everything from a series of CSV file into some structs that could be then passed into the function. Where possible I tried to keep the variable names as close to 1:1 so I didn't need to change the code within the functions themselves. The other nice thing about this change to the battle system was it made it possible to get the result of a battle and to persist changes to stats. Previously if you lost a battle the game would just close, and if you won the results of your changed stats would not actually be persisted.

**Battle.bas before:**
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


**Battle.bm after:**
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
  doBattle = 1 ' victory!
End Function
```

In doing some of these changes I found that there was significant amounts of duplicated code between the modules. For example, level1 contained its own *mostly* copy pasted version of the battle system that differed only slightly in how it handled loss conditions. I was able to delete this & instead call into the newly wrapped up battle system. Likewise the in-game menu was also replicated in each of the levels - I was able to condense this down to a single shared function.

Finally I had to fix the state machine that determined how to start a new game, how to load an existing game, and how to progress between levels now that the previous logic of shelling out to new levels was removed. 

**Load/Runloop logic before:**
``` vb
' copy pasted wherever a module transition happened
Open "c:\guild\temp.gtr" For Input as #1
Do While Not EOF(1)
    Input #1, GAMEPLACE, cash, rhq73i, rhq73s, adrenaline
Loop
Close #1

' this is what was called from the load screen, other places
' would just directly chain to the module requested.
Select Case GAMEPLACE
    Case 1
        ' Chain "c:\guild\level1.bas"

    Case 2
        Chain "c:\guild\level2.bas"
End Select
```

**Load/Runloop logic after:**
``` vb
Type GameState
    GAMEPLACE As Integer
    cash As Integer
    adrenaline As Integer
    rhq73i As Integer
    rhq73s As Integer
End Type

Dim Shared state As GameState

' from within the main menu
loadState(state)
runGame

Sub runGame
    levelResult = 0
    Do
        Select Case state.GAMEPLACE
            Case 0:
                levelResult = level0
            Case 1:
                levelResult = level1
            Case 2:
                levelResult = level2
            Case Else:
                levelResult = 0
        End Select
        If levelResult = 1 Then
            state.GAMEPLACE = state.GAMEPLACE + 1
            saveState state
        End If
    Loop Until levelResult = 0
End Sub

' in level0.bm
Function level0
    ' ... rest of the intro, always transitions to level1
    level0 = 1
End Function

' in level1.bm
Function level1
    '...
    ' if the user selects return to main menu from the ingame menu
    level1 = 0
    '...
    ' if the user completes level1
    level1 = 1
End Function
```

#### Writing to the local filesystem
With these changes made things were a lot closer to working, but I still hadn't fixed the original issue with absolute file paths! It was less of an issue now that the game didn't need to load/save temp files to preserve state continuously, but it was still necessary for saving/loading games & loading a few resource files from disk. I also needed to change it so the game would store save files within the users home folder instead of its own executable folder. In DOS & old versions of Windows programs were pretty much free to write anywhere in the filesystem they felt like, as such it was pretty typical for game to write save & temp files to their own directory. However on modern operating systems programs don't usually have write access to their own directory, so I had to make some changes so that a directory could be created in the users home folder so the game could write files there instead.
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

At this point the game actually started up & I could navigate the main menu!, but one thing I noticed was all the animations were playing *far* to quickly, so there was obviously some problem with the animation timings that I would have to fix.

{% include image.html caption="It loads!" src="/assets/images/projects/guild/it-loads.png" alt="The game main menu" %}

#### System speed compensation

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

I remember I was extremely proud of myself when I came up with this clever hack, unfortunately this approach didn't seem to work at all on modern machines, the busy waiting loop executed in pretty much no time meaning all animations were far too fast. I didn't look into it really closely, but I suspect the second variable was actually overflowing from being too large, resulting in the waiting loop not actually doing nearly enough iterations to slow the machine down. I ended up just ripping this code out & replacing it with QB64's `_Delay` command which takes a floating point number & can wait for intervals as small as 10 milliseconds which was fine for my usecase.

{% include image.html caption="Part of the games intro sequence" src="/assets/images/projects/guild/intro-animation.gif" alt="Intro animation for the game" %}

#### Lets Play!

Now aside from a few small bugfixes & tweaks the game was playable! As I played through I realized that probably 70% of the final content I had from the lost version was still present. Rather than summarize, I figured it would be more fun to just record a lets play. Watch as I cringe in embarrassment at my own writing and design decisions.

// TODO video


#### Interesting observations & trivia

While just playing through the game was a blast, I had almost as much fun rememberring all the little tricks, methods, and tools I'd used to make the game as well as accessing a time-capsule of my then very rudimentary knowledge of software development. As I looked through the code and replayed the game I kept note of a few of the more interesting observations & I've included them below.

#### My first stack overflow

Looking back the biggest difference in learning programming in 1998 vs 2023 (even if we exclude recent developments like LLM's) was that without regular access to the internet, I was limited to what I could find out through trial and error and without information beyond the included help documentation (which was not particularly readable to someone without a formal CS education). Because of this, I often encountered issues the cause of which I didn't really understand and I would just try different things until the error went away. This built some intuition of things to avoid, but not a solid grounding of exactly why.

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

#### An incomplete map editor
This was the last thing that I worked on before losing the game originally, and as such this differed the most from the map editor in the version of the game I salvaged. In this version you could draw rudimentary maps on the screen, but I remember that in the lost version I actually built a system to load and save these maps and could export them into a series of QBasic draw commands that could be added directly to the game. I ended up using this tool to build a more fully navigable space in level1 which I also updated to use the free-form movement system and interface used in level2. It would have been amazing if this had been preserved as it was probably the most graphically complex environment I built, but unfortunately this was definately lost.

{% include image.html src="/assets/images/projects/guild/editor.gif" alt="The map editor" caption="A keyboard driven UI, I didn't know how to enable mouse support at the time" %}

#### Handmade fonts
One thing I realized very early on in the game's development was that I was going to need to draw a lot of text & QBasic had no support for rendering custom fonts - so I devised my own custom font that I could re-use throughout the game's user interfaces and menus. The way this worked is QBasic has a draw command, that similar to the HTML5 Canvas 2D rendering context. You can pass it a series of instructions to draw lines, set colors etc, but in the case of QBasic you pass this as an encoded string e.g. `DRAW "c9 e20 f20 l5 h15 l5 br45"` draws a capital "A". To render characters my font I wrote out draw commands for each letter of the alphabet and stored the command strings in a CSV file. Then to open and draw the custom font I did the following.

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

#### Overlays & reducing flicker with XOR

A problem I constantly had with QBasic was flickering animation. It wasn't possible to do double buffered animation in Screen mode 12 (640x480) which I was using for the game (and I didn't know how to do double buffered animation anyway). Clearing the screen, then redrawing the screen introduced horrible flickering, so I had to find workarounds to only clear the minimum amount of the screen possible in order to animate things.

One way I found to do this was to use the `Xor` (Exclusive OR) boolean operator when drawing. The way this worked is that the `Put` command for blitting a sprite to the screen could also include a boolean operator that would take the existing screen pixel and apply the operator to the sprites pixel. In the case of Xor it has the useful property that `A Xor B Xor B == A`, which means if you render a sprite over an existing image, and then re-render over it again it disappears, giving you flicker free animation. The funny thing about this is that I didn't know anything about boolean algebra at the time and had no idea what Xor was really doing, I found this purely by chance and saw that adding Xor magically worked for my purpose.

Of course the problem with this is that the first Xor changes the colors of your original sprite - so I had to work around that, but in some cases this was actually useful as shown below where the location names on the map are written in a color that appears to be highlighted over the background. This works by overlaying a white font with a black background using XOR.

{% include image.html caption="Notice how the fonts appear highlighted over the background" src="/assets/images/projects/guild/xor-fonts.png" alt="Image from the game demonstrating font highlighting" %}

#### Music streaming

On the main menu there's a repeating song in the background. QBasic allows you to play sounds in two modes, in the foreground - where it blocks all execution of commands until the sound completes, or in the background where the sound plays while the program continues to the next instruction. This means that if you want to have music along with any interactivity, you need to use the background mode (denoted by `mb` below). The problem with this is that you periodically need to *refill* the background music buffer, but you also don't want to *overfill* the buffer because there's no way (that I knew of) to stop the music in the background buffer until it empties out.

The way I dealt with this was to break up the title song into blocks of 4 notes & when the background music buffer had less than 2 notes left, insert the next 4 notes. This meant that the music played continuously, but if you selected 'New Game', and I wanted the music to stop - the music would stop after at most 6 notes, rather than playing through the entire song. Essentially I built a very crude music streaming system.

``` vb
Timer On
musicstate = 0
On Timer(1) GoSub menumusic
mainmenu

menumusic:
If settings.sounds = 1 And Play(1) < 2 Then
    Select Case menustate
        Case 0
            Play "mb L7 G3 D"
        Case 1
            Play "mb L7 G- G B G"
        Case 2
            Play "mb L7 C3 < G"
        Case 3
            Play "mb L7 o3 B > C C < B > "
        Case 4
            Play "mb L7 o3 G3 D"
        Case 5
            Play "mb L7 o3 G- G B G"
        Case 6
            Play "mb L7 o3 C3 < G"
        Case 7
            Play "mb L7 o2 B > C C < B > "
        Case 8
            Play "mb L7 o3 G3 D"
        Case 9
            Play "mb L7 o3 G- G B G >"
        Case 10
            Play "mb L7 o4 C3 < G"
        Case 11
            Play "mb L7 o3 B > C C < B > "
    End Select
    menustate = menustate + 1
    If menustate > 11 Then menustate = 0
End If
Return
```

#### Particle effects

Particle systems are one of my favorite things to mess around with in computer graphics, I must have written dozens of them over the years, but the ones I wrote for Guild were my first. I wrote two separate particle effects in the game. The first was as part of an alternate intro sequence (which I integrated into the main game), and the second was part of the games only real puzzle. 

The intro particle effect works by taking an array of coordinates for the "8" logo and offsets them by a radius & an angle and then iteratively reduces the radius and angle to create a whirlpool like effect where the logo gradually appears from a random field of dots. Luckily I'd already learned a bit of trigonometry at school, so some basic usage of `sin` & `cos` were enough to make this work.

{% include image.html caption="Setting high expectations with the intro sequence" src="/assets/images/projects/guild/intro-effects.gif" alt="Particle effect in the intro sequence" %}


The second effect was one I built as the payoff for the only puzzle I built for the game. The premise was that you needed to break into a prison complex where your team was being held, but the fence around it was electrified. Convieniantly there was a power generator building nearby and you could adjust the power level to overload the generator and blow it up, disabling the fence.

This was the most complex effect in the whole game, and it worked in several stages. First I drew a series of yellow and red lines at random radii and angles outward from the center of the building to simulate the actual explosion itself. Then to fade out the explosion and show the wreckage I used the same effect, but replaced the red and yellw with green and brown so that it looked like only a crater remained. The final part was to show smoke drifting away and I did that by creating a field of randomly displaced dots and then have them move in a uniform direction to look like they were being blown in the wind.

{% include image.html caption="Not a very well designed puzzle, but a fun payoff" src="/assets/images/projects/guild/particle-effects.gif" alt="Footage of an explosion with particle effects from the game" %}

#### Goodbye, but not the end

I really enjoyed getting Guild working again but this is almost certainly the last time I will program anything in QBasic. Writing this post also ended up being a cathartic experience, and I feel I've finally given Guild the proper send off long after its abrupt departure. 

*At this point, I'm happy for what it is and that it will remain unfinished forever.*  

(I've also put the source up on Github, but I really don't recommend looking at it)

Getting another chance to experience my long-lost work again reminded me that most creative pursuits don't hold up well over time, but it also reminded me that its not the artifacts themselves that are important. Revisiting something you've made allows you to revisit some of your state of mind that bought that thing into being - thats what's valuable. In my case, being able to channel that feeling that I had staring at that blue terminal all those years ago, watching the blinking cursor and thinking that if I wanted to, I could build just about anything. While many details of my life have changed since then, I realized that I still get that feeling from time to time staring at a blank editor, that feeling hasn't changed a bit, and I hope it never does.

{% include image.html src="/assets/images/projects/guild/quit.png" alt="Quit Y/N" %}





