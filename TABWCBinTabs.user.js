// ==UserScript==
// @name           TABWCBinTabs
// @namespace      oscar
// @include        */billing/CA/BC/support/billingfeeitem.jsp*
// @include        */billing/CA/BC/support/natureinjury.jsp*
// @include        */billing/CA/BC/support/bodypart.jsp*
// @include        */billing/CA/BC/support/icd9.jsp*
// @run-at document-start
// ==/UserScript==
if (document.location.href.match("/billing/CA/BC/support/billingfeeitem.jsp")){
window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[0]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('opener.document.focus();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);	
}
else if (document.location.href.match("/billing/CA/BC/support/natureinjury.jsp")){
window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('opener.document.focus();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);
}
else if (document.location.href.match("/billing/CA/BC/support/bodypart.jsp")){
window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('opener.document.focus();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);	
}
else if (document.location.href.match("/billing/CA/BC/support/icd9.jsp")){
window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('opener.document.focus();','').replace('}',';self.close();}');
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);	
}