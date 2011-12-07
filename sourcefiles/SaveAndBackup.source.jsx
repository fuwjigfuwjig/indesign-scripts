// Set to 6.0 scripting object model (Indesign CS4)



// This script saves a file and then backs it up.

var BACKUP_FOLDER_PATH_NAME = "/Volumes/English/PRODUCTION FILES/CURRENT Incopy files and Indesign backups/indesign backups";

var myDoc = app.activeDocument;
var myDate = new Date();
var myBackupFilePathName = BACKUP_FOLDER_PATH_NAME + myDoc.name.replace(/\.indd$/, "_") + myDate.getTime() + ".indd";

var myBackupFile = new File (myBackupFilePathName);
var myCurrentFileName = myDoc.filePath + "/" + myDoc.name;
var myCurrentFile = new File (myCurrentFileName);

myDoc.save();
myDoc.close(SaveOptions.YES, myBackupFile);
open_with_no_warnings(myCurrentFile);

// Done.




