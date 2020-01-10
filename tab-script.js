function redirect(url) {
    window.location.replace(`https://${url}`);
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
        chrome.storage.sync.set({url:'keep.google.com'}, function () {
            console.log('initialized url as keep.google.com');
            window.location.replace('https://keep.google.com');
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