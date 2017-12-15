// ==UserScript==
// @name           ExpressBilling Disabled
// @namespace      oscar
// @include        */billing.do?billRegion=BC&billForm=*
// @include        */CaseManagementEntry.do
// @include        */billing/CA/BC/SaveBilling.do
// ==/UserScript==
var theDefaultBillingForm = 'Day Sheet';
if (document.title.trim() == 'BC Billing') {
  var theCurrentBillingForm = document.getElementById('pop1').nextSibling.nodeValue.trim();
  if (theCurrentBillingForm != ':' + theDefaultBillingForm) {
    var theForms = document.getElementById('Layer1').getElementsByTagName('a');
    for (var index = 1; index < theForms.length; index++) {
      if (theForms[index].innerHTML.trim() == theDefaultBillingForm) {
        document.location.href = theForms[index].href
      }
    }
  }
  var theButtonRow = document.evaluate('/html/body/form/table/tbody/tr/td/table[3]/tbody/tr[1]/td[3]/table[3]/tbody/tr[2]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  theButtonRow.insertBefore(document.createElement('br'), theButtonRow.firstChild);
  theButtonRow.insertBefore(document.createElement('br'), theButtonRow.firstChild);
  var theSaveBillButton = document.createElement('input');
  theSaveBillButton.setAttribute('type', 'button');
  theSaveBillButton.setAttribute('name', 'Save Bill');
  theSaveBillButton.setAttribute('value', 'Save Bill');
  theSaveBillButton.onclick = function () {
    unsafeWindow.toggleWCB();
    if (unsafeWindow.checkUnits()) {
      var theForm = document.getElementsByName('BillingCreateBillingForm') [0]
      var request = new XMLHttpRequest();
      request.open(theForm.method, theForm.action, false);
      request.send(new FormData(theForm));
      if (request.status == 200) {
        var theMatch = request.responseText.match(/<input type="text" name="dispPrice\+.*?" value=".*?"\/>/im);
        alert(theMatch)
        var theActionMatch = request.responseText.match(/action="(.*?)"/im);
        alert(theActionMatch)
        if (theMatch && theActionMatch) {
          var theConfirmationForm = document.createElement('form');
          theConfirmationForm.setAttribute('action', theActionMatch[1]);
          theConfirmationForm.setAttribute('method', 'POST');
          theConfirmationForm.innerHTML = theMatch[0] + '<input type="text" value="Save Bill" name="submit"/>';
          document.body.appendChild(theConfirmationForm);
          theConfirmationForm.submit();
        }
      }
    }
  };
  theButtonRow.insertBefore(theSaveBillButton, theButtonRow.firstChild);
  theButtonRow.insertBefore(document.createTextNode(' '), theButtonRow.firstChild);
  var theAnotherBillButton = document.createElement('input');
  theAnotherBillButton.setAttribute('type', 'button');
  theAnotherBillButton.setAttribute('name', 'Another Bill');
  theAnotherBillButton.setAttribute('value', 'Another Bill');
  theAnotherBillButton.onclick = function () {
    unsafeWindow.toggleWCB();
    if (unsafeWindow.checkUnits()) {
      var theForm = document.getElementsByName('BillingCreateBillingForm') [0]
      var request = new XMLHttpRequest();
      request.open(theForm.method, theForm.action, false);
      request.send(new FormData(theForm));
      if (request.status == 200) {
        var theMatch = request.responseText.match(/<input type="text" name="dispPrice\+.*?" value=".*?"\/>/im);
        alert(theMatch)
        var theActionMatch = request.responseText.match(/action="(.*?)"/im);
        alert(theActionMatch)
        if (theMatch && theActionMatch) {
          var theConfirmationForm = document.createElement('form');
          theConfirmationForm.setAttribute('action', theActionMatch[1]);
          theConfirmationForm.setAttribute('method', 'POST');
          theConfirmationForm.innerHTML = theMatch[0] + '<input type="text" value="Another Bill" name="submit"/>';
          document.body.appendChild(theConfirmationForm);
          theConfirmationForm.submit();
        }
      }
    }
  };
  theButtonRow.insertBefore(theAnotherBillButton, theButtonRow.firstChild);
  theButtonRow.setAttribute('align', 'right');
}
