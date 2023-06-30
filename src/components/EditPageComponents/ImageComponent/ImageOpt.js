import React, {useRef, useState} from "react";
import { useData } from "../../../store";
import { MenuList, Stack, IconButton, Menu, MenuItem, Divider, Collapse, Typography, ListItemButton } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import ImagePos from "./ImagePos";
import ImageBorder from "./ImageBorder";
import ImageOpacity from "./ImageOpacity";
import ImageFilter from "./ImageFilter";

export default function ImageOpt(props) {
    const {TextData, ImageData, InitialText, InitialImage} = useData();
    const data = ImageData.find((el) => el.id === props.ClickedID);
    const target = ['blur', 'brightness', 'contrast', 'grayscale', 'hue', 'invert', 'saturate', 'sepia']
    const targetVal = ['흐림', '밝기', '대비', '흑백', '색채', '반전', '포화', '세피아']
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState(false);
    const open = Boolean(anchorEl);
    
    const filterOption = () => {
        setFilter(!filter);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const ChangeImage = () => {
        props.setUpdateID(props.ClickedID);
        props.inputRef.current.click();
    }

    const deleteButton = () => {
        if(data) {
            const zindex = data.zindex;
            const Text = TextData.map((el) => el.zindex > zindex ? {...el, zindex: el.zindex - 1} : el);
            const Idata = ImageData.filter((el) => el.id !== props.ClickedID);
            const Image = Idata.map((el) => el.zindex > zindex ? {...el, zindex: el.zindex - 1} : el);
            InitialImage(Image);
            InitialText(Text);
            props.setClick("un1", "Board");
        }
    }

    const zfront = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex > currentZ ? {...el, zindex: (el.zindex - 1)} : ((el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: ImageData.length + TextData.length} : el)));
            InitialText(TextData.map((el) => el.zindex > currentZ ? {...el, zindex: (el.zindex - 1)} : el));
            setAnchorEl(null);
        }
    }

    const zbehind = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : ((el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: 1} : el)));
            InitialText(TextData.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : el));
            setAnchorEl(null);
        }   
    }

    const zforward = () => {
        if(data) {
            const currentZ = data.zindex;
            InitialImage(ImageData.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
            InitialText(TextData.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : el));
            setAnchorEl(null);
        }  
    }

    const zbackward = () => {
        const currentZ = data.zindex;
        InitialImage(ImageData.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
        InitialText(TextData.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : el));
        setAnchorEl(null);
    }
    return(
        <MenuList>
            <Stack direction = "row" style={{height: "80px"}}>
                <Typography variant="h4" style={{marginTop:"18px", marginLeft:"10px"}}>이미지</Typography>
                <IconButton onClick={handleClick} style={{marginLeft:"35px", marginTop:"17px", height:"40px"}}>
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
                <IconButton aria-label="addImage" onClick={ChangeImage} style={{marginLeft:"5px", marginTop:"17px", height:"40px"}}>
                    <ChangeCircleOutlinedIcon></ChangeCircleOutlinedIcon>
                </IconButton>
                <IconButton aria-label="deleteImage" onClick={deleteButton} style={{marginLeft:"5px", marginTop:"17px", height:"40px"}}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>  
            </Stack>
            <Divider/>
            <br/>
            {data && <ImagePos posX = {data.x} posY = {data.y} width = {data.width} height = {data.height} updateImage = {props.updateImage} id = {data.id} rotation = {data.rotation ? data.rotation : 0}></ImagePos>}
            <Divider/>
            <br/>
            {data && <ImageBorder borderstyle = {data.borderstyle} bordersize = {data.bordersize} updateImage = {props.updateImage} id = {data.id} bordercolor = {data.bordercolor} radius = {data.radius}></ImageBorder>}
            <Divider/>
            <br/>
            {data && <ImageOpacity opacity = {data.opacity} id = {data.id} updateImage = {props.updateImage}></ImageOpacity>}
            <Divider/>
            <br/>
            {data && 
                <div>
                    <ListItemButton onClick={filterOption} sx={{marginLeft:"5px",height: "40px", width: "270px"}}>
                    <Typography variant="h6" style={{color: "#999999", fontSize:"18px"}}>필터</Typography>
                        {filter ? <ExpandLess style={{marginLeft:"180px", marginRight:"-30px"}}></ExpandLess> : <ExpandMore style={{marginLeft:"180px", marginRight:"-30px"}}></ExpandMore>}
                    </ListItemButton>
                    
                    <Collapse in = {filter} timeout="auto" unmountOnExit>
                        {target.map((el, idx) => <ImageFilter target = {el} targetVal = {targetVal[idx]} data = {data[el]} id = {data.id} updateImage = {props.updateImage} key = {idx}></ImageFilter>)}
                        <hr style={{marginTop:"15px"}}></hr>
                    </Collapse>
                    
                </div>
            }
        </MenuList>
    )
}