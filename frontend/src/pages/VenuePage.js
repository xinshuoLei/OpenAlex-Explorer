import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
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


export const VenuePage = () => {

  const navigate = useNavigate();
  const popularVenues = [{display_name: "Venue 1", id: "venue1"}, 
                         {display_name: "Venue 2", id: "venue2"}, 
                         {display_name: "Venue 3", id: "venue3"},
                         {display_name: "Venue 4", id: "venue4"},
                         {display_name: "Venue 5", id: "venue5"}]

  const { register, handleSubmit } = useForm()
  const [ searchField, setSearchField ] = useState("")
  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const SearchBar = () => (
    <form onSubmit={handleSubmit(performSearch)}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" style={{marginTop: -6}}>Search field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Search field"
          value={searchField}
          style={{width: "10vw", height: "5.5vh", marginRight: "2vw"}}
          onChange={handleSearchFieldChange}
        >
          <MenuItem value={"display_name"}>name</MenuItem>
          <MenuItem value={"issn"}>ISSN</MenuItem>
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
    navigate("/venue_result", {state:{key:searchKey}})
  }



  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace">
            Venue
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="84vw"
      >
        <Typography variant="h4" component="div" sx={{mt:10, mb:6}} fontFamily="monospace"> 
          Start exploring venues
        </Typography>
        <SearchBar/>
        <Box display="flex" flexDirection="row">
          <Box sx={{boxShadow: 4,
                    mt: 5, 
                    mb: 5,
                    borderRadius: 2, 
                    height: "55vh", 
                    width: "25vw", 
                    display: "flex",
                    flexDirection: "column"}}>
            <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Trending venues</Typography>
            {popularVenues? 
             popularVenues.map(x => <Link
                                        fontFamily="monospace"
                                        fontSize={14}
                                        ml = "2vw"
                                        marginBottom={1}
                                        underline="hover"
                                        onClick={() => navigate(`/venue_info/${x.id.replace("https://openalex.org/", "")}`)}
                                      >	• {x.display_name}
                                      </Link>)
            : <Typography
                fontFamily="monospace"
                fontSize={14}
                mx="auto"
                marginBottom={1}>
                Loading
              </Typography>}
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
}
