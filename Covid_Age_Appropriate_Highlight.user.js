// ==UserScript==
// @name           Covid Age Appropriate Highlight
// @namespace   StansScripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description  Covid Age Appropriate Highlight
// @include        *billing.do?billRegion=BC&billForm*
// @include          *CaseManagementEntry.do*
// @version     15.0
// ==/UserScript==

var age = $('body > form:nth-child(5) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)').html()
if(age){
 // alert(age)
}
else{
var age = $('body > form:nth-child(6) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)').html()
//alert(age)
}

var z
var q
switch (true) {
        case (age < 2):
        z = ("13237");
        q = ("13238");
        break;
        case (age < 50):
        z = ("13437");
        q = ("13438");
        break;
        case (age < 60):
        z = ("13537");
        q = ("13538");
        break;
        case (age < 70):
        z = ("13637");
        q = ("13638");
        break;
        case (age < 80):
        z = ("13737");
        q = ("13738");
        break;
        case (age < 105):
        z = ("13837");
        q = ("13838");
        break;
}

var x = document.querySelectorAll('input[name=service]')
for(i=0;i<x.length;i++){
  if(x[i].value == z){
    //alert(x[i].value)
    $(x[i]).closest('tr').css('background-color', 'yellow')
    x[i].click()
  }
  if(x[i].value == q){
  //alert(x[i].value)
  $(x[i]).closest('tr').css('background-color', 'lightpink')
  //x[i].click()
  }
}
