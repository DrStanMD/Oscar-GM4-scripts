// ==UserScript==
// @name        Scheduler screen shortcut keys

// @namespace   StansScripts


// @description Shortcut keys for Schedular screen (Alt+z,j,k) for search,manage referral doc
// @include     */provider/providercontrol.jsp?year*

// @include     */admin/admin.jsp*
// @include       *oscarEncounter/oscarConsultationRequest/ConsultationFormRequest*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
//alert(firstElement)
vPath = ("https://" + location.host + "/"  + firstElement + "/")
//alert(vPath)


window.addEventListener('keypress', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	var theKeyCode = theEvent.charCode;// || event.which;
	var theKey = String.fromCharCode(theKeyCode);
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	switch(true){

		case theAltKey && theKey=='z': 
		 //alert(" ")
		//$('#search > a:nth-child(1)').css('background-color','yellow');
		$('#search > a:nth-child(1)').click()
		//popupPage2('../demographic/search.jsp');return false;
			break;
		
		case theAltKey && theKey=='j': 
		window.open(vPath + "billing/CA/BC/billingManageReferralDoc.jsp")
		//$('#admin > a:nth-child(1)').click()
		//$('div.adminBox:nth-child(7) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(5) > a:nth-child(1)').click()
window.close()
//alert(" ")
			break;
			
	       case theAltKey && theKey=='k': //Open scratch pad
			$('#oscar_scratch > img:nth-child(1)').click()
			break;

			break;


		/*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);