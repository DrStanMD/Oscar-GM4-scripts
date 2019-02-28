// ==UserScript==
// @name     Green Point
// @version  1
// @include *PacificRim/GreenPoint*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant    none
// ==/UserScript==

//https://reservation.pc.gc.ca/PacificRim/GreenPoint/1-94

var mysites = ['90','89','87','85','83','81','80','78','76','74','72','71','69','67','63','61','60','58']

$(document).ready(function () {
  $('#reserveButton').change(function () {
    alert('Button changed')
  });
});

function mychange() {
  $(document).ready(function () {
    if (document.getElementById('reserveButton').disabled) {
      alert('Not Available')
    } 
    else {
      alert('**AVAILABLE**')
    }
  });
}
$('#selResType').val('Frontcountry Camping')
document.getElementById('selArrMth').selectedIndex = '3';
$('#selArrMth').trigger('change');
$('#selArrDay').val('9th')
$('#selNumNights').val('3')
$('#selNumNights').trigger('change');
$('#selArrDay').css('background-color', 'yellow')
$('#MainContentPlaceHolder_LocationList').val('Pacific Rim')
$('#MainContentPlaceHolder_MapList').val('94')
$('#selEquipmentSub').val('Small Tent')
$('#selPartySize').val('2')
$('#selResource').val(mysites[0])
$('#selResource').val('44')
$('#selResource').trigger('change');
mychange()



/*
#rce_76 > a:nth-child(1) > img:nth-child(1)
#rce_71 > a:nth-child(1) > img:nth-child(1)

<img src="https://reservation.pc.gc.ca/images/mapicons/service_avail.png" alt="Select Site: 13" title="" border="0">
<img src="https://reservation.pc.gc.ca/images/mapicons/service_unavail.png" alt="Select Site: 72" title="" border="0">
*/
