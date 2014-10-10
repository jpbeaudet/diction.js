// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

var doc= "";


//(function($){ 
	
	 
if ('webkitSpeechRecognition' in window) {
	console.log('webSpeech recognition has started');
	var recognizing;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-EN";
    recognition.continuous = true;
    recognition.interim = true;
    reset();
    recognition.onend = reset;
    var interim = "";
    
    recognition.onresult = function (event) {
      var txt = "";// the final var will need to be stored in a third variable wich show entire text with format
      
      //for (var i = 0; i < event.results.length; ++i) {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          txt = event.results[i][0].transcript;
          interim = "";
          
        // var isCmd = controls(final);
    
      var doc; // will be taken from server side sessions data. 
        doc += " "+ txt;
          //confirmation must come before final is tranfered to doc
          // I will have to place the command case here
          // I will need to think a users case to confirm command and/or last sentence.
          
        } else {
        	
        	for(i = event.resultIndex; i < event.results.length; ++i){
         		//show result to screen
        		interim += event.results[i][0].transcript;
        	 	}
 
       	//interim += event.results[i][0].transcript;
        }
      }
      final_span.innerHTML = txt;
      interim_span.innerHTML = interim;
      doc_span.innerHTML = doc;
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



	