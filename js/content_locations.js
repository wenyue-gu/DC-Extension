// ※init
// let textEggId = createTextElement('<egg_id>');
ShowOriginalEggs();

// ※functions
// Replace the hidden egg with the original one.
// window.addEventListener('load',)
function ShowOriginalEggs() {
    if (document.querySelector('.eggs') === null) {
        return;
    }
    const eggs = [...document.querySelector('.eggs').children];


    eggs.forEach(e => {
        let d = e.getElementsByTagName('span')[0];
        let i = e.getElementsByTagName('img')[0];
        let a = e.getElementsByTagName('a')[0];
        ShowEggId(a)
        chrome.runtime.sendMessage(
            {method: 'GetEggByDescription', params: [d.innerText]},
            rs => {handleGetEggByDescriptionResponse(rs, i, d);}
        );
    });
}

function handleGetEggByDescriptionResponse(response, imgElement, spanElement) {
    if (response.error !== '') {
        console.log(response);
        return;
    }
    if (response.result.src !== '') {
        imgElement.src = response.result.src;
        imgElement.removeAttribute('width');
        imgElement.removeAttribute('height');
        // imgElement.style.border = "10px solid blue";
    }
}

// ※functions
function ShowEggId(e) {
    const id = parseEggId(e.href);
    if (id === undefined) {
        return;
    }
    let textEggId = createTextElement(id);
    e.appendChild(textEggId);
}

// function HideEggId() {
//     try {
//         this.removeChild(textEggId);
//     } catch {
//     }
// }

function parseEggId(url) {
    let u = new URL(url)
    return u.pathname.split('/')[2];
}

function createTextElement(value = '') {
    let e;
    e = document.createElement('span');
    e.innerText = value;
    e.style.relative = 'absolute';
    e.style.backgroundColor = '#ffffb3';
    return e;
}
