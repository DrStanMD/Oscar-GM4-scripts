// ==UserScript==
// @name        Reminders
// @namespace   Stanscript
// @include  *lab/CA/ALL/labDisplay.jsp?segmentID*
// @include  *lab/CA/ALL/labDisplay.jsp?demographicId*
// @include  *dms/MultiPageDocDisplay.jsp?segmentID*
// @include  *dms/showDocument.jsp?inWindow*
// @include  *tickler/ForwardDemographicTickler.do*
// @include  *tickler/ticklerAdd.jsp*
// @include  *dms/showDocument.jsp?segmentID*
// @description Adds Reminders for screening follow up,link to Rx and invoice
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.9
// @grant       none
// ==/UserScript==

//**********************************************************
var inputvar = 226 //"Push to Reminder" form id goes here
var providername = "Dr. Hurwitz"  //Provider Name goes here
var providerphone = "604-275-8228"  //Office phone goes here
//**********************************************************

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')

//=====Get Parameters============
//vPath = '../'
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

//get demo_no*********************************************
var myParam = location.search.split('demographicId=')[1]

if (!myParam) {
    //alert("NO DEMO NO")
    var x = document.getElementsByName("demog");
    if (x[0]) {
        var demo_no = x[0].value
        //alert(demo_no)
    }
    var x = document.querySelector('[title="Annotation"]');
    if (x) {
        var y = x.outerHTML
        var demo_no = y.substring(y.lastIndexOf("demo=") + 5, y.lastIndexOf("&amp;"));
        //alert(demo_no)
    }
    var x = document.getElementsByClassName("NarrativeRes");
    if (x[0]) {
        var y = x[0].innerHTML
        //alert(y)
        var demo_no = y.substring(y.lastIndexOf("demo=") + 5, y.lastIndexOf("&amp;labType=HL7"));
        //alert(demo_no)
    }

} else {
    var res = myParam.indexOf('&')
    var demo_no = myParam.substring(0, res)
    //alert(demo_no)
}
//end get demo_no**************************************************
//alert(demo_no)

//INR snippet*******************************************************************************
if (demo_no) {
    demoNo = demo_no
    //alert("derived" +demoNo)
}
if (params.demographicId) {
    var demoNo = params.demographicId
    // alert("Params" + demoNo)
}
//alert(window.location)
if (window.location.toString().indexOf("lab/CA/ALL/labDisplay") > -1) {
    //if (params.demographicId){
    var ResultList = ["INR"]
    //alert(demoNo)
    function ResultEmail() {
        var ebody = "Dear " + demoArrayVal[0] + ", %0D%0A Your latest " + ResultList[0] + " result is " + results[1] + "%0D%0A%0D%0A"
        //alert(ebody)
        var efooter = "%0D%0A%0D%0AReplies to this message are routed to an unmonitored mailbox intended only to receive your confirmation of appointment notification. %0D%0AWe are unable to respond to any email queries.  If you have questions please call us at " + providerphone + "."
        var emessage = "Please continue with your current Warfarin dosing and monthly INR testing.%0D%0A%0D%0A" + providername + " Office"
        var email = demoArrayVal[0] + " " + demoArrayVal[1] + '<' + demoArrayVal[2] + '>'
        var mailto_link = 'mailto:' + email + '?Subject=Confidential medical information&body=' + ebody + emessage + efooter
        window = window.open(mailto_link, 'emailWindow')
        //$('input[type="button"][value=" E-Chart"]').click(); 
        // window.open(vPath + "/casemgmt/forward.jsp?action=view&demographicNo=" + demoNo + "&providerNo=1&providerName=appointmentNo=&reason=Tel-Progress+Notes&appointmentDate=&start_time=&apptProvider=&providerview=" + "&instructions=" + ebody + emessage)
        window.open(vPath + "/casemgmt/forward.jsp?action=view&demographicNo=" + demoNo + "&providerNo=1&providerName=&appointmentNo=0&reason=Lab+Results-Notes&appointmentDate=&start_time=&apptProvider=none&providerview= " + "&instructions=" + ebody + emessage)

        $(document).ready(function() {
            $('#caseNote_note0').focus()
            window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=INR Management' + '&instructions=Your latest ' + ResultList[0] + ' result is ' + results[1] + ' -  Please continue with your current Warfarin dosing and monthly INR testing.')
        });
    }

    var tableRow = $("td").filter(function() {
        return $(this).text() == ResultList[0];
    }).closest("tr").next("tr");
    //tableRow.css('background-color', 'yellow')
    tableRow.before("<input type='button' id=" + ResultList[0] + "  style='background-color:lime;color:black;' value='Send Email'>")
    //alert(tableRow.html()) 
    if (tableRow.html()) {
        var myRe = /<td align="right">([\d,\.]+)<\/td>/; //for the measurement
        var results = myRe.exec(tableRow.html())
        document.getElementById(ResultList[0]).title = 'Your ' + ResultList[0] + ' result is ' + results[1]
        document.getElementById(ResultList[0]).onclick = ResultEmail
        document.getElementById(ResultList[0]).value = "Send Email for NO CHANGE in " + ResultList[0] + " management"
        //alert('Your ' + ResultList[0] + ' result is ' + results[1])
    }
    $('#' + ResultList[0]).hide()
}
//End INR snippet************************************************************************  

