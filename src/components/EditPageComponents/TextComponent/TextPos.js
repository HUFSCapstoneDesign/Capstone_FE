import React, { memo } from "react";
import { Typography, Stack, FormControl, OutlinedInput } from "@mui/material";
import { useData } from "../../../store";

function TextPos(props) {
    const {temWidth, temHeight} = useData();
    const ChangeX = (e) => {
        const value = e.target.value < 0 ? 0 : (temWidth < props.width + Number(e.target.value)) ? parseInt(temWidth - props.width) : Number(e.target.value);
        props.updateText(props.id, {x: parseInt(value)});
    }
    const ChangeY = (e) => {
        const value = e.target.value < 0 ? 0 : (temHeight < props.height + Number(e.target.value)) ? temHeight - props.height : Number(e.target.value);
        props.updateText(props.id, {y: parseInt(value)});
    }

    const ChangeR = (e) => {
        const value = e.target.value < 0 ? 0 : e.target.value >= 360 ? e.target.value % 360 : e.target.value;
        props.updateText(props.id, {rotation: parseInt(value)});
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
                        value={props.posX}
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
                        value={props.posY}
                    />
                </FormControl>
            </Stack>
            <Stack direction = "row" style={{height: "50px", marginLeft:"15px"}}>
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px"}}>회전</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="position-r"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChangeR}
                        value={props.rotation ? props.rotation : 0}
                    />
                </FormControl>
            </Stack>
        </>
    )
}

export default memo(TextPos);