// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

var doc;


(function($){ 
	
	 
   	 
	
	var recognizing;
    var recognition = new SpeechRecognition();
    recognition.lang = "en-EN";
    recognition.continuous = true;
    recognition.interim = true;
    reset();
    recognition.onend = reset;

    recognition.onresult = function (event) {
      var final = "";// the final var will need to be stored in a third variable wich show entire text with format
      var interim = "";
      for (var i = 0; i < event.results.length; ++i) {
        if (event.results[i].final) {
          final += event.results[i][0].transcript;
        // var isCmd = controls(final);
    
      var doc; // will be taken from server side sessions data. 
        doc += " "+ final;
          //confirmation must come before final is tranfered to doc
          // I will have to place the command case here
          // I will need to think a users case to confirm command and/or last sentence.
          
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      final_span.innerHTML = final;
      interim_span.innerHTML = interim;
      doc_span.innerHTML = doc;
    };
     

	
    $('#button').click(function(){
    	toggleStartStop();
    });
	
        
});//end of jquery


function reset() {
	  recognizing = false;
	  button.innerHTML = "Click to Speak";
	}

	function toggleStartStop() {
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
	