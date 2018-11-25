// ==UserScript==
// @name        Tickler Screen Buttons
// @namespace   Stanscripts
// @description Places Add, Delete, Complete buttons at top of screen, Echart link, high highlight
// @include     *tickler/ticklerMain.jsp*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version    15.2
// @grant       GM_log
// ==/UserScript==
//this.$ = this.jQuery = jQuery.noConflict(true);

var string1 = 'recall'.toUpperCase() // orange when high priority
var string2 = 'appointment'.toUpperCase() //lightgreen but orange when high priority
var string3 = 'appt'.toUpperCase() //lightgreen but orange when high priority
var string4 = 'payment'.toUpperCase() //pink
//high priority is yellow

var myemail = ''
var demo_no = ''
function expand_nextapp()
{
  for (var i = 0; i < mytag.length; i++) //display first 20 next dates
  {
    var button2Id = 'app_' + i    //var button2Id = 'app2_' + i
    if (document.getElementById(button2Id))
    {
      document.getElementById(button2Id).click()
    }
  }
}
function do_nextapp()
{
  //alert(this.value)
  demo_no = this.value //alert(demo_no)
  getAppointment() //alert(myappointment)
  if (/\S/.test(myappointment)) {
    //alert('Next appointment is ' + myappointment)
    $(this).html(myappointment)
    $(this).css({
      fontSize: 10
    });
    $(this).css('background-color', '#08e8de') //#08e8de  #39FF14  #08e8de
  } 
  else
  {
    $(this).text('None')
  }
}
function validateEmail(emailField) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var x = re.test(String(emailField)) //alert(x)
  if (x == false)
  {
    alert('Invalid Email Address');
    return false;
  } 
  else
  {
    //alert(emailField);
    var mailto_link = 'mailto:' + myemail + '?Subject=Confidential medical information'
    window = window.open(mailto_link, 'emailWindow')
    return true;
  }
}
function do_email() {
  //alert(this.value)
  demo_no = this.value
  getMeasures('Email')
  if (myemail) {
    validateEmail(myemail)
  } 
  else {
    alert('no email address on file')
  }
}
function getAppointment() {
  // alert("HI")
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail' //window.open(newURL)
  //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText
      if (!str) {
        return;
      }
      var myReString = '<span style="margin-left: 20px;font-style:italic">' + '(.|[\n])*' //var myReString = '<span class="label">' + measure + '(.|[\n])*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() //
        //alert(y)
        var z = y.indexOf('Next Appointment')
        var mycode = y.substring(z + 18) //alert(mycode)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2)
        myappointment = mycode3
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
} //****************************

function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail' //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText
      if (!str) {
        return;
      }
      var myReString = '<span class="label">' + measure + '(.|[\n])*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() //alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
        myemail = mycode3
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
} //*****************************

