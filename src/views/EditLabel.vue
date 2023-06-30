<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="currentTag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags')
    this.$store.commit("setCurrent", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag',{id:this.currentTag.id,name:name})
      
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag',this.currentTag.id)
      //todo 知识点 store.removeTag
      // if(oldStore.removeTag(this.tag.id)) {
      //   this.$router.back()
      // }else {
      //   window.alert('删除失败')
      // }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  background: white;
  padding: 12px 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {
    width: 24px;
    height: 24px;
    left: 16px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 12px;
  margin-top: 44-16px;
}
</style>