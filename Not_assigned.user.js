// ==UserScript==
// @name        Not Assigned page
// @namespace   Stanscripts
// @description Shortcut Buttons for filling fields on "Not assigned" scanned pages. You can assign your own labels
// @include     *dms/showDocument.jsp?inWindow=true&segmentID*
// @include     *dms/MultiPageDocDisplay.jsp?segmentID*
// @include     *dms/showDocument.jsp?segmentID=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     15.2
// @grant       none
// ==/UserScript==
//***************** Document Type must match Oscar exactly

(function(){
document.addEventListener('keydown', function(e) {

  if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
  $(AckButton).click()  
    //alert("z pressed")
  }
}, false);
})();


//window.resizeTo(1280, 780);
window.resizeTo(1500, 800);
var DT = [
]
DT[0] = [
  'lab',
  'ECG',
  'Holter',
  'Blood',
  'Pre-Natal labs',
  'ABO Rh',
  'Genetics',
]
DT[1] = [
  'consult',
  ' Dr. ',
  ' Dr. Ahmed',
  ' Dr. Rapoport',
  ' Dr. Cherry',
  ' Dr. Sampath',
  ' Dr. Nguyen',
  ' Dr. Yun',
  ' Dr. Fu',
  ' Dr. Ebtia',
  ' Dr. Saldana',
  ' Dr. Bar Shlomo',
  ' Dr. Thomas',
  ' Dr. Blicker',
  ' Dr. Luciuk',
  ' Dr. Caswell',
  'Psychiatry',
  ' Dr. Fishman',
  ' Dr. Jakubowski',
  ' Dr. Orenstein',
  'Orthopedics',
  'Opthalmology',
  'Cardiolology',
  'Gyne/Obs',
  'BCCA',
  'Surgery',
  'Urology',
  'Gastroenterology',
  ' Dr. Bartlett',
  'Sleep Clinic',
  'LifeMark',
  'SportMed',
  'Spine Clinic',
  'Neurology',
  'Nephrology',
  'Dermatology',
  'Rheumatology',
  'Paediatric',
  ' Dr. G. Houston',  
]
DT[2] = [
  'insurance',
  'APS',
  'CPP',
  'Disability',
  'WCB',
]
DT[3] = [
  'legal',
  'CL-19',
  'MVA form',
  'MedicoLegal Report',
  'Legal:Copy of Records',
]
DT[4] = [
  'oldchart',
  'oldchart1',
  'Transfer Records Request',
]
DT[5] = [
  'radiology',
  'Echo',
  'No Show',
  'Xray :',
  'U/S :',
  'CT :',
  'MRI :',
  'Nuclear :',
  'Mammo :',
  'Bone Density :',
]
DT[6] = [
  'pathology',
  'Pap',
  'Cytology',
  'Pap Recall Letters',
]
DT[7] = [
  'others',
  'Appointment notification',
  'Appointment not accepted',
  'Appointment postponed',
  'Notes',
  'WIC',
  'Referral',
  'Drivers Med',
  'Faxed Requests',
  'Special Authority',
  'Faxed referral RMH',
  'email consent',
  'BP readings',
]
DT[8] = [
  'photo',
]
DT[9] = [
  'old chart1',
  '<b>CS + oldchart</b>'
]
DT[10] = [
  'Forms',
  'Camp Medical',
  'Disability',
  'Admission Px',
  'Home Care',
  'Record Request',
]
DT[11] = [
  'ER / Hospital',
  'Discharge Reports',
  'Home Care',
  'Residential Home',
  'Notification of Death',
]
DT[12] = [
  'Pharmacies',
  'Refills',
  'Vaccine notification',
  'Cannimed',
  'Triplicate',
  'Special Authority',
  'Adaptation',
]
//*******XRAY TYPES*************************************************************  
xType = [
  'imaging ',
  'Chest ',
  'Abdomen ',
  'Hip ',
  'Knee ',
  'Ankle ',
  'Foot ',
  'Pelvis ',
  'Head ',
  'Skull ',
  'Shoulder ',
  'Renal ',
  'Neck ',
  'Spine ',
  'Wrist ',
  'Breast ',
  'Leg ',
  'Hand',
]
LRB = [
  'side',
  'Left ',
  'Right ',
  'Bilat '
]
//***********************************************************************
for (var i = 0; i < DT.length; i++) {
  var hold = DT[i][0]
  DT[i].shift()
  DT[i] = DT[i].sort()
  DT[i].unshift(hold)
}
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}


var IDnum = params.segmentID
var Field1 = '#autocompletedemo' + IDnum
var Field2 = '#docType_' + IDnum
var Field2ID = 'docType_' + IDnum
var Field3 = '#docDesc_' + IDnum
var CloseButton = ' #closeBtn_' + IDnum
var AckButton = '#ackBtn_' + IDnum
var SaveButton = '#save' + IDnum 
var TicklerButton = '#ticklerBtn_' + IDnum
var CommentArea = '#comment_' + IDnum


