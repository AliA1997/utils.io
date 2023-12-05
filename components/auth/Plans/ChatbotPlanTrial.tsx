import React, { CSSProperties } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { FinishAccountForm } from "@auth/FinishAccountModal";
import { PrimaryButton } from "@common/Buttons";
import { Plans } from "@auth/Wizard/SelectPlans";

const cardStyles: CSSProperties = {
  maxWidth: 300,
  margin: 2,
};
const contentStyles: CSSProperties = {
  textAlign: "center",
  height: '100%',
  display: 'flex', 
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};;
const listItemTextStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
};

const checkIconStyles: CSSProperties = {
  marginRight: 1,
  color: "green",
};

interface ChatbotFreeTrialPlanProps {
  formData: FinishAccountForm;
  setFormData: React.Dispatch<React.SetStateAction<FinishAccountForm>>;
}

const ChatbotFreeTrialPlan: React.FC<ChatbotFreeTrialPlanProps> = ({ formData, setFormData }) => {
  const isSelected = formData.trialSelected === Plans.Chatbot;
  return (
    <Card sx={cardStyles}>
      <CardContent sx={contentStyles}>
        <Typography variant="h5" component="h2">
          Chatbot Free Trial
          <Typography color="textSecondary">
            Try out our chatbot features for free!
          </Typography>
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  All Features provided by the Basic and Web3 Plan
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Chatbot companion to answer all questions
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Generate the best prompts for ChatGPT
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  5000 Chatbot API calls per month
                </span>
              }
            />
          </ListItem>
        </List>
        <PrimaryButton
          sx={{
            marginTop: 2,
            background: isSelected ? 'green' : '#00008B',
            width: 200,
            ':hover': {
              color: isSelected ? 'green' :  '#00008B',
              background: 'transparent',
            }
          }}
          onClick={() => {
            setFormData((prevData: any) => ({
              ...prevData,
              trialSelected: isSelected ? "" :  Plans.Chatbot,
            }));
          }}
          id={Plans.Chatbot}
        >
          {isSelected && <CheckIcon />}
          Start Free Trial
        </PrimaryButton>
      </CardContent>
    </Card>
  );
};

export default ChatbotFreeTrialPlan;
