// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//
// This script will be the command library



function _dash(transcript,index){
	  $("#final_span").css("color", "pink");
	  index.docA = index.docA+ ' -';
	  docA_span.innerHTML = index.docA+ ' -';
	  return Istrue("-", index);
}

function _backslash(transcript,index){
	  $("#final_span").css("color", "pink");
	  index.docA = index.docA+ '\\';
	  docA_span.innerHTML = index.docA+ '\\';		  
	  return Istrue("\\", index);
}

function _comma(transcript,index){
	  $("#final_span").css("color", "pink");
	  index.docA += ' ,';
	  docA_span.innerHTML = index.docA+ ' ,';
	  return Istrue(",", index);
}
function _tab(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
	  index.docA =  index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
	  return Istrue("Tab", index);
}

function _enter(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' <div><br /></div> ';
	  index.docA = index.docA+ ' <div><br /></div> ';
	  return Istrue("Enter", index);
}