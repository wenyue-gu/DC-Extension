// ※init

let eggs = [...document.querySelectorAll('.spr')].map(e => e.parentNode);
// e.g.
// <a href="abandoned/{egg_id}/...">
//    <img class="spr" alt="egg" src="...">
// </a>

eggs.forEach(e => {
    // e.addEventListener('mouseenter', ShowEggId);
    e.addEventListener('mouseenter', ShowEggLineage);
    // e.addEventListener('mouseleave', HideEggId);
    ShowEggId(e)
});

// ※functions

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


function ShowEggId(e) {
    const id = parseEggId(e.href);
    if (id === undefined) {
        return;
    }
    let textEggId = createTextElement(id);
    let idvals = id.replace("0", "o").replace("0", "o").replace("0", "o").replace("0", "o").replace("0", "o").toLowerCase()
    // if(id ==="4kqe0" || id ==="3KOAJ"|| id ==="B7B2x"|| id ==="aD8nc"|| id ==="ecLJZ"|| id ==="TISU1"|| id ==="XEeeB"){
    //     e.click()
    // }
    if(FOURLETTER.indexOf(idvals.substring(0,4))>=0 || FOURLETTER.indexOf(idvals.substring(1))>=0){
        e.click()
        textEggId = createTextElement(id, 'yellow');
    }

    if(FIVELETTER.includes(idvals) || isNumeric(id)){
        e.click()
        textEggId = createTextElement(id, 'red');
    }
    e.appendChild(textEggId);
}

function ShowEggLineage() {
    const id = parseEggId(this.href);
    if (id === undefined) {
        return;
    }
    document.querySelector('.adsbygoogle').innerHTML =
        `<iframe
            src="https://dragcave.net/lineage/${id}" 
            display="block" width="100%" height="100%"
            frameborder="0"
            scrolling="yes""
        >
        </iframe>'`;
}

function HideEggId(e) {
    try {
        e.removeChild(textEggId);
    } catch {
    }
}

function parseEggId(url) {
    let u = new URL(url)
    return u.pathname.split('/')[2];
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



