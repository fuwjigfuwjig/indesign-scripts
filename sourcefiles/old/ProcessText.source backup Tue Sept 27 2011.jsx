// ProcessText.source.jsx

// This script takes a story in InDesign or InCopy and processes it into
// one of a number of formats for different types of stories in the Forward newspaper.
// It does a few basic things like getting rid of extra spaces and line breaks and styling
// italic sections, but it also it tries to figure out more specific things like styling bylines, 
// datelines, etc. Sometimes it's wrong, but it usually gets us 90% of the way there.

// The script can handle hyperlinks and italics in markdown format, and a couple of
// other features of markdown. It CANNOT handle
// markdown bolding. We rarely use bold, so we just have to keep an eye out for double asterisks
// when we're looking over the text, and convert them to bold manually (or using the InDesign
// user interface's GREP search function).

// -------------------------------------------------------------------------
// The function contained in the following library,
// markdownToIndesign(), is given an object containing a block


// If the scriptArg "draftType" is set, then this was run by PlaceText,
// and both "draftType" and "storyType" should be set.
// Otherwise this script is on its own and we'll ask the user what they 
// want for both Draft type and Story type

var myDraftType = app.scriptArgs.get("draftType");
var myStoryType = app.scriptArgs.get("storyType");

// If these assignments didn't work,
// then this script has been run standalone,
// and we need to ask the user what they want.
if (!myDraftType || !myStoryType) {
	var myDialogResult = myDisplayDialog();
	myDraftType = myDialogResult.draftType;
	myStoryType = myDialogResult.storyType;
}

function myDisplayDialog(){
	var myObject;
	var myDialog = app.dialogs.add({name:"ProcessText"});
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Story type:"});
				}
				var myStoryTypeRangeButtons = radiobuttonGroups.add();
				with(myStoryTypeRangeButtons){
					radiobuttonControls.add({staticLabel:"Arts"});
					radiobuttonControls.add({staticLabel:"Books"});
					radiobuttonControls.add({staticLabel:"Corrections"});
					radiobuttonControls.add({staticLabel:"Editorial"});
					radiobuttonControls.add({staticLabel:"Fast"});
					radiobuttonControls.add({staticLabel:"ForwardLookingBack"});
					radiobuttonControls.add({staticLabel:"InThisWeeks"});
					radiobuttonControls.add({staticLabel:"Letters"});
					radiobuttonControls.add({staticLabel:"MiscellaneousBodyCopy"});
					radiobuttonControls.add({staticLabel:"News", checkedState:true});
					radiobuttonControls.add({staticLabel:"OpEd"});
					radiobuttonControls.add({staticLabel:"Shmooze"});
				}		
			}	
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Draft type:"});
				}
				var myDraftTypeRangeButtons = radiobuttonGroups.add();
				with(myDraftTypeRangeButtons){
					radiobuttonControls.add({staticLabel:"Final", checkedState:true});
					radiobuttonControls.add({staticLabel:"Rough"});
				}			
			}
		}
	}
	var myResult = myDialog.show();
	if (myResult == false) 
	  exit();
	var myReturnResult = {}; 
	myReturnResult.storyType = myStoryTypeRangeButtons.radiobuttonControls[myStoryTypeRangeButtons.selectedButton].staticLabel;
	myReturnResult.draftType = myDraftTypeRangeButtons.radiobuttonControls[myDraftTypeRangeButtons.selectedButton].staticLabel;
	myDialog.destroy();
	return myReturnResult;
}


// color definitions

var ForwardColors = {
	RoughTextColor: {
		name: "C=88 M=11 Y=1 K=0", 
		space: ColorSpace.CMYK,
		colorValue: [88, 11, 1, 0], 
	}
}

