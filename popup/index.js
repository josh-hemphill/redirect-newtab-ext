function updateBlank(url) {
    if(!url) url = 'Default'
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
    if(url.match(/^default$/i)) url = '';
    chrome.storage.sync.set({url}, function() {
        updateBlank(url)
        input.value = '';
    });
}
document.getElementById('updateUrl').addEventListener('click', function() {
    setUrl()
});
chrome.storage.sync.get('url', function ({url}) {
    if(!url) {
        chrome.storage.sync.set({url:''},function(){
            updateBlank('Default');
        })
    } else {
        updateBlank(url);
    }
});