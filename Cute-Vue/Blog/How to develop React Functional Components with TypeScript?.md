When we use React to develop projects, the most used components should be components, and components are divided into **Functional Components** and **Class Components**, we can define it as follows:

- define Functional Components

```JS
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- define Class Components

```TSX
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

In this article, I will introduce 4 ways to use TypeScript to define Functional Components, and there are several issues that need to be paid attention to during the use.

## How to define Functional Components with TypeScript

Functional Components usually take a `props` parameter and return a JSX element or `null`.

When we need to use TypeScript to define a Functional Component, we have 4 ways, each of which has its own advantages and disadvantages, depending on the specific situation.

### 1. Using React.FC

Since React is not developed with TypeScript, it uses types provided by the community developed `@type/react` package, which has a generic type `FC` that allows us to add types to functional components.

```TSX
type FCProps = { text: string };

const FCComponent: React.FC<FCProps> = ({ text = "" }) => <div>{text}</div>;
```

Here `React.FC` is shorthand for `React.FunctionComponent`.

When a component contains child elements, TypeScript will prompt a warning:

```TSX
type FCProps = { text: string };
const FCComponent: React.FC<FCProps> = ({ text = "" }) => <div>{text}</div>;

function App() {
  return (
    <div className="App">
        <FCComponent text="Hello Chris1993.">
            <span>children</span>
        </FCComponent>
    </div>
  );
}
```

Prompt warning content:

```
Type '{ children: string; text: string; }' is not assignable to type 'IntrinsicAttributes & FCProps'.
  Property 'children' does not exist on type 'IntrinsicAttributes & FCProps'.
```

This is now deprecated. For specific discussions, see these two links:

- [Remove React.FC from Typescript template #8177](https://github.com/facebook/create-react-app/pull/8177)；
- [《TypeScript + React: Why I don't use React.FC》](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/)。

### 2. Using JSX.Element

Use the `JSX.Element` type as the return value type of a Functional Component. When the return value of the component is not a `JSX.Element` type, TypeScript will prompt an error.

```TSX
type FCProps = { text: string };
const ElementComponent = ({ text }: FCProps): JSX.Element => <div>{text}</div>;
function App() {
  return (
    <div className="App">
        <ElementComponent text="Hello Chris1993."></ElementComponent>
    </div>
  );
}
```

### 3. Define the full type directly

Since the `React` component contains a child element, it will implicitly pass a `children` attribute, resulting in an error in the defined parameter type, so we can directly define a complete parameter interface, including the type of the `children` attribute:

```TSX
type FCProps = { text: string; children?: any };
const FCComponent: React.FC<FCProps> = ({ text = "" }) => <div>{text}</div>;

function App() {
  return (
    <div className="App">
        <FCComponent text="Hello Chris1993.">
            <span>children</span>
        </FCComponent>
    </div>
  );
}
```

### 4. Using React.PropsWithChildren

The third method is more troublesome to manually write a `children` property type each time, then we can use the `React.PropsWithChildren` type, which itself encapsulates the `children` type declaration:

```TypeScript
// react/index.d.ts
type PropsWithChildren<P> = P & { children?: ReactNode };
```

So, use the `React.PropsWithChildren` type to define Functional Components without having to deal with the type of `children`:

```TSX
type IProps = React.PropsWithChildren<{ text: string }>;
const PropsComponent = ({ text }: IProps) => <div>{text}</div>;
function App() {
  return (
    <div className="App">
        <PropsComponent text="Hello Chris1993.">
            <span>children</span>
        </PropsComponent>
    </div>
  );
}
```

## Points to note during use

### 1. Functional Components cannot return boolean values

When we use a conditional statement inside a Functional Component, React will throw an error if it returns a non-JSX element or a non-null value:

```TSX
const ConditionComponent = ({ useRender = false }) =>
  useRender ? <span>Render ConditionComponent</span> : false;// ❌

function App() {
  return (
    <div className="App">
        <ConditionComponent useRender></ConditionComponent>
        {/* 'ConditionComponent' cannot be used as a JSX component.
            Its return type 'false | Element' is not a valid JSX element.
            Type 'boolean' is not assignable to type 'ReactElement<any, any>'.
        */}
    </div>
  );
}
```

The correct way to do it is to have the functional component return a valid JSX element or null:

```TSX
const ConditionComponent = ({ useRender = false }) =>
  useRender ? <span>Render ConditionComponent</span> : <span>error</span>;// ✅

// or

const ConditionComponent = ({ useRender = false }) =>
  useRender ? <span>Render ConditionComponent</span> : null;// ✅

```

Of course, you can't write it like this, when the property `useRender` is `false`, it will also error:

```TSX
const ConditionComponent = ({ useRender = false }) =>
  useRender && <span>Render ConditionComponent</span>;// ❌
```

### 2. Unable to use Array.fill() to fill components

TypeScript throws an error when our component returns the result of `Array.fill()` directly.

```TSX
const ArrayComponent = () => Array(3).fill(<span>Chris1993</span>); // ❌

function App() {
  return (
    <div className="App">
      <ArrayComponent></ArrayComponent>
    </div>
  );
}
```

Prompt the following:

```
'ArrayComponent' cannot be used as a JSX component.
  Its return type 'any[]' is not a valid JSX element.
    Type 'any[]' is missing the following properties from type 'ReactElement<any, any>': type, props, key
```

To solve this problem, we can define the return type of the function:

```TSX
const ArrayComponent = () =>
  Array(3).fill(<span>Chris1993</span>) as any as JSX.Element; // ✅
```

### 3. Support Generic Components

When using TypeScript to develop React Functional Components, you can also use generics to constrain and declare a Generic Components, which can make our components more flexible.

It can be used like this:

```TSX
interface GenericProps<T> {
  content: T;
}
const GenericComponent = <T extends unknown>(props: GenericProps<T>) => {
  const { content } = props;
  const component = <>{content}</>;
  return <div>{component}</div>;
};
function App() {
  return (
    <div className="App">
      { /* Success ✅ */}
      <GenericComponent<number> content={10} />
      { /* Error ❌ Type 'string' is not assignable to type 'number'. */}
      <GenericComponent<number> content={"10"} />
    </div>
  );
}
```

More advanced usage is described in the [Generic Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#generic-components) chapter:

```TSX
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};
function App() {
  return (
    <div className="App">
        <List<number>
          items={[1, 2]} // type of 'string' inferred
          renderItem={(item) => (
            <li key={item}>
              {/* Error: Property 'toPrecision' does not exist on type 'string'. */}
              {item.toPrecision(3)}
            </li>
          )}
        />
    </div>
  );
}
```

## References

- [React](https://reactjs.org/)
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)
