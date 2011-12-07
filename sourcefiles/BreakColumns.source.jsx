// Set to 6.0 scripting object model (Indesign CS4)




main();
		// Make a new text frame with identical attributes
		ntf.contents = "";
		
	// The story has to be checked out.
	if (tf.parentStory.lockState == LockStateValues.CHECKED_IN_STORY)
		error_exit ("Please check out the story in this text frame and try again.");
	
	// The story can't be checked out by someone else.	
	if (tf.parentStory.lockState == LockStateValues.LOCKED_STORY)
	  error_exit ("The story in this text frame is checked out by someone else.  You have to have it " +
	  						"checked out yourself to run this script.");
	  						
	// We need more than one column.
		
	if( tf.parentStory.overflows )
		error_exit ("The text in this frame overflows.  Please create an overflow box for it and try again.");