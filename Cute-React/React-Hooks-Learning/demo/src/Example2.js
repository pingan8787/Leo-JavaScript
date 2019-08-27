import React, { useState } from 'react'

function Example (){
    const [ age, setAge ] = useState(18);
    const [ sex, setSex ] = useState('男');
    const [ work, setWork ] = useState('前端开发');

    return (
        <div>
            <p>今年：{age}</p>
            <p>性别：{sex}</p>
            <p>工作：{work}</p>
        </div>
    )
}
export default Example