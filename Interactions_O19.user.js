// ==UserScript==
// @name        Interactions_O19
// @namespace   Stanscript
// @include     *REST/rxcui*
// @include     *REST/interaction*
// @include     *oscarRx/choosePatient.do*
// @description Shows drug interactions
// @version     1.3
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
        var druglist = ["newsession"]
        var mytag = document.getElementsByTagName('a');
        for (var i = 0; i < mytag.length; i++) {
            if (mytag[i].outerHTML.indexOf("query=") > -1) {
                y = mytag[i].innerHTML
              
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
        druglist.push("end")
        //alert(druglist)
        mywindow = window.open("https://rxnav.nlm.nih.gov/REST/rxcui?druglist=" + druglist)
    }
}

if (URL.indexOf("REST/interaction") > -1) {
    var alertlist = ""
    //alert("HELLO")
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


if (URL.indexOf("REST/rxcui") > -1) {

    var y = params.druglist
    newlist = y.split(",")
    //alert(newlist)
    //alert(newlist[0])

    if (newlist[0] == "newsession") {
        localStorage.setItem("BIN", "");
        y = localStorage.getItem("BIN");
        //alert("stored:  "+y)
    }

    if (params.name) {
        //alert(params.name)
        if (params.name == "end") {
            y = localStorage.getItem("BIN").slice(1) //remove leading +
            //alert(y)
            window.close()
            window.open("https://rxnav.nlm.nih.gov/REST/interaction/list?rxcuis=" + y)
            throw new Error();

        }

        var text = document.documentElement.textContent
        var y = localStorage.getItem("BIN");
        //alert(y)
        //alert(text)
        localStorage.setItem("BIN", y + "+" + text);
        y = localStorage.getItem("BIN");
        //alert(y)
        window.close()
    }

    newlist.shift()
    //alert("Newlist: "+newlist)
    //alert(y)
    window.close()
    window.open(vPath + "rxcui?name=" + newlist[0] + "&druglist=" + newlist)

}
