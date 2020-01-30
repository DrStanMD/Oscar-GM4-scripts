// ==UserScript==
// @name       Transcription Highlight
// @namespace   Stanscripts
// @description Highlights lines on Transcription reports and Names the Labs
// @include     *lab/CA/ALL/labDisplay.jsp?*
// @version 15.4.2
//@grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==
var fixedauthor = ''
var count = $('#tblDiscs tr').length;
//alert(count)
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
var IDnum = params.segmentID //alert(IDnum)
//var Field1 = '#autocompletedemo' + IDnum
//var Field2 = '#docType_' + IDnum
//var Field2ID = 'docType_' + IDnum
//var Field3 = '#docDesc_' + IDnum
var CloseButton = ' #closeBtn_' + IDnum
var AckButton = '#ackBtn_' + IDnum
var SaveButton = '#save' + IDnum
var TicklerButton = '#ticklerBtn_' + IDnum
var CommentArea = '#comment_' + IDnum
var AckLabel = '#acklabel_' + IDnum
var CreateLabel = '#createLabel_' + IDnum
var LabelSpan = '#labelspan_' + IDnum
//********************************************************************************
function GetNextLeaf(node) {
  while (!node.nextSibling) {
    node = node.parentNode;
    if (!node) {
      return node;
    }
  }
  var leaf = node.nextSibling;
  while (leaf.firstChild) {
    leaf = leaf.firstChild;
  }
  return leaf;
}
function GetPreviousLeaf(node) {
  while (!node.previousSibling) {
    node = node.parentNode;
    if (!node) {
      return node;
    }
  }
  var leaf = node.previousSibling;
  while (leaf.lastChild) {
    leaf = leaf.lastChild;
  }
  return leaf;
}// If the text content of an element contains white-spaces only, then does not need to colorize

function IsTextVisible(text) {
  for (var i = 0; i < text.length; i++) {
    if (text[i] != ' ' && text[i] != '\t' && text[i] != '\r' && text[i] != '\n')
    return true;
  }
  return false;
}
function ColorizeLeaf(node, color) {
  if (!IsTextVisible(node.textContent))
  return;
  var parentNode = node.parentNode;
  // if the node does not have siblings and the parent is a span element, then modify its color
  if (!node.previousSibling && !node.nextSibling) {
    if (parentNode.tagName.toLowerCase() == 'span') {
      parentNode.style.backgroundColor = color;
      return;
    }
  }  // Create a span element around the node

  var span = document.createElement('span');
  span.style.backgroundColor = color;
  var nextSibling = node.nextSibling;
  parentNode.removeChild(node);
  span.appendChild(node);
  parentNode.insertBefore(span, nextSibling);
}
function ColorizeLeafFromTo(node, color, from, to) {
  var text = node.textContent;
  if (!IsTextVisible(text))
  return;
  if (from < 0)
  from = 0;
  if (to < 0)
  to = text.length;
  if (from == 0 && to >= text.length) {
    // to avoid unnecessary span elements
    ColorizeLeaf(node, color);
    return;
  }
  var part1 = text.substring(0, from);
  var part2 = text.substring(from, to);
  var part3 = text.substring(to, text.length);
  var parentNode = node.parentNode;
  var nextSibling = node.nextSibling;
  parentNode.removeChild(node);
  if (part1.length > 0) {
    var textNode = document.createTextNode(part1);
    parentNode.insertBefore(textNode, nextSibling);
  }
  if (part2.length > 0) {
    var span = document.createElement('span');
    span.style.backgroundColor = color;
    var textNode = document.createTextNode(part2);
    span.appendChild(textNode);
    parentNode.insertBefore(span, nextSibling);
  }
  if (part3.length > 0) {
    var textNode = document.createTextNode(part3);
    parentNode.insertBefore(textNode, nextSibling);
  }
}
function ColorizeNode(node, color) {
  var childNode = node.firstChild;
  if (!childNode) {
    ColorizeLeaf(node, color);
    return;
  }
  while (childNode) {
    // store the next sibling of the childNode, because colorizing modifies the DOM structure
    var nextSibling = childNode.nextSibling;
    ColorizeNode(childNode, color);
    childNode = nextSibling;
  }
}
function ColorizeNodeFromTo(node, color, from, to) {
  var childNode = node.firstChild;
  if (!childNode) {
    ColorizeLeafFromTo(node, color, from, to);
    return;
  }
  for (var i = from; i < to; i++) {
    ColorizeNode(node.childNodes[i], color);
  }
}
function ColorizeSelection(color) {
  if (window.getSelection) { // all browsers, except IE before version 9
    var selectionRange = window.getSelection();
    if (selectionRange.isCollapsed) {
      alert('Please select some content first!');
    } 
    else {
      var range = selectionRange.getRangeAt(0);
      // store the start and end points of the current selection, because the selection will be removed
      var startContainer = range.startContainer;
      var startOffset = range.startOffset;
      var endContainer = range.endContainer;
      var endOffset = range.endOffset;
      // because of Opera, we need to remove the selection before modifying the DOM hierarchy
      selectionRange.removeAllRanges();
      if (startContainer == endContainer) {
        ColorizeNodeFromTo(startContainer, color, startOffset, endOffset);
      } 
      else {
        if (startContainer.firstChild) {
          var startLeaf = startContainer.childNodes[startOffset];
        } 
        else {
          var startLeaf = GetNextLeaf(startContainer);
          ColorizeLeafFromTo(startContainer, color, startOffset, - 1);
        }
        if (endContainer.firstChild) {
          if (endOffset > 0) {
            var endLeaf = endContainer.childNodes[endOffset - 1];
          } 
          else {
            var endLeaf = GetPreviousLeaf(endContainer);
          }
        } 
        else {
          var endLeaf = GetPreviousLeaf(endContainer);
          ColorizeLeafFromTo(endContainer, color, 0, endOffset);
        }
        while (startLeaf) {
          var nextLeaf = GetNextLeaf(startLeaf);
          ColorizeLeaf(startLeaf, color);
          if (startLeaf == endLeaf) {
            break;
          }
          startLeaf = nextLeaf;
        }
      }
    }
  } 
  else {
    // Internet Explorer before version 9
    alert('Your browser does not support this example!');
  }
} 
//**********************************************************************************

