function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reload_content() {

        const 
            url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            style = document.querySelector("#style"),
            card = document.querySelector(".subcontainer");

        let NAME = url_params.get("NAME");

        if(screen.width > screen.height) {
            style.setAttribute("href", "assets/css/PC.css");
            console.log('PC')
        }else{
            style.setAttribute("href", "assets/css/Mobile.css");
            console.log('Mobile')
        }

}

reload_content();
