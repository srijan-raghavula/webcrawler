function printReport(pages) {
    console.log('Printing report:')

    const sortedPages = sortPages(pages)

    for (const page of sortedPages) {
        console.log(`${page[1]} internal links to ${page[0]}`)
    }
}

function sortPages(pages) {
    let array = Object.entries(pages).sort((a, b) => b[1] - a[1])

    return array
}

export { printReport }
