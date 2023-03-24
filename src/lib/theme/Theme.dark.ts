import { black, white } from "./Theme";
import { Colors } from "./Theme.styled";

const darkTheme = (): Colors => {
  return {
    darkMode: true,
    white,
    black,

    // Background
    bg1: "#1A1A1A",
    bg2: "#303030",
    bg3: "#404040",

    // Text
    text1: "#F5F5F5",
    text2: "#C9C9C9",
    text3: "#1A73E8",

    // Border
    border1: "#585858",
    border2: "#686868",
    border3: "#1A73E8",

    // Button
    btn1: "#1A73E8",
    btn2: "#404040",

    red: "#FF4343",
    yellow: "#E3A507",

    // Icons
    icon1: "#D9D9D9",
    icon2: "#D9D9D9",

    // Hover1
    hover1: "#3b3a3a",
  };
};

export default darkTheme;
