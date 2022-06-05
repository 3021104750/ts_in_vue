<template>
  <div class="headerbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      style="display: flex; align-items: center"
    >
      <el-menu-item index="1">新建</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1" @click="linkTo($event)">所有</el-menu-item>
        <el-menu-item index="2-2" @click="linkTo($event)">生活</el-menu-item>
        <el-menu-item index="2-3" @click="linkTo($event)">工作</el-menu-item>
      </el-submenu>
      <el-badge :value="ListLength" :max="99" type="primary">
        <el-tag
          type="info"
          size="mini"
          effect="dark"
          style="margin-left: 20px"
          >{{ categoryInHeaderBar }}</el-tag
        >
      </el-badge>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UploadNote from '@/components/UploadNote.vue';

@Component({
  components: {
    UploadNote
  }
})
export default class HeaderBar extends Vue {
  activeIndex = '1';
  formList: Record<string, unknown> = {}; // 表单内容
  id = 1; // formList id
  categoryInHeaderBar = '全部事项'; // headerBar 的分类显示
  ListLength = 0; // 事项数量

  // 获取表单内容并且赋值
  getInfo(value: Record<string, string>): void {
    this.formList = value;
  }

  get formListFromVuex(): Record<string, unknown>[] {
    return this.$store.state.CATEGORY.formList;
  }

  // formListFromVuex 改变的时候，判断当前在哪个路由页面，获取当前页面分类的数量
  @Watch('formListFromVuex')
  onChangedFormListFromVuex(): void {
    switch (this.$route.name) {
      case 'CategoryAll':
        this.ListLength = this.formListFromVuex.length;
        break;
      case 'Life':
        this.ListLength = this.$store.state.CATEGORY.type.life.length;
        break;
      case 'Work':
        this.ListLength = this.$store.state.CATEGORY.type.work.length;
        break;
    }
  }

  // 路由跳转
  linkTo(e: Record<string, unknown>): void {
    switch (e.index) {
      case '2-1':
        this.$router.push('/categoryAll');
        this.categoryInHeaderBar = '全部事项';
        // 点击路由跳转时，获取当前分类的数量
        this.ListLength = this.formListFromVuex.length;
        break;
      case '2-2':
        this.$router.push('/life');
        this.categoryInHeaderBar = '生活';
        this.ListLength = this.$store.state.CATEGORY.type.life.length;
        break;
      case '2-3':
        this.ListLength = this.$store.state.CATEGORY.type.work.length;
        this.$router.push('/work');
        this.categoryInHeaderBar = '工作';
        break;
    }
  }

  // 选择 menu-item
  handleSelect(key: string): void {
    // 如果选中的是新建的话
    if (key === '1') {
      // 动态创建一个dom元素
      const h = this.$createElement;
      // 创建一个消息盒子
      this.$msgbox({
        title: '添加事项',
        message: h(UploadNote, {
          on: {
            // 子传父
            getInfo: this.getInfo
          }
        }),
        showCancelButton: true,
        cancelButtonText: '返回',
        confirmButtonText: '添加',
        beforeClose: (action, instance, done) => {
          // 关闭 msgbox 前，判断点击的是哪个按钮
          // confirm按钮的话，判断内容是否有空值，为空的话，弹窗提示，反之关闭msgbox
          if (action === 'confirm') {
            if (
              Object.values(this.formList).length === 0 ||
              Object.values(this.formList).some((item) => item === '')
            ) {
              this.$message({
                type: 'error',
                message: '信息未填写完整 或 部分内容未填写'
              });
            } else {
              done();
            }
          } else {
            done();
          }
        }
      })
        .then(() => {
          // 点击添加 显示提示
          this.$notify({
            title: '成功',
            message: '事项添加成功！',
            type: 'success',
            duration: 2500,
            showClose: false
          });
          // 判断vuex里formList是否为空，空的话重置id为1，反之++
          if (this.$store.state.CATEGORY.formList.length === 0) {
            this.id = 1;
            this.formList.id = this.id;
          } else {
            this.formList.id = ++this.id;
          }
          // 发送formList到vuex
          this.$store.commit('CATEGORY/getFormList', this.formList);
          // 初始化清空formlist里的值
          for (let k in this.formList) {
            if (k !== 'id') {
              this.formList[k] = '';
            }
          }
        })
        .catch(() => {});
    }
  }
}
</script>

<style>
</style>
