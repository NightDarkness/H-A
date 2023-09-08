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


        document.querySelector(".selector").innerHTML = ("¡Tienes " + data['invitados'][NAME] + " pases!");
        document.querySelector("#input").setAttribute("maxlength", data['invitados'][NAME]);

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
    document.querySelector("#b1").setAttribute("onclick", "state(9)");
    document.querySelector("#b2").setAttribute("onclick", "state(0)");
    document.querySelector("#b3").setAttribute("onclick", "state(2)");
    document.querySelector("#b4").setAttribute("onclick", "state(1)");
    document.querySelector("#b5").setAttribute("onclick", "state(3)");
    document.querySelector("#b6").setAttribute("onclick", "state(2)");
    document.querySelector("#b7").setAttribute("onclick", "state(4)");
    document.querySelector("#b8").setAttribute("onclick", "state(3)");
    document.querySelector("#b9").setAttribute("onclick", "verify()");
    document.querySelector("#b10").setAttribute("onclick", "download()");
    document.querySelector("#b11").setAttribute("onclick", "state(0)");
    document.querySelector("#b12").setAttribute("onclick", "state(0)");
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

function send(NAME, value){

    let data = {
        form_name: NAME,
        message: value
    };

    emailjs.send('default_service', 'template_wrtytgg', data, 'aoHKedVynHDdrywaD')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
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
        if(document.querySelector('#input').value <= data['invitados'][NAME] && document.querySelector('#input').value > 0){
            state(9)
            send(NAME, document.querySelector('#input').value);
            console.log("200");
        }else if(document.querySelector('#input').value > data['invitados'][NAME]){
            console.log("TOO MUCH PEOPLE");
            alert("Lo siento no disponen de tantos pases");
        }else if(document.querySelector('#input').value <= 0 || document.querySelector('#input').value === NULL){
            console.log("NULL");
            alert("Antes de continuar debes confirmar cuantas personas asistiran");
        }
    }

}

function download(){
    let 
        source = 'assets/img/inv.png',
        a = document.createElement('a');

    a.download = true;
    a.target = '_blank';
    a.href= source;

    a.click();
}

reload_content();

