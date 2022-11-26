import fs from "fs";

export const writeFile = (path, data) => {
  try {
    console.log("Writing file...");
    fs.appendFileSync(path, data);
  } catch (err) {
    console.log("Write file err: ", err.message);
  }
};
