<template>
  <el-header height="auto" width="auto">
    <el-button type="primary" @click="selectStorage">显示所有仓库</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Storagename"
              placeholder="仓库名称"
              clearable
              style="width: 300px"
    /><el-input type="text"
                v-model="Storageaddress"
                placeholder="仓库地址"
                clearable
                style="width: 300px"
    />
    <el-button type="primary" @click="addStorage">添加</el-button>
    <el-table :data="results" style="width: fit-content">
      <el-table-column label="编号" width="300" prop="s_id">
      </el-table-column>
      <el-table-column label="名称" width="300" prop="s_name">
      </el-table-column>
      <el-table-column label="地址" width="300" prop="s_address">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteStorage(scope.row.s_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import {getRequest,postRequest} from "@/tool/api";
export default {
  name: "Storage",
  data (){
    return{
      Storagename: '',
      Storageaddress:'',
      results: [
        {
          s_id: 2,
          s_name: '北京一号仓',
          s_address: '北京'
        },
        {
          s_id: 3,
          s_name: '北京二号仓',
          s_address: '北京'
        }
      ]
    }
  },
  methods: {
    selectStorage:function (){
      getRequest("/Storage/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    deleteStorage:function (s_id){
      console.log(s_id);
      var Storage = {
        s_id: s_id,
        s_name: 's_name',
        s_address: 's_address'
      };
      postRequest("Storage/delete",Storage).then(res =>{
        console.log(res.message)
      })
    },
    addStorage:function (){
      if (this.Storagename==='')
      {
        console.log("添加为空");
      }
      else
      {
        var Storage = {
          s_id: 0,
          s_name: this.Storagename,
          s_address: this.Storageaddress
        };
        postRequest("Storage/add",Storage).then(res =>{
          console.log(res.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
