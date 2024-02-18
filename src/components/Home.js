import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
//import './Home.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Typography, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Home = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [search, setSearch] = useState('')
    const [startdate, setStartdate] = useState('2021-01-01')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [endDate, setEndDate] = useState(moment()
        .locale('en')
        .format('YYYY-MM-DD'));

    const [data, setData] = useState([])
    const [status, setStatus] = useState('Approved')
    useEffect(() => {
        axios.get(`http://localhost:8000/application/?id=${search}&start_date=${startdate}&end_date=${endDate}`)
            .then((response) => {
                setApplications(response.data)
            })

    }, [search, startdate, endDate])

    useEffect(() => {
        axios.get(`http://localhost:8000/application/dashboard_api?status=${status}`)
            .then((response) => {
                setData(response.data)
            })

    }, [status])

    const handleInputChange = (event) => {
        const { value } = event.target;
        const newValue = value.replace(/\D/g, '');
        setSearch(newValue)
    };

    return (
        <div style={{ boxSizing: "border-box", padding: "0px 10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField id="outlined-basic" label="Application ID" variant="outlined"
                    value={search}
                    onChange={handleInputChange}
                    inputProps={{
                        pattern: '[0-9]*',
                    }}
                />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <TextField id="outlined-basic" label="Start Date" variant="outlined"
                    value={startdate}
                    type="date"
                    onChange={(e) => setStartdate(e.target.value)}
                    style={{ width: "225px" }}
                />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <TextField id="outlined-basic" label="End Date" variant="outlined"
                    value={endDate}
                    type="date"
                    onChange={(e) => setStartdate(e.target.value)}
                    style={{ width: "225px" }}
                />

                <Button variant="contained" color="primary"
                    style={{ marginLeft: "35%" }}
                    onClick={(e) => navigate(`/application`)}
                >
                    Create Application
                </Button>
            </div>
            <br />

            <div>
                {/* <Table className="customers" responsive striped borderless >
                    <thead className="table-head">
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Owner Ship</th>
                            <th>Govt ID Type</th>
                            <th>Number</th>
                            <th>Category</th>
                            <th>Load(in KV)</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody className="table-content">
                        {applications.map((application, index) => (
                            <tr key={index}>
                                <td onClick={(e) => navigate(`/application/${application.id}`)} style={{ color: 'blue', cursor: "pointer" }}>
                                    {application.name}
                                </td>
                                <td>{application.gender}</td>
                                <td>{application.ownership}</td>
                                <td>{application.govt_id}</td>
                                <td>{application.govt_id_number}</td>
                                <td>{application.category}</td>
                                <td style={{ alignItems: 'right' }}>{application.load}</td>
                                <td>{application.date}</td>
                                <td>{application.status}</td>
                                <td>{application.comment}</td>
                            </tr>

                        ))}
                    </tbody>
                </Table> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell >Gender</StyledTableCell>
                                <StyledTableCell >OwnerShip</StyledTableCell>
                                <StyledTableCell >Govt ID Type</StyledTableCell>
                                <StyledTableCell >Number</StyledTableCell>
                                <StyledTableCell >Category</StyledTableCell>
                                <StyledTableCell >Load(in KV)</StyledTableCell>
                                <StyledTableCell >Applied Date</StyledTableCell>
                                <StyledTableCell >Status</StyledTableCell>
                                <StyledTableCell >Comment</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((application, index) => (
                                    <StyledTableRow key={application.id}>
                                        <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row"
                                            onClick={(e) => navigate(`/application/${application.id}`)} style={{ color: 'blue', cursor: "pointer" }}
                                        >
                                            {application.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{application.gender}</StyledTableCell>
                                        <StyledTableCell >{application.ownership}</StyledTableCell>
                                        <StyledTableCell >{application.govt_id}</StyledTableCell>
                                        <StyledTableCell >{application.govt_id_number}</StyledTableCell>
                                        <StyledTableCell >{application.category}</StyledTableCell>
                                        <StyledTableCell align="center">{application.load}</StyledTableCell>
                                        <StyledTableCell >{application.date}</StyledTableCell>
                                        <StyledTableCell >{application.status}</StyledTableCell>
                                        <StyledTableCell >{application.comment}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {applications.length > 0 ? <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={applications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> : null}
            </div>

            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Month Wise Application Count:-
                </Typography>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value='Approved'>Approved</MenuItem>
                        <MenuItem value='Pending'>Pending</MenuItem>
                        <MenuItem value='Rejected'>Rejected</MenuItem>
                        <MenuItem value='Connection Released'>Connection Released</MenuItem>
                    </Select>
                </FormControl>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="count" />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="count" fill="blue" />
                    </BarChart>
                    <br /><br />
                    <LineChart

                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="count" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="blue" />
                    </LineChart>                    
                </ResponsiveContainer>


            </Paper>

        </div>
    )
}

export default Home;