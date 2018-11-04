//************************************************************************
//Finding the FID of the eForm with formName
function findFID(formName){
  //1) open the eForm List window in a hidden iframe so that the user does not see a window being opened and closed quickly
  var pathArray = window.location.pathname.split( '/' );
  var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/efmformslistadd.jsp?demographic_no="+demoNo;
  var eFormListWindow = window.open(newURL, "hiddenWin");
  
  document.getElementById("hiddenWin").onload = function(){
    //2) find all <a> elements in the hiddenWin iFrame containing the eFormListWindow 
//Finding the FID of the eForm with formName
findFID('Email Text Consent Form')//alert(fid)
function findFID(formName) {
  var mytag = document.getElementsByTagName('a');
  for (var i = 0; i < mytag.length; i++) {
    //alert(mytag[i].innerHTML)
    if (mytag[i].innerHTML.indexOf(formName) > - 1) {
      var onclickvalue = mytag[i].innerHTML.trim()      //alert(onclickvalue)    
      //parse out the fid from this <a> element's action script
      var fidRe = /efmformadd_data\.jsp\?fid=(\d*)&/;
      var actionScript = mytag[i].getAttribute('onclick');
      //alert(actionScript)
      var myArray;
      if ((myArray = fidRe.exec(actionScript)) !== null) {
        fid = myArray[1];
        alert(fid)
      }
    }
  }
}
//*****************************************************************************
