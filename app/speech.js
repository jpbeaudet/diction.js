// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

var doc= " ";
var txt = "";
var diction;
var cmd="";
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
    	cmd = "";
      var interim = "";
      for (var i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
        	var isCmd = controls(txt);
        	console.log("isCmd = "+ isCmd);
        	if(isCmd == false){
        		console.log("isCmd = false");
            txt = event.results[i][0].transcript;
        	interim = ""; 
        	doc = txt;	
        	}else{
        		console.log("isCmd = true");
        		cmd = event.results[i][0].transcript;
        		
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
      if(cmd != ""){
      cmd_span.innerHTML = cmd;
      }
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
	
        




	