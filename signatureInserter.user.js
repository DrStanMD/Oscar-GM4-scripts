// ==UserScript==
// @name           mySignatureInserter
// @namespace      StanScript
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @include        *oscarRx/choosePatient.do?providerNo*
// @include        *signature_pad/tabletSignature.jsp*
// @include        *eform/efmformadd_data.jsp?fid*
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)
var ctx = document.getElementById('canvas').getContext('2d')
base_image = new Image();
base_image.src = vPath + '/eform/displayImage.do?imagefile=My Signature.jpg'
window.addEventListener('load', function () {
  ctx.drawImage(base_image, 0, 0, 500, 100);
  ctx.beginPath();
  ctx.lineWidth = '2';
  // ctx.strokeStyle = 'green'; // Green path
  ctx.moveTo(0, 75);
  //Math.floor(Math.random() * (max - min + 1)) + min;
  var rnd = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  ctx.lineTo(250, rnd);
  ctx.stroke(); // Draw it
  ctx.beginPath();
  // ctx.strokeStyle = 'purple'; // Purple path
  var rnd1 = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
  ctx.moveTo(rnd1, 0);
  ctx.lineTo(150, 130);
  ctx.stroke(); // Draw it
}, false);
