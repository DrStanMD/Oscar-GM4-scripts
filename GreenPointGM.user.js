// ==UserScript==
// @name     Green Point
// @version  1
// @include *PacificRim/GreenPoint*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant    none
// ==/UserScript==
//$('#selResType').css('background-color', 'yellow')
$('#selResType').val('Frontcountry Camping')
document.getElementById('selArrMth').selectedIndex = '3';
$('#selArrMth').trigger('change');
$('#selArrDay').val('9th')
$('#selNumNights').val('2')
$('#selNumNights').trigger('change');
$('#selArrDay').css('background-color', 'yellow')
$('#MainContentPlaceHolder_LocationList').val('Pacific Rim')
$('#MainContentPlaceHolder_MapList').val('94')
$('#selEquipmentSub').val('Small Tent')
$('#selPartySize').val('2')
$('#selResource').val('91')
$('#selResource').trigger('change');


$(document).ready(function(){
alert(document.getElementById('reserveButton').disabled)
});


/*
https://reservation.pc.gc.ca/PacificRim/GreenPoint/1-94
