<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资料标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="资料简介">
        <el-input type="textarea" v-model="form.content"></el-input>
        <div>
          <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-remove="handleRemove"
              :on-change="fileChange"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">发布</el-button>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>

    <el-card class="box-card" v-for="information in informationList" :key="information">
      <div slot="header" class="clearfix">
        <span>{{ information.title }}</span>
      </div>
      <div>
        {{ information.content }} <br>
        <el-link type="primary" @click="download(information.file_path)">下载链接</el-link>
      </div>

    </el-card>
  </div>

</template>

<script>
export default {
  name: "Data",
  data() {
    return {
      form: {},
      fileList: [],
      informationList: []
    }

  },
  methods: {
    download(path) {
      // path = path.replace(/D:/, "http://127.0.0.1:8081")
      window.open(path)
    },
    submitUpload() {
      let formData = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('course_id', localStorage.getItem("CourseID"))
        formData.append('title', this.form.title)
        formData.append('content', this.form.content)
        formData.append("files", this.fileList[i].raw, this.fileList[i].name);
      }
      let config = {'Content-Type': 'multipart/form-data'};
      this.axios.post('/api/upload', formData, config)
          .then(() => {
            this.$message.success("发布成功");
            this.getInformation()
          })
          .catch(() => {
            this.$message.error("发布失败");
          });


    }, getInformation() {
      let param = new URLSearchParams()
      param.append('course_id', localStorage.getItem("CourseID"))
      this.axios.post("api/getResourceData", param)
          .then(res => {
            this.informationList = res.data
          });
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    fileChange(file, fileList) {
      this.fileList = fileList;
    }
  },
  mounted() {
    this.getInformation()
  }
}
</script>

<style scoped>
.box-card {
  float: left;
  width: 200px;
  height: 300px;
  margin: 20px
}
</style>