ExcelArray = [
  'TRANSCRIP',
  'CELLPATH',
  'BCCASMP',
  'BCCACSP',
  'DIAG IMAGE',
  'NOTIF',
  'TRANSPDF'
]
function RenameLabs() {
  Labteststring = ''
  NamedLab = ''
  var LabList = document.getElementsByClassName('Title2');
  //alert(LabList)
  //LabList[0].style.color = "red"; // make the first one red
  for (i = 0; i < LabList.length; i++) {
    // alert(LabList[i].innerHTML)
    Labteststring = (LabList[i].innerHTML).trim() // alert(Labteststring)
    NamedLab = NamedLab + renameTheLab(Labteststring) + ' '
  }
  //alert($(AckLabel).val)
//  alert($(LabelSpan).text())

  if($(LabelSpan).text().trim()==="Label:" || $(LabelSpan).text()==="Label: (not set) "){
  $(AckLabel).val(NamedLab)  //$('.MainTableTopRowRightColumn > input:nth-child(7)').val(NamedLab)
  //alert($(AckLabel).val)
  setTimeout(function () {
  $(CreateLabel).click();
  }, 500);
  }
}
function ResetNames() {
  $(AckLabel).val('')
  $(CreateLabel).click();
  $(CreateLabel).click();
}//window.resizeTo(1200, 800);

window.moveTo(300, 100)//author = prompt("Please enter label name", "");
//Get line numbers from label and apply highlights************
//GetLabel = $(AckLabel).val()
GetLabel = $(LabelSpan).html()//GetLabel = $('.MainTableTopRowRightColumn > input:nth-child(7)').val()
//alert(GetLabel)
if (GetLabel.search('##') > 0) {
  vStart = GetLabel.search('##') + 2
} 
else {
  vStart = 10000
} //alert(vStart)

