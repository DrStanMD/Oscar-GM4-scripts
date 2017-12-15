// ==UserScript==
// @name           SocialHistoryInConsults
// @namespace      oscar
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include        */oscarEncounter/oscarConsultationRequest/ConsultationFormRequest.jsp?*
// @include                *oscarEncounter/RequestConsultation.do*
// ==/UserScript==


var theHistory='';
var theProvider=document.getElementsByName('providerNo')[0].value;
var theDemographic=document.getElementsByName('demographicNo')[0].value;
var theSocialHistoryLink=document.location.href.replace(document.location.search,'').replace('/oscarEncounter/oscarConsultationRequest/ConsultationFormRequest.jsp','/CaseManagementView.do?hc=&method=listNotes&issue_code=SocHistory&title=&cmd=');
theSocialHistoryLink+='&providerNo=' + theProvider + '&demographicNo=' + theDemographic;
var request=new XMLHttpRequest();
request.open('GET', theSocialHistoryLink, false);
request.send();
if (request.status==200) {	
	theIssues=request.responseText.replace(/<br>/g,';  ').match(/>[^>]*<\/a>/gmi);
	if(theIssues.length>2){
		for(var index=2;index<theIssues.length;index++){
		theHistory=theHistory+theIssues[index].substring(1,theIssues[index].length-4).trim()+';  ';
		}
	}

	var theClinicalInfoButtonBar=document.getElementById('clinicalInfoButtonBar');
	var theClinicalInfoButton = document.createElement('input');
	theClinicalInfoButton.setAttribute('type',"button");
	theClinicalInfoButton.setAttribute('value',"Social History");
	theClinicalInfoButton.setAttribute('class',"btn");	
	theClinicalInfoButton.onclick = function(){
		var theTarget=document.getElementsByName('clinicalInformation')[0];
		if(theTarget.value.length>0&&theHistory.length>0)theTarget.value+=';  ';
		theTarget.value+=theHistory+"\n";
		//$('#clinicalInfoButtonBar > input:nth-child(2)').click()	
		//$('#clinicalInfoButtonBar > input:nth-child(3)').click()	
		theTarget.scrollTop=theTarget.scrollHeight;
		theTarget.focus();
	};
	theClinicalInfoButtonBar.insertBefore(theClinicalInfoButton,theClinicalInfoButtonBar.firstChild);

	var theConcurrentProblemsButtonBar=document.getElementById('concurrentProblemsButtonBar');
	var theConcurrentProblemsButton = document.createElement('input');
	theConcurrentProblemsButton.setAttribute('type',"button");
	theConcurrentProblemsButton.setAttribute('value',"Full History");
	theConcurrentProblemsButton.setAttribute('class',"btn");	
	theConcurrentProblemsButton.onclick = function(){
		var theTarget=document.getElementsByName('concurrentProblems')[0];
		if(theTarget.value.length>0&&theHistory.length>0)theTarget.value+=';  ';
		theTarget.value+=theHistory+"\nFAMILY HISTORY:";
		$('#concurrentProblemsButtonBar > input:nth-child(2)').click()	
		theTarget.value+="\nMEDICAL HISTORY:";
		$('#concurrentProblemsButtonBar > input:nth-child(3)').click()	
		theTarget.scrollTop=theTarget.scrollHeight;
		theTarget.focus();
		
	};
	theConcurrentProblemsButtonBar.insertBefore(theConcurrentProblemsButton,theConcurrentProblemsButtonBar.firstChild);	
}