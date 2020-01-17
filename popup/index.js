function updateBlank(url) {
    if(!url || url === chrome.runtime.getURL('../default-tab/index.html')) url = 'Default'
    let ele = document.getElementById('curentUrl');
    ele.innerHTML = url.replace(/https?:\/\//, '');
}
document.getElementById('preventDefault').addEventListener('submit', function (event) {
    event.preventDefault();
});
let input = document.getElementById('url');
function setUrl() {
    let url = input.value;
    url = url.replace(/(https:\/\/)|(http:\/\/)/,'');
    if(url.match(/^default$/i)) url = chrome.runtime.getURL('../default-tab/index.html');
    chrome.storage.sync.set({url}, function() {
        updateBlank(url)
        input.value = '';
        console.log(`URL has been set to "${url && url !== chrome.runtime.getURL('../default-tab/index.html') ? url : 'Default'}"`);
    });
}
document.getElementById('updateUrl').addEventListener('click', function() {
    setUrl()
});
chrome.storage.sync.get('url', function ({url}) {
    if(!url) {
        chrome.storage.sync.set({url:chrome.runtime.getURL('../default-tab/index.html')},function(){
            console.log('initialized url as normal New Tab');
            updateBlank('Default');
        })
    } else {
        updateBlank(url);
    }
});