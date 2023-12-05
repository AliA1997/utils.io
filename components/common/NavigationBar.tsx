import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  SxProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenActivateAccount,
  setOpenFinishAccount,
  setOpenLogin,
  setOpenSelectPlan,
  setOpenSignup,
  setOpenStripe,
} from "@redux/reducers/modalSlice";
import { PrimaryButton } from "./Buttons";
import { useSupabase } from "@contexts/supabaseContext";
import { UtilsIoStore } from "@redux/reducers";
import { Logo } from "@common/Containers";
import axios from "axios";
import Image from "next/image";

interface NavigationBarProps {
  title: string;
  links: { text: string; icon?: React.ReactNode; to: string }[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, links }) => {
  const dispatch = useDispatch();
  const { session, user, signOut, checkProfile } = useSupabase();

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const openLoginFunc = (val: boolean) => {
    dispatch(setOpenLogin(val));
    router.push("/login");
  };
  const openSignupFunc = (val: boolean) => {
    dispatch(setOpenSignup(val));
    router.push("/create-account");
  };
  // const { currentSubscriptionData } = useSelector((state: UtilsIoStore) => state.auth);
  // const sessionAccessToken = session ? session?.access_token : '';
  useEffect(() => {
    console.log("user:", user);
    if (user) {
      checkProfile(user?.email!);
      dispatch(setOpenLogin(false));
      dispatch(setOpenSignup(false));
    }
  }, [window.location.href]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const renderDesktopNavbar = () => (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar sx={toolbarStyles}>
        <Logo />
        <div>
          {/* {links.map((link, index) => (
            <PrimaryButton
              key={index}
              onClick={() => {
                router.push(link.to);
              }}
              sx={buttonStyles}
            >
              {link.text}
            </PrimaryButton>
          ))} */}
          {session ? (
            <>
              <PrimaryButton
                sx={{ ...buttonStyles(false), width: 150 }}
                onClick={signOut}
              >
                Sign Out
              </PrimaryButton>
              {/* <Avatar alt={user?.email} src={user?.avatar_url} /> */}
            </>
          ) : (
            <>
              <PrimaryButton
                sx={buttonStyles(false)}
                onClick={() => openLoginFunc(true)}
              >
                Login
              </PrimaryButton>
              <PrimaryButton
                sx={buttonStyles(false)}
                onClick={() => openSignupFunc(true)}
              >
                Signup
              </PrimaryButton>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );

  const renderMobileNavbar = () => (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar sx={toolbarStyles}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={iconButtonStyles}
        >
          <MenuIcon color="secondary" />
        </IconButton>
        <Logo />
      </Toolbar>
    </AppBar>
  );

  const renderMobileDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List sx={listStyles}>
        {session ? (
          <>
            <PrimaryButton
              sx={{ ...buttonStyles, width: 150 }}
              onClick={signOut}
            >
              Sign Out
            </PrimaryButton>
            {/* <Avatar alt={user?.email} src={user?.avatar_url} /> */}
          </>
        ) : (
          <>
            <PrimaryButton
              sx={buttonStyles(true)}
              onClick={() => openLoginFunc(true)}
            >
              Login
            </PrimaryButton>
            <PrimaryButton
              sx={buttonStyles(true)}
              onClick={() => openSignupFunc(true)}
            >
              Signup
            </PrimaryButton>
          </>
        )}
      </List>
      {/* {links.map((link, index) => (
          <ListItem
            key={index}
            onClick={() => {
              toggleDrawer(false);
              router.push(link.to);
            }}
            sx={listItemStyles}
          >
            {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
            <ListItemText primary={link.text} sx={linkTextStyles} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          {renderMobileNavbar()}
          {renderMobileDrawer()}
        </React.Fragment>
      ) : (
        renderDesktopNavbar()
      )}
    </React.Fragment>
  );
};

const appBarStyles: SxProps = {
  backgroundColor: "transparent",
  paddingY: 1,
  width: "100vw !important",
};

const toolbarStyles: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

const iconButtonStyles: SxProps = {
  marginRight: "16px",
};

const titleStyles: SxProps = {
  flexGrow: 0.25,
  // width: '25px',
  backgroundColor: "green",
  color: "#fff",
  textAlign: "center",
  fontFamily: "Poppins",
};

const buttonStyles = (isMobile: boolean): SxProps => ({
  color: "#7248EE",
  fontFamily: "Poppins",
  width: isMobile ? 200 : 100,
  backgroundColor: "transparent",
  border: "solid 2px #7248EE",
  borderRadius: 10,
  marginLeft: "10px",
  marginRight: "10px",
});

const listStyles: SxProps = {
  width: "60vw",
};

const listItemStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
};

const linkTextStyles: SxProps = {
  color: "#333",
  textDecoration: "none",
  fontFamily: "Poppins",
};

export default NavigationBar;
