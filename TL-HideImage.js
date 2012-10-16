// ==UserScript==
// @name           Teamliquid - Hide images by new users
// @version        1.0
// @namespace      Yoshi-
// @author         Yoshi-
// @description    Hides images by new users
// @include        http://www.teamliquid.net/forum/viewmessage.php*
// ==/UserScript==


var forumInfos = document.getElementsByClassName('forummsginfo');
var forumPosts = document.getElementsByClassName('forumPost');
var patternPosts = /Posts (\d+)/;
var image = "http://i.imgur.com/kxwFW.png";

function showImage(k,i) {
	forumPosts[i].childNodes[k].src = forumPosts[i].childNodes[k].oldsrc;
}
function findImage(i) {

	for(k in forumPosts[i].childNodes) {
		if(forumPosts[i].childNodes[k].tagName == "IMG") {
			forumPosts[i].childNodes[k].setAttribute('oldsrc', forumPosts[i].childNodes[k].src);
			forumPosts[i].childNodes[k].src = image;
			forumPosts[i].childNodes[k].setAttribute('onclick', 'this.src=this.getAttribute(\'oldsrc\');');
		}
	}
}

for (var i=0;i<(forumInfos.length-1);i++) {
    if(undefined !== forumInfos[i].innerHTML) {
        forumPostInfo = forumInfos[i].innerHTML;
		posts = forumPostInfo.match(patternPosts);
		if(posts[1] < GM_getValue('postcount')) {
			findImage(i);
		}
    }
}

if(GM_getValue('postcount') == undefined) {
    GM_setValue('postcount', prompt('Maxinum Postcount to hide? 0=deactivate', GM_getValue('postcount')));
}
document.onkeydown= function(key){ reactKey(key); }

function reactKey(evt) {
   if(evt.keyCode== 39) {
      GM_setValue('postcount', prompt('Maxinum Postcount to hide? 0=deactivate', GM_getValue('postcount')));
   }
}

