<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';

const { t } = useI18n();

const settingsStore = useSettingsStore();
const settings = toRef(settingsStore, 'settings');
const currentUrl = toRef(settingsStore, 'currentUrl');
</script>

<template>
	<v-row
		justify="center"
		class="mb-6"
	>
		<v-col cols="auto">
			<v-switch
				v-model="settings.redirectEnabled"
				:label="t('redirect.enabled')"
				:aria-label="t('redirect.enabled')"
				color="primary"
				inset
			/>
		</v-col>
	</v-row>

	<!-- History Navigation -->
	<v-row
		justify="center"
		align="center"
		class="mb-4"
	>
		<v-col cols="auto">
			<v-btn
				:icon="mdiChevronLeft"
				variant="tonal"
				:label="t('redirect.previous')"
				:aria-label="t('redirect.previous')"
				@click="settingsStore.previousHistory"
			/>
		</v-col>

		<v-col
			cols="6"
			sm="8"
		>
			<v-text-field
				v-model="currentUrl"
				:label="t('redirect.current_url')"
				:aria-label="t('redirect.current_url')"
				:placeholder="t('redirect.empty_for_default')"
				density="comfortable"
				clearable
				hide-details
			/>
		</v-col>

		<v-col cols="auto">
			<v-btn
				:icon="mdiChevronRight"
				variant="tonal"
				:label="t('redirect.next')"
				:aria-label="t('redirect.next')"
				@click="settingsStore.nextHistory"
			/>
		</v-col>
	</v-row>

	<!-- History Info -->
	<v-row justify="center">
		<v-col cols="auto">
			<v-chip
				:text="settingsStore.historyInfo"
				variant="outlined"
				size="small"
			/>
		</v-col>
	</v-row>

	<!-- Clear History Button -->
	<v-row
		justify="center"
		class="mt-4"
	>
		<v-col cols="auto">
			<v-btn
				:text="t('redirect.clear_history')"
				:aria-label="t('redirect.clear_history')"
				variant="tonal"
				color="warning"
				:disabled="settingsStore.historyInfo === '1 / 0'"
				@click="settingsStore.clearHistory"
			/>
		</v-col>
	</v-row>
</template>
