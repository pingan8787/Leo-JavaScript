As React becomes more and more popular, more and more React developers have encountered various problems in the development process.

In this article, based on my actual work experience, I will summarize some common mistakes in 11 React development to help you avoid some mistakes.

If you are just starting to use React, it is recommended that you take a good look at this article. If you have already used React to develop projects, it is also recommended that you check and fill in the gaps.

After reading this article, you will learn how to avoid these 11 React mistakes:

1. When rendering the list, do not use the key
2. Modify the state value directly by assignment
3. Bind the state value directly to the value property of the input
4. Use state directly after executing setState
5. Infinite loop when using useState + useEffect
6. Forgetting to clean up side effects in useEffect
7. Incorrect use of boolean operators
8. The component parameter type is not defined
9. Passing Strings as Values to Components
10. There is no component name that starts with a capital letter
11. Incorrect event binding for element

## 1. When rendering the list, do not use the key

### Problem

When we first learned React, we would render a list according to the method described in the documentation, for example:

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
```

After rendering, the console will prompt a warning ⚠️ `a key should be provided for list items`.

### Solutions

You just need to follow the prompts and add the `key` attribute to each item:

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number, index) => <li key={index}>{number}</li>);
```

`key` helps React identify which elements have changed, such as been added or removed. So we need to set a unique `key` value for each element in the array.

For the value of `key`, it is best to set it to a unique value. In the above example, `index` is used as the value of `key`. Officially, it is not recommended. The order of the list will change, and there is no unique value or a last resort. In this case, performance will be degraded.

### Documentation

[React - Basic List Component](https://reactjs.org/docs/lists-and-keys.html#basic-list-component)

## 2. Modify the state value directly by assignment

### Problem

In React, state cannot be directly assigned and modified, otherwise it will cause problems that are difficult to fix. Example:

```jsx
updateState = () => {
  this.state.name = "Chris1993";
};
```

At this point, the editor will prompt a warning ⚠️:

```
Do not mutate state directly. Use setState().
```

### Solutions

Class components can be modified with the `setState()` method, and function components can be modified with `useState()`:

```jsx
// ClassComponent：use setState()
this.setState({ name: "Chris1993" });

// FunctionConponent：use useState()
const [name, setName] = useState("");
setName("Chris1993");
```

### Documentation

[React - State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
[React - Using the State Hook](https://reactjs.org/docs/hooks-state.html)

## 3. Bind the state value directly to the value property of the input

### Problem

When we directly bind the value of `state` as a parameter to the `value` property of the `input` tag, we will find that no matter what we enter in the input box, the content of the input box will not change.

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  return <input type="text" value={count} />;
}
```

This is because we use the state variable with state as the default value to assign to the `value` of `<input>`, and the `state` in the functional component can only be modified by the `set` method returned by `useState` . So the solution is also very simple, just use the `set` method when modifying.

### Solutions

Just bind an `onChange` event to `<input>`, and modify it by calling `setCount`:

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  const change = (val) => setCount(val.value);
  return <input type="text" value={count} onChange={change} />;
}
```

## 4. Use state directly after executing setState

### Problem

When we modify the data through `setState()` and get the new data immediately, there will be a situation where the data is still the old data:

```jsx
// init state data
this.state = { name: "Chris1993" };

// update state data
this.setState({ name: "Hello Chris1993!" });
console.log(this.state.name); // output: Chris1993
```

We might think that the `this.state.name` entered at this point should be `Hello Chris1993!`, but it turns out to be `Chris1993`.

This is because `setState()` is asynchronous. When `setState()` is executed, the real update operation will be placed in the asynchronous queue for execution, and the code to be executed next (ie `console.log` this line) is executed synchronously, so the `state` printed out is not the latest value.

### Solutions

Just encapsulate the subsequent operation to be performed as a function as the second parameter of `setState()`, this callback function will be executed after the update is completed.

```jsx
this.setState({ name: "Hello Chris1993!" }, () => {
  console.log(this.state.name); // output: Hello Chris1993!
});
```

The correct content is now output.

## 5. Infinite loop when using useState + useEffect

### Problem

When we directly call the `set*()` method returned by `useState()` in `useEffect()`, and do not set the second parameter of `useEffect()`, we will find an infinite loop:

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  });
  return <div className="App">{count}</div>;
}
```

At this time, you can see that the data on the page has been increasing, and `useEffect()` has been called infinitely, entering an infinite loop state.

### Solutions

This is a common problem of using `useEffect()` incorrectly. `useEffect()` can be regarded as a combination of the three lifecycle functions `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` in class components.
`useEffect(effect, deps)` takes 2 arguments:

- `effect` side effect function;
- `deps` array of dependencies.

When the `deps` array changes, the side effect function `effect` is executed.
To modify the method, you only need to pass `[]` in the second parameter of `useEffect()`:

```jsx
export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div className="App">{count}</div>;
}
```

To summarize the 4 cases where `useEffect` is used:

- **Do not set the second parameter**: When any state is updated, the side effect function of `useEffect` will be triggered.

```jsx
useEffect(() => {
  setCount(count + 1);
});
```

- **The second parameter is an empty array**: The side effect function of `useEffect` is only triggered on mount and unmount.

```jsx
useEffect(() => {
  setCount(count + 1);
}, []);
```

- **The second parameter is a single-valued array: **The side-effect function of `useEffect` will be triggered only when the value changes.

```jsx
useEffect(() => {
  setCount(count + 1);
}, [name]);
```

- **The second parameter is a multi-valued array: **The side effect function of `useEffect` will only be triggered when the passed value changes.

```jsx
useEffect(() => {
  setCount(count + 1);
}, [name, age]);
```

## 6. Forgetting to clean up side effects in useEffect

### Problem

In class components, we use the `componentWillUnmount()` lifecycle method to clean up some side effects, such as timers, event listeners, etc.

### Solutions

A return function can be set for the side effect function of `useEffect()`, which is similar to the role of the `componentWillUnmount()` lifecycle method:

```jsx
useEffect(() => {
  // Other Code
  return () => clearInterval(id);
}, [name, age]);
```

### Documentation

[React - Example Using Hooks](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1)

## 7. Incorrect use of boolean operators

### Problem

In JSX/TSX syntax, we often use boolean values to control rendered elements, and in many cases we use the `&&` operator to handle this logic:

```jsx
const count = 0;
const Comp = () => count && <h1>Chris1993</h1>;
```

We thought that the page displayed empty content at this time, but it actually displayed the content of `0` on it.

### Solutions

The reason is because the [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) expression causes elements after `&&` to be skipped, but returns the value of the falsy expression. So we try to write the judgment condition as complete as possible, without relying on the true and false of JavaScript's boolean value to compare:

```jsx
const count = 0;
const Comp = () => count > 0 && <h1>Chris1993</h1>;
```

The page will display empty content.

### Documentation

[React - Inline If with Logical && Operator](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

## 8. The component parameter type is not defined

### Problem

It is common for team development. If the components developed by each person do not have well-defined parameter types, it is easy for cooperating colleagues to not know how to use the components, which is very troublesome, such as:

```jsx
const UserInfo = (props) => {
  return (
    <div>
      {props.name} : {props.age}
    </div>
  );
};
```

### Solutions

Solutions are

- Using TypeScript, define component `props` types;

```jsx
// ClassComponent
interface AppProps {
  value: string;
}
interface AppState {
  count: number;
}

