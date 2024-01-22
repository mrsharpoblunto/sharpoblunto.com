---
layout: post
title: "Adventures in programmer archaeology"
date: 2023-12-30 06:07:00
tags:
- qbasic
---

I recently came across a discovery from the distant past. It didn't seem as such at first glance, just a few text files comprising a program written in an archaic programming language, but it's not an exaggeration to say that the direction of my life and career are all a direct consequence of this programs development and presumed destruction. This is a story of the recovery of a long lost project, how I got it running again, and reflections on a youth well wasted.

It's 1998 and I'm playing Total Annihilation. Its a skirmish in the painted desert and the framerate is even slower than usual. My hard drive starts making ticking noises & the game begins stuttering for seconds at a time for several minutes before freezing completely. I press the reset button & wait for the familiar BIOS POST sequence before seeing the words: `DISK BOOT FAILURE, INSERT SYSTEM DISK AND PRESS ENTER`. Simple words, plainly stated - they told me that my hard drive had just failed, they told me that I had just lost several years of work.

Saved games I could get over, but I'd lost something more than that, I'd lost the source code to my unfinished masterpiece


Principles - change as little as possible. In general I have tried to keep the original code and game experience as similar as possible. The one exception to this was I changed one of the locations in level1 from an empty corridor to an entrance to a shop so I could show an example of the shop system running (as I never hooked it up to anything originally).

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

#### No source control
TODO how we did source control before svn&git
finalA1
finalA2E ...

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
{% include image.html src="/assets/images/projects/guild/play.png" %}

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

Unfortunately this approach didn't seem to work at all on modern machines, the busy waiting loop executed in pretty much no time meaning all animations were far too fast. I didn't look into it really closely, but I suspect the second variable was actually overflowing from being too large, resulting in the waiting loop not actually doing nearly enough iterations to slow the machine down. I ended up just ripping this code out & replacing it with QB64's `_Delay` command which takes a floating point number & can wait for intervals as small as 10 milliseconds which was fine for my usecase.

#### Reducing flicker with XOR

#### Particle effects



