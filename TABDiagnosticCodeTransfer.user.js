// ==UserScript==
// @name           enableDiagnosticCodeTransfer
// @namespace      oscar
// @include        */billing/CA/BC/billingDigNewUpdate.jsp*
// @include        */billing/CA/BC/billingDigNewSearch.jsp*
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[1]){
		if(e.target.innerHTML.indexOf("self.close();")>-1)
		{
			e.stopPropagation();
			e.preventDefault();
			document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','').replace('}',';self.close();}');
		}	
		window.removeEventListener(e.type, arguments.callee, true);		
        }
}, true);