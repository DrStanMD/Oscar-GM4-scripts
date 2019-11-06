// ==UserScript==
// @name        Demographic copy part two

// @namespace   Stanscripts


// @description Paste copied demographic info to this demographic. Can be set to paste mum's PHN for newborn.
// @include     *demographic/demographicaddarecordhtm.jsp*    
// @include   *demographic/demographiccontrol.jsp?displaymode=Create*
// @include     *demographic/demographiccontrol.jsp?displaymode=add*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     15.2

// @grant       none

// ==/UserScript==

var input2=document.createElement("input");
input2.type="button";
input2.value="Paste Details";
input2.onclick = showAlert2;
input2.setAttribute("style", "font-size:18px;position:fixed;bottom:0px;left:130px;");
document.body.appendChild(input2); 
 function showAlert2()
{
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2) > input:nth-child(1)').val(getCookie("homephone"));  //Home phone
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > input:nth-child(1)').val(getCookie("address")); //address
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2) > input:nth-child(1)').val(getCookie("cellphone")); //cell phone
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(4) > input:nth-child(1)').val(getCookie("city")); //City
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2) > select:nth-child(1)').val(getCookie("province")); //Province
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(4) > input:nth-child(1)').val(getCookie("postal")); //Postal
}


$('#last_name').css("background-color","yellow");
$('#first_name').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > input:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(4) > input:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(4) > input:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2) > input:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(4) > input:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2) > input:nth-child(1)').css("background-color","yellow");
$('#year_of_birth').css("background-color","yellow");
$('#month_of_birth').css("background-color","yellow");
$('#date_of_birth').css("background-color","yellow");
$('#sex').css("background-color","yellow");
$('#hin').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > select:nth-child(1)').css("background-color","yellow");

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

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
//alert(firstElement)
vPath = ("https://" + location.hostname + "/" + firstElement)
//alert(vPath)

var myParam = location.search.split('demographic_no=')[1]
//alert(myParam)

var res = myParam.indexOf("&")
var demo_no = myParam.substring(0,res)
//alert (demo_no)

var formPath = vPath + "/eform/efmformadd_data.jsp?fid=37&demographic_no=" + demo_no
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
$('#editDemographic > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > input:nth-child(1)').val(getCookie("phn")); //PHN
$('#editDemographic > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > input:nth-child(1)').val(getCookie("lastname")); //lastname
}
*/

var input2=document.createElement("input");
input2.type="button";
input2.value="Paste Details";
input2.onclick = showAlert2;
input2.setAttribute("style", "font-size:18px;position:fixed;bottom:0px;left:130px;");
document.body.appendChild(input2); 
 function showAlert2()
{
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2) > input:nth-child(1)').val(getCookie("homephone"));  //Home phone
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > input:nth-child(1)').val(getCookie("address")); //address
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2) > input:nth-child(1)').val(getCookie("cellphone")); //cell phone
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(4) > input:nth-child(1)').val(getCookie("city")); //City
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2) > select:nth-child(1)').val(getCookie("province")); //Province
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(4) > input:nth-child(1)').val(getCookie("postal")); //Postal
}
