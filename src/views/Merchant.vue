<template>
  <el-container>
  <el-aside width="200px">
    <common-aside></common-aside>
  </el-aside>
    <el-main>
  <el-header height="auto" width="auto">
    <el-input type="text"
              v-model="searchname"
              placeholder="供应商名称"
              clearable
              style="width: 300px"
    />
    <el-button type="primary" @click="searchMerchant">查询</el-button>
    <el-button type="primary" @click="selectMerchant">显示所有供应商</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Merchantname"
              placeholder="供应商名称"
              clearable
              style="width: 400px"
    />
    <el-button type="primary" @click="addMerchant">添加</el-button>
    <el-table :data="results" style="width: fit-content">
      <el-table-column label="编号" width="400" prop="m_id">
      </el-table-column>
      <el-table-column label="供应商名称" width="400" prop="m_name">
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template #default="scope">
          <el-button type="primary" @click="deleteMerchant(scope.row.m_id,scope.row.m_name)">删除</el-button>
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
  name: "Merchant",
  components:{
    CommonAside
  },
  data (){
    return{
      Merchantname: '',
      searchname:'',
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
    searchMerchant:function (){
      var name={
        name:this.searchname,
      };
      getRequest("Merchant/search",name).then(res=>{
        this.results=res.data;
        ElMessage({
          message:'查询成功',
          type: 'success',
        })
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
        ElMessage({
          message:'删除成功',
          type: 'success',
        })
        this.selectMerchant();
      })
    },
    addMerchant:function (){
      if (this.Merchantname==='')
      {
        console.log("添加为空");
        ElMessage({
          message:'添加为空',
          type: 'warning',
        })
      }
      else
      {
        var Merchant = {
          m_id: 0,
          m_name: this.Merchantname
        };
        postRequest("Merchant/add",Merchant).then(res =>{
          console.log(res.message)
          ElMessage({
            message:'添加成功',
            type: 'success',
          })
          this.selectMerchant();
        })
      }
    }
  },
  created() {
    this.selectMerchant();
  }
}
</script>

<style scoped>

</style>
