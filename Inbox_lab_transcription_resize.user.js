// ==UserScript==
// @name        Resize lab transcription, Biilling screens
// @namespace   Stanscripts
// @description Resizes various screens to (1280,780)
// @include    *lab/CA/ALL/labDisplay.jsp*
// @include    *CaseManagementEntry.do*
// @include    *billing/CA/BC/CreateBilling.do*        
// @include    *billing.do?billRegion=BC&billForm=GP*
// @include    *eform/efmformadd_data.jsp?fid=8*
// @include    *eform/efmformadd_data.jsp?fid=42*
// @include    *dms/inboxManage.do?method=prepareForIndexPage*
// @include    *dms/showDocument.jsp?inWindow=true&segmentID*
// @include    *dms/MultiPageDocDisplay.jsp?segmentID*
// @include    *casemgmt/forward.jsp?action=view&demographicNo*
// @grant       none
// ==/UserScript==

window.resizeTo(1280, 780);
window.moveTo(400, 100)
//window.resizeTo(1300,900);
//window.resizeTo(1280, 780);
//window.moveTo(200, 50)
//window.resizeTo(1300,1000);
//alert('hi')

/*
window.onload = maxWindow;
function maxWindow() {
  window.moveTo(0, 0);
  if (document.all) {
    top.window.resizeTo(screen.availWidth, screen.availHeight);
  } 
  else if (document.layers || document.getElementById) {
    if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
      top.window.outerHeight = screen.availHeight;
      top.window.outerWidth = screen.availWidth;
    }
  }
}
*/
