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
  

export const VenueInfoPage = () => {

    let { id }= useParams();
    const navigate = useNavigate();

    const venueInfo = {display_name: id, 
                       ISSN: 123,
                       publisher: "unknown",
                       works_count: 100,
                       cited_by_count: 200,
                       is_oa: true,
                       is_in_doaj: true}

    const institution = {display_name: "Insitution 1", id: "institution1"}

    const ancestors = [{display_name: "Ancestor concept 1", id: "concept1"}, 
                       {display_name: "Ancestor concept 2", id: "concept2"}, 
                       {display_name: "Ancestor concept 3", id: "concept3"}]

    const researchConcepts = [{display_name: "Concept 4", id: "concept4"}, 
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

    const labels = ["2019", "2020", "2021", "2022"]
    const venueStats = {
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
            text: 'Venue Stats',
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
            <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace" marginLeft={2}>
                Venue Info
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
        { venueInfo ? (
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
                {venueInfo.display_name}
                </Typography>
                    
                <Box display="flex"
                     width="100%"
                     alignItems=""
                     flexDirection="row"
                     marginTop={5}>
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "25vw", 
                            marginRight: 5,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Venue Info</Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • ISSN: {venueInfo.ISSN}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • works count: {venueInfo.works_count}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • cited by count: {venueInfo.cited_by_count}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • oa: {venueInfo.is_oa.toString()}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • in doaj: {venueInfo.is_in_doaj.toString()}
                        </Typography>
                    </Box>
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "23vw", 
                            marginRight: 4,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works</Typography>
                        {topWorks? 
                         topWorks.map(x => <Link
                                                fontFamily="monospace"
                                                fontSize={14}
                                                ml = "2vw"
                                                marginBottom={1}
                                                underline="hover"
                                                onClick={() => navigate(`/work_info/${x.id.replace("https://openalex.org/", "")}`)}
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
                            width: "23vw", 
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
                     justifyContent="center"
                     width="100%"
                >
                    <Box boxShadow={4} width="100%" display="flex" justifyContent="center" padding={3} borderRadius={2}>
                        <Box width="70vw" height="70vh">
                            <Line data={venueStats} options={options} />
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