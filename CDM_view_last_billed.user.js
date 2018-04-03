// ==UserScript==
// @name        CDM billing codes from echart
// @namespace   Stanscripts
// @description CDM billing codes from echart
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
//******************************************
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //alert(vPath)
var measureArray = [
];
var measureDateArray = [
];
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'billing/CA/BC/billStatus.jsp?lastName=' + 'DOMANKO' + '&firstName=' + 'VERA' + '&filterPatient=true&demographicNo=' + '898'  //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      //alert(str)
      if (!str) {
        return;
      }
      var myRe = /<td align="center" class="bCellData" >[0-9]{5}<\/td>/g; //for CDM code 
      var myArray;
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        var y = (myRe.exec(str).toString()).replace(/\s/g, '')
        var mycode = y.substring(35, 40)
        measureArray[i] = mycode;
        i = i + 1;
      }
      var myRe = /<td align="center" class="bCellData" >([0-9,-]+)<\/td>\s*<td align="center" class="bCellData" >/g; //for date
      var myArray;
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        var y = (myRe.exec(str).toString()).replace(/\s/g, '')
        measureDateArray[i] = myArray[1];
        i = i + 1;
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
getMeasures()
for (i = 0; i < measureArray.length; i++) {
  alert(measureArray[i] + ' billed on ' + measureDateArray[i])
}//************************