var myMemo = ''
vArray = GetLabel.slice(vStart)
var res = vArray.split(',');
//alert(res)
if (res != null) {
  // alert(res.length)
  for (i = 0; i < res.length - 1; i++) {
    $('tr.NarrativeRes:nth-child(' + res[i] + ') > td:nth-child(2)').css('background-color', 'yellow');
    myMemo = myMemo + ' ' + $('tr.NarrativeRes:nth-child(' + res[i] + ') > td:nth-child(2)').text()
  }
}
teststring = ($('.Title2').html()).trim()//alert(ExcelArray.indexOf(teststring))
//alert(teststring)
if (ExcelArray.indexOf(teststring) == - 1) {
  //auto rename**********************************
  $(document).ready(RenameLabs())  //end auto rename***************************
  var input5 = document.createElement('input');
  input5.type = 'button';
  input5.value = 'Rename the Labs';
  input5.onclick = RenameLabs
  input5.setAttribute('style', 'font-size:14px;position:absolute;top:50px;left:10px;');
  document.body.appendChild(input5);
  var input6 = document.createElement('input');
  input6.type = 'button';
  input6.value = 'Reset Lab names';
  input6.onclick = ResetNames
  input6.setAttribute('style', 'font-size:14px;position:absolute;top:50px;left:150px;');
  document.body.appendChild(input6);
} 
else {
  //**************************************Highlight 
  var SavedLines = ''  //author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html();
  author = $('#acknowledgeForm_' + IDnum + '> table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html();
  //alert(author)
  if (!author) {
    author = $('#acknowledgeForm_' + IDnum + '> table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html()
  }
  if (!author) {
    author = prompt('Please enter label name', '');
  }
  fixedauthor = (author.replace(' <strong>Requesting Client: </strong>', '')).trim()  //alert(fixedauthor)
  //alert(fixedauthor)
  var input3 = document.createElement('input');
  input3.type = 'button';
  input3.value = 'Clear all';
  input3.onclick = ClearStoredSelections
  input3.setAttribute('style', 'font-size:18px;position:fixed;top:540px;right:0px;');
  document.body.appendChild(input3);
  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'Highlight Text';
  input.onclick = StoreSelection
  input.setAttribute('style', 'font-size:18px;position:fixed;top:460px;right:0px;');
  document.body.appendChild(input);
  var input1 = document.createElement('input');
  input1.type = 'button';
  input1.value = 'Save and Exit';
  input1.onclick = SaveAndExit
  input1.setAttribute('style', 'font-size:18px;position:fixed;top:500px;right:0px;');
  document.body.appendChild(input1);
}


if (teststring == 'DIAG IMAGE') {
  //**************************************Highlight 
  var SavedLines = ''
  author = $('tr.NarrativeRes:nth-child(2) > td:nth-child(2)').html() 
  //alert(author)
  if (!author) {
    author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html()
  }
  if (!author) {
    author = prompt('Please enter label name', '');
  } //alert(author)

  fixedauthor = (author.replace('Procedure: ', '')).trim() //alert(fixedauthor)
  var input3 = document.createElement('input');
  input3.type = 'button';
  input3.value = 'Clear all';
  input3.onclick = ClearStoredSelections
  input3.setAttribute('style', 'font-size:18px;position:fixed;top:540px;right:0px;');
  document.body.appendChild(input3);
  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'Highlight Text';
  input.onclick = StoreSelection
  input.setAttribute('style', 'font-size:18px;position:fixed;top:460px;right:0px;');
  document.body.appendChild(input);
  var input1 = document.createElement('input');
  input1.type = 'button';
  input1.value = 'Save and Exit';
  input1.onclick = SaveAndExit
  input1.setAttribute('style', 'font-size:18px;position:fixed;top:500px;right:0px;');
  document.body.appendChild(input1);
}
function StoreSelection() {
  ColorizeSelection('yellow');
}
function SaveAndExit() {
  SavedLines = ''
  var i = 0
  $('tr.NarrativeRes').each(function () {
    var elements = $(this).text();
    var ecolor = $(this).html();
    // alert(i + elements)   
    if (ecolor.includes('background-color: yellow;')) {
      SavedLines += i + 2 + ','      //SavedLines += i + 3 + ','
    }
    i += 1
  }
  )  

  //alert(teststring)
  if (ExcelArray.indexOf(teststring) > - 1 && teststring != 'TRANSCRIP' && teststring != 'DIAG IMAGE' && teststring != 'TRANSPDF') {
    fixedauthor = teststring
  }
  
  
  $(AckLabel).val(fixedauthor + '  ##' + SavedLines)
  $(CreateLabel).click();
  $(CreateLabel).click();
  // unsafeWindow.getComment('ackLab') //window.close()
  unsafeWindow.getComment('ackLab', IDnum);
  //$('.MainTableTopRowRightColumn > input:nth-child(7)').click()
}
function ClearStoredSelections() {
  //alert(fixedauthor)
  //alert(count)
  SavedLines = ''  //$(Acklabel).val(fixedauthor)
  //alert(count)
  for (i = 0; i < count; i++) {
    // alert(fixedauthor)
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(1) > span:nth-child(1)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(3) > span:nth-child(1)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(2)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(2) > span:nth-child(1)').css('background-color', '');
  }
  $(CreateLabel).click();
  $(CreateLabel).click();
} 
///*********************************************************************


(function () {
  document.addEventListener('keydown', function (e) {
    //alert(e.keyCode)
    
    if (e.keyCode == 76 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //l
       unsafeWindow.getComment('ackLab', IDnum);
    }

    if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //z
       unsafeWindow.getComment('ackLab', IDnum);
    }
    
    if (e.keyCode == 90 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) { //Z
      unsafeWindow.getComment('ackLab', IDnum);
    }
  }, false);
}) ();


/*
window.addEventListener('keypress', function (theEvent) {
  var theKeyCode = theEvent.charCode;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  switch (true) {
    case theShiftKey && theKey == 'Q':
      //Save Selected text to Label
      //$('#acklabel').val(fixedauthor + "  ##" + SavedLines )
      $(Acklabel).val($(Acklabel).val())
      $(CreateLabel).click();
      //unsafeWindow.getComment('ackLab')
      unsafeWindow.getComment('ackLab', IDnum);
      break;
    case ShiftKey && theKey == 'W':
      //
      function getSelectionText() {
        var text = '';
        if (window.getSelection) {
          text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != 'Control') {
          text = document.selection.createRange().text;
        }
        $(Acklabel).val((text).trim())
        $(CreateLabel).click();
        //unsafeWindow.getComment('ackLab')
        unsafeWindow.getComment('ackLab', IDnum);
        return text;
      }
      getSelectionText()
      break;
    case theAltKey && theKey == 'z':
      //Open comment textbox
      //unsafeWindow.getComment('ackLab')
      unsafeWindow.getComment('ackLab', IDnum);
      //$(AckLabel).click()
      break;
    case theShiftKey && theKey == 'Z':
      SaveAndExit()
      break;
    case ShiftKey && theKey == 'T':
      //Click on Tickler button
      $('input:nth-child(13)').css('background-color', 'yellow');
      $('input:nth-child(13)').click();
      break;
    case ShiftKey && theKey == 'X':
      //Click on Tickler button
      fixedauthor = $(Acklabel).val()
      $(CreateLabel).click();
      $(CreateLabel).click();
      SaveAndExit()
      break;
  }
},
true); 
*/
//****************************************************************************
function renameTheLab(strOldName) {
  var strNewName = strOldName;
  switch (strOldName)
    {
    case 'MICRO16':
      strNewName = 'HPyl';
      break;
    case 'CHEM1':
      strNewName = 'B12.Fe';
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
    case 'HAEM1':
      strNewName = 'CBC';
      break;
    case 'HAEM3':
      strNewName = 'INR';
      break;
    case 'HAEM8':
      strNewName = 'SemAn';
      break;
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
      strNewName = 'Lytes.A1C.LFT';
      break;
    case 'CHEM5':
      strNewName = 'CK';
      break;
    case 'CHEM5.5':
      strNewName = 'TROP.BNP';
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
      strNewName = 'ACR/uProt';
      break;
    case 'CHEM11':
      strNewName = 'TSH';
      break;
    case 'CHEM12':
      strNewName = 'PTH';
      break;
    case 'CHEM14':
      strNewName = 'CaTests';
      break;
    case 'CHEM15':
      strNewName = 'Horm';
      break;
    case 'CHEM17':
      strNewName = 'CRP/SPEP';
      break;
    case 'CHEM19':
      strNewName = 'Tox';
      break;
    case 'CHEM21':
      strNewName = 'ETOH';
      break;
    case 'CHEM28':
      strNewName = 'PTH';
      break;
    case 'MICRO3':
      strNewName = 'CUL';
      break;
    case 'REFER2':
      strNewName = 'HepHIV.HPyl';
      break;
    case 'MICRO15':
      strNewName = 'HepHiv';
      break;
    case 'CHEM18':
      strNewName = 'RF.ANA';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'BB2':
      strNewName = 'ABORh';
      break;
    case 'GENERAL':
      strNewName = '';
      break;
      //************************
    case 'TRANSPDF':
      strNewName = 'Hospital Report';
      break;
    case 'NOTIF':
      strNewName = 'Hospital Notification';
      break;
    case 'NOTIFP':
      strNewName = 'Pap Recall';
      break;
    case 'CARDIOPDF':
      strNewName = 'ECG/Holter';
      break;
    case 'CHEM15.2':
      strNewName = 'SIPS';
      break;
    case 'CYTO':
      strNewName = 'Pap test';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
      //************************************************************
      //Use an uncommentted copy of the following 3 lines for each test name you want to map
      //case 'USER_UNFRIENDLY_TEST_NAME':
      //strNewName='USER_FRIENDLY_TEST_NAME';
      //break;
    default:
      // strNewName = 'General';
      break;
  }
  return strNewName;
}
