// ==UserScript==
// @name        Reminders
// @namespace   Stanscript
// @include  *lab/CA/ALL/labDisplay.jsp?segmentID*
// @include  *lab/CA/ALL/labDisplay.jsp?demographicId*
// @include  *dms/MultiPageDocDisplay.jsp?segmentID*
// @include  *dms/showDocument.jsp?inWindow*
// @include  *tickler/ticklerAdd.jsp*
// @include  *dms/showDocument.jsp?segmentID*
// @include  *tickler/ForwardDemographicTickler.do*
// @description Adds Reminders for screening follow up,link to Rx and invoice
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
/*
Indemnity

http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
Although reasonable care is taken to test the scripts before publishing, 
everything you see here is meant to be informational only, and should be used with caution. 
No guarantee is made or implied about the scripts here whatsoever. 
Using scripts described here may result in errant behavior in the EMR, 
inadvertently harming patients, and general badness. 
Using any parts of the code implies you fully understand the code and the risks associated with using it.
*/
//**********************************************************
var inputvar = 226 //form id goes here
//**********************************************************
if (inputvar == 0) {
  alert('Set the specific HTML form Id for your Oscar system')
  return false
}
var dd = 0 //Button position
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')//=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}

//*****Determine type of document and not the tickler screen*******

if (params.segmentID) {
  // alert(params.segmentID)
  var IDnum = params.segmentID
  if (window.location.pathname.indexOf('showDocument.jsp') > - 1) {
    var mydocType = 'DOC'
    var myElement = '.docTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > fieldset:nth-child(3)'    //alert($(myElement).html())
    //$(myElement).css('background-color', 'yellow')
  }
  if (window.location.pathname.indexOf('labDisplay.jsp') > - 1) {
    var mydocType = 'HL7'
    var myElement = '#acknowledgeForm_' + IDnum + ' > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)' //var teststring = ($('.Title2').html()).trim()
    //$(myElement).css('background-color', 'yellow')
  }  
  //alert(mydocType)
  //alert(teststring)

}//*************AUTOTICKLER screen**********************************************************

if (params.myparam1) {
  screen1 = params.myparam1
  screen1 = screen1.replace(/%20/g, ' ');
  screen2 = params.myparam2 //alert(screen1)
  //alert(screen2)      
  var oneDay = 24 * 60 * 60 * 1000;
  var d = new Date()
  d.setTime(d.getTime() + (screen2 * oneDay))
  d = new Date(d)
  var month = new Array();
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  var mm = month[d.getMonth()];
  var yy = d.getFullYear();
  FUDate = mm + ' ' + yy
  newvalue = 'Recall for ' + screen1 + ' repeat due in ' + FUDate
  var newDate = d
  var newYear = newDate.getFullYear()
  var newMonth = newDate.getMonth() + 1;
  var newDay = newDate.getDate();
  var newD = newYear + '-' + newMonth + '-' + newDay;
  document.serviceform.xml_appointment_date.value = newD;
  //document.getElementsByName("textarea").value = newvalue;
  //alert(newvalue)
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val(newvalue)  //document.getElementById("FormName").submit();
}//*******************************************************************************