var demo_no = ''
window.resizeTo(1280, 780);
// http://stackoverflow.com/questions/12146445/jquery-in-greasemonkey-1-0-conflicts-with-websites-using-jquery
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var input = document.createElement('input');
input.type = 'button';
input.value = 'Add Tickler';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:600px;');
document.body.appendChild(input);
function showAlert() {
  window.open(vPath + 'tickler/ticklerAdd.jsp')
}
var input0 = document.createElement('input');
input0.type = 'button';
input0.id = 'input0';
input0.value = 'Expand next app...(all)';
input0.onclick = expand_nextapp;
input0.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:800px;');
var mycheckbox0 = '<input name=\'checkbox0\' id=\'checkbox0\' type=\'checkbox\' style=\'position:fixed;top:28px;right:780px;\'>'
document.body.appendChild(input0);
$('#input0').css('background-color', 'pink')
$('#input0').after(mycheckbox0)
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Complete';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:520px;');
document.body.appendChild(input1);
function showAlert1() {
  document.forms['ticklerform'].submit_form.value = 'Complete';
  document.forms['ticklerform'].submit();
  value = 'Complete';
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Delete';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:460px;');
document.body.appendChild(input2);
function showAlert2() {
  document.forms['ticklerform'].submit_form.value = 'Delete';
  document.forms['ticklerform'].submit();
  value = 'Delete';
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Cancel';
input3.onclick = showAlert3;
input3.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:400px;');
document.body.appendChild(input3);
function showAlert3() {
  window.close()
}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
var today = yyyy + '-' + mm + '-' + dd;
ClassArray = [
  'whiteRed',
  'white',
  'lilacRed',
  'lilac'
]
function highP(myclass) {
  var myhigh = ''
  myP = document.getElementsByClassName(myclass)
  for (var i = 0; i < myP.length; i++) {
    if (myP[i]) {
      if (myP[i].innerHTML.toUpperCase().indexOf(string2) > - 1 || myP[i].innerHTML.toUpperCase().indexOf(string3) > - 1) {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 9 + ii].style.backgroundColor = 'lightgreen';
        }
      }
      if (myP[i].innerHTML.toUpperCase().indexOf(string4) > - 1) {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 9 + ii].style.backgroundColor = 'pink';
        }
      }
    }
  }
  for (var i = 0; i < myP.length; i++) {
    if (myP[i]) {
      if (myP[i].innerHTML.trim() == 'High') {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 6 + ii].style.backgroundColor = 'yellow';
          //************
          //alert(myP[i+3].innerHTML.toUpperCase())
          if (myP[i + 3].innerHTML.toUpperCase().indexOf(string1) > - 1)
          {
            myP[i - 6 + ii].style.backgroundColor = 'orange';
          }
          if (myP[i + 3].innerHTML.toUpperCase().indexOf(string2) > - 1 || myP[i + 3].innerHTML.toUpperCase().indexOf(string3) > - 1)
          {
            //alert()
            myP[i - 6 + ii].style.backgroundColor = 'orange';
          } //***********

        }
      }
    }
  }
}
for (var j = 0; j < ClassArray.length; j++) {
  highP(ClassArray[j])
}
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
  //for (var i = 0; i < 200; i++) {
  var onclickvalue = mytag[i].getAttribute('onclick')
  if (onclickvalue !== null && onclickvalue.indexOf('demographic_no') > - 1) {
    var mycolor = $(mytag[i]).parents().css('backgroundColor')
    var pstart = onclickvalue.search('demographic_no')
    var pend = onclickvalue.search('&displaymode=')
    IdNum = onclickvalue.substring(pstart + 15, pend).toString() //demo_no = IdNum
    //getMeasures('Email')
    //alert(myemail)
    var buttonId = 'email_' + i //alert(buttonId)
    var button2Id = 'app_' + i //alert(button2Id)
    var emailbutton = '<button type="button" id="' + buttonId + '">Email</button>' //value="'+myemail+'"
    var appbutton = '<button type="button" id="' + button2Id + '">Next</button>'
    var myLink = '<b><span><a target=/_blank/ href=' + vPath + 'oscarEncounter/IncomingEncounter.do?providerNo=1&amp;appointmentNo=&amp;demographicNo=' + IdNum + '&amp;curProviderNo=&amp;reason=Tel-Progress+Notes&amp;encType=&amp;curDate=' + today + '&amp;appointmentDate=&amp;startTime=&amp;status=\');return false;\'>...Echart </a>' //$(mytag[i]).after(myLink + '<br>' + emailbutton + ' ' + appbutton);
    //$(mytag[i]).after(myLink);
    $(mytag[i]).after(myLink + '<br>' + emailbutton + appbutton);
    document.getElementById(buttonId).value = IdNum
    document.getElementById(buttonId).onclick = do_email;
    document.getElementById(buttonId).setAttribute('style', 'font-size:8px;');
    document.getElementById(button2Id).onclick = do_nextapp;
    document.getElementById(button2Id).setAttribute('style', 'font-size:8px;');
    //document.getElementById(button2Id).style.width = '6px';
    //document.getElementById(buttonId).style.width = '6px';
    document.getElementById(button2Id).value = IdNum
    $('#' + buttonId).css('background-color', mycolor)
    $('#' + button2Id).css('background-color', mycolor)
    $('#' + button2Id).css('border', mycolor);
    $('#' + buttonId).css('border', mycolor);
    //document.getElementById(button2Id).style.visibility = "hidden";
    //document.getElementById(buttonId).style.visibility = 'hidden';
  }
}/*
for (var i = 0; i < 200; i++) //display first 20 next dates
{
  var button2Id = 'app_' + i
  if (document.getElementById(button2Id))
  {
    document.getElementById(button2Id).click()
  }
}
*/
