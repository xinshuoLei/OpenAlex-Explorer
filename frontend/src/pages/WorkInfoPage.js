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
  

export const WorkInfoPage = () => {

    let { id }= useParams();
    const navigate = useNavigate();

    const workInfo = { description: "this is a fake concept",
                       display_name: id, 
                       type: "peer-review",
                       cited_by_count: 100,
                       host_venue: "Venue 1",
                       retracted: true,
                       paratext: true,
                       publication_year: 2022
                    }
    const authors = [{display_name: "author 1", id: "concept1"}]

    const concepts = [{display_name: "Concept 1", id: "concept1"}, 
                      {display_name: "Concept 2", id: "concept2"}, 
                      {display_name: "Concept 3", id: "concept3"},
                      {display_name: "Concept 4", id: "concept4"},
                      {display_name: "Concept 5", id: "concept5"}]

    const relatedWorks = [{display_name: "Work 1", id: "work1"}, 
                          {display_name: "Work 2", id: "work2"}, 
                          {display_name: "Work 3", id: "work3"},
                          {display_name: "Work 4", id: "work4"},
                          {display_name: "Work 5", id: "work5"}]
    
    const referencedWorks = [{display_name: "Work 1", id: "work1"}, 
                             {display_name: "Work 2", id: "work2"}, 
                             {display_name: "Work 3", id: "work3"},
                             {display_name: "Work 4", id: "work4"},
                             {display_name: "Work 5", id: "work5"}]

    const topWorksSameAuthor = [{display_name: "Work 1", id: "work1"}, 
                                {display_name: "Work 2", id: "work2"}, 
                                {display_name: "Work 3", id: "work3"},
                                {display_name: "Work 4", id: "work4"},
                                {display_name: "Work 5", id: "work5"}]

    const topWorksSameConcept = [{display_name: "Work 1", id: "work1"}, 
                                 {display_name: "Work 2", id: "work2"}, 
                                 {display_name: "Work 3", id: "work3"},
                                 {display_name: "Work 4", id: "work4"},
                                 {display_name: "Work 5", id: "work5"}]
    
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
                Work Info
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
        { workInfo ? (
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
                {workInfo.display_name} ({workInfo.publication_year})
                </Typography>

                    <Box display="flex"
                         width="100%"
                         height="100%"
                         flexDirection="column"
                         marginTop={3}>
                        <Box display="flex"
                             width="100%"
                             boxShadow={2}
                             borderRadius={2}
                             marginRight={4}
                             marginTop={2}
                             height="100%"
                             padding={2}
                            flexDirection="row">
                            {authors.map(x => <Link
                              fontFamily="monospace"
                              fontSize={14}
                              mr="2vw"
                              my="auto"
                              underline="hover"
                              onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                            >	{x.display_name}
                            </Link>)}
                        </Box>
                        <Box display="flex"
                             width="100%"
                             boxShadow={2}
                             borderRadius={2}
                             marginRight={4}
                             marginTop={2}
                             height="100%"
                             padding={2}
                            flexDirection="row">
                            {concepts.map(x => <Link
                              fontFamily="monospace"
                              fontSize={14}
                              mr="2vw"
                              my="auto"
                              underline="hover"
                              onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                            >	{x.display_name}
                            </Link>)}
                        </Box>
                    </Box>
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
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Work Info</Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • type: {workInfo.type}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • cited by count: {workInfo.cited_by_count}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • host venue: {workInfo.host_venue}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • retracted: {workInfo.retracted.toString()}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • paratext {workInfo.paratext.toString()}
                        </Typography>
                    </Box>
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "20vw", 
                            marginRight: 5,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Related works</Typography>
                        {relatedWorks? 
                         relatedWorks.map(x => <Link
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
                            width: "20vw", 
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Referenced works</Typography>
                        {referencedWorks? 
                         referencedWorks.map(x => <Link
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
                    
                </Box>
                <Box marginTop={5}
                     display="flex"
                     flexDirection="row"
                     width="100%"
                >
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            height: "55vh", 
                            width: "25vw", 
                            marginRight: 4,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works by same author</Typography>
                        {topWorksSameAuthor? 
                         topWorksSameAuthor.map(x => <Link
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
                            width: "25vw", 
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works in same concept</Typography>
                        {topWorksSameConcept? 
                         topWorksSameConcept.map(x => <Link
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