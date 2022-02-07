<template>

  <div>
    <!-- 课程循环 -->
    <div style="width: 270px; margin:30px; float:left;"
         v-for="course in userCourseList" :key="course">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程码:{{ course.cid }}---{{ course.course_name }}</span>
        </div>
        <el-button type="primary" @click="enterCourse(course.cid,course.course_name)">进入</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "CurrentCourse",
  data() {
    return {
      isTeacher: null,
      userCourseList: []
    }
  },
  methods: {
    getCourse() {
      let param = new URLSearchParams()
      param.append('username', localStorage.getItem("Username"))
      param.append('auth', localStorage.getItem("Auth"))
      this.axios.post("api/getCourseByUsername", param)
          .then(res => {
            this.userCourseList = res.data
          });
    },
    enterCourse(cid,course_name) {
      localStorage.setItem("CourseID", cid)
      localStorage.setItem("CourseName",course_name)
      let auth = localStorage.getItem("Auth")
      if (auth === "0") {
        this.$router.push({name: 'TeacherCoursePage'})
      } else {
        this.$router.push({name: 'StudentCoursePage'})
      }

    }
  },
  mounted() {
    let auth = localStorage.getItem("Auth")
    this.isTeacher = auth === "0"
    this.getCourse()
  }

}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  margin: auto;
}
</style>