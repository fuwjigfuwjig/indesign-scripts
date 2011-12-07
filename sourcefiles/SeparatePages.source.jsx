// Set to 6.0 scripting object model (Indesign CS4)



// SeparatePages takes a reference to the current document and gets a page number from the user.
  var myPage = this;
  var mySection = myPage.appliedSection;
  var myPageNum = mySection.pageNumberStart
                              + myPage.documentOffset
                              - mySection.pageStart.documentOffset;
  var mySectionPropertyList = [
                               "includeSectionPrefix",
                               "name",
                               "label",
                               "marker",
                               "pageNumberStyle",
                              ];
  var myNewSection;
  if (myPage == mySection.pageStart) {
    myNewSection = mySection;
  }
  else {
    myNewSection = app.activeDocument.sections.add(myPage);
  }
  var p;
  while (mySectionPropertyList.length) {
    p = mySectionPropertyList.pop();
    if (p!== null && p !== undefined) {
      myNewSection[p] = mySection[p];
    }
  }
  myNewSection.continueNumbering = false;
  myNewSection.pageNumberStart = myPageNum;
}

Spread.prototype.freezePageNumbering = 
Document.prototype.freezePageNumbering = function () {
	for (var i = 0; i < this.pages.length; i++) {
		this.pages[i].freezePageNumbering();
	}
}

// Not being used yet.
Application.prototype.openWithoutWarnings = function (myFile, myShowingWindow) {
	if (arguments.length < 2) {
		var myShowingWindow = true; // default
	}
  // Avoid random dialog alerts (missing fonts, picture links, etc.) when opening the file.
  var myPageName, myPageNameForIndexing, myPagePrefix;
  myPageName = myPage.name;
  // This next part is so that we can pass a distinct 
  // argument to the pages.itemByName() method, which 
  // takes the full name of the page including hidden prefixes.
  if (myPage.appliedSection.includeSectionPrefix) {
  	myPageNameForIndexing = myPageName;
  }
  else {
  	myPageNameForIndexing = myPage.appliedSection.name + myPageName;
  }

  myBackupDocName = myOldDocName.replace (/\.indd$/, "") + "_BACKUP_MOVE_TO_OLD_" + myPageName + ".indd";
  myNewDocName = "PG" + add_leading_zeroes (myPageName) + "_" + myOldDocName.replace (/^news[_ ]*/i, "");
    
  // Remove separated page from main document.
  myOldDoc.pages.itemByName(myPageNameForIndexing).remove();
   	
  // reduced to one page, make it a solid page 1 with a section start,
  // so that later the ReattachPages script will know it's a page 1.

  // Remove all pages except the one we want from the new one-page document. 	
  // We are choosing to use the following somewhat convoluted method 
  // of searching for page numbers because the method 
  // pages.itemByName() returns the name including the 
  // prefix, even if the prefix is hidden.  We don't want this.
  // (This is an inconsistency in InDesign, since the Page.name
  // property returns the page number WITHOUT hidden prefixes,
  // a fact which we make use of in the main function).
 	for (var i = 0; i < myDoc.pages.length; i++) {
 		if (myDoc.pages[i].name == myTruncatedInput) {
 		  arrayOfPages.push(myDoc.pages[i]);
 		}
 	}
 	if (arrayOfPages.length < 1) {
 		error_exit ("Page " + myTruncatedInput + " doesn't exist. \r\r" +
 								"If you think you have received this error in error, " +
 								"perhaps you typed a prefix where there wasn't supposed " +
 								"to be one because the prefix on that page isn't set to print " +
 								"(e.g., you typed 'B4' instead of '4'), or you did the opposite " +
 								"and omitted a prefix that needed to be there.  " +
 								"Either way, fix it and try again.");
 	}
 	if (arrayOfPages.length > 1) {
 	  error_exit ("There's more than one page number " + 
 	               myTruncatedInput + ".  \r\r" +
 							  "Please make sure the page you want to " +
 							  "separate out has a distinct page number, " +
 							  "and try again.  You may be having an issue with " +
 							  "hidden prefixes too, which might cause two different pages " +
 							  "to show up in the PAGES panel as 'A7' & 'B7', but " +
 							  "both prefixes are set not to print.  This script treats " +
 							  "both those pages as page '7'.");
 	}
 	return arrayOfPages[0];