var y = document.getElementsByClassName('NarrativeRes').length //alert(y)
var x = window.location.toString()
var q1 = x.indexOf('lab/CA/ALL/labDisplay.jsp')
var q2 = document.getElementsByClassName('NarrativeRes')//alert(x)
if (x.indexOf('dms/showDocument.jsp?') > - 1) { //This is a document
  demono = $('input[name=demog]').val();
  //alert(demono)
}
if ((y == 0) && x.indexOf('lab/CA/ALL/labDisplay.jsp') && !params.demoName) {
  //  alert('LabReport')
  var mytag = document.getElementsByTagName('a');
  for (var i = 0; i < mytag.length; i++) {
    var onclickvalue = mytag[i].getAttribute('onclick')
    if (onclickvalue && onclickvalue.indexOf('demo=') > - 1) {
      pstart = onclickvalue.indexOf('demo=')
      pend = onclickvalue.indexOf('&other')
      demono = onclickvalue.substring(pstart + 5, pend)
      break
    }
  }
} 
else if (q1 > - 1 && q2) {
  // alert("Lab 2")
  var NarList = document.getElementsByClassName('NarrativeRes');
  demopos = ((NarList[1].innerHTML).indexOf('demo='))
  demoend = (NarList[1].innerHTML).indexOf('&', demopos)
  demono = (NarList[1].innerHTML).substring(demopos + 5, demoend) //alert(demono)
} 
else if (x.indexOf('dms/MultiPageDocDisplay.jsp?segmentID') > - 1) {
  x = ($('input[tabindex=12]').attr('onclick'))
  x = (x.toString())
  var pstart = x.search('demographic_no')
  var pend = x.lastIndexOf('tickler')
  demono = x.substring(pstart + 15, pend - 3).toString() //alert(demono)
}
/*
  else if (x.indexOf('dms/showDocument.jsp?inWindow') > - 1) {
  alert("HI")
  demono = $('input[name=demog]').val();
  alert(demono)
} 
*/
/*
 else {
  z = document.getElementById('msgBtn_' + params.segmentID)
  z = ($(z).attr('onclick'))
  z = (z.toString())
  var pstart = z.search('demographic_no')
  var pend = z.search('&docId')
  demono = z.substring(pstart + 15, pend).toString()
   alert("the else")
  alert(demono)
}
*/
var addthis = ''
var addthis2 = '360'
AA = [
]
AA[0] = [
  'Mammogram',
  ''
]
AA[1] = [
  'Pap',
  ''
]
AA[2] = [
  'Colonoscopy',
  ''
]
AA[3] = [
  'PSA',
  ''
]
AA[4] = [
  'CEA',
  ''
]
AA[5] = [
  'FIT',
  ''
]
AA[6] = [
  '<input type=\'text\' id=\'myOther\'  onfocus=\'Aller6.checked=true\'   name=\'Other\'>',
  'Other'
] //alert(AA)
AB = [
]
AB[0] = [
  '6 months',
  '180'
]
AB[1] = [
  'One year',
  '360'
]
AB[2] = [
  'Two years',
  '720'
]
AB[3] = [
  'Three years',
  '1080'
]
AB[4] = [
  'Five years',
  '1800'
]
AB[5] = [
  'Ten years',
  '3600'
]
AB[6] = [
  '<input type=\'text\' id=\'Days\' name=\'Days\' size=\'4\'   onfocus=\'Time6.checked=true\'  ><label for= \'Days\'>Months</label>',
  'Months'
]
AB[7] = [
  '<input type=\'text\' id=\'Years\' name=\'Years\' size=\'4\'  onfocus=\'Time7.checked=true\'  ><label for= \'Years\'>Years</label>',
  'Years'
]
AB[8] = [
  'Now',
  '0'
]
var myRadio = '<br></br><div id=\'RadioDiv\'><button type=\'button\' id=\'mybutton\'>Continue</button><br>'
for (i = 0; i < AA.length; i++) {
  var myId = 'Aller' + i.toString();
  var myLabel = AA[i][0]
  var myValue = AA[i][1]
  var myRadio = myRadio + '<input name=\'AllergyR\' id=' + myId + ' type=\'radio\'     value=' + myValue + ' /><label for=' + myId + '>' + myLabel + '</label><br>'
}
myRadio = myRadio + '<input name=\'AllergyR\'  id=\'Cancel\' type=\'radio\'  value= \'cancel\' /><label for= \'Cancel\'>CANCEL</label><br></div><br></br>'
var myRadio2 = '<br></br><div id=\'Radio2Div\'>'
for (i = 0; i < AB.length; i++) {
  var myId = 'Time' + i.toString();
  var myLabel = AB[i][0]
  var myValue = AB[i][1]
  var myRadio2 = myRadio2 + '<input name=\'TimeR\' id=' + myId + ' type=\'radio\'     value=' + myValue + ' /><label for=' + myId + '>' + myLabel + '</label><br>'
}//***********************************************************************

