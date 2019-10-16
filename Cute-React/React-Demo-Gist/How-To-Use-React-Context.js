import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const ArticleContext = React.createContext({
    content: '<p>default</p>',
    show: false,
    title: 'defaultTitle',
    copyright : 'defaultCopyright'
});

class App extends Component {
    constructor(props){
        super(props)
        this.state = { }
    }
    render() {
        return (
            <ArticleComponent>
                <Title></Title>
                <Header></Header>
                <Footer></Footer>
            </ArticleComponent>
        );
    }
}

class ArticleComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            renderData : {}
        }
    }

    componentWillMount(){
        this.getAjax()
    }

    getAjax(){
        // TODO 网络请求获取数据并返回
        const renderData = {
            title: '标题内容',
            content: '<p>学习如何使用 React Context 创建多层组件通信</p>',
            show: false,
            copyright : 'pingan8787版权所有'
        }
        this.setState({renderData})
    }
    render() {
        const { renderData } = this.state;
        return (
            <ArticleContext.Provider value={renderData}>
                {
                    React.Children.map(this.props.children, function (child) {
                        return <div>{child}</div>;
                    })
                }
            </ArticleContext.Provider>
        );
    }
}
class Header extends Component {
    render() {
        return (
            <ArticleContext.Consumer>
                {context => (
                    <Content content={context.content}></Content>
                )}
            </ArticleContext.Consumer>
            
        );
    }
}
  
class Title extends Component {
    render() {
        return (
            <ArticleContext.Consumer>
                {context => (
                    <Content content={context.title}></Content>
                )}
            </ArticleContext.Consumer>
        );
    }
}

/*
    Footer 组件比较特殊，用于直接渲染具体 HTML 代码，而不是再传递到其他组件
*/
class Footer extends Component {
    render() {
        return (
            <ArticleContext.Consumer>
                {context => (
                    <div>声明：{context.copyright}</div>
                )}
            </ArticleContext.Consumer>
        );
    }
}

class Content extends Component {
    render() {
        const { content, title } = this.props;
        return (
            <div>
                <div>标题：{title}</div>
                <div>正文：{content}</div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));