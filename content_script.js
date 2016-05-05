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
	
	return newAnchor;
}

function addLinksToDocument()
{
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
}

// Check for tag before adding links to prevent adding them multiple times
var wasHereTag = document.getElementById("sullygnomehelperwashere");
if (wasHereTag == null)
{
	addLinksToDocument();
	var newWasHereTag = document.createElement("DIV");
	newWasHereTag.id = "sullygnomehelperwashere";
	document.body.appendChild(newWasHereTag);
}