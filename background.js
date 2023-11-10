let lastUrl = "";
const checkForYoutubeLink = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        let currentTab = tabs[0]; // there will be only one in this array
        let url = currentTab.url;
        const youtubeRegex = new RegExp(
            "^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+"
        );
        console.log(url);
        if (youtubeRegex.test(url) && url !== lastUrl) {
            lastUrl = url;
            setTimeout(() => {
                chrome.tabs.goBack(currentTab.id, () => {
                    setTimeout(() => {
                        chrome.tabs.goForward(currentTab.id);
                    }, 100);
                });
            }, 1000);
        }
    });
};

// Handle new tab creation idk how to do this

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        setTimeout(() => {
            checkForYoutubeLink();
        }, 2000);
    }
});
