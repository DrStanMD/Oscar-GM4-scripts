// ==UserScript==
// @name        LabResultEmailer
// @namespace   http://dev.drbillylin.com/oscarwiki
// @description Puts Email and Text buttons to Lab Report
// @include     */lab/CA/ALL/labDisplay.jsp*
// @version     4.2
// @grant       none
// @updateURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/LabResultEmailer.meta.js
// @downloadURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/LabResultEmailer.user.js
// ==/UserScript==

// READ ME
// 1. emailtextengine.js IS REQUIRED IN THE OSCAR IMAGE DIRECTORY FOR THE EMAIL AND TEXT BUTTONS TO WORK
// 2. Do NOT change the first chunk of code that puts emailtextengine.js in the <head> section
// 3. Use "EmailButton", "TextButton", and "ConsentButton" as the ID's for the 3 buttons

// THIS PUTS THE emailtextengine.js IMAGE IN THE <HEAD> SECTION, WHICH ALLOWS FOR THE sendEmail(subject, body), sendText(body), and openForm() FUNCTIONS
var head = document.getElementsByTagName("head")[0];
var script = document.createElement('script');
script.type = 'text/javascript';
var pathArray = window.location.pathname.split( '/' );
var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/displayImage.do?imagefile=emailtextengine.js";
script.src = newURL; 
head.appendChild(script);

window.addEventListener("load",function(){
	
	var destination = document.getElementsByClassName("MainTableBottomRowRightColumn")[0].children[0].children[0].children[0];

	var openButton = document.createElement("input");
	openButton.type = "button";
	openButton.value = "Open Email/Text";
	openButton.id = "openButton";
	openButton.onclick = function(){
		emailButton.style.display = "inline";
		textButton.style.display = "inline";
		consentButton.style.display = "inline";
		textArea.style.display = "inline";

		openButton.style.display = "none";
	};
	
	destination.appendChild(openButton);

	var emailButton = document.createElement("input");
	emailButton.type = "button";
	emailButton.value = "Email";
	emailButton.id = "EmailButton";
	emailButton.name = "EmailButton";
	emailButton.style.display = "none";
	emailButton.onclick = function(){
		var message = document.getElementById("MessageBox").value;
		sendEmail("Email from your Family Doctor", message);
	};

	var textButton = document.createElement("input");
	textButton.type = "button";
	textButton.value = "Text";
	textButton.id = "TextButton";
	textButton.name = "TextButton";
	textButton.style.display = "none";
	textButton.onclick = function(){
		var message = document.getElementById("MessageBox").value;
		sendText(message);
	};

	var consentButton = document.createElement("input");
	consentButton.type = "button";
	consentButton.value = "Update Consent";
	consentButton.id = "ConsentButton";
	consentButton.name = "ConsentButton";
	consentButton.style.display = "none";
	consentButton.onclick = function(){
		openConsentForm();
	};

	var textArea = document.createElement("textarea");
	textArea.id = "MessageBox";
	textArea.value = "Message to email or text";
	textArea.setAttribute("cols", "50");
	textArea.setAttribute("rows", "2");
	textArea.style.display = "none";
	textArea.onclick = function(){this.value="";};

	var newDestination = document.getElementById("acknowledgeForm");
	newDestination.appendChild(textArea);
	newDestination.appendChild(emailButton);
	newDestination.appendChild(textButton);
	newDestination.appendChild(consentButton);

}, false);


