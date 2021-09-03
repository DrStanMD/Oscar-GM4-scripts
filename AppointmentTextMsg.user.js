// ==UserScript==
// @name        Appointment Text Message
// @namespace   Stanscript
// @include     *providercontrol.jsp?year*
// @description Sends Text to alert appointment ready
// @version     15.0
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

var demoArrayVal = []
var ptcell
var doctor = "Doctor's Lastname"
var myTextMessage = "Appointment reminder." +
    "                                          \n" +
    "Your telephone appointment with Dr. " + doctor + " will commence shortly.  \n" +
    "Please ensure that your cellphone is available to take the call.  \n" +
    "                                          \n" +
    "Thank you,\n" +
    "                                          \n" +
    "Dr. " + doctor + "'s office."

//alert(myTextMessage)

function sendText(patientCell) {

    //Disable trilio confirm logon
    //http://forums.mozillazine.org/viewtopic.php?p=978207
    //1. Type about:config on the location bar and press Enter.
    //2. Right-click in the empty space and select New|Integer.
    //3. Input network.http.phishy-userpass-length as the name and 1024 as the value. 

    //UPDATE THE FOLLOWING 4 PARAMETERS USING YOUR OWN ACCOUNT INFORMATION
    var twilio_id = ''; 	// Twilio AccountSID
    var twilio_auth = ''; // Twilio Auth Token
    var twilio_number = '+1604XXXXXX'; // Twilio phone number

    /*
    var confirmSend = confirm('Sending: "' + myTextMessage + '" to ' + patientCell);
    if (!confirmSend) {
      return;
    }
    */


    var url = 'https://' + twilio_id + ':' + twilio_auth + '@api.twilio.com/2010-04-01/Accounts/' + twilio_id + '/Messages';
    //window.open(url)  //using a form in a hidden iframe to send a POST to Twilio Server. Please suggest improvement if you have a simpler way to send to twilio.
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
        //return '(' + match[1] + ') ' + match[2] + '-' + match[3];
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

    getMeasures('Cell Phone', demoNo);
    //alert("DemoNo " + demoNo + "  Cell " + formatPhoneNumber(ptcell))
    demoArrayVal[i] = formatPhoneNumber(ptcell)

    $(myclass[i]).before('&nbsp; <button type=\'button\' id=\'OTB\'>' + "☎" + '</button>')
    $(document.getElementById('OTB')).css('background-color', "pink");
    $(document.getElementById('OTB')).css('font-size', '80%');
    $(document.getElementById('OTB')).attr('id', 'OTB' + i);
    //$(document.getElementById('OTB' + i)).val(demoNo +":"+demoArrayVal[i]);
    $(document.getElementById('OTB' + i)).val(demoArrayVal[i]);
    var element = $(document.getElementById('OTB' + i))
    element.css({
        "padding": "1px"
    }) //remove padding
    document.getElementById('OTB' + i).addEventListener('click', function() {
        //alert(this.value)
        $(this).css("background-color", "red");
        sendText(this.value)
    });

    //alert(formatPhoneNumber(ptcell))
    //alert(demoArrayVal[i])

}
