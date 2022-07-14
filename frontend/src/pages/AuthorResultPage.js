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
import { AuthorCard } from '../components/AuthorCard';

export const AuthorResultPage = () => {
    const searchResult = [{display_name: "Author 1", id: "author1", institution: "Institution 1"},
                          {display_name: "Author 2", id: "author2", institution: "Institution 2"},
                          {display_name: "Author 3", id: "author3", institution: "Institution 3"},
                          {display_name: "Author 4", id: "author4", institution: "Institution 4"},
                          {display_name: "Author 5", id: "author5", institution: "Institution 5"},
                          {display_name: "Author 6", id: "author6", institution: "Institution 6"},
                          {display_name: "Author 7", id: "author7", institution: "Institution 7"},
                          {display_name: "Author 8", id: "author8", institution: "Institution 8"},
                          {display_name: "Author 9", id: "author9", institution: "Institution 9"},
                          {display_name: "Author 10", id: "author10", institution: "Institution 10"},]
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
                Author Search Result
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
                      searchResult.map(x => <AuthorCard
                                              name={x.display_name} 
                                              id={x.id}
                                              institution={x.institution? x.institution : "no institution available for this author"}/>)
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
                      height="70vh"
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
                        <MenuItem value={"work_asc"}>Works count: ascending</MenuItem>
                        <MenuItem value={"work_des"}>Works count: descending</MenuItem>
                        <MenuItem value={"cited_asc"}>Cited by count: ascending</MenuItem>
                        <MenuItem value={"cited_des"}>Cited by count: descending</MenuItem>
                      </Select>
                    </FormControl>
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
                    <Typography fontFamily="monospace" marginTop={5}>Last known institution</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="institution"
                        size='small'
                        sx={{ width: 230, height:20, marginTop:2 }}
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