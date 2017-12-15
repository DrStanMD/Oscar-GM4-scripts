// ==UserScript==
// @name        Graphing Measurements

// @namespace   Stanscripts

// @description Graphs measurements

// @include     *oscarEncounter/oscarMeasurements/SetupDisplayHistory.do*

// @grant       none

// ==/UserScript==


var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
vPath = ("https://" + location.host + "/" + firstElement)
//alert(vPath)

//get parameters
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
//alert(params.type)

var formPath = vPath + "/eform/efmshowform_data.jsp?fid=74&LabName=" + params.type
//alert(formPath)

var input3=document.createElement("input");
input3.type="button";
input3.value="JS GRAPH";
input3.onclick = showAlert3;
input3.setAttribute("style", "font-size:16px;position:relative;bottom:45px;left:480px;");
document.body.appendChild(input3); 
 function showAlert3()
{
window.open(formPath)
}

