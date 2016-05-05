chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) 
{
	if (changeInfo.status == 'complete') 
	{
		chrome.tabs.executeScript(null, {file: "content_script.js"});  
	}
})