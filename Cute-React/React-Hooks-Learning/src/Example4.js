// 父子组件通信

import React, { useState, createContext, useContext } from 'react';

const CountContext = createContext();

function Counter (){
    let count = useContext(CountContext)
    return (
        <p>{count}</p>
    )
}

function Example (){
    const [ count, setCount ] = useState(0);
    return (
        <div>
            <p>你点击了{count}次！</p>
            <button onClick={() => {setCount(count + 1)}}>点击</button>
            <CountContext.Provider value={count}>
              <Counter />
            </CountContext.Provider>
        </div>
    )
}
export default Example