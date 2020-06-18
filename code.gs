function doGet(e){

 // Change Spread Sheet url
 var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/{sheet_code}/edit?usp=sharing");

// Sheet Name, Chnage Sheet1 to Users in Spread Sheet. Or any other name as you wish
 var sheet = ss.getSheetByName("Subscriptions");
 var sheet2 = ss.getSheetByName("Specials");
  
  var specials = getDateTimes(sheet2);
  var playCount = sheet.getRange(2,4).getValue();
  
  var result = JSON.stringify({'users':getUsers(sheet), 'specials':getDateTimes(sheet2), 'count': playCount});
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}


function getUsers(sheet){
  var jo = {};
  var dataArray = [];
  
  // collecting data from 2nd Row , 1st column to last row and last column
  var rows = sheet.getRange(3,2,sheet.getLastRow()-2, 3).getValues();
  
  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    record['name'] = dataRow[0];
    record['region'] = dataRow[1];
    record['score'] = dataRow[2];
    if(record['score']  === '') record['score']  = 0;
    
    dataArray.push(record);
  }  
  
  return dataArray; 
}
         
function getDateTimes(sheet2){
     
  var rows = sheet2.getRange(1,1,sheet2.getLastRow(), ).getValues();
  var todayDate = Utilities.formatDate(new Date(), "GMT",  "MM/dd/yyyy");
  
  var lastSpecials = [];
  for(var i = 0, l= rows.length; i<l ; i++) {
    
    var now = new Date();
    
    if(rows[i][0].valueOf() > now.valueOf()) {
      lastSpecials.push(rows[i][0]);
      
      if(lastSpecials.length > 2) {
        return lastSpecials;
      }
    }
  }
  
  return lastSpecials;
}