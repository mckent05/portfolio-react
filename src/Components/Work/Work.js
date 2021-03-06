import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FilterBtn from "./FilterBtn";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    rowGap: 25,
  },
  btnContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    rowGap: 10,
    justifyContent: "space-around",
    margin: "0 auto 50px auto",
    [theme.breakpoints.up("lg")]: {
      width: "70%",
    },
  },
  root: {
    position: "relative",
    width: "98%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 0",
    margin: "0 auto",
    rowGap: 15,
    transition: "ease-in 0.5s",
    [theme.breakpoints.up("lg")]: {
      flexWrap: "wrap",
      flexDirection: "row",
      alignSelf: "center",
      columnGap: 15,
      rowGap: 25,
    },
  },
  btnControl: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 25,
  },
  controlBtn: {
    width: "40%",
    position: "relative",
    padding: "10px 0",
    backgroundColor: "#0b0b45",
    color: "#fff",
    outline: "none",
    border: "none",
    cursor: "pointer",
  },

  disabledBtn: {
    backgroundColor: "grey",
    opacity: 0.5,
    cursor: "not-allowed",
    color: "#0b0b45",
  },
}));

const Work = ({ allProjects, isMobile }) => {
  const classes = useStyles();

  const [filterTech, setFilterTech] = useState([]);

  const [limit, setLimit] = useState({ lowerLimit: 0, upperLimit: 3 });

  const [projects, setProjects] = useState(allProjects);

  const viewMoreProjects = () => {
    setLimit((state) => ({ ...state, upperLimit: state.upperLimit + 3 }));
  };

  const viewLessProjects = () => {
    setLimit((state) => ({ ...state, upperLimit: state.upperLimit - 3 }));
  };

  const [activeButton, setActiveButton] = useState("all");

  const getFilterButtons = (projectsArray) => {
    const getTech = projectsArray.reduce(
      (acc, value) => {
        value.tech.forEach((skill) => {
          if (!acc.includes(skill)) {
            acc.push(skill);
          }
        });
        return acc;
      },
      ["all"]
    );
    setFilterTech(getTech);
  };

  const filterProjects = (techName) => {
    if (techName !== "all") {
      const filteredProjects = allProjects.filter((project) =>
        project.tech.includes(techName)
      );
      setProjects(filteredProjects);
    } else {
      setProjects(allProjects);
    }
    setActiveButton(techName);
  };

  useEffect(() => {
    getFilterButtons(allProjects);
  }, [allProjects]);

  return (
    <Box>
      <Box className={classes.btnContainer}>
        {filterTech.map((tech) => (
          <FilterBtn
            title={tech}
            filter={filterProjects}
            active={activeButton}
            key={tech}
          />
        ))}
      </Box>
      <Box className={classes.root}>
        {isMobile
          ? projects
              .slice(limit.lowerLimit, limit.upperLimit)
              .map((project, index) => (
                <ProjectCard
                  title={project.title}
                  details={project.description}
                  img={project.image}
                  skills={project.tech}
                  live={project.live}
                  github={project.source}
                  index={index}
                  key={project.title}
                />
              ))
          : projects.map((project, index) => (
              <ProjectCard
                title={project.title}
                details={project.description}
                img={project.image}
                skills={project.tech}
                key={project.title}
                live={project.live}
                github={project.source}
                index={index}
              />
            ))}
      </Box>
      {isMobile && (
        <Box>
          {projects.length >= 3 && (
            <Box className={classes.btnControl}>
              <button
                disabled={limit.upperLimit <= 3 && true}
                onClick={() => viewLessProjects()}
                className={
                  limit.upperLimit <= 3
                    ? `${classes.controlBtn} ${classes.disabledBtn}`
                    : classes.controlBtn
                }
              >
                view less
              </button>
              <button
                disabled={limit.upperLimit >= projects.length && true}
                onClick={() => viewMoreProjects()}
                className={
                  limit.upperLimit >= projects.length
                    ? `${classes.controlBtn} ${classes.disabledBtn}`
                    : classes.controlBtn
                }
              >
                view more
              </button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Work;
