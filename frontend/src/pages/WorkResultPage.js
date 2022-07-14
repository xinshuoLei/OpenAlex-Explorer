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
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { ConceptCard } from '../components/ConceptCard';
import { fontFamily } from '@mui/system';
import { WorkCard } from '../components/WorkCard';

export const WorkResultPage = () => {
    const searchResult = [{display_name: "Work 1", id: "work1", author: "Author 1"},
                          {display_name: "Work 2", id: "work2", author: "Author 2, Author 4"},
                          {display_name: "Work 3", id: "work3", author: "Author 3"},
                          {display_name: "Work 4", id: "work4", author: "Author 1"},
                          {display_name: "Work 5", id: "work5", author: "Author 6, Author 2, Author 9"},
                          {display_name: "Work 6", id: "work6", author: "Author 8"},
                          {display_name: "Work 7", id: "work7", author: "Author 4"},
                          {display_name: "Work 8", id: "work8", author: "Author 3"},
                          {display_name: "Work 9", id: "work9", author: "Author 9"},
                          {display_name: "Work 10", id: "work10", author: "Author 10"}]

    const workTypes = [{id:"book-section",label:"Book Section"}, {id:"monograph",label:"Monograph"},
                       {id:"report",label:"Report"},{id:"peer-review",label:"Peer Review"},
                       {id:"book-track",label:"Book Track"},{id:"journal-article",label:"Journal Article"},
                       {id:"book-part",label:"Part"},{id:"other",label:"Other"},{id:"book",label:"Book"},
                       {id:"journal-volume",label:"Journal Volume"},{id:"book-set",label:"Book Set"},
                       {id:"reference-entry",label:"Reference Entry"},{id:"proceedings-article",label:"Proceedings Article"},
                       {id:"journal",label:"Journal"},{id:"component",label:"Component"},
                       {id:"book-chapter",label:"Book Chapter"},{id:"proceedings-series",label:"Proceedings Series"},
                       {id:"report-series",label:"Report Series"},{id:"proceedings",label:"Proceedings"},
                       {id:"standard",label:"Standard"},{id:"reference-book",label:"Reference Book"},
                       {id:"posted-content",label:"Posted Content"},{id:"journal-issue",label:"Journal Issue"},
                       {id:"dissertation",label:"Dissertation"},{id:"grant",label:"Grant"},{id:"dataset",label:"Dataset"},
                       {id:"book-series",label:"Book Series"},{id:"edited-book",label:"Edited Book"},
                       {id:"standard-series",label:"Standard Series"}]

    const location = useLocation();
    const key = location.state.key;

    const [sortField, setSortField] = useState("relevant")
    const handleSortFieldChange = (event) => {
      setSortField(event.target.value);
    };

    const [type, setType] = useState("any")
    const handleTypeChange = (event) => {
      setType(event.target.value);
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
                Work Search Result
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
                      searchResult.map(x => <WorkCard
                                              name={x.display_name} 
                                              id={x.id}
                                              author={x.author? x.author : "author info unavailable"}/>)
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
                      <InputLabel id="demo-simple-select-label" >Sort by</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sort by"
                        value={sortField}
                        style={{width: "14vw", height: "5.5vh", fontSize: 14}}
                        onChange={handleSortFieldChange}
                      >
                        <MenuItem value={"relevant"}>Most Relevant</MenuItem>
                        <MenuItem value={"date_asc"}>Publication date: ascending</MenuItem>
                        <MenuItem value={"date_des"}>Publication date: descending</MenuItem>
                        <MenuItem value={"work_asc"}>Works count: ascending</MenuItem>
                        <MenuItem value={"work_des"}>Works count: descending</MenuItem>
                        <MenuItem value={"cited_asc"}>Cited by count: ascending</MenuItem>
                        <MenuItem value={"cited_des"}>Cited by count: descending</MenuItem>
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
                    <Typography fontFamily="monospace" marginTop={5} marginBottom={2}>Type</Typography>
                    <FormControl>
                      <Select
                        id="demo-simple-select"
                        style={{width: "14vw", height: "5.5vh", fontSize: 14}}
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <MenuItem value={"any"}>Any</MenuItem>
                        {workTypes.map(x => <MenuItem value={x.id}>
                                              {x.label}
                                            </MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label={<Typography fontFamily="monospace">retracted</Typography>} 
                      sx={{marginTop: 3}}/>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label={<Typography fontFamily="monospace">paratext</Typography>} 
                      sx={{marginTop: 1}}/>
                    <Button variant='outlined' sx={{marginTop:10, width: "14vw"}}>Apply filters</Button>
                  </Box>
                </Box>
            </Box>
            
        </List>
        
        </ Box>
    )

}