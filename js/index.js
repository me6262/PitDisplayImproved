var num_images = 0


async function move_carousel_to(posX) {
    let carousel = document.getElementById("imgs")    
    var startVal = carousel.scrollLeft 
    let duration = 0.5//seconds
    var current = 0
    var change = posX + startVal
    console.log(current + " | " + startVal + " | " + posX + " | " + duration)
    while (current <= duration) {
        
        carousel.scrollLeft = easeInOutQuad(current, startVal, posX, duration)
        console.log(current + " | " + carousel.scrollLeft + " | " + posX + " | " + duration)
        await sleep(30)
        current += 0.03

    }
    current = 0

    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}


async function carousel_right() {
    var imgs = document.querySelector("#imgs")
    if (imgs.scrollLeft + (imgs.scrollLeftMax / (num_images - 1)) <= imgs.scrollLeftMax) {
        move_carousel_to(imgs.scrollLeftMax / (num_images - 1))
    } else {
        move_carousel_to(-imgs.scrollLeft)
    }
    
}

async function carousel_left() {
    var imgs = document.querySelector("#imgs")
    if (imgs.scrollLeft - 400 >= 0) {
        move_carousel_to(-(imgs.scrollLeftMax/num_images))
    } else {
        move_carousel_to(imgs.scrollLeft)
    }
} 

async function image_list() {
    var p = await fetch("./images")
    var j = await p.json()
    console.log(j["names"])
    num_images = j["names"].length
    j["names"].forEach((h) => {

        var div = document.createElement("div")
        var img = document.createElement("img")
        div.classList.add("bot-img-div")

        img.classList.add("bot-img")
        img.src = "./images/" + h
        div.appendChild(img)
        document.getElementById("imgs").appendChild(div) 
    })
}
image_list()

