<script setup lang="ts">
const { t } = useI18n();
useHead({
	title: () => t('info.title'),
});
function getDateSeed() {
	const date = new Date();
	return date.getFullYear() + date.getDay() + date.getMonth();
}
const dailyGen = import.meta.env.SSR
	? {
			url: '',
			infoUrl: '',
		}
	: {
			url: `url(https://picsum.photos/seed/${getDateSeed()}/${window.innerWidth}/${window.innerHeight})`,
			infoUrl: `https://picsum.photos/seed/${getDateSeed()}/info`,
		};
const showTooltip = ref(false);
const dailyGenInfo = ref({
	url: '',
	author: '...',
});
if (!import.meta.env.SSR) {
	onMounted(() => {
		const { settings } = useSettingsStore();
		showTooltip.value = !settings.redirectHistory.length;
		fetch(dailyGen.infoUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data.url) {
					dailyGenInfo.value.url = data.url;
					dailyGenInfo.value.author = data.author;
				}
			})
			.catch((error) => {
				console.error('Error fetching daily gen info:', error);
			});
	});
}
</script>

<template>
	<v-main
		:style="{
			backgroundImage: dailyGen.url,
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
		}"
		class="text-gray-700 dark:text-gray-200 d-flex flex-col justify-space-between pa-3"
	>
		<TheToolHelp />
		<v-dialog max-width="500">
			<template #activator="{ props: activatorProps }">
				<v-btn
					v-bind="activatorProps"
					icon
					:title="t('button.settings')"
					:aria-label="t('button.settings')"
					@click="showTooltip = false"
				>
					<v-icon
						:icon="mdiCog"
					/>
					<v-tooltip
						v-model="showTooltip"
						:open-on-hover="false"
						activator="parent"
						location="end"
						:text="t('info.explain_settings')"
					/>
				</v-btn>
			</template>

			<template #default="{ isActive }">
				<v-card rounded="lg">
					<v-card-title class="d-flex justify-space-between align-center">
						<div class="text-h6 text-medium-emphasis ps-2">
							{{ t('info.settings') }}
						</div>

						<v-btn
							:title="t('button.close')"
							:aria-label="t('button.close')"
							:icon="mdiClose"
							density="comfortable"
							color="error"
							@click="isActive.value = false"
						/>
					</v-card-title>

					<v-divider class="mb-4" />
					<v-card-text>
						<TheSettingsWrapper />
					</v-card-text>
				</v-card>
			</template>
		</v-dialog>
		<p class="align-self-end text-caption">
			<a
				href="https://picsum.photos/"
				target="_blank"
			>{{ t('info.random_daily_image', { picsumDomain: 'picsum.photos' }) }}</a><br>
			<a
				:href="dailyGenInfo.url"
				target="_blank"
			>{{ t('info.random_daily_image_author', { author: dailyGenInfo.author }) }}</a>
		</p>
	</v-main>
	<TheFooter style="max-height: 6vh; min-height: 3rem;" />
</template>
