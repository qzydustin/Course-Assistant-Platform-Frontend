<template>
  <div>
    <el-collapse v-for="topic in topicList" :key="topic" accordion>
      <el-collapse-item v-bind:title="topic.title">
        <div>话题内容：{{ topic.content }}</div>
        <div v-for="d in topic.discussion" :key="d">用户{{ d.username }}发布看法：{{ d.message }}</div>
        <el-divider></el-divider>
        <el-input v-model="input" placeholder="发表一下你的看法吧"></el-input>
        <el-button type="primary" @click="submitDiscussion(topic.tid)">发表看法</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
export default {
  name: "Discussion",
  data() {
    return {
      form: {
        title: null,
        content: null
      },
      topicList: [],
      input: null
    }
  },
  methods: {
    submitDiscussion(topicID) {
      let param = new URLSearchParams()
      param.append('topic_id', topicID)
      param.append('user_id', localStorage.getItem("ID"))
      param.append('message', this.input)
      this.axios.post("api/addDiscussion", param)
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("发布失败");
            } else {
              this.$message.success("发布成功");
            }
            this.getTopic()
          });

    },
    getTopic() {
      let param = new URLSearchParams()
      param.append('course_id', localStorage.getItem("CourseID"))
      this.axios.post("api/getTopic", param)
          .then(res => {
            this.topicList = res.data
          });
    },

  },
  mounted() {
    this.getTopic();
  }
}
</script>

<style scoped>

</style>