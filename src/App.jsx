import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import "./index.css"; // Import custom CSS file for additional styling
import axios from "axios";
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    services: "",
    description:""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    services: "",
    description:""
  });

  // ...

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  //     const apiUrl = "http://formz.in/api/task";

  //     try {
  //       const response = await axios.post(corsProxyUrl + apiUrl, formData, {
  //         headers: {
  //           "X-Requested-With": "XMLHttpRequest",
  //         },
  //       });
  //       console.log(response.data); // Handle the response from the API if needed
  //     } catch (error) {
  //       console.error(error); // Handle any errors that occur during the request
  //     }
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://formz.in/api/task', toFormData(formData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (response.status === 201) {
          console.log('Data submitted successfully');
          // Handle success case if needed
        } else {
          console.log('Error submitting data');
          // Handle error case if needed
        }
      } catch (error) {
        console.error('Request failed:', error.message);
        // Handle error case if needed
      }
    }
  };
  
  // Helper function to convert data object to form-urlencoded format
  const toFormData = (data) => {
    const formData = new URLSearchParams();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log(formData.toString());
    return formData.toString();
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate name
    if (!formData.name) {
      errors.name = "Please enter your name";
      isValid = false;
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone number
    if (!formData.phone) {
      errors.phone = "Please enter your phone number";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Validate message
    if (!formData.message) {
      errors.message = "Please enter a message";
      isValid = false;
    }

    // Validate services
    if (!formData.services) {
      errors.services = "Please select a service";
      isValid = false;
    }

    // Validate services
    if (!formData.description) {
      errors.description= "Please write a description";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 500, padding: 2 }}>
        <h2 className="form-heading">Contact Form</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!formErrors.name}
            className="form-input"
          />
          {formErrors.name && (
            <FormHelperText error>{formErrors.name}</FormHelperText>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!formErrors.email}
            className="form-input"
          />
          {formErrors.email && (
            <FormHelperText error>{formErrors.email}</FormHelperText>
          )}

          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!formErrors.phone}
            className="form-input"
          />
          {formErrors.phone && (
            <FormHelperText error>{formErrors.phone}</FormHelperText>
          )}

          <TextField
            label="How Can We Help?"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!formErrors.message}
            className="form-input"
          />
          {formErrors.message && (
            <FormHelperText error>{formErrors.message}</FormHelperText>
          )}

          <FormControl
            fullWidth
            margin="normal"
            required
            error={!!formErrors.services}
            className="form-input"
          >
            <InputLabel>Services</InputLabel>
            <Select
              value={formData.services}
              name="services"
              onChange={handleChange}
            >
              <MenuItem value="">Select a service</MenuItem>
              <MenuItem value="service1">Service 1</MenuItem>
              <MenuItem value="service2">Service 2</MenuItem>
              <MenuItem value="service3">Service 3</MenuItem>
            </Select>
            {formErrors.services && (
              <FormHelperText error>{formErrors.services}</FormHelperText>
            )}
          </FormControl>


          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={!!formErrors.description}
            className="form-input"
          />
          {formErrors.description && (
            <FormHelperText error>{formErrors.description}</FormHelperText>
          )}



          <Button variant="contained" type="submit" className="submit-button">
            Send Message
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ContactForm;
