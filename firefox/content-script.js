browser.runtime.onMessage.addListener(onMessage)

function onMessage({command, payload}){
    if(command === 'copy'){
        navigator.clipboard.writeText(payload)
    }
}
