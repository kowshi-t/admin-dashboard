import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import BookingTable from "../../common/components/BookingTabe/BookingTable";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../../common/common.css";

const Reservation = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [value, setValue] = React.useState(new Date());

  const handleChangeDateTime = (newValue) => {
    setValue(newValue);
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const url = "http://localhost:3001/api/getAllUsers";
      const { data } = await axios.get(url, config);
      setTableData(data.data);
      console.log(data.data);
    } catch (error) {}
  };

  return (
    <>
      <div id="wrapper">
        <ul
          className="navbar-nav sidebar sidebar-light accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href=""
          >
            <div className="sidebar-brand-icon">
              <img src="" />
            </div>
            <div className="sidebar-brand-text mx-3">Express Hair Salon</div>
          </a>

          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <a className="nav-link" href="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span className="active-heading">Dashboard</span>
            </a>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">FEATURES</div>
          <li className="nav-item">
            <a className="nav-link" href="/reservation">
              <i className="far fa-fw fa-window-maximize"></i>
              <span>Reservation</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/events">
              <i className="fab fa-fw fa-wpforms"></i>
              <span>Events</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/client">
              <i className="fas fa-fw fa-table"></i>
              <span>Clients</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin">
              <i className="fas fa-fw fa-palette"></i>
              <span>Admin</span>
            </a>
          </li>
        </ul>

        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
              <button
                id="sidebarToggleTop"
                class="btn btn-link rounded-circle mr-3"
              >
                <i class="fa fa-bars"></i>
              </button>
            </nav>

            <div class="container-fluid" id="container-wrapper">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Reservation</h1>
              </div>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <Button variant="contained" onClick={handleClickOpen}>
                  Add Reservation
                </Button>
              </div>
              <BookingTable />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <CssBaseline />
        <DialogTitle>Add Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new reservation, please fill the below details and submit
            them.
          </DialogContentText>
          <br />
          <Box component="form">
            <Stack spacing={2} fullWidth>
              <Autocomplete
                id="customer-name"
                Customer
                Name
                options={tableData.map(
                  (option) => option.firstName + " " + option.lastName
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Customer Name" />
                )}
              />
              <Autocomplete
                services
                id="services"
                options={services.map((option) => option.service)}
                renderInput={(params) => (
                  <TextField {...params} label="Services" />
                )}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="Date&Time"
                    value={value}
                    onChange={handleChangeDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Reserve</Button>
        </DialogActions>
      </Dialog>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

const services = [
  { service: "Haircut/styling" },
  { service: "Nail care" },
  { service: "Facials / skin care" },
  { service: "Massage" },
];

export default Reservation;
