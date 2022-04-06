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


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function labelRarity(element, key, toClick) {
	if (RARITY[key] != undefined) {
		switch (RARITY[key].rarity) {
			case 'Uncommon':    element.style = 'background-color:'+SILVER; break;
			case 'Rare':        element.style = 'background-color:'+GOLD; break;
			case 'Mythic Rare': 
                element.style = 'background-color:'+RED; 
                toClick.click()
                break;
		}
	}
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
        // ShowEggId(spanElement,RARITY['e11.png'].rarity)
        labelRarity(spanElement,response.result.src.split("images/")[1], imgElement)
    }
}

// ※functions
function ShowEggId(e) {
    const id = parseEggId(e.href);
    if (id === undefined) {
        return;
    }
    let textEggId = createTextElement(id);
    let idvals = id.replace("0", "o").toLowerCase()
    if(FOURLETTER.indexOf(idvals.substring(0,3))>=0 || FOURLETTER.indexOf(idvals.substring(1))>=0){
        textEggId = createTextElement(id, 'yellow');
    }
    // if(FOURLETTER.inlcudes(val2)){
    //     textEggId = createTextElement(id, 'yellow');
    // }
    if(FIVELETTER.includes(idvals) || isNumeric(id)){
        e.click()
        textEggId = createTextElement(id, 'red');
    }
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
