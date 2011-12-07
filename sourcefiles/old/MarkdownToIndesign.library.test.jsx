Character.prototype.multiChangeGrep = 
  var blockquoteStyleName = "ARTS blockquote multi-para (middle)";
  
    
    
    
  
  app.changeGrepPreferences = NothingEnum.nothing;
  
  // First convert all markdown soft returns (at least two spaces followed by a paragraph return)
  // to proper soft returns.
  app.changeTextPreferences = NothingEnum.nothing;
  app.changeTextPreferences.changeTo = "\n";
  this.changeText();
  // also get rid of extra markdown carats.
  app.findTextPreferences.findWhat = "\n>";
  app.changeTextPreferences.changeTo = "\n";
  this.changeText();
  app.changeTextPreferences = NothingEnum.nothing;
  
  // Now style blockquotes and poetry (poetry will be identifed by the presence of
  // soft returns, which shouldn't exist anywhere else).
  var lastBlockquoteParagraph = "none";
  for (var p=0; p<this.paragraphs.length; p++) {
  	var myParagraph = this.paragraphs[p];
  	// if it's a markdown block quote of some kind
  	if (myParagraph.characters[0].contents == ">") {
  		// Get rid of the carat.
  		myParagraph.characters[0].contents = "";
  		if (lastBlockquoteParagraph == "none") {
	  		myParagraph.insertionPoints[0].contents = "[BLOCKQUOTE OPEN]";
  		}
  		lastBlockquoteParagraph = myParagraph;
  	}
  	// else if it's not an empty line and we're ending a blockquote section
  	else if (myParagraph.characters.length>0 && lastBlockquoteParagraph != "none") {
  		lastBlockquoteParagraph.insertionPoints[-2].contents = "[BLOCKQUOTE CLOSE]";
  		lastBlockquoteParagraph = "none";
  	}
  }
  // Boundary condition at end
  if (lastBlockquoteParagraph != "none") {
  	lastBlockquoteParagraph.insertionPoints[-2].contents = "[BLOCKQUOTE CLOSE]";
  }
  
  // 3. Process bold and italic.
  for (var p=0; p<this.paragraphs.length; p++) {
  	
  
  
  // Now do other markdown processing.  Bold and italic, 