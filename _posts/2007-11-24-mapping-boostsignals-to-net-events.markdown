---
layout: post
title: "Mapping boost::signals to .net events"
date: 2007-11-24 11:11:00
tags:
- cplusplus
- programming
---
A while back I blogged about wrapping native c++ classes inside managed .net classes using c++/cli, and while that blog detailed wrapping up a class with methods and properties I did not go over how to map across boost::signal's to the .net event model.   

Below we have a native c++ class which has the ability to copy files and notify listening classes of it's progress in doing so.   

#### Unmanaged Class Interface   

{% highlight c++ %}class FileCopier
{

public:
	typedef struct {
		long BytesCount;
		long BytesCopied;
		std::string CurrentFile;
	} CopyProgressEvent;

	typedef boost::signal<void (CopyProgressEvent)>

	CopyProgressEventHandler;//progress callback signature

	/**
	add a listener to copy progress events
	*/
	void AddCopyProgressListener(CopyProgressEventHandler::slot_type listener);

private:
	CopyProgressEventHandler _handler;

};
{% endhighlight %}

The AddCopyProgressListener class accepts a pointer to a suitable callback function that conforms to the signature void(CopyProgressEvent) and adds that callback to the event handler 

which can be used to notify all listeners of the event. All well and good so now to wrap it up in .net goodness using c++/cli. We'll be using the managed wrapper class I wrote in a previous blog entry ([here](http://www.sharpoblunto.com/News/2007/09/16/the-trip-to-c2b2bcli-with-unexpected-results)) as the basis for the file copier wrapper. 

The full interface for the wrapper class is shown below, in order for this to work we have to duplicate the copyProgressEvent in a managed class and supply our own delegate class and event for managed listeners to subscribe to. The notifyListeners method is what takes an unmanaged copyProgress event, wraps it up in its managed equivalent and passes it off to the event handler 

#### Managed Class Interface

{% highlight c++ %}
public ref class
ManagedCopyProgressEvent {

public:
	long BytesCount;
	long BytesCopied;
	System::String^ CurrentFile;
};

public ref class ManagedFileCopier:
ManagedEntityBase<FileCopier>
{
public:
	delegate void CopyProgressEventHandler(ManagedCopyProgressEvent^ args);
	event CopyProgressEventHandler^ OnCopyProgress;

	ManagedFileCopier();

public private:
	void NotifyListeners(CopyProgressEvent args);
};
{% endhighlight %}

Okay, so the interface makes sense to any .net classes wanting to subscribe to the copyprogress events, but how are we going to do the behind the scenes routing of the boost::signal event such that notifyListeners gets called at the appropriate times? If we were working with native c++ classes we can happily used boost::bind to turn the notfyListeners member function into a suitable callback for the signals event, however because NotifyListeners is part of a managed class, this approach doesn't work so we have to take a slightly more roundabout approach. 

#### The notifier proxy 

This is where the function below comes in. Its purpose is to provide a valid function for boost::bind to use as a callback, but also to keep a reference to our managed class so that NotifyListeners can be called when a boost::signals event is fired (This should hopefully make more sense when we actually hook all these pieces up in the managed classes constructor) 

{% highlight c++ %}
void NotifyProxy(gcroot<ManagedFileCopier ^> this_,CopyProgressEvent args) 
{
	this_->NotifyListeners(args);
}
{% endhighlight %}

#### Putting it all together

The implementation of the constructor is where the notifier proxy gets hooked up to the unmanaged boost signals event. Using boost::bind we use the notifyProxy function and the instance of the managed class to create a callback for the unmanaged boost::signal. 

{% highlight c++ %}
ManagedFileCopier::ManagedFileCopier() : ManagedEntityBase(new FileCopier(),true) 
{
	NativeEntity->AddCopyProgressListener(
		boost::bind(
		NotifyProxy,
		gcroot<ManagedFileCopier^>(this),
		_1)
	);
}
{% endhighlight %}

The implementation of the NotifyListeners method is pretty straightforward, we create a new instance of a managedCopyProgressEvent then copy the unmanagd attributes over before passing the object as an argument to the .net OnCopyProgress event. 

{% highlight c++ %}
void ManagedFileCopier::NotifyListeners(CopyProgressEvent args)
{
	ManagedCopyProgressEvent^ mArgs = gcnew CopyProgressEvent();
	mArgs->BytesCopied = args.BytesCopied;
	mArgs->BytesCount = args.BytesCount;
	OnCopyProgress(mArgs);
}
{% endhighlight %}

So there you have it! thats how you can route events from the boost::signals library though to managed .net code. Below is an example of some c# code using the managed class we've written. 

{% highlight c++ %}
ManagedFileCopier fc = new ManagedFileCopier();

fc.OnCopyProgress += new ManagedFileCopier.CopyProgressEventHandler(OnCopyProgress);

void OnCopyProgress(ManagedCopyProgressEvent args)
{
...
}
{% endhighlight %}
