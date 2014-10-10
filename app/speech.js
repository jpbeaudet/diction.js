// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

var doc= " ";
var txt = "";
var diction;

//(function($){ 


	 
if ('webkitSpeechRecognition' in window) {
	console.log('webSpeech recognition has started');
	var recognizing;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-EN";
    recognition.continuous = true;
    recognition.interimResults = true;
    reset();
    recognition.onend = reset;
    
    
    recognition.onresult = function (event) {
    	txt = "";
      var interim = "";
      for (var i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            txt = event.results[i][0].transcript;
        	interim = ""; 
        	//doc = txt;
        	var isCmd="";
        	console.log("txt for ontrol is = "+ txt);
        	isCmd = controls(txt) ;
        	console.log("isCmd ="+ isCmd);
        	if((isCmd == false)){
        		console.log("isCmd called false");
        		
                //txt = event.results[i][0].transcript;
            	//interim = ""; 
            	doc = txt;
        	}

        	
          //confirmation must come before final is tranfered to doc
          // I will have to place the command case here
          // I will need to think a users case to confirm command and/or last sentence.
          
        } else {
       	interim += event.results[i][0].transcript;   
        }
            
      } 
    
      console.log("txt = "+txt);
      final_span.innerHTML = txt;
      interim_span.innerHTML = interim;
      if(diction != doc){
    	  doc_span.innerHTML += " " + doc ;  
    	  diction = doc;  
      }
     
     
      console.log("doc = "+ doc);

    };

    
    function reset() {
    button = document.getElementById("button");
  	  recognizing = false;
  	  button.innerHTML = "Click to Speak";
  	}

  	function toggleStartStop() {
  	button = document.getElementById("button");
  	  if (recognizing) {
  	    recognition.stop();
  	    reset();
  	  } else {
  	    recognition.start();
  	    recognizing = true;
  	    button.innerHTML = "Click to Stop";
  	    final_span.innerHTML = "";
  	    interim_span.innerHTML = "";
  	  } };
}
    
//});//end of jquery  
	
        




	