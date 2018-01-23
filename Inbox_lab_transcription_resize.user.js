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
//window.resizeTo(1300,900);
//alert('hi')
