import { mkdtemp } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { $, fs, usePowerShell } from 'zx';
import * as PackageJson from '../package.json' with { type: 'json' };

const dist = path.resolve('dist');
const archiveName = `newtab-redirect-${PackageJson.version}.zip`;
const manifestPath = path.join(dist, 'manifest.json');

// Refuse to produce a store archive if the extension build did not finish.
await fs.access(manifestPath);
await Promise.all([
	fs.copyFile('LICENSE', path.join(dist, 'LICENSE')),
	fs.copyFile('README.md', path.join(dist, 'README.md')),
	fs.rm(path.join(dist, '.vite'), { recursive: true, force: true }),
]);

const staging = await mkdtemp(path.resolve('.extension-zip-'));
const archive = path.join(staging, archiveName);
try {
	if (process.platform === 'win32') {
		usePowerShell();
		await $({ cwd: dist })`Compress-Archive -Path '*' -DestinationPath ${archive}`;
	}
	else {
		await $({ cwd: dist })`zip -q -r ${archive} .`;
	}
	await fs.move(archive, path.resolve(archiveName), { overwrite: true });
}
finally {
	await fs.rm(staging, { recursive: true, force: true });
}
