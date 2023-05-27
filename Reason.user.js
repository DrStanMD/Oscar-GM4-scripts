// ==UserScript==
// @name        Reason Replace
// @namespace   Stanscript
// @include     *providercontrol.jsp?year*
// @description Replaces Reason-for-visit to the line below. Adds Wait Time button, Twilio text message
// @version     15.2
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

//UPDATE THE FOLLOWING 4 PARAMETERS USING YOUR OWN ACCOUNT INFORMATION
//var twilio_id = ''; // Twilio AccountSID
//var twilio_auth = ''; // Twilio Auth Token
//var twilio_number = '+1604xxxxxxx'; // Twilio phone number

var doctor = "Hurwitz"

var myTextMessage = "Appointment reminder." +
    "                                          \n" +
    "Your telephone appointment with Dr. " + doctor + " will commence shortly.  \n" +
    "Please ensure that your cellphone is available to take the call.  \n" +
    "                                          \n" +
    "Thank you,\n" +
    "                                          \n" +
    "Dr. " + doctor + "'s office."

//alert(myTextMessage)
var demoArrayVal = []
var ptcell


//===========Cookies===============

function setCookie(cname,cvalue,exdays,cpath)
{
var d = new Date();
 //d.setTime(d.getTime()+(exdays*24*60*60*1000));
 d.setTime(d.getTime()+(exdays*5000));
var expires = "expires="+d.toGMTString();
//alert(expires)
document.cookie = cname + "=" + cvalue + "; " + expires +  "; " + cpath
 }
//setCookie("homephone",qqhomephone,360,"path=/");

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
}
return "";
}
//*****************************************************************


function AppMsg() {
    function sendText(patientCell) {
        /*
        var confirmSend = confirm('Sending: "' + myTextMessage + '" to ' + patientCell);
        if (!confirmSend) {
          return;
        }
        */
        var url = 'https://' + twilio_id + ':' + twilio_auth + '@api.twilio.com/2010-04-01/Accounts/' + twilio_id + '/Messages';
        var form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', url);
        form.target = 'hiddenFrame';
        var fromField = document.createElement('input');
        //fromField.type = 'hidden';
        fromField.name = 'From';
        fromField.value = twilio_number;
        form.appendChild(fromField);
        var toField = document.createElement('input');
        //toField.type = 'hidden';
        toField.name = 'To';
        toField.value = patientCell;
        form.appendChild(toField);
        var bodyField = document.createElement('input');
        //bodyField.type = 'hidden';
        bodyField.name = 'Body';
        //bodyField.value = body;
        bodyField.value = myTextMessage
        form.appendChild(bodyField);
        document.body.appendChild(form);
        var hiddenFrame = document.createElement('iframe');
        hiddenFrame.name = 'hiddenFrame';
        hiddenFrame.setAttribute('hidden', true);
        document.body.appendChild(hiddenFrame);
        form.submit();
        //messageSent('Message: "' + body + '" texted to ' + patientCell);
    }


    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            //alert( '(' + match[1] + ') ' + match[2] + '-' + match[3]);
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    }

    function getMeasures(measure, demo_no) {
        xmlhttp = new XMLHttpRequest();
        var pathArray = window.location.pathname.split('/');
        var newURL = vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail'
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //alert(xmlhttp.responseText)
                //var str = xmlhttp.responseText.replace(/\s/g, '')
                var str = xmlhttp.responseText
                if (!str) {
                    return;
                }


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
                    ptcell = mycode3
                }
            }
        }
        xmlhttp.open('GET', newURL, false);
        xmlhttp.send();
    }


    var myclass = document.getElementsByClassName('apptLink');
    //alert(myclass.length)
    for (var i = 0; i < myclass.length; i++) {
        var onclickvalue = myclass[i].getAttribute('onclick')
        //alert(onclickvalue)
        
        var x = "start_time="
        var z = "&demographic_no"
        var y = "&displaymode"

        var StartTime = onclickvalue.substring(
            onclickvalue.indexOf(x) + 11,
            onclickvalue.indexOf(z)
        );
        //alert("Start is "+StartTime)

        var demoNo = onclickvalue.substring(
            onclickvalue.indexOf(z) + 16,
            onclickvalue.indexOf(y)
        );
      
        var xx = "appointment_no="
        var zz = "&provider_no"

        var appNo = onclickvalue.substring(
            onclickvalue.indexOf(xx) + 15,
            onclickvalue.indexOf(zz)
        );
        //alert("AppNo is "+appNo)

        getMeasures('Cell Phone', demoNo);
        //alert("DemoNo " + demoNo + "  Cell " + formatPhoneNumber(ptcell))
        demoArrayVal[i] = formatPhoneNumber(ptcell)

        $(myclass[i]).before('&nbsp; <button type=\'button\' id=\'OTB\'>' + "☎" + '</button>')
        $(document.getElementById('OTB')).css('background-color', "pink");
      
      if(!demoArrayVal[i]){
        $(document.getElementById('OTB')).css('background-color', "gray");
        $(document.getElementById('OTB')).attr( "disabled", true );
      }
        $(document.getElementById('OTB')).css('font-size', '80%');
        $(document.getElementById('OTB')).attr('title', demoArrayVal[i]);
        $(document.getElementById('OTB')).attr('name', appNo);
        $(document.getElementById('OTB')).attr('id', 'OTB' + i);
        //$(document.getElementById('OTB' + i)).val(demoNo +":"+demoArrayVal[i]);
        $(document.getElementById('OTB' + i)).val(demoArrayVal[i]);
        var element = $(document.getElementById('OTB' + i))
        element.css({
            "padding": "1px"
        }) //remove padding

        //setCookie(appNo,"SET",0,"path=/"); 
       
        if(getCookie(appNo)== "SET"){
        element.css("background-color", "red");
        }

       document.getElementById('OTB' + i).addEventListener('click', function() {
            $(this).css("background-color", "red");
            //alert(this.name)
            setCookie(this.name,"SET",360,"path=/");
            //alert(getCookie(this.name))
            //unsafeWindow.refreshSameLoc('providercontrol.jsp?appointment_no=83307&provider_no=999998&status=&statusch=T&year=2021&month=9&day=3&view=0&displaymode=addstatus&dboperation=updateapptstatus&viewall=null');
            sendText(this.value)
        });

    }
}

