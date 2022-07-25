function reddenPage() {
    document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
   if(tab.url.includes("http://") || tab.url.includes("https://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: reddenPage
        });
   }
});
