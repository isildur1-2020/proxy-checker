import fs from "fs";

export const readFile = (path) => {
  try {
    console.log("Reading file...");
    const file = fs.readFileSync(path, { encoding: "utf-8" });
    console.log("File read succesfully!");
    return file;
  } catch (err) {
    console.log("Read file error: ", err.message);
  }
};
