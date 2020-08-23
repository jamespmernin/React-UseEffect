[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# The Component Life Cycle

So far, we've used react components to build simple applications. We've added
state and props and controlled data flow through them using hooks. In order to do more complex things, we'll have to use
React Hooks.

## Prerequisites

- React
- Components
- State and props

## Objectives

By the end of this, developers should be able to:

- Explain how to use React's useEffect
- Use asynchronous functions within react
- Retrieve data from an API inside of a component

## Introduction

How do we get data from an API? Well we could drop in an AJAX call to fetch some
data, but our component would likely render before the AJAX request finished.
Our component would see that our data is `undefined` and either render a
blank/empty component or throw an error.

How do we incorporate third party libraries like `fetch` or `axios` with React?
It sounds complicated... Do we put that in render?

This lesson will introduce the Component Life Cycle: hooks that are fired at
different states of a components "life" for solving the problems described
above, as well as many others.

So, what is the Component Life Cycle?

## The Component Life Cycle

### The Life Cycle Methods (10 min / 0:20)

When we create a React component we have a few events that happen over the course of its lifecycle. First -- it mounts, or it renders onto the page. Then, `state` and `props` can update. Finally, the component unmounts from the dom.

Here is a good diagram of the [Lifecycle Methods](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

`useEffect` runs when these lifecycle events occur.

We will use the `useEffect` hook to perform "side effects".

### Performing Side Effects Using `useEffect()`

Side effects include performing tasks such as:

- Fetching data
- Using timers
- Manually updating the DOM
- Managing subscriptions

> Key Point: We will use the `useEffect` hook to perform actions when the component renders on the page, when its props or state update, or when it is removed from the page.

#### Adding the `useEffect()` Hook

Like `useState()` and other hooks, because they are functions, we just invoke them from the top-level of the function component:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [movieData, setMovieData] = useState({})
  const [newSearch, setNewSearch] = useState('star trek')

  useEffect(() => {
    const movieUrl = `https://www.omdbapi.com/?t=${newSearch}&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const resp = await axios.get(movieUrl)
      setMovieData(res.data)
    }
    makeApiCall()
  })
```

`useEffect()` takes a callback function as its first and only _required_ argument.

**By default, the effect's callback function is going be invoked after every render of the component.**

Let's observe this by creating a button which modifies `movieTitle`.

#### Preventing Side Effects from Running

In many cases, you will want to optimize the component so that side effects only run if:

- Certain data changes (typically a prop or state variable).
- After the initial render, but not after subsequent renders (as with `componentDidMount` in class components). 

The `useEffect()` hook provides for these scenarios by accepting an array as a second argument.

The array is designed to hold a list of dependencies, that is, a list of variables and/or object properties that causes the side effect to run only if at least one of the dependencies change their value. If we forego the second argument entirely, the effect will run after every render.

Providing an empty array (`[]`), will result in the side effect only running after the **initial** render.  Let's check this out:

```js
  // Add the [] as a 2nd argument
  useEffect(() => {
    console.log('useEffect was called');
  }, []);
```

Clear the console and refresh. The "useEffect was called" message will be logged.  However, unlike without the `[]` arg, clicking the button will no longer run the side effect!

### Adding Search Functionality

Here useffect will run anytime the movieTitle has been changed in state.  When movieTitle has been changed then the `makeApiCall()` function is exectued.  If fetching the data has been successful then it will update `setMovieData` to the returned data. 

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [movieData, setMovieData] = useState({});
  const [newSearch, setNewSearch] = useState('star wars')
  
  useEffect(() => {
    const movieUrl = `https://www.omdbapi.com/?t=${newSearch}&apikey=98e3fb1f`;
    const makeApiCall = async () => {
      const resp = await axios.get(movieUrl)
      setMovieData(res.data)
    }
    makeApiCall()
  }, [newSearch])
}
```

## Review Questions

- Where do we write side effects within React?
- Where do we create API calls within React Hooks?
- What happens if we don't provide a second argument to `useEffect`?

## Learn More!

- [A complete guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data)
