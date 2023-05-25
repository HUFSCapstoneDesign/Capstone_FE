import {React, useState, useRef, useEffect} from "react";
import ImagePos from "./ImagePos";
import ImageFilter from "./ImageFilter";
import ImageBoarder from "./ImageBorder";
import ImageOpacity from "./ImageOpacity";
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import { Divider, Typography } from "@mui/material";
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ImageOpt(props) {

    const CurrentData = props.Idata.find((el) => el.id === props.ClickedID);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const z = useRef(props.Tdata.length + props.Idata.length + 1);
    const [zflag, setZflag] = useState(true);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = () => {
        props.inputRef.current.click(); // 파일 선택 창 열기
    };

    const deletButtonClick = () => {
        if(CurrentData) {
            props.setZ(CurrentData.zindex);
            props.SetIData(props.Idata.filter((el) => el.id !== props.ClickedID));
            props.setZflag(props.zflag === 1 ? 0 : 1);
        }     
        props.SetClickedID("un2");
        props.SetClickedType("Board");
    }


    const zfront = () => {
        const currentZ = props.Idata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex > currentZ ? {...el, zindex: (el.zindex - 1)} : (el.zindex === currentZ ? {...el, zindex: props.IID.current + props.TID.current} : el)));
        props.SetTData(props.Tdata.map((el) => el.zindex > currentZ ? {...el, zindex: el.zindex - 1} : (el.zindex === currentZ ? {...el, zindex: props.IID.current + props.TID.current} : el)));
        setAnchorEl(null);
    }
    const zbehind = () => {
        const currentZ = props.Idata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)));
        props.SetTData(props.Tdata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)));
        setAnchorEl(null);
    }

    const zforward = () => {
        const currentZ = props.Idata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
        props.SetTData(props.Tdata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
        setAnchorEl(null);
    }

    const zbackward = () => {
        const currentZ = props.Idata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
        props.SetTData(props.Tdata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
        setAnchorEl(null);
    }

    return(
        <MenuList>
            <Stack direction = "row" style={{height: "80px"}}>
            <Typography variant="h4" style={{marginTop:"18px", marginLeft:"10px"}}>이미지</Typography>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={props.inputRef}
                    onChange={props.handleImageUpload}
                />
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
                <IconButton aria-label="addPhoto" onClick={handleButtonClick} style={{marginLeft:"5px", marginTop:"17px", height:"40px"}}>
                    <ChangeCircleOutlinedIcon></ChangeCircleOutlinedIcon>
                </IconButton>
                <IconButton aria-label="addPhoto" onClick={deletButtonClick} style={{marginLeft:"5px", marginTop:"17px", height:"40px"}}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                    
            </Stack>
            <Divider/>
            <br/>
            <ImagePos Idata = {props.Idata} SetIData = {props.SetIData} ClickedID = {props.ClickedID} CurrentData = {CurrentData} temHeight = {props.temHeight} temWidth = {props.temWidth}></ImagePos>
            <Divider/>
            <br/>
            <ImageBoarder Idata = {props.Idata} SetIData = {props.SetIData} ClickedID = {props.ClickedID} CurrentData = {CurrentData}></ImageBoarder>
            <br/>
            <Divider/>
            <br/>
            <ImageOpacity Idata = {props.Idata} SetIData = {props.SetIData} ClickedID = {props.ClickedID} CurrentData = {CurrentData}></ImageOpacity>
            <Divider/>
            <br/>
            <ImageFilter Idata = {props.Idata} SetIData = {props.SetIData} ClickedID = {props.ClickedID} CurrentData = {CurrentData}></ImageFilter>
            
        </MenuList>
    )
}