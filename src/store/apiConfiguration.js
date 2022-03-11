// api接口配制文件
/*
local：本地开发配制
dev：测试环境配制
sit：预发布环境配制
uat：验收环境配制
prod：正式环境配制
url：目标地址
imgFileUrl：图片地址
fileUrl：文件地址
cndUrl：cdn静态文件地址
*/
/*
NOW 服务环境
*/
// const NOW = 'dev'
const state = {
      url: 'http://192.168.5.9:8080/',
      imgFileUrl: '',
      fileUrl: '',
      cdnUrl: '',
      messageUrl: '',
      htmlUrl: ''
}
export default {
    state
}
