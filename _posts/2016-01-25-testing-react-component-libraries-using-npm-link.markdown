---
layout: post
title: "Unit testing React components in libraries using npm link"
date: 2016-01-25 06:07:00
tags:
- react
- node
---
Lets say you have a library of common react components, and that you're using this library in some other project. If you have some unit tests in your project which use these library components, things work just fine when your project has installed your component library via ```npm install``` - but lets say you want to use a local development copy of your components library and ```npm link``` it to your parent project so you can make changes to the library easily. Now when you run your parent projects unit tests, you'll probably see something nasty like this

```
Uncaught Error: Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs. This usually means that you're trying to add a ref to a component that doesn't have an owner (that is, was not created inside of another component's `render` method). Try rendering this component inside of a new top-level component which will hold the ref.
```

The reason for this is that your components library, and your parent project both have thier own locally installed dependency on react, and when you load the unit tests your library components are using the copy of react from the component library, and your parent project is using its own copy of React. React doesn't like it when you load multiple instances of it at once, and you'll see the above error when you do. Usually when installed via ```npm install```, this isn't a problem as the components library probably declares react as a peerDependency, and would rely on the parent projects copy - but when using a development copy using ```npm link``` the component library probably has a copy of react installed locally as a devDependency, leading to duplicate copies of React and the problem described above.

After struggling with this issue, I found a workaround that doesn't involve changing the library or parent project considerably, so I thought I'd post it here to help anyone who has this issue in future. Include this file before you require or import React and the error will magically go away. The easiest way I've found to include this is to have a single file index.js which exports all your libraries components, and in your package.json add the file below as loader.js and set it as the "main" file. This file should then, after patching the loader, require index.js. This way you don't have to change any of your component code.

``` javascript
const m = require('module');
const originalLoad = m._load;

const packageConfig = require('../package.json');
const peerDeps = packageConfig.peerDependencies;

/** 
 when other users of this library write tests that use components from this library
 we need to ensure that the users copy of peer dependancies are used, and not this
 libraries own local copy (React component tests will fail as it doesn't like it 
 when multiple copies are loaded at once). To fix this we'll do some patching of 
 the Node module loader
*/
if (peerDeps) {
  m._load = function(request,parent,isMain) {
    if (peerDeps[request]) {
      const parents = [];
      while (parent) {
        parents.push(parent);
        parent = parent.parent;
      }
      // reverse the usual node module resolution. Instead
      // of trying to load a local copy of the module and 
      // going up until we find one, we will try to resolve 
      // from the top down, this way peerDeps are preferentially 
      // loaded from the parent instead.
      parent = parents.pop();
      while (parent)
      {
        try 
        {
          return originalLoad(request,parent,isMain);
        }
        catch (ex) {
          parent = parents.pop();
        }
      }
    } else {
        return originalLoad(request,parent,isMain);
    }
  }
}
//Now export the library components
module.exports = require('./index');
m._load = originalLoad;
```

##### NOTE:
One caveat to note is that if you are building a distribution of your components library using webpack, you'll have to conditionally exclude this code from running by using a conditional and the webpack DefinePlugin otherwise webpack builds will fail due to not being able to load the 'module' module.
