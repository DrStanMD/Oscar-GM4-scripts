// ==UserScript==
// @name        eform search2
// @namespace   Stanscript
// @include    *efmformslistadd.jsp*
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @include   *oscarEncounter*
// @description Search Eforms
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     16.0  FF ESR 91 compatible
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


var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var newURL = vPath + "/eform/efmformslistadd.jsp?group_view=&demographic_no=" + params.demographicNo + "&parentAjaxId=eforms"

$(document).ready(function() {
    //$('#enTemplate').width("250px"); //widens search field
    var searchbar = "<input id='referral_name' style ='background-color: white; color:green;' list='CP' name='referral_name' placeholder='eForm name (or partial name)' type='text'><datalist id='CP'></datalist>"
    $('#cppBoxes').append(searchbar) //append to top row
    //$('#toolbar').prepend(searchbar) //append to bottom row
    $('#referral_name').width("202px")

    $("#referral_name").change(function() {
        //alert(this.text)
    });

    // https://stackoverflow.com/a/64392933
    document.getElementById("referral_name").addEventListener("input", function(event) {
        if (event.inputType == "insertReplacementText" || event.inputType == null) {
            window.open(vPath + "/eform/" + $(this).val())
            $(this).val("")
            this.focus()
        }
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

                var myRe = /<td width="30%" style="padding-left: 7px">\n\s*<.*\n\s*.*\n\s*.*/g; //for the measurement
                var myRe2 = /efmformadd.*&appointment/g; //for onclickvalue
                var myArray;
                var myArray2
                var i = 0;
                while ((myArray = myRe.exec(str)) !== null) {
                    myArray2 = myRe2.exec(str)
                    y = $(myArray.toString()).text()
                    //alert(y)
                    z = myArray2.toString() + "=&parentAjaxId=eforms"
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
