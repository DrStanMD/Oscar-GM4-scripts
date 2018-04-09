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
  'phone',
  'demo_cell',
  'email'
]

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
      var myReString = '<inputtype="text"name="' + measure + '".*/s*';
      var myRe = new RegExp(myReString, 'g');
      //var myRe = /<inputtype="text"name="phone".*\s*/g;   
      var myArray
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString()        
        //alert(y)
        var z = y.indexOf('value=')
        var mycode = y.substring(z + 7)        
        //alert(mycode)
        var mycode2 = mycode.indexOf('">')
        var mycode3 = mycode.substring(mycode + 8, mycode2)
        alert(measure + ' is ' + mycode3)
        measureArray[i] = mycode3;
        i = i + 1;
      }
    }
  }  
  //alert(measureArray)

  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
$(document).ready(function () {
  for (i = 0; i < demoArray.length; i++) {
    getMeasures(demoArray[i]);
  }
})
