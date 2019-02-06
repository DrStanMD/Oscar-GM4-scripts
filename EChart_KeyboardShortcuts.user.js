// ==UserScript==
// @name           EChart_KeyboardShortcuts
// @namespace      oscar/StansScripts
// @description Various Echart shortcut buttons (Shift+ E,V,Z,X,I,F,K,S,M,N,P,0,1,2,3,4,5,7). Set your own Measurement groupName and default population text.
// @include        */casemgmt/forward.jsp?action=view&*
// @version 15.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement)//alert(vPath)
//vPath = ("https://" + location.hostname + "/")
window.addEventListener('dblclick', function () {
  //alert("HELLO WORLD")
  oldvalue = $('#noteEditTxt').val()
  newvalue = '<div style=\'color: Red\'>' + oldvalue + '</div>'
  $('#noteEditTxt').val(newvalue)
});
window.addEventListener('keypress', function (theEvent) {
  //theEvent.stopPropagation();
  //theEvent.preventDefault();
  var theKeyCode = theEvent.charCode; // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  //var theDownKey= theEvent.PgDnKey;
  switch (true) {
    case theShiftKey && theKey == 'E': //save, sign and bill
      //var theTarget = document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
      //theTarget.click();
      $('#save > span:nth-child(1) > input:nth-child(5)').click()
      break;
    case theShiftKey && theKey == 'V': //sign & exit
      $('#signSaveImg').click()
      break;
    case theShiftKey && theKey == 'Z': //open BP Pulse Weight Height measurements
      window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Vitals', 'VitalsWindow', 'width=1000,height=500')
      break;
    case theShiftKey && theKey == 'X': //open Screening Measurements
      window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Screening%20Procedures', 'Screening%20ProceduresWindow', 'width=1000,height=700')
      break;
    case theShiftKey && theKey == 'I': //open Injections/Allergy shots
      window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Allergy Shots')
      break;
    case theShiftKey && theKey == 'F': //open eForms & Lab forms
      $('#menuTitleeforms > h3:nth-child(1) > a:nth-child(1)').click()
      break;
    case theShiftKey && theKey == 'S': //save note
      var theTarget = document.evaluate('id(\'frmIssueNotes\')/span/input[contains(@src,\'note-save.png\')]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      theTarget.click();
      break;
    case theShiftKey && theKey == '!': //new social history
      vtext = 'Smoker: Non.\nAlcohol: minimal.\nExercises: \nMarried: Y \nKids  \nOccupation: \n'
      $('#divR1I1 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == '@': //new medical history
      vtext = '\n\nSURGICAL HISTORY:\n'
      $('#divR1I2 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == '#': //new Family History
      vtext = 'Diabetes: No.\nCAD: No.\nHypertension: No.\nStroke: No.\nCancer: No.\nDementia: No.\n'
      $('#FamHistory > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == '$': //new ongoing concerns
      $('#divR2I1 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()      //$('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == '%': //new reminder
      $('#divR2I2 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()      //$('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == '0': //expand measurements
      $('#imgmeasurements5').click()      //$('#noteEditTxt').val(vtext)
      break;
    case theShiftKey && theKey == 'M': //Add medications
      $('#Rx > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
      break;
    case theShiftKey && theKey == 'P': //Add preventions
      $('#preventions > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
      break;
    case theShiftKey && theKey == 'N': //Add preventions
      $('#newNoteImg').click()
      break;
    case theShiftKey && theKey == 'K': //Open Scratch Pad
      window.open(vPath + '/scratch/index.jsp')
      break;
    case theShiftKey && theKey == '&': //change message colour to red
      oldvalue = $('#noteEditTxt').val()
      newvalue = '<div style=\'color: Red\'>' + oldvalue + '</div>'
      $('#noteEditTxt').val(newvalue)
      break;
      /*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
  }
},
true);
