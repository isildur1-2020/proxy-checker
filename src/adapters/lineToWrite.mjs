export const lineToWrite = (socket, response) => {
  const { ip, port, user, password } = socket;
  return `${ip}:${port}:${user}:${password}   ${response}`;
};
