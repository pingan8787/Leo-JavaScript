When I was learning React Hooks recently, I found the repository of [30 seconds of code](https://www.30secondsofcode.org/react/t/hooks/p/1). There are a lot of useful React Hooks in it. After reading all of them, I sorted out 15 React Hooks that you may use and share. give everyone.

Before reading this article, I hope you have a basic understanding of [the official built-in React Hooks](https://reactjs.org/docs/hooks-reference.html) for easy understanding.

## About React Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

```jsx
import React, { useState } from "react";
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions.

## 1. useKeyPress hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-key-press)

### 🎉 Introduce

Listens for changes in the pressed state of a given key.

- Use the `useState()` hook to create a state variable that holds the pressed state of the given key.
- Define two handler functions that update the state variable on key down or key up accordingly.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to handle the `'keydown'` and `'keyup'` events.
- Use `EventTarget.removeEventListener()` to perform cleanup after the component is unmounted.

### ✨ Code

```jsx
const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};
```

### 🏅 Example

```jsx
const MyApp = () => {
  const wPressed = useKeyPress("w");

  return <p>The "w" key is {!wPressed ? "not " : ""}pressed!</p>;
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 2. useHash hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-hash)

### 🎉 Introduce

Tracks the browser's location hash value, and allows changing it.

- Use the `useState()` hook to lazily get the `hash` property of the `Location` object.
- Use the `useCallback()` hook to create a handler that updates the state.
- Use the `useEffect()` hook to add a listener for the `'hashchange'` event when mounting and clean it up when unmounting.
- Use the `useCallback()` hook to create a function that updates the `hash` property of the `Location` object with the given value.

### ✨ Code

```jsx
const useHash = () => {
  const [hash, setHash] = React.useState(() => window.location.hash);

  const hashChangeHandler = React.useCallback(() => {
    setHash(window.location.hash);
  }, []);

  React.useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const updateHash = React.useCallback(
    (newHash) => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash, updateHash];
};
```

### 🏅 Example

```jsx
const MyApp = () => {
  const [hash, setHash] = useHash();

  React.useEffect(() => {
    setHash("#list");
  }, []);

  return (
    <>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash: </p>
      <input value={hash} onChange={(e) => setHash(e.target.value)} />
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 3. useScript hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-script)

### 🎉 Introduce

Dynamically loads an external script.

- Use the `useState()` hook to create a state variable for the load status of the script.
- Use the `useEffect()` hook to handle all the logic for loading and unloading the script anytime the `src` changes.
- If no `src` value is present, set the `status` to `'idle'` and return.
- Use `Document.querySelector()` to check if a `<script>` element with the appropriate `src` value exists.
- If no relevant element exists, use `Document.createElement()` to create one and give it the appropriate attributes.
- Use the `data-status` attribute as a way to indicate the status of the script, setting it to `'loading'` initially.
- If a relevant element exists, skip initialization and update the `status` from its `data-status` attribute. This ensures that no duplicate element will be created.
- Use `EventTarget.addEventListener()` to listen for `'load'` and `'error'` events and handle them by updating the `data-status` attribute and the `status` state variable.
- Finally, when the component unmounts, use `Document.removeEventListener()` to remove any listeners bound to the element.

### ✨ Code

```jsx
const useScript = (src) => {
  const [status, setStatus] = React.useState(src ? "loading" : "idle");

  React.useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      const setDataStatus = (event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };
      script.addEventListener("load", setDataStatus);
      script.addEventListener("error", setDataStatus);
    } else {
      setStatus(script.getAttribute("data-status"));
    }

    const setStateStatus = (event) => {
      setStatus(event.type === "load" ? "ready" : "error");
    };

    script.addEventListener("load", setStateStatus);
    script.addEventListener("error", setStateStatus);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateStatus);
        script.removeEventListener("error", setStateStatus);
      }
    };
  }, [src]);

  return status;
};
```

### 🏅 Example

```jsx
const script =
  "data:text/plain;charset=utf-8;base64,KGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdIZWxsbycpIH0pKCk7";

