function tabHasTwitchUrl(tab)
{
	var url = tab.url;
	return url && url.includes("www.twitch.tv");
}

chrome.browserAction.onClicked.addListener(function (tab)
{
	chrome.tabs.executeScript(null, {file: "browser_action_clicked.js"});  
})


chrome.tabs.onActivated.addListener( function (activeInfo) 
{
	chrome.tabs.get(activeInfo.tabId, function (tab)
	{
		if (tabHasTwitchUrl(tab))
		{
			chrome.browserAction.enable();
		}
		else
		{
			chrome.browserAction.disable();
		}
	})
})


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) 
{
	if (tabHasTwitchUrl(tab) && changeInfo.status == 'complete')
	{
		chrome.tabs.executeScript(null, {file: "content_script.js"});
	}
})