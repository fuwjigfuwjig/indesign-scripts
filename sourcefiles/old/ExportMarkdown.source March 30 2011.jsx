

// The function markdownToIndesign() is given an object containing a block

#include MarkdownToIndesign.library.jsx

						forwardLookingBack: "FLB Body Copy", jumpline: "Jumpline",
						
var myParagraphStyleNames = {	bookKickerTitle: "ARTS book 1.title", bookKickerTitleNoBullet: "ARTS book 1.title no bullet copy",
						bookKickerAuthor: "ARTS book 2.author", bookKickerPublisher: "ARTS book 3.publisher" };

var myFontStyles = { italic: "Book Italic", bold: "Black", book: "Book" };
	
	// The parameter overrides indesign hyperlinks, assuming the markdown ones are more intentional at this point.
  // Replace all poetry soft-returns with hard returns, and make sure that
  // all poetry hard returns end up with a spaceAfter, if they already have it
  // or if the paragraph after them has a spaceBefore. Then zero out the spaceAfter
  // on all other paragraphs. This is all for the purpose of using spaceAfter as a 
  // marker in poetry to determine which paragraphs are soft-return and which are
  // hard-return, at the very end.
  
  for (i=myStory.paragraphs.length-2; i>=0; i--) { // Note the opening boundary condition is one less than usual.
    var myParagraph = myStory.paragraphs[i];
    var myNextParagraph = myStory.paragraphs[i+1];
    
    // First deal with stanza breaks indicated by spaceAfter or spaceBefore.
    if (      (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) != -1) 
           && (myNextParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) != -1)
           && ((myParagraph.spaceAfter != 0) || (myNextParagraph.spaceBefore != 0))  ) {
      myParagraph.spaceAfter = "p12";
    }
    else {
    	myParagraph.spaceAfter = "p0";
    }
    myNextParagraph.spaceBefore = "p0";
    
    // Now go through and deal with stanza connections indicated by soft returns.
    var myFoundParagraphs = myFindText (myParagraph, {findWhat: "\n"}, {changeTo: "\r"}, {wholeWord: false, caseSensitive: true});
    // This for loop will not run at all unless the myParagraph was broken up into at least two paragraphs.
    for (var j=0; j<myFoundParagraphs.length-1; j++) { // note the ending boundary condition is one less than usual
      myParagraph.paragraphs[j].spaceAfter = 0;
      myParagraph.paragraphs[j+1].spaceBefore = 0;
    }
  }
	
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
    			  // else do NOT concatenate, and exit the switch statement.
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
		// All of the soft returns in poetry paragraphs should already have been dealth
		// with anyway, but just in case, we test here for poetry paragraph styles.
		// 3a. Get rid of spaces at the end of the paragraph (should do this with GREP maybe).
	  while (myParagraph.characters[-2].contents == ' ') myParagraph.characters[-2].contents = '';
		
		// And get rid of drop caps and also the forced justification that was in the pullquotes and jumplines.
		
		// 6-pre-a.  Map book kicker styles to how we want them to appear on the web.
		// Also mark them for soft returns.
		if (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1) {
			// First, override local attribute changes to make sure that the myFontStyles
			// names exist for the font in the paragraph.
			myParagraph.applyParagraphStyle (myParagraph.appliedParagraphStyle);
			// Then, get rid of book kicker bullets.
			// REFACTORING NOTE:  THIS IS SORT OF CONFUSING AND LAME, AND ALSO COULD BE 
			switch (myParagraph.appliedParagraphStyle.name) {
				case myParagraphStyleNames.bookKickerTitle:
				case myParagraphStyleNames.bookKickerTitleNoBullet:
				  myParagraph.fontStyle = "Black" /* myFontStyles.bold*/ ;
				  break;
				case myParagraphStyleNames.bookKickerAuthor:
				  myParagraph.fontStyle = myFontStyles.italic;
				  break;
				case myParagraphStyleNames.bookKickerPublisher:
				  myParagraph.fontStyle = myFontStyles.book;
			}
			// Mark them for soft returns unless we're at the end of the book kicker section.
			if ((myNextParagraph != 'end of story') && (myNextParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1)) {
				myParagraph.spaceAfter = "p0";
			}
		}
		
		var myParagraph = myStory.paragraphs[i];
		var myNextParagraph = myStory.paragraphs[i+1];
		
		// If it and the paragraph after it are both either poetry or book kickers, and it's got no spaceAfter, then add two spaces at the end of the paragraph.
		if ( (     (    (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) != -1) 
		             && (myNextParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) != -1) )
		        || (    (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1) 
		             && (myNextParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1) ) )
		     && (myParagraph.spaceAfter == 0) ) {
		  myParagraph.insertionPoints[-2].contents = "  ";
		}
		// Else add a carriage return, making a markdown paragraph tag.
		else { 
			myParagraph.insertionPoints[-1].contents = "\r";
		}
	}
	
	// Get rid of spaceAfter.
	for (i=0; i<myStory.paragraphs.length; i++) {
		myStory.paragraphs[i].spaceAfter = "p0";
	}
	
	
	// And really really last but not least, display the locations of the notes in html comments
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