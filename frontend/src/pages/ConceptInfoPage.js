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
  

export const ConceptInfoPage = () => {

    let { id }= useParams();
    const concept_id = "https://openalex.org/" + id;
    const image_placeholder = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    const navigate = useNavigate();

    const [conceptInfo, setConceptInfo] = useState(false)
    const [ancestors, setAncestors] = useState(false)
    const [relatedConcepts, setRelatedConcepts] = useState(false)
    const [topWorks, setTopWorks] = useState(false)
    const [topAuthors, setTopAuthors] = useState(false)
    const [topVenues, setTopVenues] = useState(false)
    const [topInstitutions, setTopInstitutions] = useState(false)
    const [conceptStats, setConceptStats] = useState(false)

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

    useEffect(() => {
        getConceptInfo()
        getRelatedConcepts()
        getTopWorks()
        getTopAuthors()
        getTopVenues()
        getTopInstitutions()
        getStats()
    }, [id]);

    useEffect(() => {
        if (conceptInfo) {
            getAncestors()
        }
    }, [conceptInfo]);

    const getConceptInfo = () => {
        fetch( `http://localhost:3001/concept_info?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setConceptInfo(JSON.parse("[" + data + "]")[0][0]);
        });
    }

    const getAncestors = () => {
        fetch( `http://localhost:3001/concept_ancestors?id=${concept_id}&level=${conceptInfo.level-1}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAncestors(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getRelatedConcepts = () => {
        fetch( `http://localhost:3001/concept_related?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setRelatedConcepts(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopWorks = () => {
        fetch( `http://localhost:3001/concept_top_works?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopWorks(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopAuthors = () => {
        fetch( `http://localhost:3001/concept_top_authors?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopAuthors(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopVenues = () => {
        fetch( `http://localhost:3001/concept_top_venues?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopVenues(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopInstitutions = () => {
        fetch( `http://localhost:3001/concept_top_institutions?id=${concept_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTopInstitutions(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getStats = () => {
        fetch( `http://localhost:3001/concept_stats?id=${concept_id}`)
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
            setConceptStats(formattedStats)
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
                Concept Info
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
        { conceptInfo && conceptStats ? (
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
                {conceptInfo.display_name}
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
                                {conceptInfo.description? conceptInfo.description : "description unavailable"}
                            </Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>works count: {conceptInfo.works_count}</Typography>
                            <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>
                                updated date: {conceptInfo.updated_date? conceptInfo.updated_date.split("T")[0] : "N/A"}
                            </Typography>
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
                            <Typography fontFamily="monospace" mr={2}>ancestors: </Typography>
                            {ancestors? ancestors.map(x => <Link
                              fontFamily="monospace"
                              fontSize={14}
                              mr="2vw"
                              my="auto"
                              underline="hover"
                              onClick={() => navigate(`/concept_info/${x.ancestor_id.replace("https://openalex.org/", "")}`)}
                            >	{x.display_name}
                            </Link>) : 
                            <Typography
                            fontFamily="monospace"
                            fontSize={14}
                            mx="auto"
                            marginBottom={1}>
                                Loading
                            </Typography>}
                        </Box>
                    </Box>
                    <Image duration={0} fit="contain"  width="15vw"  src={conceptInfo.image_url? conceptInfo.image_url : image_placeholder}/>
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
                            width: "16vw", 
                            marginRight: 4,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Related concepts</Typography>
                        {relatedConcepts? 
                        (relatedConcepts.length != 0 ?
                        relatedConcepts.map(x => <Link
                                                    fontFamily="monospace"
                                                    fontSize={14}
                                                    ml = "2vw"
                                                    mr = "2vw"
                                                    marginBottom={1}
                                                    underline="hover"
                                                    onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                                                >	• {x.display_name}
                                                </Link>):
                        <Typography
                            fontFamily="monospace"
                            fontSize={14}
                            mx="auto"
                            paddingX={2}
                            marginBottom={1}>
                            No related concepts found
                        </Typography>)
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
                            width: "16vw", 
                            marginRight: 4,
                            pb: 2,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top institutions</Typography>
                        {topInstitutions? 
                         topInstitutions.map(x => <Link
                                                    fontFamily="monospace"
                                                    fontSize={14}
                                                    ml = "2vw"
                                                    mr = "2vw"
                                                    marginBottom={1}
                                                    underline="hover"
                                                    onClick={() => navigate(`/institution_info/${x.id.replace("https://openalex.org/", "")}`)}
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
                            width: "16vw", 
                            marginRight: 4,
                            pb: 2,
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
                    <Box sx={{boxShadow: 4,
                            borderRadius: 2, 
                            minHeight: "55vh", 
                            width: "16vw", 
                            pb: 2,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top venues</Typography>
                        {topVenues? 
                         topVenues.map(x => <Link
                                                fontFamily="monospace"
                                                fontSize={14}
                                                ml = "2vw"
                                                mr = "2vw"
                                                marginBottom={1}
                                                underline="hover"
                                                onClick={() => navigate(`/venue_info/${x.id.replace("https://openalex.org/", "")}`)}
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
                            minHeight: "55vh", 
                            width: "30vw", 
                            marginRight: 4,
                            display: "flex",
                            pb: 2,
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
                    <Box boxShadow={4} width="40vw" display="flex" justifyContent="center" padding={3} borderRadius={2}>
                        <Box width="35vw" height="70vh">
                            <Line data={conceptStats} options={options} />
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