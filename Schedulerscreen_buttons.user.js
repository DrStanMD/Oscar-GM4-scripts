// ==UserScript==
// @name        Schedulerscreen buttons
// @namespace   Stanscripts
// @description Adds navigation buttons to scheduler screen
// @include     *provider/providercontrol.jsp?year*
// @include     *provider/receptionistfindprovider.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// @version 15.2
// ==/UserScript==

//*********CUSTOM BUTTON NAME AND RBT TEMPLATE.ID*************************************************************************************
//ADD YOUR OWN RBT NAME HERE
var input15text = 'CDM\'s today'
var input18text = 'DVL'
//ADD TEMPLATE ID HERE
var input15var = 2
var input18var = 56

function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}//setCookie("homephone",qqhomephone,360,"path=/");

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
var x = window.location.toString()
if (x.indexOf('receptionistfindprovider') > - 1)
{
  //window.resizeTo(400, 600);
  //window.moveTo(500, 100);
  //alert(getCookie("theDefault"))
  var mytag = document.getElementsByTagName('a');
  for (var i = 0; i < mytag.length; i++) {
    if (mytag[i].innerHTML == getCookie('theDefault')) {
      $(mytag[i]).css('background-color', 'red')
    }
  } //window.close()

  setTimeout(function () {
    for (var i = 0; i < mytag.length; i++) {
      if (mytag[i].innerHTML == getCookie('theDefault')) {
        $(mytag[i]).css('background-color', 'green')        
        mytag[i].click()
      }
    }
  }, 1000);
}

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
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
var ProvNum = ''
if (params.provider_no) {
  ProvNum = params.provider_no
}
else
{  
var x = document.getElementsByName("weekview");
var ProviderDoc = x[0].getAttribute('onclick')
//alert(ProviderDoc)
if (ProviderDoc) {
  var pstart = 0
  var pend = ProviderDoc.indexOf("')")
  ProvNum = ProviderDoc.substring(pstart + 12, pend)
}
//alert(ProvNum)
//ProvNum = 1
}

