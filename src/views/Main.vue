<template>
  <el-header height="auto" width="auto">
    <el-button type="primary" @click="selectGoos">显示所有商品</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Goodsname"
              placeholder="商品名称"
              clearable
              style="width: 1000px"
    />
    <el-button type="primary" @click="addGoods">添加</el-button>
  <el-table :data="results" style="width: fit-content">
    <el-table-column label="编号" width="400" prop="g_id">
    </el-table-column>
    <el-table-column label="名称" width="400" prop="g_name">
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button type="primary" @click="deleteGoods(scope.row.g_id,scope.row.g_name)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
</template>

<script>
import {getRequest,postRequest} from "@/tool/api";
export default {
  name: "Main",
  data (){
    return{
      Goodsname: '',
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
    deleteGoods:function (g_id,g_name){
      console.log(g_id);
      console.log(g_name);
      var Goods = {
        g_id: g_id,
        g_name: g_name
      };
      postRequest("Goods/delete",Goods).then(res =>{
        console.log(res.message)
      })
    },
    addGoods:function (){
      if (this.Goodsname==='')
      {
        console.log("添加为空");
      }
      else
      {
        var Goods = {
          g_id: 0,
          g_name: this.Goodsname
        };
        postRequest("Goods/add",Goods).then(res =>{
          console.log(res.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