// paragraph style definitions
		  // This if statement is necessary because of an apparent bug that
		  // will cause the program to crash later if the selection is a Text
		  // object and not a Story object, when you have the whole story selected.
		  if (app.selection[0].length == app.selection[0].parentStory.length) {
		  	myObject = app.selection[0].parentStory;
		  }
		  else {
		  	myObject = app.selection[0];
		  }
		  break;
		case "Story":
	
	var myParentStory;
	if (myObject.constructor.name == "Story")
		myParentStory = myObject;
	else 
	  myParentStory = myObject.parentStory;
	// Hide the pseudo-html tags that come in from stories that are cut
	// and pasted from the back end of our website, by turning them into notes.
  app.changeGrepPreferences = NothingEnum.nothing;
  
  // Remove hard returns from block-level html.
  for (var i=0; i<myObject.paragraphs.length; i++) {
  	var myParagraph = myObject.paragraphs[i];
//  	app.findGrepPreferences.findWhat = "\\s*?$";
//    app.changeGrepPreferences.changeTo = "";
//    myParagraph.changeGrep();
//  	app.findGrepPreferences.findWhat = "^\\s*?";
//    app.changeGrepPreferences.changeTo = "";
//    myParagraph.changeGrep();
//    app.changeGrepPreferences = NothingEnum.nothing;
  		myParagraph.characters[-1].contents = " ";
  		i--;
  	}
  }
  	  
  // Shore up whitespace at the beginning and the end of block-level html.
	app.findGrepPreferences.findWhat = "^\\s*?(<.*?>)\\s*?$";
	app.changeGrepPreferences.changeTo = "$1";
	var myResults = myObject.changeGrep();
  app.changeGrepPreferences = NothingEnum.nothing;
	//Convert block-level html into Notes and move them to the beginning
	//of the previous line.
	
	app.findGrepPreferences.findWhat = "^<.*?>$";
	myResults = myObject.findGrep();
	for (var i=myResults.length-1; i>=0; i--) {
    var myIndex = myResults[i].index;
    myResults[i].convertToNote();
    if (myIndex > 0) {
		  myParentStory.characters[myIndex-1].contents = "";
    }
    // Else kill the paragraph mark at the beginning of the first
    // paragraph, which is now just a note. Take care of the extra trailing
    // paragraph returns first.
    else {
    	while (myParentStory.paragraphs[1].length == 1) {
    		myParentStory.paragraphs[1].characters[-1].contents = "";
    	}
    	myParentStory.paragraphs[0].characters[-1].contents = "";
    }
	}
	
  app.changeGrepPreferences = NothingEnum.nothing;
  
  // Add a byline at the beginning if there is a contact line at the end with asterisks around it,
  // which would indicate that it was cut and pasted from the web, and thus had 
  // no automatic byline. (This is just a helpful extra. We should remove it if it's squirrelly.
	app.findGrepPreferences.findWhat = "^\\*Contact (.*?) at .*?@forward.com\\*";
	myResults = myObject.findGrep();
	if (myResults && myResults.length > 0) {
		var myNewByline = myResults[0].contents.match (/\*Contact (.*?) at .*?@forward.com\*/)[1];
		myObject.paragraphs[0].insertionPoints[0].contents = "By " + myNewByline + "\r\r";
	}
  app.findGrepPreferences = NothingEnum.nothing;
  
	// Now deal with datelines
	// Now do the main cleanup.
	// Get rid of extra paragraph breaks at beginning and end.
	while (myObject.characters[0].contents == "\r") {
  mySpecializedChanges(myObject, myStoryType);
	// Turn text blue if this is supposed to be rough copy.
	if (myDraftType == "Rough") {
		if (app.colors.item (ForwardColors.RoughTextColor.name) == null) {    
// I wrote for CS2, before InDesign had good GREP search capability.
// Probably should be rewritten using the Regexp engine.
	var mySourceText;
	var nextParagraphIsBlockquote;
	
	
	// First things first:  Kill all hyperlinks, if they're coming in from Word!
			// extra space before it that was taken out by the automatic search.
	
	nextParagraphIsBlockQuote = false;
	for (i=myObject.paragraphs.length-1; i >= 0; i--) {
		if (myParagraph.characters[0].contents == ">") {
			if (i<myObject.paragraphs.length-1) {
		  	myNextParagraph = myObject.paragraphs[i+1];
		  }
		  if (i>0) {
		  	myPreviousParagraph = myObject.paragraphs[i-1];
	  	}
			// Get rid of the markdown blockquote marker
			myParagraph.characters[0].remove();
			// Add the ending blockquote marker for print production staff
			if (i == myObject.paragraphs.length-1 || !nextParagraphIsBlockquote) {
				myParagraph.insertionPoints[-1].contents = "[END BLOCKQUOTE]\r";
			}
			// Add the beginning blockquote marker for print production staff
			if (i == 0 || myObject.paragraphs[i-1].characters[0].contents != ">") {
				myParagraph.insertionPoints[0].contents = "[BEGIN BLOCKQUOTE]\r";
			}
			nextParagraphIsBlockquote = true;
		}
		else nextParagraphIsBlockquote = false;
	}
			
	// shirt-tails:
	var myScriptFileName, myFindChangeFile, myScriptFile, myResult;
		var myFoundItems;
		app.doScript(myString, ScriptLanguage.javascript);
	}
	catch (e) {
		alert ("Script will exit now. Find/change failed on the following text:\r\r" + myObject.contents);
		exit();
	}
	var myFoundItems;