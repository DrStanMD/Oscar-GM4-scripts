// ==UserScript==
// @name           EChart_KeyboardShortcuts
// @namespace      oscar/StansScripts
// @version 15.2
// @description Various Echart shortcut buttons (Alt+ e,v,z,x,k,s,0,1,2,3,4,5,7). Set your own Measurement groupName and default population text.
// @include        */casemgmt/forward.jsp?action=view&*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)
window.addEventListener('dblclick', function () {
  oldvalue = $('#noteEditTxt').val()
  newvalue = '<div style=\'color: Red\'>' + oldvalue + '</div>'
  $('#noteEditTxt').val(newvalue)
});


(function () {
  document.addEventListener('keydown', function (e) {
    
   // alert(e.keyCode)
    
    if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //z
      //window.open('https://secure56.junoemr.com/SDHurwitzInc//oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Vitals')
        $('#menu3 > a:nth-child(2)').click()
    }
    if (e.keyCode == 86 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //v
      $('#signSaveImg').click()
    }
    if (e.keyCode == 75 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //k
      window.open(vPath + '/scratch/index.jsp')
    }
    if (e.keyCode == 88 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //x
     // window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Screening%20Procedures', 'Screening%20ProceduresWindow', 'width=1000,height=700')
      $('#menu3 > a:nth-child(6)').click()
    }
    if (e.keyCode == 69 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //e
      //var theTarget = document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
      //theTarget.click();
      $('#save > span:nth-child(1) > input:nth-child(5)').click()
    }
    if (e.keyCode == 83 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //s
       $('#frmIssueNotes > span:nth-child(11) > input:nth-child(4)').click()
    }
    if (e.keyCode == 49 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //1
      vtext = 'Smoker: Non.\nAlcohol: minimal.\nExercises: \nMarried: Y \nKids  \nOccupation: \n'
      $('#divR1I1 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
    }
    if (e.keyCode == 50 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //2
      vtext = '\n\nSURGICAL HISTORY:\n'
      $('#divR1I2 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
    }
    if (e.keyCode == 51 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //3
      vtext = 'Diabetes: No.\nCAD: No.\nHypertension: No.\nStroke: No.\nCancer: No.\nDementia: No.\n'
      $('#FamHistory > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
      $('#noteEditTxt').val(vtext)
    }
    if (e.keyCode == 52 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //4
      $('#divR2I1 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click() //$('#noteEditTxt').val(vtext)
    }
    if (e.keyCode == 53 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //5
      $('#divR2I2 > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').click()
    }
    if (e.keyCode == 96 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //0
  $('#imgeforms5').click()
  $('#imgmeasurements5').click()
  $('#imgdocs5').click()
  $('#imglabs5').click()
    }
    if (e.keyCode == 55 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //7
      oldvalue = $('#noteEditTxt').val()
      newvalue = '<div style=\'color: Red\'>' + oldvalue + '</div>'
      $('#noteEditTxt').val(newvalue)
    }
  }, false);
}) ();
