<template>
  <div>
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