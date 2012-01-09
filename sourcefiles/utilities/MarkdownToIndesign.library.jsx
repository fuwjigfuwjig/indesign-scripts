// The function markdownToIndesign() is given an object containing a block// of text, and it finds all the hyperlinks inside the text// that are in markdown format and converts them to // InDesign Hyperlink format (i.e., it removes each URL from// the text itself and puts it into an InDesign Hyperlink).// How do we want our hyperlinks to look?var MyChosenHyperlinkProperties = {  borderColor: [183, 27, 23],  // Burgundy, roughly.  borderStyle: HyperlinkAppearanceStyle.DASHED,  width: HyperlinkAppearanceWidth.THIN,  visible: true,}Character.prototype.markdownToIndesign = Word.prototype.markdownToIndesign = TextStyleRange.prototype.markdownToIndesign = Line.prototype.markdownToIndesign = Paragraph.prototype.markdownToIndesign = TextColumn.prototype.markdownToIndesign = Text.prototype.markdownToIndesign = Cell.prototype.markdownToIndesign = Column.prototype.markdownToIndesign = Row.prototype.markdownToIndesign = Table.prototype.markdownToIndesign = Story.prototype.markdownToIndesign = TextFrame.prototype.markdownToIndesign = XMLElement.prototype.markdownToIndesign = Document.prototype.markdownToIndesign = function (/*bool*/ killRedundantIndesignHyperlinks, killAllIndesignHyperlinks ) {  // Set defaults for parameters  if (arguments.length < 2)     var killAllIndesignHyperlinks = false;  if (arguments.length < 1)     var killRedundantIndesignHyperlinks = true;  // Check for the existence of the "ITALIC normal" character style,  // to support our quick and dirty fix to process  // Markdown italics in the case of Word files.   var myItalicCharacterStyleName = "ITALIC normal";  var myDoc;  switch (this.constructor.name) {    case "Document" :      myDoc = this;      break;    case "Story" :      myDoc = this.parent;      break;    default:      myDoc = this.parentStory.parent;  }  if (myDoc.characterStyles.item (myItalicCharacterStyleName) == null) {    myDoc.characterStyles.add ({name: myItalicCharacterStyleName, appliedFont: "ITC Slimbach", fontStyle: "Book Italic" });  }    // Now for the main part of this markdownToIndesign function.  var escapedChars = {    // The reason pairs is an array rather than an object    // with named properties like "backslash", etc., is that     // the order of elements is very important.  The first    // one has to be processed first.    pairs : [      {baseChar: "\\", placeholder: "\uA84E"},      {baseChar: "]", placeholder: "\uA861"},      {baseChar: ")", placeholder: "\uA84A"},      {baseChar: "*", placeholder: "\uA858"}       // others in the series:      // \uA843, \uA850, \uA84B    ],    getHidingPairs: function () {      var arr = [];      for (var i=0; i < this.pairs.length; i++) {        arr[i] = {find: "\\\\\\" + this.pairs[i].baseChar, change: this.pairs[i].placeholder};      }      // Support for other markdown codes      // will be added as needed, but in the      // meantime, delete all single backslashes:      arr[i] = {find: "\\\\", change: ""};      return arr;    },    getRestoringPairs: function () {      var arr = [];      for (var i=0; i < this.pairs.length; i++) {        arr[i] = {find: this.pairs[i].placeholder, change: this.pairs[i].baseChar};      }      return arr;    }  }      function checkHyperlinks (textObj, doc) {    var textObjParentStory;    if (textObj.constructor.name == "Story") {      textObjParentStory = textObj;    }    else {      textObjParentStory = textObj.parentStory;    }     var foundLinks = new Array();        // $.writeln( "doc.hyperlinks.length: " + doc.hyperlinks.length );        for (var linkIndex=doc.hyperlinks.length-1; linkIndex >= 0; linkIndex--) {      var link = doc.hyperlinks[linkIndex];      if (link.source && link.source.sourceText) {        var linkText = link.source.sourceText;        // If linkText is in the same story as textObj,         // and linkText is neither entirely before         // textObj nor entirely after it, then...        if ((linkText.parentStory == textObjParentStory)                 && ( ! ((linkText.index + linkText.length <= textObj.index)                  || (linkText.index >= textObj.index + textObj.length))) ) {          foundLinks.push(link);        }      }    }    return foundLinks;  }   var myRegexp;  var myHyperlink;  var myLinkText;  switch (this.constructor.name) {  case "Document":    myDoc = this;    break;  case "Story":    myDoc = this.parent;    break;  default:    myDoc = this.parentStory.parent;  }    app.changeGrepPreferences = NothingEnum.nothing;  app.findGrepPreferences = NothingEnum.nothing;  app.findChangeGrepOptions.properties = {includeFootnotes:true, includeMasterPages:true, includeHiddenLayers:true, wholeWord:false};     // Hide escaped characters before we parse the markdown code  this.multiChangeGrep (escapedChars.getHidingPairs());    // Go through the hyperlinks in the passed object and either kill them or set them  // to our style, depending on the killAllHyperlinks parameter.  var myCheckedHyperlinks = checkHyperlinks (this, myDoc);  if (myCheckedHyperlinks) {    for (var h=myCheckedHyperlinks.length-1; h>=0; h--) {      if (killAllIndesignHyperlinks) {        myDoc.hyperlinks[h].source.remove();      }      else {        myCheckedHyperlinks[h].properties = MyChosenHyperlinkProperties;      }    }  }            // Convert markdown hyperlinks to InDesign hyperlinks.  myRegexp = /\[[^]]+]\([^)]+\)/;  app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);  var myLinkTexts = this.findGrep();   for (var i=0; i < myLinkTexts.length; i++) {    myLinkText = myLinkTexts[i];    var myRedundantHyperlinks;    // Get rid of any Indesign hyperlinks inside markdown hyperlinks,    // if that boolean parameter is true.    if (killRedundantIndesignHyperlinks) {      // myRedundantHyperlinks should come out null if we have already removed ALL hyperlinks.      myRedundantHyperlinks = checkHyperlinks (myLinkText, myDoc);      if (myRedundantHyperlinks) {        for (var r=myRedundantHyperlinks.length-1; r>=0; r--) {          myRedundantHyperlinks[r].source.remove();        }      }    }          // This "try" statement will fail and be ignored    // if the text in question is already part of a hyperlink.    // Which of course shouldn't happen because we would just    // have removed the source in the loop above, but just in case.     // Create InDesign hyperlink from markdown code.    myHyperlink = null;    try  {      var myHyperlinkSourceText = myDoc.hyperlinkTextSources.add (myLinkText);       var myHyperlinkDestURL = myDoc.hyperlinkURLDestinations.add();      myHyperlink = myDoc.hyperlinks.add(myHyperlinkSourceText, myHyperlinkDestURL);       myHyperlink.properties = MyChosenHyperlinkProperties;      myHyperlink.destination.destinationURL = myLinkText.contents.match (/\(([^)]+)\)/) [1];      // Restore escaped characters in URL      myHyperlink.destination.destinationURL = myHyperlink.destination.destinationURL.multiReplace (escapedChars.getRestoringPairs());    }    catch (e) {}  // ignore errors        // Remove URL and brackets from the text itself.    myRegexp = /\[([^]]+)].*/;    app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);    app.changeGrepPreferences.changeTo = "$1";    myLinkText.changeGrep();  }    // Now do other markdown processing.  Bold and italic, blockquote and poetry,   // maybe headings.  TO BE DONE.    // Here is a quick and dirty thing to parse italics only:    // Now change asterisks (single ones only) to italic.  myRegexp = /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/;  app.findGrepPreferences.findWhat = myRegexp.toString().slice(1,-1);  app.changeGrepPreferences.changeTo = "$1";  app.changeGrepPreferences.appliedCharacterStyle = myItalicCharacterStyleName;  this.changeGrep();  app.changeGrepPreferences = NothingEnum.nothing;  app.findGrepPreferences = NothingEnum.nothing;        // Markdown code parsed.  Restore escaped characters.  this.multiChangeGrep (escapedChars.getRestoringPairs());    app.changeGrepPreferences = NothingEnum.nothing;  app.findGrepPreferences = NothingEnum.nothing;}