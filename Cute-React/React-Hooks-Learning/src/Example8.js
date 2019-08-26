import React, { useState, useRef, useEffect } from 'react'

function Example8(){
    const inputEl = useRef(null);
    const onLeo = () => {
        inputEl.current.value = "hello leo!"
        console.log(inputEl)
    }

    const [text, setText] = useState('leo')
    const textRef = useRef()

    useEffect(() => {
        textRef.current = text
        console.log('textRef.current',textRef.current)
    })

    return (
        <>
            <input type="text" ref={inputEl} />
            <button onClick={onLeo}>在input中展示文字</button>
            <br />
            
            <input value={text} onChange={e=>{setText(e.target.value)}}/>
        </>
    )
}

export default Example8