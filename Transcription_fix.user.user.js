// ==UserScript==
// @name       Transcription Fix 
// @namespace   Stanscripts
// @description fixes Transcription screen and formats for printing
// @include     *lab/CA/ALL/labDisplay.jsp?*
// @version 5
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==
z = '#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1)'
za = ($(z).text()).trim();
zz = za.replace(/\d+/g, '')
var RT = [
  'GENERAL',
  'CHEM',
  'MICRO',
  'HAEM'
];
var result = RT.filter(function (item) {
  return typeof item == 'string' && item.indexOf(zz) > - 1;
});
//alert(result)
if (result) {
//  alert('True')
} 

var RT = [
  'TRANSCRIP',
  'CELLPATH',
  'BCCACSP',
  'BCCASMP'
];
var a = RT.indexOf(zz);
//alert(a)
var a = RT.indexOf(zz);
var RS = 'NOTIF'
var b = RS.indexOf(zz);
//alert(zz);alert(a);alert(b);
window.addEventListener('load', function () {
  // if (a == - 1) {
  if (a > - 1) {
    $('tr.Field2 > td:nth-child(2)').attr('width', 0);
    $('tr.Field2 > td:nth-child(1)').attr('width', 0);
    $('tr.Field2 > td:nth-child(1)').text('')
    $('#tblDiscs > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)').attr('width', 0);
    $('tr.Field2 > td:nth-child(2)').text($('#tblDiscs > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)').text('1'))
    $('#tblDiscs > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)').text('')
    for (i = 0; i < 3; i++) {
      $('tr.NarrativeRes:nth-child(i) > td:nth-child(1) > a:nth-child(1)').text('')
    }
    $('input[type="button"][value=" Print "]').attr('onClick', ' '); //This disables the native onclick function
    $('input[type="button"][value=" Print "]').click(function () { //This brings in the GM onclick function
      showAlert();
    });
    if (b == 0) {
      $('td:contains(\'Complaint\')').css('color', 'red').css('font-size', '18px'); //This highlights the presenting complaint in ER visit
      $('td:contains(\'Diagnosis\')').css('color', 'red').css('font-size', '18px'); //This highlights the presenting diagnosis in ER visit
    }
    function showAlert()
    {
      var lablist = window.open('', '_blank', 'width=800, scrollbars=yes, resizable=yes');
      lablist.document.body.setAttribute('style', 'font-family:Arial !important');
      //lablist.moveTo(1200, 100);
      //y = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2)').html()
      //y = $('table[id^="DemoTable"]').html();
      $('.MainTableTopRowRightColumn').hide();
      $('.MainTableBottomRowRightColumn').hide();
      var subElement2 = $(':contains(\'Requesting Client\')');
      subElement2.closest('td').hide();
      var subElement3 = $('span[id*="commentLabel"]')
      subElement3.closest('td').hide();
      var subElement1 = $(':contains(\'Date of Service\')'); // case sensitive text search
      var y = subElement1.closest('table').html(); // get the table that contains this subelement, closest going up the DOM tree
      //alert(y);
      //var x = '<div style="border:2px; border-style:solid; padding: 10px;"' + y + '</div>'
      /*$('#tblDiscs > tbody  > tr').each(function () {
      x = x + $(this).text() + '<br>' 
    });*/
      lablist.document.body.innerHTML = y
      lablist.print();
      lablist.close()
      $('.MainTableTopRowRightColumn').show();
      $('.MainTableBottomRowRightColumn').show();
      subElement2.closest('td').show();
      subElement3.closest('td').show();
    }
  }
}, false);
