<template>
  <div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
    >
      <el-menu-item @click="gotoMain">
        <el-icon><icon-menu /></el-icon>
        <template #title>商品</template>
      </el-menu-item>
      <el-menu-item @click="gotoStorage">
        <el-icon><location /></el-icon>
        <template #title>仓库</template>
      </el-menu-item>
      <el-menu-item @click="gotoCustomer">
        <el-icon><location /></el-icon>
        <template #title>客户</template>
      </el-menu-item>
      <el-menu-item @click="gotoMerchant">
        <el-icon><location /></el-icon>
        <template #title>供应商</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import {Location, Menu as IconMenu} from '@element-plus/icons'
export default {
  name: "CommonAside",
  components: {
    Location, IconMenu
  },
  setup(){
    const router = useRouter();
    const gotoMain = () => {
      router.push({
        name: 'Main',
      });
    };
    const gotoStorage = () => {
      router.push({
        name: 'Storage',
      });
    };
    const gotoCustomer = () => {
      router.push({
        name: 'Customer',
      });
    };
    const gotoMerchant = () => {
      router.push({
        name: 'Merchant',
      });
    };
    return{
      gotoMain,
      gotoStorage,
      gotoCustomer,
      gotoMerchant
    }
  }
}
</script>

<style scoped>

</style>