function mySetDate(interval) {
  // set number of days to add
  // var interval = 45;
  var startDate = new Date();
  var expDate = startDate;
  expDate.setDate(startDate.getDate() + interval);
  //alert(expDate)
  dt = expDate
  //alert("Book an appointment for the week:  \n\n" + dt.toDateString())
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  vCal = vPath + 'provider/providercontrol.jsp?year=' + year + '&month=' + month + '&day=' + day + '&view=0&displaymode=day&dboperation=searchappointmentday&provider_no=' + ProvNum
  //alert(vCal)
  window.open(vCal, '_self');
}
var input = document.createElement('input');
input.type = 'button';
input.value = 'Print';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:0px;');
document.body.appendChild(input);
function showAlert()
{
  window.print()
  //qqappdate=getCookie("appdate")
  //qqapptime=getCookie("apptime")
  //qqappdoc=getCookie("appdoc")
  //alert(qqappdate+" @ " +qqapptime+ " with Dr. " + qqappdoc)
  //window.open(vPath + "eform/efmshowform_data.jsp?fid=60")
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Search';
input2.id = 'input2'
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:410px;');
document.body.appendChild(input2);
document.getElementById('input2').style.backgroundColor = 'Lime ';
function showAlert2()
{
  $('#search > a:nth-child(1)').click()
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Assign Docs';
input3.onclick = showAlert3;
input3.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:158px;');
document.body.appendChild(input3);
function showAlert3()
{
  $('a.tabalert').click()
}
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Upload Docs';
input4.onclick = showAlert4;
input4.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:280px;');
document.body.appendChild(input4);
function showAlert4()
{
  window.open(vPath + 'dms/documentUploader.jsp')
}
var input11 = document.createElement('input');
input11.type = 'button';
input11.value = 'Today';
input11.id = 'input11'
input11.onclick = showAlert11;
input11.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:20px;');
document.body.appendChild(input11);
document.getElementById('input11').style.backgroundColor = 'pink';
function showAlert11()
{
  dt = new Date()
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  vCal = vPath + 'provider/providercontrol.jsp?year=' + year + '&month=' + month + '&day=' + day + '&view=0&displaymode=day&dboperation=searchappointmentday&viewall=null'
  window.open(vCal, '_self');
}
var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'next day/week';
input5.id = 'input5'
input5.onclick = showAlert5;
input5.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:91px;');
document.body.appendChild(input5);
document.getElementById('input5').style.backgroundColor = 'pink';
function showAlert5()
{
  $('a.redArrow:nth-child(3) > img:nth-child(1)').click()
}
var input6 = document.createElement('input');
input6.type = 'button';
input6.value = '2 wks';
input6.id = 'input6'
input6.onclick = showAlert6;
input6.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:226px;');
document.body.appendChild(input6);
document.getElementById('input6').style.backgroundColor = 'pink';
function showAlert6()
{
  mySetDate(14)
}
var input7 = document.createElement('input');
input7.type = 'button';
input7.value = '3 wks';
input7.id = 'input7'
input7.onclick = showAlert7;
input7.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:292px;');
document.body.appendChild(input7);
document.getElementById('input7').style.backgroundColor = 'pink';
function showAlert7()
{
  mySetDate(21)
}
var input8 = document.createElement('input');
input8.type = 'button';
input8.value = '1 mnth';
input8.id = 'input8'
input8.onclick = showAlert8;
input8.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:358px;');
document.body.appendChild(input8);
document.getElementById('input8').style.backgroundColor = 'pink';
function showAlert8()
{
  mySetDate(28)
}
var input9 = document.createElement('input');
input9.type = 'button';
input9.value = '2 mnth';
input9.id = 'input9'
input9.onclick = showAlert9;
input9.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:434px;');
document.body.appendChild(input9);
document.getElementById('input9').style.backgroundColor = 'pink';
function showAlert9()
{
  mySetDate(60)
}
var input10 = document.createElement('input');
input10.type = 'button';
input10.value = '3 mnth';
input10.id = 'input10'
input10.onclick = showAlert10;
input10.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:510px;');
document.body.appendChild(input10);
document.getElementById('input10').style.backgroundColor = 'pink';
function showAlert10()
{
  mySetDate(90)
}
var input12 = document.createElement('input');
input12.type = 'button';
input12.value = '6 mnth';
input12.id = 'input12'
input12.onclick = showAlert12;
input12.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:586px;');
document.body.appendChild(input12);
document.getElementById('input12').style.backgroundColor = 'pink';
function showAlert12()
{
  mySetDate(180)
}
var input14 = document.createElement('input');
input14.type = 'button';
input14.value = 'Edit Specialist';
input14.id = 'input14'
input14.onclick = showAlert14;
input14.setAttribute('style', 'font-size:18px;position:fixed;bottom:28px;right:0px;');
document.body.appendChild(input14);
//document.getElementById("input14").style.backgroundColor = "white"; 
function showAlert14()
{
  window.open(vPath + 'oscarEncounter/oscarConsultationRequest/config/EditSpecialists.jsp')
}
var input15 = document.createElement('input');
input15.type = 'button';
input15.value = input15text;
input15.id = 'input15'
input15.onclick = showAlert15;
input15.setAttribute('style', 'font-size:18px;position:fixed;bottom:28px;right:135px;');
document.body.appendChild(input15);
//document.getElementById("input15").style.backgroundColor = "white"; 
function showAlert15()
{
  window.open(vPath + 'oscarReport/reportByTemplate/reportConfiguration.jsp?templateid=' + input15var + '&flag=1')
}
var input100 = document.createElement('input');
input100.type = 'button';
input100.value = 'Specialist';
input100.onclick = showAlert100;
input100.setAttribute('style', 'font-size:18px;z-index:1;position:fixed;bottom:0px;right:60px; ');
document.body.appendChild(input100);
function showAlert100()
{
  window.open(vPath + 'billing/CA/BC/billingManageReferralDoc.jsp')
}
var input18 = document.createElement('input');
input18.type = 'button';
input18.value = input18text;
input18.onclick = showAlert18;
input18.setAttribute('style', 'font-size:18px;position:fixed;bottom:28px;right:259');
document.body.appendChild(input18);
function showAlert18()
{
  window.open(vPath + 'oscarReport/reportByTemplate/reportConfiguration.jsp?templateid=' + input18var + '&flag=1')
}
var input19 = document.createElement('input');
input19.type = 'button';
input19.value = 'Stan Today';
input19.id = 'input19'
input19.onclick = showAlert19;
input19.setAttribute('style', 'font-size:18px;position:fixed;bottom:60px;right:0px;');
document.body.appendChild(input19);
document.getElementById('input19').style.backgroundColor = 'pink';
function showAlert19()
{
  dt = new Date()
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  var theDefault = 'Stan Group' // 'Stan Group';
  setCookie("theDefault",theDefault,360,"path=/");
  vCal = vPath + 'provider/providercontrol.jsp?year=' + year + '&month=' + month + '&day=' + day + '&view=0&displaymode=day&dboperation=searchappointmentday&viewall=null'
  window.open(vCal, '_self');
  unsafeWindow.findProvider()
}
var input13 = document.createElement('input');
input13.type = 'button';
input13.value = 'Locum';
input13.id = 'input13'
input13.onclick = showAlert13;
input13.setAttribute('style', 'font-size:18px;position:fixed;bottom:90px;right:0px;');
document.body.appendChild(input13);
document.getElementById('input13').style.backgroundColor = 'yellow';
function showAlert13() {
  unsafeWindow.findProvider()
  var theDefault = 6 // 'Ghobassy, Bahar';
  window.location.href = vPath + 'provider/providercontrol.jsp?year=2019&month=12&day=02&view=0&displaymode=day&dboperation=searchappointmentday&provider_no='+theDefault
  setCookie("theDefault",theDefault,360,"path=/");
}

//link to Ocus
$('#firstTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > a:nth-child(2)').attr('onclick', '');
$('#firstTable > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > a:nth-child(2)').click(function() {
window.open('http://www.oscarcanada.org')
});


