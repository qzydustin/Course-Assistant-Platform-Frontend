<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="作业标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作业内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>


    <el-collapse v-for="work in workList" :key="work" accordion>
      <el-collapse-item v-bind:title="work.work_title" name="1">
        <div>{{ work.work_content }}</div>
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
      workList: []
    }
  },
  methods: {
    submit() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      param.append('title', this.form.title)
      param.append('content', this.form.content)
      this.axios.post("api/addWork", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("发布失败");
            } else {
              this.$message.success("发布成功");
            }
            this.getWork()
          });

    },
    getWork() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getWork", param)
          .then(res => {
            this.workList = res.data
          });
    },

  },
  mounted() {
    this.getWork()
  }
}
</script>

<style scoped>

</style>