// ==UserScript==
// @name        Interactions
// @namespace   Stanscript
// @include     *REST/rxcui*
// @include     *REST/interaction*
// @include     *google*
// @version     1
// @grant       none
// ==/UserScript==

//https://rxnav.nlm.nih.gov/REST/rxcui?name=omeprazole&druglist=keflex,synthroid,end

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


if (URL.indexOf("REST/interaction") > -1) {
	//alert("HELLO")
	var parser, xmlDoc;
	var text = new XMLSerializer().serializeToString(document)

	parser = new DOMParser();
	xmlDoc = parser.parseFromString(text, "text/xml");

	y = xmlDoc.getElementsByTagName("description").length

	for (x = 0; x < y; x++) {
		alert(xmlDoc.getElementsByTagName("description")[x].childNodes[0].nodeValue);
	}
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