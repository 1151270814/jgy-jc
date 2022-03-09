<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传</el-button
      >
      <div slot="tip" class="el-upload__tip" style="line-height: 16px">
        只能上传bmp、jpg，png，gif（10M）；AVI、rmvb、FLV、mp4、3GP（1G）；Doc、docx、xls、xlsx、txt、PDF（100M）；RAR、ZIP（50M）；MP3（50M）格式文件，
      </div>
    </el-upload>
    <!-- <el-upload
      ref="upload"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      multiple
      :limit="5"
      :file-list="fileList"
      name="file"
    >
      <el-button>选择文件</el-button>
      <div slot="tip" class="el-upload__tip" style="line-height: 16px">
        只能上传bmp、jpg，png，gif（10M）；AVI、rmvb、FLV、mp4、3GP（1G）；Doc、docx、xls、xlsx、txt、PDF（100M）；RAR、ZIP（50M）；MP3（50M）格式文件，
      </div>
      <span v-if="flag == false">点击文件下载</span>
    </el-upload> -->
  </div>
</template>

<script>
import { debounce } from "@/utils/utils";
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  computed: {
    getUrl() {
      return (
        this.$store.state.apiConfiguration.url +
        this.$store.state.serviceName.jurisdiction +
        "/fs/upload"
      );
    },
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // handlePreview(file) {
    //   if (this.flag == false) {
    //     this.fileDowloadName =
    //       this.$store.state.apiConfiguration.url +
    //       `/fs/download?name=${encodeURI(encodeURI(file.name))}&path=${
    //         file.url
    //       }`;
    //     location.href = this.fileDowloadName;
    //   }
    // },

    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },

    // // 上传成功时的钩子
    // uploadSuccess(res, file, fileList) {
    //   if (res.code !== 200) {
    //     return this.$message({
    //       type: "warning",
    //       message: "上传失败!",
    //     });
    //   }
    //   this.arr.push(res);
    //   let formImgList = [];
    //   this.arr.forEach((item) => {
    //     formImgList.push({
    //       name: item.body.fileName,
    //       url: item.body.url,
    //     });
    //   });
    //   this.ruleForm.projectDocFile = formImgList;
    // },
    // //文件大小
    // beforeUpload(file) {
    //   console.log(file);
    //   let FileFormat = file.name.substring(file.name.lastIndexOf(".") + 1);
    //   let testmsg = FileFormat.toLowerCase();
    //   const extension =
    //     testmsg === "xls" ||
    //     testmsg === "xlsx" ||
    //     testmsg === "doc" ||
    //     testmsg === "docx" ||
    //     testmsg === "txt" ||
    //     testmsg === "pdf" ||
    //     testmsg === "bmp" ||
    //     testmsg === "jpg" ||
    //     testmsg === "png" ||
    //     testmsg === "gif" ||
    //     testmsg === "avi" ||
    //     testmsg === "rmvb" ||
    //     testmsg === "flv" ||
    //     testmsg === "mp4" ||
    //     testmsg === "3gp" ||
    //     testmsg === "rar" ||
    //     testmsg === "zip" ||
    //     testmsg === "mp3";

    //   const isLt2M = file.size / 1024 / 1024 < 1000;
    //   if (!extension) {
    //     this.ruleForm.projectDocFile = [];
    //     this.$message({
    //       message: "请上传正确的格式!",
    //       type: "warning",
    //     });
    //     return false;
    //   }
    //   if (!isLt2M) {
    //     this.ruleForm.projectDocFile = [];
    //     this.$message({
    //       message: "上传文件大小超过限制!",
    //       type: "warning",
    //     });
    //     return false;
    //   }
    // },

    // handleRemove(file, fileList) {
    //   let index = this.ruleForm.projectDocFile.findIndex((ele) => {
    //     return ele.url === file.response.body.url;
    //   });
    //   // debugger;
    //   if (index == -1) {
    //     return console.log("删除失败");
    //   }
    //   //删除元素
    //   this.ruleForm.projectDocFile.splice(index, 1);
    //   // await fsDelete(file.fileId);
    // },
  },
};
</script>

<style>
</style>