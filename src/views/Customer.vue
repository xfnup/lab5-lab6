<template>
  <el-dialog v-model="dialogTableVisible" title="付款统计">
    <el-table :data="payview">
      <el-table-column property="p_tprice" label="总价" width="200" />
      <el-table-column property="p_pprice" label="已付"  />
      <el-table-column property="p_rprice" label="未付" />
    </el-table>
  </el-dialog>
  <el-container>
  <el-aside width="200px">
    <common-aside></common-aside>
  </el-aside>
      <el-main>
  <el-header height="auto" width="auto">
    <el-input type="text"
              v-model="searchname"
              placeholder="客户名称"
              clearable
              style="width: 300px"
    /><el-button type="primary" @click="searchCustomer">搜索客户</el-button>
    <el-button type="primary" @click="selectCustomer">显示所有客户</el-button>
  </el-header>
  <el-main>
    <el-input type="text"
              v-model="Customername"
              placeholder="客户名称"
              clearable
              style="width: 300px"
    /><!--<el-input type="text"
                v-model="Customertype"
                placeholder="客户类别"
                clearable
                style="width: 300px"
  />-->
    <el-select v-model="Customertype" placeholder="选择客户类别">
      <el-option v-for="(item,index) in typelist" :key="index" :label="item.c_type" :value="item.c_type">
      </el-option>
    </el-select>
    <el-button type="primary" @click="addCustomer">添加</el-button>
    <el-table :data="results" style="width: fit-content">
      <el-table-column label="编号" width="300" prop="c_id">
      </el-table-column>
      <el-table-column label="名称" width="300" prop="c_name">
      </el-table-column>
      <el-table-column label="类别" width="300" prop="c_type">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" @click="selectpayview(scope.row.c_id)">付款统计</el-button>
          <el-button type="primary" @click="deleteCustomer(scope.row.c_id)">删除</el-button>
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
  name: "Customer",
  components:{
    CommonAside
  },
  data (){
    return{
      dialogTableVisible:false,
      searchname:'',
      Customername: '',
      Customertype:'',
      typelist:[
        {
          c_type:'老客户',
        },
        {
          c_type: '新客户',
        },
        {
          c_type:'有钱的客户',
        },
        {
          c_type: '普通客户',
        },
        {
          c_type: '批发',
        },
        {
          c_type: '零售',
        }
      ],
      payview:[],
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
    selectpayview:function (c_id) {
      var id={
        c_id:c_id,
      };
      getRequest("/Pay/selectbycid",id).then(res=>{
        this.payview=res.data;
        ElMessage({
          message:'查询成功',
          type: 'success',
        })
        this.dialogTableVisible=true;
      })
    },
    searchCustomer:function () {
      var name={
        name:this.searchname,
      };
      getRequest("Customer/search",name).then(res=>{
        this.results=res.data;
        ElMessage({
          message:'查询成功',
          type: 'success',
        })
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
        ElMessage({
          message:res.status+'删除成功',
          type: 'success',
        })
        this.selectCustomer();
      })
    },
    addCustomer:function (){
      if (this.Customername===''||this.Customertype==='')
      {
        console.log("添加为空");
        ElMessage({
          message:'添加为空',
          type: 'warning',
        })
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
          ElMessage({
            message:res.status+'添加成功',
            type: 'success',
          })
          this.selectCustomer();
        })
      }
    }
  },
  created() {
    this.selectCustomer();
  }
}
</script>

<style scoped>

</style>
