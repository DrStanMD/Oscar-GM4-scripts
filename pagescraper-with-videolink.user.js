// ==UserScript==
// @name        Pagescraper with videolink
// @namespace   Stanscripts
// @description adds demographic details to echart
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// @version 15.8
// ==/UserScript==

/*
$(document).ready(function() {
  //$('#enTemplate').width("200px"); //widens search field
 var searchbar = "<input id='referral_name' style ='background-color: white;' list='CP' name='referral_name' onblur='this.style.width = /200px/' onchange='getValues(this.value)' onfocus='this.style.width = '400px'' onselect='$(/#textTextArea/) focus();this.focus()' placeholder='any eform info' style='width: 200px; font-size: 12px; background: transparent;' type='text'><datalist id='CP'></datalist>" 
$('#cppBoxes').append(searchbar)  
});
*/
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
var inputgroupno
var str = localStorage.getItem("instructions" + params.demographicNo)
if (str) {
    //alert(str)

    $(document).ready(function() {
        //Find INR input group number  
        /*
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
          */

        inputgroupno = 12
        //alert(inputgroupno)
        $('#menu3 > a:nth-child(' + inputgroupno + ')').html()
    });


    $(document).ready(function() {
        setTimeout(function() {
            //window.open(vPath+'/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=INR Management')
            $('#menu3 > a:nth-child(' + inputgroupno + ')').click() //to click on the INR
            //activeNote.value += str
            setTimeout(function() {
                localStorage.setItem("instructions" + demographicNo, "")
            }, 500);
        }, 2000);

    });
}
//****End Future use to write to the current Encounter note


//Reserve line in header
var header = document.getElementById('encounterHeader');
var headerReserve = header.innerHTML
header.innerHTML += '<br>'

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//vPath = ('https://' + location.host + '/' + firstElement + '/')
vPath = '../'
var myParam = location.search.split('demographicNo=')[1]
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res)
var demoArray = [
    'Cell Phone',
    'Email',
    'Blank for backward compatibility',
    'Address',
    'City',
    'Postal',
    'Age',
    'Health Ins',
    'PhoneH',
    'PhoneW'
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
                case "PhoneH":
                    var myReString = '<span class="label">[\n\r\t]*\s*' + 'Phone' + '[(][H][)]' + '(.|[\n])*'
                    break;
                case "PhoneW":
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
                alert(j + measure + ' is ' + mycode3)
                demoArrayVal[j] = mycode3
            }
        }
    }
    xmlhttp.open('GET', newURL, false);
    xmlhttp.send();
}
$(document).ready(function() {
    for (j = 0; j < demoArray.length; j++) {
        //demoArray[j]= demoArray[j].replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "");  //remove parentheses
        //alert(demoArray[j])
        getMeasures(demoArray[j]);
    }
    //alert(demoArrayVal)
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
    header.innerHTML += (headerExtra1.bold() + demoArrayVal[0] + headerExtra5.bold() + demoArrayVal[3] + ', ' + demoArrayVal[4] +
        ' ' + headerExtra4.bold() + HCN + "Age:".bold() + demoArrayVal[6].fontcolor("red").bold() + '   email: '.bold() + demoArrayVal[1] + '   '
        //+ '<a href="mailto:' + demoArrayVal[1] + '?Subject=Confidential medical information" target="_blank">Send Mail</a>'
        +
        '<button type="button" id="button10">Send email</button>'
    );
    document.getElementById("button10").onclick = do_email;
    document.getElementById("button10").setAttribute('style', 'font-size:12px;position:fixed;top:17px;right:90px;z-index:100;'); //background-color:#FC74FD
    //var str = $('.Header > a:nth-child(1)').text()
    var str = document.querySelector('[title="Master Record"]').innerHTML;
    //alert(str)
    var res = str.split(" ");
    var ptname = res[1] + ' ' + res[0]
    ptname = ptname.replace(",", " ");
    //alert(ptname)
    function do_email() {
        //alert(demoArrayVal[1])
        /*
            var x  = demoArrayVal[1].split(";")
            alert(x.length)
            alert(x[0])
        */
        //var email = demoArrayVal[1]
        var email = ptname + '<' + demoArrayVal[1] + '>'
        var mailto_link = 'mailto:' + email + '?Subject=Confidential medical information'
        window = window.open(mailto_link, 'emailWindow')
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
