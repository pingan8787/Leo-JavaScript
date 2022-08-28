如何使用 TypeScript 写出更优雅的 React 函数式组件
How to develop React Functional Components with TypeScript?

在我们使用 React 开发项目时，使用最多的应该都是组件，组件又分为**函数组件**和**类组件**，我们可以这么定义：

- 定义函数组件

```JS
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 定义类组件

```JSX
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

这篇文章我会和大家介绍使用 TypeScript 定义函数式组件的 4 种方法，还有几个使用过程中需要注意的问题。

## 如何使用 TypeScript 定义函数式组件

函数式组件通常接受一个 `props` 参数，返回一个 JSX 元素或者 `null`。

当我们需要使用 TypeScript 去定义一个函数式组件时，我们有 4 种方式，4 种方式各有各的优缺点，看具体情况使用。

### 1. 使用 React.FC

由于 React 不是使用 TypeScript 开发的，使用的是社区开发的 `@type/react` 包提供的类型，里面有一个通用类型 `FC` ，允许我们为函数组件添加类型。

```JSX
type FCProps = { text: string };
// React.FunctionComponent 的简写
const FCComponent: React.FC<FCProps> = ({ text = "" }) => <div>{text}</div>;
```

这里的 `React.FC` 是 `React.FunctionComponent` 的简写。

当组件包含子元素，TypeScript 会提示警告：

```JSX
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

提示警告内容：

```
Type '{ children: string; text: string; }' is not assignable to type 'IntrinsicAttributes & FCProps'.
  Property 'children' does not exist on type 'IntrinsicAttributes & FCProps'.
```

现在不推荐使用这个了，具体讨论可以看这两个链接：

- [Remove React.FC from Typescript template #8177](https://github.com/facebook/create-react-app/pull/8177)；
- [《TypeScript + React: Why I don't use React.FC》](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/)。

### 2. 使用 JSX.Element

使用 `JSX.Element` 类型作为函数式组件的返回值类型，当组件的返回值不是 `JSX.Element` 类型时，TypeScript 就会提示错误。

```JSX
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

### 3. 直接定义完整类型

由于 `React` 组件包含子元素时，会隐式传递一个 `children` 属性，导致定义的参数类型出错，因此我们可以直接定义一个完整的参数接口，包含了 `children` 属性的类型：

```JSX
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

### 4. 使用 React.PropsWithChildren

第 3 种方法每次都要手动写一个 `children` 属性类型比较麻烦，这时候我们就可以使用 `React.PropsWithChildren` 类型，它本身封装了 `children` 的类型声明：

```TypeScript
// react/index.d.ts
type PropsWithChildren<P> = P & { children?: ReactNode };
```

因此，使用 `React.PropsWithChildren` 类型定义函数式组件，就不用去处理 `children` 的类型了：

```JSX
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

## 使用过程需要注意的点

### 1. 函数式组件返回值不能是布尔值

当我们在函数式组件内使用**条件语句**时，如果返回的是非 JSX 元素或者非 null 的值，React 将会报错：

```JSX
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

正确的处理方式，应该是让函数式组件返回一个有效的 JSX 元素或者 null:

```JSX
const ConditionComponent = ({ useRender = false }) =>
  useRender ? <span>Render ConditionComponent</span> : <span>error</span>;// ✅

// or

const ConditionComponent = ({ useRender = false }) =>
  useRender ? <span>Render ConditionComponent</span> : null;// ✅

```

当然你也不能这样写，当属性 `useRender` 为 `false` 时，也会出错：

```JSX
const ConditionComponent = ({ useRender = false }) =>
  useRender && <span>Render ConditionComponent</span>;// ❌
```

### 2. 无法为组件使用 Array.fill() 填充

当我们的组件直接返回 `Array.fill()` 的结果时，TypeScript 会提示错误。

```JSX
const ArrayComponent = () => Array(3).fill(<span>Chris1993</span>); // ❌

function App() {
  return (
    <div className="App">
      <ArrayComponent></ArrayComponent>
    </div>
  );
}
```

提示下面内容：

```
'ArrayComponent' cannot be used as a JSX component.
  Its return type 'any[]' is not a valid JSX element.
    Type 'any[]' is missing the following properties from type 'ReactElement<any, any>': type, props, key
```

为了解决这个问题，我们可以定义函数的返回值类型：

```JSX
const ArrayComponent = () =>
  Array(3).fill(<span>Chris1993</span>) as any as JSX.Element; // ✅
```

### 3. 支持使用泛型来创建组件

在使用 TypeScript 开发 React 函数式组件的时候，也可以使用泛型进行约束，声明一个泛型组件（Generic Components），这样可以让我们的组件更加灵活。

可以这样使用：

```JSX
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

在 [Generic Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#generic-components) 章节中介绍到更高级的使用方式：

```JSX
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

## 参考资料

- [React](https://reactjs.org/)
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)
