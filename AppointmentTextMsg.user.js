// ==UserScript==
// @name        Appointment Text Message
// @namespace   Stanscript
// @include     *providercontrol.jsp?year*
// @description Sends Text to alert appointment ready
// @version     15.1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js

// @grant       none
// ==/UserScript==

//UPDATE THE FOLLOWING 4 PARAMETERS USING YOUR OWN ACCOUNT INFORMATION
var twilio_id = ''; // Twilio AccountSID
var twilio_auth = ''; // Twilio Auth Token
var twilio_number = '+1604xxxxxxx'; // Twilio phone number

var doctor = "Your Lastname"

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

var input113 = document.createElement('input');
input113.type = 'button';
input113.value = 'Update TM';
input113.id = 'sendText';
input113.onclick = showAlert113;
input113.setAttribute('style', 'font-size:18px;position:fixed;top:60px;right:0px;');
document.body.appendChild(input113);
document.getElementById('sendText').style.backgroundColor = 'lime';

function showAlert113() {
    AppMsg()
}
