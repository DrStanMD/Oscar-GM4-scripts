// ==UserScript==
// @name        Interactions
// @namespace   Stanscript
// @include     *REST/rxcui*
// @include     *REST/interaction*
// @include     *oscarRx/choosePatient.do*
// @description Shows drug interactions
// @version     1.7
// @grant       none
// ==/UserScript==

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

var URL = window.location.toString()
//alert(URL)

//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ("https://" + location.host + "/" + firstElement + "/")
//alert(vPath)

if (URL.indexOf("oscarRx/choosePatient") > -1) {

    //========Buttons============
    var input1 = document.createElement("input");
    input1.type = "button";
    input1.value = "Drug Interactions";
    input1.onclick = ButtonFunction1;
    input1.setAttribute("style", "font-size:12px;position:fixed;top:30px;right:0px;background-color: red;");
    document.body.appendChild(input1);

    function ButtonFunction1() {
        var druglist = []
        var mytag = document.getElementsByTagName('a');
        for (var i = 0; i < mytag.length; i++) {
            if ((mytag[i].innerText.indexOf("Ingredient") > -1) || mytag[i].outerHTML.indexOf("query=") > -1) {
                y = mytag[i].innerText.replace(/&nbsp;/g, ' ').trim()

                if (mytag[i].innerText.indexOf("Ingredient") > -1) {
                    y = mytag[i].innerText.substring(12)
                    //alert(y)
                }

                y = y.split("/")

                for (j = 0; j < y.length; j++) {
                    y[j] = y[j].trim()
                    newword = y[j].match(/(?:^|(?:\.\s))(\w+)/)
                    //alert(newword[0])
                    druglist.push(newword[0])
                    //alert(druglist)
                }
            }

        }
        alert("Searching the following drugs for interactions:\n\n"+druglist)
        //mywindow = window.open("https://rxnav.nlm.nih.gov/REST/rxcui?druglist=" + druglist)
      
        //********************************************************
        var searchlist = ""

        function getMeasures(measure) {
            xmlhttp = new XMLHttpRequest();
            var pathArray = window.location.pathname.split('/');
            var newURL = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + measure;
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var str = xmlhttp.responseText; //local variable
                   //alert(str)
                   searchlist += str.match(/(\d+)/)[0] + "+"
                   //alert(searchstring)
                }
            }
            xmlhttp.open("GET", newURL, false);
            xmlhttp.send();
        }
        
        for(i=0; i<druglist.length; i++){     
        getMeasures(druglist[i])
        }
        //alert(searchlist)
        window.open("https://rxnav.nlm.nih.gov/REST/interaction/list?rxcuis=" + searchlist)
        //********************************************************
    }
}


if (URL.indexOf("REST/interaction") > -1) {
    var alertlist = ""
    
    var parser, xmlDoc;
    var text = new XMLSerializer().serializeToString(document)

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");

    y = xmlDoc.getElementsByTagName("description").length

    for (x = 0; x < y; x++) {
        z = (xmlDoc.getElementsByTagName("description")[x].childNodes[0].nodeValue);
        alertlist = alertlist + "\n\n" + z
    }
    alert(alertlist)
    window.close()
}
