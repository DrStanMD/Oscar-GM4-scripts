// ==UserScript==
// @name           Laboratory Test Name Remapper3 Disabled
// @namespace      oscar
// @include        http://*/*/casemgmt/forward.jsp?*
// @include        https://*/*/casemgmt/forward.jsp?*
// ==/UserScript==
window.addEventListener('load', function (e) {
  addButton();
}, false);
function addButton() {
  var targetDiv = document.getElementById('leftNavBar');
  var inputButton = document.createElement('input');
  inputButton.id = 'btnRenameTheLabs';
  inputButton.type = 'button';
  inputButton.value = 'Rename Labs';
  inputButton.setAttribute('style', 'font-size:12px;position:fixed;bottom:0px;left:0px;z-index:1;');
  targetDiv.appendChild(inputButton);
  addButtonListener();
}
function addButtonListener() {
  var button = document.getElementById('btnRenameTheLabs');
  button.addEventListener('click', doRenamings, true);
}
function doRenamings() {
  var theLabList = document.getElementById('labslist');
  var links = theLabList.getElementsByClassName('links');
  var thePrefix;
  var theSuffix;
  var flgWrapped;
  for (var link_id = 0; link_id < links.length; link_id += 2)
  {
    var strTestName = links[link_id].innerHTML.replace(/^\s+|\s+$/g, '');
    thePrefix = strTestName.charAt(0);
    theSuffix = strTestName.charAt(strTestName.length - 1);
    flgWrapped = false;
    if (thePrefix == '*' && theSuffix == '*') flgWrapped = true;
    if (flgWrapped) strTestName = strTestName.substring(1, strTestName.length - 1);
    theNames = strTestName.split('/');
    if (theNames.length > 1)
    {
      var thePhrase = renameTheLab(theNames[0]);
      for (var name_id = 1; name_id < theNames.length; name_id++)
      {
        thePhrase += '/';
        thePhrase += renameTheLab(theNames[name_id]);
      }
      links[link_id].innerHTML = flgWrapped ? '*' + thePhrase + '*' : thePhrase;
    } 
    else links[link_id].innerHTML = flgWrapped ? '*' + renameTheLab(strTestName) + '*' : renameTheLab(strTestName);
  }
}
function renameTheLab(strOldName) {
  var strNewName = strOldName;
  switch (strOldName)
    {
    case 'MICRO16':
      strNewName = 'H.Pylori';
      break;
    case 'CHEM1':
      strNewName = 'B12/Fe';
      break;
    case 'CHEM6':
      strNewName = 'Lipids';
      break;
    case 'CHEM25':
      strNewName = 'FIT';
      break;
    case 'CHEM2':
      strNewName = 'Urine';
      break;
      //**********************************************			
    case 'HAEM1':
      strNewName = 'CBC';
      break;
    case 'HAEM3':
      strNewName = 'INR';
      break;
    case 'HAEM8':
      strNewName = 'SemAn';
    case 'CHEM1':
      strNewName = 'FE';
      break;
    case 'CHEM2':
      strNewName = 'UA';
      break;
    case 'CHEM3.5':
      strNewName = 'ABG';
      break;
    case 'CHEM4':
      strNewName = 'LYTES/A1C';
      break;
    case 'CHEM5':
      strNewName = 'CK';
      break;
    case 'CHEM5.5':
      strNewName = 'TROP';
      break;
    case 'CHEM6':
      strNewName = 'CHOL';
      break;
    case 'CHEM8':
      strNewName = 'GLUC';
      break;
    case 'CHEM9':
      strNewName = 'UCHEM';
      break;
    case 'CHEM10':
      strNewName = 'ACR';
      break;
    case 'CHEM11':
      strNewName = 'TSH';
      break;
    case 'CHEM12':
      strNewName = 'PITHorm';
      break;
    case 'CHEM14':
      strNewName = 'CaTests';
      break;
    case 'CHEM15':
      strNewName = 'HCG-Horm';
      break;
    case 'CHEM17':
      strNewName = 'CRP';
      break;
    case 'CHEM19':
      strNewName = 'SAL/ACET';
      break;
    case 'CHEM21':
      strNewName = 'ETOH';
      break;
    case 'CHEM28':
      strNewName = 'PTH';
      break;
    case 'MICRO3':
      strNewName = 'UCUL';
      break;
    case 'REFER2':
      strNewName = 'HepHIVSer';
      break;
    case 'MICRO11':
      strNewName = 'Skin/Nail';
      break;
      //************************************************************
      //Use an uncommentted copy of the following 3 lines for each test name you want to map
      //case 'USER_UNFRIENDLY_TEST_NAME':
      //strNewName='USER_FRIENDLY_TEST_NAME';
      //break;
    default:
      break;
  }
  return strNewName;
}
