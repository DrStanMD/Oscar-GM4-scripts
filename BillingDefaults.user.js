// ==UserScript==
// @name           BillingDefaults
// @namespace   StansScripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description Sets the default billing physician and date today when billing from Master screen.
// @include        *billing.do?billRegion=BC&billForm*
// @include          *CaseManagementEntry.do*
// @version     15.1
// ==/UserScript==


$("input[name='xml_diagnostic_detail2']").attr('disabled','disabled');
$("input[name='xml_diagnostic_detail3']").attr('disabled','disabled');


var theDefault='Refer To'; 
var theOptions = document.getElementsByName('refertype1')[0].options;

for  (var theOption of theOptions)
{for (var i=0; i<3; i++) {}
	if(typeof(theOption)=='object'){
		if(theOption.text==theDefault){
			theOption.selected=true;
			break;
		}
	}
}


//===========Cookies===============
function setCookie(cname,cvalue,exdays,cpath)
{
var d = new Date();
 d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires +  "; " + cpath
 }

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
//********************************************************

var default_doc = null
//default_doc = getCookie("default_doc")
default_doc = localStorage.getItem("default_doc");

if ($('select[name=xml_provider]').val()=="000000"){
showAlert7()
}

var input8=document.createElement("input");
input8.type="button";
input8.value="Store default Provider";
input8.onclick = showAlert8;
input8.setAttribute("style", "font-size:12px;position:absolute;top:15px;right:0px;");
document.body.appendChild(input8); 
function showAlert8(){  
var Set_Default = $('select[name=xml_provider] option:selected').text()

qdocname = Set_Default
//qdocname = window.prompt("Enter Doctor's name", Set_Default);
//setCookie("default_doc",qdocname,360,"path=/");  //set cookie to expire in 360 days
localStorage.setItem("default_doc",qdocname); 
alert(qdocname +" is now set as the default billing doctor on this computer.")

location.reload();
}

function showAlert7(){
//default_doc ='Hurwitz, Stanley D';
if (!default_doc){
alert("The default provider is not set for this session on this computer.  \nSelect the default provider from the list, then click STORE.")
}
    
 $('select[name=xml_provider]').css("background-color","yellow");

//var theDefault='Hurwitz, Stanley D';
var theDefault=default_doc  
var theOptions = document.getElementsByName('xml_provider')[0].options;

for  (var theOption of theOptions)
{for (var i=0; i<3; i++) {}
	if(typeof(theOption)=='object'){
		if(theOption.text==theDefault){
			theOption.selected=true;
			break;
		}
	}
}


var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;
$("input[name='xml_appointment_date']").val(today);
$('#xml_appointment_date').css("background-color","yellow");
}

//Highlight billing codes
var allergy = "body > form:nth-child(5) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)"
$(allergy).css("background-color","lightyellow");
