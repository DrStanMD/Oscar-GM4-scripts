// ==UserScript==
// @name     Calendar
// @include      *SetupMeasurements.do?groupName*
// @version  15.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require  https://secure56.junoemr.com/SDHurwitzInc/share/calendar/calendar.js
// @require  https://secure56.junoemr.com/SDHurwitzInc/share/calendar/lang/calendar-en.js
// @require  https://secure56.junoemr.com/SDHurwitzInc/share/calendar/calendar-setup.js
// @grant    GM_addStyle
// ==/UserScript==

// about:config extensions.greasemonkey.fileIsGreaseable to true

//========Get Path============

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))


vPath = "href=" + "'" + "https://" + location.host + "/" + firstElement + "/share/calendar/calendar.css" + "'"
//alert(vPath)
myPath = "https://" + location.host + "/" + firstElement
//alert(myPath)


var elements = (window.location.href)
//alert(elements)
var y = elements.indexOf('oscarMeasurements'); //for the measurement screen title
if (y > -1) {

    /*
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = myPath + "/share/calendar/calendar.js";
    script.id = 'rawr';
    $('head')[0].appendChild(script);
      
    var script1 = document.createElement( 'script' );
    script1.type = 'text/javascript';
    script1.src = myPath + "/share/calendar/lang/calendar-en.js";
    script1.id = 'rawr1';
    $('head')[0].appendChild(script1);
      
    var script2 = document.createElement( 'script' );
    script2.type = 'text/javascript';
    script2.src = myPath + "/share/calendar/calendar-setup.js";
    script2.id = 'rawr2';
    $('head')[0].appendChild(script2);
    */

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
      
     //alert(window.location.toString().indexOf('Procedures'))
    if (window.location.toString().indexOf('Procedures') > -1){
        var y = document.getElementsByName('value(inputValue-8)');
        $(y).css('background-color', 'lightyellow');
        $(y).attr("id", "newId8")
    }


        Calendar.setup({
            inputField: "newId" + i,
            ifFormat: "%Y-%m-%d",
            button: "newId" + i,
            singleClick: true,
            step: 1
        }, )
    };
}
