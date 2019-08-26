import React, { Component } from 'react'

export default class Example3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            count:0
        }
    }
    add(){
        this.setState({count:this.state.count + 1})
    }
    componentDidMount(){
        console.log(`componentDidMount =》 ${this.state.count}`)
    }
    componentDidUpdate(){
        console.log(`componentDidUpdate =》 ${this.state.count}`)
    }
    render() {
        return (
            <div>
                <p>你点击了{this.state.count}次！</p>
                <button onClick={this.add.bind(this)}>点击</button>
            </div>
        )
    }
}
