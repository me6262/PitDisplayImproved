import { opendir } from 'node:fs/promises';

console.log("Hello via Bun!");
let img_list = await image_list()

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url)
        if (url.pathname === "/") return new Response(Bun.file("index.html"));
        if (url.pathname === "/images") return new Response(img_list)
        if (url.pathname === "css/style.css") return new Response(Bun.file("css/style.css"));
        if (url.pathname === "js/index.js") return new Response(Bun.file("js/index.js"));
        return new Response(Bun.file("."+url.pathname))
    },
});


async function image_list() {
    var names: Array<string> = []
    const dir = await opendir('./images')
    for await (const dirent of dir) {
        names.push('"' + dirent.name + '"')
    }
    console.log(names)
    console.log(`{"names": [${names}]}`)
    return `{"names": [${names}]}`
    
}

