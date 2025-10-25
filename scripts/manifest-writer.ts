import { copyFileSync, existsSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { env } from 'node:process';
import url from 'node:url';
import { defineManifest } from '@crxjs/vite-plugin';
import * as PackageJson from '../package.json';

const __dirname = path.dirname(path.join(url.fileURLToPath(new URL(import.meta.url)), '..'));

const [major, minor, patch, label = '0'] = PackageJson.version
	// can only contain digits, dots, or dash
	.replace(/[^\d.-]+/g, '')
	// split into version parts
	.split(/[.-]/);

const baseName = '__MSG_extensionName__';
const description = '__MSG_extensionDescription__';

const manifest = defineManifest({
	manifest_version: 3,
	name:
		env.mode === 'staging'
			? `[INTERNAL] ${baseName}`
			: baseName,
	description,
	default_locale: 'en',
	author: { email: PackageJson.author.email },
	homepage_url: PackageJson.homepage,
	icons: {
		16: 'icons/icon16.png',
		24: 'icons/icon24.png',
		32: 'icons/icon32.png',
		48: 'icons/icon48.png',
		64: 'icons/icon64.png',
		128: 'icons/icon128.png',
	},
	// up to four numbers separated by dots
	version: `${major}.${minor}.${patch}.${label}`,
	// semver is OK in "version_name"
	version_name: PackageJson.version,
	offline_enabled: false,
	permissions: ['storage'],
	action: {
		default_title: baseName,
		default_popup: 'popup.html',
	},
	chrome_url_overrides: {
		newtab: 'newtab.html',
	},
});

writeFileSync(path.resolve(__dirname, 'dist/manifest.json'), JSON.stringify(manifest, null, 2));
copyFileSync(path.resolve(__dirname, 'manual-js/pre-vue-load.js'), path.resolve(__dirname, 'dist/pre-vue-load.js'));
copyFileSync(path.resolve(__dirname, 'manual-js/first-load.js'), path.resolve(__dirname, 'dist/first-load.js'));
if (existsSync(path.resolve(__dirname, 'dist/index.html'))) {
	unlinkSync(path.resolve(__dirname, 'dist/index.html'));
}
