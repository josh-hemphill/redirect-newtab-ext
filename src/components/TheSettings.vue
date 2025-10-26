<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';

const { t } = useI18n();

const settingsStore = useSettingsStore();
const settings = toRef(settingsStore, 'settings');

const newLink = ref('');
function addNewLink() {
	settingsStore.newHistory(newLink.value);
	newLink.value = '';
}
</script>

<template>
	<v-row
		justify="center"
	>
		<v-col cols="auto">
			<v-switch
				v-model="settings.redirectEnabled"
				:label="t('redirect.enabled')"
				:aria-label="t('redirect.enabled')"
				color="primary"
				inset
			/>
			<v-divider />
		</v-col>
	</v-row>
	<v-row
		justify="center"
		class="mt-0"
	>
		<v-col
			cols="12"
			md="8"
		>
			<v-radio-group
				v-model="settings.redirectHistoryIndex"
				hide-details
			>
				<v-list
					density="compact"
					class="bg-transparent"
				>
					<v-list-item
						v-for="(url, index) in settings.redirectHistory"
						:key="url"
					>
						<template #prepend>
							<v-avatar>
								<v-radio
									:value="index"
									:title="t('redirect.select')"
									:aria-label="t('redirect.select')"
									:color="index === settings.redirectHistoryIndex ? 'primary' : undefined"
								/>
							</v-avatar>
						</template>
						<v-list-item-title>
							<v-text-field
								v-model="settings.redirectHistory[index]"
								:title="t('redirect.edit')"
								:aria-label="t('redirect.edit')"
								variant="underlined"
								density="compact"
								class="mb-2"
								hide-details
							/>
						</v-list-item-title>
						<template #append>
							<v-btn
								:icon="mdiDelete"
								:title="t('redirect.delete')"
								:aria-label="t('redirect.delete')"
								size="small"
								color="error"
								variant="text"
								@click="settingsStore.deleteHistory(index)"
							/>
						</template>
					</v-list-item>
					<v-list-item>
						<template #prepend>
							<v-avatar>
								<v-btn
									:icon="mdiPlus"
									variant="tonal"
									density="comfortable"
									color="primary"
									:title="t('redirect.add_new_link')"
									:aria-label="t('redirect.add_new_link')"
									@click="addNewLink"
								/>
							</v-avatar>
						</template>
						<v-list-item-title>
							<v-text-field
								v-model="newLink"
								:label="t('redirect.new_link')"
								:title="t('redirect.new_link')"
								:aria-label="t('redirect.new_link')"
								variant="underlined"
								@keydown.enter.prevent="addNewLink"
							/>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-radio-group>
		</v-col>
	</v-row>

	<!-- Clear All -->
	<!-- <v-row
		justify="center"
		class="mt-0 mb-3"
	>
		<v-col cols="auto">
			<v-btn
				:text="t('redirect.clear_all')"
				:aria-label="t('redirect.clear_all')"
				variant="tonal"
				color="warning"
				:disabled="!settings.redirectHistory.filter(Boolean).length"
				@click="settingsStore.clearHistory"
			/>
		</v-col>
	</v-row> -->
</template>

<style scoped>
.v-list.bg-transparent {
	background-color: none;
}
</style>
