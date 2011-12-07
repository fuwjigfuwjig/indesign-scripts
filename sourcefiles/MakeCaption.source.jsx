// Set to 6.0 scripting object model (Indesign CS4)



var myViewPreferences = app.activeDocument.viewPreferences;
var myOldXUnits = myViewPreferences.horizontalMeasurementUnits;
var myOldYUnits = myViewPreferences.verticalMeasurementUnits;
myViewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
myViewPreferences.verticalMeasurementUnits = MeasurementUnits.points;

if (app.selection.length != 1 || app.selection[0].constructor.name != "Rectangle")
myCaption.geometricBounds = [gb[2]+2, gb[1], gb[2]+42, gb[3]];
myCaption.contents = "Credit\rCaption: Caption body copy tk tk tk tk";
var myStory = myCaption.parentStory;
myStory.paragraphs[0].appliedParagraphStyle = "Credit";
myStory.paragraphs[1].appliedParagraphStyle = "CUTLINE slimbach dots";

myViewPreferences.horizontalMeasurementUnits = myOldXUnits;
myViewPreferences.verticalMeasurementUnits = myOldYUnits;



function error_exit (message) {








