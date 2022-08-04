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
  

export const AuthorInfoPage = () => {

    let { id }= useParams();
    const author_id = "https://openalex.org/" + id;
    const navigate = useNavigate();

    const [authorInfo, setAuthorInfo] = useState(false)

    const [institution, setInstitution] = useState(false)
    const [authorStats, setAuthorStats] = useState(false)

    const [topConcepts, setTopConcepts] = useState(false)
    const [topWorks, setTopWorks] = useState(false)
    
    const similarAuthors = [{display_name: "Author 1", id: "author1"}, 
                        {display_name: "Author 2", id: "author2"}, 
                        {display_name: "Author 3", id: "author3"},
                        {display_name: "Author 4", id: "author4"},
                        {display_name: "Author 5", id: "author5"}]

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Author Stats',
          },
        },
        maintainAspectRatio: false
    }

    const getAuthorInfo = () => {
        fetch( `http://localhost:3001/author_info?id=${author_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAuthorInfo(JSON.parse("[" + data + "]")[0][0]);
        });
    }

    const getInstitution = () => {
        if (authorInfo.last_known_institution) {
            fetch( `http://localhost:3001/institution_info?id=${authorInfo.last_known_institution}`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                setInstitution(JSON.parse("[" + data + "]")[0][0]);
            });
        }
    }

    useEffect(() => {
        getAuthorInfo()
        getStats()
        getTopConcepts()
        getTopWorks()
    }, [id]);

    useEffect(() => {
        if (authorInfo) {
            getInstitution()
        }
    }, [authorInfo]);

    const getTopWorks = () => {
        fetch( `http://localhost:3001/author_top_works?id=${author_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopWorks(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopConcepts = () => {
        fetch( `http://localhost:3001/author_top_concepts?id=${author_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopConcepts(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getStats = () => {
        fetch( `http://localhost:3001/author_stats?id=${author_id}`)
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
            console.log(formattedStats)
            setAuthorStats(formattedStats)
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
                Author Info
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
        { authorInfo && authorStats ? (
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
                {authorInfo.display_name}
                </Typography>
                    <Box display="flex"
                            width="100%"
                            boxShadow={2}
                            borderRadius={2}
                            marginRight={4}
                            marginTop={3}
                            height="100%"
                            padding={2}
                        flexDirection="row">
                         <Link
                            fontFamily="monospace"
                            fontSize={16}
                            mr="2vw"
                            my="auto"
                            underline="hover"
                            onClick={() => navigate(`/institution_info/${institution.id.replace("https://openalex.org/", "")}`)}
                        >	{institution? institution.display_name : "institution info unavailable"}
                        </Link>
                    </Box>
                    <Box display="flex"
                    width="100%"
                    boxShadow={2}
                    borderRadius={2}
                    marginTop={3}
                    height="100%"
                    padding={2}
                    flexDirection="column">
                        <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>works count: {authorInfo.works_count}</Typography>
                        <Typography variant="h7" fontFamily="monospace" >cited by count: {authorInfo.cited_by_count}</Typography>
                    </Box>
                    
                <Box display="flex"
                     width="100%"
                     alignItems=""
                     flexDirection="row"
                     marginTop={5}>
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "40vw", 
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
                            width: "28vw", 
                            //marginRight: 4,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Primary research concepts</Typography>
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
                    {/** 
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "23vw", 
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Similar authors</Typography>
                        {similarAuthors? 
                         similarAuthors.map(x => <Link
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
                         */}
                </Box>
                <Box marginTop={5}
                     display="flex"
                     flexDirection="row"
                     justifyContent="center"
                     width="100%"
                >
                    <Box boxShadow={4} width="100%" display="flex" justifyContent="center" padding={3} borderRadius={2}>
                        <Box width="70vw" height="70vh">
                            <Line data={authorStats} options={options} />
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