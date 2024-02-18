import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import moment from "moment";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import AddReviewer from "./AddReviewer";
import AddAddress from "./AddAddress";

const New = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [application, setApplication] = useState({})
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [ownership, setOwnership] = useState('')
    const [govt_id, setGovt_id] = useState('')
    const [govt_id_number, setGovt_id_number] = useState('')
    const [category, setCategory] = useState('')
    const [load, setLoad] = useState(0)
    const [date, setDate] = useState(moment()
        .locale('en')
        .format('YYYY-MM-DD'))
    const [status, setStatus] = useState('Pending')
    const [reviewer, setReviewer] = useState(null)
    const [comment, setComment] = useState('Documents verification in progress')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    const [pincode, setPincode] = useState('')
    const [district, setDistrict] = useState('')
    const [dstate, setDstate] = useState('')
    const [addresses, setAddresses] = useState([])
    const [districts, setDistricts] = useState([])
    const [dstates, setDstates] = useState([])
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        axios.get(`http://localhost:8000/address/`)
            .then((response) => (
                setAddresses(response.data)
            ))
    }, [open])

    useEffect(() => {
        let new_value = addresses.filter((item) => item.pincode === pincode)
        setDistricts([...new Set(new_value.map(obj => obj['district']))])
        setDstates([...new Set(new_value.map(obj => obj['state']))])
    }, [pincode])

    const handleLoad = (e) => {
        const value = e.target.value;
        setLoad(value)
        if (value && parseInt(value) <= 200) {
            setHelperText('')
            setError(false);
        } else {
            setError(true);
            setHelperText("Load Should not exceed 200KV.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let new_list = addresses.filter((item) => item.pincode === pincode & item.state === dstate & item.district === district)
        let payload = { name, gender, 'reviewer_id': null, status, comment, 'approval_date': null, date, load, category, govt_id, govt_id_number, ownership, 'address_id': new_list[0].id }
        axios.post(`http://localhost:8000/application/`, payload)
            .then((response) => (
                alert('Data Updated Successfully')
            ))
    }
    return (
        <div style={{ boxSizing: "border-box", padding: "0px 10px" }}>
            <AddAddress 
            open = {open}
            handleClose={handleClose} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                    value={name}
                    name={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Govt ID Proof</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={govt_id}
                        label="Govt ID Proof"
                        onChange={(e) => setGovt_id(e.target.value)}
                    >
                        <MenuItem value='AADHAR'>AADHAR</MenuItem>
                        <MenuItem value='VOTER_ID'>VOTER_ID</MenuItem>
                        <MenuItem value='PAN'>PAN</MenuItem>
                        <MenuItem value='PASSPORT'>PASSPORT</MenuItem>
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Govt ID Number" variant="outlined"
                    value={govt_id_number}
                    onChange={(e) => setGovt_id_number(e.target.value)}
                />

                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Ownership</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ownership}
                        label="OwnerShip"
                        onChange={(e) => setOwnership(e.target.value)}
                    >
                        <MenuItem value='INDIVIDUAL'>INDIVIDUAL</MenuItem>
                        <MenuItem value='JOINT'>JOINT</MenuItem>
                    </Select>
                </FormControl>

            </div><br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value='Commerical'>Commerical</MenuItem>
                        <MenuItem value='Residential'>Residential</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Load" variant="outlined"
                    value={load}
                    error={error}
                    onChange={handleLoad}
                    helperText={helperText}
                />
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Pincode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pincode}
                        label="Pincode"
                        onChange={(e) => setPincode(e.target.value)}
                    >
                        {addresses.map((address, index) => (
                            <MenuItem key={index} value={address.pincode}>
                                {address.pincode}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">District</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={district}
                        label="District"
                        onChange={(e) => setDistrict(e.target.value)}
                    >
                        {districts.map((d, index) => (
                            <MenuItem key={index} value={d}>
                                {d}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dstate}
                        label="State"
                        onChange={(e) => setDstate(e.target.value)}
                    >
                        {dstates.map((d, index) => (
                            <MenuItem key={index} value={d}>
                                {d}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div><br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "0px 20px" }}>
                <Button variant="contained" color="primary"
                    onClick={(e) => navigate(-1)}
                >
                    Back
                </Button>
                <Button variant="contained" color="primary"
                    onClick={handleClickOpen}
                >
                    Add Address
                </Button>

                <Button variant="contained" color="primary"
                    onClick={handleSubmit}
                    disabled={error}
                >
                    Add Application
                </Button>
            </div>

        </div>


    )

}

export default New;