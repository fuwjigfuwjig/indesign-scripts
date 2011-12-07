// Set to 6.0 scripting object model (Indesign CS4)


TextFrame.prototype.renumberColumns = function () {
	var myTextFrame = this;
	var myTextFrameWidth = myTextFrame.geometricBounds[3] - myTextFrame.geometricBounds[1];
}



main();
	if (app.selection.length > 1) tryAgain ("Please select only one thing (a text box or a block of text inside a text box) and try again.");
		case "InsertionPoint":
		  if (app.selection[0].parentStory.textContainers.length > 1) {
		    tryAgain ("Please select the text box itself, not any of the text inside the box.\r\r" +
		    					"(If the story existed inside only one box, you would be able to run " +
		    					"this script by selecting text inside the box, but I haven't yet figured " +
		    					"out how to tell which box a particular piece of text is in, when it's a multi-box " +
		    					"story.  So the script can't tell which box you want.  This will be fixed in " +
		    					"the future.)");
		  }
			myFrame = app.selection[0].parentStory.textContainers[0];
			break;
	if (myFrame == null) tryAgain ("There's been a problem of indeterminate nature.  Probably best to blame the programmer.");
	myFrame.renumberColumns();	


function tryAgain (message) {

// findPage is By Dave Saunders