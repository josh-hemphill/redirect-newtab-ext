# redirect-newtab-ext

A basic extension to redirect the 'New Tab' to an external site of your choosing.
Make sure you keep seeing your notes or important info when you're browsing.

A minimal extension; no background scripts or unnecessary permissions.

For issues and suggestions open a github issue.

## Backend Description

The extension implements a temporary 'New Tab Page' that when loaded, immediately queries the extension storage for your set redirect page, and then proceeds to redirect.

Removed any background scripts so that it only runs when you initiate it.
