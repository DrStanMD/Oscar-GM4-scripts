// ==UserScript==
// @name Billing Screen Telehealth
// @namespace   PMscripts
// @description  Buttons to automagically bill age-related codes
// @include     *billing.do?billRegion=BC&billForm=*
// @include     *billing/CA/BC/billingBC.jsp*
// @include     *CaseManagementEntry.do
// @exclude    *CaseManagementEntry.do?method=issuehistory&demographicNo*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// @version 15.2
// ==/UserScript==




tr = $('.serviceCodesTable').children();
tr.prepend("<tr><td colspan=3 id='extravvrow'></td></tr>");



var input = document.createElement('input');
input.type = 'button';
input.value = 'Telehealth Visit';
input.onclick = virtualVisit;
input.setAttribute('style', 'color:green', 'font-size:12px;');

$("#extravvrow").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'Telehealth Counselling';
input.onclick = virtualVisitCounselling;
input.setAttribute('style', 'color:green', 'font-size:12px;');

$("#extravvrow").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'LTCI visit';
input.onclick = LTCI_visit;
input.setAttribute('style', 'color:green', 'font-size:12px;');

$("#extravvrow").append(input);

var input = document.createElement('input');
input.type = 'button';
input.value = 'LTCI 1st visit';
input.onclick = LTCI_visit1;
input.setAttribute('style', 'color:green', 'font-size:12px;');

$("#extravvrow").append(input);

//alert($('.serviceCodesTable').children().html());
                                 
                               
function virtualVisit(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13237";
  else if(age >= 2 && age < 50)
    code="13437";
  else if(age >= 50 && age < 60)
    code="13537";
  else if(age >= 60 && age < 70)
    code="13637";
  else if(age >= 70 && age < 80)
    code="13737";
  else
    code="13837";
  $("input[name=xml_other1]").val(code);
}

function virtualVisitCounselling(){
  age = $("#patientIdRow").children().children().next().next().next().html();
  if(age < 2)
    code="13238";
  else if(age >= 2 && age < 50)
    code="13438";
  else if(age >= 50 && age < 60)
    code="13538";
  else if(age >= 60 && age < 70)
    code="13638";
  else if(age >= 70 && age < 80)
    code="13738";
  else
    code="13838";
  $("input[name=xml_other1]").val(code);
}

function LTCI_visit(){
    code="00114";
  $("input[name=xml_other1]").val(code);
}

function LTCI_visit1(){
    code="13334";
  $("input[name=xml_other1]").val(code);
}
