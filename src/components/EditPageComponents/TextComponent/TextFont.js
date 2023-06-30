import React, { memo, useState } from "react";
import { RowBox } from "../../../styles/emotion";
import { MenuItem, FormControl, Typography, Stack, ListItemButton, InputLabel, Select, TextField, ToggleButton, ToggleButtonGroup, Collapse, Switch } from '@mui/material';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'; // 단락
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ExpandLess from '@mui/icons-material/ExpandLess'; //리스트 버튼
import ExpandMore from '@mui/icons-material/ExpandMore';

import { SketchPicker } from "react-color"
import ClearIcon from '@mui/icons-material/Clear';

function TextFont(props) {

    const [textColorOpen, setTextColorOpen] = useState(false);
    const [backColorOpen, setBackColorOpen] = useState(false);
    const [Checked, setChecked] = useState(props.backopa !== 0);
    const format = [];
    if(props.bold) format.push('bold');
    if(props.italic) format.push('italic');
    if(props.underlined) format.push('underlined')
    const ChangeFont = (e) => {
        props.updateText(props.id, {font: e.target.value});
        props.setTextSize(props.id, !(props.TextSizeFlag));
    }

    const hc = () => {
        (!textColorOpen && backColorOpen) && setBackColorOpen(false);
        setTextColorOpen(!textColorOpen);
    }

    const bc = () => {
        (textColorOpen && !backColorOpen) && setTextColorOpen(false);
        setBackColorOpen(!backColorOpen);
    }
    
    const rgb = (color) => {
        return String(color.r).padStart(3,"0") + String(color.g).padStart(3,"0") + String(color.b).padStart(3,"0")
    }

    const rgba = (rgb, opa)  => {
        return {r:rgb.substr(0,3), g:rgb.substr(3,3), b:rgb.substr(6,3), a:opa}
    }

    const stylergba = (rgb, opa) => {
        return "rgba(" + String(rgb.substr(0,3)) + "," + String(rgb.substr(3,3)) + "," + String(rgb.substr(6,3)) + "," + String(opa) + ")" 
    }

    const ChangeSize = (e) => {
        props.updateText(props.id, {size: parseInt(e.target.value)});
        props.setTextSize(props.id, !(props.TextSizeFlag));
    }

    const ChangeFontTogle = (e, format) => {
        props.updateText(props.id, {bold: format.includes('bold'), italic: format.includes('italic'), underlined: format.includes('underlined')})
    }

    const ChangeAlignTogle = (e, al) => {
        props.updateText(props.id, {align: al});
    }

    const ChangeTextColor = (color) => {
        props.updateText(props.id, {textcolor: rgb(color.rgb), textopa: color.rgb.a})
    }

    const ChangeBackColor = (color) => {
        props.updateText(props.id, {backcolor: rgb(color.rgb), backopa: color.rgb.a})
    }

    const handleChange = (e) => {
        setChecked(e.target.checked);
        e.target.checked ? props.updateText(props.id, {backopa: 100}) : props.updateText(props.id, {backopa: 0});
    }
    return(
        <>
            <Typography variant="h6" style={{color: "#999999", fontSize:"20px", marginLeft:"15px"}}>글꼴</Typography>
            <Stack direction = "row" style={{height: "50px", marginTop:"20px", marginLeft:"15px"}}>
                <FormControl>
                    <InputLabel id="font-style">Style</InputLabel>
                    <Select
                        label="Style"
                        style={{width:"170px", height:"40px", fontFamily: props.font}}
                        value={props.font}
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
                <TextField type="number" label="Size" variant="outlined" size="small" sx={{width:"40px"}} style={{width:"80px", marginLeft:"15px"}} onChange={ChangeSize} value={props.size}/>          
            </Stack>
            <Stack direction = "row" style={{height: "50px", marginTop:"10px", marginLeft:"15px"}}>
                <ToggleButtonGroup aria-label="text formatting" size="small" style={{height:"40px"}} onChange={ChangeFontTogle} value={format}>
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
                <ToggleButtonGroup  size = "small" style={{height:"40px", marginLeft:"20px"}} exclusive  aria-label="text alignment" onChange={ChangeAlignTogle} value={props.align}>
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
                        <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: stylergba(props.textcolor, props.textopa)}}></div>
                        {textColorOpen ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}></ExpandMore>}
                    </ListItemButton>
                    <Collapse in={textColorOpen} timeout="auto" unmountOnExit style={{ width: "220px"}}>
                            <SketchPicker color = {rgba(props.textcolor, props.textopa)} onChange={ChangeTextColor}></SketchPicker>
                    </Collapse> 
                </div>
                <div style={{width: "110px", marginLeft:"30px"}}>
                    <ListItemButton onClick={bc} style={{height: "25px", width: "120px", marginLeft:"15px"}}>
                        <Typography variant="h6" style={{fontSize:"17px", marginLeft:"-15px"}}>배경 색상</Typography>
                        <div style={{width:"15px", height:"15px", marginLeft:"8px", backgroundColor: stylergba(props.backcolor, props.backopa)}}>
                            {!Checked && <ClearIcon style={{width:"15px", height:"15px"}}></ClearIcon>}
                        </div>
                        {backColorOpen ? <ExpandLess style={{marginRight: "-30px"}}></ExpandLess> : <ExpandMore style={{marginRight: "-30px"}}></ExpandMore>}
                    </ListItemButton>
                    <Collapse in={backColorOpen} timeout="auto" unmountOnExit style={{width: "220px", marginLeft: "-85px"}}>
                        <div>
                            <RowBox>
                                <RowBox style={{border: "1px solid #CBCBCB", width: "220px", borderRadius: "6px"}}>
                                    <Typography variant="h6" style={{fontSize:"17px", marginTop:"5px", marginLeft:"10px"}}>배경 넣기</Typography>
                                        <div style={{marginLeft:"60px"}}>
                                            <Switch checked={Checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
                                        </div>
                                </RowBox>
                            </RowBox>
                            {Checked && <SketchPicker color = {rgba(props.backcolor, props.backopa)} onChange={ChangeBackColor}></SketchPicker>}
                        </div>
                    </Collapse> 
                </div>
            </RowBox>
        </>
    )
}
export default memo(TextFont);