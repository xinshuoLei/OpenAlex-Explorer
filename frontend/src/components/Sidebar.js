import * as React from 'react';
import {
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
} from '@mui/material'
import Image from 'mui-image'
import logo from '../images/OpenAlex-logo.png'
import lightbulb from '../images/lightbulb.png'
import paper from '../images/paper.png'
import group from '../images/group.png'
import school from '../images/school.png'
import books from '../images/books.png'
import { useNavigate } from 'react-router-dom';

const drawerWidth = "16vw";

export const Sidebar = () => {
    const navigate = useNavigate(); 
    const toWorkPage = () => { 
        navigate("/work");
    }
    const toConceptPage = () => {
        navigate("/concept")
    }
    const toAuthorPage = () => {
        navigate("/author")
    }
    const toVenuePage = () => {
        navigate("/venue")
    }
    const toInstituionPage = () => {
        navigate("/institution")
    }


    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      > 
        <Typography variant="h5" component="div" sx={{mt:2, ml:4}} fontFamily="monospace">
            Exploring
        </Typography>
        <Image src={logo} height="10%" fit="contain" duration={0}/>
        <Divider />
        <List>
            <ListItem key="work" disablePadding>
              <ListItemButton onClick={toWorkPage}>
                <Image src={paper} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}} duration={0}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Work</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="concept" disablePadding>
              <ListItemButton onClick={toConceptPage}>
                <Image src={lightbulb} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}} duration={0}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Concept</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="author" disablePadding>
              <ListItemButton onClick={toAuthorPage}>
                <Image src={group} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}} duration={0}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Author</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="venue" disablePadding>
              <ListItemButton onClick={toVenuePage}>
                <Image src={books} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}} duration={0}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Venue</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="institution" disablePadding>
              <ListItemButton onClick={toInstituionPage}>
                <Image src={school} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}} duration={0}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Institution</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
        </List>
      </Drawer>
    );
}

