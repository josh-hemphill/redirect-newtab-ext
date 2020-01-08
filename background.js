chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({url: 'keep.google.com'}, function() {
      console.log('URL has been set to "keep.google.com"');
    });
  });