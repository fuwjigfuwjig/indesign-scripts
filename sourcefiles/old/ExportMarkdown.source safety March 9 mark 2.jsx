

// The function markdownToIndesign() is given an object containing a block

#include MarkdownToIndesign.library.jsx

						forwardLookingBack: "FLB Body Copy", jumpline: "Jumpline",
						
var myParagraphStyleNames = {	bookKickerTitle: "ARTS book 1.title", bookKickerTitleNoBullet: "ARTS book 1.title no bullet copy",
						bookKickerAuthor: "ARTS book 2.author", bookKickerPublisher: "ARTS book 3.publisher" };

var myFontStyles = { italic: "Book Italic", bold: "Black", book: "Book" };
			var lastIndex;
			// any quote marks and white space.  The reason this is so convoluted
			// is that I can't figure out how to have InDesign's text regexp engine
			// deal with quote characters.
			
			var myTempRegexp = /\S\s*?$/.toString().slice(1,-1);
			var myResult = myFindGrep(myParagraph, {findWhat: myTempRegexp});
			if (myResult != null && myResult.length == 1) {
				lastIndex = myResult[0].index;
				if (myStory.characters[lastIndex].contents == SpecialCharacters.DOUBLE_RIGHT_QUOTE || 
			            myStory.characters[lastIndex].contents == SpecialCharacters.SINGLE_RIGHT_QUOTE) {
			    lastIndex--;
			  }
			  switch (myStory.characters[lastIndex].contents) {
			  	case "-":
			  	  // Remove the hyphen, join the hyphenated word together and concatenate the two paragraphs.
			  	  myResult[0].contents = "";
			  	  // Reset myParagraph.
			      // Concatenate.
    			  myParagraph.characters[-1].contents = "";
    			  break;
    			case "?":
    			case "!":
    			case ".":
    			  // If the paragraph is fully justified, assume that it's not supposed
    			  // to be a real paragraph break, and concatenate.  Otherwise, do nothing.
    			  if (myParagraph.justification == Justification.fullyJustified) {
    			  	myParagraph.characters[-1].contents = " "; // one space, replaces the paragraph return.
    			  }
    			  break;
    			default:
    			  // When in doubt, concatenate.
    			  myParagraph.characters[-1].contents = " "; // one space, replaces the paragraph return.
			  }
			}
			// I'm not sure if we'll ever need this else statement, but it's the case where
			// the paragraph consists of only whitespace.  I think that will never happen
			// because of the cleanup procedures that have preceded this, but I'm not sure.
			else {}
			// Reset myParagraph.
		}
		
		// 6-pre-a.  Map book kicker styles to how we want them to appear on the web.
		if (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1) {
			switch (myParagraph.appliedParagraphStyle.name) {
				case myParagraphStyleNames.bookKickerTitle:
				case myParagraphStyleNames.bookKickerTitleNoBullet:
				  myParagraph.fontStyle = myFontStyles.bold;
				  break;
				case myParagraphStyleNames.bookKickerAuthor:
				  myParagraph.fontStyle = myFontStyles.italic;
				  break;
				case myParagraphStyleNames.bookKickerPublisher:
				  myParagraph.fontStyle = myFontStyles.book;
			}
		}
				
		
	
	// And really last but not least, display the locations of the notes in html comments
	// (The notes themselves are at the top of the document).
	
	// First add the header.
	if (myStory.notes.length > 0) {
	
  //Now add information about the locations of the notes.
	if (myStory.notes.length > 0) {
		var myNoteIndex;
 			myNote = myStory.notes[i];
 			myNoteIndex = myStory.notes[i].storyOffset.index;
 			myStory.insertionPoints[myNoteIndex+1].contents = ' -->';
 			myStory.insertionPoints[myNoteIndex].contents = '<!-- ';
 			myNote.texts[0].contents = "Note " + (i+1);
 			myNote.convertToText();
 		}
	}
}