<template>
  <div class="postnote">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model.trim="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model.trim="form.category" placeholder="请选择分类">
          <el-option label="生活" value="life"></el-option>
          <el-option label="工作" value="work"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model.trim="form.content"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';

@Component
export default class UploadNote extends Vue {
  // 添加事项信息
  form = {
    title: '',
    category: '',
    content: ''
  };

  @Watch('form', { deep: true }) // 监视表单内容，只要一变化就发送
  @Emit('getInfo') // 子传父
  onChangeForm(newValue: Record<string, string>): Record<string, string> {
    return newValue; // 传递的值为newValue
  }
}
</script>

<style>
</style>
