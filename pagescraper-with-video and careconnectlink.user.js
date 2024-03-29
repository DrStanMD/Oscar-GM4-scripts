// ==UserScript==
// @name        Pagescraper with videolink and careconnect link
// @namespace   Stanscripts
// @description adds demographic details to echart
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @include   *oscarEncounter*
// @include  *careconnect*
// @exclude  *oscarConsultationRequest*
// @require  https://code.jquery.com/jquery-3.6.4.min.js
// @grant       GM.setValue
// @grant       GM.getValue
// @version 16.3
// ==/UserScript==

/************************
for email to function properly:
set about:config
network.protocol-handler.expose.mailto to true
*/

if (window.location.href.indexOf("careconnect") != -1) {
    (async () => {
        var phn = await GM.getValue("LinkPHN");
        if (phn != undefined) {
            console.log("Filled PHN from GM global value");
            $('#search').val(phn);
        }
    })();
}


var params = {}; //Get Params
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}


//****Future use to open Measurement and write to the current Encounter note
$(document).ready(function() {
var inputgroupno
var str = localStorage.getItem("instructions" + params.demographicNo)
if (str) {
    //alert(str)
    /*
        $(document).ready(function() {
            //Find INR input group number  
            
              for (i = 0; i < 100; i++) {
              
                  var x = ($('#menu3 > a:nth-child(' + i + ')').html())
                  if (x) {
                      //alert(x)
                      if (x.indexOf('INR') > -1) { //search for this group
                          inputgroupno = i
                        alert(i)
                          break;
                      }
                  }
              }
              
            inputgroupno = 12
            //alert(inputgroupno)
            $('#menu3 > a:nth-child(' + inputgroupno + ')').html()
        });
    */

    setTimeout(function() {
        //window.open(vPath+'/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=INR Management')
        //alert(str)
        $('#menu3 > a:nth-child(' + 12 + ')').click() //to click on the INR
        setTimeout(function() {
            localStorage.setItem("instructions" + demographicNo, "")
        }, 100);
      }, 5000);
}
  })
//****End Future use to write to the current Encounter note


//Reserve line in header
//var header = document.getElementById('encounterHeader');
var header = document.getElementById('encounterPageData')

var headerReserve = header.innerHTML
header.innerHTML += '<br>'

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
//vPath = '../'
//var myParam = location.search.split('demographicNo=')[1]
//var res = myParam.indexOf('&')
//var demo_no = myParam.substring(0, res)
var demo_no = params.demographicNo
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
//alert(demo_no)
var demoArray = [
    'Blank for backward compatibility',
    'Blank for backward compatibility',
    'Blank for backward compatibility',
    'Address',
    'City',
    'Postal',
    'Age',
    'Health Ins',
    'Phone(H)',
    'Phone(W)',
    'Cell Phone',
    'Email'
]

var demoArrayVal = []

