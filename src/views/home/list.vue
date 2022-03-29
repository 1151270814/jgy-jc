<template>
  <!-- 技术创新 -->
  <div class="app-container">
    <el-main>
      <div>
        <div class="header-right-list">
          <el-button type="primary" @click="handlefun()">返回</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          height="calc(100vh - 200px)"
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
  </div>
</template>

<script>
import { ProjectInquire } from "@/api/regulation/project";
export default {
  props: {
    person: String,
  },

  data() {
    return {
      pageNum: 1, //默认当前页
      pageSize: 10,
      total: 0,
      tableData: [],
      input: "",
    };
  },
  created() {
    this.tableData = this.person.resData.records;
    this.total = this.person.resData.total;
    this.input = this.person.Indata;
  },

  methods: {
    handlefun() {
      this.$emit("func");
    },

    /**
     * 分页器
     */
    async handleSizeChange(val) {
      let data = await ProjectInquire(this.input, val, this.pageNum);
      this.tableData = data.records;
      this.total = data.total;
    },
    async handleCurrentChange(val) {
      let data = await ProjectInquire(this.input, this.pageSize, val);
      this.tableData = data.records;
      this.total = data.total;
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
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 70px);
}
.header-right-list {
  float: right;
  margin-bottom: 10px;
}
.btnCont {
  display: inline-block;
}
.sxForm {
  padding-top: 20px;
}
</style>