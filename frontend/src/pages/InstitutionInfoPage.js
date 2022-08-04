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
    const institution_id = "https://openalex.org/" + id;
    const image_placeholder = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"


    const [institutionInfo, setInstitutionInfo] = useState(false);
    const [topAuthors, setTopAuthors] = useState(false)
    const [institutionStats, setInstitutionStats] = useState(false)
    const [topConcepts, setTopConcepts] = useState(false)
   

    useEffect(() => {
        getInstitutionInfo();
        getTopAuthors();
        getTopConcepts();
        getStats();
    }, []);

    const getInstitutionInfo = () => {
        fetch( `http://localhost:3001/institution_info?id=${institution_id}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setInstitutionInfo(JSON.parse("[" + data + "]")[0][0]);
          });
    }
    
    const getTopAuthors = () => {
        fetch( `http://localhost:3001/institution_top_author?id=${institution_id}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setTopAuthors(JSON.parse("[" + data + "]")[0]);
          });
    }

    const getTopConcepts = () => {
        fetch( `http://localhost:3001/institution_top_concept?id=${institution_id}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setTopConcepts(JSON.parse("[" + data + "]")[0]);
          });
    }

    const getStats = () => {
        fetch( `http://localhost:3001/institution_stats?id=${institution_id}`)
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
            setInstitutionStats(formattedStats)
          });
    }
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Institution Stats',
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
        { institutionInfo && institutionStats ? (
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
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                <Typography fontWeight="bold" display="inline" variant="h7" fontFamily="monospace">ror: </Typography>
                                {institutionInfo.ror}
                            </Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                <Typography fontWeight="bold" display="inline" variant="h7" fontFamily="monospace">location: </Typography>
                                {institutionInfo.country ? institutionInfo.country + ", " + institutionInfo.region : "unknown"}
                            </Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                <Typography fontWeight="bold" display="inline" variant="h7" fontFamily="monospace">type: </Typography>
                                {institutionInfo.type}
                            </Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                <Typography fontWeight="bold" display="inline" variant="h7" fontFamily="monospace">works count: </Typography>
                                {institutionInfo.works_count}
                            </Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                <Typography fontWeight="bold" display="inline" variant="h7" fontFamily="monospace">cited by count: </Typography>
                                {institutionInfo.cited_by_count}
                            </Typography>
                        </Box>
                    </Box>
                    <Image duration={0} fit="contain"  width="17vw"  src={institutionInfo.image_url? institutionInfo.image_url : image_placeholder}/>
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
                        topConcepts.length != 0 ? 
                        topConcepts.map(x => <Link
                                                    fontFamily="monospace"
                                                    fontSize={14}
                                                    ml = "2vw"
                                                    marginBottom={1}
                                                    underline="hover"
                                                    onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                                                >	• {x.display_name}
                                                </Link>) : 
                        <Typography fontFamily="monospace" mx="auto">No concepts associated with this institution</Typography>
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
                         topAuthors.length != 0? 
                         topAuthors.map(x => <Link
                                                fontFamily="monospace"
                                                fontSize={14}
                                                ml = "2vw"
                                                marginBottom={1}
                                                underline="hover"
                                                onClick={() => navigate(`/author_info/${x.id.replace("https://openalex.org/", "")}`)}
                                            >	• {x.display_name}
                                            </Link>) : 
                                            <Typography fontFamily="monospace" mx="auto">No Authors available in this institution</Typography>
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
                            <Line data={institutionStats} options={options} />
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