if (inputvar == 0) {
    alert('Set the specific HTML form Id for your Oscar system')
    return false
}
var dd = 0 //Button position



var demoArray = [
    'First Name',
    'Last Name',
    'Email'
]

var demoArrayVal = []

function getMeasures(measure) {
    xmlhttp = new XMLHttpRequest();
    var pathArray = window.location.pathname.split('/');
    var newURL = vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail'
    //window.open(newURL)

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText)
            //var str = xmlhttp.responseText.replace(/\s/g, '')
            var str = xmlhttp.responseText
            if (!str) {
                return;
            }
            //var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'
            //var myReString = '<spanclass="label">' + measure + '.*/s*'
            var myReString = '<span class="label">[\n\r\t]*\s*' + measure + '(.|[\n])*'
            var myRe = new RegExp(myReString, 'g');
            var myArray
            while ((myArray = myRe.exec(str)) !== null) {
                y = myArray.toString()
                //alert(y)
                var z = y.indexOf('info')
                var mycode = y.substring(z + 6)
                var mycode2 = mycode.indexOf('</span>')
                var mycode3 = mycode.substring(mycode + 9, mycode2)
                //alert(mycode3)
                demoArrayVal[j] = mycode3
                //alert(j+measure + ' is ' + mycode3)
            }
        }
    }
    xmlhttp.open('GET', newURL, false);
    xmlhttp.send();
}

$(document).ready(function() {
    for (j = 0; j < demoArray.length; j++) {
        getMeasures(demoArray[j]);
    }
});


//*****Determine type of document and not the tickler screen*******

if (params.segmentID) {
    // alert(params.segmentID)
    var IDnum = params.segmentID
    if (window.location.pathname.indexOf('showDocument.jsp') > -1) {
        var mydocType = 'DOC'
        var myElement = '.docTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > fieldset:nth-child(3)' //alert($(myElement).html())
        //$(myElement).css('background-color', 'yellow')
    }

    if (window.location.pathname.indexOf('labDisplay.jsp') > -1) {
        var mydocType = 'HL7'
        var myElement = '#acknowledgeForm_' + IDnum + ' > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)' //var teststring = ($('.Title2').html()).trim()
        //$(myElement).css('background-color', 'yellow')
    }

    //alert(mydocType)
    //alert(teststring)

} //*************AUTOTICKLER screen**********************************************************

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
    //alert(newvalue)
    //var e = $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)')
    var mytextarea = document.getElementsByName('textarea');
    //alert(mytextarea[0].value + " " + newvalue) 
    mytextarea[0].value = mytextarea[0].value + " " + newvalue
    //this.window.reload()
    //document.getElementById("FormName").submit();
}

//*******************************************************************************

