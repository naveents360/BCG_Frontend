import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";
import axios from "axios";

const AddAddress = ({open,handleClose})=>{
    const [state,setState] = useState('')
    const [district,setDistrict] = useState('')
    const [pincode,setPincode] = useState('')
    
    const handleClick = async(e)=>{
        try{
            const res = await axios.post(`http://localhost:8000/address/`, {pincode,district,state});
            handleClose()
            alert('Data Inserted')
        }catch(error){
            console.log(error)
        }
        
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        const newValue = value.replace(/\D/g, '');
        setPincode(newValue)
    };

    return(
        <>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullheight>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField id="outlined-basic" label="Pincode" variant="outlined"
                    value={pincode}                    
                    onChange={handleInputChange}
                /> &nbsp; &nbsp; &nbsp;
            <TextField id="outlined-basic" label="District" variant="outlined"
                    value={district}                    
                    onChange={(e) => setDistrict(e.target.value)}
                />&nbsp; &nbsp; &nbsp;
            <TextField id="outlined-basic" label="State" variant="outlined"
                    value={state}                    
                    onChange={(e) => setState(e.target.value)}
                />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
        </>

    )
}
export default AddAddress;
