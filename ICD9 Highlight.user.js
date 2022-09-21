// ==UserScript==
// @name           ICD9 Highlight
// @namespace   StansScripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description highlights CDM codes previusly billed
// @include     *billing.do?billRegion=BC&billForm*
// @include       *billing/CA/BC/adjustBill.jsp*
// @include     *CaseManagementEntry.do*
// @include      *billing/CA/BC/billingBC.jsp*
// @version     15.1
// ==/UserScript==


const CDMcode = [401,49,428,250,573,519,414,585,430,'V15','v15',51,331,290,346];

var mytag = document.getElementsByTagName('a');
setTimeout(function() {
    for (var i = 0; i < mytag.length; i++) {
        var onclickvalue = mytag[i].getAttribute('onclick')
        //alert(onclickvalue)
        if (onclickvalue) {
            if (onclickvalue.indexOf('quickPickDiagnostic') > -1) {
                for (j = 0; j < CDMcode.length; j++) {
                 
             //if(onclickvalue.match(CDMcode[j]))
               // const regex = /[A-Z]/;
               // if(onclickvalue.match(regex))
                   if (onclickvalue.indexOf(CDMcode[j],21) > -1)  //starting at position 21
                        $(mytag[i]).css('background-color', 'yellow');
                }
            }
        }
    }
}, 500);