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


export const WorkPage = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const [ searchField, setSearchField ] = useState("display_name")
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
          style={{width: "10vw", height: "42px", marginRight: "2vw"}}
          onChange={handleSearchFieldChange}
        >
          <MenuItem value={"display_name"}>title</MenuItem>
          <MenuItem value={"description"}>doi</MenuItem>
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
    navigate("/work_result", {state:{key:searchKey, field: searchField}})
  }



  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap marginLeft={2} component="div" color="black" fontFamily="monospace">
            Work
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        marginTop={12}
        minWidth="84vw"
      >
        <Typography variant="h4" component="div" sx={{mt:10, mb:6}} fontFamily="monospace"> 
          Start exploring works
        </Typography>
        <SearchBar/>
        
      </Box>
    </Box>
  );
}
