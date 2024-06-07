// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";
// import axios from "axios";

// const ChatbotModal = () => {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSend = async () => {
//     setLoading(true);
//     const apiKey = "app-c4OwsNAmlwWfNAGssQk9T7r9"; // Thay bằng API key của bạn
//     const data = {
//       inputs: {},
//       query: message,
//       response_mode: "blocking",
//       conversation_id: "",
//       user: "abc-123",
//       files: [
//         {
//           type: "image",
//           transfer_method: "remote_url",
//           url: "https://cloud.dify.ai/logo/logo-site.png",
//         },
//       ],
//     };

//     try {
//       const response = await axios.post(
//         "https://api.dify.ai/v1/chat-messages",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setChat([...chat, { user: message, bot: response.data.answer }]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setChat([
//         ...chat,
//         // { user: message, bot: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <IconButton color="primary" onClick={handleClickOpen}>
//         <ChatIcon />
//       </IconButton>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Chatbot</DialogTitle>
//         <DialogContent>
//           <Box>
//             {chat.map((chat, index) => (
//               <div key={index}>
//                 <p>
//                   <strong>You:</strong> {chat.user}
//                 </p>
//                 <p>
//                   <strong>Bot:</strong> {chat.bot}
//                 </p>
//               </div>
//             ))}
//           </Box>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="message"
//             label="Type your message..."
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             disabled={loading}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} disabled={loading}>
//             Close
//           </Button>
//           <Button
//             onClick={handleSend}
//             color="primary"
//             disabled={loading || !message}
//           >
//             {loading ? "Sending..." : "Send"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ChatbotModal;
import { useEffect } from "react";

const DifyChatbot = () => {
  useEffect(() => {
    // Create script element for difyChatbotConfig
    const script1 = document.createElement("script");
    script1.text = `
      window.difyChatbotConfig = {
        token: 'Vdq7HvZ8Cm0YJFQM'
      }
    `;
    document.body.appendChild(script1);

    // Create script element for embed.min.js
    const script2 = document.createElement("script");
    script2.src = "https://udify.app/embed.min.js";
    script2.id = "Vdq7HvZ8Cm0YJFQM";
    script2.defer = true;
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null;
};

export default DifyChatbot;
