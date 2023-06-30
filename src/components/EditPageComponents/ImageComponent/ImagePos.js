import React, { memo } from "react";
import { Typography, Stack, FormControl, OutlinedInput } from "@mui/material";
import { useData } from "../../../store";

function ImagePos(props) {
    const {temWidth, temHeight} = useData();
    const ChangeX = (e) => {
        const value = e.target.value < 0 ? 0 : (temWidth < props.width + Number(e.target.value)) ? temWidth - props.width : Number(e.target.value);
        props.updateImage(props.id, {x: parseInt(value)});
    }

    const ChangeY = (e) => {
        const value = e.target.value < 0 ? 0 : temHeight < props.height + Number(e.target.value) ? temHeight - props.height : Number(e.target.value) ;
        props.updateImage(props.id, {y: parseInt(value)});
    }

    const ChangeW = (e) => {
        if(temWidth < props.posX + Number(e.target.value)) {
            const value = props.posX - Number(e.target.value) + props.width;
            props.updateImage(props.id, {width: (value > 0 ? parseInt(value) : 0)});
        }
        else props.updateImage(props.id, {width: parseInt(e.target.value)})
        
    }

    const ChangeH = (e) => {
        if(temHeight < props.posY + Number(e.target.value)) {
            const value = props.posY - Number(e.target.value) + props.height;
            props.updateImage(props.id, {height: (value > 0 ? parseInt(value) : 0)})
        }
        else props.updateImage(props.id, {height: parseInt(e.target.value)})
    }

    const ChangeR = (e) => {
        const value = e.target.value < 0 ? 0 : e.target.value >= 360 ? e.target.value % 360 : e.target.value;
        props.updateImage(props.id, {rotation: parseInt(value)});
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
                        style={{height:"30px"}}
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
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px"}}>너비</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="size-width"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChangeW}
                        value={props.width}
                    />
                </FormControl>
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px", marginLeft:"20px"}}>높이</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="size-height"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChangeH}
                        value={props.height}
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
export default memo(ImagePos);