var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'AutoReminders';
input2.id = 'AutoReminders';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:16px;position:absolute;top:' + (400 + dd) + 'px;right:0px;background-color: #FFC0CB;');
document.body.appendChild(input2);
var addthis = ''
var addthis2 = '360'
function ButtonFunction2() {
  //alert(demono)
  //alert(params.demoName)
  /*
  var myElement = '#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)'
  if (typeof params.demoName != 'undefined') {
  myElement = myElement2    //var myElement = '.docTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > fieldset:nth-child(3)'
  }
 */
  var RestoreHTML = $(myElement).html()
  $(myElement).html('<table bgcolor=\'yellow\'><td><div align=\'left\'>' + myRadio + '</td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</td><td>' + myRadio2 + '</td></div></table>')
  document.getElementById('mybutton').addEventListener('click', function () {
    // document.getElementById('RadioDiv').addEventListener('click', function () {
    if (document.getElementById('Cancel').checked) {
      $(myElement).html(RestoreHTML)
    }
    for (i = 0; i < AA.length; i++) {
      xyz = 'Aller' + i
      if (document.getElementById(xyz).checked) {
        addthis = AA[i][0]
        if (AA[i][1] == 'Other') {
          addthis = document.getElementById('myOther').value
        }
        $(myElement).html(RestoreHTML)
        window.open(vPath + '/eform/efmformadd_data.jsp?fid=' + inputvar + '&demographic_no=' + demono + '&appointment=0' + '&myparam1=' + addthis + '&myparam2=' + addthis2) //PREVENTION SCREEN********
        switch (addthis) {
          case 'Mammogram':
            vPrev = 'MAM'
            break;
          case 'Pap':
            vPrev = 'PAP'
            break;
          case 'Colonoscopy':
            vPrev = 'COLONOSCOPY'
            break;
          default:
            vPrev = ''
        }
        if (vPrev) {
          window.open(vPath + '/oscarPrevention/AddPreventionData.jsp?prevention=' + vPrev + '&demographic_no=' + demono + '&prevResultDesc=' + '&myparam1=' + addthis + '&myparam2=' + addthis2, '_blank', 'width=800, height=500')
          setTimeout(function () {
            // alert('Timeout')
          }, 2000);
      } //************END PREVENTION*****************

    }
  }
});//****set default times*****
$('#Aller1').focus(function () {
  $('#Time3').click() //alert(this.id)
});
document.getElementById('Time1').checked = true
document.getElementById('Radio2Div').addEventListener('change', function () {
  for (i = 0; i < AB.length; i++) {
    xyz = 'Time' + i
    if (document.getElementById(xyz).checked) {
      addthis2 = AB[i][1]
      if (AB[i][1] == 'Months') {
        addthis2 = document.getElementById('Days').value * 30
      }
      if (AB[i][1] == 'Years') {
        addthis2 = document.getElementById('Years').value * 365
      }
    }
  }
});
} //***********************************************************************

