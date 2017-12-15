// ==UserScript==
// @name           Set Demographic Default Provider
// @namespace      StansScripts

// @description Sets default provider doc for edit demographic screen
// @include        *&displaymode=edit&dboperation=search_detail*
// ==/UserScript==

 //showHideDetail();
var theDefault='Hurwitz,Stanley D';
var theOptions = document.getElementsByName('provider_no')[0].options;
for  (var theOption of theOptions)
{for (var i=0; i<3; i++) {}  //Delay Loop
//{alert(theOption.text)
	if(typeof(theOption)=='object'){
		if(theOption.text==theDefault){
			theOption.selected=true;
			break;
		}
	}
}
document.submit()







   