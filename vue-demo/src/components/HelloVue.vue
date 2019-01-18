<template>
  <div class="hello">
    <p>{{ count }}</p>
    <button @click="addVuexTest">vuexTest++</button>
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: true,
      test:1
    }
  },
  computed:{
    count(){
      return this.$store.getters.isVuexTest
    }
  },
  methods:{
    addVuexTest(){
      this.$store.dispatch({
        type:'addIncrement',
        amount:3
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active {
    animation: bounin .5s
  }
  .fade-leave-active {
    animation: bounin .8s reverse
  }
  @keyframes bounin {
    0% {
      transform: scale(0)
    }
    5% {
      transform: scale(1.5)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
