// ==UserScript==
// @name     Green Point
// @version  1
// @include *PacificRim/GreenPoint*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant    none
// ==/UserScript==
//https://reservation.pc.gc.ca/PacificRim/GreenPoint/1-94
d = new Date('Apr 28, 2019')//alert(d)
d.setDate(d.getDate() + 7);
//alert(d)
var cm = d.getMonth() - 1
var cd = d.getDate() - 1
var cs = 3
var mysites = [
  '90',
  '1',
  '44',
  '89',
  '87',
  '85',
  '83',
  '81',
  '80',
  '78',
  '76',
  '74',
  '72',
  '71',
  '69',
  '67',
  '63',
  '61',
  '60',
  '58'
]
var mymonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
var myday = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]
function mychange() {
  var dm = new Date($('#selArrMth').val());
  var nm = mymonth[dm.getMonth()];
  //alert(nm)
  var dd = new Date($('#selArrDay').val());
  var nd = dd.getDate();
  var ndow = myday[dd.getDay()];
  //alert(n)
  $(document).ready(function () {
    for (i = 0; i < mysites.length; i++) {
      var x = $('#rce_' + mysites[i]).html()
      if (x.indexOf('rce avail') > - 1) {
        alert('Site ' + mysites[i] + ' is available from ' + ndow + ', ' + nm + ' ' + nd + ' for ' + $('#selNumNights').val() + ' nights.')
      }
    }
  });
}
$('#selResType').val('Frontcountry Camping')
document.getElementById('selArrMth').selectedIndex = cm;
$('#selArrMth').trigger('change');
document.getElementById('selArrDay').selectedIndex = cd;
$('#selArrDay').trigger('change');
$('#selNumNights').val(cs)
$('#selNumNights').trigger('change');
//$('#selArrDay').css('background-color', 'yellow')
$('#MainContentPlaceHolder_LocationList').val('Pacific Rim')//$('#MainContentPlaceHolder_MapList').val('94')
$('#selEquipmentSub').val('Small Tent')
$('#selPartySize').val('2') //$('#selResource').val(mysites[0])
//$('#selResource').trigger('change');
mychange()/*
$(document).ready(function () {
  $('#reserveButton').change(function () {
    alert('Button changed')
  });
});
    if (document.getElementById('reserveButton').disabled) {
      alert('Not Available')
    } 
    else {
      alert('**AVAILABLE**')
    }
*/
