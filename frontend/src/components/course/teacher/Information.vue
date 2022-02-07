<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="通知标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>


    <el-card class="box-card" v-for="information in informationList" :key="information">
      <div slot="header" class="clearfix">
        <span>{{ information.title }}</span>
      </div>
      <div>
        {{ information.content }}
      </div>
    </el-card>



  </div>

</template>

<script>

export default {
  name: "TeacherInformation",
  data() {
    return {
      form: {
        title: null,
        content: null,
      },
      informationList: []
    }
  },
  methods: {
    submit() {
      let param = new URLSearchParams()
      param.append('course_id', localStorage.getItem("CourseID"))
      param.append('title', this.form.title)
      param.append('content', this.form.content)
      this.axios.post("api/addResourceInformation", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("发布失败");
            } else {
              this.$message.success("发布成功");
            }
            this.getInformation()
          });

    },
    getInformation() {
      let param = new URLSearchParams()
      param.append('course_id', localStorage.getItem("CourseID"))
      this.axios.post("api/getResourceInformation", param)
          .then(res => {
            this.informationList = res.data
          });
    }
  },
  mounted() {
    this.getInformation()
  }

}
</script>

<style scoped>
.box-card {
  float:left;
  width: 200px;
  height: 300px;
  margin: 20px
}
</style>