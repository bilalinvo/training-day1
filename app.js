const fs = require('fs-extra');
const os = require('os');
const path = require('dotenv').config().parsed.FILE_PATH;

const dir = os.homedir + path;
const filePath = `${dir}os-info.txt`;

/**
 * Make dir, write and read info
 */
const displayOSInfo = async () => {
  try {
    // Ensure directory
    await fs.ensureDir(dir);

    // Ensure File
    await fs.ensureFile(filePath);

    // Write OS info
    await fs.writeJson(filePath, os.userInfo());
    console.log('Info saved successfully!');

    // Read OS info
    fs.readJson(filePath, (err, infoObj) => {
      if (err) console.error(err);
      console.table(infoObj);
    });
  } catch (err) {
    throw new Error(err);
  }
};

displayOSInfo();
