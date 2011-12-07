

// The function markdownToIndesign() is given an object containing a block

#include MarkdownToIndesign.library.jsx

			var myTempRegexp = /-\s*?$/.toString().slice(1,-1);
			var myResult = myFindGrep(myParagraph, {findWhat: myTempRegexp});
			if (myResult.length == 1) {
				myResult[0].contents = "";
				// Reset myParagraph.
			  // Concatenate
			  myParagraph.characters[-1].contents = "";
			}
			
			
			// Now: concatenate paragraphs if they are supposed to read as one 
			// special characters in InDesign, not normal text.)
			// Reset myParagraph.
		}