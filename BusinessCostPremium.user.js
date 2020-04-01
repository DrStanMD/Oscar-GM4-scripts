// ==UserScript==
// @name           BusinessCostPremium
// @namespace   StansScripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description  Enters the facility number into the appropriate invoice field
// @include        *billing.do?billRegion=BC&billForm*
// @include          *CaseManagementEntry.do*
// @version     15.2
// ==/UserScript==


//Facility number
$("input[name='facilityNum']").val("OADDD"); //your facility number goes here
