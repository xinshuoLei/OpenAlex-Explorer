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
import { FormProvider, useForm } from 'react-hook-form'

export const WorkResultPage = () => {
  const [searchResult, setSearchResult] = useState(false)
  const [filteredResult,  setFilteredResult] = useState(false)

  const { register, handleSubmit } = useForm()

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
    const searchField = location.state.field;

    const [sortField, setSortField] = useState("relevant")
    const handleSortFieldChange = (event) => {
      setSortField(event.target.value);
      const sortedResult = sortResult(searchResult, event.target.value)
      setFilteredResult(sortedResult)
      console.log(sortedResult.slice(0,10))
    };

    const [type, setType] = useState("any")
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };

    useEffect(() => {
      performSearch();
    }, []);

    const sortResult = (result, field) => {
      console.log(field)
      switch (field) {
        case "cited_asc":
          return result.slice().sort((a, b) => (a.cited_by_count > b.cited_by_count ? 1 : -1))
        case "cited_des":
          return result.slice().sort((a, b) => (a.cited_by_count < b.cited_by_count ? 1 : -1)) 
        case "date_asc":
          return result.slice().sort((a, b) => (a.publication_year > b.publication_year ? 1 : -1))
        case "date_des":
          return result.slice().sort((a, b) => (a.publication_year < b.publication_year ? 1 : -1))  
        default: 
          return result;
      }
    }

    const filterResult = (data, e) => {
      console.log(data)
      const cited_min = data.citedMin && data.citedMin.length != 0 ? parseInt(data.citedMin) : 0
      const cited_max = data.citedMax && data.citedMax.length != 0 ? parseInt(data.citedMax) : Number.MAX_SAFE_INTEGER
      const start_year = data.startYear && data.startYear.length != 0 ? parseInt(data.startYear) : 0
      const end_year = data.endYear && data.endYear.length != 0 ? parseInt(data.endYear) : Number.MAX_SAFE_INTEGER
      const filter_type = type == "any" ? "" : type 
      const filtered = searchResult.filter(x =>   x.cited_by_count >= cited_min
                                                  && x.cited_by_count <= cited_max
                                                  && x.publication_year >= start_year
                                                  && x.publication_year <= end_year
                                                  && x.type 
                                                  && x.type.includes(filter_type)
                                                  && x.is_retracted == data.retracted
                                                  && x.is_paratext == data.paratext)
      console.log(filtered)
      setFilteredResult(sortResult(filtered, sortField))
    }
  
    const performSearch = () => {
      fetch( `http://localhost:3001/work_result?key=${encodeURIComponent(key)}&field=${searchField}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
          setSearchResult(JSON.parse("[" + data + "]")[0]);
          setFilteredResult(JSON.parse("[" + data + "]")[0]);
        });
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
                      {filteredResult? 
                      filteredResult.map(x => <WorkCard
                                              name={x.display_name} 
                                              id={x.id}
                                              type={x.type? x.type : "type info unavailable"}/>)
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
                          <MenuItem value={"cited_asc"}>Cited by count: ascending</MenuItem>
                          <MenuItem value={"cited_des"}>Cited by count: descending</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography fontFamily="monospace" marginTop={5}>Publication_year</Typography>
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
                      <Typography fontFamily="monospace" marginTop={5}>Cited by count</Typography>
                      <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                        <TextField
                          id="date"
                          label="min"
                          size='small'
                          {...register("citedMin")}
                          sx={{ width: 100, height:20 }}
                        />
                        <Typography fontFamily="monospace" marginLeft={1} marginRight={1} marginTop={2}>-</Typography>
                        <TextField
                          id="date"
                          label="max"
                          size='small'
                          {...register("citedMax")}
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
                                                {x.id}
                                              </MenuItem>)}
                        </Select>
                      </FormControl>
                      <div></div>
                      <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Typography fontFamily="monospace">retracted</Typography>} 
                        sx={{marginTop: 3}}
                        {...register("retracted")}/>
                      <div></div>
                      <FormControlLabel 
                        control={<Checkbox />} 
                        label={<Typography fontFamily="monospace">paratext</Typography>} 
                        sx={{marginTop: 1}}
                        {...register("paratext")}/>
                      <div></div>
                      <Button variant='outlined' sx={{marginTop:10, width: "14vw"}} type="submit">Apply filters</Button>
                    </form>
                  </Box>
                </Box>
            </Box>
            
        </List>
        
        </ Box>
    )

}