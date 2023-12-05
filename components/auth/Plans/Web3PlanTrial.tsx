import React, { CSSProperties } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { PrimaryButton } from "@common/Buttons";
import { SxProps } from "@mui/material";
import { FinishAccountForm } from "@auth/FinishAccountModal";
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
};
const listItemTextStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: 14,
};
const checkIconStyles: CSSProperties = {
  marginRight: 1,
  color: "green",
};

interface Web3FreeTrialPlanProps {
  setFormData: React.Dispatch<React.SetStateAction<FinishAccountForm>>;
  formData: FinishAccountForm;
}

const Web3FreeTrialPlan: React.FC<Web3FreeTrialPlanProps> = ({ formData, setFormData }) => {
  const isSelected = formData.trialSelected === Plans.Web3;

  return (
    <Card sx={cardStyles}>
      <CardContent sx={contentStyles}>
        <Typography variant="h5" component="h2">
          Web3 Free Trial
          <Typography color="textSecondary">
            Try out our web3 features for free!
          </Typography>
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  All features provided by the Basic Plan
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Generate smart contracts from your key points
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Generate UI components from your key points
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  3000 Web3 API calls per month
                </span>
              }
            />
          </ListItem>
        </List>
        <PrimaryButton
          sx={{
            marginTop: 2,
            background: isSelected ? 'green' : '#f2a900',
            width: 200,
            ':hover': {
              color: isSelected ? 'green' :  '#f2a900',
              background: 'transparent',
            }
          }}
          onClick={() => {
            setFormData((prevData: any) => ({
              ...prevData,
              trialSelected: isSelected ? "" : Plans.Web3,
            }));
          }}
          id={Plans.Web3}
        >
          {isSelected && <CheckIcon />}
          Start Free Trial

        </PrimaryButton>
      </CardContent>
    </Card>
  );
};


export default Web3FreeTrialPlan;
