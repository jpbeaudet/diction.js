// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//

//(function($){
	
	//This constructor will built all the parameters MyData object will need to use as ressources for controls. 
	//For the moment i just added a few i could think i will need. 
	//-------------------------------------------------------------------
	
	function MyData (docA,docB,transcript){
		
		this.docA = docA;
		//this.docA.words = docA.split(" ").length ;
		this.docB = docB;
		//this.docB.words = docB.split(" ").length;
		///this.wordsTotal = ( docA.split(" ").length + docB.split(" ").length + transcript.split(" ").length);
		//this.textByWords = (docA.split(" ") + docB.split(" ") + transcript.split(" "));
		//this.textBySentences = (docA.split("." +" "+  "/[A-Z]/" )+ docB.split("." +" "+  "/[A-Z]/" ) +transcript.split("." +" "+  "/[A-Z]/" ));
		//this.textByParagraph = docA.split(/\r\n|\r|\n/g) + docB.split(/\r\n|\r|\n/g)+ transcript.split(/\r\n|\r|\n/g);
		//this.positionByCaracter - (this.wordsTotal - this.docA.words);
		//this.request = transcript.split(" ");
		//this.request.num = transcript.split(" ").length;
	}
		
	
//});//end of jquery