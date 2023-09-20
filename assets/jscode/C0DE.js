const buttons = [
        ['state(1)','state(10)','state(0)','state(2)','state(1)','state(3)','state(2)','state(4)','state(3)','state(5)', 'state(4)', 'verify()','confirmacion("Si", "No")','confirmacion("Si", "Si")','back()','download(0)','download(1)','state(0)'],
        ['state(1)','state(11)','state(0)','state(2)','state(1)','state(3)','state(2)','state(4)', 'state(3)', 'skip_pass()','state(4)','verify()','confirmacion("Si", "No")','confirmacion("Si", "Si")','back()','download(0)','download(1)','state(0)']
];

let slide = {
    0: '#zero',
    1: '#one',
    2: '#two',
    3: '#three',
    4: '#four',
    5: '#five',
    9: '#nine',
    10: '#ten',
    11: '#eleven'
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function read_data(){

    await sleep(1000);

    const 
            url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            NAME = url_params.get("NAME");

    let 
        response,
        data;

    try{
        response = await fetch("assets/jscode/pass.json");
        console.log(response.status);
        data = await response.json();
        data = data['invitados'][NAME];
    }catch(e){
        console.error(e);
        console.log(response.status);
    }

    return data;

}

async function render_content() {

    const data = await read_data();

    const 
            url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            debug = url_params.get("debug");

    if(debug){
        console.log(data);
    }

    if(data['registro']){
        document.querySelector('#zero').classList.remove('active');
        document.querySelector('#zero').classList.add('hidden');
        document.querySelector('#ten').classList.remove('hidden');
        document.querySelector('#ten').classList.add('active');
    }

    if(data['pases'] <= 1){
        document.querySelector('#b0').innerHTML = 'Asistiré';
        document.querySelector('#b1').innerHTML = 'No podré'
        document.querySelector('#b12').innerHTML = 'No iré';
        document.querySelector('#b13').innerHTML = 'Asistiré';
        document.querySelector('#input').value = 1;
    }

    if(data['cena']){
        document.querySelector('#b16').classList.remove('hidden');
    }

    document.querySelector(".selector").innerHTML = ("¡Tienes " + data['pases'] + " pases!");
    document.querySelector("#input").setAttribute("maxlength", data['pases']);

}

function disableMenu(){
    str = ["#b",""];
    for(let i = 0; i < 18; i++){
        str[1] = str[0].concat(i.toString());
        document.querySelector(str[1]).style.backgroundColor = 'grey';
        document.querySelector(str[1]).removeAttribute("onclick");
    }
}

async function enableMenu(){
    str = ["#b",""];
    data = await read_data();
    for(let i = 0; i < 18; i++){
        str[1] = str[0].concat(i.toString());
        if(data['pases'] > 1){
            document.querySelector(str[1]).setAttribute("onclick", buttons[0][i]);
        }else{
            document.querySelector(str[1]).setAttribute("onclick", buttons[1][i]);
        }
        document.querySelector(str[1]).style.backgroundColor = '#14b4cc';
    }
}

async function state(id){

    disableMenu();
    document.querySelector(".active").style.animation = "out 1s";
    await sleep(900);
    document.querySelector(".active").removeAttribute("style");
    document.querySelector(".active").setAttribute("class", "subcontainer hidden");

    document.querySelector(slide[id]).style.animation = "in 1s";
    document.querySelector(slide[id]).setAttribute("class",   "subcontainer active");
    await sleep(950);
    enableMenu();
    document.querySelector(slide[id]).removeAttribute("style");
}

async function send(value, response1, response2){

    const 
        url_values = window.location.search,
        url_params = new URLSearchParams(url_values);

    let 
        NAME = url_params.get("NAME"),
        debug = url_params.get("debug");

    let mail = {
        inv: NAME,
        pases: value,
        confirm: response1,
        cena: response2
    };

    
    if(debug){

        console.log(mail);

    }else{
        emailjs.send('default_service', 'template_wrtytgg', mail, 'aoHKedVynHDdrywaD').then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }
}

async function changeBG(type){
    let BG = document.querySelector('.bg');

    BG.style.animation = "out 1s";
    BG1 = 
    await sleep(900);
    switch(type){
        case 0:
            BG.style.background = 'url("https://i.ibb.co/714LMZB/restaurante.png")';
            document.querySelector('#bg1').classList.add('hidden');
            document.querySelector('#bg2').classList.remove('hidden');
            break;
        case 1:
            BG.style.background = 'url("https://i.ibb.co/fYBftqv/jardin.png")';
            document.querySelector('#bg2').classList.add('hidden');
            document.querySelector('#bg1').classList.remove('hidden');
            break;
    }
    BG.style.animation = "in 1s";
}

async function verify(){

    const data = await read_data();

    if(document.querySelector('#five').classList.contains('active')){
        if(document.querySelector('#input').value <= data['pases'] && document.querySelector('#input').value > 0){

            if(data['cena']){
                state(9)
                changeBG(0);
            }else{
                console.log('NO APLICA CENA');
                confirmacion('Si', 'NO APLICA');
            }
        }else if(document.querySelector('#input').value > data['pases']){
            console.log("TOO MUCH PEOPLE");
            alert("Lo siento no disponen de tantos pases\nTen en cuenta que uno de los pases es para ti mismo.");
        }else if(document.querySelector('#input').value < 1 || document.querySelector('#input').value === NULL){
            console.log("NULL");
            alert("Antes de continuar debes confirmar cuantas personas asistiran\nTen en cuenta que uno de los pases es para ti mismo.");
        }
    }

}

async function back(){
    const data = await read_data();

    if(data['pases'] > 1){
        state(5);
    }else{
        state(4);
    }
    changeBG(1);
}

async function skip_pass(){

    data = await read_data();

    if(data['cena']){
        state(9)
        changeBG(0);
    }else{
        console.log('NO APLICA CENA');
        confirmacion('Si', 'NO APLICA');
    }

}

function confirmacion(response1, response2){

    send(document.querySelector('#input').value, response1, response2);
    state(10);
}

function download(type){

    let source;

    switch(type){
        case 0:
            source = 'https://i.ibb.co/3WJHM4q/inv.png';
            break;
        case 1:
            source = 'https://i.ibb.co/6RF4y69/inv2.png';
            break;
    }

    let a = document.createElement('a');

    a.download = true;
    a.target = '_blank';
    a.href= source;

    a.click();
}

if(screen.width > screen.height) {
    style.setAttribute("href", "assets/css/PC.css");
    console.log('PC')
}else{
    style.setAttribute("href", "assets/css/Mobile.css");
    console.log('Mobile')
}

render_content();

