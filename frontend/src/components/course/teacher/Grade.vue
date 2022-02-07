<template>
  <div>
    <el-select v-model="user" placeholder="请选择学生">
      <el-option
          v-for="item in StudentList"
          :key="item.username"
          :label="item.username"
          :value="item.uid">
      </el-option>
    </el-select>
    <el-select v-model="work" placeholder="请选择项目">
      <el-option
          v-for="item in WorkList"
          :key="item.work_title"
          :label="item.work_title"
          :value="item.work_id">
      </el-option>
    </el-select>
    <el-input placeholder="请输入分数" v-model="score" style="width: 150px"></el-input>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>

</template>

<script>
export default {
  name: "Grade",
  data() {
    return {
      StudentList: [],
      WorkList: [],
      HomeWorkList: [],
      ExamList: [],
      user: '',
      work: '',
      score: '',
    }
  },
  methods: {
    submit() {
      let param = new URLSearchParams()
      param.append('user', this.user)
      param.append('work', this.work)
      param.append('score', this.score)
      this.axios.post("api/addScore", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("评分失败");
            } else {
              this.$message.success("评分成功");
            }
          });
    },
    getStudent() {
      let param = new URLSearchParams()
      param.append('course_id', localStorage.getItem("CourseID"))
      this.axios.post("api/getUsersByCourse", param)
          .then(res => {
            this.StudentList = res.data
          });
    },
    getWork() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getWork", param)
          .then(res => {
            this.HomeWorkList = res.data
            this.WorkList = this.WorkList.concat(this.HomeWorkList)
          });
    },
    getExam() {
      let param = new URLSearchParams()
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getExam", param)
          .then(res => {
            this.ExamList = res.data
            this.WorkList = this.WorkList.concat(this.ExamList)
          });
    }
  },
  mounted() {
    this.getWork()
    this.getExam()
    this.getStudent()
  }

}
</script>

<style scoped>

</style>