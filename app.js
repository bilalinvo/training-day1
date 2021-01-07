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
    // Ensure directory is available
    await fs.ensureDir(dir);

    // Write OS info
    await fs.writeJson(filePath, os.userInfo());

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
