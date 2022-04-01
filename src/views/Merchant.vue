<template>
  <el-header height="auto" width="auto">
    <el-button type="primary" @click="selectMerchant">显示所有供应商</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Merchantname"
              placeholder="供应商名称"
              clearable
              style="width: 1000px"
    />
    <el-button type="primary" @click="addMerchant">添加</el-button>
    <el-table :data="results" style="width: fit-content">
      <el-table-column label="编号" width="400" prop="m_id">
      </el-table-column>
      <el-table-column label="供应商名称" width="400" prop="m_name">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteMerchant(scope.row.m_id,scope.row.m_name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import {getRequest,postRequest} from "@/tool/api";
export default {
  name: "Merchant",
  data (){
    return{
      Merchantname: '',
      results: [
        {
          m_id: 2,
          m_name: '供应商'
        },
        {
          m_id: 3,
          m_name: '供应商'
        }
      ]
    }
  },
  methods: {
    selectMerchant:function (){
      getRequest("/Merchant/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    deleteMerchant:function (m_id,m_name){
      console.log(m_id);
      console.log(m_name);
      var Merchant = {
        m_id: m_id,
        m_name: m_name
      };
      postRequest("Merchant/delete",Merchant).then(res =>{
        console.log(res.message)
      })
    },
    addMerchant:function (){
      if (this.Merchantname==='')
      {
        console.log("添加为空");
      }
      else
      {
        var Merchant = {
          m_id: 0,
          m_name: this.Merchantname
        };
        postRequest("Merchant/add",Merchant).then(res =>{
          console.log(res.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
