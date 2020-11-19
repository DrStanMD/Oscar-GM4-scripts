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
//alert($('#prescrip_51814').text())
//alert($('prescrip_51802').text())
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //rxlabel = vPath+'/eform/efmformadd_data.jsp?fid=416&demographic_no=3685&rxdata1=test1&rxdata2=test2'
//window.open(rxlabel)
var input1 = document.createElement('input');
input1.type = 'button';
input1.id = 'Button'
input1.value = 'Print Current Medication List';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:14px;position:fixed;top:0px;right:0px;');
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
    $('#Calcs').after("Fax#"+searchbar)
    $('#fax').width("80px")
    $('#fax').click(function() {
    this.select();
    document.execCommand('copy');
    $(this).css('background-color', 'yellow')
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

            var myRe = /\"phone2\"\:\"\"\,\"fax\".*?\"\,\"email/g; //for the fax
            var myRe2 = /^\(\d{3}\) \d{3}-\d{4}$/
          
            var myArray;
            var i = 0;
            while ((myArray = myRe.exec(str)) !== null) {
                y = myArray.toString()
                //alert(y)
                //z = myRe2.exec(y)
                y = parseInt(y.replace(/[^0-9]/g,'')).toString()
                y  = y.substring(1)
                //alert(z)
                i = i + 1;
                break  //first occurrence only
            }
        }
    }
    xmlhttp.open("GET", newURL, false);
    xmlhttp.send();
}
getMeasures()
$('#fax').val(y)

  });

/*
  alert($('#prescrip_51813').text())
  var rxprint = $('#rxText').text();
  rxprint = rxprint.split('Ingredient:')
  rxprint = rxprint[1].split('Method:')
  var rxdrug=rxprint[0].trim()
  alert(rxdrug
  */
/*  
  var rxprint = $('#rxText').text();
  //alert(rxprint)
  rxprint = rxprint.split('Frequency:')
  rxprint = rxprint[1].split('Min:')
  var rxfreq=rxprint[0].trim()
  alert(rxfreq)
  
  var rxprint = $('#rxText').text();
  alert(rxprint)
  rxprint = rxprint.split('Frequency:')
  rxprint = rxprint[1].split('Min:')
  var rxfreq=rxprint[0].trim()
  alert(rxfreq)
*/
/*
  rxprint = rxprint[1].split('Method:')
   alert(rxprint)
  var rxfreq=rxprint[0].trim()
  alert(rxfreq)

  
  
//  rxprint3 = (rxprint2.replace(/<br>/g, '  ')).trim()
  //alert(rxprint3)
  qend = rxprint3.search('Repeats')
  qsplit = rxprint3.search('Qty:')
  //alert(rxprint3.split(qsplit))
  qty = rxprint3.substring(rxprint3.search('Qty:') + 4, qend - 1)
  qtyInwords = ucFirst(inWords(qty))
  rxprint3 = rxprint3.slice(0, qend)
  rxprint4 = rxprint3.replace('Qty:' + qty.toString(), 'Qty:' + qty.toString() + '(' + qtyInwords + ')  ')
  qsplit = rxprint4.search('Qty:')
  rx1 = rxprint4.slice(0, qsplit).trim()
  rx2 = rxprint4.slice(qsplit).trim()
  
  
  
 // S('.DivContentSectionHead > a:nth-child(1)').click()
 // window.open(vPath + 'oscarRx/PrintDrugProfile2.jsp', '', 'width=800,height=800')
  rxlabel = vPath+'/eform/efmformadd_data.jsp?fid=416&demographic_no=3685&rxdata1=digoxin&rxdata2=5555'
  //rxlabel = 'https://secure10.oscarhost.ca/SDHurwitzInc/eform/efmformadd_data.jsp?fid=416&demographic_no=' + demoNo + '&rxdata1=' + rx1 + '&rxdata2=' + rx2
  alert(rxlabel)
  //window.open(rxlabel)
}
*/
