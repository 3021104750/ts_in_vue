<template>
  <div class="categoryall">
    <el-empty
      description="暂无添加事项！"
      :image="require('@/assets/images/Empty_Pic.webp')"
      :image-size="300"
      v-if="showElEmptyFlag"
    ></el-empty>
    <el-collapse v-model="activeName" accordion v-if="!showElEmptyFlag">
      <el-collapse-item v-for="item in formList" :key="item.id">
        <template slot="title">
          <div style="font-size: 18px">{{ item.title }}</div>
          <el-tag type="info" size="mini" style="margin-left: 10px">{{
            item.category === 'life' ? '生活' : '工作'
          }}</el-tag>
        </template>
        <div>
          {{ item.content }}
        </div>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          style="float: right; margin: 0 40px 15px 0"
          @click="removeList(item.id, item.category)"
        ></el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class CategoryAll extends Vue {
  activeName = '1';
  showElEmptyFlag = false;

  get formList(): Record<string, unknown>[] {
    return this.$store.state.CATEGORY.formList;
  }

  removeList(id: number, category: string): void {
    let obj = {
      id: id,
      category: category
    };
    this.$store.commit('CATEGORY/removeList', obj);
  }

  // 每次加载页面时，判断formList里是否为空，为空的话显示el-empty提示框
  created(): void {
    if (this.formList.length === 0) {
      this.showElEmptyFlag = true;
    }
  }

  // 监听formList，每次改变都判断formList里是否为空，为空的话显示el-empty提示框
  @Watch('formList')
  onChangedFormList(): void {
    if (this.formList.length === 0) {
      this.showElEmptyFlag = true;
    } else {
      this.showElEmptyFlag = false;
    }
  }
}
</script>

<style>
</style>
