import React, { useReducer } from 'react'

function Example(){
    const [count, dispatch] = useReducer((state, action) => {
        switch(action){
            case "add":
                return state + 1
            case "sub":
                return state - 1
            default:
                return false 
        }
    },0)

    return (
        <div>
            <p>现在分数：{count}</p>
            <button onClick={() => {dispatch('add')}}>加</button>
            <button onClick={() => {dispatch('sub')}}>减</button>
        </div>
    )
}


export default Example