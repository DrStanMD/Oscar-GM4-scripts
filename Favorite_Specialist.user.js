// ==UserScript==
// @name        Favorite Specialist
// @namespace   StansScripts
// @description Copies Referral Doc details from the main list to your favorite specialist list
// @include     */billing/CA/BC/billingAddReferralDoc.jsp*
// @include     *oscarConsultationRequest/config/AddSpecialist.jsp*
// @include     *billing/CA/BC/billingManageReferralDoc*
// @include       *oscarEncounter/oscarConsultationRequest/ConsultationFormRequest*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version 15.2
// ==/UserScript==
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
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)
var x = window.location.toString()//alert(x)
if (x.indexOf('config/AddSpecialist.jsp') > - 1) {
  qlastname = getCookie('lastname')
  qfirstname = getCookie('firstname')
  qspecialty = getCookie('specialty')
  qaddress = getCookie('address')
  qphone = getCookie('phone')
  qfax = getCookie('fax')
  qrefno = getCookie('refno')
  document.getElementsByName('lastName') [0].value = qlastname
  document.getElementsByName('firstName') [0].value = qfirstname
  document.getElementsByName('specType') [0].value = qspecialty
  document.getElementsByName('address') [0].value = qaddress
  document.getElementsByName('phone') [0].value = qphone
  document.getElementsByName('fax') [0].value = qfax
  $('#EctConAddSpecialistForm').val(qrefno)
}
if (x.indexOf('billingManageReferralDoc') > - 1) {
  var flastname = document.getElementsByName('lastname');
  $(flastname).css('background-color', 'yellow');
}
if (x.indexOf('billingAddReferralDoc') > - 1) {
  var qlastname = document.getElementsByName('last_name') [0].value
  var qfirstname = document.getElementsByName('first_name') [0].value
  var qspecialty = document.getElementsByName('specialty') [0].value
  var qaddress = document.getElementsByName('address1') [0].value
  var qcity = document.getElementsByName('city') [0].value
  var qprov = document.getElementsByName('province') [0].value
  var qpostal = document.getElementsByName('postal') [0].value
  var qphone = document.getElementsByName('phone') [0].value
  var qfax = document.getElementsByName('fax') [0].value
  var qrefno = document.getElementsByName('referral_no') [0].value
  
  qaddress =  qaddress+", "+qcity+", "+qprov+", "+qpostal
  //alert(qaddress)
    
  setCookie('lastname', qlastname, 1, 'path=/');
  setCookie('firstname', qfirstname, 1, 'path=/');
  setCookie('specialty', qspecialty, 1, 'path=/');
  setCookie('address', qaddress, 1, 'path=/');
  setCookie('phone', qphone, 1, 'path=/');
  setCookie('fax', qfax, 1, 'path=/');
  setCookie('refno', qrefno, 1, 'path=/');
  //alert('cookie set')
  window.open(vPath + '/oscarEncounter/oscarConsultationRequest/config/AddSpecialist.jsp')
  window.close()
}
