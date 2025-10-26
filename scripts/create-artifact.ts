import { $, fs, os, usePowerShell } from 'zx';
import * as PackageJson from '../package.json' with { type: 'json' };

const viteExists = await fs.exists('./dist/.vite');
await Promise.all([
	fs.copyFile('./LICENSE', './dist/LICENSE'),
	fs.copyFile('./README.md', './dist/README.md'),
	viteExists ? fs.rm('./dist/.vite', { recursive: true }) : Promise.resolve(),
]);

const hasZip = await $`which zip`.nothrow().quiet();
if (hasZip.exitCode !== 0 && os.type().toLowerCase().includes('windows')) {
	usePowerShell();
	await $`Compress-Archive -Force -Path dist\\* -DestinationPath newtab-redirect-${PackageJson.version}.zip`;
}
else {
	await $`zip -r newtab-redirect-${PackageJson.version}.zip dist/*`;
}
