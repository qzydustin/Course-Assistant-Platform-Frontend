<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="考试标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="考试范围">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>


    <el-collapse v-for="exam in examList" :key="exam" accordion>
      <el-collapse-item v-bind:title="exam.work_title" name="1">
        <div>{{ exam.work_content }}</div>
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
      examList: []
    }
  },
  methods: {
    submit() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      param.append('title', this.form.title)
      param.append('content', this.form.content)
      this.axios.post("api/addExam", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("发布失败");
            } else {
              this.$message.success("发布成功");
            }
            this.getExam()
          });

    },
    getExam() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getExam", param)
          .then(res => {
            this.examList = res.data
          });
    }
  },
  mounted() {
    this.getExam()
  }
}
</script>

<style scoped>

</style>