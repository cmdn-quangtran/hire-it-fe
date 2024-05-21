import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyB1bF1qP9CjoyQyi3t30CrMde3ljtC3ujg",
  authDomain: "chat-bffeb.firebaseapp.com",
  databaseURL:
    "https://chat-bffeb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-bffeb",
  storageBucket: "chat-bffeb.appspot.com",
  messagingSenderId: "693432212675",
  appId: "1:693432212675:web:10fc3199e60068b94ed676",
  measurementId: "G-1TB356F7W8",
};

firebase.initializeApp(firebaseConfig);

const employeeSendMessage = async (chatId, user_info, message, type) => {
  const messagesRef = firebase.database().ref(`chats/${chatId}/messages`);
  const messages = messagesRef.push();
  const messageData = {
    senderId: user_info.account.id,
    name: user_info.account.first_name + " " + user_info.account.last_name,
    avatar: user_info.avatar_url,
    message: message,
    timestamp: Date.now(),
    type: type,
  };
  messages.set(messageData);
  await Promise.all([
    messages.set(messageData),
    updateLastMessage(chatId, messageData),
  ]);
  async function updateLastMessage(chatId, messageData) {
    const chat = firebase.database().ref(`chats/${chatId}`);
    await chat.update({ lastMessage: messageData });
  }
};

const createChat = (
  senderId,
  receiverId,
  senderName,
  senderAvatar,
  senderEmail,
  receiverName,
  receiverAvatar,
  receiverEmail
) => {
  const chatId = `${senderId}_${receiverId}`;
  const chatsRef = firebase.database().ref(`chats/${chatId}`);
  const initialData = {
    users: {
      [senderId]: {
        name: senderName,
        avatar: senderAvatar,
        email: senderEmail,
      },
      [receiverId]: {
        name: receiverName,
        avatar: receiverAvatar,
        email: receiverEmail,
      },
    },
    messages: [],
  };
  chatsRef.set(initialData);
};

const getChatId = async (senderId, receiverId) => {
  const chatsRef = firebase.database().ref("chats");

  const query = chatsRef.orderByChild("users");

  try {
    const snapshot = await query.once("value");
    const chatData = snapshot.val();

    if (chatData) {
      for (const chatId in chatData) {
        if (
          chatData[chatId].users[receiverId] &&
          chatData[chatId].users[senderId]
        ) {
          return chatId;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error retrieving chat ID:", error);
    return false;
  }
};

const initializeChat = async (
  senderId,
  receiverId,
  senderName,
  senderAvatar,
  senderEmail,
  receiverName,
  receiverAvatar,
  receiverEmail
) => {
  const chatId = await getChatId(senderId, receiverId);
  if (chatId) {
    console.log("chat already exists.");
  } else {
    createChat(
      senderId,
      receiverId,
      senderName,
      senderAvatar,
      senderEmail,
      receiverName,
      receiverAvatar,
      receiverEmail
    );
  }
};

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

const findManyChat = async (userId) => {
  const chatsRef = firebase.database().ref("chats");

  try {
    const snapshot = await chatsRef.once("value");
    const chatData = snapshot.val();

    if (chatData) {
      const chatList = Object.entries(chatData).map(([chatId, chat]) => ({
        id: chatId,
        ...chat,
      }));

      const filterChat = chatList.filter((chat) => userId in chat.users);

      const users = filterChat.reduce((userList, chat) => {
        const chatUsers = chat.users;
        const chatUserIds = Object.keys(chatUsers).filter(
          (user) => user !== userId
        );

        const chatDetails = chatUserIds.map((id) => ({
          id: id,
          name: chatUsers[id].name,
          avatar: chatUsers[id].avatar,
          lastMessage: chat.lastMessage,
        }));

        return userList.concat(chatDetails);
      }, []);

      return users;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving users in conversations:", error);
    throw error;
  }
};

const findChatById = async (chatId, userId) => {
  const chatRef = firebase.database().ref(`chats/${chatId}`);

  try {
    const snapshot = await chatRef.once("value");
    const chats = snapshot.val();

    if (chats) {
      const conversationUsers = chats.users;
      const user = Object.entries(conversationUsers)
        .filter(([key]) => key !== userId)
        .map(([id, userDetails]) => ({
          id: id,
          name: userDetails.name,
          avatar: userDetails.avatar,
          email: userDetails.email,
        }))[0];

      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

const firebaseService = {
  updateUsersInConversations,
  initializeChat,
  employeeSendMessage,
  findManyChat,
  findChatById,
};

export default firebaseService;