/*
var start = 0
var x = $("html").html()
y =(x.indexOf("reason:"))
z =(x.indexOf("notes:"))

var mySubString = x.substring(y,z);
alert(mySubString)
*/


//alert(x.match(new RegExp("reason:" + "(.*)" + "notes:")))
//alert(x)
//alert(x.indexOf("reason:"))


//var y = "<a href=\"javascript: void();\" id=\"mybtn\" onclick=\"return !showMenu('2', event);\" onmousedown=\"callEligibilityWebService('../billing/CA/BC/ManageTeleplan.do','eligibilityMsg', event);\" style=\"background-color: yellow; color: red;\">Check Eligibility</a>"
//$('#appointmentTable > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(3) > a:nth-child(7)').after($(y))
//$('#mybtn').css("color","orange")


/*
$('*[id*=providerSchedule]:visible').each(function() {
    $(this).css('background-color', 'lightyellow')
});
*/

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')


function dslink() {
    window.open(vPath + 'report/reportdaysheet.jsp?dsmode=new&provider_no=' + this.getAttribute('foo') + '&sdate=' + this.getAttribute('foo2'))
    //alert(this.getAttribute('foo'))
    //alert(this.getAttribute('foo2'))
}

var inputs = document.getElementsByTagName('input')

for (var i = 0; i < inputs.length; i++) {

    if (inputs[i].type.toLowerCase() == 'button' && inputs[i].value == "DS") {
        inputs[i].style.backgroundColor = "yellow";
        var str = inputs[i].getAttribute('onclick')
        var res = str.split("'");
        inputs[i].setAttribute('foo', res[1]);
        inputs[i].setAttribute('foo2', res[3]);

        inputs[i].removeAttribute("onclick")
        inputs[i].addEventListener("click", dslink);
    }
}



var weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
    //alert(mytag[i].outerHTML)
    if (mytag[i].outerHTML.indexOf('providercontrol.jsp?year=') > -1) {
        var onclickvalue = mytag[i].innerHTML.trim() //alert(onclickvalue)
        var d = new Date(onclickvalue);
        if (d.getFullYear()) {
            //$(mytag[i]).css('background-color', 'yellow') /
            var n = weekday[d.getDay() + 1];
            if (n) {
                $(mytag[i]).append('_' + n)
            }
        }
    }
}
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //alert(vPath)
var greenline1 = 'HereonTime'
var greenline2 = 'HerebutLate'
var mybtcolor = ''
var arrivetime = ''
var diff = ''

function TimeColorSort() {}

