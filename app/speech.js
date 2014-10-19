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
      interim = "-->>"

      for (var i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
        	$("#final_span").css("color", "grey");
        	toggleStartStop() ;
            txt = event.results[i][0].transcript;
        	interim = ""; 
        	var isCmd="";
        	isCmd = controls(txt) ;
        	restart();
        	
          //confirmation must come before final is tranfered to doc
          
        } else {
       	interim += event.results[i][0].transcript;   
        }
            
      } 
    
    
      final_span.innerHTML = " @@@->  " + txt + "  <-@@@ ";
      interim_span.innerHTML = interim;

     
  

    }; 

    
    function reset() {
    button = document.getElementById("button");
  	  recognizing = false;
  	  button.innerHTML = "Click to Speak";
  	}

  	function toggleStartStop() {
  		console.log("toggleStartStop has been exited");
  	button = document.getElementById("button");
  	  if (recognizing) {
  	    recognition.stop();
  	    reset();
  	  } else {
  	    recognition.start();
  	    recognizing = true;
  	    button.innerHTML = "Click to Stop";

  	  } };
  	  
  	  function restart(){
  		setTimeout(function(){toggleStartStop() ;}, 300);
  	  }
}
    

	
        




	