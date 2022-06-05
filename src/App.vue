<template>
  <div class="app">
    <HeaderBar></HeaderBar>
    <MainBody></MainBody>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderBar from '@/components/HeaderBar.vue';
import MainBody from '@/components/MainBody.vue';

@Component({
  components: {
    HeaderBar,
    MainBody
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
