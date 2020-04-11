// ==UserScript==
// @name           BillingFormDefault
// @namespace   StansScripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description Sets the default billing physician and date today when billing from Master screen.
// @include        *billing.do?billRegion=BC&billForm*
// @include          *CaseManagementEntry.do*
// @version     15.3
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

var y = document.createElement("SELECT");
y.setAttribute("id", "mySelect2");
y.setAttribute("style", "font-size:12px;position:absolute;top:15px;left:0px;")
document.body.appendChild(y);
document.getElementById("mySelect2").style.backgroundColor = "lime";


//localStorage.clear();
//alert(params.billForm)
//alert(localStorage.getItem("default_index"));
//alert(localStorage.getItem("default_bform"))

if(!localStorage.getItem("default_bform")){
alert("Default billing form has not been set on this computer.  Setting default to GP.")
localStorage.setItem("default_bform", "('GP'),'GP'");
localStorage.setItem("default_index", "2");
}

var default_index = ""
var default_bform = ""
default_index = localStorage.getItem("default_index");
default_bform = localStorage.getItem("default_bform");
var yy = default_bform.split(",")[1]
//alert(yy.replace(/'/g,''))
var newdefault = yy.replace(/'/g, '')

if (params.billForm != newdefault) {
    var str = window.location.href;
    var res = str.replace("&billForm=" + params.billForm, "&billForm=" + newdefault)
    //alert(res)
    unsafeWindow.updateBillForm(newdefault)
    //location.replace(res) //COMMENT THIS LINE OUT TO DISABLE
}

var regExp = /\(([^)]+)\)/; //get value between parentheses
var formlist = []
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
    //alert(mytag[i].href)
    var hrefvalue = mytag[i].href
    if (hrefvalue.indexOf("updateBillForm") > -1) {
        var matches = regExp.exec(hrefvalue);
        //alert(matches)
        //formlist[i]=matches


        var x = document.getElementById("mySelect2");
        var option = document.createElement("option");
        option.text = matches;
        option.onclick = showAlert10;
        x.add(option);

    }
}

function showAlert10() {
    alert(this.value + " is now set as the default billing form on this computer.")
    localStorage.setItem("default_bform", this.value);
    localStorage.setItem("default_index", document.getElementById("mySelect2").selectedIndex);
    //alert(localStorage.getItem("default_index"));
    location.reload();
}
document.getElementById("mySelect2").selectedIndex = default_index
