// Set to 6.0 scripting object model (Indesign CS4)

// jump lines from stories that are being prepared for reprint layouts.  
// It does not export anything to an rtf file.  It just alters the text in 
// whatever box is selected when you run the script.
			// 2.  Get rid of pullquotes and jumplines after this paragraph.
					// remove extra spaces at end of paragraph
					while (myParagraph.characters[-2].contents == " ") {
						myParagraph.characters[-2].contents = "";
					}
					myParagraph.characters[-1].contents = " "; // one space
							
				
				processStory (myStory);