class App extends React.Component<AppProps, AppStore> {
  // ...
}

// FunctionComponent
interface AppProps {
  value?: string;
}
const App: React.FC<AppProps> = ({ value = "", children }) => {
  //...
};
```

- Without using TypeScript, `props` types can be defined using `propTypes`;

```jsx
const UserInfo = (props) => {
  return (
    <div>
      {props.name} : {props.age}
    </div>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

## 9. Passing Strings as Values to Components

### Problem

Since React also has a template syntax, which is very similar to HTML, it often happens that numbers are passed directly to components as props, resulting in an unexpected value judgment:

```jsx
<MyComp count="99"></MyComp>
```

Passing `props.count === 99` in the `MyComp` component will return `false`.

### Solutions

The correct way should be to use curly brackets to pass parameters:

```jsx
<MyComp count={99}></MyComp>
```

## 10. There is no component name that starts with a capital letter

### Problem

Developers just starting out often forget to start with a capital letter for their component names. Components starting with a lowercase letter in JSX/TSX are compiled into HTML elements, such as `<div />` for HTML tags.

```jsx
class myComponent extends React.component {}
```

### Solutions

Just change the first letter to uppercase:

```jsx
class MyComponent extends React.component {}
```

### Documentation

[React - Rendering a Component](https://reactjs.org/docs/components-and-props.html#rendering-a-component)

## 11. Incorrect event binding for element

### Problem

```jsx
import { Component } from "react";

export default class HelloComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "Chris1993",
    };
  }

  update() {
    this.setState({ name: "Hello Chris1993!" });
  }
  render() {
    return (
      <div>
        <button onClick={this.update}>update</button>
      </div>
    );
  }
}
```

When clicking the `update` button, the console will report an error:

```typescript
Cannot read properties of undefined (reading 'setState')
```

### Solutions

This is because `this` points to the problem and there are several solutions:

- bind in the constructor

```jsx
constructor() {
  super();
  this.state = {
    name: "Chris1993"
  };
  this.update = this.update.bind(this);
}
```

- Use arrow functions

```jsx
update = () => {
  this.setState({ name: "Hello Chris1993!" });
};
```

- Bind in the render function (not recommended, create a new function every time the component renders, affecting performance)

```jsx
<button onClick={this.update.bind(this)}>update</button>
```

- Use arrow functions in the render function (not recommended, create a new function every time the component renders, affecting performance)

```jsx
<button onClick={() => this.update()}>update</button>
```

### Documentation

[React - How do I pass an event handler (like onClick) to a component?](https://reactjs.org/docs/faq-functions.html#how-do-i-pass-an-event-handler-like-onclick-to-a-component)

If you think this article is good, please like, comment and follow, your support is the biggest motivation for me to share.
