import { hosts } from "./data/hosts.mjs";
import { httpGet } from "./http/httpGet.mjs";
import { readFile } from "./utils/fs/readFile.mjs";
import { writeFile } from "./utils/fs/writeFile.mjs";
import { lineToWrite } from "./adapters/lineToWrite.mjs";
import { inputPath, outputPath } from "./utils/path.mjs";
import { socketAdapter } from "./adapters/socketAdapter.mjs";

const tryAgain = (hosts, socket) => {
  try {
    let isFound = 0;
    const { port, user, password } = socket;
    hosts.forEach((ip) => {
      if (!isFound) {
        const auxSocket = { ip, port, user, password };
        httpGet(auxSocket)
          .then(({ publicIP }) => {
            writeFile(outputPath, lineToWrite(auxSocket, publicIP));
            isFound = 1;
          })
          .catch((err) => console.log("Error on try again: ", err.err));
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    const socketRawFile = readFile(inputPath);
    const sockets = socketAdapter(socketRawFile);
    const socketPromises = sockets.map((socket) => httpGet(socket));
    socketPromises.forEach((socketPromise) => {
      Promise.resolve(socketPromise)
        .then(({ publicIP, socket }) =>
          writeFile(outputPath, lineToWrite(socket, publicIP))
        )
        .catch(({ err, socket }) => {
          tryAgain(hosts, socket);
        });
    });
  } catch (err) {
    console.log("Main err: ", err.message);
  }
};

main();
