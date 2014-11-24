// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//
var language = new Array();
language[0] = "en-EN";
language[0].index = "English";
language[1] = "en-US";
language[1].index = "English - United States";
language[2] = "en-CA";
language[2].index = "English - Canada";
language[3] = "en-GB";
language[3].index = "English - Great Britain";
language[4] = "en-AU";
language[4].index = "English - Australia";
language[5] = "en-NZ";
language[5].index = "English - New Zeeland";
var strUser;
var doc= " ";
var txt = "";
var diction='';	



if ('webkitSpeechRecognition' in window) {
	console.log('webSpeech recognition has started');
	if( strUser== undefined){
		strUser = 0;
	}
	 console.log("strUser = " + strUser);
	 console.log("language[strUser] = " + language[strUser]);
	var recognizing;
    var recognition = new webkitSpeechRecognition();
    $("#select").click(function(){
    	var e = document.getElementById("select");
    	 strUser = e.options[e.selectedIndex].value;
    	 console.log("strUser = " + strUser);
    	 recognition.lang = language[strUser];
    	 console.log(" recognition.lang= " +  recognition.lang);
    });
    //recognition.lang = "en-EN";
    recognition.lang = language[strUser];
    recognition.continuous = true;
    recognition.interimResults = true;
    reset();
    recognition.onend = reset;
    recognition.onerror = function(e) {
    	recognition.onend = null;	
    	restart(); 
	};
   
    recognition.onresult = function (event) { 
    	
      txt = "";
      var interim = "";

      for (var i = 0; i < event.results.length; ++i) {
    	  txt = "";
        if (event.results[i].isFinal) {
        	$("#final_span").css("color", "grey");
        	toggleStartStop() ;
            txt = event.results[i][0].transcript;
        	interim = ""; 
        	var isCmd="";
        	
        	var isCmd = controls(txt) ;
        	restart(); 
        	
        	
        } else {
       	interim += event.results[i][0].transcript;   
        }
            
      } 
       
   //   final_span.innerHTML = " @@@->  " + txt + "  <-@@@ ";
      interim_span.innerHTML = interim;
      icon_span.innerHTML = "-->";
      
    }; 

    
    function reset() {
    button = document.getElementById("button");
  	  recognizing = false;
  	 // button.innerHTML = "Click to Speak";
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
  	    //button.innerHTML = "Click to Stop";

  	  } };
  	  
  	 function restart(){
  		setTimeout(function(){toggleStartStop() ;}, 400);}

	 }
   

	
        




	