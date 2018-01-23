// ==UserScript==
// @name       Transcription Highlight
// @namespace   Stanscripts
// @description Highlights lines on Transcription reports and Names the Labs
// @include     *lab/CA/ALL/labDisplay.jsp?*
// @version 5.1
//@grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==
/*
var imported = document.createElement('script');
imported.src = 'https://secure10.oscarhost.ca/SDHurwitzInc/eform/displayImage.do?imagefile=Colorize_Web_Text.js'
document.head.appendChild(imported);
*/
var count = $('#tblDiscs tr').length;
// alert(count)
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
} // If the text content of an element contains white-spaces only, then does not need to colorize

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
  } // Create a span element around the node

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
} //**********************************************************************************

ExcelArray = [
  'TRANSCRIP',
  'CELLPATH',
  'BCCASMP',
  'BCCACSP'
] /*
  var LabList = document.getElementsByClassName('NarrativeRes');
  for (i = 0; i < LabList.length; i++) {
  //  alert(LabList[i].textContent)
  $(LabList[i]).css('background-color', 'yellow');
   alert($(LabList[i]).text())
  //    LabList[i].style.backgroundColor = "yellow"; // make the first one red
//alert(Labteststring)
  }
*/
function RenameLabs() {
  Labteststring = ''
  NamedLab = ''
  var LabList = document.getElementsByClassName('Title2');
  //LabList[0].style.color = "red"; // make the first one red
  for (i = 0; i < LabList.length; i++) {
    Labteststring = (LabList[i].innerHTML).trim() // alert(Labteststring)
    NamedLab = NamedLab + renameTheLab(Labteststring) + ' '
  }
  $('#acklabel').val(NamedLab)
  setTimeout(function () {
    $('#createLabel').click();
  }, 500);
}
function ResetNames() {
  $('#acklabel').val('')
  $('#createLabel').click();
  $('#createLabel').click();
}//window.resizeTo(1200, 800);

window.moveTo(300, 100) //author = prompt("Please enter label name", "");
//Get line numbers from label and apply highlights************
GetLabel = $('#acklabel').val()
if (GetLabel.search('##') > 0) {
  vStart = GetLabel.search('##') + 2
} 
else {
  vStart = 10000
} //alert(vStart)

var myMemo = ''
vArray = GetLabel.slice(vStart)
var res = vArray.split(',');
if (res != null) {
  // alert(res.length)
  for (i = 0; i < res.length - 1; i++) {
    $('tr.NarrativeRes:nth-child(' + res[i] + ') > td:nth-child(2)').css('background-color', 'yellow');
    myMemo = myMemo + ' ' + $('tr.NarrativeRes:nth-child(' + res[i] + ') > td:nth-child(2)').text()
  }
}
teststring = ($('.Title2').html()).trim() //alert(ExcelArray.indexOf(teststring))
//alert(teststring)
if (ExcelArray.indexOf(teststring) == - 1) {
  document.designMode = 'off';
  //auto rename**********************************
  $(document).ready(RenameLabs()) //end auto rename***************************
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
  var SavedLines = ''  //document.designMode = 'on';
  document.designMode = 'off';
  author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html();
  if (!author) {
    author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html()
  }
  if (!author) {
    author = prompt('Please enter label name', '');
  }
  fixedauthor = (author.replace(' <strong>Requesting Client: </strong>', '')).trim() //alert(fixedauthor)
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
  /*
  var storedSelections = '';
  if (window.getSelection) {
    var currSelection = window.getSelection();
    storedSelections = currSelection.getRangeAt(0);

    document.designMode = 'on';
    currSelection.addRange(storedSelections)
    rng = currSelection
    if (rng) {
      window.find(rng)
    } //  document.execCommand('BackColor', false, 'yellow')

    document.execCommand('hiliteColor', false, 'yellow')
    document.designMode = 'off';
    
  
  //******************   
}
*/
}
function SaveAndExit() {
  SavedLines = ''
  var i = 0
  $('tr.NarrativeRes').each(function () {
    var elements = $(this).text();
    var ecolor = $(this).html();
    //alert(i + elements)   
    if (ecolor.includes('background-color: yellow;')) {
      SavedLines += i + 3 + ','
    }
    i += 1
  }
  )
  if (ExcelArray.indexOf(teststring) > - 1 && teststring != 'TRANSCRIP') {
    fixedauthor = teststring
  }
  $('#acklabel').val(fixedauthor + '  ##' + SavedLines)
  $('#createLabel').click();
  $('#createLabel').click();
  unsafeWindow.getComment('ackLab') //window.close()
}
function ClearStoredSelections() {
  SavedLines = ''
  $('#acklabel').val(fixedauthor)
  for (i = 0; i < count + 2; i++) {
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(1) > span:nth-child(1)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(3) > span:nth-child(1)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(2)').css('background-color', '');
    $('tr.NarrativeRes:nth-child(' + i + ') > td:nth-child(2) > span:nth-child(1)').css('background-color', '');
  }
  $('#createLabel').click();
  $('#createLabel').click();
} ///*********************************************************************

window.addEventListener('keypress', function (theEvent) {
  //theEvent.stopPropagation();
  //theEvent.preventDefault();
  var theKeyCode = theEvent.charCode;
  // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  switch (true) {
    case theAltKey && theKey == 'q':
      //Save Selected text to Label
      //$('#acklabel').val(fixedauthor + "  ##" + SavedLines )
      $('#acklabel').val($('#acklabel').val())
      $('#createLabel').click();
      unsafeWindow.getComment('ackLab')
      break;
    case theAltKey && theKey == 'w':
      //
      function getSelectionText() {
        var text = '';
        if (window.getSelection) {
          text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != 'Control') {
          text = document.selection.createRange().text;
        }
        $('#acklabel').val((text).trim())
        $('#createLabel').click();
        unsafeWindow.getComment('ackLab')
        return text;
      }
      getSelectionText()
      break;
    case theAltKey && theKey == 'Z':
      //Open comment textbox
      unsafeWindow.getComment('ackLab')
      break;
    case theAltKey && theKey == 'z':
      SaveAndExit()
      break;
    case theAltKey && theKey == 't':
      //Click on Tickler button
      $('input:nth-child(13)').css('background-color', 'yellow');
      $('input:nth-child(13)').click();
      break;
    case theAltKey && theKey == 'x':
      //Click on Tickler button
      fixedauthor = $('#acklabel').val()
      $('#createLabel').click();
      $('#createLabel').click();
      SaveAndExit()
      break;
  }
},
true); //****************************************************************************
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
      strNewName = 'PTH';
      break;
    case 'CHEM14':
      strNewName = 'CaTests';
      break;
    case 'CHEM15':
      strNewName = 'Horm';
      break;
    case 'CHEM17':
      strNewName = 'CRP';
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
      strNewName = 'HepHIV';
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
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
      break;
    case 'CHEM20':
      strNewName = 'DrugScr';
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
