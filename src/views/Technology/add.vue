<template>
  <div class="upload">
    <el-upload
      ref="upload"
      :limit="10"
      name="files"
      :multiple="true"
      :action="upload.url"
      :headers="upload.headers"
      :disabled="upload.isUploading"
      :on-change="handleFileChange"
      :before-remove="handleFileRemove"
      :before-upload="beforeUpload"
      :auto-upload="false"
      :file-list="upload.fileList"
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
        只能上传bmp、jpg，png，gif；AVI、rmvb、FLV、mp4、3GP；Doc、docx、xls、xlsx、txt、PDF；RAR、ZIP；MP3格式文件，
      </div>
    </el-upload>
  </div>
</template>

<script>
import { debounce } from "@/utils/utils";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: getToken() },
        // 上传的地址
        url:
          this.$store.state.apiConfiguration.url +
          `fileShare/uploadFileShare?fileTypeId=${5}`,
        fileList: [],
        fileName: [],
      },
    };
  },
  methods: {
    // 上传发生变化钩子
    handleFileChange(file, fileList) {
      let FileFormat = file.name.substring(file.name.lastIndexOf(".") + 1);
      let testmsg = FileFormat.toLowerCase();
      const extension =
        testmsg === "xls" ||
        testmsg === "xlsx" ||
        testmsg === "doc" ||
        testmsg === "docx" ||
        testmsg === "txt" ||
        testmsg === "pdf" ||
        testmsg === "bmp" ||
        testmsg === "jpg" ||
        testmsg === "png" ||
        testmsg === "gif" ||
        testmsg === "avi" ||
        testmsg === "rmvb" ||
        testmsg === "flv" ||
        testmsg === "mp4" ||
        testmsg === "3gp" ||
        testmsg === "rar" ||
        testmsg === "zip" ||
        testmsg === "mp3";

      const isLt2M = file.size / 1024 / 1024 < 1000;
      if (!extension || !isLt2M) {
        fileList.splice(fileList.length - 1, 1);
        this.$message({
          message: "请上传正确的格式!",
          type: "warning",
        });
        return false;
      }
      this.upload.fileList = fileList;
    },
    // 删除之前钩子
    handleFileRemove(file, fileList) {
      this.upload.fileList = fileList;
    },
    // 提交上传文件
    submitUpload() {
      // 创建新的数据对象
      let formData = new FormData();
      //将上传的文件放到数据对象中
      this.upload.fileList.forEach((file) => {
        formData.append("file", file.raw);
        // this.upload.fileName.push(file.name);
      });
      //  文件名
      // formData.append("fileName", this.upload.fileName);
      // 自定义上传
      axios
        .post(this.upload.url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken(),
          },
        })
        .then((response) => {
          if (response.data.code == 200) {
            this.upload.open = false;
            this.upload.isUploading = false;
            this.$refs.upload.clearFiles();
            this.$message({
              type: "success",
              message: response.data.message,
            });
          } else {
            this.$message.error(response.data.message);
          }
        });
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
    //文件大小
    beforeUpload(file) {
      let FileFormat = file.name.substring(file.name.lastIndexOf(".") + 1);
      let testmsg = FileFormat.toLowerCase();
      const extension =
        testmsg === "xls" ||
        testmsg === "xlsx" ||
        testmsg === "doc" ||
        testmsg === "docx" ||
        testmsg === "txt" ||
        testmsg === "pdf" ||
        testmsg === "bmp" ||
        testmsg === "jpg" ||
        testmsg === "png" ||
        testmsg === "gif" ||
        testmsg === "avi" ||
        testmsg === "rmvb" ||
        testmsg === "flv" ||
        testmsg === "mp4" ||
        testmsg === "3gp" ||
        testmsg === "rar" ||
        testmsg === "zip" ||
        testmsg === "mp3";

      const isLt2M = file.size / 1024 / 1024 < 1000;
      if (!extension) {
        this.ruleForm.projectDocFile = [];
        this.$message({
          message: "请上传正确的格式!",
          type: "warning",
        });
        return false;
      }
      if (!isLt2M) {
        this.ruleForm.projectDocFile = [];
        this.$message({
          message: "上传文件大小超过限制!",
          type: "warning",
        });
        return false;
      }
    },

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