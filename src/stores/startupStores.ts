import { useLanguageStore } from './language.ts'
import { useSettingsStore } from './settings.ts'

export const startupStores = [useLanguageStore, useSettingsStore]
