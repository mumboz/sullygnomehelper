function tabHasTwitchUrl(tab)
{
	var url = tab.url;
	return url && url.includes("www.twitch.tv");
}

chrome.browserAction.onClicked.addListener(function (tab)
{
	chrome.tabs.executeScript(null, {file: "browser_action_clicked.js"});  
});


chrome.tabs.onActivated.addListener( function (activeInfo) 
{
	chrome.tabs.get(activeInfo.tabId, function (tab)
	{
		if (tabHasTwitchUrl(tab))
		{
			chrome.browserAction.enable();
			chrome.tabs.executeScript(activeInfo.tabId, {file: "jquery-2.2.3.min.js"});
			chrome.tabs.executeScript(activeInfo.tabId, {file: "content_script.js"});
		}
		else
		{
			chrome.browserAction.disable();
		}
	});
});


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) 
{
	if (tabHasTwitchUrl(tab) && changeInfo.status == 'complete')
	{
		chrome.tabs.executeScript(tabId, {file: "jquery-2.2.3.min.js"});
		chrome.tabs.executeScript(tabId, {file: "content_script.js"});
	}
});