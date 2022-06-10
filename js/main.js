function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function checkLogin() {
	var is_logged_in = readCookie('is_logged_in');
	
	if ((typeof is_login_page == 'undefined' || is_login_page !== true) && is_logged_in !== "true") {
		window.location = 'index.html';
	}
	//localStorage.clear();
}

// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};


jQuery(document).ready(function() {
	jQuery('#login-btn').click(function() {
		var username = jQuery('#username').val();
		var password = jQuery('#password').val();
		
		var auth_key = Base64.encode(username + ':' + password);
		
		jQuery.get('auth.txt', function(data) {
			if (data == auth_key) {
				createCookie('is_logged_in', "true", 1);
				window.location = 'indexauth.html';
			} else {
				jQuery('#message').html('Authentication Failed');
			}
		});
	});
	
	jQuery('#logout-btn').click(function() {
		eraseCookie('is_logged_in');
		window.location = 'index.html';
		localStorage.clear();
	});
});
	
checkLogin();


var PHVCom = 40;
var PHCom = 30;
var PHMed = 20;
var PHSim = 10;
var PHVCom = 40;
var PHCom = 30;
var Med = 20;
var Sim = 10;

function getComplexityTotal(complexity){
	var complexity =document.getElementsByName(complexity);
	var complexityValue = 0;
	for (i = 0; i < complexity.length; i++) {
	  complexityValue += Number(complexity[i].value);
	  
	}
	return complexityValue;
}

function getStorageValue(localVal){
	//alert(localVal); 
	if (localStorage.getItem(localVal) === null){
		localStorage.setItem(localVal, 0);
	}
	var localValVCom = getComplexityTotal('verycomplex');
	var localValCom = getComplexityTotal('complex');
	var localValMed = getComplexityTotal('medium');
	var localValSim = getComplexityTotal('simple');
	localStorage.setItem(localVal+'VCom', localValVCom);
	localStorage.setItem(localVal+'Com', localValCom);
	localStorage.setItem(localVal+'Med', localValMed);
	localStorage.setItem(localVal+'Sim', localValSim);
	localStorage.setItem(localVal, (localValVCom +localValCom  +localValMed +localValSim));
	localStorage.setItem(localVal+'Total', (localValVCom*40 +localValCom *30 +localValMed*20+localValSim *10));
}	

	
	

function setTableComplexity(tablename){

var table = document.getElementById(tablename);
//var txt= ""
var totalRows = table.rows.length;
			for (i = 2; i < totalRows; i++) {
						 //cel1count = table.rows[i].cells.length;

						if( table.rows[i].cells[2] && table.rows[i].cells[2].textContent!='' &&  table.rows[i].cells[2].textContent.trim()!='NA'){
						 table.rows[i].cells[2].innerHTML = table.rows[i].cells[2].innerHTML +"</br>"+ addDropdown('verycomplex');
						}
						if( table.rows[i].cells[3] && table.rows[i].cells[3].textContent!='' &&  table.rows[i].cells[3].textContent.trim()!='NA'){
						 table.rows[i].cells[3].innerHTML = table.rows[i].cells[3].innerHTML+"</br>"+addDropdown('complex');
						}
						if( table.rows[i].cells[4] && table.rows[i].cells[4].textContent!='' &&  table.rows[i].cells[4].textContent.trim()!='NA'){
						 table.rows[i].cells[4].innerHTML = table.rows[i].cells[4].innerHTML+"</br>"+addDropdown('medium');
						}
						if( table.rows[i].cells[5] && table.rows[i].cells[5].textContent!='' &&  table.rows[i].cells[5].textContent.trim()!='NA'){
						 table.rows[i].cells[5].innerHTML = table.rows[i].cells[5].innerHTML+"</br>"+addDropdown('simple');
						}						
			}
//alert(txt);			
}

// This is used in Development task
var development = ["platform", "cms", "analytics","integration"];
var development_name = ["Platform Setup", "CMS", "Analytics","Integration"];

