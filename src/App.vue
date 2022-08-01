<template>
  <div id="app">
    <FileList></FileList>
  </div>
</template>

<script>
import FileList from './components/FileList'

export default {
  name: 'App',
  components: {
    FileList
  }
}
</script>

<style>
.body {
  overflow-x: hidden;
}
</style>
