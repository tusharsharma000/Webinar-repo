

import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, Grid, TextField, Button, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ReactComponent as UserIcon } from "../assets/users.svg";
import { ReactComponent as VideoIcon } from "../assets/video.svg";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import useStore from '../ZustandStore/store';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",  // Adjust as needed
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 4,
  py:2,
  borderRadius: '16px',  // Increased border-radius
};

export default function WebinarFormDialog({ open, onClose, isEdit, selectedWebinar, webinarIndex }) {
  const { addWebinar, updateWebinar } = useStore();
  console.log(isEdit);
  const formObject = {
    instructorName: '',
    instructorRole: '',
    instructorCompany: '',
    topics: '',
    webinarTitle: '',
    startDate: null,
    startTime: null,
    endTime: null,
    imageData: null, // For storing image file
  };
  const [formData, setFormData] = useState(formObject);
  useEffect(() => {
    if (isEdit && selectedWebinar) {
      setFormData(selectedWebinar);
      setImagePreview(selectedWebinar.imageData);
      setErrors({});
    } else {
      setFormData(formObject);
      setImagePreview(null);
      setErrors({});
    }
  }, [isEdit, selectedWebinar, open]);


  const [imagePreview, setImagePreview] = useState(null); // For showing image preview
  const [errors, setErrors] = useState({});
  console.log(errors);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleTimeChange = (time, field) => {
    setFormData({ ...formData, [field]: time });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert image to base64 string
      reader.onloadend = () => {
        setFormData({ ...formData, imageData: reader.result });
        setImagePreview(reader.result); // Set base64 string // Show image preview
      };
    }
  };

  console.log(formData);

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.instructorName) tempErrors.instructorName = 'Instructor Name is required';
    if (!formData.instructorRole) tempErrors.instructorRole = 'Instructor Role is required';
    if (!formData.instructorCompany) tempErrors.instructorCompany = 'Instructor Company is required';
    if (!formData.webinarTitle) tempErrors.webinarTitle = 'Webinar Title is required';
    if (!formData.startDate) tempErrors.startDate = 'Start Date is required';
    if (!formData.startTime) tempErrors.startTime = 'Start Time is required';
    if (!formData.endTime) tempErrors.endTime = 'End Time is required';
    if (!formData.imageData) tempErrors.image = 'Instructor Image is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // If no errors, form is valid
  };
  const colorList = [
    '#741DE3',
    '#E72174',
    '#08A79E',
    '#088761',
    '#FFB023',
    '#0E51F1',
    '#D72638',
    '#F46036',
    '#2E294E',
    '#1B998B'
  ];

  // Function to get a random color from the list
  const getRandomColorFromList = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  const handleCreate = () => {
    if (validateForm()) {
      if (isEdit) {
        updateWebinar(webinarIndex, formData);
      } else {
        const randomColor = getRandomColorFromList(formData);
        // Add the color to the formData object
        const updatedFormData = { ...formData, color: randomColor };
        // Add the formData to Zustand store
        addWebinar(updatedFormData);
      }
      onClose(); // Close modal after successful submission
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Modal Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" pb={1} sx={{ borderBottom: '1px solid #E0E0E0' }}>
          <Typography className='f-18 font-weight-600 black-color'>{isEdit ? "Update Webinar" : "Create Webinar"}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Row 1: Icon and Instructor Details */}

          {/* Row 2: Instructor Name and Image */}
          <Grid container item xs={12} lg={12} md={12} spacing={1} className='pt-5'>
            <Grid item xs={1} letterSpacing={0.5} md={0.5}  >
              <UserIcon width="20px" className='icon-margin ' />
            </Grid>
            {/* Upper Right Side Grid  */}
            <Grid container item xs={11} lg={11.5} md={11.5} spacing={4}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography className='font-weight-600 f-16 light-text'>Instructor Details</Typography>
                </Box>
              </Grid>
              <Grid container item xs={6} lg={6} md={6} spacing={1} className='d-flex flex-direction-column pt-10'>
                <Grid item xs={12} lg={12} md={12} sx={{
                  maxHeight: 'fit-content',
                  padding: '0',
                  margin: '10px 0',
                  boxSizing: 'border-box',
                }}
                >
                  <Typography className='f-13 light-text font-weight-600'>Instructor Name<span className='red-color f-14 font-weight-600'>*</span></Typography>
                  <TextField
                    name="instructorName"
                    value={formData.instructorName}
                    onChange={handleChange}
                    error={!!errors.instructorName}
                    helperText={errors.instructorName}
                    placeholder='Type the instructor name'
                    className={`form-control input-group ${formData.instructorName ? "has-value" : ""}`}
                    sx={{ width: '95%' }}  // Reduced TextField width
                  />
                </Grid>

                {/* Grid Item for Additional Field */}
                <Grid item xs={12} lg={12} md={12} sx={{
                  maxHeight: 'fit-content',
                  padding: '0',
                  margin: '0 0 10px 0',
                  boxSizing: 'border-box'
                }}>
                  <Typography className='f-13 light-text font-weight-600'>Instructor Role<span className='red-color f-14 font-weight-600'>*</span></Typography>
                  <TextField
                    name="instructorRole"
                    value={formData.instructorRole}
                    onChange={handleChange}
                    placeholder='Type the instructor role'
                    error={!!errors.instructorRole}
                    helperText={errors.instructorRole}
                    className={`form-control input-group ${formData.instructorRole ? "has-value" : ""}`}
                    sx={{ width: '95%' }}  // Reduced TextField width
                  />
                </Grid>

              </Grid>
              <Grid item xs={4} md={3} lg={3} sx={{
                maxHeight: 'fit-content',
                padding: '0',
                margin: '10px 0',
                boxSizing: 'border-box'
              }} className='pt-10'>
                <Typography className="f-13 light-text font-weight-600">
                  Instructor Image<span className='red-color f-14 font-weight-600'>*</span>
                </Typography>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: '1px dashed grey',
                    height: '80%', // Fixed height for the box
                    marginTop: "10px",
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {imagePreview ? (
                <img
                src={imagePreview}
                alt="Uploaded"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <>
                <AddIcon fontSize="large" color="action" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  // style={{
                  //   opacity: 0,
                  //   position: 'absolute',
                  //   top: 0,
                  //   left: 0,
                  //   width: '100%',
                  //   height: '100%',
                  //   cursor: 'pointer'
                  // }}
                />
              </>
            )}
                </Box> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: !errors.image ? '1px dashed grey' : '1px dashed #d32f2f ',
                    height: '80%',  // Keep the box height consistent
                    marginTop: "10px",
                    borderRadius: '8px',
                    cursor: 'pointer',
                    position: 'relative',  // Needed for the input positioning
                    overflow: 'hidden',    // Ensures image stays within the box boundaries and is cropped if too large
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      style={{
                        width: '100%',      // Image takes the full width of the box
                        height: '100%',     // Image takes the full height of the box
                        objectFit: 'cover', // Image will cover the box and be cropped if needed
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <AddIcon fontSize="large" color="action" />
                  )}

                  {/* Invisible input field positioned over the box */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  />
                </Box>
                <span className='error-color f-12 font-weight-400'>{errors.image && errors.image}</span>
              </Grid>
              <Grid container item xs={12} lg={12} md={12} spacing={4}  >
                {/* Grid Item for Instructor Name */}
                <Grid item xs={6} lg={6} md={6} sx={{
                  maxHeight: 'fit-content',
                  paddingTop: '0px',
                  margin: '10px 0',
                  boxSizing: 'border-box'
                }} className='pt-0'>
                  <Typography className='f-13 light-text font-weight-600'>Instructor Company<span className='red-color f-14 font-weight-600'>*</span></Typography>
                  <TextField
                    name="instructorCompany"
                    value={formData.instructorCompany}
                    onChange={handleChange}
                    placeholder='Type the instructor company'
                    error={!!errors.instructorCompany}
                    helperText={errors.instructorCompany}
                    className={`form-control input-group ${formData.instructorCompany ? "has-value" : ""}`}
                    sx={{ width: '95%' }}  // Reduced TextField width
                  />
                </Grid>
                <Grid item xs={6} lg={6} md={6} sx={{
                  maxHeight: 'fit-content',
                  paddingTop: '0px',
                  margin: '10px 0',
                  boxSizing: 'border-box'
                }} className='pt-0'>
                  <Typography className='f-13 light-text font-weight-600'>Topics<span className='red-color f-14 font-weight-600'>*</span></Typography>
                  <TextField
                    name="topics"
                    value={formData.topics}
                    placeholder='Type the topics'
                    onChange={handleChange}
                    error={!!errors.instructorCompany}
                    helperText={errors.instructorCompany}
                    className={`form-control input-group ${formData.topics ? "has-value" : ""}`}
                    sx={{ width: '95%' }}  // Reduced TextField width
                  />
                </Grid>
              </Grid>

            </Grid>


          </Grid>
          <Grid container item xs={12} lg={12} md={12} spacing={1} className='pt-5'>
            <Grid item xs={1} letterSpacing={0.5} md={0.5} >
              <VideoIcon width="20px" className='icon-margin ' />
            </Grid>
            <Grid container item xs={11} lg={11.5} md={11.5} spacing={4}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography className='font-weight-600 f-16 light-text'>Webinar Details</Typography>
                </Box>
              </Grid>
              <Grid container item xs={12} lg={12} md={12} spacing={1} className=' pt-10'>
                <Grid item xs={12} lg={12} md={12} sx={{
                  maxHeight: 'fit-content',
                  padding: '0',
                  margin: '10px 0',
                  boxSizing: 'border-box',
                }}
                >
                  <Typography className='f-13 light-text font-weight-600'>Webinar Title<span className='red-color f-14 font-weight-600'>*</span></Typography>
                  <TextField
                    name="webinarTitle"
                    value={formData.webinarTitle}
                    onChange={handleChange}
                    placeholder='Type the webinar title'
                    error={!!errors.webinarTitle}
                    helperText={errors.webinarTitle}
                    className={`form-control input-group ${formData.webinarTitle ? 'has-value' : ''}`}
                    sx={{ width: '95%' }}  // Reduced TextField width
                  />
                </Grid>

                <Grid container item xs={12} lg={12} md={12} spacing={2} className=' pt-10'>
                  <Grid item xs={4} lg={3} md={3} sx={{
                    maxHeight: 'fit-content',
                    padding: '0',
                    margin: '0 0 10px 0',
                    boxSizing: 'border-box'
                  }}>
                    <Typography className='f-13 light-text font-weight-600'>Start Date<span className='red-color f-14 font-weight-600'>*</span></Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                      <DatePicker className={`date-time-css ${formData.startDate ? "has-value" : ""}`}
                        renderInput={(params) => <TextField {...params}
                          error={!!errors.startDate}
                          helperText={errors.startDate}
                          placeholder="Type start date"
                        />}
                        value={isEdit ? dayjs(formData.startDate) : formData.startDate}
                        onChange={handleDateChange}
                        placeholder="Type start date"
                      />
                    <span className='error-color ml-10 f-12 font-weight-400'>{errors.startDate && errors.startTime}</span>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4} lg={3} md={3} sx={{
                    maxHeight: 'fit-content',
                    padding: '0',
                    margin: '0 0 10px 0',
                    boxSizing: 'border-box'
                  }}>
                    <Typography className='f-13 light-text font-weight-600'>Start Time<span className='red-color f-14 font-weight-600'>*</span></Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        className={`date-time-css ${formData.startTime ? "has-value" : ""}`}
                        value={isEdit ? dayjs(formData.startTime) : formData.startTime}
                        onChange={(newTime) => handleTimeChange(newTime, 'startTime')}
                        ampm={false}  // Optional: 24-hour format, change to true for AM/PM format
                        renderInput={(params) => <TextField className="custom-text-field"
                          error={!!errors.startTime}
                          helperText={errors.startTime}
                          placeholder="Type start time"
                        />}
                      />
                    </LocalizationProvider>
                    <span className='error-color ml-10 f-12 font-weight-400'>{errors.startTime && errors.startTime}</span>
                  </Grid>
                  <Grid item xs={4} lg={3} md={3} sx={{
                    maxHeight: 'fit-content',
                    padding: '0',
                    margin: '0 0 10px 0',
                    boxSizing: 'border-box'
                  }}>
                    <Typography className='f-13 light-text font-weight-600'>End Time<span className='red-color f-14 font-weight-600'>*</span></Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        className={`date-time-css ${formData.endTime ? "has-value" : " has-error"}`}
                        value={isEdit ? dayjs(formData.endTime) : formData.endTime}
                        onChange={(newTime) => handleTimeChange(newTime, 'endTime')}
                        ampm={false}  //24-hour format, change to true for AM/PM format
                        renderInput={(params) => <TextField  {...params}
                          error={!!errors.endTime}
                          helperText={errors.endTime}
                          placeholder="Type end time"
                        />}
                      />
                    </LocalizationProvider>
                    <span className='error-color ml-10  f-12 font-weight-400'>{errors.endTime && errors.endTime}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* Modal Footer */}
        <Box display="flex" justifyContent="flex-start" mt={4} sx={{ borderTop: '1px solid #E0E0E0', pt: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              backgroundColor: '#0E51F1',
              padding: '9px 24px',
              borderRadius: '8px',
              fontWeight: "600",
              fontSize: "14px",
              textTransform: 'none'
            }}
          >
            {isEdit ? "Update Webinar" : "Create webinar"}
          </Button>
          <Typography
            className='f-14 font-weight-600'
            onClick={onClose}
            sx={{
              marginLeft: 5,  // Spacing between the elements
              color: '#0000EE',  // Blue link color (default link color)
              cursor: 'pointer',  // Pointer cursor for interaction
              textDecoration: 'none',
              display: "flex",
              alignItems: 'center'
              // No underline
            }}
          >
            Cancel
          </Typography>

        </Box>
      </Box>
    </Modal>
  );
}