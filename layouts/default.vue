<script setup lang="ts">

import { onMounted } from 'vue'
import { useTheme } from 'vuetify'

	const theme: any = useTheme()

	onMounted(() => {
		if (process.client) { 
			const storedTheme = localStorage.getItem('theme_store');
			theme.global.name.value = storedTheme ? storedTheme.toString() : 'lightTheme'
		}
	})
	
</script>

<template>
	<div>
		<VApp>
			<VMain>
				<slot />
			</VMain>
		</VApp>
	</div>
</template>