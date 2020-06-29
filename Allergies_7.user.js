// ==UserScript==
// @name        Allergies
// @namespace   Stanscript
// @include  *casemgmt/forward.jsp?action*
// @include  *demographic/demographiccontrol.jsp?demographic_no*
// @description Adds Navigation buttons for NKDA and common allergies, Auto FLUSHOT button
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
/*
Indemnity
Although reasonable care is taken to test the scripts before publishing, 
everything you see here is meant to be informational only, and should be used with caution. 
No guarantee is made or implied about the scripts here whatsoever. 
Using scripts described here may result in errant behavior in the EMR, 
inadvertently harming patients, and general badness. 
Using any parts of the code implies you fully understand the code and the risks associated with using it.
*/
function setCookie(cname, cvalue, exdays, cpath) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    //d.setTime(d.getTime() + (exdays * 5000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
AA = []
AA[0] = [
    'Penicillin',
    'ID=44452&name=PENICILLINS&type=10'
]
AA[1] = [
    'Sulfonamides',
    'ID=44159&name=SULFONAMIDES&type=10'
]
AA[2] = [
    'Macrolides (Erythromicin et al)',
    'ID=46140&name=MACROLIDES&type=10'
]
AA[3] = [
    'Macrodantin',
    'ID=11499&name=MACROBID+100MG&type=13'
]
AA[4] = [
    'Latex',
    'ID=0&type=0&name=LATEX'
]
AA[5] = [
    'ACEI',
    'ID=46274&name=ANGIOTENSIN-CONVERTING+ENZYME+INHIBITORS&type=10'
]
AA[6] = [
    'ASA',
    'ID=46283&name=SALICYLATES&type=10'
]
AA[7] = [
    'Codeine',
    'ID=44212&name=CODEINE&type=8'
]
AA[8] = [
    'Morphine',
    'ID=44217&name=MORPHINE&type=8'
]
AA[9] = [
    'SBE prophylaxis',
    'ID=0&type=0&name=ANTIBIOTIC PROPHYLAXIS REQUIRED'
]
AA[10] = [
    'Envorinmental',
    'ID=0&type=0&name=ENVIRONMENTAL ALLERGIES'
]
AA[11] = [
    'Jehova Witness',
    'ID=0&type=0&name=NO BLOOD PRODUCTS'
] //*************ADD ALLERGY ALIAS AND URL HERE USING THE PATTERN ABOVE****************
/*
AA[10] = [
  'Envorinmental',
  'ID=0&type=0&name=Environmental Allergies'
]
AA[nn] = [
  'Alias',
  'Drug URL'
]
AA[nn] = [
  'Alias',
  'Drug URL'
]
*/
//***********************************************************************************
var myRadio = '<br></br><div id=\'RadioDiv\'>'
for (i = 0; i < AA.length; i++) {
    var myId = 'Aller' + i.toString();
    var myLabel = AA[i][0]
    var myValue = AA[i][1]
    var myRadio = myRadio + '<input name=\'AllergyR\' id=' + myId + ' type=\'radio\'     value=' + myValue + ' /><label for=' + myId + '>' + myLabel + '</label><br>'
}
myRadio = myRadio + '<input name=\'AllergyR\'  id=\'Cancel\' type=\'radio\'  value= \'cancel\' /><label for= \'Cancel\'>CANCEL</label><br></div><br></br>' //========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
if (params.demographic_no) {
    demoNo = params.demographic_no
} else {
    demoNo = params.demographicNo
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'NKDA';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:8px;position:absolute;top:0px;right:50px;background-color: #00FF00');
document.body.appendChild(input1);

function ButtonFunction1() {
    myWindow = window.open(vPath + '/oscarRx/showAllergy.do?demographicNo=' + demoNo + '&view=All', 'myWindow');
    // Opens a new window
    setTimeout(function() {
        myWindow2 = window.open(vPath + '/oscarRx/addReaction2.do?ID=0&type=0&name=NKDA', 'myWindow2')
        myWindow.close();
    }, 200);
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'OTHER';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:8px;position:absolute;top:0px;right:100px;background-color: #FFC0CB;');
document.body.appendChild(input2);

function ButtonFunction2() {
    if (params.demographic_no) {
        var myElement = '.TopStatusBar > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)'
        var RestoreHTML = $(myElement).html()
        $(myElement).html(myRadio)
    } else {
        var myElement = '#allergies > div:nth-child(3) > h3:nth-child(1)'
        var RestoreHTML = $(myElement).html()
        $(myElement).html(myRadio)
    }
    var addthis = '' //  input2.style.visibility = "hidden";
    document.getElementById('RadioDiv').addEventListener('click', function() {
        if (document.getElementById('Cancel').checked) {
            $(myElement).html(RestoreHTML)
        }
        for (i = 0; i < AA.length; i++) {
            xyz = 'Aller' + i
            if (document.getElementById(xyz).checked) {
                addthis = AA[i][1] //alert(addthis)
                $(myElement).html(RestoreHTML)
                myWindow = window.open(vPath + '/oscarRx/showAllergy.do?demographicNo=' + demoNo + '&view=All', 'myWindow');
                // Opens a new window
                setTimeout(function() {
                    myWindow2 = window.open(vPath + '/oscarRx/addReaction2.do?' + addthis, 'myWindow2')
                    myWindow.close();
                }, 200);
            }
        }
    });
} // button for last years flushot

/*
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Flu Shot';
input3.onclick = ButtonFunction3;
input3.setAttribute('style', 'font-size:8px;position:absolute;top:32px;left:90px;background-color: #FFC0CB;');
document.body.appendChild(input3);
function ButtonFunction3() {
  y = (30 / 86400) //5 seconds
  setCookie('RELOAD', 'RELOADED', y, 'path=/') //alert(input202.value)
  myWindow = window.open(vPath + 'oscarPrevention/AddPreventionData.jsp?prevention=Flu&demographic_no=' + demoNo + '&prevResultDesc=&flushot', 'myWindow', 'width=800, height=600');
}
*/
