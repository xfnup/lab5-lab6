<template>
  <el-dialog v-model="dialogTableVisible" title="销售明细" >
<!--    <el-select v-model="goodsid" placeholder="选择商品" style="width: 150px">
      <el-option v-for="(item,index) in goodslist" :key="index" :label="item.g_name" :value="item.g_id">
      </el-option>
    </el-select>-->
    <el-select v-model="stocklistindex" placeholder="选择库存" style="width: 400px">
      <el-option v-for="(item,index) in stocklist" :key="index" :label="'仓库:'+item.s_name+'  商品:'+item.g_name+'  数量:'+item.s_num" :value="index">
      </el-option>
    </el-select>
<!--    <el-select v-model="storageid" placeholder="选择仓库" style="width: 150px">
      <el-option v-for="(item,index) in storagelist" :key="index" :label="item.s_name" :value="item.s_id">
      </el-option>
    </el-select>-->
    <el-input type="text"
              v-model="goodsnum"
              placeholder="商品数量"
              clearable
              style="width: 100px"
    />
    <el-input type="text"
              v-model="goodsprice"
              placeholder="商品单价"
              clearable
              style="width: 100px"
    />
    <el-button type="primary" @click="addoutputunit(recoderow)">添加商品</el-button>
    <el-table :data="outputunitlist">
      <el-table-column property="s_name" label="仓库名" width="200" />
      <el-table-column property="g_name" label="商品名"  />
      <el-table-column property="ou_num" label="商品数量" />
      <el-table-column property="ou_price" label="总价" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" @click="deleteoutputunit(scope.row.o_id,scope.row.ou_seq,scope.row.s_id,scope.row.g_id,scope.row.ou_num,scope.row.ou_price)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog v-model="dialogTable2Visible" title="付款明细">
    <el-table :data="paymessage">
      <el-table-column property="p_tprice" label="总价" width="200" />
      <el-table-column property="p_pprice" label="已付"  />
      <el-table-column property="p_rprice" label="未付" />
      <el-table-column label="操作" width="100">
        <el-button type="primary" @click="paytprice()">付款</el-button>
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
          <el-table-column label="操作" width="300">
            <template #default="scope">
              <el-button type="primary" @click="getoutputunit(scope.row.o_id)">销售明细</el-button>
              <el-button type="primary" @click="pay(scope.row.o_id)">付款明细</el-button>
              <el-button type="primary" @click="deleteoutput(scope.row.o_id)">退货</el-button>
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
      dialogTable2Visible:false,
      dialogTableVisible:false,
      stocklistindex:0,
      customerid:0,
      goodsnum:0,
      goodsprice:0,
      recoderow:0,
      /*storagelist:[
        {
          s_id:1,
          s_name:'北京一号'
        }
      ],*/
      customerlist:[
        {
          c_id: 2,
          c_name: '客户A',
          c_type: '批发'
        }
      ],
      paymessage:[

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
      /*goodslist:[
        {
          g_id:0,
          g_name:'可乐'
        }
      ],*/
      results: [
      ],
      stocklist:[
        {
          g_id:0,
          g_name:'可乐',
          s_id:0,
          s_name:'北京一号',
          s_num:0
        }
      ]
    }
  },
  methods:{
    selectStock:function () {
      getRequest("/Stock/listview").then(res =>{
        this.stocklist=res.data;
      })
    },
    /*selectGoos:function (){
      getRequest("/Goods/select").then(res => {
        console.log(res.data);
        this.goodslist=res.data;
      })
    },*/
    selectOutput:function (){
      getRequest("/Output/select").then(res => {
        console.log(res.data);
        this.results=res.data;
      })
    },
    /*selectStorage:function (){
      getRequest("/Storage/select").then(res => {
        this.storagelist=res.data;
      })
    },*/
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
    deleteoutput:function (o_id) {
      var Output = {
        o_id:o_id,
        c_id:0,
        o_price:0
      }
      postRequest("Output/delete",Output).then(res =>{
        if (res.status==200)
        {
          ElMessage({
            message:res.status+'删除成功',
            type: 'success',
          })
        }
      })
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
    pay:function (o_id) {
      this.recoderow=o_id;
      var output = {
        o_id:o_id,
      };
      getRequest("Pay/select",output).then(res =>{
        this.paymessage=res.data;
      })
      this.dialogTable2Visible=true;
    },
    paytprice:function () {
      var output = {
        o_id:this.recoderow,
      };
      getRequest("Pay/pay",output).then(res =>{
        ElMessage({
          message:res.message,
          type: 'success',
        })
      })
    },
    addoutputunit:function (o_id){
      if (this.goodsnum<=0||this.goodsnum>this.stocklist[this.stocklistindex].s_num)
      {
        ElMessage({
          message:'数量不合法',
          type: 'warning',
        })
      }
      else if (this.goodsprice<=0)
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
          s_id:this.stocklist[this.stocklistindex].s_id,
          g_id:this.stocklist[this.stocklistindex].g_id,
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
    deleteoutputunit:function (o_id,ou_seq,s_id,g_id,ou_num,ou_price){
      var outputunit = {
        o_id:o_id,
        ou_seq:ou_seq,
        s_id:s_id,
        g_id:g_id,
        ou_num:ou_num,
        ou_price:ou_price
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
    //this.selectStorage();
    this.selectCustomer();
    //this.selectGoos();
    this.selectStock();
  }
}
</script>

<style scoped>

</style>
