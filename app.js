const fs = require('fs');
const os = require('os');
const path = require('dotenv').config().parsed.FILE_PATH;

const dir = os.homedir + path;
const filePath = `${dir}os-info.txt`;

// Read OS details
const readOSDetails = () => {
  fs.readFile(filePath, (err, buf) => {
    if (err) throw err;
    console.log(buf.toString().replace(/,\s*$/, ''));
  });
};

// If file exist
const isFileExist = () => {
  try {
    fs.accessSync(filePath, fs.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

// Write OS details
const writeOSDetails = () => {
  const osInfo = `${JSON.stringify(os.userInfo())},`;
  if (isFileExist()) {
    // Check if file exist
    fs.appendFile(filePath, osInfo, (err) => {
      if (err) throw err;
      console.log('OS info saved successfully!');
    });
  } else {
    // Create and write OS info
    fs.writeFile(filePath, osInfo, (err) => {
      if (err) throw err;
      console.log('OS info saved successfully!');
    });
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

displayOSDetails();
