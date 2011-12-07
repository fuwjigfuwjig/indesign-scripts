

// The function markdownToIndesign() is given an object containing a block

#include MarkdownToIndesign.library.jsx

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