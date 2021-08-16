import { defineComponent, ref } from "_vue@3.1.5@vue";

export default defineComponent({
    props: {
        name: {
            default: 'leo',
            type: String
        }
    },
    setup(props){
        const state = ref(0);

        return () => {
            return <div>{props.name}</div>
        }
    }
})