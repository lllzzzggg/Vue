<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-table>
    <el-table-column prop="gridMan" label="网格员"></el-table-column>
    <el-table-column prop="pending" label="待处理"></el-table-column>
    <el-table-column prop="processed" label="已处理"></el-table-column>
    <el-table-column prop="completed" label="已完成"></el-table-column>
    <el-table-column prop="issue" label="我发出"></el-table-column>
    <el-table-column prop="implement" label="我执行"></el-table-column>
    <el-table-column prop="copy" label="抄送我"></el-table-column>
    <el-table-column prop="reportEvent" label="上报事件"></el-table-column>
    <el-table-column prop="comprehensive" label="综合"></el-table-column>
  </el-table>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
