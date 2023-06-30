import React, { memo, useState } from "react";
import { Typography, Stack, FormControl, InputLabel, Select, MenuItem, TextField, ListItemButton, Collapse, Box, Slider, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ChromePicker } from 'react-color';
import { RowBox } from "../../../styles/emotion";

function ImageBoarder(props) {
    const canEdit = (props.borderstyle !== "none");
    const [list, setList] = useState(false);
    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    } 

    const ChangeBorderStyle = (e) => {
        props.updateImage(props.id, {borderstyle: e.target.value});
        setList(false);
    }

    const ChangeBorderSize = (e) => {
        const value = Number(e.target.value)
        props.updateImage(props.id, {bordersize: (value > 0 ? value : 0)});
        setList(false);
    }

    const handleList = () => {
        setList(!list);
    }

    const ChangeBorderColor = (color) => {
        props.updateImage(props.id, {bordercolor: color.hex});
    }

    const ChangeRadius = (e) => {
        props.updateImage(props.id, {radius: parseInt(e.target.value)});
    }

    return(
        <>
            <Typography variant="h6" style={{color: "#999999", fontSize:"20px", marginLeft:"15px"}}>테두리</Typography>
            <Stack direction = "row" style={{height: "50px", marginTop:"20px", marginLeft:"15px"}}>
                <FormControl>
                    <InputLabel id="border-style">Style</InputLabel>   
                    <Select 
                        label="Style"
                        onChange={ChangeBorderStyle}
                        style={{width: "170px", height: "40px"}}
                        value={props.borderstyle}                     
                    >   
                        <MenuItem value = {"none"}>None</MenuItem>
                        <MenuItem value = {"dotted"}>Dotted</MenuItem>
                        <MenuItem value = {"dashed"}>Dashed</MenuItem>
                        <MenuItem value = {"solid"}>Solid</MenuItem>
                        <MenuItem value = {"double"}>Double</MenuItem>
                        <MenuItem value = {"groove"}>Groove</MenuItem>
                        <MenuItem value = {"ridge"}>Ridge</MenuItem>
                        <MenuItem value = {"inset"}>Inset</MenuItem>
                        <MenuItem value = {"outset"}>Outset</MenuItem>
                    </Select>
                </FormControl>
                {canEdit ? <TextField type="number" label="Width" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={ChangeBorderSize} value={props.bordersize}/>
                :<TextField disabled type="number" label="Width" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={ChangeBorderSize} value={props.bordersize}/>}
            </Stack>
            {(canEdit && props.bordersize !== 0) && 
            <ListItemButton onClick={handleList} style={{height: "35px", width:"150px", marginTop:"5px", marginLeft:"15px"}}>
                <Typography variant="h6" style={{fontSize:"17px", marginLeft:"-15px"}}> 테두리 색상</Typography>
                <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: props.bordercolor}}></div>
                {list ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}></ExpandMore>}
            </ListItemButton>}
            <Collapse in={list} timeout="auto" unmountOnExit style={{ width: "220px", marginLeft:"15px"}}>
                <ChromePicker color = {props.bordercolor} onChange={ChangeBorderColor}></ChromePicker>                  
            </Collapse>
            <Box sx = {{width: 240, marginLeft: "15px", marginTop:"10px"}}>
            <Typography variant="h6" style={{fontSize:"18px", marginLeft:"7px", marginTop:"3px"}}>Radius</Typography>
                <RowBox>
                    <Slider
                        value={props.radius}
                        onChange={ChangeRadius} 
                        style={{marginLeft: "20px", width: "170px"}}
                        valueLabelDisplay="auto"
                        slots={{valueLabel: ValueLabelComponent}}
                        sx = {{color: "#70E000"}}
                        min={0} max={100} step={1}                        
                    ></Slider>
                    <TextField
                        id="radius-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                        size = "small"
                        sx = {{width: "80px", left:"10px", top:"-5px"}}
                        value={props.radius}
                        onInput = {ChangeRadius}
        />
                </RowBox>
            </Box>
        </>
    )
}
export default memo(ImageBoarder);