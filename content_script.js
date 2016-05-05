function appendAfter(newNode, target)
{
	var sibling = target.nextSibling;
	if (sibling != null)
	{
		target.parentNode.insertBefore(newNode, sibling);
	}
	else
	{
		target.parentNode.appendChild(newNode);
	}
}


function createLink(url)
{
	var iconElement = document.createElement("IMG");
	iconElement.src = chrome.extension.getURL("icon.png");
	iconElement.alt = "Show on SullyGnome.com";
	iconElement.title = "Show on SullyGnome.com";
	
	var newAnchor = document.createElement("A");
	newAnchor.appendChild(iconElement);
	newAnchor.href = url;
	newAnchor.target = "_blank";	
	
	return newAnchor;
}

var uri = document.documentURI;


/*var channelNames = document.getElementsByClassName("channel-name");
for (var i = 0; i < channelNames.length; ++i)
{	
	var chanName = channelNames[i].text;
	
	var newAnchor = document.createElement("A");
	newAnchor.appendChild(iconElement);
	newAnchor.href = "http://sullygnome.com/Channel/" + chanName;
	newAnchor.target = "_blank";	
	
	var sibling = channelNames[i].nextSibling;
	if (sibling != null)
	{
		channelNames[i].parentNode.insertBefore(newAnchor, sibling);
	}
	else
	{
		channelNames[i].parentNode.appendChild(newAnchor);
	}
}*/



var channelElements = document.getElementsByClassName("channel");

for (var i = 0; i < channelElements.length; ++i)
{
	var channelElement = channelElements[i];

	// Get "channel-name" divs and insert link to channel stats
	var channelNameElements = channelElement.getElementsByClassName("channel-name");
	for (var j = 0; j < channelNameElements.length; ++j)
	{	
		var chanNameElem = channelNameElements[j];
		var chanName = chanNameElem.text;
		console.log("Channel name: " + chanName);
		
		
		appendAfter(createLink("http://sullygnome.com/Channel/" + chanName), chanNameElem);
		
		/*var sibling = chanNameElem.nextSibling;
		if (sibling != null)
		{
			chanNameElem.parentNode.insertBefore(newAnchor, sibling);
		}
		else
		{
			chanNameElem.parentNode.appendChild(newAnchor);
		}*/
	}
	
	// Look for game links and insert link to game stats
	for (var j = 0; j < channelElement.children.length; ++j)
	{
		var child = channelElement.children[j];
		if (child.nodeName == "A")
		{
			if (child.href.includes("/directory/game/"))
			{
				var gameName = child.text;
				
				appendAfter(createLink("http://sullygnome.com/Game/" + gameName), child);
			}
		}
	}
}


/*if (uri.includes("www.twitch.tv/directory/game/"))
{
	var gameName = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
	var newURL = "http://sullygnome.com/Game/" + gameName;
	window.open(newURL);
}
else if (uri.includes("https://www.twitch.tv/"))
{
	var channelName = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
	var newURL = "http://sullygnome.com/Channel/" + channelName;
	window.open(newURL);
}*/
