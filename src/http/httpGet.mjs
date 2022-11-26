import http from "http";
import throttledQueue from "throttled-queue";
import { proxyAgentConfig } from "../utils/proxyAgent.mjs";

const requestsPerSecond = 1;

const throttled = throttledQueue(requestsPerSecond, 1000);

export const httpGet = (socket) =>
  throttled(
    () =>
      new Promise((resolve, reject) => {
        const config = proxyAgentConfig(socket);
        http
          .get(config, (res) => {
            res.on("data", (chunk) => {
              const publicIP = chunk.toString("utf-8");
              resolve({ err: null, publicIP, socket });
            });
          })
          .on("error", (err) => reject({ err: err.message, socket }));
      })
  );
