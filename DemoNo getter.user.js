// ==UserScript==
// @name        DemoNo getter
// @namespace   Stanscript
// @include  *lab/CA/ALL/labDisplay.jsp?segmentID*
// @include  *lab/CA/ALL/labDisplay.jsp?demographicId*
// @include  *dms/MultiPageDocDisplay.jsp?segmentID*
// @include  *dms/showDocument.jsp?inWindow*
// @include  *tickler/ForwardDemographicTickler.do*
// @include  *tickler/ticklerAdd.jsp*
// @include  *dms/showDocument.jsp?segmentID*
// @description Adds Reminders for screening follow up,link to Rx and invoice
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.10
// @grant       none
// ==/UserScript==


/*
open about:config and set the following to true.
dom.allow_scripts_to_close_windows
Requires Push to Reminders eform found at:
https://github.com/DrStanMD/Oscar-GM4-scripts/blob/master/Push_to_Reminder.zip
Edit the "Push to Reminder" eform and mark the following boxes as checked:
Show Only Latest Revision of eForm Template
Show Only Latest Revision of eForm Instance
Patient Independent
*/
var inputvar = 226 //form id goes here
var providername = "Dr. Hurwitz"
var providerphone = "604-275-8228"

//**********************************************************

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')

//=====Get Parameters============
//vPath = '../'
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

//get demo_no*********************************************

if (!myParam) {
    //alert("NO DEMO NO")
    var x = document.getElementsByName("demog");
    if (x[0]) {
        var demo_no = x[0].value
        //alert("1 - " + demo_no)
    }
    var x = document.querySelector('[title="Annotation"]');
    if (x) {
        var y = x.outerHTML
        var demo_no = y.substring(y.lastIndexOf("demo=") + 5, y.lastIndexOf("&amp;"));
        //alert("2 - " + demo_no)
    }
    var x = document.getElementsByClassName("NarrativeRes");
    if (x[0]) {
        var y = x[0].innerHTML
        //alert(y)
        var demo_no = y.substring(y.lastIndexOf("demo=") + 5, y.lastIndexOf("&amp;labType=HL7"));
        //alert("3 - " + demo_no)
    }

} else {
    var myParam = location.search.split('demographicId=')[1]
    //alert(myParam)
    var res = myParam.indexOf('&')
    var demo_no = myParam.substring(0, res)
    //alert(demo_no)
}
//end get demo_no**************************************************
//alert(demo_no)



if (demo_no) {
    demoNo = demo_no
    // alert("derived" +demoNo)
}
if (params.demographicId) {
    var demoNo = params.demographicId
    //alert("Params" + demoNo)
}
if (params.demographic_no) {
    var demoNo = params.demographicId
    //alert("Params" + demoNo)
}

if (!parseInt(demoNo)) {

    myWindow = unsafeWindow.handleLab('',params.segmentID,'msgLab') // opens message window to get demoNo
    //myWindow = window.open(vPath + "oscarMDS/SearchPatient.do?labType=HL7&segmentID=" + params.segmentID + "&name=")
    setTimeout(function() {
        myWindow.close(); //2022-Dec-13
    }, 500);



    setTimeout(function() {
        var params2 = {};
        if (myWindow.location.search) {
            var parts = myWindow.location.search.substring(1).split('&');
            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params2[nv[0]] = nv[1] || true;
            }
        }
        //alert(params2.demographicNo)
        //alert(myWindow.location)
        demoNo = params2.demographicNo
        demono = params2.demographicNo
        demo_no = params2.demographicNo //2021-Aug-27
        localStorage.setItem("DemoNo", demoNo);
    }, 500);

}
alert(localStorage.getItem("DemoNo"))
//alert("demoNo=" + demoNo)
//alert("demono=" + demono)