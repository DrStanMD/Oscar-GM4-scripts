// ==UserScript==
// @name        Colorize Web Text
// @namespace   Stanscript
// @include     *
// @description Utility script for programmners that modifies the color of the selected text
// @version     1
// @grant       none
// ==/UserScript==
function colorize_web_text(vstyle, color) {
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
  }
}