function DateCalc(vad, vah, vam, vi) {
    var dtD = Date.parse(vad);
    var dtM = (parseInt(vah) * 60 + parseInt(vam))
    var d = new Date();
    var dh = d.getHours() * 60
    var dm = d.getMinutes()
    var vnow = dh + dm
    diff = (vnow - dtM)
    if (diff < 6) {
        mybtcolor = '#00ee00'
    }
    if (diff > 5) {
        mybtcolor = 'lightgreen'
    }
    if (diff > 10) {
        mybtcolor = 'Orange'
    }
    if (diff > 15) {
        mybtcolor = 'OrangeRed'
    }
    if (diff > 20) {
        mybtcolor = 'Red'
    }
    if (str.indexOf('provider_no=1&') > -1) { //to exclude this provider number
        // mybtcolor = '#00ee00'
    }
}

function Arrive() {
    var x = document.getElementsByClassName('appt');
    for (i = 0; i < x.length; i++) {
        str = x[i].innerHTML.replace(/\s+/g, '');
        if (str !== null && (str.indexOf(greenline1) > -1 || str.indexOf(greenline2) > -1)) { //green lines
            //  alert(dt)
            if (str !== null && str.indexOf('appointment_no') > -1 && str.indexOf('&amp;provider_') > -1) {
                //alert(str)
                var pstart = str.search('appointment_no')
                var pend = str.search('&amp;provider_')
                var AppNo = str.substring(pstart + 15, pend).toString()
            }
            var arrivetime = ''
            xmlhttp = new XMLHttpRequest();
            var pathArray = window.location.pathname.split('/');
            var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/appointment/appointmentcontrol.jsp?appointment_no=' + AppNo + '&displaymode=edit&dboperation=search'
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var str = xmlhttp.responseText; //local variable
                    if (!str) {
                        return;
                    }
                    str = str.replace(/\s+/g, '');
                    var myRe = /lastcreatedatetime/g
                    var ad = str.substring(str.search(myRe) + 34, str.search(myRe) + 44)
                    var ah = str.substring(str.search(myRe) + 44, str.search(myRe) + 46)
                    var as = str.substring(str.search(myRe) + 47, str.search(myRe) + 49)
                    arrivetime = str.substring(str.search(myRe) + 44, str.search(myRe) + 49)
                    if (arrivetime.indexOf('=') > -1) {
                        arrivetime = ' '
                    }
                    if (arrivetime) {
                        DateCalc(ad, ah, as, i)
                    }
                }
            }
            xmlhttp.open('GET', newURL, false);
            xmlhttp.send();
            $(x[i]).prepend('&nbsp; <button type=\'button\' id=\'OTB\'>' + diff + ' min' + '</button>')
            $(document.getElementById('OTB')).css('background-color', mybtcolor);
            //  $(document.getElementById('OTB')).css('font-size', '80%');
            $(document.getElementById('OTB')).attr('id', 'OTB' + i);
            var element = $(document.getElementById('OTB' + i))
            document.getElementById('OTB' + i).addEventListener('click', function() {
                //alert(this.id)
            });
        }
    }
    TimeColorSort()
} //-----------------------------------------------------------------------------------------

$(document.getElementById('expandReason')).after('&nbsp; <button type=\'button\' id=\'button0\' >Reason</button><button type=\'button\' id=\'button2\' >WaitTime</button><button type=\'button\' id=\'button3\' >SN</button><button type=\'button\' id=\'button4\' >TM</button><button type=\'button\' id=\'button1\' style="background-color: lime;">Reload</button>')
document.getElementById('button0').addEventListener('click', function() {
    var x = document.getElementsByClassName('appt');
    for (i = 0; i < x.length; i++) {
        yy = (x[i].innerHTML) //alert(yy)
        zz = (yy.indexOf('Reason'))
        oldstring = (yy.substring(0, zz - 10))
        newstring = yy.substring(zz + 31) //alert(newstring)
        $(x[i]).html(oldstring)
        $(x[i]).append('<br>' + newstring)
    }
})
$('#button4').css("background-color", "pink");
document.getElementById('button4').addEventListener('click', function() {
    AppMsg()
})
document.getElementById('button3').addEventListener('click', function() {
    window.open(vPath + 'oscarMessenger/CreateMessage.jsp')
})
document.getElementById('button1').addEventListener('click', function() {
    location.reload();
})
document.getElementById('button2').addEventListener('click', function() {
    Arrive();
})
