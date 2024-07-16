import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main(){
    const nodeArgLen = argv.length
    if (nodeArgLen < 3) {
        console.log('provide a base URL')
        return 
    } else if (nodeArgLen > 3) {
        console.log('only one link accepted.')
        return 
    }
    const baseURL = argv[2]

    console.log('starting Webcrawler')
    console.log(`baseURL: ${baseURL}`)

    const pages = await crawlPage(baseURL)

    printReport(pages)
}

main()
