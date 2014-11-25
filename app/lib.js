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

function _space(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '&nbsp;';
	  index.docA = index.docA+ '&nbsp;';
	  return Istrue("Space", index);
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

function _colon(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ': ';
	  index.docA = index.docA+ ': ';
	  return Istrue("Colon", index);
}

function _semicolon(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '; ';
	  index.docA = index.docA+ '; ';
	  return Istrue("Semicolon", index);
}

function _doublequote(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' "';
	  index.docA = index.docA+ ' "';
	  return Istrue("Double Quote", index);
}

function _quote(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' &lsquo;';
	  index.docA = index.docA+ ' &lsquo;';
	  return Istrue("Quote", index);
}

function _plus(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' +';
	  index.docA = index.docA+ ' +';
	  return Istrue("+", index);
}

function _minus(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' -';
	  index.docA = index.docA+ ' -';
	  return Istrue("-", index);
}

function _equal(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' =';
	  index.docA =  index.docA+ ' =';
	  return Istrue("=", index);
}

function _and(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' &';
	  index.docA = index.docA+ ' &';
	  return Istrue("&", index);
}

function _dollar(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' $';
	  index.docA = index.docA+ ' $';
	  return Istrue("$", index);
}

function _numbersign(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' #';
	  index.docA = index.docA+ ' #';
	  return Istrue("#", index);
}

function _at(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' @';
	  index.docA = index.docA+ ' @';
	  return Istrue("@", index);
}

function _exclamation(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' !';
	  index.docA = index.docA+ ' !';
	  return Istrue("!", index);
}

function _question(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' ?';
	  index.docA = index.docA+ ' ?';
	  return Istrue("?", index);
}

function _bar(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' |';
	  index.docA = index.docA+ ' |';
	  return Istrue("|", index);
}

function _openparenthesis(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '(';
	  index.docA = index.docA+ '(';
	  return Istrue("Open Parenthesis", index);
}

function _openquote(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' &lsquo;';
	  index.docA = index.docA+ ' &lsquo;';
	  return Istrue("Open Quote", index);
}

function _openbracket(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '{';
	  index.docA = index.docA+ '{';
	  return Istrue("Open Bracket", index);
}

function _opensquarebracket(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '[';
	  index.docA = index.docA+ '[';
	  return Istrue("Open Square Bracket", index);
}

function _closeparenthesis(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ')';
	  index.docA = index.docA+ ')';
	  return Istrue("Close Parenthesis", index);
}

function _closequote(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ' &rsquo;';
	  index.docA = index.docA+ ' &rsquo;';
	  return Istrue("Close Quote", index);
}

function _closebracket(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ '}';
	  index.docA = index.docA+ '}';
	  return Istrue("Close Bracket", index);
}

function _closesquarebracket(transcript,index){
	  $("#final_span").css("color", "pink");
	  docA_span.innerHTML = index.docA+ ']';
	  index.docA = index.docA+ ']';
	  return Istrue("Close Square Bracket", index);
}

function _gorigth(transcript,index){
	  $("#final_span").css("color", "pink");
	  var word = index.docB.split(" ");
	 
	  word.splice(0,1);
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word = "+ word);
	  index.docA = index.docA + word[0]+ " ";
	  console.log("word[0] = "+ word[0]);
	  index.docB = index.docB.replace(/  /g," ");
	  index.docB = index.docB.replace(word[0],"");

	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Go forward", index);
}

function _gorigthsentence(transcript,index){
	  $("#final_span").css("color", "pink");
	  var word = index.docB.split(".");
	 
	 // word.splice(0,1);				 
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word = "+ word);
	  index.docA = index.docA + word[0]+ ". ";
	  console.log("word[0] = "+ word[0]);
	  var toDelete = word[0].split(" ");
	  index.docB = index.docB.replace(".","");
	  for( x in toDelete ){
		  index.docB = index.docB.replace(toDelete[x],""); 
		  index.docB = index.docB.replace(/  /g," ");
	  }

	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Go forward sentence", index);
}