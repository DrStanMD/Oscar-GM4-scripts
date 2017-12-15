// ==UserScript==
// @name        Print Appointment
// @namespace   Stanscripts
// @description Copies details for print appointment label html eform (Set your own specific fid form number)
// @include     *appointment/appointmentcontrol.jsp*
// @include     *appointment/addappointment.jsp*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
//************************************************************
var myFID = '61' // INSERT YOU OWN FORM ID (fid=??) HERE
//************************************************************
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')
//get parameters
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
demoNo = params.demographic_no
//alert(demoNo)
//********************************
var city = '';
var address = '';
var DOB = '';
var HCN = '';
var HCVC = '';
var fName = '';
var lName = '';
var prov = '';
var postalCode = '';
var postalCode2 = '';
var sex = '';
var phone = '';
var rostered = '';
var rostered3 = '';
var rostered2 = '';
var email = '';
var cell = '';
var Age = ''
var fulladdress = ''
var work = ''
//alert(vPath)
$.ajax({
  url: vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&displaymode=edit&dboperation=search_detail',
  dataType: 'html',
  success: function (data) {
    var demographics = [
    ];
    $(data).find('div.demographicSection li').each(function () {
      demographics.push({
        'label': $(this).children('.label').text(),
        'text': $(this).children('.info').text()
      });
    });
    var demoStr = JSON.stringify(demographics);
    console.log(demoStr);
    //alert(demoStr)
    //===========Cookies===============
    function setCookie(cname, cvalue, exdays, cpath)
    {
      var d = new Date();
      //d.setTime(d.getTime()+(exdays*24*60*60*1000));
      d.setTime(d.getTime() + (exdays * 5000));
      var expires = 'expires=' + d.toGMTString();
      document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
    }
    work = demoStr.substring(demoStr.indexOf('Phone(W):') + 19, demoStr.indexOf('"},{"label":"Cell Phone:'));
    email = demoStr.substring(demoStr.indexOf('Email:') + 16, demoStr.indexOf('"},{"label":"Newsletter:"'));
    cell = demoStr.substring(demoStr.indexOf('Cell Phone:') + 21, demoStr.indexOf('"},{"label":"Address'));
    lName = demoStr.substring(demoStr.indexOf('Last Name:') + 20, demoStr.indexOf('"},{"'));
    fName = demoStr.substring(demoStr.indexOf('First Name:') + 21, demoStr.indexOf('"},{"label":"Title:'));
    sex = demoStr.substring(demoStr.indexOf('Sex:') + 14, demoStr.indexOf('Sex:') + 15);
    DOB = demoStr.substring(demoStr.indexOf('DOB:') + 5, demoStr.indexOf('DOB:') + 15);
    Age = demoStr.substring(demoStr.indexOf('"label":"Age:') + 23, demoStr.indexOf('(DOB:'));
    prov = demoStr.substring(demoStr.indexOf('Province :","text') + 20, demoStr.indexOf('Province :","text') + 22);
    postalCode = demoStr.substring(demoStr.indexOf('Postal :","text') + 18, demoStr.indexOf('Postal :","text') + 21);
    postalCode2 = demoStr.substring(demoStr.indexOf(postalCode) + 3, demoStr.indexOf(postalCode) + 7);
    postalCode2 = postalCode2.trim();
    postalCode2 = postalCode2.substring(0, 3);
    phone = demoStr.substring(demoStr.indexOf('Phone(H):') + 19, demoStr.indexOf('"},{"label":"Phone(W):'));
    address = demoStr.substring(demoStr.indexOf('Address:","text":"') + 18, demoStr.indexOf('"},{"label":"City:'));
    city = demoStr.substring(demoStr.indexOf('City:","text":"') + 15, demoStr.indexOf('tProvince') - 44);
    fulladdress = address + '<br>' + city + ', ' + prov + '.<br>' + postalCode + ' ' + postalCode2
    //alert(fulladdress)
    HCN = demoStr.substring(demoStr.indexOf('Health Ins. #:') + 18, demoStr.indexOf('},{"label":"HC Type:"'));
    HCVC = HCN.substring(HCN.length - 3, HCN.length - 1);
    HCN = HCN.substring(6, 16);
    res = HCN.slice(0, 4)
    res = res + ' ' + HCN.slice(4, 7)
    res = res + ' ' + HCN.slice(7)
    HCN = res + ' ' + prov
    // alert(HCN)
    rostered = demoStr.substring(demoStr.indexOf('Roster Status') + 24);
    rostered2 = rostered.charAt(0);
    rostered3 = rostered.charAt(1);
    rostered = rostered2.concat(rostered3);
    setCookie('qemail', email, 360, 'path=/');
    setCookie('qcell', cell, 360, 'path=/');
    setCookie('qphone', phone, 360, 'path=/');
    setCookie('qfName', fName, 360, 'path=/');
    setCookie('qlName', lName, 360, 'path=/');
    setCookie('qDOB', DOB, 360, 'path=/');
    setCookie('qAge', Age, 360, 'path=/');
    setCookie('qsex', sex, 360, 'path=/');
    setCookie('qPHN', HCN, 360, 'path=/');
    setCookie('qfulladdress', fulladdress, 360, 'path=/');
    setCookie('qwork', work, 360, 'path=/');
    var addemail = ('email: ' + email + '   '
    + '<a href="mailto:' + email + '?Subject=Confidential medical information" target="_blank">Send Mail</a>')
   // alert(addemail)
  }
});
//************************************
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement)
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
}
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
  qqappdate = getCookie('appdate')
  qqapptime = getCookie('apptime')
  qqappdoc = getCookie('appdoc')
  //window.open(vPath + "/eform/efmformadd_data.jsp?fid="+myFID+"&demographic_no=1&appointment=" + app_prov_no)
  window.open(vPath + '/eform/efmshowform_data.jsp?fid=' + myFID)
  $('#addButton').click()
  $('#updateButton').click()
}
