import React, { useState, useLayoutEffect, useRef } from "react";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
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
import Skills from "./Skills/Skills";

const createDiv = (hexColor) => {
  const Div = styled.section`
    width: 100vw;
    height: auto !important;
    background-color: #${hexColor};
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 25px;
    transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
    transition: ease-out 1.5s;
  `;
  return Div;
};

const ServiceDiv = createDiv("f2f2f2"),
  ProjectDiv = createDiv("e5e5e5");

const useStyles = makeStyles(() => ({
  root: {
    Width: "100vw",
  },
  cont: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#ccc",
    display: "flex",
    flexDirection: "column",
  },
}));

const Portfolio = () => {
  const classes = useStyles();

  const theme = useTheme();

  const { job, name, projects, mySkills, socialLinks, tools } = myData;

  const [display, setDisplay] = useState({
    services: false,
    skills: false,
    work: false,
    contact: false,
  });

  const [active, setActive] = useState(0);

  const [navFixed, setNavFixed] = useState(false);

  const [featuredProjects] = useState(projects);

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

      if (scrollPosition > 1000) {
        setNavFixed(true);
      }

      if (scrollPosition <= window.innerHeight) {
        setNavFixed(false);
        setActive(0);
      }

      if (servicesTop + 300 <= scrollPosition) {
        displayElement("services", 1);
      }
      if (skillsTop + 300 <= scrollPosition) {
        displayElement("skills", 2);
      }

      if (workTop + 300 <= scrollPosition) {
        displayElement("work", 3);
      }

      if (contactFormTop + 300 <= scrollPosition) {
        displayElement("contact", 4);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container className={classes.root}>
      <header className={classes.cont} id="home">
        {isMobile ? (
          <DrawerComponent social={socialLinks} />
        ) : (
          <NavBar
            activeLink={active}
            handleLink={handleActiveLink}
            fixedNav={navFixed}
          />
        )}
        <Home name={name} jobTitle={job} />
      </header>
      <ServiceDiv animate={display.services} id="services" ref={services}>
        <SectionHeader text="What" spanText="I Do" />
        <About about={mySkills} />
      </ServiceDiv>
      <ProjectDiv animate={display.skills} id="about" ref={skills}>
        <SectionHeader text="About" spanText="Me" />
        <Skills skills={tools} />
      </ProjectDiv>
      <ServiceDiv animate={display.work} id="projects" ref={work}>
        <SectionHeader text="" spanText="Projects" />
        <Work allProjects={featuredProjects} isMobile={isMobile} />
      </ServiceDiv>
      <ProjectDiv animate={display.contact} id="contact" ref={contactForm}>
        <SectionHeader text="Contact" spanText="Me" />
        <Contact contact={socialLinks} />
      </ProjectDiv>
    </Grid>
  );
};

export default Portfolio;
