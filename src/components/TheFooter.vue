<script setup lang="ts">
const { t } = useI18n();
const { smAndDown } = useDisplay();
</script>

<template>
	<v-footer
		class="text-xl justify-center"
		:style="{ 'max-height': smAndDown ? '3.5rem' : undefined }"
	>
		<div class="d-flex w-100 align-center px-4">
			<v-btn
				density="compact"
				flat
				icon
				class="mx-3 my-1"
				rel="noreferrer"
				href="https://github.com/josh-hemphill/redirect-newtab-ext"
				target="_blank"
				:title="t('link.github')"
				:aria-label="t('link.github')"
				@click="() => ''"
			>
				<v-icon
					size="large"
					:icon="mdiGithub"
				/>
			</v-btn>

			<v-spacer />

			<Suspense>
				<template #fallback>
					<v-skeleton-loader type="text" />
				</template>
				<template #default>
					<ClientOnly>
						<TheLanguageControl />
					</ClientOnly>
				</template>
			</Suspense>

			<v-btn
				density="compact"
				flat
				icon
				class="ml-4 mr-3 my-1"
				:title="t('button.toggle_dark')"
				:aria-label="t('button.toggle_dark')"
				@click="toggleDark()"
			>
				<v-icon
					v-if="isDark"
					size="large"
					:icon="mdiBrightness2"
				/>
				<v-icon
					v-else
					size="large"
					:icon="mdiBrightness5"
				/>
			</v-btn>
		</div>
	</v-footer>
</template>
