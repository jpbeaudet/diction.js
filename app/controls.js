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

//(function($){
	
	function controls (transcript) {
	   
	  // Will have to add a (err) handler on start 
	  // if(err){return null}
	
	  // start by building the data object which will contain all relevant info 
	  var Data= [];
	  var socket = io.connect('https://54.68.32.250:3000', {'force new connection': true});
	  socket.emit("request", "test -------------------------------->");
	  socket.on("res", function(data){
		  
	  });
	  socket.on("response", function(response){
		  var docA = response[0];
		  var docB = response[1];
		  var data = new MyData (docA,docB,transcript);
		  Data = data;
	  });
	
	  var numWords = Data.request.num;
	  var request = Data.request;
	  
	  // For performances purpose there a bottleneck here to filter possible commands. 
	  // If there is 3 words or less it is a possible command, may have to adjust.
	  // Will have to devise a return strategy to cut the function usage to minimal possible. The command must still execute.
	  // First idea is : return true when its a command after executing the command. On the other side, will filter if isCmd is true or not
	  if( numWords < 4){
		  
		  // Sometime googleSpeechApi return the first element of the array as undefined or empty. 
		  if( request[0] == undefined){
			  request.splice(0,1);
		  }
		  if( request[0] == ''){
			  request.splice(0,1);
		  }
		  
	 var Fword = request[0];
	 var Sword = request[1];
	 var Tword = request[2];
		  
	 switch(Fword)
	 { 
	 
// Here will go the actual controls and command. There will be three section handling : movement, characters and edition mode	// 
// Each command will have to execute and as a call back return true ( if err return null so the other side will erase the last transcript)	
	 // var dots = functions(err, data){if(err){return false;}else{
	 // >>(execute the command);
	 // return true;
	 // }}
	 //if(dots){return true;}else{return null;};
	 //
	 // 63 commands function to built
//------------------------------------------------------------------------------------------------------------------------------- 
	  
	  // character section 		//
	  // ------------------------------------
	 
	 //Dots
	 case '1':
		  
		 switch(Sword)
		 {
		 case '1A':
			  
			 switch(Tword)
			 {
			 
			 case '1Aa':
				 return true;
				  break;
				  
			 case '1Bb':	
				 return true;
				  break;
				  
				  default:
			 }
			 
			  break;
			  
		 case '1B':	
			 return true;
			  break;
			  
			  default:
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
		  
		  return true;
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
		return true;
		  break;
		  
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
	}//end of the main switch
	 
	  }else{return false;}// end of less than 4 words (possible commands)	  
	  
	  
}//end of controls	

//
//Here goes the function for interim, final, mode and doc //
//
//----------------------------------------------------------


//});//end of jquery