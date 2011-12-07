// The function markdownToIndesign() is given an object containing a block


// If the scriptArg "draftType" is set, then this was run by PlaceText.


		  // This if statement is necessary because of an apparent bug that
		  // will cause the program to crash later if the selection is a Text
		  // object and not a Story object, when you have the whole story selected.
		  if (app.selection[0].length == app.selection[0].parentStory.length) {
		  	myObject = app.selection[0].parentStory;
		  }
		  else {
		  	myObject = app.selection[0];
		  }
		  break;
		case "Story":
	// Erase all block-level html, for the time being.
  app.changeGrepPreferences = NothingEnum.nothing;
	app.changeGrepPreferences.changeTo = "\r\r";
	myObject.changeGrep();
  app.changeGrepPreferences = NothingEnum.nothing;
	// Now do the main cleanup.
	// Get rid of extra paragraph breaks at beginning and end.
	while (myObject.characters[0].contents == "\r") {
	// Turn text blue if this is supposed to be rough copy.
	// Please excuse mixture of data and logic.
	if (myDraftType == "Rough") {
		if (app.colors.item ("C=88 M=11 Y=1 K=0") == null) {    
	var mySourceText;
	
	
	// First things first:  Kill all hyperlinks, if they're coming in from Word!
	
	for (i=myObject.paragraphs.length-1; i >= 0; i--) {
		if (myParagraph.characters[0].contents == ">") {
			if (i<myObject.paragraphs.length-1) {
		  	myNextParagraph = myObject.paragraphs[i+1];
		  }
		  if (i>0) {
		  	myPreviousParagraph = myObject.paragraphs[i-1];
	  	}

			// Add the ending blockquote marker for print production staff
			if (i == myObject.paragraphs.length-1 || myObject.paragraphs[i+1].characters[0].contents != ">") {
				myParagraph.insertionPoints[-1].contents = "[BLOCKQUOTE]\r";
			}
			// Add the beginning blockquote marker for print production staff
			if (i == 0 || myObject.paragraphs[i-1].characters[0].contents != ">") {
				myParagraph.insertionPoints[0].contents = "[BLOCKQUOTE]\r";
			}
			// Get rid of the markdown blockquote marker
			myParagraph.characters[0].remove();
		}
	}
			
	// shirt-tails:
	
//	$.writeln (myString);
	    
	var myFoundItems;