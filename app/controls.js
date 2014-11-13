// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//
//here i will place all verbal controls command from the user.
//
// The function will either return true,false or null
// true = is a command, the command is executed and transcript will be erased and not added to doc
// false= this is not a command, proceed with the rest of speech.js
// null = there was an error , erase transcript
//
// when true the function will also execute the related command (callback)
// the function handling the interim, the final ,doc and mode html will be placed after the controls function.
//var Data= new Object();

//var socket = io.connect('https://54.68.32.250:3000');
var _USERNAME;
var socket = io.connect('https://54.68.32.250:3000', {'force new connection': true});
window.onload = function()
{
	socket.emit("load", "load -------------------------------->");	
	socket.on("res.load", function(response){
		var docA =response[0];
		var docB =response[1];
		_USERNAME =response[2];
		icon_span.innerHTML = "-->";
		docA_span.innerHTML = docA;
	    docB_span.innerHTML = docB;	
	    restart();
});
};

	function controls (transcript) {		
		var index;		
	   console.log("controls() fired");;	
	  // start by building the index object which will contain all relevant info 
	

	  socket.emit("request", "test -------------------------------->");
	   //socket.to(_USERNAME).emit("request", "test -------------------------------->");
	  socket.on("response", function(response){
		  console.log("response fired");
		  $("#final_span").css("color", "grey");
		  var docA = response[0];
		  var docB = response[1];
		  var LastdocA = response[2];
		  var LastdocB = response[3];
		  console.log('lastsaveA arrival= '+LastdocA);
		  console.log('lastsaveB arrival = '+LastdocB);
		  if(transcript == "\n"){
			  transcript = "<div><br \></div>";
		  }
		  index = new MyData (docA,docB,transcript,LastdocA,LastdocB);
		  lines_span.innerHTML = "Lines: "+ index.lines;
		  words_span.innerHTML = " Words: "+ index.wordsTotal;
		  console.log('lastsaveA = '+index.LastdocA);
		  console.log('lastsaveB = '+index.LastdocB);
		  return command(transcript,index);
		  
	  });
	
		return true;
	
	}//end of controls	
	
	function command (transcript, index) {  
	  console.log("command() fired");
	  var numWords = index.request.num;
	  
	
	  console.log("memory A in start of command = "+ index.docA );
	  console.log("memory B in start of command  = "+ index.docB );
	  if( numWords < 4){
	  console.log("words is less than 4 ");
	  var request = index.request;
	  }else{
		  var request = ["",""];
	  }
	  // Sometime googleSpeechApi return the first element of the array as undefined or empty. 
	  if( request[0] == undefined){
		  request.splice(0,1);
		  }
		  if( request[0] == ''){
			  request.splice(0,1);
		  }

	 console.log("request = " + request);
	 console.log("request[0] = " + request[0]);
	 console.log("request[1] = " + request[1]);
	 console.log("request [2] = " + request[2]);
		  
	 var Fword = request[0];
	 var Sword = request[1];
	 var Tword = request[2];
	 

		
	// Here will go the actual command. There will be three section handling : movement, characters and edition mode	// 
	// If its a command , it will execute the command and sent the transcript, index and command event number to IsTrue. 
	//Else it send index and transcript directly to	IsFalse
	//Command will modify the index object for further if needed (ex pretext aftext)
	// 65 commands function to built
		 
	//------------------------------------------------------------------------------------------------------------------------------- 

	 switch(Fword)
	 { 	 	  
	  // character section 		//
	  // ------------------------------------
	 
	 //Dots
	 //case 'what': 
		  
		 //switch(Sword)
		 //{
		 //case 'is':
			  
			// switch(Tword)
			// {
			 
			// case 'this':
			//	 $("#final_span").css("color", "pink");		
				 
			//	 return Istrue('what is this', index);
			//	  break;
				  
			// case '1Bb':
				 
			//	 return Istrue('2', index);
			//	  break;
				  
			//	  default:
				//	  return Isfalse(transcript, index); 
			// }
			 
			//  break;
			  
		// case '1B':	
			 
			// return Istrue('1B', index);
			 // break;
			  
			 // default:
				   
				//  return Isfalse(transcript, index);
		// }
		  
		 // break;
		  
	// Dash -
	//-----------------------------------	  
	 case 'dash': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA = index.docA+ ' -';
		  docA_span.innerHTML = index.docA+ ' -';
		  return Istrue("-", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 		  
	//backlash \	  
	//------------------------------------------	  
	 case 'backslash': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA = index.docA+ '\\';
		  docA_span.innerHTML = index.docA+ '\\';		  
		  return Istrue("\\", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 	
		 
	 case 'backlash': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA += ' \\';
		  docA_span.innerHTML = index.docA+ ' \\';
		  return Istrue(" \\", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 			 
    // comma ,
		 
	 case 'comma': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA += ' ,';
		  docA_span.innerHTML = index.docA+ ' ,';
		  return Istrue(",", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	
	 case 'coma': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' ,';
		  index.docA = index.docA+ ' ,';
		  return Istrue(",", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
    // space 
	 case 'space': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ '&nbsp;';
		  index.docA = index.docA+ '&nbsp;';
		  return Istrue("Space", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		
		 
	//tab	
	 case 'tab': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
		  index.docA =  index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
		  return Istrue("Tab", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	 case 'tad': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
		  index.docA = index.docA+ '&nbsp;&nbsp;&nbsp;&nbsp;';
		  return Istrue("Tab", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }					 
    // enter & newline 
		 
	 case 'Enter': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' <div><br /></div> ';
		  index.docA = index.docA+ ' <div><br /></div> ';
		  return Istrue("Enter", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'return': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' <div><br /></div> ';
		  index.docA = index.docA+ ' <div><br /></div> ';
		  return Istrue("Enter", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
	// caps (only next)
	// :
	 case 'colon': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ': ';
		  index.docA = index.docA+ ': ';
		  return Istrue("Colon", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
    //;
	 case 'semicolon': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ '; ';
		  index.docA = index.docA+ '; ';
		  return Istrue("Semicolon", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	
		 
	// " 
	 case 'double': 
		 switch(Sword)
		 {
		 case 'quote':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' "';
				  index.docA = index.docA+ ' "';
				  return Istrue("Double Quote", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }

		  default:
			  return Isfalse(transcript, index);   
	 }
	// '
	 case 'quote': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' &lsquo;';
		  index.docA = index.docA+ ' &lsquo;';
		  return Istrue("Quote", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
		  
	// +
	 case 'plus': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' +';
		  index.docA = index.docA+ ' +';
		  return Istrue("+", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'Plus': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' +';
		  index.docA = index.docA+ ' +';
		  return Istrue("+", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 		 
    // -
	 case 'minus': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' -';
		  index.docA = index.docA+ ' -';
		  return Istrue("-", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// =
	 case 'equal': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' =';
		  index.docA =  index.docA+ ' =';
		  return Istrue("=", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
    
	// &
	 case 'and': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' &';
		  index.docA = index.docA+ ' &';
		  return Istrue("&", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'end': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' &';
		  index.docA = index.docA+ ' &';
		  return Istrue("&", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	// $		 
	 case 'dollar': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' $';
		  index.docA = index.docA+ ' $';
		  return Istrue("$", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	

	// #
	 case 'number': 
		 switch(Sword)
		 {
		 case 'sign':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' #';
				  index.docA = index.docA+ ' #';
				  return Istrue("#", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }

		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// @
	 case 'at': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' @';
		  index.docA = index.docA+ ' @';
		  return Istrue("@", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'hat': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' @';
		  index.docA = index.docA+ ' @';
		  return Istrue("@", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'app': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' @';
		  index.docA = index.docA+ ' @';
		  return Istrue("@", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// !
	 case 'exclamation': 
		 switch(Sword)
		 {
		 case 'mark':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' !';
				  index.docA = index.docA+ ' !';
				  return Istrue("!", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }

		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// ?
	 case 'question': 
		 switch(Sword)
		 {
		 case 'mark':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' ?';
				  index.docA = index.docA+ ' ?';
				  return Istrue("?", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }

		  default:
			  return Isfalse(transcript, index);   
	 }			 
	// <
	// >
	// ~
	// |
	 
	 case 'bar': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  docA_span.innerHTML = index.docA+ ' |';
		  index.docA = index.docA+ ' |';
		  return Istrue("|", index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		// %		 
		// *	 
	// (
	// Open section
   //-------------------------------------------------		 
	 case 'open': 
		 switch(Sword)
		 {
		 case 'parenthesis':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ '(';
				  index.docA = index.docA+ '(';
				  return Istrue("Open Parenthesis", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }
		 case 'quote':
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' &lsquo;';
				  index.docA = index.docA+ ' &lsquo;';
				  return Istrue("Open Quote", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 } 
	//{
		 case 'bracket':
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ '{';
				  index.docA = index.docA+ '{';
				  return Istrue("Open Bracket", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 }
			//[
		 case 'square':
			 switch(Tword)
			 {
			 
			 case 'bracket':
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ '[';
				  index.docA = index.docA+ '[';
				  return Istrue("Open Square Bracket", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 }			 
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// )
	// Close section 
  //-------------------------------------------------			 
	 case 'close': 
		 switch(Sword)
		 {
		 case 'parenthesis':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ')';
				  index.docA = index.docA+ ')';
				  return Istrue("Close Parenthesis", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }
		 case 'quote':
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ' &rsquo;';
				  index.docA = index.docA+ ' &rsquo;';
				  return Istrue("Close Quote", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 } 
				//}			 
		 case 'bracket':
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ '}';
				  index.docA = index.docA+ '}';
				  return Istrue("Close Bracket", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 }
			 //]
		 case 'square':
			 switch(Tword)
			 {
			 
			 case 'bracket':
				  $("#final_span").css("color", "pink");
				  docA_span.innerHTML = index.docA+ ']';
				  index.docA = index.docA+ ']';
				  return Istrue("Close Square Bracket", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 }				 
		  default:
			  return Isfalse(transcript, index);   
	 }		 

	
 
		  
	 // Movement section				//
	 // ------------------------------------
    
	 case 'move': 
		 switch(Sword)
		 {
		 case 'right':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  var word = index.docB.split(" ");
				  console.log("word = "+ word);
				  word.splice(0,1);
				  if(word[0]== ""){word.splice(0,1);}
				  if(word[0]== ""){word.splice(0,1);}
				  if(word[0]== ""){word.splice(0,1);}
				  if(word[0]== ""){word.splice(0,1);}
				  index.docA = index.docA + word[0]+ " ";
				  console.log("word[0] = "+ word[0]);
				  index.docB = index.docB.replace(/  /g," ");
				  index.docB = index.docB.replace(word[0],"");

				  icon_span.innerHTML = "-->";
				  docA_span.innerHTML = index.docA;
				  docB_span.innerHTML = index.docB;
				  return Istrue("Move rigth", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }
		 case 'back':
			 switch(Tword)
			 {
			 
			 case undefined:
				  $("#final_span").css("color", "pink");
				  var word = index.docA.split(" ");
				  word.splice(0,1);
				  console.log("word = "+ word);
				  var n = (word.length -1);
				  console.log("n = "+ n);
				  word.splice(n,1);
				  
				  if(word[n]== ""){word.splice(n,1);}
				  if(word[n]== ""){word.splice(n,1);}
				  if(word[n]== ""){word.splice(n,1);}
				  if(word[n]== ""){word.splice(n,1);}
				  index.docB = index.docB + word[n]+ " ";
				  console.log("word[n] = "+ word[n]);
				  console.log("word[0] = "+ word[0]);
				  //index.docA = index.docB.replace(/  /g," ");
				  index.docA = index.docA.replace(word[n],"");

				  icon_span.innerHTML = "-->";
				  docA_span.innerHTML = index.docA;
				  docB_span.innerHTML = index.docB;
				  return Istrue("Move back", index);
				  break;
				  default:
					  return Isfalse(transcript, index); 
			 } 

		 case 'sentence':
			 switch(Tword)
			 {
			 
			 case 'left':
				  $("#final_span").css("color", "pink");
				
				  return Istrue("Close Square Bracket", index);
				  break;
				  
			 case 'right':
				  $("#final_span").css("color", "pink");
				
				  return Istrue("Close Square Bracket", index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }				 
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		 
		 
		 
		 
	// cancel
		  // 3 crtl-z like return
	//------------------------------------	 
	 case 'cancel': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");

		  docA_span.innerHTML = "";
		  docB_span.innerHTML = "";		  
		  docA_span.innerHTML = index.LastdocA;
		  docB_span.innerHTML = index.LastdocB;
		  index.docA = index.LastdocA;
		  index.docB = index.LastdocB;
		  return Istrue('Cancel', index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 
	 case 'cancelled': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");

		  docA_span.innerHTML = "";
		  docB_span.innerHTML = "";
		  docA_span.innerHTML = index.LastdocA;
		  docB_span.innerHTML = index.LastdocB;
		  index.docA = index.LastdocA;
		  index.docB = index.LastdocB;
		  return Istrue('Cancel', index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 
	 case 'Kenzo': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");

		  docA_span.innerHTML = "";
		  docB_span.innerHTML = "";
		  docA_span.innerHTML = index.LastdocA;
		  docB_span.innerHTML = index.LastdocB;
		  index.docA = index.LastdocA;
		  index.docB = index.LastdocB;
		  return Istrue('Cancel', index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 		 
	// top
	 case 'top': 
		 switch(Sword)
		 {
		 case undefined:
			 $("#final_span").css("color", "pink");
			  index.docB = index.docA + index.docB;
			  index.docA ="";
			  icon_span.innerHTML = "-->";
			  docA_span.innerHTML = index.docA;
			  docB_span.innerHTML = index.docB;
			  return Istrue('Top', index);
			  break;
			  
			  default:
				  return Isfalse(transcript, index);   
		 }
		 
	//bottom
		  
	 case 'bottom': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA = index.docA + index.docB;
		  index.docB ="";	
		  icon_span.innerHTML = "-->";
		  docA_span.innerHTML = index.docA;
		  docB_span.innerHTML = index.docB;
		  return Istrue('Bottom', index);
		  break;  
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
	 case 'Bodum': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  index.docA = index.docA + index.docB;
		  index.docB ="";	
		  icon_span.innerHTML = "-->";
		  docA_span.innerHTML = index.docA;
		  docB_span.innerHTML = index.docB;
		  return Istrue('Bottom', index);
		  break;  
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		 
	// back
		  // words
		  //sentence
		  //line
	// forward
		  //words
		  //sentence
		  //line


	// go to :
		  // line
		  // word
		  // sentence
		  
	// accept and refuse confirm box
		 
	 case 'yes': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		 // $('#confirmOverlay').find('#confirmBox').find('#confirmButtons').find('.button grey').click();
		  $("#confirmButtons).find(.button grey").click();
		  return Istrue('Yes', index);
		 
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	 
		 
	 case 'no': 
		 switch(Sword)
		 {
		 case undefined:
		  $("#final_span").css("color", "pink");
		  //$('#confirmOverlay').find('#confirmBox').find('#confirmButtons').find('.button blue').click();
		  $("#confirmButtons).find(.button blue").click();
		  return Istrue('No', index);
		 
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	
    //new text		  
	 case 'new':
		 switch(Sword)
		 {
		 case 'text':
			 switch(Tword)
			 {
			 case undefined:

             confirmNewText(index);
	
			 break;
			  default:
				  return Isfalse(transcript, index);   
		 }	 
	     default:
	     return Isfalse(transcript, index); 
		 }
	    
			  
	// Mode section						//
	// ------------------------------------		
		  
	// title
		  //1
		  //2
		  //3
		  //4
		  //5
		  
	case  '3':
		
		return Istrue('3', index);
		  break;
		  
	//select
		  //copy
		  //paste
		  //cut
    // bold
	// italic
	// underline
	// capital mode (caps Lock)	  
	// font
		  //size
		  //type
	//align 
		  //rigth
		  //left
		  //center
	// Quote
	// bullet
	// numerotation
		  // number
		  // letter
		  
		  
		  
		  
		  
		  
		  
	// final default to main switch	  
	default:		
		return Isfalse(transcript, index); 
	}//end of the main switch
	 
	 console.log("memory A in end of command = "+ index.docA );
	 console.log("memory B in end of command  = "+ index.docB );
	 
	}//end of commands()
	//
	//Here goes the istrue and isfalse that will emit to server last index modification for saving purposes//
	//It will also need to emit the data for the json thickback constructor
	//----------------------------------------------------------

function Istrue(data, index){
	console.log("istrue() fired");
	var pretext = index.docA;
	var afttext = index.docB;
    console.log("pretext command = "+ pretext);
    console.log("afttext command = "+ afttext);
	final_span.innerHTML = " @@@->  " + data + "  <-@@@ ";
	socket.emit("cmd", [ pretext , afttext]);
	//socket.to(_USERNAME).emit("cmd", [ pretext , afttext]);
	
	return true;

}
function Isfalse(data, index){
	console.log("isFalse() fired");
	var diction;
	var doc = data;
    if(diction != doc){ 
    var json = {event:'0',data:data};
    
    console.log("json in IsFalse = "+JSON.stringify(json));
    var pretext = index.docA;
  	var afttext = index.docB;	   
    console.log("pretext= "+ pretext);
    console.log("afttext= "+ afttext);

    docA_span.innerHTML = pretext + " " + doc + " ";
    docB_span.innerHTML = afttext + " ";
    pretext = pretext + " " + doc + " ";
    afttext = afttext + "";  
    final_span.innerHTML = " @@@->  " + doc + "  <-@@@ ";
  	diction = doc;  
       
	socket.emit("save", [data, pretext , afttext,json]);	
  	//socket.to(_USERNAME).emit("save", [data, pretext , afttext,json]);	
	return false;
    } 
   
}
 function confirmNewText(index)	{      
	
$.confirm({
    'title'		: 'Delete Confirmation',
    'message'	: 'You are about to delete your current text. <br />It cannot be restored at a later time! Continue?',
    'buttons'	: {
        'Yes'	: {
            'class'	: 'blue',
            'action': function(){
	 $("#final_span").css("color", "pink");	
 index.docA = "";
 index.docB ="";
 docA_span.innerHTML = "";
 docB_span.innerHTML = "";
 socket.emit('newtext',"new text----------------->>");
 location.reload(true);
            }
        },
        'No'	: {
            'class'	: 'gray',
            'action': function(){ location.reload(true);}	// Nothing to do in this case. You can as well omit the action property.
       
        }
    }
});	 	
	
}