function getMeasures(measure) {
    xmlhttp = new XMLHttpRequest();
    var pathArray = window.location.pathname.split('/');
    var newURL = vPath + '/demographic/demographiccontrol.jsp?demographic_no=' + demo_no + '&displaymode=edit&dboperation=search_detail'
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText)
            //var str = xmlhttp.responseText.replace(/\s/g, '')
            var str = xmlhttp.responseText
            if (!str) {
                return;
            }


            switch (measure) {
                case "Phone(H)":
                    var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][' + 'H' + '][)]' + '(.|[\n])*'
                    break;
                case "Phone(W)":
                    var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][W][)]' + '(.|[\n])*'
                    break;
                default:
                    var myReString = '<span class="label">[\n\r\t]*\s*' + measure + '(.|[\n])*'
            }


            var myRe = new RegExp(myReString, 'g');
            var myArray
            while ((myArray = myRe.exec(str)) !== null) {
                y = myArray.toString()
                //alert(y)
                var z = y.indexOf('info')
                var mycode = y.substring(z + 6)
                var mycode2 = mycode.indexOf('</span>')
                var mycode3 = mycode.substring(mycode + 9, mycode2)
                //alert(j + measure + ' is ' + mycode3)
                demoArrayVal[j] = mycode3
            }
        }
    }
    xmlhttp.open('GET', newURL, false);
    xmlhttp.send();
}
$(document).ready(function() {

    //$('.Header > a:nth-child(3) > span:nth-child(1))').click()  //2021-Aug-23 for appointment history
    for (j = 0; j < demoArray.length; j++) {
        //demoArray[j]= demoArray[j].replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "");  //remove parentheses
        //alert(demoArray[j])
        getMeasures(demoArray[j]);
    }


    var passPHN = demoArrayVal[7].substr(0, 10);
    localStorage.setItem("LinkPHN", passPHN); //STORE PHN
    GM.setValue("LinkPHN", passPHN);
    //alert(passPHN)
    console.log(`Saved PHN to GM global values: ${passPHN}`);

    var input21 = document.createElement("input");
    input21.type = "button";
    input21.value = "CareC";
    input21.onclick = ButtonFunction21;
    input21.setAttribute("style", "font-size:11px;position:absolute;top:0px;right:180px;");
    document.body.appendChild(input21);

    function ButtonFunction21() {
        window.open("https://health.careconnect.ca?" + passPHN, "newWindow", target = "_blank")
    }

    /*
    var Clipboard=document.createElement("input");
    Clipboard.type="button";
    Clipboard.value="Clipboard:";
    Clipboard.setAttribute("style", "position:absolute; top:32px; left:580px; width:75px; font-size:12px; text-align:center; background-color:pink;");
    document.body.appendChild(Clipboard);

    $(".copyable").click(function() {
    var textArea = document.createElement("textarea");
    textArea.value = this.innerHTML;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    $(this).css('background-color', 'pink')
    textArea.setAttribute('style', 'position:absolute; top:32px; left:660px; width:120px; height:13px; font-size:13px; resize:none;');
    textArea.setAttribute('title', 'Clipboard');
    // textArea.remove();  // to hide text area
    })
    */

    var HCN = demoArrayVal[7]
    res = HCN.slice(0, 4)
    res = res + ' ' + HCN.slice(4, 7)
    res = res + ' ' + HCN.slice(7)
    HCN = res
    header.innerHTML = headerReserve
    var headerExtra1 = 'Cell: '
    var headerExtra2 = ' Age: '
    var headerExtra3 = 'File#: '
    var headerExtra4 = 'PHN: '
    var headerExtra5 = ' Addr: '
    /*
    $demoArrayVal[4].click(function()){
    alert(this.value);
    }); 
    */

    //var str = $('.Header > a:nth-child(1)').text()
    var str = document.querySelector('[title="Master Record"]').innerHTML;
    //alert(str)
    var res = str.split(" ");
    var ptname = res[1] + ' ' + res[0]
    ptname = ptname.replace(",", " ");
    //alert(ptname)

    header.innerHTML += (headerExtra1.bold() + demoArrayVal[10] + headerExtra5.bold() + demoArrayVal[3] + ', ' + demoArrayVal[4] +
        ' ' + headerExtra4.bold() + HCN.bold() + "Age:".bold() + demoArrayVal[6].fontcolor("red").bold() + '   email: '.bold() + demoArrayVal[11] + '   '
        //+ '<a href="mailto:' + ptname + '<' + demoArrayVal[1] + '>' + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
        +
        '<button type="button" id="button10">Send email</button>'
    );
    document.getElementById("button10").onclick = do_email;
    document.getElementById("button10").setAttribute('style', 'font-size:12px;position:fixed;top:17px;right:90px;z-index:100;'); //background-color:#FC74FD

    function do_email() {
        //alert(demoArrayVal[1])
        /*
            var x  = demoArrayVal[1].split(";")
            alert(x.length)
            alert(x[0])
        */
        //var email = demoArrayVal[1]
        var email = ptname + '<' + demoArrayVal[11] + '>'
        //var mailto_link = 'mailto:' + email + '?Subject=Confidential medical information'
        //window.open(mailto_link, 'emailWindow',target="_blank")
        var mailto_link = "mailto&su=Confidential+medical+information&to=" + email
        window.open("https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=" + mailto_link)
    }

})

var input11 = document.createElement("input");
input11.type = "button";
input11.value = "OPEN ZOOM";
input11.onclick = ButtonFunction11;
input11.setAttribute("style", "font-size:12px;position:fixed;top:17px;right:0px;z-index:100");
document.body.appendChild(input11);

function ButtonFunction11() {
    //$('#button10').click()
    window.open("https://zoom.us/", "newWindow", "_blank")
}
