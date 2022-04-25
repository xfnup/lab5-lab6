<template>
  <el-container>
  <el-aside width="200px">
    <common-aside></common-aside>
  </el-aside>
  <el-main>
  <el-header height="auto" width="auto">
    <el-input type="text"
              v-model="searchname"
              placeholder="商品名称"
              clearable
              style="width: 500px"
    />
    <el-button type="primary" @click="searchGoos">查询</el-button>
    <el-button type="primary" @click="selectGoos">显示所有商品</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Goodsname"
              placeholder="商品名称"
              clearable
              style="width: 500px"
    />
    <el-button type="primary" @click="addGoods">添加</el-button>
  <el-table :data="results" style="width: fit-content">
    <el-table-column label="编号" width="400" prop="g_id">
    </el-table-column>
    <el-table-column label="名称" width="400" prop="g_name">
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template #default="scope">
        <el-button type="primary" @click="deleteGoods(scope.row.g_id,scope.row.g_name)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
  </el-main>
  </el-container>
</template>

<script>
import {getRequest,postRequest} from "@/tool/api";
import CommonAside from "@/components/CommonAside";
import {ElMessage} from "element-plus";
export default {
  name: "Main",
  components:{
    CommonAside
  },
  data (){
    return{
      Goodsname: '',
      searchname:'',
      results: [
        {
          g_id: 2,
          g_name: '可乐'
        },
        {
          g_id: 3,
          g_name: '雪碧'
        }
      ]
    }
  },
  methods: {
    selectGoos:function (){
      getRequest("/Goods/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    searchGoos:function () {
      var name={
        name:this.searchname,
      };
      getRequest("Goods/search",name).then(res=>{
        this.results=res.data;
        ElMessage({
          message:'查询成功',
          type: 'success',
        })
      })
    },
    deleteGoods:function (g_id,g_name){
      console.log(g_id);
      console.log(g_name);
      var Goods = {
        g_id: g_id,
        g_name: g_name
      };
      postRequest("Goods/delete",Goods).then(res =>{
        console.log(res.message)
        ElMessage({
          message:'删除成功',
          type: 'success',
        })
        this.selectGoos();
      })
    },
    addGoods:function (){
      if (this.Goodsname==='')
      {
        console.log("添加为空");
        ElMessage({
          message:'添加为空',
          type: 'warning',
        })
      }
      else
      {
        var Goods = {
          g_id: 0,
          g_name: this.Goodsname
        };
        postRequest("Goods/add",Goods).then(res =>{
          console.log(res.message)
          ElMessage({
            message:'添加成功',
            type: 'success',
          })
          this.selectGoos();
        })
      }
    }
  },
  created() {
    this.selectGoos();
  }
}
</script>

<style scoped>

</style>
