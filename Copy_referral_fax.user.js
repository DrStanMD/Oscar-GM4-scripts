// ==UserScript==
// @name        Copy referral fax
// @namespace   Stanscript
// @description Copy referral fax
// @include     *oscarEncounter/oscarConsultationRequest/ConsultationFormRequest.jsp*
// @include     *oscarEncounter/ViewRequest.do?*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function() {
var y = document.getElementsByClassName('righty');
    $(y).click(function() {
        this.select();
        document.execCommand('copy');
        $(this).css('background-color', 'pink').fadeIn("slow");
        //$("#message").fadeIn("fast");
        //$("#message").fadeOut("slow");
    })

    })
