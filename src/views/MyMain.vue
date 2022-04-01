<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px">
        <common-aside></common-aside>
      </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import Main from "@/views/Main";

export default {
  name: "MyMain",
  components:{
    CommonAside,
    Main
  }
}
</script>

<style scoped>

</style>
