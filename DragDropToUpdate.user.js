// ==UserScript==
// @name        DragDropToUpdate
// @namespace   oscar
// @include     */eform/efmimagemanager.jsp
// @version     0.1
// @grant       none
// ==/UserScript==
function fileDragHandler(theEvent) {
	theEvent.stopPropagation();
	theEvent.preventDefault();
	theEvent.target.style.border = (theEvent.type == "dragover" ? "5px solid blue" : "5px solid #ccc");
}
function fileDropHandler(theEvent) {
    theEvent.stopPropagation();
    theEvent.preventDefault();
	theEvent.target.style.border = (theEvent.type == "dragover" ? "5px solid green" : "5px solid #ccc");
    var theFiles = theEvent.target.files || theEvent.dataTransfer.files;
    theEvent.target.innerHTML='';
    for (var index = 0, theFile; theFile = theFiles[index]; index++) {
        theEvent.target.innerHTML=theEvent.target.innerHTML+'Updating '+theFile.name+'.<br>'
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "deleteImage.do?filename="+theFile.name);
        xhr.send();    		
        var fd = new FormData();
        fd.append("image", theFile);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "imageUpload.do");
        xhr.send(fd);    		
        theEvent.target.innerHTML=theEvent.target.innerHTML+theFile.name+' has been updated.<br>'
    }
}
var theTarget = document.evaluate('/html/body/center/table[2]/tbody/tr[1]/td[1]/center/table/tbody',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var theDropZone = document.createElement('div');
theDropZone.innerHTML='Drop file here to update';
theDropZone.setAttribute('style','border: 5px solid #ccc; width: 300px; min-height: 150px; margin: 20px auto;');
theDropZone.addEventListener("dragover", fileDragHandler, false);
theDropZone.addEventListener("dragleave", fileDragHandler, false);
theDropZone.addEventListener("drop", fileDropHandler, false);
theTarget.appendChild(theDropZone);