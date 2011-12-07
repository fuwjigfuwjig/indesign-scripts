if (app.documents.length == 0) error_exit ("Please open a document and try again.");
var myDoc = app.activeDocument;
if (myDoc.selection.length == 0) error_exit ("Please select some text and try again.");
var mySel = myDoc.selection[0];
switch (mySel.constructor.name) {
		case "Character":
		  break;
		case "Story":
		  error_exit ("Please select part of a story (not the whole story).");
		  break;
		default: 
		  error_exit ("Please select some text.");
}

var myParentStory = mySel.parentStory;
myParentStory.label = mySel.contents;
mySel.remove();

	
	
	

function error_exit (message) {