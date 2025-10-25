<script setup lang="ts">
import { availableLocales, useLanguageStore } from '~/stores/language';

const languageStore = useLanguageStore();

const { t } = useI18n();
function itemProps(locale: string) {
	return {
		title: `${t(`languageNames.${locale}`)} (${locale})`,
		value: locale,
	};
}
</script>

<template>
	<v-tooltip :text="t('button.toggle_langs')">
		<template #activator="{ props }">
			<v-select
				v-bind="props"
				v-model="languageStore.language.locale"
				:items="availableLocales"
				:item-props="itemProps"
				hide-details
				density="compact"
				variant="underlined"
				class="mb-2"
				style="max-width: 12rem"
				:prepend-inner-icon="mdiTranslate"
				prepend-inner-icon-color="primary"
				prepend-inner-icon-size="24"
				open-text="button.toggle_langs"
				close-text="button.toggle_langs"
			/>
		</template>
	</v-tooltip>
</template>
