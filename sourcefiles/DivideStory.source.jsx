// Set to 6.0 scripting object model (Indesign CS4)


//DivideStory.jsx

// P.S. I also added an optional part (activated by the boolean argument solidifyJumplines) where it takes 
// already existing jump lines, // in the Forward's format, and makes the page
// numbers into numerals of text instead of special PreviousPageNumber and NextPageNumber characters.

    if (app.documents.length == 0) 
    	error_exit ("Please open a document and try again.");
    if (app.selection.length == 0) 
    	error_exit ("Please select a text frame and try again.");  
    	  
    var mySelection = app.selection[0];	
    if (mySelection.constructor.name != "TextFrame") 
    	error_exit ("Please select a text frame and try again."); 
    	error_exit ("Please select a story containing more than one text frame and try again.");
    	error_exit ("Please select some other text frame besides the first one in the chain, and try again.");

    divide_story (mySelection);
    var mySplit = real_text_frame_index (myFrame);
    var myTot = myStory.textContainers.length;
      myPreJumpPage = find_page (myFrame.previousTextFrame);
    }
    try {
    
    
    myNewFrame = myFrame.duplicate();
    
    // FROM HERE ON IN THE MAIN() FUNCTION IS THE PART THAT I HAVE ADDED
    // TO DAVE SAUNDERS' ORIGINAL SCRIPT.
    // Remove the last paragraph break from the jumped-from story, if it exists. 
    if (solidifyJumplines) {
        myPreJumpParagraph = myStory.paragraphs[-1];
        if (myPreJumpParagraph.appliedParagraphStyle.name.match(/jumpline/i)) {
    }




// The following function is a replacement for the textFrameIndex property of the TextFrame object.
// The textFrameIndex property counts the number of columns in all the text boxes in the story, not the number of 
// text frames.  In my humble opinion, this is a huge bug.

function real_text_frame_index (myFrame) {
	var i;
	var myStory;
	
	myStory = myFrame.parentStory;
	for (i=0; i < myStory.textContainers.length; i++) 
		if (myStory.textContainers[i] == myFrame) 
			return i;
}
	

// By Dave Saunders