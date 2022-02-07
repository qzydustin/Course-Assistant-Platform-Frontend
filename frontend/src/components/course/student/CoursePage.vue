<template>
  <div>
    <h1>{{ this.course_name }} </h1>
    <el-menu class="el-menu-demo"  mode="horizontal" router>
      <el-menu-item index="1" :route="{name: 'StudentInformation'}">通知</el-menu-item>
      <el-menu-item index="2" :route="{name: 'StudentData'}">资料</el-menu-item>
      <el-menu-item index="3" :route="{name: 'StudentDiscussion'}">讨论</el-menu-item>
      <el-menu-item index="4" :route="{name: 'StudentWork'}">作业</el-menu-item>
      <el-menu-item index="5" :route="{name: 'StudentExam'}">考试</el-menu-item>
      <el-menu-item index="6" :route="{name: 'StudentGrade'}">成绩</el-menu-item>
    </el-menu>
    <el-card class="card" shadow="hover">
      <router-view/>
    </el-card>
  </div>

</template>
<script>
export default {
  name: "TeacherCoursePage",
  data() {
    return {
      course_name: null
    }
  },
  mounted() {
    this.course_name = localStorage.getItem("CourseName")
  }
}
</script>
<style scoped>


</style>