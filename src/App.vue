<script setup lang="ts">
import { isDark } from '~/composables/dark.ts';
</script>

<template>
	<v-app
		full-height
		:theme="isDark ? 'dark' : 'light'"
	>
		<router-view />
	</v-app>
</template>
