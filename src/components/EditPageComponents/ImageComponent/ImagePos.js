import React from "react";
import { Typography, Stack } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function ImagePos(props) {
    //temHeight = {temHeight} temWidth = {temWidth}
    const ChangeX = (e) => {
        const width = props.CurrentData.width;
        const value = (props.temWidth < width + Number(e.target.value)) ? props.temWidth - width : Number(e.target.value);
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, x: value} : el));
    }

    const ChangeY = (e) => {
        const height = props.CurrentData.height;
        const value = props.temHeight < height + Number(e.target.value) ? props.temHeight - height : Number(e.target.value) ;
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, y: value} : el));
    }

    const ChangeW = (e) => {
        const {x, width} = props.CurrentData;
        if(props.temWidth < x + Number(e.target.value)) {
            const posX = x - (Number(e.target.value) - width);
            props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, x: posX, width : Number(e.target.value)} : el));
        }
        else {
            props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, width : Number(e.target.value)} : el));
        }     
    }

    const ChnageH = (e) => {
        const {y, height} = props.CurrentData;
        if(props.temHeight < y + Number(e.target.value)) {
            const posY = y - (Number(e.target.value) - height);
            props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, y: posY, height : Number(e.target.value)} : el));
        }
        else {
            props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, height: Number(e.target.value)} : el));
        }       
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
            <Stack direction = "row" style={{height: "50px", marginTop:"-5px", marginLeft:"15px"}}>
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px"}}>너비</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="size-width"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChangeW}
                        value={props.CurrentData ? props.CurrentData.width : ""}
                    />
                </FormControl>
                <Typography variant="h6" style={{color: "#999999", fontSize:"15px", marginTop:"3px", marginLeft:"20px"}}>높이</Typography>
                <FormControl variant="outlined" style={{width:"80px", marginLeft:"10px"}}>
                    <OutlinedInput
                        id="size-height"
                        type="number"
                        aria-describedby="outlined-weight-helper-text"
                        style={{height:"30px"}}
                        onChange = {ChnageH}
                        value={props.CurrentData ? props.CurrentData.height : ""}
                    />
                </FormControl>
            </Stack>
        </>
    )
}