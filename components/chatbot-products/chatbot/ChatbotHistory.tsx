import {
  Box,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { CurrentChatBotHistoryData } from "@pages/chatbot";
import { TransparentButton } from "@common/Buttons";

interface ChatbotHistoryProps {
  history: CurrentChatBotHistoryData[];
  setCurrentMessage: Dispatch<SetStateAction<CurrentChatBotHistoryData>>;
  refreshHistory: () => Promise<void>;
}

const ChatbotHistory: React.FC<ChatbotHistoryProps> = ({
  history,
  setCurrentMessage,
  refreshHistory,
}) => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx={{
        width: isNotMobile ? "20%" : "100%",
        minWidth: "320px",
        backgroundColor: "#d5cfcf",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: isNotMobile ? "100%" : 320,
        overflowY: "auto",
      }}
      component="nav"
    >
      <List>
        {/* <ListItem button key={historyItem.id} onClick={() => {
            setCurrentMessage(historyItem);
          }}></ListItem> */}
        <ListItem>
          <ListItemText>
            <TransparentButton
              sx={{
                mt: -1,
                width: "100%",
                "& .Mui-disabled": {
                  backgroundColor: "red",
                },
              }}
              onClick={async () => {
                setCurrentMessage({
                  id: undefined,
                  messages: JSON.stringify([
                    { role: "system", content: "Welcome to the chatbot!" },
                  ]),
                  createdDate: undefined,
                } as CurrentChatBotHistoryData);
                await refreshHistory();
              }}
              endIcon={<AddIcon />}
            >
              Add New Chat
            </TransparentButton>
          </ListItemText>
        </ListItem>
        {history ? (
          history.map((historyItem, index) => {
            const firstMessage = JSON.parse(historyItem.messages)[1];
            return (
              <ListItem
                button
                key={historyItem.id}
                onClick={() => {
                  setCurrentMessage(historyItem);
                }}
              >
                <ListItemText primary={firstMessage} />
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText>
              {/* For other variants, adjust the size with `width` and `height` */}
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton
                variant="rectangular"
                sx={{ backgroundColor: "black", marginBottom: "0.25em" }}
              />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ backgroundColor: "black" }}
              />
              <Skeleton
                variant="rectangular"
                height={isNotMobile ? 60 : 30}
                sx={{ backgroundColor: "black", marginTop: "0.25em" }}
              />
              <Skeleton
                variant="rectangular"
                height={isNotMobile ? 60 : 30}
                sx={{ backgroundColor: "black", marginY: "0.25em" }}
              />
              <Skeleton
                variant="rounded"
                height={isNotMobile ? 60 : 30}
                sx={{ backgroundColor: "black" }}
              />
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ChatbotHistory;
