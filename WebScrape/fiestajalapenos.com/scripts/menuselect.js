var menuselect=function(){var sectionIdsArr=[],sectionTitlesArr=[],sectDisplayed,UNDEF="undefined",doc=document;var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF&&typeof doc.appendChild!=UNDEF&&typeof doc.insertBefore!=UNDEF&&typeof doc.removeChild!=UNDEF;if((navigator.userAgent.toLowerCase().indexOf("msie 5")>0)&&(navigator.userAgent.toLowerCase().indexOf("mac")>0)){w3cdom=false}if(w3cdom){if(doc.addEventListener){doc.addEventListener("DOMContentLoaded",buildList,false);
/*@cc_on @*/
/*@if (@_win32) 
				doc.write("<scr" + "ipt id=__ie_onload defer src=//:><\/scr" + "ipt>"); 
				var script = doc.getElementById("__ie_onload"); 
				if ( script ) {
					script.onreadystatechange = function() { 
						if( this.readyState == "complete" ) { 
							this.parentNode.removeChild(this);
							buildList(); // call the onload handler 
						} 
					}; 
				}
		/*@end @*/
}if(/KHTML|WebKit/i.test(navigator.userAgent)){var _timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){buildList()}},10)}var oldOnload=window.onload;if(typeof window.onload!="function"){window.onload=buildList}else{window.onload=function(){if(oldOnload){oldOnload()}buildList()}}}else{return }function showSection(sectId){doc.getElementById(sectId).style.display="block"}function hideSection(sectId){doc.getElementById(sectId).style.display="none"}function showAll(){for(var i=0;i<sectionIdsArr.length;i++){showSection(sectionIdsArr[i])}}function init(){for(var i=1;i<sectionIdsArr.length;i++){hideSection(sectionIdsArr[i])}sectDisplayed=sectionIdsArr[0]}function switchSection(){var selector=doc.getElementById("menu_sel");var selection=selector.selectedIndex;var sectId=selector.options[selection].value;if(sectDisplayed=="all"){for(var i=0;i<sectionIdsArr.length;i++){if(sectionIdsArr[i]!=sectId){hideSection(sectionIdsArr[i])}}}else{hideSection(sectDisplayed);if(sectId=="all"){showAll()}else{showSection(sectId)}}sectDisplayed=sectId}function buildList(){if(arguments.callee.done){return }arguments.callee.done=true;if(_timer){clearInterval(_timer);_timer=null}var searchClass=new RegExp("\\bsubmenu\\b");var divs=doc.getElementsByTagName("div");for(var i=0;i<divs.length;i++){var classes=divs[i].className;if(searchClass.test(classes)){sectionIdsArr[sectionIdsArr.length]=divs[i].id;sectionTitlesArr[sectionTitlesArr.length]=divs[i].title}}var menuForm=doc.createElement("form");var menuLabel=doc.createElement("label");menuLabel.id="sel_label";menuLabel.htmlFor="menu_sel";var labelText=doc.createTextNode("Select a menu to view: ");menuLabel.appendChild(labelText);menuForm.appendChild(menuLabel);var menuSelect=doc.createElement("select");menuSelect.id="menu_sel";if(menuSelect.addEventListener){menuSelect.addEventListener("change",switchSection,false)}else{if(menuSelect.attachEvent){menuSelect.attachEvent("onchange",switchSection)}else{menuSelect.onchange=switchSection}}var opt;var optText;for(i=0;i<sectionIdsArr.length;i++){opt=doc.createElement("option");opt.value=sectionIdsArr[i];optText=doc.createTextNode(sectionTitlesArr[i]);opt.appendChild(optText);menuSelect.appendChild(opt)}opt=doc.createElement("option");opt.value="all";optText=doc.createTextNode("Show All");opt.appendChild(optText);menuSelect.appendChild(opt);sectDisplayed=doc.getElementById(sectionIdsArr[0]);menuForm.appendChild(menuSelect);var firstMenu=doc.getElementById(sectionIdsArr[0]);firstMenu.parentNode.insertBefore(menuForm,firstMenu);init()}}();