var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'AutoTickler';
input3.id = 'AutoTickler';
input3.onclick = ButtonFunction3;
input3.setAttribute('style', 'font-size:16px;position:absolute;top:' + (430 + dd) + 'px;right:0px;background-color: lime;');
document.body.appendChild(input3);
var addthis = ''
var addthis2 = '360'
function ButtonFunction3() {
// alert(demono)
/*
 var myElement = '#acknowledgeForm'+IDnum+' > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)'
 $(myElement).css('background-color', 'red')
 alert(params.demoName)
 if (typeof params.demoName != 'undefined') {
 myElement = myElement2  // var myElement = '.docTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > fieldset:nth-child(3)'
 }
*/
var RestoreHTML = $(myElement).html()//$(myElement).html('<table bgcolor=\'yellow\'><td><div align=\'left\'>' + myRadio + '</td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</td><td>' + myRadio2 + '</td></div></table>')
$(myElement).html('<table align=\'center\' bgcolor=\'yellow\'><td><div align=\'left\'>' + myRadio + '</td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</td><td>' + myRadio2 + '</td></div></table>')
document.getElementById('mybutton').addEventListener('click', function () {
  //document.getElementById('RadioDiv').addEventListener('click', function () {
  if (document.getElementById('Cancel').checked) {
    $(myElement).html(RestoreHTML)
  }  //alert(AA)

  for (i = 0; i < AA.length; i++) {
    xyz = 'Aller' + i
    if (document.getElementById(xyz).checked) {
      addthis = AA[i][0]
      if (AA[i][1] == 'Other') {
        //   alert(document.getElementById("myOther").value)
        addthis = document.getElementById('myOther').value
      }
      $(myElement).html(RestoreHTML) //alert(mydocType)
      //alert(addthis)
      //alert(addthis2)
      window.open(vPath + '/tickler/ForwardDemographicTickler.do?docType=' + mydocType + '&docId=' + params.segmentID + '&demographic_no=' + demono + '&myparam1=' + addthis + '&myparam2=' + addthis2, '_blank', 'width=800, height=500') // (vPath +'/lab/CA/ALL/labDisplay.jsp?demographicId='+demono+'&providerNo=1&segmentID='+params.segmentID+'&multiID=null')
      //PREVENTION SCREEN********
      switch (addthis) {
        case 'Mammogram':
          vPrev = 'MAM'
          break;
        case 'Pap':
          vPrev = 'PAP'
          break;
        case 'Colonoscopy':
          vPrev = 'COLONOSCOPY'
          break;
        default:
          vPrev = ''
      }
      if (vPrev) {
        window.open(vPath + '/oscarPrevention/AddPreventionData.jsp?prevention=' + vPrev + '&demographic_no=' + demono + '&prevResultDesc=' + '&myparam1=' + addthis + '&myparam2=' + addthis2, '_blank', 'width=800, height=500')
    } //************END PREVENTION*****************

  }
}
}); //****set default times for pap*****
$('#Aller1').focus(function () {
$('#Time3').click() //alert(this.id)
});
document.getElementById('Time1').checked = true
document.getElementById('Radio2Div').addEventListener('change', function () {
for (i = 0; i < AB.length; i++) {
  xyz = 'Time' + i
  if (document.getElementById(xyz).checked) {
    addthis2 = AB[i][1]
    if (AB[i][1] == 'Months') {
      addthis2 = document.getElementById('Days').value * 30
    }
    if (AB[i][1] == 'Years') {
      addthis2 = document.getElementById('Years').value * 365
    }
  }
}
});
} //*******************************************************************************
//Rx screen shortcut
if(params.status=="U"){
document.getElementById('AutoReminders').style.visibility = 'hidden';
document.getElementById('AutoTickler').style.visibility = 'hidden';
}

if (demono > - 1) {
document.getElementById('AutoReminders').style.visibility = 'visible';
document.getElementById('AutoTickler').style.visibility = 'visible';
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Open Rx Screen';
input4.onclick = ButtonFunction4;
input4.setAttribute('style', 'font-size:16px;position:absolute;top:' + (370 + dd) + 'px;right:0px;background-color: lightblue;');
document.body.appendChild(input4);
function ButtonFunction4() {
window.open(vPath + '/oscarRx/choosePatient.do?providerNo=1&demographicNo=' + demono)
} //Create invoice
/*var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
  var onclickvalue = mytag[i].getAttribute('onclick')
  alert(onclickvalue)
}
*/

var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'Master';
input5.onclick = ButtonFunction5;
input5.setAttribute('style', 'font-size:16px;position:absolute;top:' + (340 + dd) + 'px;right:0px;background-color: lightblue;');
document.body.appendChild(input5);
function ButtonFunction5() {
window.open(vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demono + '&displaymode=edit&dboperation=search_detail', 'myWindow', 'width=800,height=600') //window.open(vPath + 'billing.do?billRegion=BC&billForm=GP' + demono)
}/* 
//display LabGrid
var input50 = document.createElement('input');
input50.type = 'button';
input50.value = 'LabGrid';
input50.onclick = ButtonFunction50;
input50.setAttribute('style', 'font-size:16px;position:absolute;top:'+(310+dd)+'px;right:0px;background-color: orange;');
document.body.appendChild(input50);
function ButtonFunction50() {
  window.open(vPath+'/eform/efmformadd_data.jsp?fid=68&demographic_no='+demono)
}
*/

}
