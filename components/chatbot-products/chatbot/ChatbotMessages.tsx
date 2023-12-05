import {
  Box,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
  SxProps,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatBotMessage,
  ChatBotMessageRole,
  CurrentChatBotHistoryData,
} from "@pages/chatbot";
import { UtilsIoStore } from "@redux/reducers";
import { useSelector } from "react-redux";
import axios from "axios";

interface ChatbotMessagesProps {
  currentMessage: CurrentChatBotHistoryData;
  setCurrentMessage: Dispatch<SetStateAction<CurrentChatBotHistoryData>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  currentMessage,
  setCurrentMessage,
  error,
  setError,
}) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const { currentSubscriptionData } = useSelector(
    (state: UtilsIoStore) => state.auth
  );
  const messagesJson =
    currentMessage && currentMessage.messages
      ? JSON.parse(currentMessage.messages)
      : ([] as ChatBotMessage[]);

  const defineListItemPositionStyles = (
    messageJson: ChatBotMessage
  ): SxProps => {
    if (messageJson.role === ChatBotMessageRole.System)
      return {
        position: "absolute",
        top: `-35%`,
        left: 15,
      };

    return {
      position: "absolute",
      top: `-35%`,
      right: 15,
    };
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const sendMessageHandler = async () => {
    try {
      const { data } = await axios.post(
        "/api/openai/chatbot",
        {
          messages: messagesJson,
          userSubscriptionId: currentSubscriptionData?.id,
          chatId: currentMessage.id,
        },
        config
      );
      setCurrentMessage((prevState) => ({
        ...prevState,
        messages: JSON.stringify(data.chatMessages),
      }));
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      sx={{
        width: isNotMobile ? "80%" : "100%",
        backgroundColor: "#d5cfcf",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        paddingBottom: 2,
        height: "85vh",
      }}
      component="nav"
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messagesJson &&
          messagesJson.map((messageJson: ChatBotMessage, index: number) => (
            <ListItem
              button
              key={index}
              sx={{
                width: isNotMobile ? "50%" : "75%",
                borderRadius: 5,
                float: messageJson.role === "user" ? "right" : "left",
                backgroundColor:
                  messageJson.role === "user" ? "#7248EE" : "white",
                color: messageJson.role === "user" ? "white" : "#000000",
                position: "relative",
                alignSelf:
                  messageJson.role === "user" ? "flex-end" : "flex-start",
                "&:hover": {
                  backgroundColor:
                    messageJson.role === "user" ? "#7248EE" : "white",
                },
              }}
            >
              <ListItemText
                primary={
                  messageJson.role === ChatBotMessageRole.System
                    ? "Utils.IO Admin"
                    : messageJson.role
                }
                sx={{
                  backgroundColor:
                    messageJson.role === "user" ? "#7248EE" : "white",
                  color: messageJson.role === "user" ? "white" : "#7248EE",
                  padding: 0.25,
                  ...defineListItemPositionStyles(messageJson),
                }}
              />
              <ListItemText primary={messageJson.content} />
            </ListItem>
          ))}
      </List>
      <Box
        sx={{
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: isNotMobile ? "row" : "column",
          padding: isNotMobile ? "initial" : "0 !important",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Type a message"
          sx={{
            height: "100%",
            borderRadius: isNotMobile ? 5 : "0 !important",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            paddingX: isNotMobile ? 0 : 2,
            backgroundColor: "white",
          }}
          multiline
          InputLabelProps={{
            sx: {
              display: "none",
            },
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: "white",
              minHeight: 48,
              "&:hover": {
                backgroundColor: "white",
              },
            },
          }}
          // value={inputValue}
          // onChange={handleInputChange}
          fullWidth
          variant="filled"
        />
        <Button
          sx={{
            margin: 0,
            borderRadius: isNotMobile ? 5 : "0 !important",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: 48,
            width: isNotMobile ? "initial" : "100%",
          }}
          variant="contained"
          color="primary"
          onClick={sendMessageHandler}
        >
          <SendIcon
            sx={{
              transform: "rotateX(55deg)",
            }}
          />
          {!isNotMobile && "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotMessages;
