// ==UserScript==
// @name        BMI calculator button
// @namespace   Stanscript
// @description Calculates BMI, Converts to lbs, ins.
// @include     *oscarMeasurements/SetupMeasurements.do?groupName=Vitals*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
window.resizeTo(1050, 700);
$('input[name=\'value(inputValue-2)\']').change(ButtonFunction1)
$('input[name=\'value(inputValue-1)\']').change(ButtonFunction1)
$('input[name=\'value(inputValue-0)\']').css('background-color', 'lightgreen');
$('input[name=\'value(inputValue-1)\']').css('background-color', 'yellow');
$('input[name=\'value(inputValue-2)\']').css('background-color', 'lightgreen');
$('input[name=\'value(inputValue-4)\']').css('background-color', 'lightgreen');
/*
var input1=document.createElement("input");
input1.type="button";
input1.value="Calculate BMI";
input1.onclick = ButtonFunction1;
input1.setAttribute("style", "font-size:16px;position:fixed;top:100px;left:600px;");
document.body.appendChild(input1); 
*/
function ButtonFunction1() {
  vWT = $('input[name=\'value(inputValue-1)\']').val();
  if (vWT) {
    vWTlb = (Number(vWT) * 2.2).toFixed(1)
    $('input[name=\'value(comments-1)\']').val(' (' + vWTlb + ' lbs)');
  }
  vHT = $('input[name=\'value(inputValue-2)\']').val();
  if (vHT) {
    vHTin = (Number(vHT) / 2.54).toFixed(1)
    var realFeet = vHTin / 12
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    //$("input[name='value(comments-3)']").val("  ("+vHTin+" inches"+" or "+(vHTin/12).toFixed(1)+ " feet)")
    $('input[name=\'value(comments-2)\']').val('( ' + vHTin + ' inches' + ' or ' + feet + 'ft ' + inches + 'in)')
    vBMI = vWT / (vHT * 0.01 * vHT * 0.01)
  }
  if (vBMI) {
    $('input[name=\'value(inputValue-6)\']').val(vBMI.toFixed(1));
    vIW = 25 * (vHT * vHT * 0.0001)
    $('input[name=\'value(comments-6)\']').val('Ideal weight is ' + vIW.toFixed() + ' kg. (' + (vIW * 2.2).toFixed() + ' lbs.)')    //alert('Ideal weight is ' + vIW.toFixed() + ' kg. (' + (vIW * 2.2).toFixed() + ' lbs.)')
  }
}
$('tr.data:nth-child(3) > td:nth-child(3) > input:nth-child(1)').focus()
