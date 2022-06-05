<template>
  <div class="mainbody">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MainBody extends Vue {}
</script>

<style>
</style>
