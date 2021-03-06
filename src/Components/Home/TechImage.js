import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  imageCont: {
    width: 65,
    height: 65,
    backgroundColor: "#fff",
    boxShadow: '0 1px 1px #e5e5e5',
    borderRadius: "100%",
    "&:nth-of-type(1)": {
      position: "absolute",
      top: "15%",
      left: "15%",
    },
    "&:nth-of-type(2)": {
      position: "absolute",
      top: "15%",
      right: "15%",
    },
    "&:nth-of-type(3)": {
      position: "absolute",
      top: "80%",
      left: "10%",
    },
    "&:nth-of-type(4)": {
      position: "absolute",
      top: "80%",
      right: "10%",
    },
  },
  img: {
    position: "relative",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "100%",
  },
}));

const TechImage = ({ img }) => {
  const classes = useStyles();
  return (
    <Box className={classes.imageCont}>
      <img src={img} alt="tech-img" className={classes.img} />
    </Box>
  );
};

export default TechImage;
