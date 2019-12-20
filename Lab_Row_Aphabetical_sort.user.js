// ==UserScript==
// @name        Lab Row display Alphabetical Sort
// @namespace   Stanscript
// @include     *lab/CumulativeLabValues.jsp*
// @include     *casemgmt/forward.jsp?action*
// @description Lab Grid Alphabetical Sort
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// @version     15.1
// ==/UserScript==
//========Get Path============

var formID='414' //  ENTER YOUR SPECIFIC POPUPWINDOW FORM ID NUMBER HERE

//===============================
var mylink = 'eform/efmshowform_data.jsp?fid='+formID
var radioBtn1 = $('<input type= "checkbox" name="CDM" id="CDM" value ="CDM" checked  />');
var radioBtn2 = $('<input type="checkbox" name="CBC" id="CBC" value ="CBC"   />');
var radioBtn3 = $('<input type="checkbox" name="INF" id="INF" value ="INF"   />');
var radioBtn4 = $('<input type="checkbox" name="HEP" id="HEP" value ="HEP"   />');
var radioBtn5 = $('<input type="checkbox" name="ALL" id="ALL" value ="ALL"   />');
$('.TopStatusBar').append(radioBtn1)
$('.TopStatusBar').append('CDM_Group')
$('.TopStatusBar').append(radioBtn2)
$('.TopStatusBar').append('CBC_Group')
$('.TopStatusBar').append(radioBtn3)
$('.TopStatusBar').append('Inflammatory_Group')
$('.TopStatusBar').append(radioBtn4)
$('.TopStatusBar').append('Hepatic_Group')
$('.TopStatusBar').append(radioBtn5)
$('.TopStatusBar').append('Select_All')
var HEPArray = [
  '1742-6',
  '1920-8',
  '1751-7',
  '6768-6',
  'XXX-2280',
  '1834-1',
  '14629-0',
  '2324-2',
  'XXX-2887',
  '48345-3',
  '4542-7',
  '6301-6',
  '46426-3',
  '14804-9',
  '2532-0',
  '14631-6',
  '2885-2',
  '13955-0',
  '5195-3',
  '16935-9',
  '16933-4',
  '51913-2'
]
var INFArray = [
  '2871-2',
  '30522-7',
  '4485-9',
  '4498-2',
  '5130-0',
  '14722-3',
  '2874-6',
  '2458-8',
  '2465-3',
  '2472-9',
  '5234-0',
  'XXX-2435',
  '5301-7',
  '11572-5',
  '5351-2',
  '5353-8'
]
var CBCArray = [
  '704-7',
  '711-2',
  '2276-4',
  '51584-1',
  '4544-3',
  '718-7',
  '5799-2',
  '731-0',
  '785-6',
  '786-4',
  '787-2',
  '742-7',
  '751-8',
  '777-3',
  '51633-6',
  '6742-1',
  '789-8',
  '788-0',
  '42810-2',
  '33516-6',
  '14196-0',
  '6690-2'
]
var CDMArray = [
  '1742-6',
  '14647-2',
  '33914-3',
  '14771-0',
  '14749-6',
  '4548-4',
  //  '5794-3',  //Haemoglobin
  '6301-6',
  '39469-2',
  '58453-2',
  '2857-1',
  '2823-3',
  '2951-2',
  '3016-3',
  '14927-8',
  '1920-8',
  '30522-7',
  '2000-8',
  '14646-4',
  '16935-9',
  '5195-3',
  '14879-1',
  '14933-6',
  '1871-3',
  '32309-7',
  '718-7',
  '1988-5',
  'X10367' //Hb
]
function showAlert5() {
  window.open(vPath + '/lab/CumulativeLabValues.jsp?mysort=sort&demographic_no=' + params.demographicNo, '_blank', 'width=1000, scrollbars=yes, resizable=yes')
}
window.resizeTo(1200, 780);
printbutton = '<input style=\'font-size:18px;position:absolute;top:10px;left:400px;\' value=\'Print\' type=\'button\'  onclick=\'window.print()\' >'
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
var ptname = $('.TopStatusBar > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').html()
var printthis = '<br>'
var str = ''
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
var checkedValues = ''
var LabDataPrint = ''
function getMeasures(measure, arrayno) {
  labURL = ''
  labURL = 'testName=' + measure + '&demo=' + params.demographic_no + '&labType=HL7&identifier=' + myLabArray[arrayno][2] //alert(labURL)  
  xmlhttp = new XMLHttpRequest();
  str = ''
  var pathArray = window.location.pathname.split('/');
  var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/lab/CA/ON/labValues.jsp?' + labURL
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      measureArray = [
      ]
      measureDateArray = [
      ]
      //var myRe = /<td align="right">(.*?)([\d,\.]+)<\/td>/g; //for the measurement
      var myRe = /<td align="center">([\d,\.]+)<\/td>/g; //for the measurement
      var myRe2 = /<td align="center">(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})<\/td>/g; //the observation date
      var r = 0
      var myArray;
      while ((myArray = myRe.exec(str)) !== null) {
        pend = myArray[0].indexOf('</td>')
        measureArray[r] = '<b>' + myArray[0].substring(19, pend) + '</b>'
        //alert(measureArray[r])
        r++
      }
      var r = 0
      var myArray;
      while ((myArray = myRe2.exec(str)) !== null) {
        measureDateArray[r] = '<u>' + myArray[0].substring(19, 29) + '</u>'
        r++
      }
     //measureArray.reverse()
     // measureDateArray.reverse()
      alldata[arrayno] = '<br><u>' + measure + '</u>' + '<br>' //*************Limit to 10 results**********************
      vlimit = 10
      if (measureArray.length < vlimit) {
        vlimit = measureArray.length
      } //****END LIMIT********************************

      for (zz = 0; zz < vlimit; zz++) {
        if (measureArray[zz]) {
          alldata[arrayno] = alldata[arrayno] + (measureArray[zz] + ' (' + measureDateArray[zz] + ');  ' + printthis)
        }
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
function Cumulative() {
  for (i = 0; i < parts[i].length; i++) {
    //    if(parts[i].length<25){break}
    zz = (parts[i])
    pstart = (zz.indexOf('Profile2') + 8)
    pend1 = zz.indexOf(' </a>')
    newstring1 = zz.substring(pstart, pend1)
    pend2 = newstring1.indexOf('>')
    zz = newstring1.substring(0 + 1, pend2 - 3)
    ps = zz.indexOf(',')
    plast = zz.lastIndexOf(',')
    vHL7 = zz.substring(1, ps - 1)
    zz = zz.replace(vHL7, '')
    plast = zz.lastIndexOf(',')
    labname = zz.substring(4, plast - 1)
    zz = zz.replace(labname, '')
    labparam = zz.substring(7, zz.length - 1)
    if (!vHL7.trim()) {
      break
    }
    myLabArray[i][1] = vHL7
    myLabArray[i][0] = labname
    myLabArray[i][2] = labparam
  }
}
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'View by Row';
input4.onclick = showAlert4;
input4.setAttribute('style', 'font-size:14px;position:absolute;top:20px;left:30px;background-color: pink;');
input4.setAttribute('type', 'hidden');
document.body.appendChild(input4);
function showAlert4() {
  printthis = ''
  checkedValues = ''
  alldata = [
  ]
  alldata2 = ''
  checkedValues = $('input:checkbox:checked').map(function () {
    return this.value;
  }).get();
  // alert('You checked ' + checkedValues) + ' labs.'
  /*
  r = confirm('Loading can take up to 60 seconds.  Click to continue......')
  if (r == false) {
    return false;
  } 
  */
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  //lablist.document.body.innerHTML = 'You selected ' + checkedValues + '.  Please wait....'

  for (var i = 0; i < checkedValues.length; i++) {
    //alert(i)
    b = checkedValues[i]
    for (j = 0; j < myLabArray.length; j++) {
      if (myLabArray[j].indexOf(b) > - 1) {
        getMeasures(myLabArray[j][0], j)
      }
    }
  }
  var alldata2 = ''
  for (i = 0; i < alldata.length; i++) {
    if (alldata[i]) {
      alldata2 = alldata2 + alldata[i] + '<br>'
    }
  }
  LabDataPrint = '<h3>' + ptname + ':         ' + today + '</h3>' + alldata2
  data = LabDataPrint + printbutton // lablist.print()
  var data = encodeURIComponent(data)
  localStorage.setItem('mydata', data);
  //setCookie("mydata",data,360,"path=/");
  myWindow.close()
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  //myWindow = window.open(vPath + 'eform/efmshowform_data.jsp?fid=414&mydata=' + data)
  //myWindow = window.open('data:text/html,' + encodeURIComponent(data), '_blank', 'width=800');
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'View by Column';
input3.onclick = showAlert3
input3.setAttribute('style', 'font-size:14px;position:absolute;top:0px;left:30px;background-color: lime;');
input3.setAttribute('type', 'hidden');
document.body.appendChild(input3);
function showAlert3() {
  printthis = '<br>'
  /*
  r = confirm('Loading can take up to 60 seconds.  Click to continue......')
  if (r == false) {
    return false;
  }
  */
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  checkedValues = ''
  alldata = [
  ]
  checkedValues = $('input:checkbox:checked').map(function () {
    return this.value;
  }).get();
  // lablist.document.body.innerHTML = 'You selected ' + checkedValues + '.  Please wait....' // alert('You checked ' + checkedValues)
  for (var i = 0; i < checkedValues.length; i++) {
    b = checkedValues[i] // alert(b)
    for (j = 0; j < myLabArray.length; j++) {
      if (myLabArray[j].indexOf(b) > - 1) {
        getMeasures(myLabArray[j][0], j)
      }
    }
  }
  LabDataPrint = '<h3>' + ptname + ':         ' + today + '</h3><br>' + '<table border=\'1\'  style=\'width:100%\'>'
  j = 0
  for (i = 0; i < alldata.length; i++) {
    vtr = ''
    vtre = ''
    if (j == 0) {
      vtr = '<tr>'
    }
    if (j == 3) {
      vtre = '</tr>'
      j = - 1
    }
    if (alldata[i]) {
      LabDataPrint = LabDataPrint + vtr + '<td width=\'25%\'  valign=\'top\'  >' + alldata[i] + '</td>' + vtre
      j = j + 1
    }
  }
  var data = LabDataPrint + '</table>' + printbutton
  var data = encodeURIComponent(data)
  localStorage.setItem('mydata', data);
  //setCookie("mydata",data,360,"path=/");
  myWindow.close()
  myWindow = window.open(vPath + mylink,'_blank', 'width=800, scrollbars=yes, resizable=yes')  
  // myWindow = window.open(vPath + 'eform/efmshowform_data.jsp?fid=414&mydata=' + data)
  //myWindow = window.open('data:text/html,' + encodeURIComponent(data), '_blank', 'width=800');
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Sort';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:16px;position:absolute;top:0px;left:30px;');
document.body.appendChild(input2);
function showAlert2() {
  myDisplay()
}
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
  var input5 = document.createElement('input');
  input5.type = 'button';
  input5.value = 'Cumulative Labs';
  input5.onclick = showAlert5;
  input5.setAttribute('style', 'font-size:10px;position:absolute;top:0px;left:800px;background-color: pink;');
  // input5.setAttribute('type', 'hidden');
  document.body.appendChild(input5);
  f = $('.leftBox').html()
  var parts = f.split('</li>');
  var myArray = [
  ];
  var checkedValues = [
  ]
  var myLabArray = new Array()
  for (i = 0; i < parts.length - 1; i++) {
    myLabArray[i] = new Array(3)
  }
  for (i = 0; i < parts[i].length; i++) {
    var ii = parts[i].search('header=') + 8
    var ie = parts[i].search(' body=') - 1
    searchstring = ''
    while (ii < ie) {
      searchstring = searchstring + parts[i].charAt(ii)
      ii = ii + 1
    }
    c = parts[i].substring(parts[i].length - 4, parts[i].length)
    if (c !== '</a>') {
      //  alert(i + ': Error Code Alert')
      break;
    }
    myArray[i] = searchstring + parts[i].trim()
  }
  myArray.sort()
}
var Newlist = ''
for (i = 0; i < myArray.length; i++) {
  startat = 0
  endat = 500
  startat = (myArray[i].indexOf('<'))
  newstartat = myArray[i].lastIndexOf(',')
  newendat = myArray[i].lastIndexOf(')')
  loincval = myArray[i].substring(newstartat + 2, newendat - 1)
  namestring = myArray[i].substring(0, startat)
  chkval = ' ' /*
  if (CDMArray.indexOf(loincval) > - 1) {
    chkval = ' checked '
  }
  if (INFArray.indexOf(loincval) > - 1) {
    chkval = ' checked '
  }
  */
  myArray[i] = '<font size = \'1\'>' + myArray[i].substring(startat, endat) + '<input name=\'checkbox\' id=' + ('myCheckBox' + i) + chkval + ' value=' + loincval + ' type=\'checkbox\'>' + (namestring + ' (' + loincval + ') ') + '<br>'
  Newlist = Newlist + myArray[i] // alert(Newlist)
}
var input6 = document.createElement('input');
input6.type = 'button';
input6.value = 'Update Groups';
input6.onclick = CCBox
input6.setAttribute('style', 'font-size:12px;position:absolute;top:0px;right:200px;background-color: lime;');
input6.setAttribute('type', 'hidden');
document.body.appendChild(input6);
function myDisplay() {
  input2.setAttribute('type', 'hidden');
  Cumulative() // alert(myLabArray)
  myLabArray.sort()
  $('.leftBox > div:nth-child(3)').html(Newlist)
  CCBox()
  input3.setAttribute('type', 'visible');
  input4.setAttribute('type', 'visible');
}
if (params.mysort) {
}
if (params.demographicNo) {
  input2.setAttribute('type', 'hidden');
}
if (params.demographic_no) {
  input5.setAttribute('type', 'hidden');
  input6.setAttribute('type', 'visible');
}
function CCBox() {
  for (i = 0; i < myArray.length; i++) {
    q = document.getElementById(('myCheckBox' + i)) //alert(i)
    if (q) {
      q = document.getElementById(('myCheckBox' + i)) // alert(q.value)
      qq = document.getElementById('ALL')
      if (qq.checked == true) {
        q.checked = true;
      } 
      else if (qq.checked == false) {
        q.checked = false;
      } //*****************

      q = document.getElementById(('myCheckBox' + i))
      qq = document.getElementById('CDM')
      if (CDMArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      } 
      else if (CDMArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('CBC')
      if (CBCArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      } 
      else if (CBCArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('INF')
      if (INFArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      } 
      else if (INFArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      qq = document.getElementById('HEP')
      if (HEPArray.indexOf(q.value) > - 1 && qq.checked == true) {
        q.checked = true;
      } 
      else if (HEPArray.indexOf(q.value) > - 1 && qq.checked == false) {
        q.checked = false;
      } //*****************

      q = document.getElementById(('myCheckBox' + i))
      qq = document.getElementById('ALL')
      if (qq.checked == true) {
        q.checked = true;
      } //*****************

    }
  }
}
