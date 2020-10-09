// ==UserScript==
// @name           mySignatureInserter
// @namespace      StanScript
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @include        *oscarRx/choosePatient.do?providerNo*
// @include        *signature_pad/tabletSignature.jsp*
// @include        *eform/efmformadd_data.jsp?fid*
// @include         *oscarRx*
// @version     15.1
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)

//alert(document.getElementById("signatureFrame"))

if(document.getElementById("signatureFrame")){
//alert()
//var iframe0 = document.getElementById("preview2");  
var iframe = document.getElementById("signatureFrame");
//alert(iframe)
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;  
//alert(innerDoc)
var ctx = iframe.contentWindow.document.getElementById('canvas').getContext('2d') 
//alert(ctx)
}

//alert(window.frames[0].location)
if(document.getElementById('canvas').getContext('2d')){
var ctx = document.getElementById('canvas').getContext('2d')
//alert(ctx)
}
  
setTimeout(function(){ 
if(document.getElementById('canvas').getContext('2d')){
base_image = new Image();
base_image.src = vPath + '/eform/displayImage.do?imagefile=My Signature.jpg'

setTimeout(function(){ 
  ctx.drawImage(base_image, 0, 0, 500, 100);

  ctx.beginPath();
  ctx.lineWidth = '2';
  ctx.strokeStyle = 'green'; // Green path
  ctx.moveTo(0, 75);
  //Math.floor(Math.random() * (max - min + 1)) + min;
  var rnd = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  ctx.lineTo(250, rnd);
  ctx.stroke(); // Draw it
  ctx.beginPath();
  ctx.strokeStyle = 'purple'; // Purple path
  var rnd1 = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
  ctx.moveTo(rnd1, 0);
  ctx.lineTo(150, 130);
  ctx.stroke(); // Draw it
      }, 500);
}
  }, 500);

