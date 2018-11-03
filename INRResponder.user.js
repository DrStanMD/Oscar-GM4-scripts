// ==UserScript==
// @name        INRResponder
// @namespace   http://dev.drbillylin.com/oscarwiki
// @description	Enables tickler-based INR management system including ENEngine-based email and texting
// @include     */lab/CA/ALL/labDisplay.jsp*
// @version     4.2
// @grant		none
// @author		Billy Lin
// @updateURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/INRResponder.meta.js
// @downloadURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/INRResponder.user.js
// ==/UserScript==

// THIS PUTS THE emailtextengine.js IMAGE IN THE <HEAD> SECTION, WHICH ALLOWS FOR THE sendEmail(subject, body), sendText(body), and openForm() FUNCTIONS
var head = document.getElementsByTagName("head")[0];
var script = document.createElement('script');
script.type = 'text/javascript';
var pathArray = window.location.pathname.split( '/' );
var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/displayImage.do?imagefile=emailtextengine.js";
script.src = newURL; 
head.appendChild(script);

window.addEventListener("load",function(){

	var tblDiscs = document.getElementById("tblDiscs");
	var preElements = document.getElementsByTagName("pre");
	var pretags;
	for(var i=0; i<preElements.length; i++){
		pretags+=preElements[i].innerHTML;
	}
	var demoNo;

	var messagesArray = [];
	var msgDatesArray = [];

	// global variables that should just be loaded once on initialization
	var cINR = "";			//current INR on this form
	var segmentID = "";		// this lab report's segment ID

	// check to see if there is actually an INR result in this lab form, continue with INRResponder if there is
	if(pretags!==null &&pretags.indexOf("INR")>-1){

		initialize();

		var table = document.createElement("table");
		table.name = "INRT table";

		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		var th2 = document.createElement("td");
		var th3 = document.createElement("td");
		th3.id = "INRResponder_inputs";

		var text1 = document.createTextNode("Current INR: ");

		// value of current INR
		var currentINR = document.createElement("span");
		currentINR.type = "text";
		currentINR.name = "INR";
		currentINR.id = "INR";
		currentINR.innerHTML = cINR;

		//follow up instruction
		var fup = document.createElement("input");
		fup.value = "Continue same Warfarin dose and repeat INR blood work in 4 weeks.";
		fup.style.width = "500px";
		fup.id = "fup";

		//the buttons
		//send a tickler for staff to call patient
		var ticklerButton = document.createElement("input");
		ticklerButton.type = "button";
		ticklerButton.value = "Tickler";
		ticklerButton.onclick = function(){
			sendTickler("INR: "+cINR+", Please call: "+document.getElementById("fup").value);
		};

		//send a tickler to staff to indicate the doctor has called the patient
		var doctorCallButton = document.createElement("input");
		doctorCallButton.type = "button";
		doctorCallButton.value = "Doctor called";
		doctorCallButton.onclick = function(){
			sendTickler("INR: "+cINR+", Doctor has called: "+document.getElementById("fup").value+" Please bill.");
		};

		var ticklerAckButton = document.createElement("input");
		ticklerAckButton.type = "button";
		ticklerAckButton.value = "Tickler+Ack";
		ticklerAckButton.onclick = function(){
			sendTickler("INR: "+cINR+", Please call: "+document.getElementById("fup").value);
			handleLab('acknowledgeForm', segmentID, 'ackLab');
		};

		//BillButton
		var billButton = document.createElement("input");
		billButton.type= 'button';
		billButton.name= 'BillButton';
		billButton.value='Bill INR';
		billButton.onclick= function(){
			billFor('00043', '286');
		};

		//EmailTextEngine enabled communication tools
		//send an email to patient
		var emailButton = document.createElement("input");
		emailButton.type = "button";
		emailButton.onclick = function(){
			var msgbody = "Your most recent INR was "+cINR+". Your doctor would like you to: "+document.getElementById("fup").value;
			sendEmail("Email from your Family Doctor", msgbody);
		};
		emailButton.value = "Send Email";
		emailButton.id = "EmailButton";
		emailButton.name = "EmailButton";

		var textButton = document.createElement("input");
		textButton.type = "button";
		textButton.value = "Text";
		textButton.id = "TextButton";
		textButton.name = "TextButton";
		textButton.onclick = function(){
			var message ="INR:"+cINR+". " +document.getElementById("fup").value;
			sendText(message);
		};

		var consentButton = document.createElement("input");
		consentButton.type = "button";
		consentButton.value = "Update Consent";
		consentButton.id = "ConsentButton";
		consentButton.name = "ConsentButton";
		consentButton.onclick = function(){
			openConsentForm();
		};

		th1.appendChild(text1);
		th1.appendChild(currentINR);

		th2.appendChild(fup);

		th3.appendChild(ticklerButton);
		th3.appendChild(ticklerAckButton);
		th3.appendChild(doctorCallButton);
		th3.appendChild(emailButton);
		th3.appendChild(textButton);
		th3.appendChild(consentButton);		
		th3.appendChild(billButton);

		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);

		table.appendChild(tr);

		//adding past tickler INR messages to the table
		for (i=0; i<messagesArray.length; i++){
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");

			var text1 = document.createTextNode(msgDatesArray[i]);
			var text2 = document.createTextNode(messagesArray[i]);

			td1.appendChild(text1);
			td2.appendChild(text2);

			tr.appendChild(td1);
			tr.appendChild(td2);
			
			table.appendChild(tr);

		}
		var acknowledgeForm = document.getElementById("acknowledgeForm");
		acknowledgeForm.appendChild(table);
		
		//highlight the follow up instruction for easy editing
		document.getElementById("fup").select();		
	}//end INR lab report

	//send a tickler for staff to call patient
	function sendTickler(message){
		if(message==null){
			message = "INR: "+cINR+", Please call: "+document.getElementById("fup").value;
		}

		var pathArray = window.location.pathname.split( '/' );
		var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/tickler/ForwardDemographicTickler.do?demographic_no="+demoNo;
		var ticklerWindow = window.open(newURL);

		ticklerWindow.addEventListener("load", function(){
			var ticklerTA = this.document.getElementsByName("textarea")[0];
			ticklerTA.value = message;
		}, false);
	}

	function initialize(){
		demoNo = getDemoNo();
		//findDemoNo();
		getTicklerMessages();
		getCurrentINR();
		getSegmentID();
	}

	// getting the "segment ID", which is a unique identifier for this lab report
	function getSegmentID(){
		var myRe = /segmentID=(\d*)&/;
		var myArray = myRe.exec(window.location.href);
		segmentID = myArray[1];
	}

	// getting the current INR in this lab report
	function getCurrentINR(){
		var hiddenSec = document.getElementsByTagName("body")[0];
		var myRe = /6301\-6\^INR\|\|([0-9]*\.[0-9]*)\|\|/;
		var myArray = myRe.exec(hiddenSec.innerHTML);
		cINR= myArray[1];
	}

	// getting the 10 most recent tickler messages about INR
	function getTicklerMessages(){
		xmlhttp= new XMLHttpRequest();
		var pathArray = window.location.pathname.split( '/' );
		var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/tickler/ticklerDemoMain.jsp?ticklerview=C&demoview="+demoNo;
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				var str=xmlhttp.responseText; //local variable
				if (!str) { return; }
				var myRe = /<TD ROWSPAN="1" class=".*">\n\s*(.*)\n.*<\/td>\n.*<TD ROWSPAN="1" class=".*">\n\s*(.*)\n.*<\/td>\n.*\n.*\n.*\n.*>(.*INR.*)<\/td>/ig;  //for the measurement
				var myArray;
				var i=0;
			
				while ((myArray = myRe.exec(str)) !== null && i<10){
					msgDatesArray[i]=myArray[1];
					messagesArray[i]=myArray[3];
					i=i+1;
				}
			}
		};
		xmlhttp.open("GET",newURL,false);
		xmlhttp.send();
	}

	// finding the demographic number for the current patient by looking in the URL of this lab form
	// function findDemoNo(){
	// 	var myRe = /demo=(\d*)&/i;
	// 	var myArray = myRe.exec(tblDiscs.innerHTML);
	// 	demoNo = myArray[1];
	// 	return demoNo;
	// }

	function billFor(billcode, icd9code){
		getPatientName();
		//Bill Button Script
		//URL to billing page
		var elements = (window.location.pathname.split('/', 2));
		firstElement = (elements.slice(1) );
		var vPath = ("https://" + location.host + "/" + firstElement);
		//Find provider number
		var myParam = location.search.split('providerNo=')[1];
		var res2 = myParam.indexOf("&");
		var provider_no = myParam.substring(0,res2);

		//Find todays date
		var d = new Date();
		curr_date = d.getDate();
		curr_month = d.getMonth();
		curr_year = d.getFullYear();
		var todaysDate = curr_year+"-"+curr_month+"-"+curr_date;

		var billPath = vPath + "/billing.do?billRegion=BC&billForm=GP&hotclick=&appointment_no=0&demographic_name="+patientLastName+"%2C"+patientFirstName+"&demographic_no="+demoNo+"&providerview=1&user_no="+provider_no+"&apptProvider_no="+provider_no+"&appointment_date="+todaysDate+"&start_time=0:00&bNewForm=1&status=t" ;
		var billWindow = window.open(billPath);
		billWindow.addEventListener("load", function(){
			billWindow.document.getElementsByName('xml_other1')[0].value = billcode; 
			billWindow.document.getElementsByName('xml_diagnostic_detail1')[0].value = icd9code;
			billWindow.document.getElementsByName('Submit')[0].click();
		},false);
	}

	var patientLastName;
	var patientFirstName;

	//Find patient name from demographic page
	function getPatientName(){
		xmlhttp= new XMLHttpRequest();
		var pathArray = window.location.pathname.split( '/' );
		var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/demographic/demographiccontrol.jsp?displaymode=edit&dboperation=search_detail&demographic_no="+demoNo;
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				var str=xmlhttp.responseText; 
				if (!str) { return; }
				
				var myRe = /Last Name:<\/span>\n\s*<span class="info">(.*)<\/span>/i;  				
				var myArray;
				if((myArray = myRe.exec(str))!== null){
					patientLastName = myArray[1];
				} 
				
				var myRe2 = /First Name:<\/span>\n\s*<span class="info">(.*)<\/span>/i;  				
				var myArray2;
				if((myArray2 = myRe2.exec(str))!== null){
					patientFirstName = myArray2[1];
				}				
			}
		};
		xmlhttp.open("GET",newURL,false);
		xmlhttp.send();
	}

}, false);

