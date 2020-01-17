function redirect(url) {
    if (!url.includes('://')) url = 'https://' + url;
    chrome.tabs.update(null,{url});
}
let timer = setTimeout( function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('failed').style.display = 'block';
    },1000)
chrome.storage.sync.get('url', function({url}) {
    clearTimeout(timer);
    if(url) {
        redirect(url);
    } else {
        chrome.storage.sync.set({url:chrome.runtime.getURL('../default-tab/index.html')}, function () {
            console.log('initialized url as Default');
            chrome.tabs.update(null,{url:chrome.runtime.getURL('../default-tab/index.html')});
        })
    }

});
window.addEventListener('load',function(){
    chrome.storage.sync.get('url', function({url}) {
        document.getElementById('redirecter').addEventListener('click', function () {
            redirect(url);
        })
    });
});