<script setup lang="ts">
const { t } = useI18n();
const { settings } = useSettingsStore();
const showHelpText = ref(false);
onMounted(() => {
	setTimeout(() => {
		showHelpText.value = !settings.toolHelpDismissed;
	}, 2500);
});
function dismissToolHelp() {
	settings.toolHelpDismissed = true;
	showHelpText.value = false;
}
</script>

<template>
	<v-scale-transition origin="top right">
		<v-card
			v-show="showHelpText"
			style="position: fixed; top: 1rem; right: 1rem;"
			:title="t('info.tool_help')"
			max-width="18rem"
		>
			<template #prepend>
				<v-icon
					size="large"
					:icon="mdiArrowUpThick"
				/>
			</template>
			<template #append>
				<v-btn
					:title="t('button.close')"
					:aria-label="t('button.close')"
					:icon="mdiClose"
					density="comfortable"
					size="small"
					color="error"
					@click="dismissToolHelp"
				/>
			</template>
			<v-card-text>
				{{ t('info.tool_help_description') }}
			</v-card-text>
			<v-card-text class="d-flex justify-space-between py-0">
				<v-icon
					class="my-2 mr-3 ml-1"
					icon="M17 15v5H6.12 4V17.88c1.75-.68 3-2.38 3-4.38S5.76 9.8 4 9.12V7H17Zm5-1.5c0-1.76-1.3-3.22-3-3.46V7A2 2 0 0017 5H13.96c-.24-1.7-1.7-3-3.46-3S7.28 3.3 7.04 5H4A2 2 0 002 7v3.8h.3C3.79 10.8 5 12 5 13.5s-1.21 2.7-2.7 2.7H2V20a2 2 0 002 2h9.2v-.3.3H17a2 2 0 002-2V16.96c1.7-.24 3-1.7 3-3.46"
				/>
				<p>{{ t('info.tool_help_description_icon') }}</p>
			</v-card-text>
			<v-card-text class="d-flex justify-space-between">
				<v-icon
					class="my-2 mr-3 ml-1"
					:icon="mdiPinOutline"
				/>
				<p>{{ t('info.tool_help_description_pin') }} 😊</p>
			</v-card-text>
		</v-card>
	</v-scale-transition>
</template>
