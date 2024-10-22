import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';
import dayjs from 'dayjs';

function WebinarCard({ webinar, onDelete, onEdit }) {
  const { instructorName, instructorRole, startDate, startTime, webinarTitle, instructorCompany, topics, imageData, color } = webinar;
  const newStartDate = dayjs(startDate);
  const newStartTime = dayjs(webinar.startTime);
  const newEndTime = dayjs(webinar.endTime);

  const formattedDate = `${newStartDate.format('dddd')} • ${newStartDate.format('MMMM D')}, ${newStartTime.format('h:mm')} - ${newEndTime.format('h:mm A')}`;

  return (
    <Card
      sx={{
        flexGrow: 1,
        m: 2,
        p: 2,
        borderRadius: 4,
        boxShadow: '0px 20px 46px -24px #0E10131F',
        border: '1px solid #E3E7EC',
        overflow: 'visible' // To keep the layout clean
      }}
    >
      <Box
        sx={{
          backgroundColor: color,  // Background color similar to the image
          padding: 2,
          borderRadius: 3,  // Rounded corners
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Text details on the left */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            {instructorName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {instructorRole}
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {instructorCompany}
          </Typography>
        </Box>

        {/* Image on the right */}
        <Avatar
          alt={imageData}
          src={imageData}  // Use actual image URL
          sx={{ width: 60, height: 60, ml: 2, borderRadius: 3, alignSelf: 'center' }}  // Add margin to the left for spacing
        />
      </Box>
      <CardContent>
        <Typography className='font-weight-600 f-14' sx={{ mb: 1, color: color }}>
          {topics}
        </Typography>
        <Typography className='black-color font-weight-600 f-18' component="div" sx={{ mb: 1 }}>
          {webinarTitle}
        </Typography>
        <Typography className='light-text font-weight-400 f-14'>
          {/* {startDate} • {} */}
          {formattedDate}
        </Typography>
      </CardContent>
      <Box display="flex" alignItems="center">
        {/* Delete text styled as a button */}
        <Typography
          onClick={onDelete}
          sx={{
            backgroundColor: '#ffebee',
            color: '#f44336',
            borderRadius: '20px',
            padding: '5px 15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#ffcdd2',
            },
          }}
        >
          Delete
        </Typography>

        {/* Edit text styled as a link */}
        <Typography
          onClick={onEdit}
          className='f-14 font-weight-600'
          sx={{
            marginLeft: 2,  // Spacing between the elements
            color: '#0000EE',  // Blue link color (default link color)
            cursor: 'pointer',  // Pointer cursor for interaction
            textDecoration: 'none',  // No underline
          }}
        >
          Edit
        </Typography>
      </Box>
    </Card>
  );
}

export default WebinarCard;
