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
import { useForm } from 'react-hook-form'

export const ConceptResultPage = () => {

  const { register, handleSubmit } = useForm()
 
  const location = useLocation();
  const key = location.state.key;
  const searchField = location.state.field;

  const [searchResult, setSearchResult] = useState(false)
  const [filteredResult,  setFilteredResult] = useState(false)


  const [sortField, setSortField] = useState("relevant")
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
    const sortedResult = sortResult(searchResult, event.target.value)
    setFilteredResult(sortedResult)
    console.log(sortedResult.slice(0,10))
  };

  useEffect(() => {
    performSearch();
  }, []);

  const performSearch = () => {
    fetch( `http://localhost:3001/concept_result?key=${encodeURIComponent(key)}&field=${searchField}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setSearchResult(JSON.parse("[" + data + "]")[0]);
        setFilteredResult(JSON.parse("[" + data + "]")[0]);
      });
  }

  const filterResult = (data, e) => {
    console.log(data)
    const works_min = data.worksMin && data.worksMin.length != 0 ? parseInt(data.worksMin) : 0
    const works_max = data.worksMax && data.worksMax.length != 0 ? parseInt(data.worksMax) : Number.MAX_SAFE_INTEGER
    const cited_min = data.citedMin && data.citedMin.length != 0 ? parseInt(data.citedMin) : 0
    const cited_max = data.citedMax && data.citedMax.length != 0 ? parseInt(data.citedMax) : Number.MAX_SAFE_INTEGER
    const start_year = data.startYear && data.startYear.length != 0 ? parseInt(data.startYear) : 0
    const end_year = data.endYear && data.endYear.length != 0 ? parseInt(data.endYear) : Number.MAX_SAFE_INTEGER
    const level_min = data.levelMin && data.levelMin.length != 0 ? parseInt(data.levelMin) : 0
    const level_max = data.levelMax && data.levelMax.length != 0 ? parseInt(data.levelMax) : Number.MAX_SAFE_INTEGER
    const filtered = searchResult.filter(x =>    x.works_count >= works_min 
                                              && x.works_count <= works_max
                                              && x.cited_by_count >= cited_min
                                              && x.cited_by_count <= cited_max
                                              && x.level >= level_min
                                              && x.level <= level_max
                                              && x.updated_date.split("-")[0] >= start_year
                                              && x.updated_date.split("-")[0] <= end_year)
    console.log(filtered)
    setFilteredResult(sortResult(filtered, sortField))
    
  }

  const sortResult = (result, field) => {
    console.log(field)
    switch (field) {
      case "work_asc":
        return result.slice().sort((a, b) => (a.works_count > b.works_count ? 1 : -1))
      case "work_des":
        return result.slice().sort((a, b) => (a.works_count < b.works_count ? 1 : -1))
      case "cited_asc":
        return result.slice().sort((a, b) => (a.cited_by_count > b.cited_by_count ? 1 : -1))
      case "cited_des":
        return result.slice().sort((a, b) => (a.cited_by_count < b.cited_by_count ? 1 : -1))  
      case "date_asc":
        return result.slice().sort((a, b) => (a.updated_date > b.updated_date ? 1 : -1))
      case "date_des":
      return result.slice().sort((a, b) => (a.updated_date < b.updated_date ? 1 : -1))
      case "level_asc":
        return result.slice().sort((a, b) => (a.level > b.level ? 1 : -1))
      case "level_des":
        return result.slice().sort((a, b) => (a.level < b.level ? 1 : -1))    
      default: 
        return result;
    }
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
                      {filteredResult? 
                      filteredResult.map(x => <ConceptCard
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
                    <form onSubmit={handleSubmit(filterResult)}> 
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
                          {...register("startYear")}
                        />
                        <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                        <TextField
                          id="date"
                          label="end year"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("endYear")}
                        />
                      </Box>
                      <Typography fontFamily="monospace" marginTop={5}>Works count</Typography>
                      <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                        <TextField
                          id="date"
                          label="min"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("worksMin")}
                        />
                        <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                        <TextField
                          id="date"
                          label="max"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("worksMax")}
                        />
                      </Box>
                      <Typography fontFamily="monospace" marginTop={5}>Cited by count</Typography>
                      <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                        <TextField
                          id="date"
                          label="min"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("citedMin")}
                        />
                        <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                        <TextField
                          id="date"
                          label="max"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("citedMax")}
                        />
                      </Box>
                      <Typography fontFamily="monospace" marginTop={5}>Concept level</Typography>
                      <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                        <TextField
                          id="date"
                          label="min"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("levelMin")}
                        />
                        <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                        <TextField
                          id="date"
                          label="max"
                          size='small'
                          sx={{ width: 100, height:20 }}
                          {...register("levelMax")}
                        />
                      </Box>
                      <Button variant='outlined' sx={{marginTop:10, width: "14vw"}} type="submit">Apply filters</Button>
                    </form> 
                  </Box>
                </Box>
            </Box>
            
        </List>
        
        </ Box>
    )

}