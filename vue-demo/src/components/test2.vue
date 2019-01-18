<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-for="todo in todos" :key="todo.id">{{ todo.msg }}</p>
    <test3 :title="msg"></test3>
    <button @click="clickTest">pppp</button>
  </div>
</template>

<script>
import test3 from './test3.vue'

export default {
  name: 'test2',
  components:{
    test3
  },
  data () {
    return {
      msg: null,
      todos:[
        {id:0,msg:"llll"},
        {id:1,msg:"zzzz"},
        {id:2,msg:"gggg"},
      ]
    }
  },
  methods:{
    clickTest(){
      this.msg = ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
