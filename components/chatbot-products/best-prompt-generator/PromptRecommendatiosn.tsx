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
import { PromptRecommendation } from "@pages/best-prompt-generator";

interface PrompRecommendationsProps {
  promptRecommendations: PromptRecommendation[];
}

const PromptRecommendations: React.FC<PrompRecommendationsProps> = ({
  promptRecommendations,
}) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const onLeftPosition = (index: number): boolean =>
    index === 0 || index % 2 === 0;
  const defineListItemPositionStyles = (index: number): SxProps => {
    if (onLeftPosition(index))
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
  return (
    <Box
      sx={{
        width: isNotMobile ? 800 : 400,
        // backgroundColor: "#d5cfcf",
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
        {promptRecommendations &&
          promptRecommendations.map(
            (promptRecommendation: PromptRecommendation, index: number) => (
              <ListItem
                button
                key={index}
                sx={{
                  width: "95%",
                  minHeight: "5rem",
                  borderRadius: 5,
                  margin: 3,
                  float: !onLeftPosition(index) ? "right" : "left",
                  backgroundColor: promptRecommendation.css_color_code,
                  color: "white",
                  position: "relative",
                  alignSelf: onLeftPosition(index) ? "flex-end" : "flex-start",
                  "&:hover": {
                    backgroundColor: promptRecommendation.css_color_code,
                    color: "white",
                  },
                }}
              >
                <ListItemText
                  primary={promptRecommendation.name}
                  sx={{
                    backgroundColor: promptRecommendation.css_color_code,
                    padding: 0.25,
                    ...defineListItemPositionStyles(index),
                  }}
                />
                <ListItemText primary={promptRecommendation.description} />
              </ListItem>
            )
          )}
      </List>
    </Box>
  );
};

export default PromptRecommendations;
