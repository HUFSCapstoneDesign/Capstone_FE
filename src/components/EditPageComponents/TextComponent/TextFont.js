import React, { useState } from "react";
import { SketchPicker } from "react-color"
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'; // 단락
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ExpandLess from '@mui/icons-material/ExpandLess'; //리스트 버튼
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Switch from '@mui/material/Switch';
import ClearIcon from '@mui/icons-material/Clear';

import { Typography, Stack, ListItemButton} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Select from '@mui/material/Select';
import { RowBox } from "../../../styles/emotion";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function TextFont(props) {

    const [textColorOpen, setTextColorOpen] = useState(false);
    const [backColorOpen, setBackColorOpen] = useState(false);

    const rgba = (rgb, opa)  => {
        return {r:rgb.substr(0,3), g:rgb.substr(3,3), b:rgb.substr(6,3), a:opa}
    }

    const stylergba = (rgb, opa) => {
        return "rgba(" + String(rgb.substr(0,3)) + "," + String(rgb.substr(3,3)) + "," + String(rgb.substr(6,3)) + "," + String(opa) + ")" 
    }

    const rgb = (rgba) => {
        return String(rgba.r).padStart(3,"0") + String(rgba.g).padStart(3,"0") + String(rgba.b).padStart(3,"0")
    }
    
    const hc = () => {
        (!textColorOpen && backColorOpen) && setBackColorOpen(false);
        setTextColorOpen(!textColorOpen);
    }
    const bc = () => {
        (textColorOpen && !backColorOpen) && setTextColorOpen(false);
        setBackColorOpen(!backColorOpen);
    }
    
    const ChangeFont = (e) => {
        props.SetTData(props.Tdata.map((el) => (el.id === props.ClickedID) ? {...el, font: e.target.value} : el));
        props.setChangeFlag(!props.changeFlag);      
    }

    const ChangeSize = (e)=> {
        props.SetTData(props.Tdata.map((el) => (el.id === props.ClickedID) ? {...el, size: e.target.value} : el));
        props.setChangeFlag(!props.changeFlag);
    }
    
    const fontToggleChange = (e, format) => {
        props.SetTData(props.Tdata.map((el) => (el.id === props.ClickedID) ? {...el, bold: format.includes('bold'), italic: format.includes('italic'), underlined: format.includes('underlined')} : el));      
    }

    const alignToggleChange = (e, al) => {
        props.SetTData(props.Tdata.map((el) => (el.id === props.ClickedID) ? {...el, align: al} : el));      
    }

    const TextColorChange = (color) => {
        props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, textcolor:rgb(color.rgb), textopa: color.rgb.a} : el))
    }

    const BackColorChange = (color) => {
        props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, backcolor:rgb(color.rgb), backopa: color.rgb.a} : el))
    }

    const handleChange = (e) => {
        props.SetBackColorBol(e.target.checked);
        e.target.checked && props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, backopa:100} : el))
        !e.target.checked && props.SetTData(props.Tdata.map((el) => el.id === props.ClickedID ? {...el, backopa: 0} : el))
    }
    return(
        <>
            <Typography variant="h6" style={{color: "#999999", fontSize:"20px", marginLeft:"15px"}}>글꼴</Typography>
            <Stack direction = "row" style={{height: "50px", marginTop:"20px", marginLeft:"15px"}}>
                <FormControl>
                    <InputLabel id="font-style">Style</InputLabel>
                    <Select
                        label="Style"
                        style={{width:"170px", height:"40px", fontFamily: props.CurrentData.font}}
                        value={ props.CurrentData ? props.CurrentData.font : ""}
                        onChange={ChangeFont}
                    >
                        <MenuItem value={"'Nanum Pen Script', cursive"} style={{fontFamily:"'Nanum Pen Script', cursive"}}>Nanum Pen</MenuItem>
                        <MenuItem value={"'Single Day', cursive"} style={{fontFamily:"'Single Day', cursive"}}>Single Day</MenuItem>
                        <MenuItem value={"'Hi Melody', cursive"} style={{fontFamily:"'Hi Melody', cursive"}}>Hi Melody</MenuItem>
                        <MenuItem value={"'Geologica', sans-serif"} style={{fontFamily:"'Geologica', sans-serif"}}>Geologica</MenuItem>
                        <MenuItem value={"'Pacifico', cursive"} style={{fontFamily:"'Pacifico', cursive"}}>Pacifico</MenuItem>
                        <MenuItem value={"'Architects Daughter', cursive"} style={{fontFamily:"'Architects Daughter', cursive"}}>Architects Daughter</MenuItem>
                        <MenuItem value={"'Sacramento', cursive"} style={{fontFamily:"'Sacramento', cursive"}}>Sacramento</MenuItem>
                    </Select>
                </FormControl>
                <TextField type="number" label="Size" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={ChangeSize} value={props.CurrentData ? props.CurrentData.size : ""}/>          
            </Stack>
            <Stack direction = "row" style={{height: "50px", marginTop:"10px", marginLeft:"15px"}}>
                <ToggleButtonGroup aria-label="text formatting" size="small" style={{height:"40px"}} onChange={fontToggleChange} value={props.CurrentData && ['bold', 'italic', 'underlined'].filter((el) => props.CurrentData[el] === true)}>
                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup  size = "small" style={{height:"40px", marginLeft:"20px"}} exclusive  aria-label="text alignment" onChange={alignToggleChange} value={props.CurrentData && props.CurrentData.align}>
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <RowBox style={{marginTop:"10px"}}>
                <div style={{width: "110px"}}>
                    <ListItemButton onClick={hc} style={{height: "25px", width: "120px", marginLeft:"15px"}}>
                        <Typography variant="h6" style={{fontSize:"17px", marginLeft:"-15px"}}>글자 색상</Typography>
                        <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: stylergba(props.CurrentData.textcolor, props.CurrentData.textopa)}}></div>
                        {textColorOpen ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}>aaaaa</ExpandMore>}
                    </ListItemButton>
                    <Collapse in={textColorOpen} timeout="auto" unmountOnExit style={{ width: "220px"}}>
                            <SketchPicker color = {rgba(props.CurrentData.textcolor, props.CurrentData.textopa)} onChange={TextColorChange}></SketchPicker>
                    </Collapse> 
                </div>
                <div style={{width: "110px", marginLeft:"30px"}}>
                    <ListItemButton onClick={bc} style={{height: "25px", width: "120px", marginLeft:"15px"}}>
                        <Typography variant="h6" style={{fontSize:"17px", marginLeft:"-15px"}}>배경 색상</Typography>
                        <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: stylergba(props.CurrentData.backcolor, props.CurrentData.backopa)}}>
                            {!props.backColorBol && <ClearIcon style={{width:"15px", height:"15px"}}></ClearIcon>}
                        </div>
                        {backColorOpen ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}></ExpandMore>}
                    </ListItemButton>
                    <Collapse in={backColorOpen} timeout="auto" unmountOnExit style={{width: "220px", marginLeft: "-85px"}}>
                        <div>
                            <RowBox>
                                <RowBox style={{border: "1px solid #CBCBCB", width: "220px", borderRadius: "6px"}}>
                                    <Typography variant="h6" style={{fontSize:"17px", marginTop:"5px", marginLeft:"10px"}}>배경 넣기</Typography>
                                    <div style={{marginLeft:"60px"}}>
                                        <Switch checked={props.backColorBol} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                                    </div>
                                </RowBox>
                            </RowBox>
                            {props.backColorBol && <SketchPicker color = {rgba(props.CurrentData.backcolor, props.CurrentData.backopa)} onChange={BackColorChange}></SketchPicker>}
                        </div>
                    </Collapse> 
                </div>
            </RowBox>
        </>
    )
}