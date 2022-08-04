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
    const work_id = "https://openalex.org/" + id;
    const navigate = useNavigate();

    const [workInfo, setWorkInfo] = useState(false) 
    const [authors, setAuthors] = useState(false)
    const [concepts, setConcepts] = useState(false)

    const [relatedWorks, setRelatedWorks] = useState(false)
    const [referencedWorks, setReferencedWorks] = useState(false)
    

    const [topWorksSameAuthor, setTopWorksSameAuthor] = useState(false)

    const [topWorksSameConcept, setTopWorksSameConcept] = useState(false)

    useEffect(() => {
        getWorkInfo()
        getAuthors()
        getConcepts()
        getReferencedWorks()
        getRelatedWorks()
    }, [id]);

    useEffect(() => {
        if (authors) {
            getTopWorksSameAuthor()
        }
    }, [authors]);

    useEffect(() => {
        if (concepts) {
            getTopWorksSameConcept()
        }
    }, [concepts]);

    const getWorkInfo = () => {
        fetch( `http://localhost:3001/work_info?id=${work_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setWorkInfo(JSON.parse("[" + data + "]")[0][0]);
        });
    }

    const getAuthors = () => {
        fetch( `http://localhost:3001/work_author?id=${work_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAuthors(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getConcepts = () => {
        fetch( `http://localhost:3001/work_concept?id=${work_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setConcepts(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getReferencedWorks = () => {
        fetch( `http://localhost:3001/work_referenced?id=${work_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setReferencedWorks(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getRelatedWorks = () => {
        fetch( `http://localhost:3001/work_related?id=${work_id}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setRelatedWorks(JSON.parse("[" + data + "]")[0]);
        });
    }

    const getTopWorksSameAuthor = () => {
        if (authors && authors.length != 0) {
            const author_ids = authors.map(x => `'${x.id}'`)
            fetch( `http://localhost:3001/work_same_author?authors=${author_ids.join()}`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTopWorksSameAuthor(JSON.parse("[" + data + "]")[0]);
            });
        } else {
            setTopWorksSameAuthor([])
        }
    }

    const getTopWorksSameConcept = () => {
        if (concepts && concepts.length != 0) {
            const concept_ids = concepts.map(x => `'${x.id}'`)
            fetch( `http://localhost:3001/work_same_concept?concepts=${concept_ids.join()}`)
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTopWorksSameConcept(JSON.parse("[" + data + "]")[0]);
            });
        } else {
            setTopWorksSameConcept([])
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
        { workInfo && authors && concepts ? (
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
                            • retracted: {workInfo.is_retracted? workInfo.is_retracted.toString() : "N/A"}
                        </Typography>
                        <Typography fontSize={14} ml="2vw" mb={2} fontFamily="monospace">
                            • paratext {workInfo.is_paratext? workInfo.is_paratext.toString() : "N/A"}
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
                            minheight: "55vh", 
                            width: "35vw", 
                            marginRight: 4,
                            pb: 2,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works by same author</Typography>
                        {topWorksSameAuthor? 
                         topWorksSameAuthor.map(x => <Link
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
                            width: "35vw", 
                            pb: 2,
                            display: "flex",
                            flexDirection: "column"}}>
                        <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Top works in same concept</Typography>
                        {topWorksSameConcept? 
                         topWorksSameConcept.map(x => <Link
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