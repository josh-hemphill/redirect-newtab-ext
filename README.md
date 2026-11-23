# New Tab Redirect

New Tab Redirect opens a destination you choose whenever you open a new Chrome tab.

## Install and use

1. Install [New Tab Redirect from the Chrome Web Store](https://chromewebstore.google.com/detail/new-tab-redirect/gjhaadblnhgegfaegeekjlhaciebchfk).
2. Open the extension from Chrome's toolbar and enter a destination URL.
3. Open a new tab to try the redirect. Turn it off in the extension settings to stop redirecting new tabs.

The extension declares the `storage` permission for its settings.

## Build locally

Use the Node.js and pnpm versions required by the packages in the lockfile. On Unix-like systems, install the `zip` command. The Windows build uses PowerShell's `Compress-Archive`.

```sh
pnpm install --frozen-lockfile
pnpm run test:unit --run
pnpm run build
```

Load `dist/` as an unpacked extension in a clean Chrome profile. The build also writes `newtab-redirect-<version>.zip`. Its root contains `manifest.json` and the other extension files.

## Releases

The [Chrome Web Store](https://chromewebstore.google.com/detail/new-tab-redirect/gjhaadblnhgegfaegeekjlhaciebchfk) is the Chrome distribution channel. [GitHub Releases](https://github.com/josh-hemphill/redirect-newtab-ext/releases) hold versioned ZIP files that can be prepared before submission. Check the installed version in Chrome to see which build is running.
