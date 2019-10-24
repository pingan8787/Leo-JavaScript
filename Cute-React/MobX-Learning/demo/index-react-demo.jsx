// cnpm i react react-dom prop-types mobx-react -S
// cnpm i babel-preset-react -D

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable, action} from 'mobx';
import PropTypes from 'prop-types';
import {observer, PropTypes as ObservablePropTypes} from 'mobx-react';


class Store {
    @observable cache = {queue : []}

    @action.bound refresh(){
        this.cache.queue.push(1)
    }
}

const store = new Store()



@observer
class Bar extends Component {
    static propTypes = {
        queue: ObservablePropTypes.observableArray
    }
    render() {
        const queue = this.props.queue;
        return (
             <span>{queue.length}</span>
        );
    }
}

class Foo extends Component {
    static propTypes = {
        queue: ObservablePropTypes.observableObject
    }
    render() {
        const cache = this.props.cache
        return (
            <div>
                <button onClick={this.props.refresh}>点击</button>
                <Bar queue = {cache.queue}></Bar>
            </div>
        );
    }
}

ReactDOM.render(<Foo cache={store.cache} refresh = {store.refresh}/>, document.querySelector('#root'))