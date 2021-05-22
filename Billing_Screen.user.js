// ==UserScript==
// @name Billing Screen time default       
// @namespace   Stanscripts
// @description  Set start and end times with one click for time dependent billing codes
// @include     *billing.do?billRegion=BC&billForm=*
// @include     *billing/CA/BC/billingBC.jsp*
// @include     *CaseManagementEntry.do
// @exclude    *CaseManagementEntry.do?method=issuehistory&demographicNo*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// @version 15.3
// ==/UserScript==
//**********************************************************
var inputvar = 228 //form id goes here
//**********************************************************

var x = $('body > form:nth-child(5) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)')

x.mouseover(function(){
    if ($('input[name=\'xml_other1\']').val() == "14033" || $('input[name=\'xml_other1\']').val() == "14075") {
        $('input[name=\'shortClaimNote\']').val('Via video technology')
    }
    if ($('input[name=\'xml_other2\']').val() == "14033" || $('input[name=\'xml_other2\']').val() == "14075") {
        $('input[name=\'shortClaimNote\']').val('Via video technology')
    }
});

/*
$('input[name=\'xml_other1\']').blur(function() {
    if ($('input[name=\'xml_other1\']').val() == "14033" || $('input[name=\'xml_other1\']').val() == "14075") {
        $('input[name=\'shortClaimNote\']').val('Via video technology')
    }
});
$('input[name=\'xml_other2\']').blur(function() {
    if ($('input[name=\'xml_other2\']').val() == "14033" || $('input[name=\'xml_other2\']').val() == "14075") {
        $('input[name=\'shortClaimNote\']').val('Via video technology')
    }
});
*/


//******************************
$('input[name=\'xml_other1\']').width(183)
mybutton = '<input id=\'mybutton\'    type=\'button\'  value=\'2\'>'
mybutton2 = '<input id=\'mybutton2\'    type=\'button\'  value=\'3\'>'
$('input[name=\'xml_other1\']').after(mybutton)
$('input[name=\'xml_other1\']').after(mybutton2)
var allergy = "body > form:nth-child(5) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)"
//$(allergy).css("background-color", "lightyellow");
$(allergy).append(mybutton)
$(allergy).append(mybutton2)

document.getElementById('mybutton').addEventListener('click', function() {
    $('#xml_other1_unit').val('2');
    $(this).css("background-color", "pink");
});
document.getElementById('mybutton2').addEventListener('click', function() {
   $('#xml_other1_unit').val('3');
   $(this).css("background-color", "pink");
});
//******************************************************************
if (inputvar == 0) {
    alert('Set the specific HTML form Id for your Oscar system')
    return false
}
var d = new Date();
var n = d.getFullYear();
var h = d.getHours();
var m = d.getMinutes();
if (h < 10) {
    h = '0' + h
}
if (m < 10) {
    m = '0' + m
} //alert(h)
//alert(m)

var myYears = []
for (i = 0; i < 50; i++) {
    myYears[i] = n - i - 1
}
var myHours = []
for (i = 0; i < 24; i++) {
    if (i < 10) {
        myHours[i] = '0' + i
    } else {
        myHours[i] = i
    }
}
var myMins = []
for (i = 0; i < 60; i++) {
    if (i < 10) {
        myMins[i] = '0' + i
    } else {
        myMins[i] = i
    }
}

function myFunction() {
    var xx = document.createElement('input');
    xx.value = 'End Time:';
    xx.id = 'myLabel'
    xx.setAttribute('style', 'width:60px;font-size:12px;position:fixed;top:17px;right:810px;');
    document.body.appendChild(xx);
    document.getElementById('myLabel').style.backgroundColor = 'black';
    document.getElementById('myLabel').style.color = 'white';
    document.getElementById('myLabel').readOnly = true;
    document.getElementById('myLabel').style.borderStyle = 'none'
    var x = document.createElement('SELECT');
    x.setAttribute('id', 'mySelect');
    x.setAttribute('style', 'width:40px;font-size:12px;position:fixed;top:18px;right:770px;background-color: lime; ');
    for (i = 0; i < 24; i++) {
        document.body.appendChild(x);
        var z = document.createElement('option');
        z.setAttribute('value', myHours[i]);
        z.setAttribute('id', 'H' + myHours[i]);
        var t = document.createTextNode(myHours[i] + ':');
        z.appendChild(t);
        z.onclick = showalert
        document.getElementById('mySelect').appendChild(z);
    }
    var HH = document.getElementById('H' + h).selected = true;
    //*****
    var x1 = document.createElement('SELECT');
    x1.setAttribute('id', 'mySelect1');
    x1.setAttribute('style', 'width:44px;font-size:12px;position:fixed;top:18px;right:730px;background-color: lime; ');
    for (i = 0; i < 60; i++) {
        document.body.appendChild(x1);
        var z1 = document.createElement('option');
        z1.setAttribute('value', myMins[i]);
        z1.setAttribute('id', 'M' + myMins[i]);
        var t1 = document.createTextNode(':' + myMins[i]);
        z1.appendChild(t1);
        z1.onclick = showalert1
        document.getElementById('mySelect1').appendChild(z1);
        // $('mySelect').css('background-color', 'yellow');
    }
    document.getElementById('M' + m).selected = true;
}
myFunction() //document.getElementById('mySelect').size = '2';
//document.getElementById('mySelect1').size = '2';
function showalert() {
    // var x = document.getElementById('mySelect').value;
    h = Number(this.value) // alert(h)
}

