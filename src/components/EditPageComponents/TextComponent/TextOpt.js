import React, { useState }from "react";
import { useData } from "../../../store";
import TextPos from "./TextPos";
import TextFont from "./TextFont";
import { Menu, MenuItem, MenuList, Divider, Typography, Stack, IconButton } from '@mui/material';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TextOpt(props) {

    const {TextData, ImageData, InitialText, InitialImage} = useData();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const data = TextData.find((el) => el.id === props.ClickedID);
    
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const deleteButton = () => {
        if(data) {
            const zindex = data.zindex;
            const Image = ImageData.map((el) => el.zindex > zindex ? {...el, zindex: el.zindex - 1} : el);
            const Tdata = TextData.filter((el) => el.id !== props.ClickedID);
            const Text = Tdata.map((el) => el.zindex > zindex ? {...el, zindex: el.zindex - 1} : el);
            InitialImage(Image);
            InitialText(Text);
            props.setClick("un1", "Board");
        }
    }
    const zfront = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex > currentZ ? {...el, zindex: (el.zindex - 1)} : el));
            InitialText(TextData.map((el) => el.zindex > currentZ ? {...el, zindex: el.zindex - 1} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: (ImageData.length + TextData.length)} : el));
            setAnchorEl(null);
        }
    }
    const zbehind = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : el));
            InitialText(TextData.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)));
            setAnchorEl(null);
        }  
    }

    const zforward = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : el));
            InitialText(TextData.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
            setAnchorEl(null);
        }    
    }

    const zbackward = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : el));
            InitialText(TextData.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
            setAnchorEl(null);
        }   
    }

    return(
        <MenuList>
            <Stack direction = "row" style={{height: "80px"}}>
                <Typography variant="h4" style={{marginTop:"18px", marginLeft:"10px"}}>텍스트</Typography>
                <IconButton aria-label="addText" onClick={handleClick} style={{marginLeft:"80px", marginTop:"17px", height:"40px"}}>
                    <FlipToFrontIcon></FlipToFrontIcon>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={zfront}>맨 앞으로 보내기</MenuItem>
                    <MenuItem onClick={zbehind}>맨 뒤로 보내기</MenuItem>
                    <MenuItem onClick={zforward}>앞으로 보내기</MenuItem>
                    <MenuItem onClick={zbackward}>뒤로 보내기</MenuItem>
                </Menu>
                <IconButton style={{marginLeft:"5px", marginTop:"17px", height:"40px"}} onClick={deleteButton}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </Stack>
            <Divider/>
            <br/>
            {data && <TextPos posX = {data.x} posY = {data.y} updateText = {props.updateText} id = {data.id} width = {data.width} height = {data.height} rotation = {data.rotation ? data.rotation : 0}></TextPos>}
            <Divider/>
            <br/>
            {data && <TextFont align = {data.align} backcolor = {data.backcolor} backopa = {data.backopa} bold = {data.bold} font = {data.font} italic = {data.italic} size = {data.size} textcolor = {data.textcolor} textopa = {data.textopa} underlined = {data.underlined} updateText = {props.updateText} id = {data.id} TextSizeFlag = {props.TextSizeFlag} setTextSize = {props.setTextSize}></TextFont>}
        </MenuList>
        
    )
}