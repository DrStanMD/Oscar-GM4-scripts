// ==UserScript==
// @name           Referral form customize
// @namespace      oscar
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include                *oscarEncounter/RequestConsultation.do*
// ==/UserScript==

function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}
//*****************************************************************

x = document.getElementById('clinicFax').innerHTML
var qq = $('.leftPatient').html()
var a = ($('.patientInfo').html())
var b = ('<font size="2"><hr>'
+ 'Appointment Date and Time:<p>.<p>'
+ '<div align="left"><input type="checkbox" >Patient advised<br></font></div>')
var position = a.indexOf('</tbody></table>') + 18
var output = [
  a.slice(0, position),
  b,
  a.slice(position)
].join('');
$('.leftPatient').html('<font size="3">Patient....................................................</u><br><b>' + getCookie('qlName') + ',  ' + getCookie('qfName') + '</b> (Age: ' + getCookie('qAge') + ' ' + getCookie('qsex') + ')<br>'
//+ '</div>'
+ 'Birthdate: </u>' + getCookie('qDOB') + ' (y/m/d)<br>'
+ 'PHN: </u>' + getCookie('qPHN')
+ '<hr></div></font><font size="2">'
+ getCookie('qfulladdress') + '<hr>'
+ '<div align="left"></b>'
+ 'Home Phone: ' + '<b>' + getCookie('qphone') + '</b><br>'
+ 'Cell Phone: ' + '<b>' + getCookie('qcell') + '</b><br>'
+ 'Work Phone: ' + '<b>' + getCookie('qwork') + '</b><br>'
+ 'email: ' + getCookie('qemail')
+ '   ' + '<a href="mailto:' + getCookie('qemail') + '?Subject=Confidential medical information" target="_top">Send Mail</a>'
+ '</div></b><hr><input type="checkbox" >Patient consents to email contact<br>'
//+ 'Appointment Date and Time:<p>.<p>'
//+ '<input type="checkbox" >Patient advised<br></font>'
);
var newright = $('.leftPatient').html()
$('.patientInfo').html(output)
$('.leftPatient').html(newright)
var input0 = document.createElement('input');
input0.type = 'button';
input0.value = 'OldFormat';
input0.onclick = ButtonFunction0;
input0.setAttribute('style', 'font-size:12px;position:fixed;top:15px;left:720px;');
//document.body.appendChild(input1); 
$('.header > tbody:nth-child(1)').append(input0)
function ButtonFunction0() {
  $('.leftPatient').html(qq)
  mytable.html(oldtable)
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Addendum';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:15px;left:600px;');
//document.body.appendChild(input1); 
$('.header > tbody:nth-child(1)').append(input1)
function ButtonFunction1() {
  mytable.html('<div style=\'border-width: 4px;  border-style: double; border-color: black; font-size: 14pt\'>ADDENDUM to our previous note<br>Please see below</div>')
}
owner = $('#clinicName > b:nth-child(1)').html()
mytable = $('.printTable > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > font:nth-child(2) > b:nth-child(1)')
var oldtable = mytable.html()
//alert(oldtable)
//mytable.css("background-color","yellow");
//mytable.html('Please contact the patient directly with your appointment details <br> or reply to ' + owner + ' by fax with appointment')
//mytable.html('<font size="3"></b>WE WOULD APPRECIATE YOU CONTACTING THE PATIENT DIRECTLY<br>WITH THEIR APPOINTMENT DETAILS AND INSTRUCTIONS</b>.<br>'
mytable.html('<font size="3"></b>We would appreciate you contacting the patient directly<br>with their appointment details and instructions</b>.<br>'
//+ 'Home: ' + getCookie('qphone') + '....Cell: ' + getCookie('qcell') + '....email:  ' + getCookie('qemail')
+ 'Please forward appointment details to' + x + ' for our records.</font></b>')
for (i = 1; i < 30; i++) {
  mylink = $('.printTable > tbody:nth-child(1) > tr:nth-child(' + i + ') > td:nth-child(1)')
  var n = mylink.text().indexOf('Associated with :');
  if (n > 0) {
    mylink.text('Thank you and best regards,')
  }
}
