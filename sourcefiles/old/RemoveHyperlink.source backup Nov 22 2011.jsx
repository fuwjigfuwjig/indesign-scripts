/* 

This script performs one of two functions: either
it creates a new hyperlink on the selected text,
or it edits an existing one.

*/


#include utilities.jsx

;


var DEFAULT_HYPERLINK_PROPERTIES = {
	  borderColor: [183, 27, 23],  // Burgundy, roughly.
  	borderStyle: HyperlinkAppearanceStyle.DASHED,
    width: HyperlinkAppearanceWidth.THIN,
    visible: true,
}

function getTextSelection() {

    if (app.documents.length == 0) {
    	  error_exit("No documents are open.  Please open a document and try again.");
    }
    	  error_exit("Please select something and try again.");
    }
    
    var myObject;
    var mySel = app.selection[0];
    
    case "InsertionPoint":
        myObject = mySel;
        break;
        
        
        
        error_exit("Please select some text and try again.");
		    	error_exit( "There's been an error of indeterminate nature.  " + 
		    	            "Probably best to blame the programmer." );
		    }
    }
		    
    return myObject;
    
}


var myHyperlink;
var myDest;
var numLinks;
var myFoundHyperlink;


var mySel = getTextSelection();

// We've already determined that it's not a Story object, 
// so we don't have to test for that.

var myDoc = mySel.parentStory.parent;

var myFoundHyperlinks = findHyperlinks (mySel);

// Check to see if there are already any hyperlinks in the selection.

numLinks = myFoundHyperlinks.length;

// alert (numLinks);

if (numLinks > 0) { 
    if (confirm( "Are you sure you want to remove the following hyperlink" +
								             ((numLinks > 1) ? "s" : "") + "?\n\n" +
								             (function() {
								             	   var str = "";
								             	   for (var i = 0; i < numLinks; i++) {
								             	   	   str += myFoundHyperlinks[i].destination.destinationURL + "\n";
								             	   }
								             	   return str;
								             })() )) {
        
//         alert("ok we want to remove it");
             	
		    for (var i = 0; i < numLinks; i++) {
		    	  myFoundHyperlink = myFoundHyperlinks[i];
//		        myDoc.hyperlinkURLDestinations.itemByName( myFoundHyperlink.destination.destinationURL ).remove();
		        
		        
//		        myFoundHyperlink.destination.remove();
//		        myFoundHyperlink.source.remove();
		        myFoundHyperlink.remove();
		    }
		}
    
} else {
	
	error_exit("Please select a link and try again.");
	
}	
