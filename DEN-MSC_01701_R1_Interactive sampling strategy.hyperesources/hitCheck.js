function extendHype(a,b,c){return a.checkOverlapping=function(b,c){function m(a){var b=new Object,c=a.getBoundingClientRect();return b.radius=c.width/2,b.left=c.left+b.radius,b.top=c.top+b.radius,b}if(!b||!c)return!1;Object.prototype.toString.call(c).indexOf("Element")!=-1&&(c=[c]),"undefined"!=typeof a.ondragZindex?a.ondragZindex++:a.ondragZindex=999,a.setElementProperty(b,"z-index",a.ondragZindex);for(var d=m(b),e=!1,f=0;f<c.length;f++){var g=c[f],h=m(g),i=d.left-h.left,j=d.top-h.top,k=Math.sqrt(i*i+j*j),l=d.radius+h.radius-k;if(l>0){e={element:g,id:g.id,classList:g.classList};break}}return e},a.storeProperties=function(b){window.propStore=new Object,window.propStore.left=a.getElementProperty(b,"left"),window.propStore.top=a.getElementProperty(b,"top"),window.propStore.width=a.getElementProperty(b,"width"),window.propStore.height=a.getElementProperty(b,"height"),window.propStore.rotateZ=a.getElementProperty(b,"rotateZ"),window.propStore.scaleX=a.getElementProperty(b,"scaleX"),window.propStore.scaleY=a.getElementProperty(b,"scaleY"),window.propStore.opacity=a.getElementProperty(b,"opacity"),window.propStore.zindex=a.getElementProperty(b,"z-index")},a.resetProperties=function(b){a.setElementProperty(b,"left",window.propStore.left,.3,"easeinout"),a.setElementProperty(b,"top",window.propStore.top,.3,"easeinout"),a.setElementProperty(b,"rotateZ",window.propStore.rotateZ,.3,"easeinout"),a.setElementProperty(b,"scaleX",window.propStore.scaleX,.3,"easeinout"),a.setElementProperty(b,"scaleY",window.propStore.scaleY,.3,"easeinout"),a.setElementProperty(b,"opacity",window.propStore.opacity,.3,"easeinout"),a.setElementProperty(b,"width",window.propStore.width,.3,"easeinout"),a.setElementProperty(b,"height",window.propStore.height,.3,"easeinout"),a.setElementProperty(b,"z-index",window.propStore.zindex)},a.currentSceneElement=function(){return document.querySelector("#"+this.documentId()+' > .HYPE_scene[style*="block"]')},!0}"HYPE_eventListeners"in window==!1&&(window.HYPE_eventListeners=Array()),window.HYPE_eventListeners.push({type:"HypeDocumentLoad",callback:extendHype});