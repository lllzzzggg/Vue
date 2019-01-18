<template>
  <div>
    loading...
  </div>
</template>

<script>
export default {
  name: 'reachIndex',
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'reachModule'
      })
    }, 1000)
  }
}
</script>
