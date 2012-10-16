// ==UserScript==
//
// @name           Teamliquid - Hide images by new users
// @description    Hides posts by new users
// @namespace      Yoshi-
// @author         Yoshi-
// @version        0.2
// @include        http://www.teamliquid.net/forum/viewmessage.php*
// @run-at         document-end
//
// ==/UserScript==
var forumInfos = document.getElementsByClassName('forummsginfo');
var forumPosts = document.getElementsByClassName('forumPost');
var patternPosts = /Posts (\d+)/;
var image = "http://i.imgur.com/kxwFW.png";

document.getElementsByClassName('top_menu left')[0].innerHTML+="<div><a href='#' id='postcountsetting'>Postcount Setting</a></div>";

function setPostcount() {
    GM_setValue('postcount', prompt('Maxinum Postcount to hide? 0=deactivate', GM_getValue('postcount')));
}


function showImage(k,i) {
	forumPosts[i].childNodes[k].src = forumPosts[i].childNodes[k].oldsrc;
}

function replaceImage(i, nodes) {
	if(nodes == undefined) nodes = forumPosts[i].childNodes
	for(k in nodes) {
		if(isNaN(k)) continue;
		if(nodes[k].tagName == "IMG") {
			nodes[k].setAttribute('oldsrc', nodes[k].src);
			nodes[k].src = image;
			nodes[k].setAttribute('onclick', 'this.src=this.getAttribute(\'oldsrc\');return false;');
		}
		else {
			if(nodes[k].hasChildNodes()) {
				replaceImage(i, nodes[k].childNodes);
			}
		}
	}
}

h=0;
while(h<(forumInfos.length-1)) {
    if(undefined !== forumInfos[h].innerHTML) {
        forumPostInfo = forumInfos[h].innerHTML;
		posts = forumPostInfo.match(patternPosts);
		if(posts[1] < GM_getValue('postcount')) {
			replaceImage(h);
		}
    }
	h++;
}

if(GM_getValue('postcount') == undefined) {
    setPostcount();
}


ps = document.getElementById('postcountsetting');
ps.addEventListener('click', setPostcount, false);