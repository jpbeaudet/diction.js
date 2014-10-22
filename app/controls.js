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

var socket = io.connect('https://54.68.32.250:3000', {'force new connection': true});
	
window.onload = function()
{
	socket.emit("load", "load -------------------------------->");	
	socket.on("res.load", function(response){
		var docA =response[0];
		var docB =response[1];
		docA_span.innerHTML = docA;
	    docB_span.innerHTML = docB;	
		
});
};

	function controls (transcript) {
		
		var index;		
	   console.log("controls() fired");;	
	  // start by building the index object which will contain all relevant info 
	
	
	  socket.emit("request", "test -------------------------------->");
	  socket.on("response", function(response){
		  $("#final_span").css("color", "grey");
		  var docA = response[0];
		  var docB = response[1];
		  index = new MyData (docA,docB,transcript);
		  var numWords = index.request.num;
		  if( numWords < 4){
		 console.log("words is less than 4 ");
		   return command(transcript,index);
		  }else{return Isfalse(transcript, index); 
		     }// end of less than 4 words (possible commands)
		  
	  });    
	}//end of controls	
	
	function command (transcript, index) {  
	  console.log("command() fired");
	  console.log("memory A in start of command = "+ index.docA );
	  console.log("memory B in start of command  = "+ index.docB );

	  var request = index.request;
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
	 case 'what': 
		  
		 switch(Sword)
		 {
		 case 'is':
			  
			 switch(Tword)
			 {
			 
			 case 'this':
				 $("#final_span").css("color", "pink");				 
				 return Istrue('what is this', index);
				  break;
				  
			 case '1Bb':
				 
				 return Istrue('2', index);
				  break;
				  
				  default:
					  return Isfalse(transcript, index); 
			 }
			 
			  break;
			  
		 case '1B':	
			 
			 return Istrue('1B', index);
			  break;
			  
			  default:
				   
				  return Isfalse(transcript, index);
		 }
		  
		  break;
		  
	// Dash /
    // comma ,
    // space 
    // enter & newline 
	// caps (only next)
	// :
    //;
	// " 
	// '
	// (
	// )
	//{
	//}
	//[
    //]
	// +
	// -
	// =
    // *
	// &
	// %
	// $
	// #
	// @
	// !
	// ?
	// <
	// >
	// ~
	// |	  
		  
	 // Movement section				//
	 // ------------------------------------
    
	// cancel
		  // 3 crtl-z like return
	 case '2':  
		 
		  return Istrue('2', index);
		  break;
		  
	// back
		  // words
		  //sentence
		  //line
	// forward
		  //words
		  //sentence
		  //line
    // return 
		  //top
		  //end
	// erase
	// go to :
		  // line
		  // word
		  // sentence
		  
	// accept
    //new text		  
	 case 'new':
		 switch(Sword)
		 {
		 case 'text':
			 $("#final_span").css("color", "pink");	
			 index.docA = "";
			 index.docB ="";
			 docA_span.innerHTML = "";
			 docB_span.innerHTML = "";
			 socket.emit('newtext',"new text----------------->>");
			 
			 return Istrue('newtext', index);
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
	}
	//
	//Here goes the istrue and isfalse that will emit to server last index modification for saving purposes//
	//It will also need to emit the data for the json thickback constructor
	//----------------------------------------------------------
	
function Istrue(data, index){
	console.log("istrue() fired");
	var pretext = index.docA;
	var afttext = index.docB;
	socket.emit("cmd", [ pretext , afttext]);
	
	return true;

}
function Isfalse(data, index){
	console.log("isFalse() fired");
	var diction;
	var doc = data;
    if(diction != doc){    	
    var pretext = index.docA;
  	var afttext = index.docB;	   
    console.log("pretext= "+ pretext);
    console.log("afttext= "+ afttext);

    docA_span.innerHTML = pretext + " " + doc + " ";
    docB_span.innerHTML = afttext + " ";
    pretext = pretext + " " + doc + " ";
    afttext = afttext + "";  
    
  	diction = doc;  
       
	socket.emit("save", [data, pretext , afttext]);	
	return false;
    }
}
	      
	
	
	
