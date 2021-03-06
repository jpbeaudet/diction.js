// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//
// This script will be the command library



function _dash(transcript,index){
	  index.docA = index.docA+ ' -';
	  docA_span.innerHTML = index.docA+ ' -';
	  return Istrue("-", index);
}

function _backslash(transcript,index){
	  index.docA = index.docA+ '\\';
	  docA_span.innerHTML = index.docA+ '\\';		  
	  return Istrue("\\", index);
}

function _comma(transcript,index){
	  index.docA += ' ,';
	  docA_span.innerHTML = index.docA+ ' ,';
	  return Istrue(",", index);
}

function _space(transcript,index){
	  docA_span.innerHTML = index.docA+ '&nbsp;';
	  index.docA = index.docA+ '&nbsp;';
	  return Istrue("Space", index);
}

function _tab(transcript,index){
	  docA_span.innerHTML = index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
	  index.docA =  index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
	  return Istrue("Tab", index);
}

function _enter(transcript,index){
	  docA_span.innerHTML = index.docA+ ' <div><br /></div> ';
	  index.docA = index.docA+ ' <div><br /></div> ';
	  return Istrue("Enter", index);
}

function _colon(transcript,index){
	  docA_span.innerHTML = index.docA+ ': ';
	  index.docA = index.docA+ ': ';
	  return Istrue("Colon", index);
}

function _semicolon(transcript,index){
	  docA_span.innerHTML = index.docA+ '; ';
	  index.docA = index.docA+ '; ';
	  return Istrue("Semicolon", index);
}

function _doublequote(transcript,index){
	  docA_span.innerHTML = index.docA+ ' "';
	  index.docA = index.docA+ ' "';
	  return Istrue("Double Quote", index);
}

function _quote(transcript,index){
	  docA_span.innerHTML = index.docA+ ' &lsquo;';
	  index.docA = index.docA+ ' &lsquo;';
	  return Istrue("Quote", index);
}

function _plus(transcript,index){
	  docA_span.innerHTML = index.docA+ ' +';
	  index.docA = index.docA+ ' +';
	  return Istrue("+", index);
}

function _minus(transcript,index){
	  docA_span.innerHTML = index.docA+ ' -';
	  index.docA = index.docA+ ' -';
	  return Istrue("-", index);
}

function _equal(transcript,index){
	  docA_span.innerHTML = index.docA+ ' =';
	  index.docA =  index.docA+ ' =';
	  return Istrue("=", index);
}

function _and(transcript,index){
	  docA_span.innerHTML = index.docA+ ' &';
	  index.docA = index.docA+ ' &';
	  return Istrue("&", index);
}

function _dollar(transcript,index){
	  docA_span.innerHTML = index.docA+ ' $';
	  index.docA = index.docA+ ' $';
	  return Istrue("$", index);
}

function _numbersign(transcript,index){
	  docA_span.innerHTML = index.docA+ ' #';
	  index.docA = index.docA+ ' #';
	  return Istrue("#", index);
}

function _at(transcript,index){
	  docA_span.innerHTML = index.docA+ ' @';
	  index.docA = index.docA+ ' @';
	  return Istrue("@", index);
}

function _exclamation(transcript,index){
	  docA_span.innerHTML = index.docA+ ' !';
	  index.docA = index.docA+ ' !';
	  return Istrue("!", index);
}

function _question(transcript,index){
	  docA_span.innerHTML = index.docA+ ' ?';
	  index.docA = index.docA+ ' ?';
	  return Istrue("?", index);
}

function _bar(transcript,index){
	  docA_span.innerHTML = index.docA+ ' |';
	  index.docA = index.docA+ ' |';
	  return Istrue("|", index);
}

function _openparenthesis(transcript,index){
	  docA_span.innerHTML = index.docA+ '(';
	  index.docA = index.docA+ '(';
	  return Istrue("Open Parenthesis", index);
}

function _openquote(transcript,index){
	  docA_span.innerHTML = index.docA+ ' &lsquo;';
	  index.docA = index.docA+ ' &lsquo;';
	  return Istrue("Open Quote", index);
}

function _openbracket(transcript,index){
	  docA_span.innerHTML = index.docA+ '{';
	  index.docA = index.docA+ '{';
	  return Istrue("Open Bracket", index);
}

function _opensquarebracket(transcript,index){
	  docA_span.innerHTML = index.docA+ '[';
	  index.docA = index.docA+ '[';
	  return Istrue("Open Square Bracket", index);
}

function _closeparenthesis(transcript,index){
	  docA_span.innerHTML = index.docA+ ')';
	  index.docA = index.docA+ ')';
	  return Istrue("Close Parenthesis", index);
}

function _closequote(transcript,index){
	  docA_span.innerHTML = index.docA+ ' &rsquo;';
	  index.docA = index.docA+ ' &rsquo;';
	  return Istrue("Close Quote", index);
}