var y = document.getElementsByClassName('NarrativeRes').length //alert(y)
var x = window.location.toString()
var q1 = x.indexOf('lab/CA/ALL/labDisplay.jsp')
var q2 = document.getElementsByClassName('NarrativeRes') //alert(x)
if (x.indexOf('dms/showDocument.jsp?') > -1) { //This is a document
    demono = $('input[name=demog]').val();
    //alert(demono)
}
if ((y == 0) && x.indexOf('lab/CA/ALL/labDisplay.jsp') && !params.demoName) {
    // alert('LabReport')
    var mytag = document.getElementsByTagName('a');
    for (var i = 0; i < mytag.length; i++) {
        var onclickvalue = mytag[i].getAttribute('onclick')
        if (onclickvalue && onclickvalue.indexOf('demo=') > -1) {
            pstart = onclickvalue.indexOf('demo=')
            pend = onclickvalue.indexOf('&other')
            demono = onclickvalue.substring(pstart + 5, pend)
            break
        }
    }
} else if (q1 > -1 && q2) {
    //alert("Lab 2")

    var NarList = document.getElementsByClassName('NarrativeRes');
    if ((NarList[1].innerHTML).indexOf('demo=')) {
        //alert(NarList)
        demopos = (NarList[1].innerHTML).indexOf('demo=')
        //alert(demopos)
        demoend = (NarList[1].innerHTML).indexOf('&', demopos)
        demono = (NarList[1].innerHTML).substring(demopos + 5, demoend)
    }

    if (!demono) {
        demono = params.demographicId
        //alert(demono)
    }


} else if (x.indexOf('dms/MultiPageDocDisplay.jsp?segmentID') > -1) {
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
AA = []
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
AB = []
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
} //***********************************************************************

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
    document.getElementById('mybutton').addEventListener('click', function() {
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
                    setTimeout(function() {
                        // alert('Timeout')
                    }, 2000);
                } //************END PREVENTION*****************

            }
        }
    }); //****set default times*****
    $('#Aller1').focus(function() {
        $('#Time3').click() //alert(this.id)
    });
    document.getElementById('Time1').checked = true
    document.getElementById('Radio2Div').addEventListener('change', function() {
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
    var RestoreHTML = $(myElement).html() //$(myElement).html('<table bgcolor=\'yellow\'><td><div align=\'left\'>' + myRadio + '</td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</td><td>' + myRadio2 + '</td></div></table>')
    $(myElement).html('<table align=\'center\' bgcolor=\'yellow\'><td><div align=\'left\'>' + myRadio + '</td>' + '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</td><td>' + myRadio2 + '</td></div></table>')
    document.getElementById('mybutton').addEventListener('click', function() {
        //document.getElementById('RadioDiv').addEventListener('click', function () {
        if (document.getElementById('Cancel').checked) {
            $(myElement).html(RestoreHTML)
        } //alert(AA)

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
    $('#Aller1').focus(function() {
        $('#Time3').click() //alert(this.id)
    });
    document.getElementById('Time1').checked = true
    document.getElementById('Radio2Div').addEventListener('change', function() {
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
}
//*******************************************************************************

//Hide or show buttons for this screen

if (x.indexOf('tickler/ticklerAdd.jsp') > -1) {
    document.getElementById('AutoReminders').style.visibility = 'hidden';
    document.getElementById('AutoTickler').style.visibility = 'hidden';
}

if (x.indexOf('ForwardDemographicTickler') > -1) {
    document.getElementById('AutoReminders').style.visibility = 'hidden';
    document.getElementById('AutoTickler').style.visibility = 'hidden';
}

if (params.status == "U") {
    document.getElementById('AutoReminders').style.visibility = 'hidden';
    document.getElementById('AutoTickler').style.visibility = 'hidden';
}

if (demono > -1) {
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
    }
    //Create invoice
    /*var mytag = document.getElementsByTagName('a');
    for (var i = 0; i < mytag.length; i++) {
      var onclickvalue = mytag[i].getAttribute('onclick')
      alert(onclickvalue)
    }
    */

    var input5 = document.createElement('input');
    input5.type = 'button';
    input5.value = 'Preventions';
    input5.onclick = ButtonFunction5;
    input5.setAttribute('style', 'font-size:16px;position:absolute;top:' + (340 + dd) + 'px;right:0px;background-color: lightblue;');
    document.body.appendChild(input5);

    function ButtonFunction5() {
        window.open(vPath + '/oscarPrevention/index.jsp?demographic_no=' + demono + '&displaymode=edit&dboperation=search_detail', 'myWindow', 'width=800,height=600')
    }


    var input50 = document.createElement('input');
    input50.type = 'button';
    input50.value = 'Send Email';
    input50.onclick = ButtonFunction50;
    input50.setAttribute('style', 'font-size:16px;position:absolute;top:' + (310 + dd) + 'px;right:0px;background-color: orange;');
    document.body.appendChild(input50);

    function ButtonFunction50() {
        var email = demoArrayVal[0] + " " + demoArrayVal[1] + '<' + demoArrayVal[2] + '>'
        var mailto_link = 'mailto:' + email + '?Subject=Confidential medical information'
        window = window.open(mailto_link, 'emailWindow')
    }



}