function showalert1() {
    // var x1 = document.getElementById('mySelect1').value;
    m = Number(this.value) //alert(m)
} //========Get Path==================================================================

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
if ($('#hlSDate > strong:nth-child(1)').html() != 'Service Date:') {
    //test that we are on the billing page
    //alert("This is not the billing page")
    return
}
var hours = ''
var minutes = ''
var firsthour = ''
var firstminute = ''
var mydemono = ''
if (params.demographic_no) {
    mydemono = params.demographic_no
}
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
    var onclickvalue = mytag[i].getAttribute('onclick') // alert(onclickvalue)
    if (onclickvalue !== null && onclickvalue.indexOf('demographicNo') > -1) {
        // alert(onclickvalue)
        var pstart = onclickvalue.search('demographicNo') //  alert(pstart)
        var pend = onclickvalue.search('InvoiceList') //    alert(pend)
        mydemono = onclickvalue.substring(pstart + 14, pend - 3).toString() //   alert(mydemono)
    }
} //var myTime=" <input type='time'' id='myTime'>"
//var myTime="<input type=time min=9:00 max=17:00 step=900> - 15m increments>"
//$('#service_to_date').after(myTime);

var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Clear';
input4.id = 'Clear'
input4.onclick = showAlert4;
//input4.setAttribute("style", "font-size:12px;position:absolute;top:100px;right:733px;");
input4.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:640px;');
document.body.appendChild(input4);

function showAlert4() {
    hours = ''
    minutes = ''
    firsthour = ''
    firstminute = ''
    $('#xml_other1_unit').val('')
    var theDefault = firsthour;
    var theOptions = document.getElementsByName('xml_starttime_hr')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = firstminute;
    var theOptions = document.getElementsByName('xml_starttime_min')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = hours;
    var theOptions = document.getElementsByName('xml_endtime_hr')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = minutes;
    var theOptions = document.getElementsByName('xml_endtime_min')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
}
var input = document.createElement('input');
input.type = 'button';
input.value = '8 min';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:580px;');
document.body.appendChild(input);

function showAlert() {
    addtime(8)
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = '20 min';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:520px;');
document.body.appendChild(input1);

function showAlert1() {
    addtime(20)
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = '30 min';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:460px;');
document.body.appendChild(input2);

function showAlert2() {
    addtime(30)
}
var input3a = document.createElement('input');
input3a.type = 'button';
input3a.id = 'input3'
input3a.value = '40 min';
input3a.onclick = showAlert3a;
input3a.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:400px;');
document.body.appendChild(input3a);

function showAlert3a() {
    addtime(40)
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.id = 'input3'
input3.value = '50 min';
input3.onclick = showAlert3;
input3.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:340px;');
document.body.appendChild(input3);

function showAlert3() {
    addtime(50)
}
var input5 = document.createElement('input');
input5.type = 'button';
input5.id = 'input5'
input5.value = 'Paste Time to Encounter';
input5.onclick = showAlert5;
input5.setAttribute('style', 'font-size:12px;position:fixed;top:15px;right:180px;');
document.body.appendChild(input5);
document.getElementById('input5').style.backgroundColor = 'lime';

function showAlert5() {
    var sth = ($('select[name=xml_starttime_hr] option:selected').val())
    var stm = ($('select[name=xml_starttime_min] option:selected').val())
    var eth = ($('select[name=xml_endtime_hr] option:selected').val())
    var etm = ($('select[name=xml_endtime_min] option:selected').val())
    addthis = sth + ':' + stm
    addthis2 = eth + ':' + etm //addthis = firsthour + ':' + firstminute
    //addthis2 = hours + ':' + minutes
    window.open(vPath + 'eform/efmformadd_data.jsp?fid=' + inputvar + '&demographic_no=' + mydemono + '&appointment=0' + '&myparam1=' + addthis + '&myparam2=' + addthis2)
}

function addtime(vAddTime) {
    var visittime = (vAddTime)
    var currentTime = new Date() // alert(visittime)
    //  hours = currentTime.getHours()
    hours = Number(h) //  minutes = currentTime.getMinutes()
    minutes = Number(m)
    firstminute = minutes - visittime
    firsthour = hours
    var addzero = [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09'
    ]
    if (firstminute < 0) {
        firsthour = hours - 1
        firstminute = firstminute + 60
    }
    if (firsthour < 0) {
        firsthour = firsthour + 24
    }
    if (firstminute < 10) {
        firstminute = addzero[firstminute]
    }
    if (firsthour < 10) {
        firsthour = addzero[firsthour]
    }
    if (hours < 10) {
        hours = addzero[hours]
    }
    if (minutes < 10) {
        minutes = addzero[minutes]
    }
    var theDefault = firsthour;
    var theOptions = document.getElementsByName('xml_starttime_hr')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = firstminute;
    var theOptions = document.getElementsByName('xml_starttime_min')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = hours;
    var theOptions = document.getElementsByName('xml_endtime_hr')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
    var theDefault = minutes;
    var theOptions = document.getElementsByName('xml_endtime_min')[0].options;

    for (var theOption of theOptions) {
        for (var i = 0; i < 3; i++) {}
        if (typeof(theOption) == 'object') {
            if (theOption.text == theDefault) {
                theOption.selected = true;
                break;
            }
        }
    }
}