function _closebracket(transcript,index){
	  docA_span.innerHTML = index.docA+ '}';
	  index.docA = index.docA+ '}';
	  return Istrue("Close Bracket", index);
}

function _closesquarebracket(transcript,index){
	  docA_span.innerHTML = index.docA+ ']';
	  index.docA = index.docA+ ']';
	  return Istrue("Close Square Bracket", index);
}

function _gorigth(transcript,index){
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

function _goback(transcript,index){
	  var word = index.docA.split(" ");
	  console.log("word = "+ word);
	  var n = Number(word.length );
	  console.log("n = "+ n);
	  
	  n = (n -1);
	  word.splice(n,1);
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  index.docB = word[n-1]+ " "+ index.docB +  " ";
	  console.log("word[n-1] = "+ word[n-1]);
	  index.docA = index.docA.replace(/  /g," ");
	  index.docA = index.docA.replace(word[n-1],"");

	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Go back", index);
}

function _gobacksentence(transcript,index){
	  var word = index.docA.split(".");
	  console.log("word = "+ word);
	  var n = Number(word.length );
	  console.log("n = "+ n);
	  
	  n = (n -1);
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word[n-1] = "+ word[n-1]);
	  console.log("word[n] = "+ word[n]);
	  if(word[n]== ""){n= (n-1);}
	  index.docB = word[n]+ ". "+ index.docB +  " ";
	  var toDelete = word[n].split(" ");
	  index.docA = index.docA.replace(".","");
	  for( x in toDelete ){
		  index.docA = index.docA.replace(toDelete[x],""); 
		  index.docA = index.docA.replace(/  /g," ");
	  }
	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Go back sentence", index);
}

function _deleterigth(transcript,index){
	  var word = index.docB.split(" ");
	 
	  word.splice(0,1);
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word = "+ word);
	  console.log("word[0] = "+ word[0]);
	  index.docB = index.docB.replace(/  /g," ");
	  index.docB = index.docB.replace(word[0],"");

	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Delete rigth", index);
}

function _deleterigthsentence(transcript,index){
	  var word = index.docB.split(".");				 				 
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word = "+ word);
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
	  return Istrue("Delete forward sentence", index);
}

function _deleteback(transcript,index){
	  var word = index.docA.split(" ");
	  console.log("word = "+ word);
	  var n = Number(word.length );
	  console.log("n = "+ n);
	  
	  n = (n -1);
	  word.splice(n,1);
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  if(word[n-1]== ""){word.splice(n-1,1);n = (n-1);}
	  console.log("word[n-1] = "+ word[n-1]);
	  index.docA = index.docA.replace(/  /g," ");
	  index.docA = index.docA.replace(word[n-1],"");

	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Delete", index);
}

function _deletebacksentence(transcript,index){
	  var word = index.docA.split(".");
	  console.log("word = "+ word);
	  var n = Number(word.length );
	  console.log("n = "+ n);
	  
	  n = (n -1);
	  if(word[0]== ""){word.splice(0,1);}
	  if(word[0]== ""){word.splice(0,1);}
	  console.log("word[n-1] = "+ word[n-1]);
	  console.log("word[n] = "+ word[n]);
	  if(word[n]== ""){n= (n-1);}
	  var toDelete = word[n].split(" ");
	  index.docA = index.docA.replace(".","");
	  for( x in toDelete ){
		  index.docA = index.docA.replace(toDelete[x],""); 
		  index.docA = index.docA.replace(/  /g," ");
	  }
	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue("Delete last sentence", index);
}

function _cancel(transcript,index){
	  docA_span.innerHTML = "";
	  docB_span.innerHTML = "";		  
	  docA_span.innerHTML = index.LastdocA;
	  docB_span.innerHTML = index.LastdocB;
	  index.docA = index.LastdocA;
	  index.docB = index.LastdocB;
	  return Istrue('Cancel', index);
}

function _top(transcript,index){
	  index.docB = index.docA + index.docB;
	  index.docA ="";
	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue('Top', index);
}

function _bottom(transcript,index){
	  index.docA = index.docA + index.docB;
	  index.docB ="";	
	  icon_span.innerHTML = "-->";
	  docA_span.innerHTML = index.docA;
	  docB_span.innerHTML = index.docB;
	  return Istrue('Bottom', index);
}

function _yes(transcript,index){
		 // $('#confirmOverlay').find('#confirmBox').find('#confirmButtons').find('.button grey').click();
		  $("#confirmButtons).find(.button grey").click();
		  return Istrue('Yes', index);
}

function _no(transcript,index){
	  //$('#confirmOverlay').find('#confirmBox').find('#confirmButtons').find('.button blue').click();
	  $("#confirmButtons).find(.button blue").click();
	  return Istrue('No', index);
}

function _newtitle(transcript,index){
	  transcript = transcript.replace("new","");
	  transcript = transcript.replace("title","");
	title_span.innerHTML = '<h1>'+transcript+ '</h1>';
	index.title = transcript;
	return Istrue('New title'+ '"'+ transcript+'"', index);	
}