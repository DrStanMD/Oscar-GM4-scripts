// ==UserScript==
// @name        eform search
// @namespace   Stanscript
// @include    *efmformslistadd.jsp*
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @description Search Eforms
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.0
// @grant       none
// ==/UserScript==
var params = {}; //Get Params
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
//alert(params.demographicNo)

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var newURL = vPath + "/eform/efmformslistadd.jsp?group_view=&demographic_no=" + params.demographicNo + "&parentAjaxId=eforms"
//alert(newURL)	
//window.open(newURL)

$(document).ready(function() {
    //$('#enTemplate').width("200px"); //widens search field
    var searchbar = "<input id='referral_name' style ='background-color: white;' list='CP' name='referral_name' placeholder='any new eform (wildcard search)' type='text'><datalist id='CP'></datalist>"
    $('#cppBoxes').append(searchbar)
    $('#referral_name').width("250px")

    $("#referral_name").change(function() {
        //alert(this.text)
    });

    $("#referral_name").select(function() {
        $('#cppBoxes').focus()
        //alert($(this).val())
        window.open(vPath + "/eform/" + $(this).val())
        /*  
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString($(this).val(), 'text/html');  //get the text
        //alert($(htmlDoc).text())  
        $(this).val($(htmlDoc).text().trim())
        */
        $(this).val("")
        this.focus()
    });

    function getMeasures(measure) {
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var str = xmlhttp.responseText; //local variable
                if (!str) {
                    return;
                }
                //alert(str)

                var myRe = /<td width="30%" style="padding-left: 7px">\n\s*<.*\n\s*.*\n\s*.*/g; //for the measurement
                var myRe2 = /efmformadd.*&appointment/g; //for onclickvalue
                var myArray;
                var myArray2
                var i = 0;
                while ((myArray = myRe.exec(str)) !== null) {
                    myArray2 = myRe2.exec(str)
                    y = $(myArray.toString()).text()
                    //alert(y)
                    z = myArray2.toString()
                    //alert(z)
                    var cpvalue = y
                    var cptext = z
                    //alert(cpvalue)
                    //alert(cptext)
                    $('#CP').append($("<option>").attr('value', cptext).text(cpvalue));
                    i = i + 1;
                }
            }
        }
        xmlhttp.open("GET", newURL, false);
        xmlhttp.send();
    }
    getMeasures()
});

/*
//*********Parse Table*************
var formFields = []
function myFunction() {
    var formTable = $('table .elements')
    formTable.attr('id', 'formTable');

    var tableRows = $('#formTable tr').length;
    var tableLength = document.getElementById("formTable").rows.length;
    var cellsLength = document.getElementById("formTable").rows[1].cells.length;
    //alert(tableLength)

    for (i = 1; i < tableLength; i++) {
        var firstcell = document.getElementById("formTable").rows[i].cells[0].innerHTML
        //alert(firstcell)
        if (firstcell) {
            formFields[i] = new Array(0)
            var firstcell = document.getElementById("formTable").rows[i].cells[0].innerHTML
            var y = document.getElementById("formTable").rows[i].cells[0].innerHTML
            var z = $(document.getElementById("formTable").rows[i].cells[0]).text()
            alert(y)
            alert(z)
            formFields[i] = y
        }
    }

    //alert(formFields.length)
    for (i = 1; i < formFields.length; i++) {
        //alert(formFields[i])
        var cpvalue = formFields[i]
        var cptext = $(formFields[i]).text()
        alert(cpvalue)
        alert(cptext)
        //$('#CP').append($("<option>").attr('value', cptext).text(cpvalue));
    }
    //alert(headers)
}
myFunction()
*/
