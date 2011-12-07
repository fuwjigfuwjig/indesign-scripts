//The purpose of this script is to be basically to call ProcessText with the correct Story and Draft Type.

//	try {
	do {
		
		// Set the myParentStory variable so that we can then monitor and 
		// shut down the automatic feature where it 
		// creates a new link to stories that are placed from icml files.
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
		var myInitialLockState = myParentStory.lockState;
		if (myInitialLockState == LockStateValues.CHECKED_IN_STORY || myInitialLockState == LockStateValues.LOCKED_STORY) {
			error_exit ("Please check out the story you're trying to place text into, and try again.");
		}
		
		mySel.place(myFile);
		myFile.close();
		
		// Kill any linking that happened if myFile was an icml file
		// by checking to see if the lockState used to be NONE but has now changed:
		if (myInitialLockState == LockStateValues.NONE && myParentStory.lockState != LockStateValues.NONE) {
			myParentStory.itemLink.unlink();
		}
					
		app.doScript (myScriptFile, ScriptLanguage.javascript);
	
	while (false);
	

