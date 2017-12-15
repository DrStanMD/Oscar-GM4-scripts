// ==UserScript==
// @name           SendAndArchive
// @namespace      oscar
// @include        */oscarMessenger/HandleMessages.do
// ==/UserScript==

var theLink=document.referrer;
var theLinkComponents=theLink.split('?');
var theQueryComponents=theLinkComponents[1].split('&');
for (var theQueryComponent of theQueryComponents){
	var theKeyValue=theQueryComponent.split('=');
	if(theKeyValue[0]=='messageID'){
		var theArchiveLink=theLinkComponents[0].substring(0,theLinkComponents[0].lastIndexOf('/'))+'/DisplayMessages.do?btnDelete=archive&messageNo='+theKeyValue[1];
	}
}
var theButton = document.createElement('input');
theButton.setAttribute('type',"button");
theButton.setAttribute('value',"Send & Archive");
theButton.setAttribute('class',"ControlPushButton");
theButton.onclick = function(){
	var request = new XMLHttpRequest();
	request.open('GET', theArchiveLink, false);
	request.send();
	document.forms[0].submit();
};
document.getElementsByTagName('input')[0].parentNode.appendChild(theButton);