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
var myParam = location.search.split('demographicNo=') [1] //alert(myParam)
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res) //alert(demo_no)
var measureArray = [
];
var measureDateArray = [
];
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'billing/CA/BC/billStatus.jsp?lastName=' + '' + '&firstName=' + '' + '&filterPatient=true&demographicNo=' + demo_no // window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      if (!str) {
        return;
      }    
      var myRe = /<td align="center" class="bCellData" >[0-9]{5}<\/td>\s*/g; //for CDM code 
      var myArray
      var i = 0;
      //while(i<14){
      while ((myArray = myRe.exec(str)) !== null) {
        //var y = myRe.exec(str).toString().replace(/\s/g, '')
        //alert(y)
        y = myArray.toString()
        var mycode = y.substring(38, 43)        
        //alert(mycode)
        measureArray[i] = mycode;
        //alert(measureArray.length)
        i = i + 1;
      }
      //alert('OMG' + measureArray.length)
      var myRe = /<td align="center" class="bCellData" >([0-9,-]+)<\/td>\s*<td align="center" class="bCellData" >/g; //for date
      var myArray;
      var i = 0;
      while (i < measureArray.length) {
        //while ((myArray = myRe.exec(str)) !== null) {
        var y = (myRe.exec(str).toString()).replace(/\s/g, '') //alert(myArray)
        var mycode = y.substring(35, 45)
        measureDateArray[i] = mycode;
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
} //************************
