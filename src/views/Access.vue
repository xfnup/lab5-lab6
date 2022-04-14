<template>
  <el-dialog v-model="dialogTableVisible" title="进货明细">
    <el-select v-model="goodsid" placeholder="选择商品">
      <el-option v-for="(item,index) in goodslist" :key="index" :label="item.g_name" :value="item.g_id">
      </el-option>
    </el-select>
    <el-input type="text"
              v-model="goodsnum"
              placeholder="商品数量"
              clearable
              style="width: 300px"
    />
    <el-button type="primary" @click="addaccessunit(recoderow,recoderowsid)">添加商品</el-button>
    <el-table :data="accessunitlist">
      <el-table-column property="g_name" label="商品名" width="200" />
      <el-table-column property="au_num" label="商品数量" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteaccessunit(scope.row.au_seq)">删除</el-button>
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
        <el-select v-model="merchantid" placeholder="选择供应商">
          <el-option v-for="(item,index) in merchantlist" :key="index" :label="item.m_name" :value="item.m_id">
          </el-option>
        </el-select>
        <el-select v-model="storageid" placeholder="选择仓库">
          <el-option v-for="(item,index) in storagelist" :key="index" :label="item.s_name" :value="item.s_id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="addAccess">添加进货单</el-button>
        <el-button type="primary" @click="selectAccess">显示所有进货单</el-button>
      </el-header>
      <el-main>
        <el-table :data="results" style="width: fit-content">
          <el-table-column label="编号" width="300" prop="a_id">
          </el-table-column>
          <el-table-column label="供应商名称" width="300" prop="m_name">
          </el-table-column>
          <el-table-column label="仓库名称" width="300" prop="s_name">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button type="primary" @click="getaccessunit(scope.row.a_id,scope.row.s_id)">进货明细</el-button>
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
  name: "Access",
  components:{
    CommonAside
  },
  data (){
    return{
      dialogTableVisible:false,
      merchantid:0,
      storageid:0,
      goodsid:0,
      goodsnum:0,
      recoderow:0,
      recoderowsid:0,
      merchantlist:[
        {
          m_id:1,
          m_name:'供应商A'
        },
        {
          m_id:2,
          m_name:'供应商B'
        },
        {
          m_id:3,
          m_name:'奸商'
        }
      ],
      storagelist:[
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
      ],
      accessunitlist:[
        {
          a_id:1,
          au_seq:1,
          g_id:1,
          g_name:'大白菜',
          au_num:10,
          au_price:10
        },
      ],
      goodslist:[
        {
          g_id:0,
          g_name:'可乐'
        }
      ],
      results: [
        // {
        //   a_id:2,
        //   s_id:2,
        //   m_name:'供应商A',
        //   s_name:'北京一号仓'
        // },
        // {
        //   a_id:3,
        //   s_id:2,
        //   m_name: '供应商B',
        //   s_name: '北京二号仓'
        // }
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
    selectAccess:function (){
      getRequest("/Access/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    selectMerchant:function (){
      getRequest("/Merchant/select").then(res => {
        this.merchantlist=res.data;
      })
    },
    selectStorage:function (){
      getRequest("/Storage/select").then(res => {
        this.storagelist=res.data;
      })
    },
    addAccess:function (){
      if (this.merchantid===0||this.storageid===0)
      {
        console.log("添加为空");
      }
      else
      {
        var Access = {
          a_id: 0,
          m_id: this.merchantid,
          s_id: this.storageid
        };
        postRequest("Access/add",Access).then(res =>{
          ElMessage({
            message:res.status+'添加成功',
            type: 'success',
          })
        })
      }
    },
    getaccessunit:function (a_id,s_id) {
      this.recoderow=a_id;
      this.recoderowsid=s_id;
      var Access = {
        a_id: a_id,
        m_id: this.merchantid,
        s_id: this.storageid
      };
      getRequest("Accessunit/detail",Access).then(res =>{
        this.accessunitlist=res.data;
      })
      this.dialogTableVisible=true;
    },
    addaccessunit:function (a_id,s_id){
      if (this.goodsnum<=0)
      {
        ElMessage({
          message:'数量不合法',
          type: 'warning',
        })
      }
      else
      {
        var Accessunit = {
          a_id:a_id,
          s_id:s_id,
          au_seq:0,
          g_id:this.goodsid,
          au_num:this.goodsnum,
          au_price:0
        };
        postRequest("Accessunit/add",Accessunit).then(res =>{
          ElMessage({
            message:res.status+'添加成功',
            type: 'success',
          })
        })
      }
    },
    deleteaccessunit:function (au_seq){
      var Accessunit = {
        a_id:0,
        au_seq:au_seq,
        g_id:0,
        au_num:0,
        au_price:0
      };
      postRequest("Accessunit/delete",Accessunit).then(res =>{
        ElMessage({
          message:res.status+'删除成功',
          type: 'success',
        })
      })
    }
  },
  created() {
    this.selectAccess();
    this.selectMerchant();
    this.selectStorage();
    this.selectGoos();
  }
}
</script>

<style scoped>

</style>
