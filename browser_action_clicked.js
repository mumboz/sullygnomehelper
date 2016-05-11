var uri = document.documentURI;
var newURL = "http://sullygnome.com";


if (uri.includes("www.twitch.tv/directory/game/"))
{
	var gameName = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
	newURL += "/Game/" + gameName;
}
else if (uri.includes("https://www.twitch.tv/"))
{
 	var channelName = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
	if (channelName.length > 0)
	{
		newURL += "/Channel/" + channelName;
	}
}

 window.open(newURL);