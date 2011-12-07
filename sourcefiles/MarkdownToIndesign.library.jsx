// The function markdownToIndesign() is given an object containing a block


// How do we want our hyperlinks to look?

var MyChosenHyperlinkProperties = {
	borderColor: [183, 27, 23],  // Burgundy, roughly.
	borderStyle: HyperlinkAppearanceStyle.DASHED,
  width: HyperlinkAppearanceWidth.THIN,
  visible: true,
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
  	var textObjParentStory;
  	if (textObj.constructor.name == "Story") {
  	  textObjParentStory = textObj;
  	}
  	else {
  		textObjParentStory = textObj.parentStory;
  	}	
  switch (this.constructor.name) {
  // Go through the hyperlinks in the passed object and either kill them or set them
  // to our style, depending on the killAllHyperlinks parameter.
  var myCheckedHyperlinks = checkHyperlinks (this, myDoc);
  if (myCheckedHyperlinks) {
    for (var h=myCheckedHyperlinks.length-1; h>=0; h--) {
    	if (killAllIndesignHyperlinks) {
    		myDoc.hyperlinks[h].source.remove();
    	}
    	else {
	    	myCheckedHyperlinks[h].properties = MyChosenHyperlinkProperties;
    	}
    }
  }
  	
  
  
  
  // Convert markdown hyperlinks to InDesign hyperlinks.
			// myRedundantHyperlinks should come out null if we have already removed ALL hyperlinks.
  
      myHyperlink.properties = MyChosenHyperlinkProperties;
      myHyperlink.destination.destinationURL = myLinkText.contents.match (/\(([^)]+)\)/) [1];
  
  // Here is a quick and dirty thing to parse italics only:
  
  // Now change asterisks (single ones only) to italic.
	myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;
	app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);
	app.changeGrepPreferences.changeTo = "$1";
	app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyleName;
	this.changeGrep();
  app.changeGrepPreferences = NothingEnum.nothing;
  
  