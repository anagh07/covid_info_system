import { React, Component } from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';
import { Grid } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class AddDoctor extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      doctors: [],
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      licenseNumber: '',
      password: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { doctors, firstName, lastName, email, dob, licenseNumber, password } = this.state;
    doctors.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      licenseNumber: licenseNumber,
      password: password,
    })
    this.setState({
      doctors
    })
  }

  deleteTask = (index) => {
    const doctors = this.state.doctors;
    doctors.splice(index, 1);
    this.setState({
      doctors
    })
  }

  render() {
    const { doctors, firstName, lastName, email, dob, licenseNumber, password } = this.state;
    return(
      <Grid container spacing={12} className="root">
        <Grid item xs={7}>
          <Card>
            <CardContent>
              <h2 className="heading">List of Doctors</h2>
              { doctors.length <= 0 ?
                <div className="Alert-message heading">No doctors has been added. Please add a doctor to the list.</div> :
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { doctors.map((doctor, index) => {

                          return <ListItem key = {index}
                                           index = {index}
                                           deleteTask = {this.deleteTask}
                                           details = {doctor}
                                  />
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <h3 className="heading">Add Doctor</h3>
              <form>
                <label>First Name:</label>
                <input name='firstName'
                    onChange={this.handleChange}
                    type='text'
                    value={firstName}
                    className="Input-style"
                />
                <br/>
                <label>Last Name:</label>
                <input name='lastName'
                    onChange={this.handleChange}
                    type='text'
                    value={lastName}
                    className="Input-style"
                />
                <br/>
                <label>Date of Birth:</label>
                <input name='dob'
                    onChange={this.handleChange}
                    type='text'
                    value={dob}
                    className="Input-style"
                />
                <br/>
                <label>Email Address:</label>
                <input name='email'
                    onChange={this.handleChange}
                    type='text'
                    value={email}
                    className="Input-style"
                />
                <br/>
                <label>License Number:</label>
                <input name='licenseNumber'
                    onChange={this.handleChange}
                    type='text'
                    value={licenseNumber}
                    className="Input-style"
                />
                <br/>
                <label>Password:</label>
                <input name='password'
                    onChange={this.handleChange}
                    type='password'
                    value={password}
                    className="Input-style"
                />
                <br/>
                <button className="Form-button" onClick={this.handleSubmit}>ADD DOCTOR</button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default AddDoctor;
