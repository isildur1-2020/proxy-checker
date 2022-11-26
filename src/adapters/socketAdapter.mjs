export const socketAdapter = (file) => {
  const socketRawLines = file?.split("\n");
  const sockets = socketRawLines?.map((socket) => {
    const [ip, port, user, password] = socket?.split(":");
    return {
      ip,
      port,
      user,
      password,
    };
  });
  return sockets;
};
