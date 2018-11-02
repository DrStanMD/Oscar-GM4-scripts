// ==UserScript==
// @name           TABRefreshOnBilling
// @namespace      oscar
// @include        */billing/CA/BC/SaveBilling.do
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
        if(e.target===document.getElementsByTagName("script")[2]){
		if(e.target.innerHTML.indexOf('self.close();')>-1){
		e.stopPropagation();
		e.preventDefault();
		document.head.appendChild(document.createElement('script')).innerHTML=e.target.innerHTML.replace('self.close();','')+';self.close();';
		window.removeEventListener(e.type, arguments.callee, true);		
		}
        }
}, true);