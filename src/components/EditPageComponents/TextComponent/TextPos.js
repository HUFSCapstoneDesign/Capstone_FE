import React from "react";
import { Typography, Stack } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function TextPos(props) {

    const ChangeX = (e) => {
        const width = props.CurrentData.width;
        const value = e.target.value < 0 ? 0 : (props.temWidth < width + Number(e.target.value)) ? parseInt(props.temWidth - width) : Number(e.target.value);
        props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, x: value} : el));
    }

    const ChangeY = (e) => {
        const height = props.CurrentData.height;
        const value = e.target.value < 0 ? 0 : props.temHeight < height + Number(e.target.value) ? props.temHeight - height : Number(e.target.value);
        props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, y: value} : el));
    }

    return(
        <>
            <Typography variant="h6" style={{color: "#999999", fontSize:"20px", marginLeft:"15px"}}>위치</Typography>
            <Stack direction = "row" style={{height: "50px", marginTop:"10px", marginLeft:"15px"}}>
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px"}}>가로</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="position-x"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px", textAlign:"right"}}
                        onChange = {ChangeX}
                        value={props.CurrentData ? props.CurrentData.x : ""}
                    />
                </FormControl>

                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px", marginLeft:"20px"}}>세로</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="position-y"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChangeY}
                        value={props.CurrentData ? props.CurrentData.y : ""}
                    />
                </FormControl>
            </Stack>
        </>
    )
}