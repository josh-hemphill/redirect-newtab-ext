<script setup lang="ts">
const { t } = useI18n();
useHead({
	title: () => t('info.title'),
});
</script>

<template>
	<v-app-bar :title="t('info.settings')" />
	<v-main class="pt-10 text-center text-gray-700 dark:text-gray-200 d-flex flex-col">
		<v-container fluid>
			<v-container>
				<v-row justify="center">
					<v-col
						cols="12"
						md="8"
						lg="6"
					>
						<TheSettingsWrapper />
					</v-col>
				</v-row>
			</v-container>
		</v-container>
	</v-main>
	<TheFooter />
</template>

<style>
html {
	min-height: 30rem;
	min-width: 26rem;
}
</style>
