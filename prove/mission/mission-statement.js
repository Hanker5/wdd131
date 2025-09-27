
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');
let root = document.querySelector(':root')
let content = document.querySelector('#content')

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.body.style.background = '#2a2a2a';
        root.style.setProperty('--linecolor', '#505050');
        root.style.setProperty('--subHeadColor', '#5999c4');
        logo.setAttribute('src', 'byui-logo-white.png');
        content.style.setProperty('color', 'white');
    } else {
        document.body.style.background = '#ffffff';
        root.style.setProperty('--linecolor', '#808080');
        root.style.setProperty('--subHeadColor', '#035f9c');
        logo.setAttribute('src', 'byui-logo-blue.png');
        content.style.setProperty('color', 'black');
    }
}           
                    