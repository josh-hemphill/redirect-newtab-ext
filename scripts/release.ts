#!/usr/bin/env zx

import { versionBump } from 'bumpp';
import { $ } from 'zx';
import 'zx/globals';

try {
	const packages = await glob(['package.json'], { expandDirectories: false });

	console.log('Bumping versions in packages:', packages.join(', '), '\n');

	const result = await versionBump({
		files: packages,
		commit: 'ci: release v%s',
		push: true,
		tag: true,
		all: true,
	});

	await $({ stdio: 'inherit' })`tsx scripts/changelog.ts --recreateChangelog`;
	const addResult = await $`git add CHANGELOG.md`.nothrow();
	if (addResult.exitCode === 0) {
		await $`git commit -m "ci: update changelog"`;
	}
	else {
		console.log('CHANGELOG.md is already up to date');
	}

	const latestTagExists = await $`git tag -l latest`.nothrow();
	if (latestTagExists.exitCode === 1) {
		await $`git tag -d latest`;
	}
	await $`git tag latest`;

	if (result.newVersion.includes('beta') === false) {
		console.log('Pushing to release branch');
		await $`git update-ref refs/heads/release refs/heads/dev`;
		await $`git push origin release`;
	}
	await $`git push origin dev --tags`;
	console.log('New release is ready, waiting for conformation at https://github.com/josh-hemphill/newtab-redirect-ext/actions');
}
catch (err) {
	console.error(err);
}
