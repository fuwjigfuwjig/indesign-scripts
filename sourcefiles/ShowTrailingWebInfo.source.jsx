main();
    	error_exit("No documents are open.  Please open a document and try again.");
    }
    	error_exit("Please select something and try again.");
    }
    
    var mySel = app.selection[0];
    
    
        
        break;
        
        
        
        	error_exit("If you're going to select a text frame, please select " + 
                     "that text frame and nothing else, and try again.");
        }
    
        
    	error_exit( "There's been an error of indeterminate nature.  " + 
    	            "Probably best to blame the programmer." );
    }
    
    var myStory = (mySel.constructor.name === "Story") ? mySel : mySel.parentStory;
    
    alert( "The contents of the hidden text that will be put at the end of " +
           "this story when it gets exported to the web:\n\n\n" +
           myStory.label );
}