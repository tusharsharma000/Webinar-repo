// import React from 'react';
// import { TextField, InputAdornment, MenuItem, Box } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchAndFilter = () => {
//   const [topic, setTopic] = React.useState('');

//   const handleTopicChange = (event) => {
//     setTopic(event.target.value);
//   };

//   return (
//     <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//       {/* Search bar */}
//       <TextField
//         placeholder="Search for webinar"
//         variant="outlined"
//         size="small"
//         sx={{ width: '40%' }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />

//       {/* Topic dropdown */}
//       <TextField
//         select
//         label="Topic"
//         value={topic}
//         onChange={handleTopicChange}
//         variant="outlined"
//         size="small"
//         sx={{ width: '20%' }}
//       >
//         <MenuItem value="frontend">Front End Engineering</MenuItem>
//         <MenuItem value="career">Career</MenuItem>
//         {/* Add more topics as needed */}
//       </TextField>
//     </Box>
//   );
// };

// export default SearchAndFilter;

import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, MenuItem, Box, Select, FormControl, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useStore from '../ZustandStore/store';
import ClearIcon from "@mui/icons-material/Clear";


const SearchAndFilter = ({ handleClose, setTopicFilter, setSearchQuery }) => {
  const [topic, setTopic] = React.useState('');
  const getTopics = useStore((state) => state.getTopics);
  const [topics, setTopics] = useState([]);  // Local state to store topics

  useEffect(() => {
    // Call the getTopics function and get the unique topics
    const uniqueTopics = getTopics();
    setTopics(uniqueTopics);
  }, [getTopics, handleClose]);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
    setTopicFilter(event.target.value);
  };
  const handleClearSelection = () => {
    setTopic("");
    setTopicFilter("");
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      {/* Search bar with border radius */}
      <TextField
        placeholder="Search for webinar"
        variant="outlined"
        size="small"
        sx={{
          width: '31.5%',
          borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            padding: '4px'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearchChange}
      />

      {/* Topic dropdown using Select with border radius */}
      <FormControl sx={{ width: '20%', borderRadius: '10px' }}>
        <Select
          value={topic || ""} // Default value
          onChange={handleTopicChange}
          size="small"
          displayEmpty
          // Ensure empty option is shown
          defaultValue={"default"}
          sx={{
            borderRadius: '10px',   // Rounded border
            height: '40px',
            padding: '25px 5px',        // Set height to match the example
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',  // Light border color like the example
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',  // Change color on hover (blue like in the image)
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3f51b5',  // Blue color when focused (similar to image)
            },
          }}
          endAdornment={
            topic ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClearSelection}
                >
                  <ClearIcon
                    aria-label="Clear icon"
                    className="Clearicon-issue mr-5"
                    style={{ width: '16px', height: '16px' }}
                  />
                </IconButton>
              </InputAdornment>
            ) : null
          }
          renderValue={(selected) => {
            if (!selected) {
              return <span>Topic</span>;
            }
            return selected;
          }}
        >
          <MenuItem value={"default"} disabled>
            Topic
          </MenuItem>
          {topics.map((topic, index) => (
            <MenuItem key={index} value={topic}>
              {topic}
            </MenuItem>
          ))}
          {/* Add more topics as needed */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndFilter;
