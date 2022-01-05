// ==UserScript==
// @name     Calendar
// @include      *SetupMeasurements.do?groupName*
// @version  15.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require  /share/calendar/calendar.js
// @require  /share/calendar/lang/calendar-en.js
// @require  /share/calendar/calendar-setup.js
// @grant    GM_addStyle
// ==/UserScript==

// about:config extensions.greasemonkey.fileIsGreaseable to true

//========Get Path============

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)

vPath = "href=" + "'" + "https://" + location.host + "/" + firstElement + "/share/calendar/calendar.css" + "'"
//alert(vPath)
myPath = "https://" + location.host + "/" + firstElement
//alert(myPath)


var elements = (window.location.href)
//alert(elements)
var y = elements.indexOf('oscarMeasurements'); //for the measurement screen title
if (y > -1) {



    $('head').append('<link ' +
        vPath +
        'rel="stylesheet" type="text/css">'
    );


    for (i = 0; i < 100; i++) {
        var x = document.getElementsByName('value(date-' + i + ')');
        if (x.length < 1) {
            return
        }
        $(x).css('background-color', 'lightyellow');
        $(x).attr("id", "newId" + i)

        Calendar.setup({
            inputField: "newId" + i,
            ifFormat: "%Y-%m-%d",
            button: "newId" + i,
            singleClick: true,
            step: 1
        }, )
    };
}
