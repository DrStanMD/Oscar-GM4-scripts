// ==UserScript==
// @name        Demographic copy
// @namespace   StansScripts
// @description Copies and pastes address/phone form master screen new demographic.  Adds email link. Inserts Dymo label button.
// @include     *demographic/demographiccontrol.jsp?demographic_no*
// @include     *demographic/demographiccontrol.jsp?displaymode=*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.3.1
// ==/UserScript==

//=========Check for Quebec============
var theDefault='QC-Quebec';
var theOptions = document.getElementsByName('hc_type')[0].options;

for (var theOption of theOptions)
{for (var i=0; i<3; i++) {}
	if(typeof(theOption)=='object'){
		if(theOption.selected==true){      
    if(theOption.text==theDefault){
     alert('We are unable to accept Quebec Medical.  Please hand the card back to the patient and advise that this a private pay service.')
			break;
     }
		}
	}
}


function validateEmail(emailField) {
  if (emailField != '') {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var x = re.test(String(emailField)) //alert(x)
    if (x == false)
    {
      //alert('Invalid Email Address');
      return false;
    }
  }
}
var x = document.getElementsByName('email');
$(x[0]).blur(function () {
  validateEmail(this.value)
});
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
}//alert(getCookie('adobe_email'))
//alert(localStorage.getItem("adobe_email"));

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement)
var myParam = location.search.split('demographic_no=') [1]
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res)
var formPath = vPath + '/eform/efmformadd_data.jsp?fid=37&demographic_no=' + demo_no // INSERT YOU OWN FORM ID (fid=??) HERE
//alert($('input[name=\'address\']').val())
//alert(formPath)
/*
var input3=document.createElement("input");
input3.type="button";
input3.value="Paste Mum's PHN";
input3.onclick = showAlert3;
input3.setAttribute("style", "font-size:18px;position:fixed;bottom:0px;left:260px;");
document.body.appendChild(input3); 
 function showAlert3()
{
 $('input[name=\'hin\']').val(getCookie('phn')); //Postal
 $('input[name=\'last_name\']').val(getCookie('lastname')); //Home phone
}
*/
//*************************************************************************************
$('#appt_table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > a:nth-child(3)').css('background-color', 'yellow')
$('#appt_table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > a:nth-child(3)').ready(function () {
  callEligibilityWebService('../billing/CA/BC/ManageTeleplan.do', 'returnTeleplanMsg')
});
// alert($('#menu2').text())
setTimeout(function () {
  var msg = ($('#menu2').text())
  var elig = msg.indexOf('ELIG_ON_DOS: YES') // alert(elig>-1)
}, 2000);
//*********************************************************************************
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Paste Details';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:130px;');
document.body.appendChild(input2);
function showAlert2()
{
  $('input[name=\'phone\']').val(getCookie('homephone')); //Home phone
  $('input[name=\'phone2\']').val(getCookie('workphone')); //Work phone
  $('input[name=\'address\']').val(getCookie('address')); //address
  $('input[name=\'demo_cell\']').val(getCookie('cellphone')); //cell phone
  $('input[name=\'city\']').val(getCookie('city')); //City
  $('input[name=\'postal\']').val(getCookie('postal')); //Postal
  $('input[name=\'email\']').val(getCookie('email')); //email
  $('select[name=\'province\'] option:selected').text(getCookie('province')) //province
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Print Dymo Label';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:0px;');
document.body.appendChild(input1);
function showAlert1()
{
  window.open(formPath)
}
var input = document.createElement('input');
input.type = 'button';
input.value = 'Copy Details';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;left:0px;');
document.body.appendChild(input);
function showAlert()
{
  setCookie('homephone', qqhomephone, 360, 'path=/');
  setCookie('workphone', qqworkphone, 360, 'path=/');
  setCookie('address', qqaddress, 360, 'path=/');
  setCookie('cellphone', qqcellphone, 360, 'path=/');
  setCookie('city', qqcity, 360, 'path=/');
  setCookie('province', qqprovince, 360, 'path=/');
  setCookie('postal', qqpostal, 360, 'path=/');
  setCookie('phn', qqphn, 360, 'path=/');
  setCookie('lastname', qqlastname, 360, 'path=/');
  setCookie('firstname', qqfirstname, 360, 'path=/');
  setCookie('email', qqemail, 360, 'path=/');
  window.close() //window.open(vPath + "/demographic/search.jsp","","width=900, height=600")
}
var qqcellphone = $('input[name=\'demo_cell\']').val();
var qqcity = $('input[name=\'city\']').val();
var qqpostal = $('input[name=\'postal\']').val();
var qqhomephone = $('input[name=\'phone\']').val();
var qqlastname = $('input[name=\'last_name\']').val();
var qqfirstname = $('input[name=\'first_name\']').val();
var qqaddress = $('input[name=\'address\']').val();
var qqphn = $('input[name=\'hin\']').val();
var qqworkphone = $('input[name=\'phone2\']').val();
var qqemail = $('input[name=\'email\']').val();
var qqprovince = $('select[name=\'province\'] option:selected').val() //**********************************************************
$('#contactInformation > ul:nth-child(2) > li:nth-child(1) > span:nth-child(2)').css('background-color', 'yellow'); //Home phone
$('#contactInformation > ul:nth-child(2) > li:nth-child(4) > span:nth-child(2)').css('background-color', 'yellow'); //address
$('#contactInformation > ul:nth-child(2) > li:nth-child(3) > span:nth-child(2)').css('background-color', 'aqua'); //cell phone
$('#contactInformation > ul:nth-child(2) > li:nth-child(5) > span:nth-child(2)').css('background-color', 'yellow'); //City
$('#contactInformation > ul:nth-child(2) > li:nth-child(6) > span:nth-child(2)').css('background-color', 'yellow'); //Province
$('#contactInformation > ul:nth-child(2) > li:nth-child(8) > span:nth-child(2)').css('background-color', 'yellow'); //Postal
$('#healthInsurance > ul:nth-child(2) > li:nth-child(1) > span:nth-child(2)').css('background-color', 'pink'); //PHN
//**********************************************************
$('input[name=\'address\']').css('background-color', 'yellow');
//$('input[name=\'province\']').css('background-color', 'yellow');
$('input[name=\'demo_cell\']').css('background-color', 'aqua');
$('input[name=\'city\']').css('background-color', 'yellow');
$('input[name=\'postal\']').css('background-color', 'yellow');
$('input[name=\'phone\']').css('background-color', 'yellow');
$('input[name=\'phone2\']').css('background-color', 'yellow');
$('input[name=\'email\']').css('background-color', 'yellow');

var x = $('input[name=\'email\']').val()
var y = qqfirstname+' '+qqlastname+'<'+$('input[name=\'email\']').val()+'>'
//alert(x)
//setCookie('adobe_email',y, 360, 'path=/');
//alert(getCookie('adobe_email'))
//localStorage.setItem('adobe_email', x);
//localStorage.setItem("FullName", "Harvey Smith");

var z = '<a href="mailto:' + y + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
//var z = '<a href="mailto:' + x + '?Subject='+qqfirstname+' '+qqlastname+' - Confidential medical information&body=www.cnn.com" target="_blank">Send Mail</a>'
$('#contactInformation > ul:nth-child(2) > li:nth-child(9) > span:nth-child(2)').html(x + ' ' + z)
$('input[name=\'hin\']').css('background-color', 'pink');
