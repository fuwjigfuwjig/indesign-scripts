// namespacing is done in two ways here:

// 1. newly written functions are added to the FORWARD.Util namespace.

// 2. Augmentations of Indesign and Javascript builtin constructor function prototypes 
//    are also added to the FORWARD.Util namespace, and are then also added as methods
//    to the constructor functions, where their property names are given
//    the prefix FORWARD_


;


var FORWARD = FORWARD || {};

if (!FORWARD.Util) {
	
		FORWARD.Util = {};
		
		(function() {
			
			  var Util = FORWARD.Util;
		
				Util.addMethodToPrototypes = function( method, property /* , a bunch of constructor functions */ ) {
					  var i, len;
					  var constructors = Array.prototype.slice.call( arguments, 2 );
					  
					  for (i = 0, len = constructors.length; i < len; i++) {
					  	constructors[i].prototype[property] = method;
					  }
				}
				
				
				// ---------------------------------
				
				// First, all the standalone functions (ones without "this" keywords in them):
		
				Util.error_exit = function( message ) {
				
				
				Util.isArray = function( obj ) {
				    return Object.prototype.toString.call( obj ) === "[object Array]";
				};
				
				Util.selectionIs = function( /* further argument list of valid constructor names for the selection */) {
					
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
						
				Util.reverseString = function (str) {
				Util.onlyWhitespace = function(obj) /* returns boolean */ {
				Util.containsAny = function(myStr, mySearchWords, caseSensitive) {
				Util.add_leading_zeroes = function(myNum, numDigits) {  
					
				  var numZeros = numDigits - myStr.length;
				  
				  for (var i = 0; i < numZeros; i++) {
				  	myStr = "0" + myStr;
				  }
				  return myStr;
				}
				
				  	
				// takes either a string or an InDesign text object
				
				Util.convertToStraightQuotes = function( myObject ) {
					
					  if (typeof myObject === "string" ) {
					  	  var myStr = myObject;
			      	  myStr = myStr.replace (/[“”]/g, '"');
			      	  myStr = myStr.replace (/[‘’]/g, "'");
				        return myStr;
				        
					  } else {
							  myFindText (myObject, {findWhat: '“'}, {changeTo: '"'});
							  myFindText (myObject, {findWhat: '”'}, {changeTo: '"'});
							  myFindText (myObject, {findWhat: "‘"}, {changeTo: "'"});
							  myFindText (myObject, {findWhat: "’"}, {changeTo: "'"});
							  return myObject;
					  }
				}
					  	
				
				
				
				
				Util.myFindFile = function(myFileName, myFolderName) {
				
				// Returns an array of hyperlink objects whose source texts
				// are wholly or partially contained within the textObj argument.
				
					
					var textObjParentStory = (textObj.constructor.name == "Story") ? textObj : textObj.parentStory;
					
					var doc = textObjParentStory.parent;
				
				  var foundLinks = [];
				    
				    
				
				 
				
				// Now, all the methods intended to be added to the builtin and InDesign prototypes
				// (this means that they have "this" keywords in them):
				
				Util.addMethodToPrototypes( Util.multiChangeGrep, "FORWARD_multiChangeGrep",
				    Character, 
				    Word, 
				    TextStyleRange, 
				    Line, 
				    Paragraph, 
				    TextColumn,
				    Text, 
				    Cell, 
				    Column, 
				    Row, 
				    Table, 
				    Story, 
				    TextFrame, 
				    XMLElement, 
				    Document, 
				    Application );
				
				
				
				Util.addMethodToPrototypes( Util.multiReplace, "FORWARD_multiReplace", String );
		
		
				// The function markdownToIndesign() is given an object containing a block
				
				Util.markdownToIndesign = function( /*bool*/ killRedundantIndesignHyperlinks, killAllIndesignHyperlinks ) {
		
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
					      
					      
					              myHyperlink.destination.destinationURL.FORWARD_multiReplace (escapedChars.getRestoringPairs());
					    
					  
					  // Here is a quick and dirty thing to parse italics only:
					  
					  // Now change asterisks (single ones only) to italic.
					  
						myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;
						app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);
						app.changeGrepPreferences.changeTo = "$1";
						app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyleName;
						this.changeGrep();
					  app.changeGrepPreferences = NothingEnum.nothing;
					  
					  
				
				Util.addMethodToPrototypes( Util.markdownToIndesign, "FORWARD_multiReplace", 
				    Character,
				    Word,
				    TextStyleRange,
				    Line,
				    Paragraph,
				    TextColumn,
				    Text,
				    Cell,
				    Column,
				    Row,
				    Table,
				    Story,
				    TextFrame,
				    XMLElement,
				    Document );
		
		})();
}