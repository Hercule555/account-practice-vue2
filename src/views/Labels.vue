<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script  lang="ts">
import Button from "@/components/Button.vue";
import TagHelper from "@/mixins/TagHepler";
import Vue from "vue";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component({  components: { Button },})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  max-height: 80%;
  overflow: scroll;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #bcbbc1;
    svg {
      margin-right: 16px;
      color: #3e3e3e;
      height: 20px;
      width: 20px;
    }
  }
}
.createTag {
  background: rgb(98, 98, 241);
  color: white;
  border-radius: 4px;
  border: none;
  font-size: 17px;
  padding: 10px 15px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 70px
  }
}
</style>