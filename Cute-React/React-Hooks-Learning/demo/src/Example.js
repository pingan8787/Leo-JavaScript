import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

function Index (){
    useEffect(()=>{
        console.log(`useEffect =》Index`)
        return ()=>{
            console.log(`useEffect =》Index（离开）`)
        }
    })
    return <h2>leo</h2>
}
function List (){
    useEffect(()=>{
        console.log(`useEffect =》List`)
        return ()=>{
            console.log(`useEffect =》List（离开）`)
        }
    }, [])
    return <h2>list</h2>
}

function Example (){
    const [ count, setCount ] = useState(0);
    useEffect(()=>{
        console.log(`useEffect =》 ${count}`)
        return ()=>{
            console.log(`========`)
        }
    },[count])
    return (
        <div>
            <p>你点击了{count}次！</p>
            <button onClick={() => {setCount(count + 1)}}>点击</button>

            <Router>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/list">路由</Link></li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list" component={List} />
            </Router>
        </div>
    )
}
export default Example