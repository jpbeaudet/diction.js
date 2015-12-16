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
//var _USERNAME;


var socket = io.connect('https://54.68.32.250:3000', {'force new connection': true});
var _USERNAME;
var strUser;
var language = new Array();
var languageIndex = new Array();
language[0] = "en-EN";
languageIndex[0] = "English";
language[1] = "en-US";
languageIndex [1] = "English - United States";
language[2] = "en-CA";
languageIndex [2] = "English - Canada";
language[3] = "en-GB";
languageIndex [3] = "English - Great Britain";
language[4] = "en-AU";
languageIndex [4] = "English - Australia";
language[5] = "en-NZ";
languageIndex [5] = "English - New Zeeland";

window.onload = function()
{
	
	socket.emit("load", "load -------------------------------->");	
	socket.on("res.load", function(response){
		var docA =response[0];
		var docB =response[1];
		_USERNAME =response[2];
		var title = response[3];
		if( strUser== undefined){
			strUser = 0;
		}
   	    language_span.innerHTML = languageIndex[strUser];
		welcome_span.innerHTML = "Welcome "+ _USERNAME;
		title_span.innerHTML = "<h1>"+title+"</h1>";
		icon_span.innerHTML = "<img src='images/blinking-cursor.GIF', height='25'>";
		docA_span.innerHTML = docA;
	    docB_span.innerHTML = docB;	
		lines_span.innerHTML = "Lines: ";
		words_span.innerHTML = " Words: ";	    
	    restart();
});
};

	function controls (transcript) {		
		var index;		
	   console.log("controls() fired");;	
	  // start by building the index object which will contain all relevant info 
	

	  socket.emit("request", "test -------------------------------->");
	  // socket.to(_USERNAME).emit("request", "test -------------------------------->");
	  socket.on("response", function(response){
		  console.log("response fired");
		  //$("#final_span").css("color", "grey");
		  var docA = response[0];
		  var docB = response[1];
		  var LastdocA = response[2];
		  var LastdocB = response[3];
		  var title = response[4];
		  console.log('lastsaveA arrival= '+LastdocA);
		  console.log('lastsaveB arrival = '+LastdocB);
		  if(transcript == "\n"){
			  transcript = "<div><br \></div>";
		  }
		  index = new MyData (docA,docB,transcript,LastdocA,LastdocB,title);
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
		  
	// Dash -
	//-----------------------------------	  
	 case 'dash': 
		 switch(Sword)
		 {
		 case undefined:
		  return _dash(transcript,index);
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
			return _backslash(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 	
		 
	 case 'backlash': 
		 switch(Sword)
		 {
		 case undefined:
		 return _backslash(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 			 
    // comma ,
		 
	 case 'comma': 
		 switch(Sword)
		 {
		 case undefined:
		 return _comma(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	
	 case 'coma': 
		 switch(Sword)
		 {
		 case undefined:
		 return  _comma(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
    // space 
	 case 'space': 
		 switch(Sword)
		 {
		 case undefined:
			return _space(transcript,index)
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		
		    // clear all
	 case 'clear': 
		 switch(Sword)
		 {
		 case undefined:
			 confirmNewText(index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }			 
	//tab	
	 case 'tab': 
		 switch(Sword)
		 {
		 case undefined:
			 return _tab(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	 case 'tad': 
		 switch(Sword)
		 {
		 case undefined:
			return _tab(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	
	 case 'pad': 
		 switch(Sword)
		 {
		 case undefined:
			return _tab(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
    // enter & newline 
		 
	 case 'Enter': 
		 switch(Sword)
		 {
		 case undefined:
			 return _enter(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'return': 
		 switch(Sword)
		 {
		 case undefined:
			 return _enter(transcript,index);
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
			return _colon(transcript,index)
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
    //;
	 case 'semicolon': 
		 switch(Sword)
		 {
		 case undefined:
			return _semicolon(transcript,index)
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
				 return _doublequote(transcript,index)
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
			return _quote(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
		  
	// +
	 case 'plus': 
		 switch(Sword)
		 {
		 case undefined:
			return _plus(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'Plus': 
		 switch(Sword)
		 {
		 case undefined:
			return _plus(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 		 
    // -
	 case 'minus': 
		 switch(Sword)
		 {
		 case undefined:
			 return _minus(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
	// =
	 case 'equal': 
		 switch(Sword)
		 {
		 case undefined:
			return _equal(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }		 
    
	// &
	 case 'and': 
		 switch(Sword)
		 {
		 case undefined:
			 return _and(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'end': 
		 switch(Sword)
		 {
		 case undefined:
			 return _and(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	// $		 
	 case 'dollar': 
		 switch(Sword)
		 {
		 case undefined:
			return _dollar(transcript,index)
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
				return _numbersign(transcript,index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }

		  default:
			  return Isfalse(transcript, index);   
	 }	
		 
	 case 'numeric': 
		 switch(Sword)
		 {
		 case 'sign':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				return _numbersign(transcript,index);
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
			return _at(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'hat': 
		 switch(Sword)
		 {
		 case undefined:
			return _at(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }
	 case 'app': 
		 switch(Sword)
		 {
		 case undefined:
			return _at(transcript,index);
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
			  return _exclamation(transcript,index);
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
				return  _question(transcript,index);
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
			 return _bar(transcript,index);
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
				return _openparenthesis(transcript,index);
			 break;				  
			 default:
				return Isfalse(transcript, index); 
			 }
		 case 'quote':
			 switch(Tword)
			 {
			 
			 case undefined:
				return _openquote(transcript,index);
			 break;
			 default:
				return Isfalse(transcript, index); 
			 } 
	//{
		 case 'bracket':
			 switch(Tword)
			 {
			 
			 case undefined:
				return _openbracket(transcript,index);
			break;
			default:
				return Isfalse(transcript, index); 
			 }
			//[
		 case 'square':
			 switch(Tword)
			 {
			 
			 case 'bracket':
				return _opensquarebracket(transcript,index);
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
			  return _closeparenthesis(transcript,index);
			break;				  
			default:
				return Isfalse(transcript, index); 
			 }
		 case 'quote':
			 switch(Tword)
			 {
			 
			 case undefined:
				return _closequote(transcript,index);
			break;
			default:
				return Isfalse(transcript, index); 
			 } 
				//}			 
		 case 'bracket':
			 switch(Tword)
			 {
			 
			 case undefined:
				 return _closebracket(transcript,index);
			break;
			default:
				return Isfalse(transcript, index); 
			 }
			 //]
		 case 'square':
			 switch(Tword)
			 {
			 
			 case 'bracket':
				return _closesquarebracket(transcript,index);
			break;
			default:
			   return Isfalse(transcript, index); 
			 }				 
		  default:
			  return Isfalse(transcript, index);   
	 }		 

	
 
		  
	 // Movement section				//
	 // ------------------------------------
    
	 case 'go': 
		 switch(Sword)
		 {
		 case 'right':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				return _gorigth(transcript,index);
				  break;
			 case 'sentence':
				 return _gorigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }
		 case 'next':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				return _gorigth(transcript,index);
				  break;
			 case 'sentence':
				 return _gorigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }			 
		 case 'forward':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
					return _gorigth(transcript,index);
				  break;
			 case 'sentence':
				 return _gorigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }				  

		 case 'back':
			 switch(Tword)
			 {
			 
			 case undefined:
				return _goback(transcript,index);
				  break;
			 case 'sentence':
				 return _gobacksentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 } 
		 case 'last':
			 switch(Tword)
			 {
			 
			 case undefined:
				return _goback(transcript,index);
				  break;
			 case 'sentence':
				 return _gobacksentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 } 
		 case 'left':
			 switch(Tword)
			 {
			 
			 case undefined:
					return _goback(transcript,index);
				  break;				  
			 case 'sentence':
				 return _gobacksentence(transcript,index);
			 break;				  
			 default:
				return Isfalse(transcript, index); 
			 } 			 
				 
		  default:
			  return Isfalse(transcript, index);   
	 }		 
		 
		 
	//Delete section
    //--------------------------------------------
		    
	 case 'delete': 
		 switch(Sword)
		 {
		 
		 case undefined:
			 return _deleteback(transcript,index);
			  break;
			  
		 case 'right':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				return _deleterigth(transcript,index);
				  break;
			 case 'sentence':
				return _deleterigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }
		 case 'next':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				return _deleterigth(transcript,index);
				  break;
			 case 'sentence':
				return _deleterigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }			 
		 case 'forward':
			 
			 switch(Tword)
			 {
			 
			 case undefined:
				 return _deleterigth(transcript,index);
				  break;
			 case 'sentence':
					return _deleterigthsentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 }				  

		 case 'back':
			 switch(Tword)
			 {
			 
			 case undefined:
				 return _deleteback(transcript,index);
				  break;
			 case 'sentence':
				 return _deletebacksentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 } 
		 case 'last':
			 switch(Tword)
			 {
			 
			 case undefined:
				 return _deleteback(transcript,index);
				  break;
			 case 'sentence':
				 return _deletebacksentence(transcript,index);
				  break;				  
				  default:
					  return Isfalse(transcript, index); 
			 } 
		 case 'left':
			 switch(Tword)
			 {
			 
			 case undefined:
				 return _deleteback(transcript,index);
				  break;
				  
			 case 'sentence':
				 return _deletebacksentence(transcript,index);
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
			return _cancel(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 
	 case 'cancelled': 
		 switch(Sword)
		 {
		 case undefined:
			return _cancel(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 
	 case 'Kenzo': 
		 switch(Sword)
		 {
		 case undefined:
			return _cancel(transcript,index);
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 } 		 
	// top
	 case 'top': 
		 switch(Sword)
		 {
		 case undefined:
			return _top(transcript,index);
			  break;
			  
			  default:
				  return Isfalse(transcript, index);   
		 }
		 
	//bottom
		  
	 case 'bottom': 
		 switch(Sword)
		 {
		 case undefined:
			return _bottom(transcript,index);
		  break;  
		  default:
			  return Isfalse(transcript, index);   
	 }
		 
	 case 'Bodum': 
		 switch(Sword)
		 {
		 case undefined:
			return _bottom(transcript,index);
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
			return _yes(transcript,index);		 
		  break;
		  default:
			  return Isfalse(transcript, index);   
	 }	 
		 
	 case 'no': 
		 switch(Sword)
		 {
		 case undefined:
			 return _no(transcript,index);		 
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
			 
		case 'title':
			if(Tword != undefined){
				return _newtitle(transcript,index);
			}			  			 
			break;
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
	//$("#final_span").css("color", "pink");
	//final_span.innerHTML = " @@@->  " + data + "  <-@@@ ";
	var title = index.title;
	socket.emit("cmd", [ pretext , afttext,title]);
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
    //final_span.innerHTML = " @@@->  " + doc + "  <-@@@ ";
  	diction = doc;  
    var title = index.title;  
	socket.emit("save", [data, pretext , afttext,json,title]);	
  	//socket.to(_USERNAME).emit("save", [data, pretext , afttext,json]);	
	return false;
    } 
   
}
//Confirmation section :
//-------------------------------------------------------------------
//

 function confirmNewText(index)	{      
	
$.confirm({
    'title'		: 'Delete Confirmation',
    'message'	: 'You are about to delete your current text. <br />It cannot be restored at a later time! Continue?',
    'buttons'	: {
        'Yes'	: {
            'class'	: 'blue',
            'action': function(){
	 //$("#final_span").css("color", "pink");	
 index.docA = ""; 
 index.docB ="";
 index.title = "Untitled";
 docA_span.innerHTML = "";
 docB_span.innerHTML = "";
 //final_span.innerHTML = " @@@->  New Text  <-@@@ ";
 socket.emit('newtext',"new text----------------->>");
 //socket.to(_USERNAME).emit('newtext',"new text----------------->>");
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
 
 ///Menu section : 
 ///-----------------------------------------------------------------------------
 
 var onHelp = false;
 $('#commandlist').click(function(){
 	if(onHelp){
 	onHelp = false; 
	removeHelp();
	
 	}else{ 
 	 	if(onSettings){// if settings screen is there remove it 
 	 	 	onSettings = false; 
 	 	 	removeSettings();
 	 	}
        var markup = [
                      '<div class="alert alert-warning" id="help">',
                      '<h2>',"Help",'</h2>',
                      '<p>','Just click the speak button and you can dictate your text!','</p>',                       
                      '<div id="command">',
                      '<h3>',"Command List",'</h3>',
                      '<p>','<b>New line :</b> Say "return" or "enter"','</p>', 
                      '<p>','<b>Symbols open/close:</b> Say "open or close" "parenthesis, bracket, quote, double quote"','</p>',
                      '<p>','<b>Other symbols:</b> Say the symbol name (ex: "numeric sign" for #)','</p>',
                      '<p>','<b>Title :</b> Say "new title" followed by a one-word title like "Google"','</p>',                       
                      '<p>','<b>Delete last word:</b> Say "delete" for last word','</p>',
                      '<p>','<b>Delete next word:</b> Say "delete forward or rigth" for next word','</p>',
                      '<p>','<b>Delete last sentence :</b> Say "delete back sentence" for last sentence','</p>',
                      '<p>','<b>Delete next sentence :</b> Say "delete forward sentence" for the next sentence','</p>',   
                      '<p>','<b>Move back:</b> Say "go back or left" to get back to last word','</p>', 
                      '<p>','<b>Move next:</b> Say "go forward or rigth" to get back to last word','</p>', 
                      '<p>','<b>Move back sentence:</b> Say "go back sentence" to get back to last sentence','</p>',
                      '<p>','<b>Move next sentence:</b> Say "go forward sentence" to get back to next sentence','</p>',                      
                      '<p>','<b>Star a new text :</b> Say "new text" and accept confirmation','</p>',
                      '</div></div>'
                  ].join('');

        $(markup).hide().appendTo('body').fadeIn();
 		onHelp = true;

 	}
 });
 var onSettings = false;
 $('#settings').click(function(){
 	if(onSettings){
 	onSettings = false; 
 	removeSettings();
	
 	}else{ 
 	 	if(onHelp){//if help screen is there remove it
 	 	 	onHelp = false; 
 	 		removeHelp();
 	 	}
        var markupS = [
                      '<div class="alert alert-warning" id="settingsMenu">',
                      '<h2>',"Settings",'</h2>',
                      '<p>','Here you can changes settings and preferences','</p>',                       
                      '<div id="preference">',
                      '<h3>',"Language",'</h3>',
                      '<p>','Select your region for better results !','</p>',                       
                      '<select id="language" name="language">',
                      '<option value="0"> English </option>',
                      '<option value="1"> English - United States </option>',   
                      '<option value="2"> English - Canada </option>',   
                      '<option value="3"> English - Great Britain</option>',
                      '<option value="4"> English - Australia </option>',  
                      '<option value="5"> English - New Zeeland </option>',                       
                      '</select>',
                      '</div></div>'
                  ].join('');

        $(markupS).hide().appendTo('body').fadeIn();
        var $test = $('body');
        $test.update();
        var $test2 = $('div.settingsMenu');
        console.log("body = "+ $test);
        console.log("div.settingsMenubody = "+ $test2);
        onSettings = true;
        $('#language').click(function(){ 
         	var e = document.getElementById("language");
        	 strUser = e.options[e.selectedIndex].value;
        	 console.log("strUser = " + strUser);
        	 recognition.lang = language[strUser];
        	 console.log(" recognition.lang= " +  recognition.lang);
        	 console.log(" language[strUser].index= " + languageIndex[strUser]);
        	 language_span.innerHTML = languageIndex[strUser];
         });
 	}
 });
 
 var onPanel = false;
 $('#panel').click(function(){
	 if(onPanel){// if settings screen is there remove it 
 	 		onPanel= false; 
 	 	 	removePanel();	
 	}else{ 
 	 	if(onHelp){
 	 	 	onHelp = false; 
 	 		removeHelp();
 	 	}
 	 	if(onSettings){// if settings screen is there remove it 
 	 	 	onSettings = false; 
 	 	 	removeSettings();
 	 	}
        var markup = [
                      '<div  class="alert alert-warning" id="panelmenu">',
                      '<h2>',"Panel",'</h2>',                       
                      '<div id="panel">',
                      '<h3>',"Controls Pad",'</h3>',
                      '<p>','Actions:','</p>',                       
                      '<button type="button" id ="tab"> Tab </button>',
                      '&nbsp;',
                      '<button type="button" id ="enter"> Enter </button>',
                      '&nbsp;',
                      '<button type="button" id ="space"> Space </button>',
                      '&nbsp;',
                      '<button type="button" id ="delete"> Delete last </button>',
                      '&nbsp;',
                      '<button type="button" id ="deletelastsentence"> Delete last sentence</button>',
                      '&nbsp;',
                      '<button type="button" id ="deletenext"> Delete next </button>',
                      '&nbsp;',
                      '<button type="button" id ="deletenextsentence"> Delete next sentence</button>',
                      '&nbsp;',
                      '<button type="button" id ="goright"> Go forward </button>',
                      '&nbsp;', 
                      '<button type="button" id ="goback"> Go back </button>',
                      '&nbsp;', 
                      '<button type="button" id ="gobacksentence"> Go last sentence </button>',
                      '&nbsp;', 
                      '<button type="button" id ="gorightsentence"> Go next sentence </button>',
                      '&nbsp;',
                      '<button type="button" id ="cancel"> Cancel last </button>',
                      '&nbsp;',
                      '<button type="button" id ="top"> Go to top </button>',
                      '&nbsp;',
                      '<button type="button" id ="bottom"> Go to bottom </button>',
                      '&nbsp;',
                      '</br>',
                      '<p>','Symbols:','</p>',                       
                      '<button type="button" id ="comma"> , </button>',
                      '&nbsp;' ,                     
                      '<button type="button" id ="dash"> - </button>',
                      '&nbsp;',
                      '<button type="button" id ="backslash"> Backslash </button>',                      
                      '</br>',
                      '<button type="button" id ="colon"> : </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="semicolon"> ; </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="doublequote"> Double Quote </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="quote"> Quote </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="plus"> + </button>',
                      '&nbsp;' , 
                      '</br>',
                      '<button type="button" id ="minus"> - </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="equal"> = </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="and"> & </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="dollar"> $ </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="numbersign"> # </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="at"> @ </button>',
                      '&nbsp;' ,     
                      '<button type="button" id ="exclamation"> ! </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="question"> ? </button>',
                      '&nbsp;' , 
                      '</br>',                      
                      '<button type="button" id ="bar"> | </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="openparenthesis"> ( </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="closeparenthesis"> ) </button>',
                      '&nbsp;' ,
                      '<button type="button" id ="openbracket"> { </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="closebracket"> } </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="opensquarebracket"> [ </button>',
                      '&nbsp;' , 
                      '<button type="button" id ="closesquarebracket"> ] </button>',
                      '&nbsp;' , 
                      '</div></div>'
                  ].join('');

        $(markup).hide().appendTo('body').fadeIn();
        var $test = $('body');
        $test.update();
 		onPanel = true;
 // all button action will be returned to controls here directly		
        $('#tab').click(function(){ 
        	 return controls("tab");
         });
        $('#dash').click(function(){ 
       	 return controls("dash");
        });
        $('#backslash').click(function(){ 
          	 return controls("backslash");
           });
        $('#comma').click(function(){ 
         	 return controls("comma");
          });  
        $('#enter').click(function(){ 
        	 return controls("Enter");
         }); 
        $('#space').click(function(){ 
       	 return controls("space");
        });
        $('#colon').click(function(){ 
          	 return controls("colon");
           });
        $('#semicolon').click(function(){ 
         	 return controls("semicolon");
          });
        $('#doublequote').click(function(){ 
        	 return controls("double quote");
         });
        $('#quote').click(function(){ 
       	 return controls("quote");
        });
        $('#plus').click(function(){ 
          	 return controls("Plus");
           });
        $('#minus').click(function(){ 
         	 return controls("minus");
          });
        $('#equal').click(function(){ 
        	 return controls("equal");
         });
        $('#and').click(function(){ 
       	 return controls("and");
        });
        $('#dollar').click(function(){ 
          	 return controls("dollar");
           });
        $('#numbersign').click(function(){ 
         	 return controls("number sign");
          });
        $('#at').click(function(){ 
        	 return controls("at");
         });
        $('#exclamation').click(function(){ 
       	 return controls("exclamation mark");
        });
        $('#question').click(function(){ 
          	 return controls("question mark");
           });
        $('#bar').click(function(){ 
         	 return controls("bar");
          });
        $('#openparenthesis').click(function(){ 
        	 return controls("open parenthesis");
         });
        $('#openbracket').click(function(){ 
       	 return controls("open bracket");
        });
        $('#opensquarebracket').click(function(){ 
          	 return controls("open square bracket");
           });
        $('#closeparenthesis').click(function(){ 
       	 return controls("close parenthesis");
        });
        $('#closebracket').click(function(){ 
          	 return controls("close bracket");
           });
        $('#closesquarebracket').click(function(){ 
         	 return controls("close square bracket");
          });
        $('#goright').click(function(){ 
        	 return controls("go right");
         });
        $('#gorightsentence').click(function(){ 
       	 return controls("go right sentence");
        });
        $('#goback').click(function(){ 
       	 return controls("go back");
        });
        $('#gobacksentence').click(function(){ 
          	 return controls("go back sentence");
           });
        $('#delete').click(function(){ 
         	 return controls("delete");
          });
        $('#deletenext').click(function(){ 
        	 return controls("delete right");
         });
        $('#deletelastsentence').click(function(){ 
        	 return controls("delete left sentence");
         });
        $('#deletenextsentence').click(function(){ 
       	 return controls("delete right sentence");
        });
        $('#cancel').click(function(){ 
          	 return controls("cancel");
           });
        $('#top').click(function(){ 
         	 return controls("top");
          });
        $('#bottom').click(function(){ 
        	 return controls("bottom");
         });
 	}
 });

	
	function removeHelp(){
	        $('#help').fadeOut(function(){
	            $(this).remove();
	        });
	    }
	function removeSettings(){
        $('#settingsMenu').fadeOut(function(){
            $(this).remove();
        });
    }
	function removePanel(){
        $('#panelmenu').fadeOut(function(){
            $(this).remove();
        });
    }	
	 $.fn.update = function(){
		    var newElements = $(this.selector),i;    
		    for(i=0;i<newElements.length;i++){
		      this[i] = newElements[i];
		    }
		    for(;i<this.length;i++){
		      this[i] = undefined;
		    }
		    this.length = newElements.length;
		    return this;
		  };