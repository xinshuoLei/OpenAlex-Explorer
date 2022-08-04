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
import { useNavigate } from 'react-router-dom';

export const WorkCard = ({id, name, type}) => {
    const navigate = useNavigate()
    return (
        <Box 
            display="flex"
            flexDirection="column"
            boxShadow={3}
            px={2}
            py={2}
            marginTop={5}
            >
            <Link variant="h7" fontFamily="monospace" onClick={() => navigate(`/work_info/${id.replace("https://openalex.org/", "")}`)}>{name}</Link>
            <Typography fontFamily="monospace" color="gray" marginTop={1}>{type}</Typography>
        </Box>
    )
}