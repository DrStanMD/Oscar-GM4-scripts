// ==UserScript==
// @name        myPagescraper
// @namespace   Stanscripts
// @description adds demographic details to echart
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var myParam = location.search.split('demographicNo=') [1]
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res) 
//alert(demo_no)
var measureArray = [
];
var measureDateArray = [
];
var demoArray = [
  'CellPhone',
  'Email',
  'Phone(H)',
  'Address',
  'City'
]
var Email="test"
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText.replace(/\s/g, '') 
      //alert(str)
      if (!str) {
        return;
      }
      //var myRe = /<inputtype="text"name="phone".*\s*/g;   
      //var myRe = /<li><spanclass="label">CellPhone:<\/span><spanclass="info">.*\s*/g;     
      var myReString = '<li><spanclass="label">' + measure + ':<\/span><spanclass="info">.*/s*'
      //var myReString = '<inputtype="text"name="' + measure + '".*/s*';
      //alert(myReString)
      var myRe = new RegExp(myReString, 'g');
            
      //alert(myRe)
      var myArray
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString()        
        //alert(y)  
        //var z = y.indexOf('value=')
        var z = y.indexOf('info')
        //var mycode = y.substring(z + 7)
        var mycode = y.substring(z + 6)
        //alert(mycode)
        //var mycode2 = mycode.indexOf('">')
        var mycode2 = mycode.indexOf('</span>')
        //var mycode3 = mycode.substring(mycode + 8, mycode2)
        var mycode3 = mycode.substring(mycode + 9, mycode2)
       // alert(measure + ' is ' + mycode3)
       // eval(measure) = mycode3
    //eval(measure + " = " + "'" + mycode3 + "'");//maps the measure to a vaiable called measure
    //alert(Email)
   // alert(CellPhone)
   // alert(Address)    
        measureArray[i] = mycode3;
        i = i + 1;
      }
    }
  }  
 

  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
$(document).ready(function () {
  for (i = 0; i < demoArray.length; i++) {
    getMeasures(demoArray[i]);
  }
})
    var header = document.getElementById('encounterHeader');
    var headerExtra1 = 'Add: '
    var headerExtra2 = 'DOB: '
    var headerExtra3 = 'File#: '
    var headerExtra4 = 'HC: '
    header.innerHTML += ('<br>' + headerExtra1.bold() + 'Address' + ',' + 'City' + ',' + 'postalCode' + 'postalCode2' + ' '
    + headerExtra2.bold() + 'DOB' + ' ' + headerExtra3.bold() + 'demoNo' + ' ' + headerExtra4.bold()
    + 'HCN' + 'HCVC' + '   email: ' + Email + '   '
    + '<a href="mailto:' + Email + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
    );