const Child = () => {
  const status = useScript(script);
  return <p>Child status: {status}</p>;
};

const MyApp = () => {
  const status = useScript(script);
  return (
    <>
      <p>Parent status: {status}</p>
      <Child />
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 4. useHover hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-hover)

### 🎉 Introduce

Handles the event of hovering over the wrapped component.

- Use the `useState()` hook to create a variable that holds the hovering state.
- Use the `useCallback()` hook to memoize two handler functions that update the state.
- Use the `useCallback()` hook to create a callback ref and create or update the listeners for the `'mouseover'` and `'mouseout'` events.
- Use the `useRef()` hook to keep track of the last node passed to `callbackRef` to be able to remove its listeners.

### ✨ Code

```jsx
const useHover = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOver = React.useCallback(() => setIsHovering(true), []);
  const handleMouseOut = React.useCallback(() => setIsHovering(false), []);

  const nodeRef = React.useRef();

  const callbackRef = React.useCallback(
    (node) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener("mouseover", handleMouseOver);
        nodeRef.current.removeEventListener("mouseout", handleMouseOut);
      }

      nodeRef.current = node;

      if (nodeRef.current) {
        nodeRef.current.addEventListener("mouseover", handleMouseOver);
        nodeRef.current.addEventListener("mouseout", handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [callbackRef, isHovering];
};
```

### 🏅 Example

```jsx
const MyApp = () => {
  const [hoverRef, isHovering] = useHover();
  return <div ref={hoverRef}>{isHovering ? "Hovering" : "Not hovering"}</div>;
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 5. useFetch hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-fetch)

### 🎉 Introduce

Implements `fetch()` in a declarative manner.

- Create a custom hook that takes a `url` and `options`.
- Use the `useState()` hook to initialize the `response`, `error` and `abort` state variables.
- Use the `useEffect()` hook to asynchronously call `fetch()` and update the state variables accordingly.
- Create and use an `AbortController` to allow aborting the request. Use it to cancel the request when the component unmounts.
- Return an object containing the `response`, `error` and `abort` state variables.

### ✨ Code

```jsx
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [abort, setAbort] = React.useState(() => {});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(abortController.abort);
        const res = await fetch(url, { ...options, signal });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    return () => {
      abort();
    };
  }, []);

  return { response, error, abort };
};
```

### 🏅 Example

```jsx
const ImageFetch = (props) => {
  const res = useFetch("https://dog.ceo/api/breeds/image/random", {});
  if (!res.response) {
    return <div>Loading...</div>;
  }
  const imageUrl = res.response.message;
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  );
};

