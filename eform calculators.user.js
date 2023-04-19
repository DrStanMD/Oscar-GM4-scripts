// ==UserScript==
// @name        eform calculators
// @namespace   Stanscript
// @include    *efmformslistadd.jsp*
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @include   *oscarEncounter*
// @exclude  *oscarConsultationRequest*
// @description adds to calculator list
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     16.0  FF ESR 91 compatible
// @grant       none
// ==/UserScript==


$(document).ready(function() {
    $('#calculators_menu').css('background-color', 'lightyellow')
  
    var mySelect = $('#calculators_menu');
        mySelect.append(
          $('<option value="https://bilitool.org/index.php" x_size="650" y_size="775">Neonatal Bilirubin</option>')
        );
          mySelect.append(
          $('<option value="https://thrombosiscanada.ca/tools/?calc=perioperativeAnticoagulantAlgorithm" x_size="650" y_size="775">Peri-operative Anticoagulation</option>')
        );
});
