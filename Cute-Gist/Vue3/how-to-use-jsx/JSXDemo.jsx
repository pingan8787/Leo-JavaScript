import { h, ref, reactive, defineComponent } from 'vue'

// const ChildComponent = defineComponent(() => {
//     console.log(this)
//     return () => (
//         <div>hello 子组件</div>
//     )
// })

const ChildComponent = {
    render (h){
        console.log(this.$slots)
        return (
            <div>
                <div>hello 子组件</div>
                <slot1>{this.$slots.slot1}</slot1>
                <slot2>{this.$slots.slot2}</slot2>
            </div>
        )
    }
}

const ParentComponent = {

    render (h){
        return (
            <ChildComponent>
                <template slot="slot1">hello 父组件 slot1</template>
                <div slot="slot2">hello 父组件 slot2</div>
            </ChildComponent>
        )
    }
}

export default defineComponent(() => {
    const count = ref(0)
    const click = () => {
        count.value++;
    }

    return () => (
        <div>
            <ParentComponent></ParentComponent>
            <div>内容：{count.value}</div>
            <button onClick={click}>增加</button>
        </div>
    )
});
/*

// template.config.jsx
const template = {
    "textTemplate": (params) => {
        const { text } = params;
        <div class = "textTemplate">
            <div>{text}</div>
        </div>  
    },
    "functionTemplate": (params) => {
        const { clickFn } = params;
        <div class = "functionTemplate">
            <div onClick={clickFn}>点击</div>
        </div>  
    },
}

const TempComponent = (type, ctx) => {
    // 参数校验
    const params = normalized(ctx);
    return template(type, params);
}


// component.jsx
const Component {
    const { type } = this.props;
    return () => (
        <div>
            {
                type && TempComponent(type, this)
            }
        </div>
    )
}



*/