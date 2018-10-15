// ==UserScript==
// @name        Datepicker+Jquery-ui
// @include      *SetupMeasurements.do?groupName*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @version     15.1
// @grant       GM_addStyle
// ==/UserScript==
/*--- For this to work well, we must also add-in the jQuery-UI CSS.
    We add the CSS this way so that the embedded, relatively linked images load correctly.
    (Use //ajax... so that https or http is selected as appropriate to avoid "mixed content".)
Calendar skins:   
base black-tie blitzer cupertino dark-hive dot-luv eggplant 
excite-bike flick hot-sneaks humanity le-frog mint-choc 
overcast pepper-grinder redmond smoothness south-street 
start sunny swanky-purse trontastic ui-darkness ui-lightness vader
*/
var elements = (window.location.href)
//alert(elements)
var y = elements.indexOf('Screening'); //for the measurement screen title
$('head').append('<link '
+ 'href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/start/jquery-ui.min.css" '
+ 'rel="stylesheet" type="text/css">'
);
if (y > - 1) {
  $('input[name=\'value(inputValue-8)\']').css('background-color', 'yellow');
  $('input[name=\'value(inputValue-8)\']').datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    closeText: 'Clear'
  })
}
for (i = 0; i < 30; i++) {
  var x = document.getElementsByName('value(date-' + i + ')');
  $(x).css('background-color', 'lightyellow');
  $(x).datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    closeText: 'Clear'
  })
}
