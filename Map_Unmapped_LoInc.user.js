// ==UserScript==
// @name        Map Unmapped LoInc
// @namespace   Stanscript
// @description Searches the unmapped LoInc codes for Add Measurement Mapping screen
// @include     *oscarEncounter/oscarMeasurements/AddMeasurementMap.do*
// @include     *oscarEncounter/oscarMeasurements/addMeasurementMap.jsp
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
$(document).ready(function () {
  alert()
  var input1 = document.createElement('input');
  input1.type = 'button';
  input1.value = 'Search for unmapped code';
  input1.onclick = ButtonFunction1;
  input1.setAttribute('style', 'font-size:12px;position:absolute;top:18px;right:500px;');
  document.body.appendChild(input1);
  function ButtonFunction1() {
    //********************************************
    var theDefault = prompt('Please enter part of the string to search (capitalize the first letter)');
    var theOptions = document.getElementsByName('identifier') [0].options;
    for (var theOption in theOptions)
    {
      for (var i = 0; i < 3; i++) {}
      if (typeof (theOption) == 'object') {
        if (theOption.text.indexOf(theDefault) > - 1) {
          var mySelect = confirm(theOption.text);
          if (mySelect == true) {
            theOption.selected = true;
            break
          }          
          //window.confirm(theOption.text);
          //alert(theOption.text)
          //break;

        }
      }
    }    //******************************************

  }
});
