



main();
	var myAsteriskPlaceholder = "\uA858";
	var myItalicCharacterStyle = "ITALIC normal";
	
	if (myObject == null) error_exit ("There's been an error of indeterminate nature.  Probably best to blame the programmer.");
	// Now for the meat of this script.

	app.changeGrepPreferences = NothingEnum.nothing;
	
	app.changeTextPreferences = NothingEnum.nothing;
  
  // Change ALL asterisks to placeholders. 
//	app.findTextPreferences.findWhat = "*";
//	app.changeTextPreferences.changeTo = myAsteriskPlaceholder;
//	myObject.changeText();



	// Change single asterisks back to asterisks.
	
//	var myObjectLength =  myObject.characters.length;
//	for (var i=0; i<myObjectLength; i++) {
//	  if (myObject.characters[i].contents == myAsteriskPlaceholder) {
//			if (       (i==0 || myObject.characters[i-1] != myAsteriskPlaceholder)
//			        && (i==myObjectLength-1 || myObject.characters[i+1] != myAsteriskPlaceholder) ) {
//			  myObject.characters[i].contents = "*";
//			}
//	  }
//	}
	
	// Now change asterisks (single ones only) to italic.
	var myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;
	app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);
	app.changeGrepPreferences.changeTo = "$1";
	app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyle;
	myObject.changeGrep();
	
	app.changeGrepPreferences = NothingEnum.nothing;
	
	app.changeTextPreferences = NothingEnum.nothing;
  
  
  function error_exit (message) {
}