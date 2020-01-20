function redirect(url) {
    if (!url.includes('://')) url = 'https://' + url;
    chrome.tabs.update(null,{url});
}
let timer = setTimeout( function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('failed').style.display = 'block';
    },1000)
function getTimestring() {
    let i = new Date();
    let h = 1 //i.getHours() % 12;
    if (h === 0) h = 12;
    h = h.toString();
    let m = 1 //i.getMinutes().toString();
    if (h.toString().length < 2) h = '0' + h;
    if (m.toString().length < 2) m = '0' + m;
    let inc = i.getHours() >= 12 || i.getHours() === 0 ? 'PM' : 'AM'
    return h + ':' + m + ' ' + inc;
}
chrome.storage.sync.get('url', function({url}) {
    clearTimeout(timer);
    if(url) {
        redirect(url);
    } else {
        document.getElementById('loading').style.display='none'
        document.getElementById('body').style.display = 'block'
    }
});
window.addEventListener('load',function(){
    chrome.storage.sync.get('url', function({url}) {
        if(url) {
            document.getElementById('redirecter').addEventListener('click', function () {
                redirect(url);
            })
        } else {
            document.getElementById('time').innerHTML = getTimestring();
            let w = window.innerWidth;
            let h = window.innerHeight;
            let date = new Date();
            let background = document.getElementById('fullbody');
            let dailygen = date.getFullYear() + date.getDay() + date.getMonth();
            background.style.backgroundImage = `url(https://picsum.photos/seed/${dailygen}/${w}/${h})`;
            document.getElementById('loading').style.display='none';
            document.getElementById('body').style.display = 'block';
            document.getElementById('toggleControl').addEventListener('click', function(){
                let menu = document.getElementById('menu');
                if (menu.style.display === 'none') {
                    menu.style.display = 'block';
                } else {
                    menu.style.display = 'none';
                }
            })
            setInterval(() => {
                document.getElementById('time').innerHTML = getTimestring();
            },1000 * 60)
        }
    });
});