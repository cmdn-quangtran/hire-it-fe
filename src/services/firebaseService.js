import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAx3Hvkp50YNtgwSwQWZM0k948MpdMEu_Q",
  authDomain: "hireit-chat.firebaseapp.com",
  projectId: "hireit-chat",
  storageBucket: "hireit-chat.appspot.com",
  messagingSenderId: "975965412037",
  appId: "1:975965412037:web:c00f29e2466cae70956eac",
  measurementId: "G-X565J260WY",
};

firebase.initializeApp(firebaseConfig);

const updateUsersInConversations = (userId, name, avatar) => {
  console.log("updateUsersInConversations");
  const conversationsRef = firebase.database().ref("conversations");

  return conversationsRef
    .once("value")
    .then((snapshot) => {
      const conversationsData = snapshot.val();
      if (conversationsData) {
        const updatedConversations = {};

        Object.entries(conversationsData).forEach(
          ([conversationId, conversation]) => {
            const updatedUsers = { ...conversation.users };
            const updatedMessages = { ...conversation.messages };

            if (userId in updatedUsers) {
              updatedUsers[userId] = {
                ...updatedUsers[userId],
                name: name,
                avatar: avatar,
              };
            }
            Object.entries(updatedMessages).forEach(([messageId, message]) => {
              if (message.senderId === userId) {
                updatedMessages[messageId] = {
                  ...message,
                  name: name,
                  avatar: avatar,
                };
              }
            });
            updatedConversations[conversationId] = {
              ...conversation,
              users: updatedUsers,
              messages: updatedMessages,
            };
          }
        );

        // Update the conversations in the database
        return conversationsRef
          .set(updatedConversations)
          .then(() => {
            console.log("Users updated in conversations successfully.");
          })
          .catch((error) => {
            console.error("Error updating users in conversations:", error);
            throw error;
          });
      } else {
        return;
      }
    })
    .catch((error) => {
      console.error("Error retrieving conversations:", error);
      throw error;
    });
};

const firebaseService = {
  updateUsersInConversations,
};

export default firebaseService;
