<template>
	<Suspense>
		<template #fallback>
			<v-row
				justify="center"
				class="mb-6"
			>
				<v-col cols="auto">
					<v-skeleton-loader
						v-for="i in 3"
						:key="i"
						type="text"
					/>
				</v-col>
			</v-row>
		</template>
		<template #default>
			<ClientOnly>
				<TheSettings />
			</ClientOnly>
		</template>
	</Suspense>
</template>
