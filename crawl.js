import { JSDOM } from 'jsdom';


function normalizeURL(url){
    const urlObj = new URL(url)
    let path = `${urlObj.hostname}${urlObj.pathname}`
    if (path.slice(-1) === '/') {
        path = path.slice(0, -1)
    }
    return path
}


function getURLsFromHTML(htmlBody, baseURL){
    const htmldom = new JSDOM(htmlBody)
    const anchors = htmldom.window.document.querySelectorAll('a')
    let links = []
    for (const node of anchors) {
        if (node.hasAttribute('href')) {
            try {
                links.push(new URL(node.href, baseURL).href)
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    return links
}

async function parseHTML(url) {
    let response
    try {
        response = await fetch(url)
    } catch (err) {
        throw new Error(`fetch error: ${err.message}`)
    }

    if (response.status > 399) {
        throw new Error(`status code: ${response.status}`)
    }

    const header = response.headers.get('content-type')
    if (!header || !header.includes('text/html')) {
        throw new Error(`content type is not text/html: ${header}`)
    }

    return response.text()
}


async function crawlPage(baseURL, currentURL = baseURL, pages = {}){
    const normalCurrentURL = normalizeURL(currentURL)
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    if (pages[normalCurrentURL] > 0) {
        pages[normalCurrentURL]++
        return pages
    }
    pages[normalCurrentURL] = 1


    let html
    try {
        html = await parseHTML(currentURL)
    } catch (err) {
        console.log(err.message)
        return pages
    }


    const links = await getURLsFromHTML(html, baseURL)
    for (const link of links) {
        pages = await crawlPage(baseURL, link, pages);
    }
    return pages
}


export { normalizeURL, getURLsFromHTML, crawlPage };
