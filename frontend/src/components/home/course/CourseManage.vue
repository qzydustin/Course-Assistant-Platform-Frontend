<template>
  <div>
    <el-card class="teacher" style="width: 270px; margin:30px; float:left" v-show="isTeacher">
      <div slot="header" class="clearfix">
        <span>创建课程</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createCourse()">提交</el-button>
      </div>
      <el-form :model="toCreate">
        <el-form-item label="课程名:" style="margin:auto;">
          <el-input v-model="toCreate.course_name" placeholder="请输入要创建课程的课程名"></el-input>
        </el-form-item>
        <el-form-item label="课程码:" style="margin:auto;">
          <el-input v-model="toCreate.cid" placeholder="请输入要创建课程的课程码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="teacher" style="width: 270px; margin:30px; float:left" v-show="isTeacher">
      <div slot="header" class="clearfix">
        <span>解散课程</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="deleteCourse()">提交</el-button>
      </div>
      <el-form :model="toDelete">
        <el-form-item label="课程码:" style="margin:auto;">
          <el-input v-model="toDelete.cid" placeholder="请输入要解散课程的课程码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="student" style="width: 270px; margin:30px; float:left" v-show="!isTeacher">
      <div slot="header" class="clearfix">
        <span>添加课程</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addCourse()">提交</el-button>
      </div>
      <el-form :model="toAdd">
        <el-form-item label="课程码:" style="margin:auto;">
          <el-input v-model="toAdd.cid" placeholder="请输入要添加课程的课程码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="student" style="width: 270px; margin:30px; float:left" v-show="!isTeacher">
      <div slot="header" class="clearfix">
        <span>退出课程</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="deleteCourse()">提交</el-button>
      </div>
      <el-form :model="toDelete">
        <el-form-item label="课程码:" style="margin:auto;">
          <el-input v-model="toDelete.cid" placeholder="请输入要退出课程的课程码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import CurrentCourse from "@/components/home/course/CurrentCourse";

export default {
  name: "CourseManage",
  data() {
    return {
      isTeacher: null,
      toCreate: {
        course_name:null,
        cid:null,
      },
      toAdd: {
        cid:null,
      },
      toDelete: {
        cid:null,
      }
    }
  },
  methods: {
    createCourse() {
      let param = new URLSearchParams()
      param.append('ID', localStorage.getItem("ID"))
      param.append('cid', this.toCreate.cid)
      param.append('course_name', this.toCreate.course_name)
      this.axios.post("api/createCourse", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("创建失败");
            } else {
              this.$message.success("创建成功");
            }
          });
      CurrentCourse.updated()
    },
    addCourse() {
      let param = new URLSearchParams()
      param.append('ID', localStorage.getItem("ID"))
      param.append('cid', this.toAdd.cid)
      this.axios.post("api/addCourse", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("加入失败");
            } else {
              this.$message.success("加入成功");
            }
          });
      CurrentCourse.updated()
    },

    deleteCourse() {
      let param = new URLSearchParams()
      param.append('Auth', localStorage.getItem("Auth"))
      param.append('ID', localStorage.getItem("ID"))
      param.append('cid', this.toDelete.cid)
      this.axios.post("api/deleteCourse", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("操作失败");
            } else {
              this.$message.success("操作成功");
            }
          });
      CurrentCourse.updated()
    },
  },
  mounted() {
    let auth = localStorage.getItem("Auth")
    this.isTeacher = auth === "0";
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

</style>