import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { RowBox } from "../../../styles/emotion";
import {ListItemButton, Collapse, TextField, Typography} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';

export default function ImageFilter(props) {

    const [filter, setFilter] = useState(false);

    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }
    
    const filterOption = () => {
        setFilter(!filter);
    }

    const blurChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, blur: (e.target.value) * 0.1} : el));
    }

    const brightnessChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, brightness: (e.target.value) + 100} : el));
    }

    const contrastChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, contrast: (e.target.value) + 100} : el));
    }

    const grayscaleChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, grayscale: (e.target.value)} : el));
    }

    const hueChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, hue: (e.target.value) * 3.6} : el));
    }

    const invertChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, invert: (e.target.value)} : el));
    }

    const saturateChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, saturate: (e.target.value) + 100} : el));
    }

    const sepiaChange = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, sepia: (e.target.value)} : el));
    }

    return(
        <>
            <div>
                <ListItemButton onClick={filterOption} sx={{marginLeft:"5px",height: "40px", width: "270px"}}>
                <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>필터</Typography>
                    {filter ? <ExpandLess style={{marginLeft:"180px", marginRight:"-30px"}}></ExpandLess> : <ExpandMore style={{marginLeft:"180px", marginRight:"-30px"}}></ExpandMore>}
                </ListItemButton>
                
                <Collapse in = {filter} timeout="auto" unmountOnExit>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                    <Typography variant="h6" style={{color: "#999999", fontSize:"18px", marginLeft:"10px"}}>흐림</Typography>
                        <RowBox>
                            <Slider value={props.CurrentData && props.CurrentData.blur*10} onChange={blurChange}
                            style={{marginLeft: "20px", width: "170px"}}
                            valueLabelDisplay="auto"
                            slots={{valueLabel: ValueLabelComponent}}
                            sx = {{color: "#70E000"}}></Slider>
                            <TextField value={props.CurrentData ? parseInt(props.CurrentData.blur*10) : ""} min = {0} max = {100} onChange={blurChange} id="blur-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        
                        size = "small"
                        sx = {{width: "80px", left:"10px", top:"-5px"}}></TextField>
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>                
                    <Typography variant="h6" style={{color: "#999999", fontSize:"18px", marginLeft:"10px"}}>밝기</Typography>
                        <RowBox>
                            <Slider
                                id = "brightness-slider"
                                value={props.CurrentData ? props.CurrentData.brightness-100 : ""}
                                onChange={brightnessChange}
                                min={-100} max={100} step={1}
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}
                            />
                            <TextField
                                value={props.CurrentData ? parseInt(props.CurrentData.brightness-100) : ""}
                                onChange={brightnessChange}
                                id="brightness-number"
                                min = {-100} max = {100} step={1}
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>대비</Typography>
                        <RowBox>
                            <Slider
                                id = "contrast-slider" 
                                value={props.CurrentData && props.CurrentData.contrast-100}
                                onChange={contrastChange} style={{marginLeft: "20px", width: "170px"}}
                                min = {-100} max = {100} step={1}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}
                            />
                            <TextField 
                                value={props.CurrentData && parseInt(props.CurrentData.contrast-100)} 
                                min = {-100} max = {100} step={1} 
                                onChange={contrastChange}
                                id = "contrast-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>흑백</Typography>
                        <RowBox>
                            <Slider 
                                id = "grayscale-slider"
                                value={props.CurrentData && props.CurrentData.grayscale} 
                                onChange={grayscaleChange}
                                min = {0} max={100} step={1} 
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}></Slider>
                            <TextField
                                id = "garyscale-number"
                                value={props.CurrentData && parseInt(props.CurrentData.grayscale)} 
                                min = {0} max={100} step={1}  
                                onChange={grayscaleChange}
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>색채</Typography>
                        <RowBox>
                            <Slider 
                                id = "hue-rotate-slider"
                                value={props.CurrentData && props.CurrentData.hue/3.6} 
                                onChange={hueChange}
                                min = {0} max = {100} step = {0.1} 
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}></Slider>
                            <TextField
                                id = "hue-rotate-number"
                                value={props.CurrentData && props.CurrentData.hue/3.6}
                                min = {0} max = {100} step = {0.1}
                                onChange={hueChange}
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>반전</Typography>
                        <RowBox>
                            <Slider
                                id = "invert-slider"
                                value={props.CurrentData && props.CurrentData.invert} 
                                onChange={invertChange}
                                min = {0} max = {100} step={1}
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}></Slider>
                            <TextField
                                id = "invert-number"
                                value={props.CurrentData && props.CurrentData.invert} 
                                min = {0} max = {100}  
                                onChange={invertChange} 
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>포화</Typography>
                        <RowBox>
                            <Slider
                                id = "saturate-slider"
                                value={props.CurrentData && props.CurrentData.saturate-100}
                                onChange={saturateChange}
                                min = {-100} max = {100} step={1}
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}></Slider>
                            <TextField 
                                id = "saturate-number"
                                value={props.CurrentData && props.CurrentData.saturate-100} 
                                min = {-100} max = {100}  
                                onChange={saturateChange} 
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                    <Box sx = {{width: 240, marginLeft: 1.5}}>
                        <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>세피아</Typography>
                        <RowBox>
                            <Slider
                                id = "sepia-slider"
                                value={props.CurrentData && props.CurrentData.sepia}
                                onChange={sepiaChange}
                                min = {0} max = {100} step = {1}
                                style={{marginLeft: "20px", width: "170px"}}
                                valueLabelDisplay="auto"
                                slots={{valueLabel: ValueLabelComponent}}
                                sx = {{color: "#70E000"}}></Slider>
                            <TextField 
                                id = "sepia-number"
                                value={props.CurrentData && props.CurrentData.sepia}
                                min = {0} max = {100} 
                                onChange={sepiaChange}
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size = "small"
                                sx = {{width: "80px", left:"10px", top:"-5px"}}
                            />
                        </RowBox>
                    </Box>
                    <hr style={{marginTop:"15px"}}></hr>
                </Collapse>
                
            </div>
            
        </>
    )
}