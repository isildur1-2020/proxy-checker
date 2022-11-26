import ProxyAgent from "proxy-agent";

export const proxyAgentConfig = (socket) => {
  const { ip, port, user, password } = socket;
  const proxyUri = `socks5://${user}:${password}@${ip}:${port}`;
  const opts = {
    path: "/",
    method: "GET",
    host: "ipv4.icanhazip.com",
    agent: new ProxyAgent(proxyUri),
  };
  return opts;
};
