// ※init

let eggs = [...document.querySelectorAll('a')];
// e.g.
// <a href="abandoned/{egg_id}/...">
//    <img class="spr" alt="egg" src="...">
// </a>

eggs.forEach(e => {
    HighlightEgg(e)
});

// ※functions



function HighlightEgg(e) {
    const id = parseEggId(e.href);
    if (id === undefined) {
        return;
    }
    let textEggId = createTextElement(id);
    let idvals = id.replace("0", "o").replace("0", "o").replace("0", "o").replace("0", "o").replace("0", "o").toLowerCase()
    if(FIVELETTER.includes(idvals) || /^\d+$/.test(id)){
        let textEggId = createTextElement(id);
        textEggId = createTextElement(" xxx ", 'red');  
        e.appendChild(textEggId);
    }
    else if(FOURLETTER.indexOf(idvals.substring(0,4))>=0 || FOURLETTER.indexOf(idvals.substring(1))>=0){
        textEggId = createTextElement(" x ", 'yellow');
        e.appendChild(textEggId);
    }
}

function HideEggId(e) {
    try {
        e.removeChild(textEggId);
    } catch {
    }
}

function parseEggId(url) {
    let u = new URL(url)
    if (u.pathname.split('/')[1]=="view"){
        return u.pathname.split('/')[2];
    }
    else{
        return undefined;
    }
}

function createTextElement(value = '', background = '') {
    let e;
    e = document.createElement('span');
    e.innerText = value;
    e.style.relative = 'absolute';
    // e.style.marginLeft = '-32px'; 
    e.style.marginTop = '25px';
    // e.style.backgroundColor = '#ffffb3';
    e.style.backgroundColor = background
    return e;
}



