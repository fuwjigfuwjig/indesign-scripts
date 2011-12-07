

// The function markdownToIndesign() is given an object containing a block

#include MarkdownToIndesign.library.jsx

						forwardLookingBack: "FLB Body Copy", jumpline: "Jumpline",
						
var myParagraphStyleNames = {	bookKickerTitle: "ARTS book 1.title", bookKickerTitleNoBullet: "ARTS book 1.title no bullet copy",
						bookKickerAuthor: "ARTS book 2.author", bookKickerPublisher: "ARTS book 3.publisher" };

var myFontStyles = { italic: "Book Italic", bold: "Black", book: "Book" };
	
	// The first call in the if statement overrides indesign hyperlinks within markdown hyperlink
	// text, assuming the markdown ones are more intentional at this point.
	// The second call, after the else keyword, overrides ALL indesign hyperlinks, if we've determined
	// that the story has just been imported by Word.
	if (mySourceDocName.slice(-4) == "indd") {
		myStory.markdownToIndesign (true, false);
	}
	else {
		myStory.markdownToIndesign (true, true);
	}
		
  for (i=myStory.paragraphs.length-2; i>=0; i--) { // Note the opening boundary condition is one less than usual.
    var myParagraph = myStory.paragraphs[i];
    var myNextParagraph = myStory.paragraphs[i+1];
    
    // Replace all poetry soft-returns with hard returns, and make sure that
    // all poetry hard returns end up with a spaceAfter, if they already have it
    // or if the paragraph after them has a spaceBefore. Then zero out the spaceAfter
    // on all other paragraphs. This is all for the purpose of using spaceAfter as a 
    // marker in poetry to determine which paragraphs are soft-return and which are
    // hard-return, at the very end.
    
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
    if (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) != -1) {
	    var myFoundParagraphs = myFindText (myParagraph, {findWhat: "\n"}, {changeTo: "\r"}, {wholeWord: false, caseSensitive: true});
	    // This for loop will not run at all unless the myParagraph was broken up into at least two paragraphs.
	    for (var j=0; j<myFoundParagraphs.length-1; j++) { // note the ending boundary condition is one less than usual
	      myParagraph.paragraphs[j].spaceAfter = 0;
	      myParagraph.paragraphs[j+1].spaceBefore = 0;
	    }
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
		
		if (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.poetry) == -1) {
			myFindText(myParagraph, {findWhat: "\n"}, {changeTo: " "}, {wholeWord: false, caseSensitive: true});
		}
		myParagraph = myStory.paragraphs[i];
		
		// 3a. Get rid of spaces at the end of the paragraph (should do this with GREP maybe).
	  while (myParagraph.characters[-2].contents == ' ') myParagraph.characters[-2].contents = '';
		
		// And get rid of drop caps and also the forced justification that was in the pullquotes and jumplines.
		
		// 6-pre-a.  Map book kicker styles to how we want them to appear on the web.
		// Also mark them for soft returns.
		if (myParagraph.appliedParagraphStyle.name.search(myStyleStrings.bookKicker) != -1) {
			// First, override local attribute changes to make sure that the myFontStyles
			// names exist for the font in the paragraph.
			myParagraph.applyParagraphStyle (myParagraph.appliedParagraphStyle);
			// Now convert everything to slimbach, so as not to have problems with the Zapf dingbats
			// in the bullet, later.
			myParagraph.appliedFont = "ITC Slimbach";
			
			// Then, get rid of book kicker bullets.
			// REFACTORING NOTE:  THIS IS SORT OF CONFUSING AND LAME, AND ALSO COULD BE 
			switch (myParagraph.appliedParagraphStyle.name) {
				case myParagraphStyleNames.bookKickerTitle:
				case myParagraphStyleNames.bookKickerTitleNoBullet:
//				  alert (myParagraph.characters[0].appliedFont.fontFamily + "     " + myParagraph.characters[5].appliedFont.fontFamily +"\r\r" + myParagraph.contents);
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
		
		
		
		// REFACTORING NOTE:  THIS H-dot and S-dot code should not be repeated FOUR TIMES. Egregious.
		
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
	
	
	// And really really last but not least, reconstitute Notes that were originally block-level html
	// from the web.
	if (myStory.notes.length > 0) {
		var myNote;
		var myNoteIndex;
 			myNote = myStory.notes[i];
 			if (myNote.texts[0].length > 0) {
	 			myNoteIndex = myStory.notes[i].storyOffset.index;
	 			app.findGrepPreferences = NothingEnum.nothing;
	 			app.changeGrepPreferences = NothingEnum.nothing;
	 		  app.findGrepPreferences.findWhat = "^<.*?>$";
		    myResults = myNote.texts[0].findGrep();
	 			app.findGrepPreferences = NothingEnum.nothing;
	 			app.changeGrepPreferences = NothingEnum.nothing;
		    // If it's a hidden block-level html element, make it into a markdown paragraph.	    
		    if (myResults.length > 0) {
		    	// First, replace typographer's quotes.
					var mySavedTypographersQuotes = myDoc.textPreferences.typographersQuotes;
					myDoc.textPreferences.typographersQuotes = false;
		    	app.findGrepPreferences.findWhat = "[“”]";
		    	app.changeGrepPreferences.changeTo = '"';
		    	myNote.texts[0].changeGrep();
		    	app.findGrepPreferences.findWhat = "[‘’]";
		    	app.changeGrepPreferences.changeTo = "'";
		    	myNote.texts[0].changeGrep();
	    		myDoc.textPreferences.typographersQuotes = mySavedTypographersQuotes;
		    	// If it's an html element at the very beginning of the story, add some space after it.
		    	if (myNoteIndex == 0) {
		    		myStory.insertionPoints[myNoteIndex+1].contents = '\r\r';
		    	}
		    	// Otherwise add some space before it.
		    	else { 
		    		myStory.insertionPoints[myNoteIndex].contents = '\r\r';
		    	}
		    }
		    // Else it's an editorial comment, so make it an html comment.
		    else {
		 			myStory.insertionPoints[myNoteIndex+1].contents = ' -->';
		 			myStory.insertionPoints[myNoteIndex].contents = '<!-- ';
		 			// myNote.texts[0].contents = "Note " + (i+1);
		    }
		    // In any case, convert the note to text.
		    myNote.convertToText();
 			}  
 		} 
	}
	
	//Now restore the web-only footer (if any), 
	//which has been stored as a label while the story is in print
	var myDoc = myStory.parent;
	if (myStory.label != "") {
		var mySavedTypographersQuotes = myDoc.textPreferences.typographersQuotes;
		myDoc.textPreferences.typographersQuotes = false;
		var myStr = myStory.label;
		var i;
		var j;
		while (myStr.indexOf("<") != -1) {
		myStr = myStr.replace (/&#&#/g, "<");
		myDoc.textPreferences.typographersQuotes = mySavedTypographersQuotes;
	}
	
  // Clean up: get rid of all paragraph breaks at the very beginning of the story 
  // (this is kludgy, because we already did it earlier).
		
}

  
	


				var myGhostFile = File.saveDialog ("Please save your file.  The suffix \".rtf\" will be added automatically.");
				var myScratchTextFrame = myScratchDoc.pages[0].textFrames.add();
				myScratchStory.label = myStory.label;
				
				// We have to pass the original document also now, so that we can 
				// determine whether we're in an incopy document or an indesign document
				// (to determine what to do with extraneous hyperlinks
			}
			// Else it's inCopy
			else {
				var myScratchDoc = app.documents.add (/*showingWindow*/ true);
				// app is InCopy, where a text frame would get added automatically in a new document.
				
				// We have to pass the original document also now, so that we can 
				// determine whether we're in an incopy document or an indesign document
				// (to determine what to do with extraneous hyperlinks
			}	
			// And here, in the inCopy version, we're done. We just leave the new inCopy document open.
			
			break;
				
		default :
		  alert ("You need to select some text or a text frame.");
function convertStringToStraightQuotes (myStr) {
  myStr = myStr.replace (/[“”]/g, '"');
  myStr = myStr.replace (/[‘’]/g, "'");
  return myStr;
}
  
// This will take an InDesign text object.
function convertTextObjectToStraightQuotes (myObject) {
  myFindText (myObject, {findWhat: '“'}, {changeTo: '"'}, undefined);
  myFindText (myObject, {findWhat: '”'}, {changeTo: '"'}, undefined);
  myFindText (myObject, {findWhat: "‘"}, {changeTo: "'"}, undefined);
  myFindText (myObject, {findWhat: "’"}, {changeTo: "'"}, undefined);
}
  
