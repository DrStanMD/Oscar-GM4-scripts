// ==UserScript==
// @name        Echart buttons
// @namespace   Stanscripts
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
//window.moveTo(300, 100)
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //d.setTime(d.getTime() + (exdays * 5000));
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
} //x = $('#enTemplate');
//x.css('background-color', 'yellow');

var myWindow = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //alert(vPath)
var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res) //var myWindow = window.open("","","width=200,height=100");
var input = document.createElement('input');
input.type = 'button';
input.value = 'INR';
input.onclick = showAlert;
input.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:0px; ');
document.body.appendChild(input);
function showAlert()
{
  $('#menu3 > a:nth-child(12)').click()
} // INSERT YOU OWN MEASUREMENT UNIQUE SELECTOR  HERE

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Specialist';
input1.onclick = showAlert1;
input1.setAttribute('style', 'width:90px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:60px; ');
document.body.appendChild(input1);
function showAlert1()
{
  window.open(vPath + 'billing/CA/BC/billingManageReferralDoc.jsp')
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Referral';
input2.onclick = showAlert2;
input2.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:0px;right:150px; ');
document.body.appendChild(input2);
function showAlert2()
{
  $('#menuTitleconsultation > h3:nth-child(1) > a:nth-child(1)').click()
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Rx';
input3.onclick = showAlert3;
input3.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:30px;right:0px; ');
document.body.appendChild(input3);
function showAlert3()
{
  $('#Rx > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
}
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'BP/Puls/Wt';
input4.onclick = showAlert4;
input4.setAttribute('style', 'width:90px;font-size:16px;z-index:1;position:fixed;bottom:30px;right:60px; ');
document.body.appendChild(input4);
function showAlert4() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Vitals', 'VitalsWindow', 'width=1000,height=500')
}
var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'Forms';
input5.onclick = showAlert5;
input5.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:30px;right:150px; ');
document.body.appendChild(input5);
function showAlert5()
{
  $('#menuTitleeforms > h3:nth-child(1) > a:nth-child(1)').click()
} // INSERT YOU OWN MEASUREMENT UNIQUE SELECTOR

var input6 = document.createElement('input');
input6.type = 'button';
input6.value = 'DYMO';
input6.onclick = showAlert6;
input6.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:0px;background-color: #FE2EF7; ');
document.body.appendChild(input6);
function showAlert6()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=37&demographic_no=' + demo_no // INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath)
}
var input7 = document.createElement('input');
input7.type = 'button';
input7.value = 'Screening';
input7.onclick = showAlert7;
input7.setAttribute('style', 'width:90px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:60px; ');
document.body.appendChild(input7);
function showAlert7() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Screening%20Procedures', 'Screening%20ProceduresWindow', 'width=1000,height=700')
}
var input8 = document.createElement('input');
input8.type = 'button';
input8.value = 'Vaccines';
input8.onclick = showAlert8;
input8.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:60px;right:150px; ');
document.body.appendChild(input8);
function showAlert8()
{
  $('#preventions > div:nth-child(3) > h3:nth-child(1) > a:nth-child(1)').click()
}
var input9 = document.createElement('input');
input9.type = 'button';
input9.value = 'Expand';
input9.onclick = showAlert9;
input9.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:0px; ');
document.body.appendChild(input9);
function showAlert9()
{
  $('#imgmeasurements5').click()
  $('#imgdocs5').click()
  $('#imglabs5').click()
}
var input10 = document.createElement('input');
input10.type = 'button';
input10.value = 'Allergy Inj.';
input10.onclick = showAlert10;
input10.setAttribute('style', 'width:90px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:60px; ');
document.body.appendChild(input10);
function showAlert10() // INSERT YOU OWN MEASUREMENT groupName=?????  below
{
  window.open(vPath + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Allergy Shots')
}
var input11 = document.createElement('input');
input11.type = 'button';
input11.value = 'Save&Exit';
input11.onclick = showAlert11;
input11.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:150px;background-color: lime;border-radius: 30px;');
document.body.appendChild(input11);
function showAlert11() //{(document.evaluate("id('save')/span/input[contains(@src,'verify-sign.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue).click();}
//{(document.evaluate("id('save')/span/input[contains(@src,'dollar-sign-icon.png')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue).click();}
{
  $('#input2').click()
  $('#save > span:nth-child(1) > input:nth-child(5)').click()
}
var input12 = document.createElement('input');
input12.type = 'button';
input12.value = 'Lab Grid';
input12.onclick = showAlert12;
input12.setAttribute('style', 'width:90px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:60px; ');
document.body.appendChild(input12);
function showAlert12() //{window.open(vPath  + '/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=Allergy Shots 0')}
{
  //https://secure10.oscarhost.ca/SDHurwitzInc/eform/efmformadd_data.jsp?fid=68&demographic_no=640&appointment=
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=68&demographic_no=' + demo_no
  window.open(formPath,'Popup_Window', 'width=800,height=800,left = 800,top = 0')
}
var input13 = document.createElement('input');
input13.type = 'button';
input13.value = 'PAP';
input13.onclick = showAlert13;
input13.setAttribute('style', 'width:60px;font-size:16px;z-index:1;position:fixed;bottom:120px;right:0px;background-color: #FE2EF7; ');
document.body.appendChild(input13);
function showAlert13()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=22&demographic_no=' + demo_no //alert(formPath)
  window.open(formPath)
}
var input14 = document.createElement('input');
input14.type = 'button';
input14.value = 'LIFELAB';
input14.onclick = showAlert14;
input14.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:90px;right:150px;background-color: #FE2EF7; ');
document.body.appendChild(input14);
function showAlert14()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=172&demographic_no=' + demo_no //var formPath = vPath + "eform/efmformadd_data.jsp?fid=81&demographic_no=" + demo_no
  //alert(formPath)
  window.open(formPath)
}
var input15 = document.createElement('input');
input15.type = 'button';
input15.value = 'Imaging';
input15.onclick = showAlert15;
input15.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:150px;right:150px');
document.body.appendChild(input15);
function showAlert15()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + 'eform/efmformslistadd.jsp?group_view=Imaging&demographic_no=' + demo_no + '&parentAjaxId=eforms' //alert(formPath)
  window.open(formPath)
}
var input16 = document.createElement('input');
input16.type = 'button';
input16.value = 'Prenatal guide';
input16.onclick = showAlert16;
input16.setAttribute('style', 'width:150px;font-size:16px;z-index:1;position:fixed;bottom:150px;right:0px');
document.body.appendChild(input16);
function showAlert16()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  // INSERT YOU OWN form ID (fid=??) here
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=96&demographic_no=' + demo_no //window.open(formPath)
  window.open(formPath, 'Popup_Window', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=400,height=300,left = 312,top = 234');
}
var input17 = document.createElement('input');
input17.type = 'button';
input17.value = 'New WCB';
input17.onclick = showAlert17;
input17.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:150px');
document.body.appendChild(input17);
function showAlert17()
{
  $('#menu1 > a:nth-child(6)').click()
}
var input18 = document.createElement('input');
input18.type = 'button';
input18.value = 'TripRx';
input18.onclick = showAlert18;
input18.setAttribute('style', 'width:80px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:0px');
document.body.appendChild(input18);
function showAlert18()
{
  var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
  var res = myParam.indexOf('&')
  var demo_no = myParam.substring(0, res) //alert (demo_no)
  var formPath = vPath + 'eform/efmformadd_data.jsp?fid=458&demographic_no=' + demo_no // INSERT YOU OWN form ID (fid=??) here
  //alert(formPath)
  window.open(formPath) 
}
var input19 = document.createElement('input');
input19.type = 'button';
//input19.value="00120";
input19.value = 'RBS';
input19.onclick = showAlert19;
input19.setAttribute('style', 'width:70px;font-size:16px;z-index:1;position:fixed;bottom:180px;right:80px');
document.body.appendChild(input19);
function showAlert19()
{
  //alert(demo_no)
  // var formPath = vPath + "oscarReport/reportByTemplate/reportConfiguration.jsp?templateid=20&demographic_no=" + demo_no
  var formPath = vPath + 'oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=CDM%20Labs'
  myWindow = window.open(formPath) //$('#enclosingCol0 > input:nth-child(1)').val("1234")
  /*  
   setTimeout(function () {
    myWindow.focus();
    $('input[name=\'value(inputValue-23)\']').css('background-color', 'yellow');
    $('input[name=\'value(inputValue-23)\']').focus()
  }, 1500);
  */
}

var input180 = document.createElement('input');
input180.type = 'button';
input180.value = 'DM flow sheet';
input180.onclick = showAlert180;
input180.setAttribute('style', 'font-size:16px;z-index:1;position:fixed;bottom: 300px;right:0px');
document.body.appendChild(input180);
function showAlert180()
{
  window.open(vPath + 'oscarEncounter/oscarMeasurements/TemplateFlowSheet.jsp?demographic_no='+demo_no+'&template=diab2')
}   
