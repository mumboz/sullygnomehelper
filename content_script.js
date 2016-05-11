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
	iconElement.src = chrome.extension.getURL("icon-19.png");
	iconElement.alt = "Show on SullyGnome.com";
	iconElement.title = "Show on SullyGnome.com";
	
	var newAnchor = document.createElement("A");
	newAnchor.appendChild(iconElement);
	newAnchor.href = url;
	newAnchor.target = "_blank";
	newAnchor.className = "sullygnomehelperlink";
	
	return newAnchor;
}

function addLinksToDocument()
{
	// Handle Channel pages
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
			appendAfter(createLink("http://sullygnome.com/Channel/" + chanName), chanNameElem);
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
	
	// Handle Directory pages
	var jqTitleElement = $(".directory_header").find(".title");
	if (jqTitleElement.length > 0)
	{
		var gameName = jqTitleElement.get(0).childNodes[1].data;
		jqTitleElement.append(createLink("http://sullygnome.com/Game/" + gameName));
	}
	
	/*var directoryHeaderElements = document.getElementsByClassName("directory_header");
	for (var i = 0; i < directoryHeaderElements.length; ++i)
	{
		var titleElements = directoryHeaderElements[i].getElementsByClassName("title");
		for (var j = 0; j < titleElements.length; ++j)
		{
			var gameName = titleElements[j].childNodes[1].data;
			titleElements[j].appendChild(createLink("http://sullygnome.com/Game/" + gameName));
		}
	}*/
}

// Check for tag before adding links to prevent adding them multiple times
var existingLinks = document.getElementsByClassName("sullygnomehelperlink");
if (existingLinks.length == 0)
{
	addLinksToDocument();
}