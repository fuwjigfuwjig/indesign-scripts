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
	while (myObject.paragraphs.firstItem().length == 1) {
	if (myDraftType == "Rough") {
	
//	$.writeln (myString);
	    