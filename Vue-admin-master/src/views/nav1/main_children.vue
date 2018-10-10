<template>
	<section>
		<!-- <input v-model="message">
		<button @click="submitMsg">SubmitMsg</button> -->
		<h3>{{ title }}</h3>
		<input v-model="message">
		<button @click="submitMsg">Enlarge text</button>
	</section>
</template>

<script>
	export default {
		props:['title'],
		data(){
			return {
				message:'',
				fn:'',
				ln:''
			}
		},
		watch:{
			message(val){
				this.$store.state.msg = this.message
			}
		},
		methods:{
			submitMsg(){
				this.$store.state.msg = this.message
				// this.$emit('update:show',this.message)
			}
		}
		
	}

</script>

<style scoped>

</style>