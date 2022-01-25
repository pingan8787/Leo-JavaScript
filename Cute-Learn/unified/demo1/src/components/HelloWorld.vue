<script setup>
import { ref } from 'vue'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {reporter} from 'vfile-reporter'

defineProps({
  msg: String
})

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument, {title: '👋🌍'})
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process('# Hello world!')
  .then(
    (file) => {
      console.error(reporter(file))
      console.log(String(file))
    },
    (error) => {
      // Handle your error here!
      throw error
    }
  )
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
