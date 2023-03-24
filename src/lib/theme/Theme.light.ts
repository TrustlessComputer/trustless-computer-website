import { black, white } from "./Theme";
import { Colors } from "./Theme.styled";

const lightTheme = (): Colors => {
  return {
    darkMode: false,
    white,
    black,

    // Background
    bg1: "#EFEFEF",
    bg2: white,
    bg3: "#F8F8F8",

    // Text
    text1: black,
    text2: "#BFBFBF",
    text3: "#9C9C9C",

    // Border
    border1: "#e3e2e2",
    border2: "#F2F4F5",
    border3: "#1A73E8",

    // Button
    btn1: "#282828",
    btn2: white,

    red: "#FF4343",
    yellow: "#E3A507",

    // Icons
    icon1: black,
    icon2: "#BFBFBF",

    // Hover1
    hover1: "#D9D9D9",
  };
};

export default lightTheme;
