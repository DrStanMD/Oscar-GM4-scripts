// ==UserScript==
// @name        Scheduler screen shortcut keys
// @namespace   StansScripts
// @description Shortcut keys for Schedular screen (Alt+z,j,k) for search,manage referral doc
// @include     */provider/providercontrol.jsp?year*
// @include     */admin/admin.jsp*
// @include       *oscarEncounter/oscarConsultationRequest/ConsultationFormRequest*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


(function () {
  document.addEventListener('keydown', function (e) {
    //alert(e.keyCode)

    if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //z
      $('#search > a:nth-child(1)').click()
    }
    
    if (e.keyCode == 75 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //k
      $('#oscar_scratch > img:nth-child(1)').click()
    }
  }, false);
}) ();
