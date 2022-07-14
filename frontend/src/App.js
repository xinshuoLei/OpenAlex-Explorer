import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material'
import { Sidebar } from './components/Sidebar';
import { WorkPage } from './pages/WorkPage';
import { ConceptPage } from './pages/ConceptPage';
import { WorkResultPage } from './pages/WorkResultPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ConceptResultPage } from './pages/ConceptResultPage';
import { ConceptInfoPage } from './pages/ConceptInfoPage';
import { WorkInfoPage } from './pages/WorkInfoPage';
import { AuthorPage } from './pages/AuthorPage';
import { AuthorResultPage } from './pages/AuthorResultPage';
import { AuthorInfoPage } from './pages/AuthorInfoPage';
import { InsitutionPage } from './pages/InstitutionPage';
import { VenuePage } from './pages/VenuePage';
import { VenueResultPage } from './pages/VenueResultPage';
import { VenueInfoPage } from './pages/VenueInfoPage';
import { InstitutionResultPage } from './pages/InstitutionResultPage';
import { InstitutionInfoPage } from './pages/InstitutionInfoPage';


const drawerWidth = 240;

function App() {
  return (
    <>
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <Sidebar/>
        <Routes>
              <Route path="/work" element={<WorkPage />} />
              <Route path="/concept" element={<ConceptPage />} />
              <Route path="/author" element={<AuthorPage />} />
              <Route path="/institution" element={<InsitutionPage />} />
              <Route path="/venue" element={<VenuePage />} />
              <Route path="/concept_result" element={<ConceptResultPage />}/>
              <Route path="/concept_info/:id" element={<ConceptInfoPage />}/>
              <Route path="/work_result" element={<WorkResultPage />}/>
              <Route path="/work_info/:id" element={<WorkInfoPage />}/>
              <Route path="/author_result" element={<AuthorResultPage />}/>
              <Route path="/author_info/:id" element={<AuthorInfoPage />}/>
              <Route path="/venue_result" element={<VenueResultPage />}/>
              <Route path="/venue_info/:id" element={<VenueInfoPage />}/>
              <Route path="/institution_result" element={<InstitutionResultPage />}/>
              <Route path="/institution_info/:id" element={<InstitutionInfoPage />}/>
              <Route path="/" element={<WorkPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
    </>
  );
}

export default App;
