function getTimestring() {
    let i = new Date();
    let h = i.getHours() % 12;
    if (h === 0) h = 12;
    h = h.toString();
    let m = i.getMinutes().toString();
    if (h.length < 2) h = '0' + h;
    if (m.lengtm < 2) m = '0' + m;
    let inc = i.getHours() >= 12 || i.getHours() === 0 ? 'PM' : 'AM'
    return h + ':' + m + ' ' + inc;
}
setInterval(() => {
    document.getElementById('time').innerHTML = getTimestring();
},1000 * 60)
window.addEventListener('load', function () {
    document.getElementById('time').innerHTML = getTimestring();
    let w = window.innerWidth;
    let h = window.innerHeight;
    let date = new Date();
    let background = document.getElementById('body');
    let dailygen = date.getFullYear() + date.getDay() + date.getMonth();
    background.style.backgroundImage = `url(https://picsum.photos/seed/${dailygen}/${w}/${h})`;
})