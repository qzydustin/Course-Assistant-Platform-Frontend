<template>
  <div>
    <el-collapse v-for="work in workList" :key="work" accordion>
      <el-collapse-item v-bind:title="work.work_title" name="1">
        <div>{{ work.work_content }}</div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-remove="handleRemove"
            :on-change="fileChange"
            :file-list="fileList"
            :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(work.work_id)">上传作业</el-button>
        </el-upload>
      </el-collapse-item>

    </el-collapse>


  </div>


</template>

<script>
export default {
  name: "Work",
  data() {
    return {
      form: {
        title: null,
        content: null,
      },
      workList: [],
      fileList: []
    }
  },
  methods: {
    getWork() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getWork", param)
          .then(res => {
            this.workList = res.data
          });
    },
    submitUpload(work_id) {
      let formData = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('user_id', localStorage.getItem("ID"))
        formData.append('work_id', work_id)
        formData.append("files", this.fileList[i].raw, this.fileList[i].name);
      }
      let config = {'Content-Type': 'multipart/form-data'};
      this.axios.post('/api/uploadHomework', formData, config)
          .then(() => {
            this.$message.success("上传成功");
            this.getWork()
          })
          .catch(() => {
            this.$message.error("上传失败");
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
    this.getWork()
  }
}
</script>

<style scoped>

</style>