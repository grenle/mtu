chrome.commands.onCommand.addListener((command, tab) => {
    if(command === 'copy-pair'){
        copyPair(tab)
    }
})

function copyPair(tab){
    console.log(tab)
    const { title, url } = tab
    const action = 'copy'
    const payload = `[${title}](${url})`
    const msg = { action, payload } 
    chrome.tabs.sendMessage(tab.id, msg)
}
