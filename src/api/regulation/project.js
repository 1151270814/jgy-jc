//工程项目档案库
import { getToken } from "@/utils/auth";
import store from '@/store'
import axios from 'axios'

import request from '@/utils/request'



//获取列表
export function getList(currentPage, pageNum, fileName, fileBy) {
  return request({
    url: `/fileShare/queryFileShareCondition?pageNum=${pageNum}&currentPage=${currentPage}&fileName=${fileName}&fileBy=${fileBy}`,
    method: 'get',
  })
}
//项目获取
export function expExmPaper(scope) {
  return axios.get(
    store.state.apiConfiguration.url +
    `fileShare/downloadFileShare?name=${scope.row.fileName}&path=${scope.row.fileUrl}`,
    {
      "Content-type": "application/octet-stream",
      headers: {
        Authorization: getToken(),
      },
      responseType: "blob",
    }
  ).then((res) => {
    const fileName =
      res.headers["content-disposition"].match(/filename=(.*)/)[1];
    const blob = new Blob([res.data], {
      type: "application/octet-stream",
    });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", decodeURI(fileName));
    link.click();
    link = null;
  });

}
// //项目查询
// export function ProjectInquire(pageNum, pageSize, projectName, bid,) {
//   return request({
//     url: `/newProject/pc/list?pageNum=${pageNum}&pageSize=${pageSize}&projectName=${projectName}&bid=${bid}`,
//     method: 'get',
//   })
// }


// //新增
// export function getAddList(data) {
//   return request({
//     url: '/projectDoc',
//     method: 'post',
//     data
//   })
// }
// //查询
// export function getInquire(pageNum, pageSize, projectName, bid, docType, docName, ids) {
//   return request({
//     url: `/projectDoc/findAll?pageNum=${pageNum}&pageSize=${pageSize}&projectName=${projectName}&bid=${bid}&docType=${docType}&docName=${docName}&ids=${ids}`,
//     method: 'get',
//   })
// }

// //查看
// export function getLookList(projectdocId) {
//   console.log(projectdocId)
//   return request({
//     url: `/projectDoc/findById?projectdocId=${projectdocId}`,
//     method: 'get',
//   })
// }
// //修改
// export function getChangeList(data) {
//   return request({
//     url: '/projectDoc',
//     method: 'put',
//     data
//   })
// }

// //删除
// export function getDelete(data) {
//   console.log(data)
//   return request({
//     url: '/projectDoc/' + data,
//     method: 'delete',
//   })
// }

// //文件删除
// export function fsDelete(fileId) {
//   return request({
//     url: `/projectDoc/deletefile/${fileId}`,
//     method: 'delete',
//   })
// }


// //分类查询
// export function Classification(dictNumber) {
//   return request({
//     url: `/dict/data/dictType/${dictNumber}`,
//     method: 'get',
//   })
// }

// //树列表分类
// export function getTree() {
//   return request({
//     url: `/projectDoc/searchList`,
//     method: 'get',
//   })
// }

// //树形搜索
// export function searchTree(name) {
//   return request({
//     url: `projectDoc/searchList?name=${name}`,
//     method: 'get',
//   })
// }
