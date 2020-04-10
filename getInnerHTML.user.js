// ==UserScript==
// @name        getInnerHTML
// @namespace   Stanscript
// @include  *PATIENT*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     2.7
// @grant       none
// ==/UserScript==

var markup = document.documentElement.innerHTML;
//alert(markup);

var demoArray = [
  'Cell Phone',
  'Email',
  'Phone(H)',
  'Address',
  'City',
  'Postal',
  'Age',
  'Health Ins'
]
var demoArrayVal = [
]

function getMeasures(measure) {
      var str = markup
      //var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'
      //var myReString = '<spanclass="label">' + measure + '.*/s*'
  
      var myReString = '<span class="label">'  + measure +  '(.|[\n])*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() 
        //alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) 
        alert(measure + ' is ' + mycode3)
        demoArrayVal[j] = mycode3
      } 
    
}

  for (j = 0; j < demoArray.length; j++) {
    //alert(j)
    getMeasures(demoArray[j])  
  }
