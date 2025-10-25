import { $, fs } from 'zx';
import * as PackageJson from '../package.json' with { type: 'json' };

await Promise.all([
	fs.copyFile('./LICENSE', './dist/LICENSE'),
	fs.copyFile('./README.md', './dist/README.md'),
	fs.rm('./dist/.vite', { recursive: true }),
]);

await $`tar -acf newtab-redirect-${PackageJson.version}.zip dist`;
