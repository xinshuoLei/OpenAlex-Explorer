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
    const venue_id = "https://openalex.org/" + id;
    const navigate = useNavigate();

    const [venueInfo, setVenueInfo] = useState(false)
    const [topWorks, setTopWorks] = useState(false)   
    const [topAuthors, setTopAuthors] = useState(false)
    const [venueStats, setVenueStats] = useState(false)

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

    useEffect(() => {
        getVenueInfo()
        getTopWorks()
        getTopAuthors()
        getStats()
    }, [id]);

    const getVenueInfo = () => {
        fetch( `http://localhost:3001/venue_info?id=${venue_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setVenueInfo(JSON.parse("[" + data + "]")[0][0]);
        });
    }

    const getTopWorks = () => {
        fetch( `http://localhost:3001/venue_top_works?id=${venue_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopWorks(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopAuthors = () => {
        fetch( `http://localhost:3001/venue_top_authors?id=${venue_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopAuthors(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getStats = () => {
        fetch( `http://localhost:3001/venue_stats?id=${venue_id}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            const rawStats = JSON.parse(data)
            const labels = rawStats.years
            const works_count = rawStats.works_count
            const cited_by_count = rawStats.cited_by_count
            const formattedStats = {
                labels,
                datasets: [
                    {
                        label: 'cited by count',
                        data: cited_by_count,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                        label: 'works count',
                        data: works_count,
                        borderColor: 'rgb(144, 238, 144)',
                        backgroundColor: 'rgba(144, 238, 144, 0.5)',
                    }  
                ]
            }
            //console.log(formattedStats)
            setVenueStats(formattedStats)
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
        { venueInfo && venueStats ? (
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
                            width: "20vw", 
                            marginRight: 4,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Venue Info</Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • ISSN-L: {venueInfo.issn_l}
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
                            width: "30vw", 
                            marginRight: 4,
                            pb: 2,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works</Typography>
                        {topWorks? 
                         topWorks.map(x => <Link
                                                fontFamily="monospace"
                                                fontSize={14}
                                                ml = "2vw"
                                                mr = "2vw"
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