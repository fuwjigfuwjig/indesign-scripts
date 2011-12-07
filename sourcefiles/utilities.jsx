;


// How do we want our hyperlinks to look?

var DEFAULT_HYPERLINK_PROPERTIES = {
	borderColor: [183, 27, 23],  // Burgundy, roughly.
	borderStyle: HyperlinkAppearanceStyle.DASHED,
  width: HyperlinkAppearanceWidth.THIN,
  visible: true,
};

function error_exit(message) {


var isArray = function( obj ) {
    return Object.prototype.toString.call( obj ) === "[object Array]";
};


function selectionIs( /* further argument list of valid constructor names for the selection */) {
	
	  var sel = app.selection[0];
	  
	  if (!sel || !sel.isValid) {
	  	  return;
	  }
	
	  var i, 
	      len = arguments.length;
	  
	  for ( i = 0; i < len; i++) {
	  	  if (arguments[i] === sel.constructor.name) {
	  	  	  return true;
	  	  }
	  }
	  return false;
}
	  	


Character.prototype.multiChangeGrep = 
function reverseString (str) {
function onlyWhitespace (obj) /* returns boolean */ {
function containsAny(myStr, mySearchWords, caseSensitive) {
function add_leading_zeroes (myNum, numDigits) {  
	
  var numZeros = numDigits - myStr.length;
  
  for (var i = 0; i < numZeros; i++) {
  	myStr = "0" + myStr;
  }
  return myStr;
}
  	


// This will take a string.
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


function myFindFile(myFileName, myFolderName) {


// Returns an array of hyperlink objects whose source texts
// are wholly or partially contained within the textObj argument.

	
	var textObjParentStory = (textObj.constructor.name == "Story") ? textObj : textObj.parentStory;
	
	var doc = textObjParentStory.parent;

  var foundLinks = [];
    
    

 


Character.prototype.markdownToIndesign = 
	// Set defaults for parameters
	if (arguments.length < 2) 
		var killAllIndesignHyperlinks = false;
	if (arguments.length < 1) 
	  var killRedundantIndesignHyperlinks = true;
	// to support our quick and dirty fix to process
	// Markdown italics in the case of Word files. 
	var myItalicCharacterStyleName = "ITALIC normal";
	var myDoc;
	switch (this.constructor.name) {
		case "Document" :
		  myDoc = this;
		  break;
		case "Story" :
		  myDoc = this.parent;
		  break;
		default:
		  $.writeln (this);
		  alert ("why are we even here?");
		  myDoc = this.parentStory.parent;
	}
	if (myDoc.characterStyles.item (myItalicCharacterStyleName) == null) {
		myDoc.characterStyles.add ({name: myItalicCharacterStyleName, appliedFont: "ITC Slimbach", fontStyle: "Book Italic" });
	}
	
	// Now for the main part of this markdownToIndesign function.
  var escapedChars = {
  switch (this.constructor.name) {
  // Go through the hyperlinks in the passed object and either kill them or set them
  // to our style, depending on the killAllHyperlinks parameter.
  var myCheckedHyperlinks = checkHyperlinks (this, myDoc);
  if (myCheckedHyperlinks) {
    for (var h=myCheckedHyperlinks.length-1; h>=0; h--) {
    	if (killAllIndesignHyperlinks) {
    		myDoc.hyperlinks[h].source.remove();
    	}
    	else {
	    	myCheckedHyperlinks[h].properties = DEFAULT_HYPERLINK_PROPERTIES;
    	}
    }
  }
  	
  
  
  
  // Convert markdown hyperlinks to InDesign hyperlinks.
			// myRedundantHyperlinks should come out null if we have already removed ALL hyperlinks.
  
      myHyperlink.properties = DEFAULT_HYPERLINK_PROPERTIES;
      myHyperlink.destination.destinationURL = myLinkText.contents.match (/\(([^)]+)\)/) [1];
  
  // Here is a quick and dirty thing to parse italics only:
  
  // Now change asterisks (single ones only) to italic.
	myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;
	app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);
	app.changeGrepPreferences.changeTo = "$1";
	app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyleName;
	this.changeGrep();
  app.changeGrepPreferences = NothingEnum.nothing;
  
  