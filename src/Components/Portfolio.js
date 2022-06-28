import React, { useState, useLayoutEffect, useRef } from "react";
import { Grid, Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavBar from "./NavBar/NavBar";
import DrawerComponent from "./NavBar/MobileNav/DrawerComponent";
import Home from "./Home/Home";
import { myData } from "../profiledata";
import About from "./About/About";
import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import Contact from "./Contact/Contact";
import Work from "./Work/Work";

const Div = styled.div`
  width: 100vw;
  height: auto !important;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 25px;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: ease-out 1.5s;
`;

const useStyles = makeStyles(() => ({
  root: {
    Width: "100vw",
  },
  cont: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#b2beb5",
    display: "flex",
    flexDirection: "column",
  },
}));

const Portfolio = () => {
  const classes = useStyles();

  const theme = useTheme();

  const { job, name, projects, mySkills } = myData;

  const [display, setDisplay] = useState({
    services: false,
    skills: false,
    work: false,
    contact: false,
  });

  const [active, setActive] = useState(0);

  const [navFixed, setNavFixed] = useState(false);

  const [featuredProjects, setFeaturedProjects] = useState(projects);

  const services = useRef(null),
    skills = useRef(null),
    work = useRef(null),
    contactForm = useRef(null);

  const handleActiveLink = (index) => {
    setActive(index);
  };

  useLayoutEffect(() => {
    const topPosition = (element) => element.offsetTop;
    const displayElement = (element, elementIndex) => {
      setDisplay((state) => ({ ...state, [element]: true }));
      setActive(elementIndex);
    };

    const servicesTop = topPosition(services.current),
      skillsTop = topPosition(skills.current),
      workTop = topPosition(work.current),
      contactFormTop = topPosition(contactForm.current);

    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      console.log(scrollPosition, servicesTop);

      if (scrollPosition > 1000) {
        setNavFixed(true);
      }

      if (scrollPosition < 1000) {
        setNavFixed(false);
        setActive(0);
      }

      if (servicesTop + 300 < scrollPosition) {
        displayElement("services", 1);
      }

      if (workTop + 300 < scrollPosition) {
        displayElement("work", 2);
      }

      if (skillsTop + 200 < scrollPosition) {
        displayElement("skills", 3);
      }
      if (contactFormTop + 200 < scrollPosition) {
        displayElement("contact", 4);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container className={classes.root}>
      <Box className={classes.cont} id="home">
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <NavBar
            activeLink={active}
            handleLink={handleActiveLink}
            fixedNav={navFixed}
          />
        )}
        <Home name={name} jobTitle={job} />
      </Box>
      <Div animate={display.services} id="services" ref={services}>
        <SectionHeader text="What" spanText="I Do" />
        <About about={mySkills} />
      </Div>
      <Div animate={display.work} id="projects" ref={work}>
        <SectionHeader text="Featured" spanText="Projects" />
        <Work projects={featuredProjects} />
      </Div>
      <Div animate={display.skills} id="skills" ref={skills}>
        <SectionHeader text="My" spanText="Skills" />
        <About about={mySkills} />
      </Div>
      <Div animate={display.contact} id="contact" ref={contactForm}>
        <SectionHeader text="Contact" spanText="Me" />
        <Contact />
      </Div>
    </Grid>
  );
};

export default Portfolio;
