// ==UserScript==
// @name        Annotation for Transcription Screen
// @namespace   Stanscripts
// @description Adds annotation button for saving selected text to encounter screen
// @include     *lab/CA/ALL/labDisplay.jsp?segmentID*
// @include   *lab/CA/ALL/labDisplay.jsp?demographicId*
// @include     */annotation/annotation.jsp?display*
// @version  15.4
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
//alert()
ExcelArray = [
    'TRANSCRIP',
    'CELLPATH',
    'BCCASMP',
    'BCCACSP',
    'DIAG IMAGE',
    'NOTIF',
    'TRANSPDF'
]
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
var IDnum = params.segmentID //
//alert(IDnum)
var AckForm = '#acknowledgeForm_' + IDnum
//********************************************************************************

newLine = ''
var author = ''
var fixedauthor = ''
var teststring = $('.Title2').html()
if (teststring) {
    teststring = teststring.trim()
} //alert(teststring)

if (ExcelArray.indexOf(teststring) > -1) {
    //if (teststring == 'TRANSCRIP' || teststring == 'CELLPATH') {
    var input = document.createElement('input');
    input.type = 'button';
    input.value = 'Save Selected Text to Echart';
    input.onclick = showAlert;
    input.setAttribute('style', 'font-size:18px;position:fixed;bottom:00px;right:0px; ');
    document.body.appendChild(input);
} else {
    //check if this is the annotation screen
    var path = window.location.pathname
    Acheck = path.search('/annotation/annotation.jsp')

    //******REMOVE METATAGS***************
    if (Acheck > 0) {
        var myText = location.search.split('AnnotText')[1]
        for (i = 0; i < myText.length; i++) {
            //clear URItags
            // myText = decodeURIComponent(myText)
            //Clear the extra spaces      
            myText = myText.replace(/%20%20/g, '');
            myText = myText.replace(/&LF/g, ' ');
        }
        //Fix Space    
        myText = myText.replace(/%20/g, ' ');
        //Fix apostrophe
        myText = myText.replace(/%27/g, '\'');
        //******END REMOVE METATAGS***************      

        $('.panel > textarea:nth-child(1)').val(myText)
    }
}
var vDOS = $('tr.NarrativeRes:nth-child(2) > td:nth-child(3)').html()
/*
var x = document.getElementsByClassName("FieldData");
var vDOS1 = $(x[19]).html()
alert(vDOS1)
alert(x.length)
for(i=0;i<x.length;i++){
alert(i+$(x[i]).html())
}  
*/

//alert(vDOS)
//author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html();
author = $(AckForm + ' > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html() //alert(author)
if (!author) {
    author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html()
}
if (!author) {
    //author = prompt("Please enter label name", "");
    author = 'Author not found'
}
fixedauthor = (author.replace(' <strong>Requesting Client: </strong>', '')).trim() //alert(fixedauthor)
if (teststring == 'DIAG IMAGE') {
    author = $('tr.NarrativeRes:nth-child(3) > td:nth-child(2)').html() //alert(author)
    if (!author) {
        author = $('#acknowledgeForm > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(1)').html()
    } //alert(author)

    fixedauthor = (author.replace('Procedure: ', '')).trim() //alert(fixedauthor)
}

function getSelectionText() {
    mytext = '';
    if (window.getSelection) {
        mytext = window.getSelection().toString();
        var eachLine = mytext.split('\n');
        // for (i = 0; i < eachLine.length - 1; i++) {
        for (i = 0; i < eachLine.length; i++) {
            newLine = newLine + eachLine[i] + '&LF' //Replace all '#' characters with 'No.' as the # character breaks the code
            newLine = newLine.replace(/#/g, 'No.');
        } //   alert(newLine)

        return newLine // return mytext
    } else if (document.selection && document.selection.type != 'Control') {
        mytext = document.selection.createRange().text;
    }
}

function showAlert() {
/*
    if (ExcelArray.indexOf("TRANSPDF") > -1) {
        var x = document.getElementsByClassName("FieldData");
        var vDOS1 = $(x[19]).html()
        window.open(vPath + '/annotation/annotation.jsp?display=Lab Reports&amp;table_id=' + IDnum + '&amp;other_id=0-9' + '&AnnotText' + 'Report Extract (' + fixedauthor + ' - ' + vDOS1 + '): \n\r' + newLine, 'anwin', 'width=400,height=500');
        return
    }
 */

    getSelectionText()
    var a_href = $('tr.NarrativeRes:nth-child(3) > td:nth-child(1) > a:nth-child(1)').attr('href')
    var params = {};
    if (a_href) {
        var parts = a_href.substring(1).split('&');
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
    myInsertURL = vPath + '/annotation/annotation.jsp?display=LabReports&table_id=' + segment_ID1 + '&demo=' + params.demo + '&other_id=0-1' + '&AnnotText' + 'Report Extract (' + fixedauthor + ' - ' + vDOS + '): \n\r' + newLine //alert(myInsertURL)
    window.open(myInsertURL, '', 'width=800, height=400')
}
var a_href = $('tr.NarrativeRes:nth-child(3) > td:nth-child(1) > a:nth-child(1)').attr('href')
if (a_href == null) {} else {
    //get parameters
    var params1 = {};
    if (location.search) {
        var parts = location.search.substring(1).split('&');
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params1[nv[0]] = nv[1] || true;
        }
    }
    segment_ID1 = params1.segmentID
    var elements = (window.location.pathname.split('/', 2))
    firstElement = (elements.slice(1))
    vPath = ('https://' + location.host + '/' + firstElement)
}
