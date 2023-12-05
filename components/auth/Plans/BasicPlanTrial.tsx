import React, { CSSProperties } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PrimaryButton } from "../../common/Buttons";
import { FinishAccountForm } from "@auth/FinishAccountModal";
import { useSupabase } from "@contexts/supabaseContext";
import axios from 'axios';
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

interface BasicFreeTrialPlanProps {
  formData: FinishAccountForm;
  setFormData: React.Dispatch<React.SetStateAction<FinishAccountForm>>;
}


// price_1NBQsYJC3lBcibtEnxluha7W
const BasicFreeTrialPlan: React.FC<BasicFreeTrialPlanProps> = ({  formData, setFormData }) => {
  const { user } = useSupabase();
  const isSelected = formData.trialSelected === Plans.Basic;
  return (
    <Card sx={cardStyles}>
      <CardContent sx={contentStyles}>
        <Typography variant="h5" component="h2">
          Basic Free Trial
          <Typography color="textSecondary">
            Try out our basic features for free!
          </Typography>
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Summarize Articles into Key Points
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Generate paragraph based on any topic
                </span>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Convert any programming language to another programming language
                </span>
              }
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  Translate any language into any language
                </span>
              }
            />
          </ListItem> */}
          <ListItem>
            <ListItemText
              primary={
                <span style={listItemTextStyles}>
                  <CheckCircleIcon sx={checkIconStyles} />
                  1500 API calls per month
                </span>
              }
            />
          </ListItem>
        </List>
        <PrimaryButton
          sx={{
            marginTop: 2,
            background: isSelected ? 'green' : '#7248EE',
            ':hover': {
              color: isSelected ? 'green' : '#7248EE',
              background: isSelected ? 'transparent' : 'white',
            },
            width: 200
          }}
          onClick={async () => {
            setFormData((prevData: any) => ({
              ...prevData,
              trialSelected: isSelected ? "" :  Plans.Basic,
            }));
          }}
          id={Plans.Basic}
        >
          {isSelected && <CheckIcon />}
          Start Free Trial
        </PrimaryButton>
      </CardContent>
    </Card>
  );
};

export default BasicFreeTrialPlan;
