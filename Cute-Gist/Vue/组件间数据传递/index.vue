<template>
    <div>
        <h1>组件传值</h1>
        <Parent2Children />
        <Children2Parent />
        <ParentGetChildren />
        <ChildrenGetParent />
        <ProvideAndInject />
    </div>
</template>

<script>
import Parent2Children from './Parent2Children/Parent';
import Children2Parent from './Children2Parent/Parent';
import ParentGetChildren from './ParentGetChildren/Parent';
import ChildrenGetParent from './ChildrenGetParent/Parent';
import ProvideAndInject from './ProvideAndInject/Parent';

export default {
  name: "DataTransformPage",
  components: {
      Parent2Children, Children2Parent, ParentGetChildren, ChildrenGetParent, ProvideAndInject
  },
  data() {
      return {

      }
  }
}
</script>
<style scoped>

</style>