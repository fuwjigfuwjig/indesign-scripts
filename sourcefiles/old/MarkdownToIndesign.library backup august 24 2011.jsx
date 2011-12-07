// The function markdownToIndesign() is given an object containing a block

// color definitions

var ForwardColors = {
	RoughTextColor: {
		name: "C=88 M=11 Y=1 K=0", 
		space: ColorSpace.CMYK,
		colorValue: [88, 11, 1, 0], 
	}
}



	// Set defaults for parameters
	if (arguments.length < 2) 
		var killAllIndesignHyperlinks = false;
	if (arguments.length < 1) 
	  var killRedundantIndesignHyperlinks = true;
	// to support our quick and dirty fix to process
	// Markdown italics in the case of Word files. 
	var myItalicCharacterStyleName = "ITALIC normal";
	var myDoc;
	switch (this.constructor.name) {
		case "Document" :
		  myDoc = this;
		  break;
		case "Story" :
		  myDoc = this.parent;
		  break;
		default:
		  myDoc = this.parentStory.parent;
	}
	if (myDoc.characterStyles.item (myItalicCharacterStyleName) == null) {
		myDoc.characterStyles.add ({name: myItalicCharacterStyleName, appliedFont: "ITC Slimbach", fontStyle: "Book Italic" });
	}
	
	// Now for the main part of this markdownToIndesign function.
  var escapedChars = {
  switch (this.constructor.name) {
  // Kill all Indesign hyperlinks (this is mainly for if they were
  // imported by Word) before processing Markdown hyperlinks.
  if (killAllIndesignHyperlinks) {
  	for (var h=myDoc.hyperlinks.length-1; h>=0; h--) {
  		myDoc.hyperlinks[h].source.remove();
  	}
  }
  
			// myRedundantHyperlinks should come out null if we have already removed ALL hyperlinks.
  
  // Here is a quick and dirty thing to parse italics only:
  
  // Now change asterisks (single ones only) to italic.
	myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;
	app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);
	app.changeGrepPreferences.changeTo = "$1";
	app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyleName;
	this.changeGrep();
  app.changeGrepPreferences = NothingEnum.nothing;
  
  