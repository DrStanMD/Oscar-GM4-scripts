// ==UserScript==
// @name        Tickler Edit Popup Disabled
// @namespace   Stanscripts
// @version     1.1
// @include     *tickler/ticklerDemoMain.jsp?demoview*
// @include     *tickler/ticklerDemoMain.jsp?ticklerview*
// @description  This opens Tickler Edit screen from the encounter tickler with Audit Trail
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==

var input = document.createElement('input');
input.type = 'button';
input.value = 'Edit selected Ticklers';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:absolute;top:15px;left:250px;');
input.setAttribute('title', 'check the ticklers to view');
document.body.appendChild(input);
function showAlert() {
  var arr = document.forms['ticklerform'].elements
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    if (el.type == 'checkbox') {
      if (el.checked) {
        // alert(el.value)
        tickler_no = el.value
        var elements = (window.location.pathname.split('/', 2))
        firstElement = (elements.slice(1))
        vPath = ('https://' + location.host + '/' + firstElement)
        if (tickler_no > 0)
        {
          TeditURL = vPath + '/tickler/ticklerEdit.jsp?tickler_no=' + tickler_no
          //alert(TeditURL)
          window.open(TeditURL, '', 'width=900, height=700')
        }
      }
    }
  }
}
