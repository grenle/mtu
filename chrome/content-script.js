chrome.runtime.onMessage.addListener(dispatchMsg);

function dispatchMsg(request, sender, sendResponse){
    if(request.action === 'copy'){
        copy(request.payload)
    }
}

function copy(text){
    navigator.clipboard.writeText(text)
}
