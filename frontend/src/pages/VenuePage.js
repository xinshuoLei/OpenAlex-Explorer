import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Tabs,
  Tab,
  InputLabel,
  MenuItem,
  Select,
  Link,
  TextField,
  FormControl,
} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { VenueCard } from '../components/VenueCard'


export const VenuePage = () => {

  const navigate = useNavigate();
  const [ popularVenues, setPopularVenues ] = useState(false)

  const { register, handleSubmit } = useForm()
  const [ searchField, setSearchField ] = useState("display_name")
  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const [ tabValue, setTabValue ] = useState("search")
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    getPopularVenues();
  }, []);

  const getPopularVenues = () => {
    fetch( `http://localhost:3001/trending_venues`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setPopularVenues(JSON.parse("[" + data + "]")[0]);
      });
  }

  const SearchBar = () => (
    <form onSubmit={handleSubmit(performSearch)}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" style={{marginTop: -6}}>Search field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Search field"
          value={searchField}
          style={{width: "10vw", height: "42px", marginRight: "2vw"}}
          onChange={handleSearchFieldChange}
        >
          <MenuItem value={"display_name"}>name</MenuItem>
          <MenuItem value={"issn_l"}>ISSN-L</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="search-bar"
        className="text"
        variant="outlined"
        placeholder="Search..."
        size="small"
        style = {{width: "30vw", height: "7vh"}}
        {...register("key")}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "black" }} />
      </IconButton>
    </form>
  );

  const performSearch = (data) => {
    console.log(data.key)
    const searchKey = data.key;
    navigate("/venue_result", {state:{key:searchKey, field:searchField}})
  }



  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
      >
        <Toolbar>
          <Box display='flex' flexGrow={1}>
              <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace">
                Venue
              </Typography>
          </Box>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Search" value={"search"} sx={{textTransform: "none", fontFamily: "monospace", fontSize: 16}}/>
            <Tab label="Trending Venues" value={"trending"}  sx={{textTransform: "none", fontFamily: "monospace", fontSize: 16}}/>
         </Tabs>
        </Toolbar>
      </AppBar>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        minWidth="84vw"
      >
        
        {tabValue == "search" ? 
        (<>
          <Typography variant="h4" component="div" sx={{mt: 25, mb:6}} fontFamily="monospace"> 
            Start exploring venues
          </Typography>
          <SearchBar/>
        </>) 
        : 
        (<Box display="flex" flexDirection="column" marginTop={10} marginBottom={6} width="70vw">
          {popularVenues? 
           popularVenues.map(x => <VenueCard
                                    name={x.display_name} 
                                    id={x.id}
                                    publisher={x.publisher? x.publisher : "publisher info unavailable"} />)
          : <Typography
              fontFamily="monospace"
              fontSize={14}
              mx="auto"
              marginBottom={1}>
              Loading
            </Typography>}
      </Box>)}
        
      </Box>
    </Box>
  );
}
