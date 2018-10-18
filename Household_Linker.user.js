// ==UserScript==
// @name        Household Linker 
// @namespace   StanScripts
// @description Simplifies switching to family charts 
// @include     */casemgmt/forward.jsp?action=view&demographicNo=*
// @include     */demographic/demographiccontrol.jsp?demographic_no=*
// @include     */appointment/addappointment.jsp?provider_no=*
// @include     */appointment/appointmentcontrol.jsp?*   
// @include     *demographic/search.jsp*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
//**********DEMOGRAPHIC PAGESCRAPER SNIPPET*****************
var demoArray = [
  //'CellPhone',
  //'Phone(H)',
  //'City',
  //'Postal',
  //'Age',
  //'HealthIns.#'
  //'Email',
  'Address'
]
var demoArrayVal = [
]
var myemail = ''
var add_one = 0
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demoNo + '&displaymode=edit&dboperation=search_detail'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText)
      var str = xmlhttp.responseText.replace(/\s/g, '')
      if (!str) {
        return;
      } //var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'

      var myReString = '<spanclass="label">' + measure + '.*/s*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() // alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
        demoArrayVal[add_one] = mycode3 //alert(demoArrayVal[add_one])
        //alert(demoArrayVal.length)
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
} /*
$(document).ready(function () {
  for (j = 0; j < demoArray.length; j++) {
    getMeasures(demoArray[j]);
    add_one = add_one + 1
  }
  //alert(demoArrayVal[0]) //This is the address
  address = demoArrayVal[0]
})
*/
//********************************************************************
//=====Get Parameters============

var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}//alert(params.segmentID)

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)
var x = window.location.toString() //alert(x)
if (x.indexOf('demographic/search.jsp') > - 1) {
  //alert("We are in the Search page")
  if (params.vaddress) {
    var address = params.vaddress    //alert(address)
    address = '8511 Bairdmore'
    $('input[name=keyword]').val(address);
    $('select[name=search_mode]').val('search_address');
    $('input[title="Search active patients"]').click();
  }
}
if (x.indexOf('casemgmt/forward.jsp?action') > - 1) {
  //alert("We are in the Encounter Page")
  var theTarget = document.getElementById('header');
  var linkButton = document.createElement('input');
  linkButton.type = 'button';
  linkButton.value = 'Family Links';
  linkButton.onclick = doLink2;
  linkButton.setAttribute('style', 'font-size:9px;position:absolute;top:0px;left:650px;background-color: #00FF00');
  document.body.appendChild(linkButton);
}
function doLink2() {
  $(document).ready(function () {
    for (j = 0; j < demoArray.length; j++) {
      getMeasures(demoArray[j]);
      add_one = add_one + 1
    } //alert(demoArrayVal[0]) //This is the address

    address = demoArrayVal[0]
  })
  window.open(vPath + '/demographic/search.jsp?vaddress=' + address)
}
if (x.indexOf('demographic/demographiccontrol.jsp') > - 1) {
  //alert("We are in the Master Demographic Page")
  var theTarget = document.getElementById('header');
  var linkButton = document.createElement('input');
  linkButton.type = 'button';
  linkButton.value = 'Family Links';
  linkButton.onclick = doLink;
  linkButton.setAttribute('style', 'font-size:9px;position:absolute;top:0px;right:430px;background-color: #00FF00');
  document.body.appendChild(linkButton);
}
function doLink() {
  var address = $('#contactInformation > ul:nth-child(2) > li:nth-child(5) > span:nth-child(2)').html();
  $('input[name=keyword]').val(address);
  $('select[name=search_mode]').val('search_address');
  $('input[title="Search active patients"]').click();
}
