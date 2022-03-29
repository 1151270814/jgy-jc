<template>
  <div>
    <div v-if="flag == true">
      <div class="input_h">
        <el-input
          placeholder="输入并搜索"
          v-model="input"
          clearable
          @keyup.enter.native="filterData"
        >
        </el-input>
      </div>
      <div class="ul_li_box">
        <ul class="ul_li">
          <li>
            <i class="el-icon-postcard iconStyle"></i>
            <p>行业政策</p>
          </li>
          <li>
            <i class="el-icon-date iconStyle"></i>
            <p>规章制度</p>
          </li>
          <li>
            <i class="el-icon-edit-outline iconStyle"></i>
            <p>工程合约</p>
          </li>
          <li>
            <i class="el-icon-s-promotion iconStyle"></i>
            <p>安全环保</p>
          </li>
        </ul>
        <ul class="ul_li">
          <li>
            <i class="el-icon-brush iconStyle"></i>
            <p>技术创新</p>
          </li>
          <li>
            <i class="el-icon-s-custom iconStyle"></i>
            <p>党建廉政</p>
          </li>
          <li>
            <i class="el-icon-files iconStyle"></i>
            <p>综合行政</p>
          </li>
          <li>
            <i class="el-icon-chat-dot-round iconStyle"></i>
            <p>职工论坛</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="flag == false">
      <List :person="personData" @func="getMsgFormSon" />
    </div>
  </div>
</template>

<script>
import { ProjectInquire } from "@/api/regulation/project";
import List from "./list";
export default {
  components: { List },
  data() {
    return {
      input: "",
      personData: {},
      flag: true,
      pageNum: 1, //默认当前页
      pageSize: 10,
    };
  },
  methods: {
    async filterData() {
      let data = await ProjectInquire(this.input, this.pageSize, this.pageNum);
      var Pdata = { resData:data, Indata:this.input }
      this.personData = Pdata;
      this.flag = false;
    },
    //完成后回调
    getMsgFormSon() {
      this.flag = true;
      this.personData = {};
      this.input=""
    },
  },
};
</script>

<style>
.input_h .el-input__inner {
  height: 60px;
  border-radius: 30px;
  font-size: 20px;
}
.input_h {
  margin: 50px auto;
  width: 50%;
}
.ul_li_box {
  margin: auto;
  width: 80%;
  margin-top: -70px;
}
.ul_li {
  display: block;
  display: flex;
  justify-content: space-around;
  margin-top: 160px;
}
.ul_li li {
  list-style: none;
  display: inline-block;
  /* border: 1px solid #000; */
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: pointer;
}
.ul_li li p {
  text-align: center;
}
.iconStyle {
  font-size: 150px;
}
</style>