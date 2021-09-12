async function getCurrentTab(){
    const opts = {
        active: true,
        currentWindow: true
    }
    const tabs = await browser.tabs.query(opts)
    const [ tab ] = tabs
    if(tab){
        const { id, title, url } = tab
        return { id, title, url }
    }
    else{
        throw 'no tab found'
    }
}

browser.commands.onCommand.addListener(dispatchCommands)

async function dispatchCommands(command){
    if(command === 'copy-pair'){
        const tabInfo = await getCurrentTab()
        const { id, title, url } = tabInfo
        const command = 'copy'
        const payload = `[${title}](${url})`
        const msg = { command, payload }
        browser.tabs.sendMessage(id, msg)
    }
}

