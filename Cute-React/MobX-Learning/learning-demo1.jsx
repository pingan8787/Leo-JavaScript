import { observable, action} from 'mobx';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {observer, PropTypes as observablePropTypes} from 'mobx-react'


class Store {
    @observable cache = { queue: [] }

    @action.bound refresh(){
        this.cache.queue.push(1)
    }
}

const store = new Store();

// observer 在需要根据数据变换 而改变UI的组件去引用 另外建议有使用到相关数据的类 都引用
@observer
class Bar extends Component{
    static propTypes = {
        queue: observablePropTypes.observableArray
    }
    render(){
        const queue = this.props.queue;
        return <span>{queue.length}</span>
    }
}

class Foo extends Component{
    static propTypes = {
        cache: observablePropTypes.observableObject
    }
    render(){
        const cache = this.props.cache;
        return <div><button onClick={this.props.refresh}>点击 + 1</button> 当前数值：<Bar queue={cache.queue} /></div>
    }
}

ReactDOM.render(<Foo cache={store.cache} refresh={store.refresh}/>, document.querySelector("#root"))

// cnpm i react react-dom prop-types mobx-react -S
// cnpm i babel-preset-react -D

/*
mobx-react 已经为 react 组件实现了一个 shouldComponentUpdate 生命周期函数，我们再也不需要单独去做优化。

事实上，我们只需要记住 observer 方法，将所有 React 组件用 observer 修饰，就是 react-mobx 的用法
*/