import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  List,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  TextField,
  Button,
} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { WorkCard } from '../components/WorkCard';
import { ConceptCard } from '../components/ConceptCard';

export const ConceptResultPage = () => {
    const searchResult = [{display_name: "Concept 1", id: "concept1"},
                          {display_name: "Concept 2", id: "concept2"},
                          {display_name: "Concept 3", id: "concept3"},
                          {display_name: "Concept 4", id: "concept4"},
                          {display_name: "Concept 5", id: "concept5"},
                          {display_name: "Concept 6", id: "concept6"},
                          {display_name: "Concept 7", id: "concept7"},
                          {display_name: "Concept 8", id: "concept8"},
                          {display_name: "Concept 9", id: "concept9"},
                          {display_name: "Concept 10", id: "concept10"},]
    const location = useLocation();
    const key = location.state.key;

    const [sortField, setSortField] = useState("relevant")
    const handleSortFieldChange = (event) => {
      setSortField(event.target.value);
    };
  

    return (
        <Box sx={{ display: 'flex'}} >
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
        >
            <Toolbar>
            <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace">
                Concept Search Result
            </Typography>
            </Toolbar>
        </AppBar>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minHeight="100vh"
                minWidth="84vw"
                marginTop={12}
                marginBottom={10}
            >   
                  <Typography variant="h5" fontFamily="monospace">Seach results for "{key}"</Typography>
                  <Box display="flex" flexDirection="row" justifyContent="center" width="100%">
                    <Box width="40vw">
                      {searchResult? 
                      searchResult.map(x => <ConceptCard
                                              name={x.display_name} 
                                              id={x.id}
                                              description={x.description? x.description : "no description available for this concept"}/>)
                      : <Typography
                          fontFamily="monospace"
                          fontSize={14}
                          mx="auto"
                          marginTop={5}
                          marginBottom={1}>
                          Loading...
                        </Typography>}
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      height="85vh"
                      boxShadow={4}
                      marginTop={5}
                      py={5}
                      px={4}
                      marginLeft={10}
                  >   
                    <FormControl>
                      <InputLabel id="demo-simple-select-label" style={{marginTop: -6}}>Sort by</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sort by"
                        value={sortField}
                        style={{width: "14vw", height: "5.5vh", fontSize: 14}}
                        onChange={handleSortFieldChange}
                      >
                        <MenuItem value={"relevant"}>Most Relevant</MenuItem>
                        <MenuItem value={"date_asc"}>Updated date: ascending</MenuItem>
                        <MenuItem value={"date_des"}>Updated date: descending</MenuItem>
                        <MenuItem value={"work_asc"}>Works count: ascending</MenuItem>
                        <MenuItem value={"work_des"}>Works count: descending</MenuItem>
                        <MenuItem value={"cited_asc"}>Cited by count: ascending</MenuItem>
                        <MenuItem value={"cited_des"}>Cited by count: descending</MenuItem>
                        <MenuItem value={"level_asc"}>Concept level: ascending</MenuItem>
                        <MenuItem value={"level_des"}>Concept level: descending</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography fontFamily="monospace" marginTop={5}>Updated date</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="start year"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                       <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                      <TextField
                        id="date"
                        label="end year"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                    </Box>
                    <Typography fontFamily="monospace" marginTop={5}>Works count</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="min"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                       <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                      <TextField
                        id="date"
                        label="max"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                    </Box>
                    <Typography fontFamily="monospace" marginTop={5}>Cited by count</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="min"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                       <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                      <TextField
                        id="date"
                        label="max"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                    </Box>
                    <Typography fontFamily="monospace" marginTop={5}>Concept level</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="min"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                       <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                      <TextField
                        id="date"
                        label="max"
                        size='small'
                        sx={{ width: 100, height:20 }}
                      />
                    </Box>
                    <Button variant='outlined' sx={{marginTop:10, width: "14vw"}}>Apply filters</Button>
                  </Box>
                </Box>
            </Box>
            
        </List>
        
        </ Box>
    )

}