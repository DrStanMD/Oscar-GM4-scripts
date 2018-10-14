// ==UserScript==
// @name           Tickler Add Hyperlink disabled
// @namespace      StansScripts
// @description Adds Hyperlink to Encounter Screen Tickler
// @include        */tickler/ticklerAdd.jsp*
// @include        *tickler/ForwardDemographicTickler.do*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     1.2
// ==/UserScript==


//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
vPath = ("https://" + location.host + "/"  + firstElement + "/")

//=====Get Parameters============
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

if(params.docType){
var input4=document.createElement("input");
input4.type="button";
input4.value="Add Hyperlink";
input4.onclick = showAlert4;
input4.setAttribute("style", "font-size:16px;position:fixed;top:18px;left:60px; ");
document.body.appendChild(input4); 
}

function showAlert4()
{
  alert(params.docType)
 if (params.docType=="HL7"){	
myDocLink =vPath + "lab/CA/ALL/labDisplay.jsp?&segmentID=" +params.docId +"&providerNo=1"
//myDocLink =vPath + "lab/CA/ALL/labDisplay.jsp?&amp;segmentID" +params.docId +"&amp;providerNo=1"    
 }
if (params.docType=="DOC"){	
	myDocLink =vPath + "dms/ManageDocument.do?method=display&doc_no=" +params.docId
 }
myDocLink2 = "<a href='"+myDocLink+"' nowrap target='_blank', 'scrollbars=yes' >DoC</a>;"
myText = $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val()
textpad = 52 - myText.length
myText= myText+Array(textpad).join(".")
$('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val(myText+myDocLink2)   
}
