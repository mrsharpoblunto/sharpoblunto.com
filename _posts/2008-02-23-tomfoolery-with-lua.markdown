---
layout: post
title: "Tomfoolery with Lua"
date: 2008-02-23 12:02:00
tags:
- cplusplus
- lua
- programming
---
I done a fair but of hacking around with the [lua](http://en.wikipedia.org/wiki/Lua) scripting language in the past, and while my motives for doing so were oftentimes questionable the fact remains that I learnt a few tricks that make embedding and using it easier.  

As a language lua takes a &quot;less is better&quot; approach and instead provides the tools for you to extend its functionality rather than bloating the core distribution with stuff that isn't really necessary. As such you'll need to add some of that bloat yourself :) Henceforth I will be making the dubious assumption that you are familiar with the basics of embedding lua with c++ applications and get right into the meat of things.  

<span style="font-weight: bold">Getting a lua stack trace</span>  

when a lua script encounters an error you can get the error message from the top of the lua stack by calling  

  <pre class="prettyprint linenums">lua_tostring(luaState,-1);</pre>

however wouldn't it be more useful to get a full stack trace to give you more context as to where and why the error occurred? Luckily lua includes a nifty mechanism for hooking into events during script execution and while these can be used for all sorts of extremely cool and powerful things, I'll be showing how you can use these events to build a call stack.

firstly lets create a list of strings (we'll be using it as a stack...),a new lua state and hook up some events to it. The lua _sethook function allows you to hook in a number of events and provide a callback function to call when these events occur. In this case we want to be notified whenever a function is called (LUA_MASKCALL) or whenever a function returns (LUA_MASKRET)

<pre class="prettyprint linenums">std::list<std::string> _stack;
_state = luaL_newstate();
lua_sethook(_state,&FunctionHook,LUA_MASKCALL | LUA_MASKRET,0);</pre>

This should allow us to build up a callstack by pushing information on the last called function onto a stack, then popping the top off the stack every time a function returns, simple eh? now on to the implementation of the callback function

<pre class="prettyprint linenums">void FunctionHook(lua_State *l, lua_Debug *ar)
{

 //fill up the debug structure with information from the lua stack
 lua_getinfo(l, "Sln", ar);
 //push function calls to the top of the callstack
 if (ar->event == LUA_HOOKCALL) {

  std::stringstream ss;
  ss << ar->short_src << ":"

  << ar->linedefined << ": "
  << (ar->name == NULL ? "[UNKNOWN]" : ar->name)
  << " (" << ar->namewhat << ")";

  _stack.push_front(ss.str());
 }
 //pop the returned function from the callstack
 else if (ar->event ==LUA_HOOKRET) {

  if (_stack.size()>0)
  {
   _stack.pop_front();
  }
 }
}</pre>

This function gets automatically called whenever a function is called or a function returns. Each time a call event takes place we push some information regarding that function (name, line number etc...) onto our call stack, and every time a function returns we pop it from the call stack.

So when a lua script encounters an error the contents of the _stack variable will contain a full stack trace up until the point of the error, neat eh? (the cryptic &quot;Sln&quot; parameter for the lua_getinfo function specifies what fields of the lua_Debug struct to populate, see the [lua reference manual](http://www.lua.org/manual/5.1/) for more information if you're interested)

NOTE: You'll probably only want to enable this stack tracing for debug builds of your applications as there is a performance hit in hooking into these lua VM events.

At some stage in the future I'll blog about my c++ LuaState class which wraps up the process of creating, loading, running, debugging and cleaning up lua scripts in a nice OO fashion but until then enjoy your new-found stack tracery.