ReactDOM.render(<ImageFetch />, document.getElementById("root"));
```

## 6. useAsync hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-async)

### 🎉 Introduce

Handles asynchronous calls.

- Create a custom hook that takes a handler function, `fn`.
- Define a reducer function and an initial state for the custom hook's state.
- Use the `useReducer()` hook to initialize the `state` variable and the `dispatch` function.
- Define an asynchronous `run` function that will run the provided callback, `fn`, while using `dispatch` to update `state` as necessary.
- Return an object containing the properties of `state` (`value`, `error` and `loading`) and the `run` function.

### ✨ Code

```jsx
const useAsync = (fn) => {
  const initialState = { loading: false, error: null, value: null };
  const stateReducer = (_, action) => {
    switch (action.type) {
      case "start":
        return { loading: true, error: null, value: null };
      case "finish":
        return { loading: false, error: null, value: action.value };
      case "error":
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const run = async (args = null) => {
    try {
      dispatch({ type: "start" });
      const value = await fn(args);
      dispatch({ type: "finish", value });
    } catch (error) {
      dispatch({ type: "error", error });
    }
  };

  return { ...state, run };
};
```

### 🏅 Example

```jsx
const RandomImage = (props) => {
  const imgFetch = useAsync((url) =>
    fetch(url).then((response) => response.json())
  );

  return (
    <div>
      <button
        onClick={() => imgFetch.run("https://dog.ceo/api/breeds/image/random")}
        disabled={imgFetch.isLoading}
      >
        Load image
      </button>
      <br />
      {imgFetch.loading && <div>Loading...</div>}
      {imgFetch.error && <div>Error {imgFetch.error}</div>}
      {imgFetch.value && (
        <img
          src={imgFetch.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </div>
  );
};

ReactDOM.render(<RandomImage />, document.getElementById("root"));
```

## 7. useOnGlobalEvent hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-on-global-event)

### 🎉 Introduce

Executes a callback whenever an event occurs on the global object.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useRef()` hook to create a variable that will hold the previous values of the `type` and `options` arguments.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the given event `type` on the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

### ✨ Code

```jsx
const useOnGlobalEvent = (type, callback, options) => {
  const listener = React.useRef(null);
  const previousProps = React.useRef({ type, options });

  React.useEffect(() => {
    const { type: previousType, options: previousOptions } = previousProps;

    if (listener.current) {
      window.removeEventListener(
        previousType,
        listener.current,
        previousOptions
      );
    }

    listener.current = window.addEventListener(type, callback, options);
    previousProps.current = { type, options };

    return () => {
      window.removeEventListener(type, listener.current, options);
    };
  }, [callback, type, options]);
};
```

### 🏅 Example

```jsx
const App = () => {
  useOnGlobalEvent("mousemove", (e) => {
    console.log(`(${e.x}, ${e.y})`);
  });

  return <p>Move your mouse around</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## 8. useOnWindowScroll hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-on-window-scroll)

### 🎉 Introduce

Executes a callback whenever the window is scrolled.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the `'scroll'` event of the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

### ✨ Code

```jsx
const useOnWindowScroll = (callback) => {
  const listener = React.useRef(null);

  React.useEffect(() => {
    if (listener.current)
      window.removeEventListener("scroll", listener.current);
    listener.current = window.addEventListener("scroll", callback);
    return () => {
      window.removeEventListener("scroll", listener.current);
    };
  }, [callback]);
};
```

### 🏅 Example

```jsx
const App = () => {
  useOnWindowScroll(() => console.log(`scroll Y: ${window.pageYOffset}`));
  return <p style={{ height: "300vh" }}>Scroll and check the console</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## 9. useOnWindowResize hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-on-window-resize)

### 🎉 Introduce

Executes a callback whenever the window is resized.

- Use the `useRef()` hook to create a variable, `listener`, which will hold the listener reference.
- Use the `useEffect()` hook and `EventTarget.addEventListener()` to listen to the `'resize'` event of the `Window` global object.
- Use `EventTarget.removeEventListener()` to remove any existing listeners and clean up when the component unmounts.

### ✨ Code

```jsx
const useOnWindowResize = (callback) => {
  const listener = React.useRef(null);

  React.useEffect(() => {
    if (listener.current)
      window.removeEventListener("resize", listener.current);
    listener.current = window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", listener.current);
    };
  }, [callback]);
};
```

### 🏅 Example

```jsx
const App = () => {
  useOnWindowResize(() =>
    console.log(`window size: (${window.innerWidth}, ${window.innerHeight})`)
  );
  return <p>Resize the window and check the console</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## 10. useLocalStorage hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-local-storage)

### 🎉 Introduce

Creates a stateful value that is persisted to `localStorage`, and a function to update it.

- Use the `useState()` hook with a function to initialize its value lazily.
- Use a `try...catch` block and `Storage.getItem()` to try and get the value from `Window.localStorage`. If no value is found, use `Storage.setItem()` to store the `defaultValue` and use it as the initial state. If an error occurs, use `defaultValue` as the initial state.
- Define a function that will update the state variable with the passed value and use `Storage.setItem()` to store it.

### ✨ Code

```jsx
const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
```

### 🏅 Example

```jsx
const MyApp = () => {
  const [name, setName] = useLocalStorage("name", "John");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 11. useDebounce hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-debounce)

### 🎉 Introduce

Debounces the given value.

- Create a custom hook that takes a `value` and a `delay`.
- Use the `useState()` hook to store the debounced value.
- Use the `useEffect()` hook to update the debounced value every time `value` is updated.
- Use `setTimeout()` to create a timeout that delays invoking the setter of the previous state variable by `delay` ms.
- Use `clearTimeout()` to clean up when dismounting the component.
- This is particularly useful when dealing with user input.

### ✨ Code

```jsx
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
```

### 🏅 Example

```jsx
const Counter = () => {
  const [value, setValue] = React.useState(0);
  const lastValue = useDebounce(value, 500);

  return (
    <div>
      <p>
        Current: {value} - Debounced: {lastValue}
      </p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};

ReactDOM.render(<Counter />, document.getElementById("root"));
```

## 12. useEventListener hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-event-listener)

### 🎉 Introduce

Adds an event listener for the specified event type on the given element.

- Use the `useRef()` hook to create a ref that will hold the `handler`.
- Use the `useEffect()` hook to update the value of the `savedHandler` ref any time the `handler` changes.
- Use the `useEffect()` hook to add an event listener to the given element and clean up when unmounting.
- Omit the last argument, `el`, to use the `Window` by default.

### ✨ Code

```jsx
const useEventListener = (type, handler, el = window) => {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = (e) => savedHandler.current(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};
```

### 🏅 Example

```jsx
const MyApp = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const updateCoords = React.useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  useEventListener("mousemove", updateCoords);

  return (
    <p>
      Mouse coordinates: {coords.x}, {coords.y}
    </p>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
```

## 13. useCopyToClipboard hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-copy-to-clipboard)

### 🎉 Introduce

Copies the given text to the clipboard.

- Use the [copyToClipboard](https://www.30secondsofcode.org/js/s/copy-to-clipboard/) snippet to copy the text to clipboard.
- Use the `useState()` hook to initialize the `copied` variable.
- Use the `useCallback()` hook to create a callback for the `copyToClipboard` method.
- Use the `useEffect()` hook to reset the `copied` state variable if the `text` changes.
- Return the `copied` state variable and the `copy` callback.

### ✨ Code

```jsx
const useCopyToClipboard = (text) => {
  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return success;
  };

  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(() => {
    if (!copied) setCopied(copyToClipboard(text));
  }, [text]);
  React.useEffect(() => () => setCopied(false), [text]);

  return [copied, copy];
};
```

### 🏅 Example

```jsx
const TextCopy = (props) => {
  const [copied, copy] = useCopyToClipboard("Lorem ipsum");
  return (
    <div>
      <button onClick={copy}>Click to copy</button>
      <span>{copied && "Copied!"}</span>
    </div>
  );
};

ReactDOM.render(<TextCopy />, document.getElementById("root"));
```

## 14. useTimeout hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-timeout)

### 🎉 Introduce

Implements `setTimeout()` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `useRef()` hook to create a `ref` for the callback function.
- Use the `useEffect()` hook to remember the latest callback.
- Use the `useEffect()` hook to set up the timeout and clean up.

### ✨ Code

```jsx
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
```

### 🏅 Example

```jsx
const OneSecondTimer = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<OneSecondTimer />, document.getElementById("root"));
```

## 15. useInterval hook

[➡️ View original article](https://www.30secondsofcode.org/react/s/use-interval)

### 🎉 Introduce

Implements `setInterval()` in a declarative manner.

- Create a custom hook that takes a `callback` and a `delay`.
- Use the `useRef()` hook to create a `ref` for the callback function.
- Use a `useEffect()` hook to remember the latest `callback` whenever it changes.
- Use a `useEffect()` hook dependent on `delay` to set up the interval and clean up.

### ✨ Code

```jsx
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
```

### 🏅 Example

```jsx
const Timer = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<Timer />, document.getElementById("root"));
```

## Resource

[https://www.30secondsofcode.org/react/t/hooks/p/1](https://www.30secondsofcode.org/react/t/hooks/p/1)
