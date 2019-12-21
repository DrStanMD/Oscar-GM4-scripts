// ==UserScript==
// @name        Lab cumulative result grid
// @namespace   Stanscript
// @include     *lab/CA/ALL/labDisplay.jsp?segmentID*
// @include     *lab/CA/ALL/labDisplay.jsp?demographicId*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.3
// @grant       none
// ==/UserScript==
//========Get Path============

var formID='414'   // ENTER YOUR SPECIFIC POPUPWINDOW FORM ID NUMBER HERE

//===============================
var mylink = 'eform/efmshowform_data.jsp?fid='+formID
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //alert(vPath)
printbutton = '<input style=\'font-size:18px;position:absolute;top:10px;right:30px;\' value=\'Print\' type=\'button\'  onclick=\'window.print()\' >'
teststring = $('.Title2').html()
if (teststring) {
  teststring = ($('.Title2').html()).trim()
}
if (teststring == 'TRANSCRIP' || teststring == 'CELLPATH') {
  //alert(teststring)
  return false;
}
var printthis = '<br>'
var input3 = document.createElement('input');

/*
input3.type = 'text';
input3.id = 'input3'
input3.value = '4';
//input3.onclick = ButtonFunction1;
input3.setAttribute('style', 'font-size:14px;width:10px;position:fixed;top:50px;right:10px;');
document.body.appendChild(input3);
var input4 = document.createElement('input');
input4.type = 'text';
input4.id = 'input4'
input4.value = 'No. of columns to display:';
input4.setAttribute('style', 'font-size:10px;width:120px;position:fixed;top:52px;right:35px;background-color: #9999CC;');
document.body.appendChild(input4);
document.getElementById('input4').readOnly = true;
*/

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Cumulative report by column';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:13px;position:fixed;top:58px;right:0px;');
document.body.appendChild(input1);
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Cumulative report by row';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:13px;position:fixed;top:35px;right:0px;');
document.body.appendChild(input2);
function ButtonFunction1() {
  /*
  r = confirm('Loading can take up to 60 seconds.  Click to continue......')
  if (r == false) {
    return false;
  }
  */
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  printthis = '<br>' // LabName.sort()
  for (ii = 0; ii < LabName.length; ii++) {
    pend = LabName[ii].indexOf('&demo')
    abrLabName = LabName[ii].substring(0, pend)
    getMeasures(LabName[ii])
    LabData[ii] = alldata[ii] + '<br>'
  }
  LabDataPrint = '<h3>' + ptname + ':         ' + today + '</h3><br>' + '<table border=\'1\' style=\'width:100%\'>'
  j = 0
  for (i = 0; i < LabData.length; i++) {
    vtr = ''
    vtre = ''
    if (j == 0) {
      vtr = '<tr>'
    }
    if (j == 3) {
      vtre = '</tr>'
      j = - 1
    }
    LabDataPrint = LabDataPrint + vtr + '<td width=\'25%\'>' + LabData[i] + '</td>' + vtre
    j = j + 1
  }
  var data = LabDataPrint + '</table>' + printbutton
  var data = encodeURIComponent(data)
  localStorage.setItem('mydata', data);
  //setCookie("mydata",data,360,"path=/");
 myWindow.close()
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  // var lablist = window.open('', '_blank', 'width=800, scrollbars=yes, resizable=yes');
  //  var data = LabDataPrint + '</table>' + printbutton
  // lablist = window.open('data:text/html,' + encodeURIComponent(data), '_blank', 'width=800');
}
function ButtonFunction2() {
  /*
  r = confirm('Loading can take up to 60 seconds.  Click to continue......')
  if (r == false) {
    return false;
  }
  */
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  printthis = '' // LabName.sort()
  for (ii = 0; ii < LabName.length; ii++) {
    pend = LabName[ii].indexOf('&demo')
    abrLabName = LabName[ii].substring(0, pend)
    getMeasures(LabName[ii])
    LabData[ii] = alldata[ii] + '<br>'
  }
  LabDataPrint = '<h3>' + ptname + ':         ' + today + '</h3>'
  for (i = 0; i < LabData.length; i++) {
    LabDataPrint = LabDataPrint + LabData[i]
  }
  var data = encodeURIComponent(LabDataPrint + printbutton)
  localStorage.setItem('mydata', data);
  //setCookie("mydata",data,360,"path=/");
  myWindow.close()
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')    
} //***************************************************************************

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = mm + '/' + dd + '/' + yyyy;
var ptname = ''
var str = ''
var XMLdata = [
]
var LabData = [
]
var LabName = [
]
var measureArray = [
];
var measureDateArray = [
];
var alldata = [
];
ptname = document.title
var mytag = document.getElementsByTagName('a');
var j = 0
for (var i = 0; i < mytag.length; i++) {
  var onclickvalue = mytag[i].getAttribute('href')
  if (onclickvalue !== null && onclickvalue.indexOf('testName') > - 1) {
    var pstart = onclickvalue.indexOf('testName')
    var pend = onclickvalue.indexOf('\')')
    LabName[j] = onclickvalue.substring(pstart + 9, pend).toString()
    j++
  }
}
function getMeasures(measure) {
  str = ''
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/lab/CA/ON/labValues.jsp?testName=' + measure;
  // window.open(newURL)
  // alert("HI")
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      if (!str) {
      }
      measureArray = [
      ]
      measureDateArray = [
      ]
      
      //var myRe = /<td align="right">(.*?)([\d,\.]+)<\/td>/g; //for the measurement
      var myRe = /<td align="center">(.*?)([\d,\.]+)<\/td>/g; //for the measurement
      var myRe2 = /<td align="center">(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})<\/td>/g; //the observation date

      var q = myRe.exec(str).toString()
      var res = myRe.exec(str)
      //alert(res)
      
      if(!isNaN(res)){
      var myRe = /<td align="center">(\D+)<\/td>/g; //for the measurement non-numeric
      }

      if(isNaN(res)){
      var myRe = /<td align="center">([\d,\.]+)<\/td>/g; //for the measurement numeric
      }
      
      var r = 0
      var myArray;
      //alert(str)
      //alert(myRe.exec(str))
      while ((myArray= myRe.exec(str)) !== null) {
        //alert(myArray[0])
        pend = myArray[0].indexOf('</td>')
        measureArray[r] = '<b>' + myArray[0].substring(19, pend) + '</b>'
        r++
      }
      
      var r = 0
      var myArray2;
      while ((myArray2 = myRe2.exec(str)) !== null) {
        measureDateArray[r] = '<u>' + myArray2[0].substring(19, 29) + '</u>'
        r++
      }
    }
    //measureArray.reverse()
    //measureDateArray.reverse()
    alldata[ii] = '<u>' + abrLabName + '</u>' + ':' + '<br>' 
    //*************Limit to 10 results**********************
    vlimit = 10
    if (measureArray.length < 10) {
      vlimit = measureArray.length
    } //****END LIMIT********************************

    for (zz = 0; zz < vlimit; zz++) {
      alldata[ii] = alldata[ii] + (measureArray[zz] + ' (' + measureDateArray[zz] + ');  ' + printthis)
    }
  }
  xmlhttp.open('GET', newURL, false);
  // alert(xmlhttp.onreadystatechange)
  xmlhttp.send();
}

