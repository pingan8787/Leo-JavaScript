import React, { useState, useMemo } from 'react'

function Example7(){
    const [leo1, setLeo1] = useState('我是leo1')
    const [leo2, setLeo2] = useState('我是leo2')

    return (
        <>
            <button onClick={() => {setLeo1(new Date().getTime())}}>我是leo1</button>
            <button onClick={() => {setLeo2(new Date().getTime() + ' hello')}}>我是leo2</button>
            <ChildComponent name={leo1}>{leo2}</ChildComponent>  
        </>
    )
}

function ChildComponent({name, children}){

    function changeLeo1(name){
        console.log("11111111111111")
        return name + ',来了'
    }
    const action = useMemo(()=>changeLeo1(name), [name]) // 只有[name]中变量发生改变才会执行
    return (
        <>  
            <div> {action} </div>
            <div> {children} </div>
        </>
    )
}

export default Example7