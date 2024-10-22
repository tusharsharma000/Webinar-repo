import React, { useState } from 'react';
import { 
  Button, Container, Grid, Box, Typography 
} from '@mui/material';
import WebinarFormDialog from "./Components/WebinarFormDialog";
import WebinarCard from './Components/WebinarCard';
import SearchAndFilter from './Components/SearchBar';
import useStore from './ZustandStore/store';
import './App.scss';

function App() {
  const [open, setOpen] = useState(false);
  const { webinars, deleteWebinar } = useStore();
  const [topicFilter, setTopicFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);  // Edit mode state
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [webinarIndex, setWebinarIndex] = useState(null);


  const handleCreate = () => setOpen(true);
  const handleClose = () => {
    setWebinarIndex(null);
    setSelectedWebinar(null);
    setIsEdit(false);
    setOpen(false);
  };

  const filteredWebinars = webinars.filter((webinar) => {
    const matchesTopic = topicFilter === '' || webinar.topics === topicFilter;
    const matchesSearch = searchQuery === '' || 
      webinar.webinarTitle.toLowerCase().includes(searchQuery.toLowerCase()) || webinar.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) || webinar.instructorCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||webinar.instructorRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
});
const handleDelete = (index) => {
  deleteWebinar(index);  // Call Zustand store's delete function
};

const handleEdit = (index) => {
  const webinarToEdit = webinars[index]; // Get the webinar data by index
  setIsEdit(true);  // Set the edit state to true
  setSelectedWebinar(webinarToEdit);
  setWebinarIndex(index);  // Pass the selected webinar data to the modal
  setOpen(true);
};

  return (
    <Container 
      maxWidth={false} 
      sx={{
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        boxSizing: 'border-box', 
        padding: 2,
      }}
    >
      {/* Header Section - Fixed */}
      <Box 
        sx={{ 
          position: 'fixed',  // Fix the position at the top
          top: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: '#fff',  // Add background color to avoid overlap issues
          zIndex: 1000,  // Ensure it's on top of other content
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2, 
          pb: 2, 
          borderBottom: '1px solid #E3E7EC',  // Bottom border
          mx: 2, 
          boxSizing: 'border-box', // Prevent overflow and box sizing issues
          padding: 2,  // Add some padding to space the elements
        }}
      >
        <Typography className="font-weight-600 f-18" sx={{ fontWeight: 600, fontSize: '18px', pl: 2 }}>Webinar</Typography>
        <Button 
          variant="contained" 
          onClick={handleCreate}
          sx={{
            boxShadow: '0px 8px 20px -8px #0E51F1',
            backgroundColor: '#0E51F1',
            padding: '8px 24px',
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: "600",
            fontSize:"14px",
            pr: 2
          }}
        >
          Add webinar
        </Button>
      </Box>

      {/* Filters Section */}
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 13, // Add margin-top to compensate for fixed header
          mx: 2,
          mb: 2,
          minHeight: '50px',
        }}
      >
        {/* Search Bar on the Left */}
        <Box sx={{ flex: 1 }}>
          <SearchAndFilter handleClose={handleClose} 
            setTopicFilter={setTopicFilter} 
            setSearchQuery={setSearchQuery}/>
        </Box>
      </Box>

      {/* Webinars List (Scrollable) */}
      <Box 
      class="scrollbar"
  sx={{ 
    flex: 1, 
    overflowY: 'auto', 
    padding: 2,
    
  }}
>
  <Grid container spacing={2}>
  {filteredWebinars.length > 0 ? (
    filteredWebinars.map((webinar, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <WebinarCard
          webinar={webinar}
          onDelete={() => handleDelete(index)}  // Pass delete function to card
          onEdit={() => handleEdit(index)}     // Pass edit function to card
        />
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        No data found
      </Typography>
    </Grid>
  )}
</Grid>
</Box>
      {/* Popup Form */}
      <WebinarFormDialog open={open} onClose={handleClose} isEdit={isEdit} selectedWebinar={selectedWebinar} webinarIndex={webinarIndex} />
    </Container>
  );
}

export default App;
