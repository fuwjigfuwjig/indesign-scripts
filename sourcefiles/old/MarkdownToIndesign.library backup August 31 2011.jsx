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
  switch (this.constructor.name) {
  // Kill all Indesign hyperlinks (this is mainly for if they were
  // imported by Word) before processing Markdown hyperlinks.
  if (killAllIndesignHyperlinks) {
  	for (var h=myDoc.hyperlinks.length-1; h>=0; h--) {
  		myDoc.hyperlinks[h].source.remove();
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
  
  