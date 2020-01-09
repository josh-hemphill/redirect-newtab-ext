# redirect-newtab-ext

Browser Extension to redirect the 'New Tab' to an external site of your choosing.

## Code Description

The extension implements a temporary 'New Tab Page' that when loaded, imediately queries the extension storage for your set redirect page, and then proceeds to redirect.

A temporary background script is used to inialize the storage. This may be removed in the future and just have better error handling on the 'New Tab Page' script.

### Note: currently only a chrome extension
