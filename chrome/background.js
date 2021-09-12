const iconUrl = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="

function getCurrentTab(){
    return new Promise((resolve, reject) => {
        tabQueryOpts = { active: true, currentWindow: true }
        chrome.tabs.query(tabQueryOpts, tabs => {
            const [ tab ] = tabs
            tabs ? resolve(tab) : reject ('no active tab in current window')
        })
    })
}

function getTitleAndUrl(tab){
    let { title, url } = tab
    if(!title){
        throw 'no title in Tab instance'
    }
    if(!url){
        throw 'no url in Tab instance'
    }
    return { title, url }
}

function formatMarkdownLink({title, url}){
    return `[${title}](${url})`
}

function copyToCliboard(text){
    pastabox = document.querySelector('#pastabox')
    pastabox.value = text
    pastabox.select()
    document.execCommand('copy')
}

async function copyPair(){
    try{
        const currentTab = await getCurrentTab()
        const titleAndUrl = getTitleAndUrl(currentTab)
        const markdownLink = formatMarkdownLink(titleAndUrl)
        copyToCliboard(markdownLink)
        const options = {
            type: "basic",
            title: "mtu",
            message: "Success: copied [title](url)",
            iconUrl
        }
        chrome.notifications.create('', options)
    }
    catch(e){
        const options = {
            type: 'basic',
            title: 'matu error',
            message: `mtu extension error: ${e}`,
            iconUrl
        }
        chrome.notifications.create('', options)
    }
}

chrome.commands.onCommand.addListener(async command => {
    if(command === 'copy-pair'){
        copyPair()
    }
})
