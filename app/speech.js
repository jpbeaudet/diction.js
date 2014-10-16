// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

var doc= " ";
var txt = "";
var diction;




	 
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
        	toggleStartStop() ;
            txt = event.results[i][0].transcript;
        	interim = ""; 
        	//doc = txt;
        	var isCmd="";
        	isCmd = controls(txt) ;
        	console.log("isCmd ="+ isCmd);
        	
        	if((isCmd == false)){
        		console.log("isCmd called false"); 
            	//doc = txt;
            	
        	}
        	
        	setTimeout(function(){toggleStartStop() ;}, 600);
          //confirmation must come before final is tranfered to doc
          
        } else {
       	interim += event.results[i][0].transcript;   
        }
            
      } 
    
      console.log("txt = "+txt);
      final_span.innerHTML = " @@@ " + txt ;
      interim_span.innerHTML = interim;

     
     
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

  	  } };
}
    

	
        




	