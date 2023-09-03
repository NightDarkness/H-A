function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reload_content() {

        const url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            style = document.querySelector("#style"),
            title = document.querySelector("title"),
            body = document.querySelector("body"),
            video = document.querySelector("video"),
            cardBG = document.querySelector(".container"),
            QR = document.querySelector(".QR"),
            vSource = document.querySelector("source"),
            profile = document.querySelector("#profile > img"),
            name = document.querySelector("#name span"),
            profession = document.querySelector("#profession span"),

            img = new Array(
                document.querySelector("#first img"),
                document.querySelector("#second img"),
                document.querySelector("#third img")
            ),

            link = new Array(
                document.querySelector("#first a"),
                document.querySelector("#second a"),
                document.querySelector("#third a")
            ),

            footer = document.querySelector("#text span");

        let id = url_params.get("id"),
            data,
            blur;

        const response = await fetch("/assets/id/" + id + "/metainfo.json")

        data = await response.json();

        if(data[id]['video'] !== "none"){
            video.removeAttribute("class");
            video.pause();
            vSource.setAttribute("src", "assets/media/" + data[id]['video']);
            video.load();
            video.play();
        }else if(data[id]['background'] !== "none"){
            body.style.backgroundImage = "url(assets/media/" + data[id]['background'] + ")";
        }
        
        style.setAttribute("href", "assets/css/" + data[id]['style']);
        title.innerText = data[id]['name'] + " " + data[id]['last_name'];

        if(data[id]['texture'] !== "none"){
            cardBG.style.backgroundImage = "url(assets/img/textures/" + data[id]['texture'] + ")";
        }

        if(data[id]['QR'] == 'True'){
            QR.setAttribute("src", "assets/id/" + id + "/qr.png");
        }

        profile.setAttribute("src", "assets/id/" + id + "/profile.png");
        profile.setAttribute("alt", data[id]['name'] + " " + data[id]['last_name']);
        profile.setAttribute("title", data[id]['name'] + " " + data[id]['last_name']);
        
        name.innerHTML = data[id]['name'] + " " + data[id]['last_name'];
        name.style.fontSize = data[id]['font-size']['name'];
        profession.innerText = data[id]['profession'];
        profession.style.fontSize = data[id]['font-size']['profession'];

        for(let i = 0; i < 3; i++) {
            img[i].setAttribute("src", "assets/img/" + data[id]['bubbles']['bubble_' + i.toString()]['img']);
            img[i].setAttribute("alt", data[id]['bubbles']['bubble_' + i.toString()]['alt']);
            img[i].setAttribute("title", data[id]['bubbles']['bubble_' + i.toString()]['title']);
            link[i].setAttribute("href", data[id]['bubbles']['bubble_' + i.toString()]['data']);
        }

        footer.innerText = data[id]['alias'];
        footer.style.fontSize = data[id]['font-size']['alias'];

}

reload_content();
