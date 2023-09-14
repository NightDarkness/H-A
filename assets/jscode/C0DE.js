function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reload_content() {

        const 
            url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            style = document.querySelector("#style");

        let 
            NAME = url_params.get("NAME"),
            response,
            data;

        if(screen.width > screen.height) {
            style.setAttribute("href", "assets/css/PC.css");
            console.log('PC')
        }else{
            style.setAttribute("href", "assets/css/Mobile.css");
            console.log('Mobile')
        }

        response = await fetch("assets/jscode/pass.json");

        if(response.status === 200) {
            data = await response.json();
            console.log("invitados: 200");
            console.log(data['invitados'][NAME]);
        }else{
            console.log("invitados: 404");
        }

        if(data['invitados'][NAME]['registro']){
            document.querySelector('#ten').setAttribute('class', 'subcontainer active');
        }else{
            document.querySelector('#zero').setAttribute('class', 'subcontainer active');
        }


        document.querySelector(".selector").innerHTML = ("¡Tienes " + data['invitados'][NAME]['pases'] + " pases!");
        document.querySelector("#input").setAttribute("maxlength", data['invitados'][NAME]['pases']);

        verify();

}

function disableMenu(){
    str = ["#b",""];
    for(let i = 0; i < 11; i++){
        str[1] = str[0].concat(i.toString());
        document.querySelector(str[1]).removeAttribute("onclick");
    }
}

function enableMenu(){
    document.querySelector("#b0").setAttribute("onclick", "state(1)");
    document.querySelector("#b1").setAttribute("onclick", "state(10)");
    document.querySelector("#b2").setAttribute("onclick", "state(0)");
    document.querySelector("#b3").setAttribute("onclick", "state(2)");
    document.querySelector("#b4").setAttribute("onclick", "state(1)");
    document.querySelector("#b5").setAttribute("onclick", "state(3)");
    document.querySelector("#b6").setAttribute("onclick", "state(2)");
    document.querySelector("#b7").setAttribute("onclick", "state(4)");
    document.querySelector("#b8").setAttribute("onclick", "state(3)");
    document.querySelector("#b9").setAttribute("onclick", "verify()");
    document.querySelector("#b10").setAttribute("onclick", "confirmacion('No')");
    document.querySelector("#b11").setAttribute("onclick", "confirmacion('Si')");
    document.querySelector("#b12").setAttribute("onclick", "back()");
    document.querySelector("#b13").setAttribute("onclick", "download(0)");
    document.querySelector("#b14").setAttribute("onclick", "download(1)");
    document.querySelector("#b15").setAttribute("onclick", "state(0)");
}

async function state(id){

    let state = "zero";

    disableMenu();
    document.querySelector(".active").style.animation = "out 1s";
    await sleep(900);
    document.querySelector(".active").removeAttribute("style");
    document.querySelector(".active").setAttribute("class", "subcontainer hidden");

    
    //document.querySelector(".active").classList.remove("active");

    switch(id){
        case 0:
            state = "#zero";
            break;
        case 1:
            state = "#one";
            break;
        case 2:
            state = "#two";
            break;
        case 3:
            state = "#three";
            break;
        case 4:
            state = "#four";
            break;
        case 9:
            state = "#nine";
            break;
        case 10:
            state = "#ten";
            break;
        default:
            state = "#zero";
    }

    document.querySelector(state).style.animation = "in 1s";
    document.querySelector(state).setAttribute("class",   "subcontainer active");
    enableMenu();
    await sleep(950);
    document.querySelector(state).removeAttribute("style");
}

function msg(){
    let url = 'whatsapp://send?text="Hola"&phone="+encodeURIComponent(+526564425349)'
    window.open(url);
}

async function send(value, confirmacion){

    const 
        url_values = window.location.search,
        url_params = new URLSearchParams(url_values);

    let NAME = url_params.get("NAME");

    let mail = {
        from_name: NAME,
        message: 'Hola Hiram y Angelica, confirmo que asistire a la ceremonio y recepcion utilizando ' + value + ' pases y ' + confirmacion + ' asistire a la cena.',
        pases: value,
        cena: confirmacion
    };

    emailjs.send('default_service', 'template_wrtytgg', mail, 'aoHKedVynHDdrywaD')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

async function changeBG(type){
    let BG = document.querySelector('.bg');

    BG.style.animation = "out 1s";
    BG1 = 
    await sleep(900);
    switch(type){
        case 0:
            BG.style.background = 'url(assets/img/restaurante.png)';
            document.querySelector('#bg1').classList.add('hidden');
            document.querySelector('#bg2').classList.remove('hidden');
            break;
        case 1:
            BG.style.background = 'url(assets/img/jardin.png)';
            document.querySelector('#bg2').classList.add('hidden');
            document.querySelector('#bg1').classList.remove('hidden');
            break;
    }
    BG.style.animation = "in 1s";
}

async function verify(){

    const 
        url_values = window.location.search,
        url_params = new URLSearchParams(url_values);

    let 
        NAME = url_params.get("NAME"),
        response,
        data;
    
    response = await fetch("assets/jscode/pass.json");

    if(response.status === 200) {
        data = await response.json();
        console.log("invitados: 200");
        console.log(data['invitados'][NAME]);
    }else{
        console.log("invitados: 404");
    }

    if(document.querySelector('#four').classList.contains('active')){
        if(document.querySelector('#input').value <= data['invitados'][NAME]['pases'] && document.querySelector('#input').value > 0){
            state(9)
            changeBG(0);
            //send(NAME, document.querySelector('#input').value);
            console.log("200");
        }else if(document.querySelector('#input').value > data['invitados'][NAME]['pases']){
            console.log("TOO MUCH PEOPLE");
            alert("Lo siento no disponen de tantos pases");
        }else if(document.querySelector('#input').value <= 0 || document.querySelector('#input').value === NULL){
            console.log("NULL");
            alert("Antes de continuar debes confirmar cuantas personas asistiran");
        }
    }

}

function back(){
    state(4);
    changeBG(1);
}

function confirmacion(response){
    send(document.querySelector('#input').value, response);
    state(10);
}

function download(type){

    let source;

    switch(type){
        case 0:
            source = 'assets/img/inv.png';
            break;
        case 1:
            source = 'assets/img/inv2.png';
            break;
    }

    let a = document.createElement('a');

    a.download = true;
    a.target = '_blank';
    a.href= source;

    a.click();
}

reload_content();