document.getElementById(Field2ID).style.fontSize = '16px';
$(Field2).blur(function () {
  myCollapse1()
});
//*******
$(Field2).focus(function () {
  $(Field2).css('background-color', 'pink');
  $(Field2).attr('size', function () {
    return this.options.length;
  });
});
//********
if (document.getElementById(Field2ID).selectedIndex == 0) {
  $(Field2).attr('size', function () {
    $(Field2).css('background-color', 'pink');
    return this.options.length;
  });
}
$(Field2).live('keypress', function (e) {
  var key = e.which;
  if (key == 13)
  {
    this.click()
  }
});
$(Field2).click(function () {
  var GetOpt = document.getElementById(Field2ID)
  var x = GetOpt.selectedIndex;
  var y = GetOpt.options;
  for (i = 0; i < DT.length; i++) {
    if (DT[i][0] == y[x].text) {
      myFunction(i)
      //    $(Field3).select()
      break
    }
  }
  myCollapse1()
});
function myCollapse1() {
  $(Field2).attr('size', function () {
    $(Field2).css('background-color', 'white');
    return 1
  });
}
function myFunction(itemnum) {
  var y = itemnum
  if (document.getElementById('mySelect')) {
    document.getElementById('mySelect').remove()
  }
  var x = document.createElement('SELECT');
  x.setAttribute('id', 'mySelect');
  x.setAttribute('style', 'font-size:16px;position:fixed;top:130px;right:0px;');
  for (i = 0; i < DT[itemnum].length; i++) {
    document.body.appendChild(x);
    var z = document.createElement('option');
    z.setAttribute('value', DT[itemnum][i]);
    var t = document.createTextNode(DT[itemnum][i]);
    z.appendChild(t);
    z.onclick = AddList
    document.getElementById('mySelect').appendChild(z);
    document.getElementById('mySelect').size = DT[itemnum].length;
    //document.getElementById('mySelect').size = DT[itemnum].length-15;
    if(DT[itemnum].length>30){
    document.getElementById('mySelect').size = 30
    }
    document.getElementById('mySelect').style.backgroundColor = 'pink';
    //  document.getElementById('mySelect') .focus()
    $(Field1).css('background-color', 'yellow');
    $(Field1).focus()
  }
  var x = document.getElementById('mySelect').value
  $(Field3).val(x)
}
function AddList() {
  var x = document.getElementById('mySelect').value
  $(Field1).css('background-color', 'yellow');
  $(Field1).focus()
  $(Field3).val(x)
  //  alert(x)
  if (x == ' Dr. ') {
    var strLength = $(Field3).val().length * 2;
    $(Field3).focus();
    $(Field3) [0].setSelectionRange(strLength, strLength);
  }
  document.getElementById('mySelect').remove()
  // alert(document.getElementById(Field2ID).selectedIndex)
  if (document.getElementById(Field2ID).selectedIndex == 12) {
    Addsite()
  }
  for (var i = 0; i < DT.length; i++) {
    document.getElementById('Inputbuttons').remove()
  }
}
function Addinfo1() {
  yy = $(Field3).val() + document.getElementById('myLRB').value
  $(Field3).val(yy)
  $(Field1).css('background-color', 'yellow');
  $(Field1).focus()
  document.getElementById('myLRB').remove()
}
function Addinfo2() {
  yy = $(Field3).val() + document.getElementById('myXR').value
  document.getElementById('myXR').remove()
  $(Field3).val(yy)
  $(Field1).css('background-color', 'yellow');
  $(Field1).focus()
}
function Addsite() {
  var x = document.createElement('SELECT');
  x.setAttribute('id', 'myLRB');
  x.setAttribute('style', 'font-size:16px;position:fixed;top:170px;right:100px;');
  for (i = 0; i < LRB.length; i++) {
    document.body.appendChild(x);
    var z = document.createElement('option');
    z.setAttribute('value', LRB[i]);
    var t = document.createTextNode(LRB[i]);
    z.appendChild(t);
    z.onclick = Addinfo1
    document.getElementById('myLRB').appendChild(z);
    document.getElementById('myLRB').size = LRB.length;
    document.getElementById('myLRB').style.backgroundColor = '#CCFFFF';
  }
  xType.sort()
  var x = document.createElement('SELECT');
  x.setAttribute('id', 'myXR');
  x.setAttribute('style', 'font-size:16px;position:fixed;top:130px;right:0px;');
  for (i = 0; i < xType.length; i++) {
    document.body.appendChild(x);
    var z = document.createElement('option');
    z.setAttribute('value', xType[i]);
    var t = document.createTextNode(xType[i]);
    z.appendChild(t);
    z.onclick = Addinfo2
    document.getElementById('myXR').appendChild(z);
    document.getElementById('myXR').size = xType.length;
    document.getElementById('myXR').style.backgroundColor = '#CCFFFF';
  }
}
//********************************************************************************************************************************

var input11 = document.createElement('input');
input11.type = 'button';
input11.value = 'Save and Close';
var ShowClick = (input11.value).trim()
input11.id = 'Forms'
input11.onclick = showAlert11;
input11.setAttribute('style', 'font-size:12px;position:absolute;top:460px;right:180px;height:40px;background-color:  #FF00FF  ');
document.body.appendChild(input11);
function showAlert11() {
  //$(TicklerButton).click()
  $(SaveButton).click()
  $(SaveButton).click()
  window.opener.location.reload();
  $(CloseButton).click();
}
var input12 = document.createElement('input');
input12.type = 'button';
input12.value = 'Tickler and Acknowledge';
var ShowClick = (input12.value).trim()
input12.id = 'Forms'
input12.onclick = showAlert12;
input12.setAttribute('style', 'font-size:16px;position:fixed;bottom:0px;right:0px;background-color:  #FF0000 ');
document.body.appendChild(input12);
function showAlert12() {
  unsafeWindow.addDocComment(params.segmentID,'1',true);
  window.open(vPath + 'tickler/ForwardDemographicTickler.do?docType=DOC&docId=' + params.segmentID + '&demographic_no=' + demono, '_blank', 'width=800, height=500') //PREVENTION SCREEN********
  $(AckButton).click()
    //$(CommentArea).val('Tickler Sent')
  // $(TicklerButton).click()
  //$(SaveButton).click()
  //$(CloseButton).click();
}
//-----------------------------------------------------------------
