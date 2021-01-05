const fs = require("fs");
const os = require("os");
const path = require("dotenv").config().parsed.FILE_PATH;

let IO = (() => {

  const file_name = 'os-info.txt';
  const file_path = path + file_name;

  // Read OS details
  const readOSDetails = () => {
    fs.readFile(file_path, function (err, buf) {
      console.log('Here is the saved OS info...')
      console.table(JSON.parse(buf.toString()));
    });
  };

  // Write OS details
  const writeOSDetails = () => {
    fs.writeFile(file_path, JSON.stringify(os.userInfo()), function (err) {
      if (err) return console.log(err);
      console.log("OS info saved successfully!");
    });
  };

  // Display details
  const displayOSDetails = () => {
    writeOSDetails();
    readOSDetails();
  };

  return displayOSDetails();
  
})();
