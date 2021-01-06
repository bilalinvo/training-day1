const fs = require("fs");
const os = require("os");
const path = require("dotenv").config().parsed.FILE_PATH;
const rel_path = require('path');

let IO = (() => {

  const dir = os.homedir + path;
  const file_path = dir + 'os-info.txt';

  // Read OS details
  const readOSDetails = () => {
    fs.readFile(file_path, (err, buf) => {
      if (err) throw err;
      console.log(buf.toString().replace(/,\s*$/, ""));
    });
  };

  // Write OS details
  const writeOSDetails = () => {
    const os_info = JSON.stringify(os.userInfo()) + ',';
    if (isFileExist()) { // Check if file exist
      fs.appendFile(file_path, os_info, (err) => {
        if (err) throw err;
        console.log("OS info saved successfully!");
      });
    } else { // Create and write OS info
      fs.writeFile(file_path, os_info, (err) => {
        if (err) throw err;
        console.log("OS info saved successfully!");
      });
    }
  };

  // If file exist
  const isFileExist = () => {
    try {
      fs.accessSync(file_path, fs.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Create directory for folder
  const createDirectory = () => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  };

  // Display details
  const displayOSDetails = () => {
    createDirectory();
    writeOSDetails();
    readOSDetails();
  };

  return displayOSDetails();

})();
