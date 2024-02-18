import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";
import axios from "axios";

const AddReviewer = ({open,handleClose})=>{
    const [name,setName] = useState('')
    
    const handleClick =(e)=>{
        axios.post(`http://localhost:8000/reviewer/`, {name})
            .then((response) => (
                alert('Data Updated Successfully')
            ))
    }
    return(
        <>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullheight>
        <DialogTitle>Add Reviewer</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField id="outlined-basic" label="Name" variant="outlined"
                    value={name}
                    name={name}
                    onChange={(e) => setName(e.target.value)}
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
export default AddReviewer;