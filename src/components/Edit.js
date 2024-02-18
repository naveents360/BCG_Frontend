import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import moment from "moment";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import AddAddress from "./AddAddress";
import AddReviewer from "./AddReviewer";


const Edit = () => {
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
    const [approval_date, setApproval_date] = useState(moment()
        .locale('en')
        .format('YYYY-MM-DD'))
    const [status, setStatus] = useState('')
    const [reviewer, setReviewer] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = useState('')
    const [pincode, setPincode] = useState('')
    const [district, setDistrict] = useState('')
    const [dstate, setDstate] = useState('')
    const [addresses, setAddresses] = useState([])
    const [districts, setDistricts] = useState([])
    const [dstates, setDstates] = useState([])
    const [reviewers, setReviewers] = useState([])
    const [aopen, setAopen] = useState(false);
    const [ropen, setRopen] = useState(false);

    const rhandleClickOpen = () => {
      setRopen(true);
    };
  
    const rhandleClose = () => {
      setRopen(false);
    };

    const ahandleClickOpen = () => {
      setAopen(true);
    };
  
    const ahandleClose = () => {
      setAopen(false);
    };  

    const updateData = (data) => {
        setName(data.name)
        setApproval_date(data.approval_date)
        setCategory(data.category)
        setLoad(data.load)
        setGender(data.gender)
        setOwnership(data.ownership)
        setGovt_id(data.govt_id)
        setGovt_id_number(data.govt_id_number)
        setDate(data.date)
        setStatus(data.status)
        setComment(data.comment)
        setError(false)
        if (data.address) {
            setDstate(data.address.state)
            setDistrict(data.address.district)
            setPincode(data.address.pincode)
        }
        if (data.reviewer) {
            setReviewer(data.reviewer.id)
        }

    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/application/${id}`)
            .then((response) => (
                updateData(response.data)
            ))
    },[])

    useEffect(() => {        
        axios.get(`http://localhost:8000/address/`)
            .then((response) => (
                setAddresses(response.data)
            ))
        axios.get(`http://localhost:8000/reviewers/`)
            .then((response) => (
                setReviewers(response.data)
            ))
    }, [ropen,aopen])

    useEffect(() => {
        let new_value = addresses.filter((item) => item.pincode === pincode)
        setDistricts([...new Set(new_value.map(obj => obj['district']))])
        setDstates([...new Set(new_value.map(obj => obj['state']))])
    }, [pincode])

    useEffect(() => {
        console.log(status)
        if (status === 'Approved') {
            setComment("Installation pending")
        }
        if (status === 'Connection Released') {
            setComment("Installation completed")
        }
        if (status === 'Pending') {
            setComment("Documents verification in progress")
        }
        if (status === 'Rejected') {
            setComment("KYC failed")
        }

    }, [status])
    
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

    const handleSubmit =(e)=>{
        e.preventDefault();        
        let new_list = addresses.filter((item)=> item.pincode===pincode & item.state === dstate & item.district === district)        
        let payload = {name,gender,'reviewer_id':reviewer,status,comment,approval_date,date,load,category,govt_id,govt_id_number,ownership,'address_id':new_list[0].id}        
        axios.put(`http://localhost:8000/application/${id}/`,payload)
            .then((response) => (                
                alert('Data Updated Successfully')
            ))
    }
    return (
        <div style={{ boxSizing: "border-box", padding: "0px 10px" }}>
            <AddAddress 
            open = {aopen}
            handleClose={ahandleClose} />
            <AddReviewer 
            open = {ropen}
            handleClose={rhandleClose} />
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
                        disabled
                        label="Govt ID Proof"
                    >
                        <MenuItem value='AADHAR'>AADHAR</MenuItem>
                        <MenuItem value='VOTER_ID'>VOTER_ID</MenuItem>
                        <MenuItem value='PAN'>PAN</MenuItem>
                        <MenuItem value='PASSPORT'>PASSPORT</MenuItem>
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Govt ID Number" variant="outlined"
                    disabled
                    value={govt_id_number}
                />

                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Ownership</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ownership}
                        label="OwnerShip"
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

                <TextField id="outlined-basic" label="Applied Date" variant="outlined"
                    value={date}
                    type="date"
                    disabled
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: "225px" }}
                />
                <TextField id="outlined-basic" label="Approval Date" variant="outlined"
                    value={approval_date}
                    type="date"
                    onChange={(e) => setApproval_date(e.target.value)}
                    style={{ width: "225px" }}
                />
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
            </div><br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
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
                <FormControl style={{ width: "225px" }}>
                    <InputLabel id="demo-simple-select-label">Reviewer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reviewer}
                        label="Reviewer"
                        onChange={(e) => setReviewer(e.target.value)}
                    >
                        {reviewers.map((review, index) => (
                            <MenuItem key={index} value={review.id}>
                                {review.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Comment" variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <br/>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between",padding: "0px 20px" }}>
            <Button variant="contained" color="primary" 
                onClick={(e)=>navigate(-1)}
                >
                    Back
                </Button>
                <Button variant="contained" color="primary"
                    onClick={ahandleClickOpen}
                >
                    Add Address
                </Button>
                <Button variant="contained" color="primary"
                    onClick={rhandleClickOpen}
                >
                    Add Reviewer
                </Button>
                <Button variant="contained" color="primary" 
                onClick={handleSubmit}
                disabled = {error}
                >
                    Update Details
                </Button>
            </div>

        </div>


    )

}

export default Edit;