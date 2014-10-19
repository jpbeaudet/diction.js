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

var socket = io.connect('https://54.68.32.250:3000');
	
	function controls (transcript) {
		
		var index;		
	   console.log("controls() fired");;	
	  // start by building the data object which will contain all relevant info 
	
	
	  socket.emit("request", "test -------------------------------->");
	  socket.on("response", function(response){
		  $("#final_span").css("color", "grey");
		  var docA = response[0];
		  var docB = response[1];
		  index = new MyData (docA,docB,transcript);
		  var numWords = index.request.num;
		  //numWords = transcript.split(" ").length;
		  if( numWords < 4){
		 console.log("words is less than 4 ");
		  command(transcript,index);
		  }else{Isfalse(transcript, index); 
		    // return false;
		     }// end of less than 4 words (possible commands)
		  
	  });    
	}//end of controls	
	
	function command (transcript, index) {  
	  console.log("command() fired");
	  console.log("memory A in start of command = "+ index.docA );
	  console.log("memory B in start of command  = "+ index.docB );
	  
	  //var request ="";
	  
	  var request = index.request;
	  //request = transcript.split(" "); 
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
		  
	 switch(Fword)
	 { 
	 
// Here will go the actual controls and command. There will be three section handling : movement, characters and edition mode	// 
// Each command will have to execute and as a call back return true ( if err return null so the other side will erase the last transcript)	
// 63 commands function to built
//------------------------------------------------------------------------------------------------------------------------------- 
	  
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
				 Istrue('what is this', index);
				 //return true;
				  break;
				  
			 case '1Bb':
				 Istrue('2', index);
				 //return true;
				  break;
				  
				  default:
					  Isfalse(transcript, index); 
					  //return false;
			 }
			 
			  break;
			  
		 case '1B':	
			 
			 //return true;
			  break;
			  
			  default:
				  Isfalse(transcript, index); 
				  //return false;
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
		 Istrue('2', index);
		  //return true;
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
		  
			  
	// Mode section						//
	// ------------------------------------		
		  
	// title
		  //1
		  //2
		  //3
		  //4
		  //5
		  
	case  '3':
		Istrue('3', index);
		//return true;
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
		Isfalse(transcript, index); 
		//return false;
	}//end of the main switch
	 console.log("memory A in end of command = "+ index.docA );
	 console.log("memory B in end of command  = "+ index.docB );
	}
	//
	//Here goes the function for interim, final, mode and doc //
	//
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
	      
	
	
	
