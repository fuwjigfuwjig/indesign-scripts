#targetengine "session"
//	app.removeEventListener("afterOpen", myEventListener);
	

function myCheckReadOnlyEvent (myEvent) {
	
	myString += app.activeDocument.name +"\r\r";
	
  myString += "DANGER WILL ROBINSON!\r" +
                 "DANGER WILL ROBINSON!\r\r" +
                 "Someone else has this document open. You're opening a read-only copy, so don't make any changes that you don't want to lose.";


