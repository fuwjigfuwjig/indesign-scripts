// This script is called either 

// PlaceTextFinal.source.jsx 
// or
// PlaceTextRough.source.jsx 

// The purpose of this script is to call the ProcessText.source.jsx script 
// (which processes an Indesign/Incopy story for use in the print version of the Forward Newspaper)
// with the correct Story and Draft Type.
// The Draft type is determined by the name of this script file, either "Final" or "Rough."
// The Story type is determined by the name of the text file that will be placed.

// If you make changes to this script, save it as both "PlaceTextFinal.source.jsx" 
// and "PlaceTextRough.jsx".


var myDraftType = getActiveScript().name.slice(9,14);




	try {
		
		mySel = app.selection[0];
		
		// Set the myParentStory variable so that we can then monitor and 
		// shut down the automatic feature where if a story is placed from an icml
		// file, Indesign creates a new link to that icml file. We don't want that, 
		// because we want to be able to export the story to a new icml file 
		// in a hidden location, so that the editors now only have access to this
		// story by going through the Indesign file where it's placed on the page.
		// This will reduce confusion and the potential for mishaps.
		var myParentStory;
		switch (mySel.constructor.name) {
				if (app.selection.length > 1) 
				  error_exit ("Please select some text or only one text frame, and try again.");
			case "Character":
			case "InsertionPoint":
					myParentStory = mySel.parentStory;
					break;
					break;
			default:
		}
		
		// Get the lockState of the story on the page before placing the file, to 
		// Determine whether the story was already linked to an icml file or not.
		var myInitialLockState = myParentStory.lockState;
		if (myInitialLockState == LockStateValues.CHECKED_IN_STORY || myInitialLockState == LockStateValues.LOCKED_STORY) {
			error_exit ("Please check out the story you're trying to place text into, and try again.");
		}
		
		mySel.place(myFile);
		myFile.close();
		
		// Kill any linking that happened if myFile was an icml file.
		// We do this by first checking to see if the lockState used to be NONE 
		// (i.e., the story did not start out linked to any icml file) but has now changed:
		if (myInitialLockState == LockStateValues.NONE && myParentStory.lockState != LockStateValues.NONE) {
			myParentStory.itemLink.unlink();
		}
	  
	  // Now the nitty gritty of trying to determine the Story type based on the filename
	  // of the imported file. The editors and the copy editor generally submit the files
	  // in the form <mmdd.section_name.story_name.other_stuff.doc> where mmdd is month and day.
		// Adjust the section name in the filename a bit, if it needs it.
		var myStoryType;
		// This third parameter ("placingText") is to tell the called script that it is being called
		// to process a file that has just been imported. The reason for this is that
		// if we're importing a file, we want to eliminate all the Word hyperlinks
		// which have already been converted into InDesign hyperlinks by the import process,
		// while if we're just processing a story that's already there, we probably
		// don't want to eliminate the existing InDesign hyperlinks.
		app.doScript (myScriptFile, ScriptLanguage.javascript);
	
	catch (e) {


// Restore warnings after placing the text file.

