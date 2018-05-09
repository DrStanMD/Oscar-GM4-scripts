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
var demoArray = [
  'CellPhone',
  'Email',
  'Phone(H)',
  'Address',
  'City',
  'Postal',
  'Age',
  'HealthIns.#'
]
var demoArrayVal = [
]
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText)
      var str = xmlhttp.responseText.replace(/\s/g, '')
      if (!str) {
        return;
      }
      var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() // alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
        demoArrayVal[j] = mycode3
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
$(document).ready(function () {
  for (j = 0; j < demoArray.length; j++) {
    getMeasures(demoArray[j]);
  }
  var HCN = demoArrayVal[7]
  res = HCN.slice(0, 4)
  res = res + ' ' + HCN.slice(4, 7)
  res = res + ' ' + HCN.slice(7)
  HCN = res
  var header = document.getElementById('encounterHeader');
  var headerExtra1 = 'Cell: '
  var headerExtra2 = ' Age: '
  var headerExtra3 = 'File#: '
  var headerExtra4 = 'PHN: '
  header.innerHTML += ('<br>' + headerExtra1.bold() + demoArrayVal[0] + ', ' + demoArrayVal[4] + ',' + headerExtra2.bold() + demoArrayVal[6] + ' '
  + ' ' + headerExtra3.bold() + demo_no + ' ' + headerExtra4.bold()
  + HCN + '   email: ' + demoArrayVal[1] + '   '
  + '<a href="mailto:' + demoArrayVal[1] + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
  );
})
