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
import { useForm } from 'react-hook-form'

export const AuthorResultPage = () => {

    const { register, handleSubmit } = useForm()

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

    const [searchResult, setSearchResult] = useState(false)
    const [filteredResult,  setFilteredResult] = useState(false)

    useEffect(() => {
      performSearch();
    }, []);

    const performSearch = () => {
      fetch( `http://localhost:3001/author_result?key=${encodeURIComponent(key)}&field=${searchField}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
          setSearchResult(JSON.parse("[" + data + "]")[0]);
          setFilteredResult(JSON.parse("[" + data + "]")[0]);
        });
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
        default: 
          return result;
      }
    }

    const filterResult = (data, e) => {
      console.log(data)
      const works_min = data.worksMin && data.worksMin.length != 0 ? parseInt(data.worksMin) : 0
      const works_max = data.worksMax && data.worksMax.length != 0 ? parseInt(data.worksMax) : Number.MAX_SAFE_INTEGER
      const cited_min = data.citedMin && data.citedMin.length != 0 ? parseInt(data.citedMin) : 0
      const cited_max = data.citedMax && data.citedMax.length != 0 ? parseInt(data.citedMax) : Number.MAX_SAFE_INTEGER
      const filtered = searchResult.filter(x => x.works_count >= works_min 
                                            && x.works_count <= works_max
                                            && x.cited_by_count >= cited_min
                                            && x.cited_by_count <= cited_max
                                            && x.is_in_doaj == data.doaj
                                            && x.is_oa == data.oa
                                            && (data.institution.length == 0 ||
                                                (x.institution && 
                                                x.institution.toLowerCase().includes(data.institution.toLowerCase()))))
      console.log(filtered)
      setFilteredResult(sortResult(filtered, sortField))
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
                      {filteredResult? 
                      filteredResult.map(x => <AuthorCard
                                              name={x.display_name} 
                                              id={x.id}
                                              institution={x.institution? x.institution : "no institution info available"}/>)
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
                      <Typography fontFamily="monospace" marginTop={5}>Last known institution</Typography>
                      <Box width="100%"  display="flex" flexDirection="row" marginTop={1} alignItems="center" justifyContent="center">
                        <TextField
                          id="date"
                          label="institution"
                          size='small'
                          sx={{ width: 230, height:20, marginTop:2 }}
                          {...register("institution")}
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