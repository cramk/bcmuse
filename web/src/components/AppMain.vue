<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card ">
				<h1 class="p-p-4">BCMUSE</h1>
				<span class="p-float-label">
	<InputText id="url-srch" type="text" v-model="state.url"  class="p-inputtext-lg huge-width p-p-4" @keyup.enter="submit" />
	<label for="url-srch">BC URL</label>
</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, reactive,ref } from 'vue'
import axios from "axios";
import { saveAs } from 'file-saver';
defineProps({
  msg: String
})

 const state = reactive({ url:'' })

 const closeBasic = ()=>{
  state.showDialog = false
}
 const openBasic = ()=>{
   console.log("Showing dialog",state.showDialog)
  state.showDialog = true
   console.log("Showing dialog after",state.showDialog)
}
const submit = async ()=>{
	console.log("Getting URL for",state.url)
	const url_req_res = await axios.post('http://localhost:9000', { url: state.url });
	console.log("Got URL",url_req_res.data.url)

	axios.get(url_req_res.data.url, {params: {}, responseType: 'blob'})
    .then((res) => {
			
			console.log("Saving")
			saveAs(res.data,`${url_req_res.data.title}.mp3`)
        //...
    }).catch((err) => {
        //
    })

}

</script>

<style scoped >
.huge-width{
	min-width:300px;
}
</style>
