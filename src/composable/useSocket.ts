// import { useUserSession } from "/@src/stores/userSession";
// import { io } from "socket.io-client";
// export const useSocketIO = () => {
//   const session = useUserSession();
//   const socket = io("ws://3.68.77.199", {
//     transports: ["polling"],
//     path: "/socket.io",
//     auth: {
//       Authorization: `Bearer ${session.token}`,
//     },
//   });
//   return {
//     socket,
//   };
// };
