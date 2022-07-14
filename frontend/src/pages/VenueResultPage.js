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
import { VenueCard } from '../components/VenueCard';

export const VenueResultPage = () => {
    const searchResult = [{display_name: "Venue 1", id: "venue1", publisher: "unknown publisher"},
                          {display_name: "Venue 2", id: "venue2", publisher: "unknown publisher"},
                          {display_name: "Venue 3", id: "venue3", publisher: "unknown publisher"},
                          {display_name: "Venue 4", id: "venue4", publisher: "unknown publisher"},
                          {display_name: "Venue 5", id: "venue5", publisher: "unknown publisher"},
                          {display_name: "Venue 6", id: "venue6", publisher: "unknown publisher"},
                          {display_name: "Venue 7", id: "venue7", publisher: "unknown publisher"},
                          {display_name: "Venue 8", id: "venue8", publisher: "unknown publisher"},
                          {display_name: "Venue 9", id: "venue9", publisher: "unknown publisher"},
                          {display_name: "Venue 10", id: "venue10", publisher: "unknown publisher"},]
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
                Venue Search Result
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
                      searchResult.map(x => <VenueCard
                                              name={x.display_name} 
                                              id={x.id}
                                              publisher={x.publisher? x.publisher : "no publisher info available for this venue"}/>)
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
                    <Typography fontFamily="monospace" marginTop={5}>Publisher</Typography>
                    <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                      <TextField
                        id="date"
                        label="publisher"
                        size='small'
                        sx={{ width: 230, height:20, marginTop:2 }}
                      />
                    </Box>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label={<Typography fontFamily="monospace">oa</Typography>} 
                      sx={{marginTop: 6}}/>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label={<Typography fontFamily="monospace">in doaj</Typography>} 
                      sx={{marginTop: 1}}/>
                    <Button variant='outlined' sx={{marginTop:10, width: "14vw"}}>Apply filters</Button>
                  </Box>
                </Box>
            </Box>
            
        </List>
        
        </ Box>
    )

}