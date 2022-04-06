<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from "@/views/Main";

export default {
  name: "MyMain",
  components:{
    Main
  }
}
</script>

<style scoped>

</style>
