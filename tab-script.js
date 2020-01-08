function redirect(url) {
    window.location.replace(`https://${url}`);
}
let timer = setTimeout( function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('failed').style.display = 'block';
    },1000)
chrome.storage.sync.get('url', function({url}) {
    clearTimeout(timer)
    redirect(url);
});
window.addEventListener('load',function(){
    chrome.storage.sync.get('url', function({url}) {
        document.getElementById('redirecter').addEventListener('click', function () {
            redirect(url);
        })
    });
});