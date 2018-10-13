// ==UserScript==
// @name        CDM-last-billed
// @namespace   Stanscripts
// @description Alerts when CDM code was last billed
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version 15.1
// @grant       none
// ==/UserScript==
function fillfield(data1, data2) {
  $('#keyword').css('background-color', data1);
  $('#keyword').val(data2)
  $('#keyword').click(function () {
    $('#keyword').css('background-color', 'white')
    $('#keyword').val('')
  });
}
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var myParam = location.search.split('demographicNo=') [1]
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res)
var measureArray = [
];
var measureDateArray = [
];
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  //alert(demo_no)
  var newURL = vPath + 'billing/CA/BC/billStatus.jsp?lastName=' + '' + '&firstName=' + '' + '&filterPatient=true&demographicNo=' + demo_no  //window.open(newURL)
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      if (!str) {
        return;
      }     
      //var myRe = /<td align="center" class="bCellData" >[0-9]{5}<\/td>\s*/g; //for CDM code 
      var myRe = /<td align="center">[0-9]{5}<\/td>\s*/g; //for CDM code 
      var myArray
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString()        
        //alert(y)
        var mycode = y.substring(19, 24)        
        //alert(mycode)
        measureArray[i] = mycode;
        //alert(mycode)
        i = i + 1;
      }      
      //var myRe = /<td align="center" class="bCellData" >([0-9,-]+)<\/td>\s*<td align="center" class="bCellData" >/g; //for date
      //var myRe = /<td align="center">([0-9,-]+)<\/td>\s*/g; //for date
      var myRe = /<td align="center">([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))<\/td>\s*/g; //for date
      var myArray;
      var i = 0;
      while (i < measureArray.length) {
        var y = (myRe.exec(str).toString()).replace(/\s/g, '')        
        //alert(y)
        var mycode = y.substring(18, 28)        
        //alert(mycode)
        measureDateArray[i] = mycode;
        i = i + 1;
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
$(document).ready(function () {
  //$('#keyword').css('background-color', 'red')
  getMeasures()
  var d = new Date();
  var currentyear = d.getFullYear()
  var z = measureArray.indexOf('14033')
  if (z > - 1) {
    var d = new Date(measureDateArray[z])
    if (d.getFullYear() == currentyear) {
      fillfield('lightgreen', '14033 billed this year') //alert('14033 billed this year')
    } 
    else {
      //alert(measureArray[z] + ' last billed on ' + measureDateArray[z])
      fillfield('red', measureArray[z] + ' last billed on ' + measureDateArray[z])
    }
  }
  var z = measureArray.indexOf('14075')
  if (z > - 1) {
    var d = new Date(measureDateArray[z])
    if (d.getFullYear() == currentyear) {
      fillfield('ligthgreen', '14075 billed this year') //alert('14075 billed this year')
    } 
    else {
      //alert(measureArray[z] + ' last billed on ' + measureDateArray[z])
      fillfield('red', measureArray[z] + ' last billed on ' + measureDateArray[z])
    }
  }
});
/*
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
var indexes = getAllIndexes(measureArray, "14033");
alert(indexes)
for (i = 0; i < measureArray.length; i++) {
  alert(measureArray[i] + ' billed on ' + measureDateArray[i])
}
*/
