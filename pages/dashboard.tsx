// Add prompt to the collection(prompts) in mongodb
// Track number of requests user made.
// Track prompt results add it to collection(prompt_results) in mongodb
// Display data above in dashboard
// Display last logged in.
// Display avatar on center header with username
// Display fun fact or allow them to add fun fact
// Display settings button icon on most top right tile.
// Display number of requests left for the month.
// Display other personal info such as country, if belief is not provided.
// Do a tile layout for dashboard
// v2 features add tile allowing to have data decentralized, and deleted from db
// has a flag indicating it's decentralized.

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ReusablePageContainer } from "@common/Containers";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface IUserInfo {
  Avatar: string;
  Username: string;
}

enum DashboardDataKeys {
  NumberOfRequestsMade = "Number of Requests Made",
  MostRecentPromptResult = "Most Recent Prompt Result",
  LastLoggedIn = "Last Logged In",
  FunFact = "Fun Fact",
  NumberOfRequestsLeft = "Number of Requests Left",
  Country = "Country",
}

interface IDashboardData {
  "Number of Requests Made": number;
  "Most Recent Prompt Result": string;
  "Last Logged In": string;
  "Fun Fact": string;
  "Number of Requests Left": number;
  Country: string;
  "Is Decentralized": boolean;
}

const userData: IUserInfo = {
  Avatar: "https://robohash.org/test",
  Username: "novigo.ali@gmail.com",
};
const dashboardData: any = {
  "Number of Requests Made": 8,
  "Most Recent Prompt Result": "Test 123 test 123 test 123",
  "Last Logged In": new Date().toString(),
  "Fun Fact": "I love to code",
  "Number of Requests Left": 4992,
  Country: "JO",
  //   "Is Decentralized": false,
};

interface TileProps {
  title: string;
  content: string;
}
interface DashboardProps {
  tiles: TileProps[];
}

const Tile = ({ title, content }: TileProps) => {
  const isCountryTile = title === DashboardDataKeys.Country;
  const getContentTypography = () => {
    if (title === DashboardDataKeys.NumberOfRequestsMade) return "h1";
    if (title === DashboardDataKeys.NumberOfRequestsLeft) return "h1";
    if (title === DashboardDataKeys.MostRecentPromptResult) return "body1";
    if (title === DashboardDataKeys.LastLoggedIn) return "h6";
    if (title === DashboardDataKeys.FunFact) return "h6";
    if (title === DashboardDataKeys.Country) return "h6";
  };

  const getContentColor = () => {
    if (
      title === DashboardDataKeys.NumberOfRequestsLeft &&
      parseInt(content) < 250
    )
      return "red";
    if (
      title === DashboardDataKeys.NumberOfRequestsLeft &&
      parseInt(content) > 1000
    )
      return "green";
    return "black";
  };

  const linkedItems = [
    DashboardDataKeys.NumberOfRequestsMade,
    DashboardDataKeys.MostRecentPromptResult,
  ];

  return (
    <Paper
      sx={{
        height: 300,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        ":hover": linkedItems.includes(title as DashboardDataKeys)
          ? {
              cursor: "pointer",
              opacity: 0.8,
              transition: "opacity 0.5s ease-in-out",
              boxShadow: 1,
            }
          : {},
      }}
    >
      <Typography variant="h4">{title}</Typography>
      {isCountryTile ? (
        <Suspense fallback={<CircularProgress />}>
          <img
            src={`https://flagcdn.com/160x120/${content.toLowerCase()}.png`}
            loading="lazy"
            style={{ marginTop: 10 }}
            width="200"
            height="150"
            alt={content}
          />
        </Suspense>
      ) : (
        <Typography
          sx={{ color: getContentColor() }}
          variant={getContentTypography()}
        >
          {content}
        </Typography>
      )}
    </Paper>
  );
};

const Dashboard = ({ tiles }: DashboardProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 2,
      }}
      paddingY={5}
    >
      <Stack sx={{ height: 200, width: 200, marginX: "auto", marginY: 2 }}>
        <Avatar
          sx={{ height: "90%", width: "90%" }}
          alt="Dashboard Avatar"
          src={userData["Avatar"]}
        />
        <Typography variant="h6">{userData["Username"]}</Typography>
      </Stack>
      <Grid container spacing={2}>
        {Object.keys(dashboardData).map((k: string, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Tile title={k} content={dashboardData[k] as string} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
