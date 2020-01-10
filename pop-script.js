function updateBlank(url) {
    document.getElementById('curentUrl').innerHTML = url;
}
document.getElementById('preventDefault').addEventListener('submit', function (event) {
    event.preventDefault();
});
let loading = false;
let input = document.getElementById('url');
function setUrl() {
    let url = input.value;
    url = url.replace(/(https:\/\/)|(http:\/\/)/,'');
    chrome.storage.sync.set({url}, function() {
        updateBlank(url)
        input.value = '';
        console.log(`URL has been set to "${url}"`);
    });
}
document.getElementById('updateUrl').addEventListener('click', function() {
    setUrl()
});
chrome.storage.sync.get('url', function ({url}) {
    updateBlank(url);
    if(!url) {
        chrome.storage.sync.set({url:'keep.google.com'},function(){
            console.log('initialized url as keep.google.com')
        })
    }
});