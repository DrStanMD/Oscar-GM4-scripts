// ==UserScript==
// @name        Print Current Meds
// @namespace   Stanscripts
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description Very large button to print current medications (eases locum frustration)
// @include     *oscarRx/choosePatient.do?*
// @version     15.1
// @grant       none
// ==/UserScript==
//========Get Path============
window.resizeTo(1200, 800);
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //rxlabel = vPath+'/eform/efmformadd_data.jsp?fid=416&demographic_no=3685&rxdata1=test1&rxdata2=test2'
//window.open(rxlabel)
var input1 = document.createElement('input');
input1.type = 'button';
input1.id = 'Button'
input1.value = 'Print Current Medication List';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:14px;position:fixed;top:55px;right:0px;');
document.body.appendChild(input1);

function showAlert1() {
    unsafeWindow.popupWindow(720, 700, 'PrintDrugProfile2.jsp')
}


var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var newURL = vPath + "/oscarRx/SelectPharmacy2.jsp"
//alert(newURL)	
//window.open(newURL)

$(document).ready(function() {
    var searchbar = "<input id='fax' style ='background-color: white;' name='fax' type='text'>"
    var messagebar = "<input id='message' style ='background-color: white;' name='fax' type='text' value = 'copied' >"
    $('#Calcs').after("Fax#" + searchbar)
    $('#fax').after(messagebar)
    $('#message').width("40px")
    $('#message').css('background-color', 'lime')
    $("#message").hide()
    $('#fax').width("85px")
    $('#fax').click(function() {
        this.select();
        document.execCommand('copy');
        //$(this).css('background-color', 'pink')
        $("#message").fadeIn("slow");
        $("#message").fadeOut("slow");
    })


    function getMeasures(measure) {
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var str = xmlhttp.responseText; //local variable
                if (!str) {
                    return;
                }
                //alert(str)
                var myRe = /"fax".*","email/g; //for the fax     
                var myArray;
                var i = 0;
                while ((myArray = myRe.exec(str)) !== null) {
                    y = myArray.toString()
                    y = parseInt(y.replace(/[^0-9]/g, '')).toString()
                    y = y.trim()
                    x = y.length
                    y = y.substring(0,x-7)+"-"+y.substring(x-7,x-4)+"-"+y.substring(x-4)
                    //alert(y)
                    i = i + 1;
                    break //first occurrence only
                }
            }
        }
        xmlhttp.open("GET", newURL, false);
        xmlhttp.send();
    }
    getMeasures()
    $('#fax').val(y)

});