function getStorageValueDev(localVal){
	//alert(localVal);
 //var platform,cms,analytics,integration;
 
 
 var arrayLength = development.length;
	for (var i = 0; i < arrayLength; i++) {
		if (localStorage.getItem(localVal+development[i]) === null){
			localStorage.setItem(localVal+development[i], 0);
		}
		var localValVCom = getComplexityTotal(development[i]+'_verycomplex');
		var localValCom = getComplexityTotal(development[i]+'_complex');
		var localValMed = getComplexityTotal(development[i]+'_medium');
		var localValSim = getComplexityTotal(development[i]+'_simple');
		localStorage.setItem(localVal+development[i]+'VCom', localValVCom);
	    localStorage.setItem(localVal+development[i]+'Com', localValCom);
		localStorage.setItem(localVal+development[i]+'Med', localValMed);
		localStorage.setItem(localVal+development[i]+'Sim', localValSim);
		localStorage.setItem(localVal+development[i]+'Total', (localValVCom*40 +localValCom *30 +localValMed*20+localValSim *10));
	}

    setDevlopmentComplexityTotal(localVal);
}

function setDevlopmentComplexityTotal(localVal){
var table = document.getElementById("mytable");
for (var i = 0; i < development.length; i++) {
	if(document.getElementById(development[i])){
	 var rowIndex = document.getElementById(development[i]).rowIndex;
	 table.rows[rowIndex].cells[1].innerHTML =localStorage.getItem(localVal+ development[i]+'VCom');	
	 table.rows[rowIndex].cells[2].innerHTML =localStorage.getItem(localVal+ development[i]+'Com');	
	 table.rows[rowIndex].cells[3].innerHTML =localStorage.getItem(localVal+ development[i]+'Med');	
	 table.rows[rowIndex].cells[4].innerHTML =localStorage.getItem(localVal+ development[i]+'Sim');	

	}
}	
}

function setTableComplexityDev (tablename){
//alert("hi");
var table = document.getElementById(tablename);
//var txt= ""
var totalRows = table.rows.length;

var platform_rows_start = 2;
var platform_rows_end = 15;

var cms_rows_start = platform_rows_end+3;
var cms_rows_end = cms_rows_start +21;

var analytics_rows_start = cms_rows_end +3;
var analytics_rows_end = analytics_rows_start +13;

var integration_rows_start = analytics_rows_end+3;
var integration_rows_end = integration_rows_start+2;

insertDevlopmentComplexity(table,platform_rows_start, platform_rows_end, 'platform_');		
insertDevlopmentComplexity(table,cms_rows_start, cms_rows_end, 'cms_');			
insertDevlopmentComplexity(table,analytics_rows_start, analytics_rows_end, 'analytics_');		
insertDevlopmentComplexity(table,integration_rows_start, integration_rows_end, 'integration_');			
			
			
}

function insertDevlopmentComplexity(table,start, end, complexity_key){
	//alert(start+" ||| "+end +"||||"+complexity_key);
	for (i = start; i < end; i++) {
						 //cel1count = table.rows[i].cells.length;
						if( table.rows[i].cells[2] && table.rows[i].cells[2].textContent!='' &&  table.rows[i].cells[2].textContent.trim()!="NA"){
						 table.rows[i].cells[2].innerHTML = table.rows[i].cells[2].innerHTML +"</br>"+ addDropdown(complexity_key+'verycomplex');
						}
						if( table.rows[i].cells[3] && table.rows[i].cells[3].textContent!='' && table.rows[i].cells[3].textContent.trim()!='NA'){
						 table.rows[i].cells[3].innerHTML = table.rows[i].cells[3].innerHTML+"</br>"+addDropdown(complexity_key+'complex');
						}
						if( table.rows[i].cells[4] && table.rows[i].cells[4].textContent!='' && table.rows[i].cells[4].textContent.trim()!='NA'){
						 table.rows[i].cells[4].innerHTML = table.rows[i].cells[4].innerHTML+"</br>"+addDropdown(complexity_key+'medium');
						}
						if( table.rows[i].cells[5] && table.rows[i].cells[5].textContent!='' && table.rows[i].cells[5].textContent.trim()!='NA'){
						 table.rows[i].cells[5].innerHTML = table.rows[i].cells[5].innerHTML+"</br>"+addDropdown(complexity_key+'simple');
						}										
			}	
	
}

function addDropdown(select,text){

var dropdown ="";
for (j =0; j<= 10; j++){
dropdown = dropdown + "\n<option>" +j+ "</option>";
}
//var selectBox = "<select name="+select+">" +dropdown+ "</select>";

//alert (selectBox);
//return selectBox;
//type="text" id="fname" name="fname"
var inputBox = "<input  type='text' onkeypress='return onlyNumberKey(event)' maxlength='3' name="+select+" />";

return inputBox;
}

function onlyNumberKey(evt) { 
          
        // Only ASCII charactar in that range allowed 
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
            return false; 
        return true; 
    } 	