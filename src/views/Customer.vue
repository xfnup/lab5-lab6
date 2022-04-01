<template>
  <el-header height="auto" width="auto">
    <el-button type="primary" @click="selectCustomer">显示所有客户</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Customername"
              placeholder="客户名称"
              clearable
              style="width: 300px"
    /><el-input type="text"
                v-model="Customertype"
                placeholder="客户类别"
                clearable
                style="width: 300px"
  />
    <el-button type="primary" @click="addCustomer">添加</el-button>
    <el-table :data="results" style="width: fit-content">
      <el-table-column label="编号" width="300" prop="c_id">
      </el-table-column>
      <el-table-column label="名称" width="300" prop="c_name">
      </el-table-column>
      <el-table-column label="类别" width="300" prop="c_type">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteCustomer(scope.row.c_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import {getRequest,postRequest} from "@/tool/api";
export default {
  name: "Customer",
  data (){
    return{
      Customername: '',
      Customertype:'',
      results: [
        {
          c_id: 2,
          c_name: '客户A',
          c_type: '批发'
        },
        {
          c_id: 3,
          c_name: '客户B',
          c_type: '零售'
        }
      ]
    }
  },
  methods: {
    selectCustomer:function (){
      getRequest("/Customer/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    deleteCustomer:function (c_id){
      console.log(c_id);
      var Customer = {
        c_id: c_id,
        c_name: 'c_name',
        c_type: 'c_type'
      };
      postRequest("Customer/delete",Customer).then(res =>{
        console.log(res.message)
      })
    },
    addCustomer:function (){
      if (this.Customername===''||this.Customertype==='')
      {
        console.log("添加为空");
      }
      else
      {
        var Customer = {
          c_id: 0,
          c_name: this.Customername,
          c_type: this.Customertype
        };
        postRequest("Customer/add",Customer).then(res =>{
          console.log(res.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
