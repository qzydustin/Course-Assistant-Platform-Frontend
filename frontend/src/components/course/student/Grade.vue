<template>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
        prop="work_title"
        label="名字"
        width="180">
    </el-table-column>
    <el-table-column
        prop="score"
        label="分数"
        width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Grade",
  data() {
    return{
      tableData: []
    }
  },
  methods:{
    getScore(){
      let param = new URLSearchParams()
      param.append('uid', localStorage.getItem("ID"))
      param.append('cid', localStorage.getItem("CourseID"))
      this.axios.post("api/getScore", param)
          .then(res => {
            this.tableData = res.data
          });

    }

  },
  mounted() {
    this.getScore()
  }
}
</script>

<style scoped>

</style>