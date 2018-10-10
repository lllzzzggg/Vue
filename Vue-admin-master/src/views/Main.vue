<template>
	<section>
		<p>{{ storeMessage }}</p>
		<children 
			v-for="post in posts"
			v-bind:key="post.id"
			v-bind:title="post.title"
			v-on:large="postFontSize += 0.1"
			:style="{fontSize: postFontSize + 'em'}"
		></children>
	</section>
</template>

<script>
import child from './nav1/main_children'
	export default {
		data(){
			return {
				posts:[
					{ id: 1, title: 'My journey with Vue' },
					{ id: 2, title: 'Blogging with Vue' },
					{ id: 3, title: 'Why Vue is so fun' }
				],
				postFontSize: 1,
				message:'dsds'
			}
		},
		components:{
			"children":child
		},
		computed:{
			storeMessage(){
				return this.$store.state.msg
			},
			showMsg(msg){
				this.message = msg
			}
		}
	}

</script>

<style scoped>

</style>