import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Divider,
  TextField,
} from '@mui/material'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Image from 'mui-image'
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  

export const InstitutionInfoPage = () => {

    let { id }= useParams();
    const navigate = useNavigate();

    const institutionInfo = { ror: 123,
                              display_name: id, 
                              works_count: 100,
                              type: "Education",
                              cited_by_count: 200, 
                              location: "unknown",
                              image_url: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                            }
    const ancestors = [{display_name: "Ancestor concept 1", id: "concept1"}, 
                       {display_name: "Ancestor concept 2", id: "concept2"}, 
                       {display_name: "Ancestor concept 3", id: "concept3"}]

    const topConcepts = [{display_name: "Concept 4", id: "concept4"}, 
                             {display_name: "Concept 5", id: "concept5"}, 
                             {display_name: "Concept 6", id: "concept6"},
                             {display_name: "Concept 7", id: "concept7"},
                             {display_name: "Concept 8", id: "concept8"}]

    const topWorks = [{display_name: "Work 1", id: "work1"}, 
                      {display_name: "Work 2", id: "work2"}, 
                      {display_name: "Work 3", id: "work3"},
                      {display_name: "Work 4", id: "work4"},
                      {display_name: "Work 5", id: "work5"}]
    
    const topAuthors = [{display_name: "Author 1", id: "author1"}, 
                        {display_name: "Author 2", id: "author2"}, 
                        {display_name: "Author 3", id: "author3"},
                        {display_name: "Author 4", id: "author4"},
                        {display_name: "Author 5", id: "author5"}]

    const topVenues = [{display_name: "Venue 1", id: "venue1"}, 
                       {display_name: "Venue 2", id: "venue2"}, 
                       {display_name: "Venue 3", id: "venue3"},
                       {display_name: "Venue 4", id: "venue4"},
                       {display_name: "Venue 5", id: "venue5"}]

    const topInstitutions = [{display_name: "Institution 1", id: "instituion1"}, 
                             {display_name: "Institution 2", id: "instituion2"}, 
                             {display_name: "Institution 3", id: "instituion3"},
                             {display_name: "Institution 4", id: "instituion4"},
                             {display_name: "Institution 5", id: "instituion5"}]
    
    const labels = ["2019", "2020", "2021", "2022"]
    const conceptsStats = {
        labels,
        datasets: [
            {
                label: 'cited by count',
                data: [30, 50, 62, 20],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'works count',
                data: [60, 91, 40, 73],
                borderColor: 'rgb(144, 238, 144)',
                backgroundColor: 'rgba(144, 238, 144, 0.5)',
            }  
        ]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Concept Stats',
          },
        },
        maintainAspectRatio: false
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
                Institution Info
            </Typography>
            </Toolbar>
        </AppBar>
        <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              width="84vw"
              marginTop={15}
              marginBottom={10}
          > 
        { institutionInfo ? (
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                width="70vw"
                mx="auto"
                > 
                <Typography variant="h5" 
                            fontFamily="monospace"
                            boxShadow={2}
                            px={3}
                            py={1}
                            borderRadius={2} 
                            backgroundColor="#F2F3F4">
                {institutionInfo.display_name}
                </Typography>
                <Box display="flex"
                     width="100%"
                     alignItems=""
                     flexDirection="row"
                     marginTop={5}>
                    <Box display="flex"
                         width="100%"
                         height="100%"
                         flexDirection="column"
                         marginRight={3}>
                        <Box display="flex"
                        width="100%"
                        boxShadow={2}
                        borderRadius={2}
                        marginRight={4}
                        height="100%"
                        padding={2}
                        flexDirection="column">
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>ror: {institutionInfo.ror}</Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>location: {institutionInfo.location}</Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>type: {institutionInfo.type}</Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>works count: {institutionInfo.works_count}</Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>cited by count: {institutionInfo.cited_by_count}</Typography>
                        </Box>
                    </Box>
                    <Image duration={0} fit="contain"  width="17vw"  src={institutionInfo.image_url}/>
                    <Typography></Typography>
                </Box>
                <Box display="flex"
                     width="100%"
                     alignItems=""
                     flexDirection="row"
                     marginTop={5}>
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "31vw", 
                            marginRight: 15,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top concepts</Typography>
                        {topConcepts? 
                        topConcepts.map(x => <Link
                                                    fontFamily="monospace"
                                                    fontSize={14}
                                                    ml = "2vw"
                                                    marginBottom={1}
                                                    underline="hover"
                                                    onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
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
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "31vw", 
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top authors</Typography>
                        {topAuthors? 
                         topAuthors.map(x => <Link
                                                fontFamily="monospace"
                                                fontSize={14}
                                                ml = "2vw"
                                                marginBottom={1}
                                                underline="hover"
                                                onClick={() => navigate(`/author_info/${x.id.replace("https://openalex.org/", "")}`)}
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
                <Box marginTop={5}
                     display="flex"
                     flexDirection="row"
                     width="100%"
                >
                    <Box boxShadow={4} width="70vw" display="flex" justifyContent="center" padding={3} borderRadius={2}>
                        <Box width="65vw" height="70vh">
                            <Line data={conceptsStats} options={options} />
                        </Box>
                    </Box>
                </Box>
            </ Box>
        ) 
        : 
        (<Typography mx="auto" fontFamily="monospace">Loading</Typography>)
         }
         </Box>
        </ Box>
    )
}