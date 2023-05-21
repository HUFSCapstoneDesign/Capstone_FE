import React, { useState } from "react";
import { RowBox } from "../../../styles/emotion";
import { ListItemButton, Collapse, Typography, Stack, MenuItem} from "@mui/material";
import { ChromePicker } from 'react-color';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


export default function ImageBoarder(props) {

    const [list, setList] = useState();
    const canEdit = (props.CurrentData.borderstyle !== "none");

    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
      }
      

    const handleList = () => {
        setList(!list);
    }

    const BorderStyle = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, borderstyle: e.target.value} : el));
    }
    
    const BorderSize = (e) => {  
        e.target.value > 0 ? props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, bordersize: e.target.value} : el)) : props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, bordersize: 0} : el));
    }

    const BorderColor = (color) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, bordercolor: color.hex} : el));
    }

    const BorderRadius = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, radius: parseInt(e.target.value)} : el));
    }

    return(
        <>
            <Typography variant="h6" style={{color: "#999999", fontSize:"20px", marginLeft:"15px"}}>테두리</Typography>
            <Stack direction = "row" style={{height: "50px", marginTop:"20px", marginLeft:"15px"}}>
                <FormControl>
                    <InputLabel id="border-style">Style</InputLabel>   
                    <Select 
                        label="Style"
                        onChange={BorderStyle}
                        style={{width: "170px", height: "40px"}}
                        value={props.CurrentData ? props.CurrentData.borderstyle : ""}                     
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
                {canEdit ? <TextField type="number" label="Width" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={BorderSize} value={props.CurrentData ? props.CurrentData.bordersize : ""}/>
                :<TextField disabled type="number" label="Width" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={BorderSize} value={props.CurrentData ? props.CurrentData.bordersize : ""}/>}
            </Stack>
            {(canEdit && props.CurrentData.bordersize !== 0) && 
            <ListItemButton onClick={handleList} style={{height: "35px", width:"150px", marginTop:"5px", marginLeft:"15px"}}>
                <Typography variant="h6" style={{fontSize:"17px", marginLeft:"-15px"}}> 테두리 색상</Typography>
                <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: props.CurrentData && props.CurrentData.bordercolor}}></div>
                {list ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}></ExpandMore>}
            </ListItemButton>}
            <Collapse in={list} timeout="auto" unmountOnExit style={{ width: "220px", marginLeft:"15px"}}>
                    <ChromePicker color = {props.CurrentData && props.CurrentData.bordercolor} onChange={BorderColor}></ChromePicker>                  
            </Collapse>
            <Box sx = {{width: 240, marginLeft: "15px", marginTop:"10px"}}>
            <Typography variant="h6" style={{fontSize:"18px", marginLeft:"7px", marginTop:"3px"}}>Radius</Typography>
                <RowBox>
                    <Slider
                        value={props.CurrentData ? props.CurrentData.radius : 0}
                        onChange={BorderRadius} 
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
                        value={props.CurrentData ? props.CurrentData.radius : 0}
                        onInput = {BorderRadius}
        />
                </RowBox>
            </Box>            
        </>
    )
}