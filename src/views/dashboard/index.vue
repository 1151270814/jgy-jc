<template>
  <div class="app-container">
    <el-header>
      <div class="sxForm">
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="文件名称" prop="projectName">
            <el-input
              v-model="formInline.projectName"
              placeholder="文件名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传人" prop="bid">
            <el-input
              v-model="formInline.bid"
              placeholder="上传人"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传时间" prop="docName">
            <el-input
              v-model="formInline.docName"
              placeholder="上传时间"
            ></el-input>
          </el-form-item>
          <div class="btnCont">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onClear('formInline')"
              >重置
            </el-button>
          </div>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <div>
        <div class="header-right">
          <el-button type="primary" @click="handleAdd()">新增</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          height="calc(100vh - 260px)"
          align="center"
          tooltip-effect="light"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="address" label="文件名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="date" label="上传时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="name"
            label="类型"
           
           
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="上传人"
            width="200px"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" width="110px">
            <template slot-scope="scope">
              <!-- 这里可以拿到当前行的内容 row -->
              <el-button type="text" @click="goRedact(scope, tableList)"
                >查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        background
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
      ></el-pagination>
    </el-main>
    <el-dialog
      title="文件"
      :visible.sync="dialogVisible"
      custom-class="small"
      :before-close="handleClose"
    >
      <add ref="projectAdd" v-if="flag === 'Add'" />
      <amend ref="amend" v-if="flag === 'Amend'" />
      <!-- <span slot="footer" class="dialog-footer">
        <el-button class="tBtn" @click="tBtnFun">确 定</el-button>
        <el-button class="fBtn" @click="getMsgFormSon">取 消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import Add from "./add";
import Amend from "./amend";
export default {
  components: { Add, Amend },
  data() {
    return {
      pageNum: 1, //默认当前页
      pageSize: 10,
      total: 0,
      formInline: {
        //头部查询
        projectName: "",
        bid: "",
        docType: "",
        docName: "",
      },
      dialogVisible: false,
      flag: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 ",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    //提交查询
    async onSubmit() {
      try {
        let { projectName, bid, docType, docName } = this.formInline;
        let data = await getInquire(
          1,
          this.pageSize,
          projectName,
          bid,
          docType,
          docName,
          this.listIds
        );
        this.tableList = data.rows;
        this.total = data.total;
        this.loading = false;
      } catch (e) {
        console.error("接口异常");
      }
    },
    //重置查询头部
    onClear(formName) {
      this.$refs[formName].resetFields();
      this.listIds = [];
      this.getProjectList();
    },
    //新增
    handleAdd() {
      this.flag = "Add";
      this.dialogVisible = true;
    },
    //查看
    goRedact(scope) {
      this.flag = "Amend";
      this.dialogVisible = true;
      //this.personData = scope.row.projectdocId;
    },

    //关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    /**
     * 分页器
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.onPaging();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.onPaging();
    },
  },
};
</script>

<style>
.app-container {
  background: #f2f2f2;
  padding: 10px;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 50px);
}
.el-header {
  background-color: #ffffff;
  color: #333;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 130px);
}
.header-right {
  display: table;
  margin-bottom: 10px;
}
.btnCont {
  display: inline-block;
}
.sxForm {
  padding-top: 20px;
}
</style>