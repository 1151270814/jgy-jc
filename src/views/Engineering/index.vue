<template>
  <!-- 工程合约 -->
  <div class="app-container">
    <el-header>
      <div class="sxForm">
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="文件名称" prop="fileName">
            <el-input
              v-model="formInline.fileName"
              placeholder="文件名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传人" prop="fileBy">
            <el-input
              v-model="formInline.fileBy"
              placeholder="上传人"
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
          <el-table-column prop="fileName" label="文件名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="上传时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <!-- <el-table-column prop="name" label="类型" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="updateBy"
            label="上传人"
            width="200px"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" width="110px">
            <template slot-scope="scope">
              <!-- 这里可以拿到当前行的内容 row -->
              <el-button type="text" @click="goRedact(scope)">下载 </el-button>
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
      <!-- <amend ref="amend" v-if="flag === 'Amend'" /> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button class="tBtn" @click="tBtnFun">确 定</el-button>
        <el-button class="fBtn" @click="getMsgFormSon">取 消</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { getList, expExmPaper } from "@/api/regulation/project";
import { getToken } from "@/utils/auth";
import axios from "axios";

import Add from "./add";
export default {
  components: { Add },
  data() {
    return {
      pageNum: 1, //默认当前页
      pageSize: 10,
      total: 0,
      formInline: {
        //头部查询
        fileName: "",
        fileBy: "",
      },
      dialogVisible: false,
      flag: "",
      tableData: [],
      flas: "",
      fileTypeId: 3,
    };
  },
  created() {
    this.getProjectList();
    // this.flas=  this.store.apiConfiguration
  },

  methods: {
    async getProjectList() {
      let { fileName, fileBy } = this.formInline;
      let data = await getList(
        this.pageNum,
        this.pageSize,
        fileName,
        fileBy,
        this.fileTypeId
      );
      this.tableData = data.records;
      this.total = data.total;
      this.loading = false;
    },

    //提交查询
    async onSubmit() {
      try {
        let { fileName, fileBy } = this.formInline;
        let data = await getList(this.pageNum, this.pageSize, fileName, fileBy);
        this.tableData = data.records;
        this.total = data.total;
        this.loading = false;
      } catch (e) {
        console.error("接口异常");
      }
    },
    //重置查询头部
    onClear(formName) {
      this.$refs[formName].resetFields();
      this.getProjectList();
    },
    //新增
    handleAdd() {
      this.flag = "Add";
      this.dialogVisible = true;
    },
    //查看
    async goRedact(scope) {
      console.log(scope);
      await expExmPaper(scope);
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
      this.onSubmit();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.onSubmit();
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