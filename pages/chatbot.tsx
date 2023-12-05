import {
  Box,
  useMediaQuery,
  Collapse,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import axios from "axios";
import Wizard from "@common/Wizard";
import { ModalTitle } from "@common/Titles";
import ChatbotHistory from "@components/chatbot-products/chatbot/ChatbotHistory";
import ChatbotMessages from "@components/chatbot-products/chatbot/ChatbotMessages";
import { useSelector } from "react-redux";
import { UtilsIoStore } from "@redux/reducers";
import { TransparentButton } from "@common/Buttons";
import { useRouter } from "next/router";
import { useSupabase } from "@contexts/supabaseContext";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";

export enum ChatBotMessageRole {
  Assistant = "assistant",
  User = "user",
  System = "system",
}

export interface ChatBotMessage {
  role: string;
  content: ChatBotMessageRole;
}

export interface ChatBotForm {
  message: ChatBotMessage | undefined;
}
export interface CurrentChatBotHistoryData {
  id: string | undefined;
  messages: string;
  createdDate: Date | undefined;
}

const Chatbot = () => {
  const router = useRouter();
  const { signOut } = useSupabase();
  const { currentSubscriptionData } = useSelector(
    (state: UtilsIoStore) => state.auth
  );
  const [loading, setLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState<
    CurrentChatBotHistoryData[]
  >([]);
  const [currentMessage, setCurrentMessage] =
    useState<CurrentChatBotHistoryData>({
      id: undefined,
      messages: JSON.stringify([
        { role: "system", content: "Welcome to the chatbot!" },
        { role: "user", content: "Welcome to the chatbot!" },
      ]),
      createdDate: undefined,
    });
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const defaultChatbotForm = () => ({
    message: undefined,
  });
  const [chatFormData, setChatbotFormData] = useState<ChatBotForm>({
    message: undefined,
  });
  const [error, setError] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getChatbotHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/openai/chatbot-history?user_subscription_id=${currentSubscriptionData?.id}`,
        config
      );
      setMessageHistory(data.history);
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatbotHistory();
  }, []);

  const addMessage = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/openai/chatbot",
        { chatFormData },
        config
      );
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setChatbotFormData((prevState) => ({
      ...prevState,
      message: {
        role: ChatBotMessageRole.User,
        content: value,
      },
    }));
  };

  const currentMessageJson =
    currentMessage && currentMessage.messages
      ? JSON.parse(currentMessage.messages)
      : [];
  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle title="Chatbot" subtitle={currentMessage.id ? currentMessage.createdDate?.toString() : ''} />
      }
    >
      <>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        </Collapse>
      </>
      <Box sx={{ width: "100%", display: "flex", flexDirection: isNotMobile ? 'row' : 'column' }}>
        <ChatbotHistory
          setCurrentMessage={setCurrentMessage}
          history={messageHistory}
          refreshHistory={getChatbotHistory}
        />
        <ChatbotMessages
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
          error={error}
          setError={setError}
        />
      </Box>
    </ReusablePageContainer>
  );
};

export default Chatbot;
