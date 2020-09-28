import React, { useState, useEffect, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectContext from '../../context/projects/ProjectContext';
import { v4 as uuidv4 } from 'uuid';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const SidebarDrawer = () => {
    const classes = useStyles();
    const [newProject, setNewProject] = useState(false);
    const [newInput, setNewInput] = useState("");
    const [inputError, setInputError] = useState("");

    const { projects, setProjects, setActiveProject } = useContext(ProjectContext);

    useEffect(() => {
        if (newProject) {
            document.getElementById("project-input-field").focus();
        }
    }, [newProject]);

    const projectSubmitHandler = (e) => {
        e.preventDefault();

        // empty project name
        if (!newInput) {
            return setInputError("The project name cannot be left empty");
        }

        let double = false;

        // project already exists
        if (projects) {
            double = projects.some(existingProject => existingProject.name === newInput);
        }

        if (double) {
            setInputError("A project with this name already exists");
        } else {
            setProjects([
                { name: newInput, id: uuidv4() },
                ...projects,
            ]);

            setInputError("");
            setNewInput("");
            setNewProject(false);
        }
    };

    const selectProjectHandler = (project) => {
        // change active project
        setActiveProject(project);
    };

    return (
        <div>
            <Box className={classes.toolbar} display="flex" alignItems="center" justifyContent="center">
                <Typography color="primary" variant="h5"><span style={{ fontWeight: "bold" }}>MERN</span>Tasks</Typography>
            </Box>
            <Divider />
            <Button onClick={() => setNewProject(true)} className="mx-auto mt-4 d-block col-10" size="large" variant="contained" color="primary">
                New Project
            </Button>
            {newProject &&
                <form onSubmit={projectSubmitHandler}>
                    <TextField id="project-input-field" value={newInput} onChange={e => setNewInput(e.target.value)} size="small" className="mx-auto mt-5 d-block col-10" label="Project name" variant="outlined"></TextField>
                    <Button type="submit" className="mx-auto mt-2 d-block col-10" size="large" variant="contained" color="primary">
                        Add this Project
                    </Button>
                </form>
            }
            {inputError &&
                <Typography className="mt-2 mx-4" color="error">{inputError}</Typography>
            }
            <Typography className="mt-5 mb-3" align="center" variant="h6" color="primary">Your projects</Typography>
            <TransitionGroup>
                {projects && projects.map(project => (
                    <CSSTransition
                        key={project.id}
                        timeout={200}
                    >
                        <Button onClick={() => selectProjectHandler(project)}  color="primary" className="mb-2 mx-auto d-block text-left col-10">{project.name}</Button>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default SidebarDrawer;