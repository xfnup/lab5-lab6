<template>
  <el-dialog v-model="dialogTableVisible" title="库存明细">
    <el-table :data="stock">
      <el-table-column property="g_name" label="商品名" width="200" />
      <el-table-column property="s_num" label="商品数量" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deletestock(scope.row.s_id,scope.row.g_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-container>
  <el-aside width="200px">
    <common-aside></common-aside>
  </el-aside>
  <el-main>
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
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" @click="deleteStorage(scope.row.s_id)">删除</el-button>
          <el-button type="primary" @click="selectstock(scope.row.s_id)">库存明细</el-button>
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
  name: "Storage",
  components:{
    CommonAside
  },
  data (){
    return{
      dialogTableVisible:false,
      Storagename: '',
      Storageaddress:'',
      stock:[
        {
          s_id:0,
          g_id:0,
          g_name:'可乐',
          s_num:10
        }
      ],
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
    selectstock:function (s_id) {
      var Stock={
        s_id:s_id,
      }
      getRequest("Stock/detail",Stock).then(res =>{
        this.stock=res.data;
      })
      this.dialogTableVisible=true;
    },
    deletestock:function (s_id,g_id) {
      var Stock={
        s_id:s_id,
        g_id:g_id,
        s_num:0,
      }
      postRequest("Stock/delete",Stock).then(res =>{
        console.log(res.message);
        ElMessage({
          message:res.status+'删除成功',
          type: 'success',
        })
      })
    },
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
  },
  created() {
    this.selectStorage();
  }
}
</script>

<style scoped>

</style>
