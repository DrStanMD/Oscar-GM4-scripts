// ==UserScript==
// @name        Print Appointment
// @namespace   Stanscripts
// @description Copies details for print appointment label html eform (Set your own specific fid form number)
// @include     *appointment/appointmentcontrol.jsp*
// @include     *appointment/addappointment.jsp*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version 15.1
// @grant       none
// ==/UserScript==
//************************************************************
var myFID = '61' // INSERT YOU OWN FORM ID (fid=??) HERE
//************************************************************
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //get parameters
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
var demoNo = params.demographic_no 
//alert(demoNo)
var apptno = params.appointment_no
var provNo = params.provider_no
//********************************
var demoArray = [
  //'CellPhone',
  //'Phone(H)',
  //'Address',
  //'City',
  //'Postal',
  //'Age',
  //'HealthIns.#'
  'Email'
]
var demoArrayVal = [
]
var myemail = ""
var add_one = 0
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
 // var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&displaymode=edit&dboperation=search_detail'
  var newURL = vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&apptProvider=' +provNo+ '&appointment=' +apptno+ '&displaymode=edit&dboperation=search_detail'
  //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText)
      var str = xmlhttp.responseText.replace(/\s/g, '')
      if (!str) {
        return;
      } 
      //var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'
      var myReString = '<spanclass="label">' + measure + '.*/s*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() // 
        //alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) 
        //alert(j+measure + ' is ' + mycode3)
        demoArrayVal[add_one] = mycode3        
        //alert(demoArrayVal[add_one])
        //alert(demoArrayVal.length)
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
$(document).ready(function () {
  for (j = 0; j < demoArray.length; j++) {
    getMeasures(demoArray[j]);
    add_one = add_one + 1
  }
  //alert(demoArrayVal[0]) //This is the email
  myemail = demoArrayVal[0]
  alert(myemail)
})
//===========Cookies===============
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
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
}//==========End Cookie================

var input = document.createElement('input');
input.type = 'button';
input.value = 'Save Appointment and Print Label';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;bottom:20px;right:100px; ');
document.body.appendChild(input);
function showAlert() {
  qappdate = $('li.row:nth-child(1) > div:nth-child(2) > input:nth-child(1)').val()
  qapptime = $('li.row:nth-child(2) > div:nth-child(2) > input:nth-child(1)').val()
  if ($('li.row:nth-child(4) > div:nth-child(5) > input:nth-child(1)').val()) {
    qappdoc = $('li.row:nth-child(4) > div:nth-child(5) > input:nth-child(1)').val()
  }
  if ($('li.row:nth-child(3) > div:nth-child(5) > input:nth-child(1)').val()) {
    qappdoc = $('li.row:nth-child(3) > div:nth-child(5) > input:nth-child(1)').val()
  }
  if ($('li.row:nth-child(5) > div:nth-child(2) > input:nth-child(1)').val()) {
    qapppt = $('li.row:nth-child(5) > div:nth-child(2) > input:nth-child(1)').val()
  }
  if ($('li.row:nth-child(4) > div:nth-child(2) > input:nth-child(1)').val()) {
    qapppt = $('li.row:nth-child(4) > div:nth-child(2) > input:nth-child(1)').val()
  }
  setCookie('appdate', qappdate.toString(), 100, 'path=/');
  setCookie('apptime', qapptime, 100, 'path=/');
  setCookie('appdoc', qappdoc, 100, 'path=/');
  setCookie('apppt', qapppt, 100, 'path=/');
  setCookie('qemail', myemail, 10, 'path=/');
  qqappdate = getCookie('appdate')
  qqapptime = getCookie('apptime')
  qqappdoc = getCookie('appdoc')  //window.open(vPath + "/eform/efmformadd_data.jsp?fid="+myFID+"&demographic_no=1&appointment=" + app_prov_no)
  window.open(vPath + '/eform/efmshowform_data.jsp?fid=' + myFID)  
  $('#addButton').click()
  $('#updateButton').click()
}


