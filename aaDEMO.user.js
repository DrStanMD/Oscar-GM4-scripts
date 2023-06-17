
// ==UserScript==
// @name        aaGM demo
// @namespace   Stanscripts
// @description GM cheatsheat demostration
// @include     *
// @include     *billing/CA/BC/billStatus.jsp*
// @require     https://code.jquery.com/jquery-3.6.4.min.js
// @grant       none
// ==/UserScript==


//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ("https://" + location.host + "/" + firstElement + "/")
alert(vPath)
//*****************************************************************


//========Buttons============
var input1 = document.createElement("input");
input1.type = "button";
input1.value = "BUTTON NAME";
input1.id = "testbutton";
input1.onclick = ButtonFunction1;
input1.setAttribute("style", "font-size:12px; position:fixed; top:200px; left:100px; background-color: lime;");
//input1.setAttribute("style", "font-size:12px; position:absolute; top:200px; left:100px; background-color: lime;");
document.body.appendChild(input1);


function ButtonFunction1() {
    alert("Hello World!")
    //change button color
    document.getElementById('testbutton').style.backgroundColor = 'red';

    //open form
    var formPath = vPath + '/eform/efmformadd_data.jsp?fid=999&demographic_no=' + 1 // INSERT YOU OWN form ID (fid=??) here
    //alert(formPath)
    window.open(formPath)
}
//**************************
