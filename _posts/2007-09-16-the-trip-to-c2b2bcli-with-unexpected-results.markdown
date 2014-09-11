---
layout: post
title: "The trip to c++/cli with unexpected results"
date: 2007-09-16 07:09:00
tags:
- cplusplus
- programming
---
I recently had reason to want a virtual file system (i.e a wrapper around the physical file system such that various archive files were enumerated as if they were folders for easy navigation and reading of those files) for use in a C# application. Fortunately I had a piece of code which I had already written... except for one small probelm, the entire thing was written in unmanaged c++.   

So armed with the meagre knowledge that there was some way to wrap up native assemblies using some manner of managed c++ ( the latest iteration of which is named c++/cli), I headed off into the scary world of .net/native interop to try and save myself a rewrite of all my code.   

c++/cli is the only .net language capable of using managed and unmanaged code in a single assembly, so while being extremely powerful its also extremely complicated as you have a superset of both .net and unmanaged c++ features and all the issues with interoping between them all in a single language. To cut the suspense from this tale, I'll say that I was able to wrap up my unmanaged code without (too many) problems, this included mapping across getter/setter methods as properties, boost::signal callbacks as .net delegates and events and managing the memory of my unmanaged objects within thier managed wrappers.   

So without further ado, here are a few useful peices of code and patterns that I used to make wrapping unmanaged entities easier.   

#### Pattern the first: mapping strings
While primitive types such as int's and bools can be passed back and forth between managed and unmanaged code with no conversion, c++'s std::string and .net's string classes need to be mapped explicitly.   
Mapping to .net strings from c++ is relatively simple and can be accomplished using the code below   

{% highlight c++ %}
std::string nativeStr;
nativeStr = "hello world";
System::String^ ManagedStr =
gcnew System::String(nativeStr.c_str());
{% endhighlight %}

Mapping from c++ back to .NET is a little bit more complicated but can be accomplished with the function below 

{%highlight c++ %}
std::string MarshalString ( System::String^ s)
{
const char* chars = (const char*)
(System::Runtime::InteropServices::
 Marshal::StringToHGlobalAnsi(s)).ToPointer();
std::string os = chars;

System::Runtime::InteropServices::Marshal::FreeHGlobal(
System::IntPtr((void*)chars));

return os;
}
{% endhighlight %}
#### Pattern the second, wrapping managed objects

The two classes below provide a simple means to wrap an unmanaged entity within a managed entity. The templated constructor allows you to pass an unmanaged entity to wrap up and whether the managed wrapper is responsible for freeing the memory of the unmanaged entity upon being garbage collected. 


{%highlight c++%}/**
adds some useful utility methods to classes that want to
interop between managed and unmanaged code
*/
public ref class EntityBase {
public private:
static std::string MarshalString ( System::String^ s)
{

const char* chars =
 (const char*)(System::Runtime::InteropServices::
            Marshal::StringToHGlobalAnsi(s)).ToPointer();

std::string os = chars;
System::Runtime::InteropServices::Marshal::
 FreeHGlobal(System::IntPtr((void*)chars));

return os;
}
};

/**
provides a means to wrap an unmanaged type inside a managed
entity
*/
template <typename T> public ref class ManagedEntityBase:
EntityBase
{
public:
virtual ~ManagedEntityBase()
{
if (_ownsNativeEntity) {
 delete _nativeEntity;
}
}
public private://equivalent to internal in c#

property T *NativeEntity {
T *get()
{
 return _nativeEntity;
}
}

ManagedEntityBase(T *nativeEntity,bool ownsNativeEntity) {
_nativeEntity = nativeEntity;
_ownsNativeEntity = ownsNativeEntity;
}
private:

T *_nativeEntity;
bool _ownsNativeEntity;
};</pre>
below is an example of how to use these classes 

<pre class="prettyprint lang-cc linenums">class UnmanagedClass {
public:
UnmanagedClass(){}
virtual ~UnmanagedClass(){}

int Foo() {return 1;}
};

public ref class ManagedClass:
ManagedEntityBase<UnmanagedClass> {
public:
ManagedClass():
ManagedEntityBase(new UnmanagedClass(),true) {}
virtual ~ManagedClass(){}

int Foo() { return NativeEntity->Foo(); }
};
{%endhighlight %}

Then after referencing the above c++/cli assembly we can access the managed wrapper in c# with the following 

{%highlight c++%}
ManagedClass mc = new ManagedClass();
int bar = mc.Foo();
{%endhighlight %}

As for mapping boost::signal callbacks to .NET events and delegates, that was a little more tricky and will be the topic of another days post :) 

Hasta Luevo.
