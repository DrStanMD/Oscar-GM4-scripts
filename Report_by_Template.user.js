// ==UserScript==
// @name        Report by Template
// @namespace   Stanscript
// @include     *oscarReport/reportByTemplate*
// @description RBT alphabetical, Pass parameter to RBT
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// @version     1.5
// ==/UserScript==
//alert("HI")
//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
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
}
$('#enclosingCol0 > input:nth-child(1)').val(params.demographic_no)
//******************************************************************************
$('.MainTableLeftColumn').append('<td>Favorites List - for future use</td>');
d = $('div.templatelist').html()
var parts = d.split('</li>');
var myArray = [
];
for (ii = 0; ii < parts.length; ii++) {
  for (i = 0; i < parts[ii].length; i++) {
    if (!isNaN(parts[ii].charAt(i))) {
      if (parts[ii].charAt(i + 2) == '>') {
        searchstring = parts[ii].charAt(i + 3) + parts[ii].charAt(i + 4) + parts[ii].charAt(i + 5) + parts[ii].charAt(i + 6) + parts[ii].charAt(i + 7) + parts[ii].charAt(i + 8) + parts[ii].charAt(i + 9)
        myArray[ii] = searchstring + parts[ii]
      }
    }
  }
}
myArray.sort()
myNewArray = [
]
for (i = 0; i < myArray.length - 1; i++) {
  myNewArray[i] = myArray[i]
  startat = (myNewArray[i].indexOf('<a'))
  myNewArray[i] = myNewArray[i].substring(startat)
}
newlist = '<br><a href=' + vPath + 'oscarReport/reportByTemplate/addEditTemplate.jsp style=\'color: #226d55; font-size: 10px;\'>Add Template</a><br>'
//newlist=""
for (var i = 0; i < myNewArray.length; i++) {
  //**************************************
  //**************NUMBERED LIST:
  newlist = newlist + '<br>' + (i + 1) + '. ' + myNewArray[i]
  //*************WITHOUT NUMBERS
  //newlist = newlist + "<br>"+myNewArray[i]
}
//**********REMOVE EXISTING LIST:

$('div.templatelist').html('<a href=' + vPath + 'oscarReport/reportByTemplate/addEditTemplate.jsp style=\'color: #226d55; font-size: 10px;\'>Add Template</a><br>')
//**********APPPEND TO BOTTOM:
$('.MainTableBottomRowRightColumn').html(newlist)
//*********REPLACE EXISTING LIST:
//$('div.templatelist') .html(newlist)
//$('input[value="Run Query"]').click();
