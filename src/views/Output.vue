<template>
  <el-dialog v-model="dialogTableVisible" title="销售明细" >
    <el-select v-model="goodsid" placeholder="选择商品" style="width: 150px">
      <el-option v-for="(item,index) in goodslist" :key="index" :label="item.g_name" :value="item.g_id">
      </el-option>
    </el-select>
    <el-select v-model="storageid" placeholder="选择仓库" style="width: 150px">
      <el-option v-for="(item,index) in storagelist" :key="index" :label="item.s_name" :value="item.s_id">
      </el-option>
    </el-select>
    <el-input type="text"
              v-model="goodsnum"
              placeholder="商品数量"
              clearable
              style="width: 150px"
    />
    <el-input type="text"
              v-model="goodsprice"
              placeholder="商品单价"
              clearable
              style="width: 150px"
    />
    <el-button type="primary" @click="addoutputunit(recoderow)">添加商品</el-button>
    <el-table :data="outputunitlist">
      <el-table-column property="s_name" label="仓库名" width="200" />
      <el-table-column property="g_name" label="商品名"  />
      <el-table-column property="ou_num" label="商品数量" />
      <el-table-column property="ou_price" label="总价" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteoutputunit(scope.row.ou_seq)">删除</el-button>
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
        <el-select v-model="customerid" placeholder="选择客户">
          <el-option v-for="(item,index) in customerlist" :key="index" :label="item.c_name" :value="item.c_id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="addOutput">添加销售单</el-button>
        <el-button type="primary" @click="selectOutput">显示所有销售单</el-button>
      </el-header>
      <el-main>
        <el-table :data="results" style="width: fit-content">
          <el-table-column label="编号" width="300" prop="o_id">
          </el-table-column>
          <el-table-column label="客户名称" width="300" prop="c_name">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button type="primary" @click="getoutputunit(scope.row.o_id)">销售明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import {getRequest, postRequest} from "@/tool/api";
import {ElMessage} from "element-plus";

export default {
  name: "Output",
  components:{
    CommonAside
  },
  data (){
    return{
      dialogTableVisible:false,
      customerid:0,
      goodsid:0,
      goodsnum:0,
      goodsprice:0,
      storageid:0,
      recoderow:0,
      storagelist:[
        {
          s_id:1,
          s_name:'北京一号'
        }
      ],
      customerlist:[
        {
          c_id: 2,
          c_name: '客户A',
          c_type: '批发'
        }
      ],
      outputunitlist:[
        {
          o_id:1,
          ou_seq:1,
          s_id:0,
          s_name:'北京一号',
          g_id:1,
          g_name:'大白菜',
          ou_num:10,
        },
      ],
      goodslist:[
        {
          g_id:0,
          g_name:'可乐'
        }
      ],
      results: [

      ]
    }
  },
  methods:{
    selectGoos:function (){
      getRequest("/Goods/select").then(res => {
        console.log(res.data);
        this.goodslist=res.data;
      })
    },
    selectOutput:function (){
      getRequest("/Output/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    selectStorage:function (){
      getRequest("/Storage/select").then(res => {
        this.storagelist=res.data;
      })
    },
    selectCustomer:function (){
      getRequest("/Customer/select").then(res => {
        this.customerlist=res.data;
      })
    },
    addOutput:function (){
      if (this.customerid===0)
      {
        console.log("添加为空");
      }
      else
      {
        var Output = {
          o_id: 0,
          c_id: this.customerid,
          o_price: 0
        };
        postRequest("Output/add",Output).then(res =>{
          ElMessage({
            message:res.status+'添加成功',
            type: 'success',
          })
        })
      }
    },
    getoutputunit:function (o_id) {
      this.recoderow=o_id;
      var output = {
        o_id:o_id,
      };
      getRequest("Outputunit/detail",output).then(res =>{
        this.outputunitlist=res.data;
      })
      this.dialogTableVisible=true;
    },
    addoutputunit:function (o_id){
      if (this.goodsnum<=0)
      {
        ElMessage({
          message:'数量不合法',
          type: 'warning',
        })
      }
      if (this.goodsprice<=0)
      {
        ElMessage({
          message:'价格不合法',
          type: 'warning',
        })
      }
      else
      {
        var outputunit = {
          o_id:o_id,
          ou_seq:0,
          s_id:this.storageid,
          g_id:this.goodsid,
          ou_num:this.goodsnum,
          ou_price:this.goodsnum*this.goodsprice
        };
        postRequest("Outputunit/add",outputunit).then(res =>{
          ElMessage({
            message:res.status+'添加成功',
            type: 'success',
          })
        })
      }
    },
    deleteoutputunit:function (ou_seq){
      var outputunit = {
        o_id:0,
        ou_seq:ou_seq,
        s_id:0,
        g_id:0,
        ou_num:0,
        ou_price:0
      };
      postRequest("Outputunit/delete",outputunit).then(res =>{
        ElMessage({
          message:res.status+'删除成功',
          type: 'success',
        })
      })
    }
  },
  created() {
    this.selectOutput();
    this.selectStorage();
    this.selectCustomer();
    this.selectGoos();
  }
}
</script>

<style scoped>

</style>
