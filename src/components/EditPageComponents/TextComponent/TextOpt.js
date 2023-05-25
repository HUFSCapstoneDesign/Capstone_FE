import {React, useState, useEffect, useRef} from "react";
import TextFont from "./TextFont";
import TextPos from "./TextPos";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TextOpt(props) {

    const data = props.Tdata.find((el) => el.id === props.ClickedID);
    const deletButtonClick = () => {
        if(data) {
            props.setZ(data.zindex);
            props.SetTData(props.Tdata.filter((el) => el.id !== props.ClickedID))
            props.setZflag(props.zflag === 1 ? 0 : 1);
            /*
            props.SetTData(props.Tdata.map((el) => el.zindex > z ? {...el, zindex: el.zindex - 1} : el))
            props.SetIData(props.Idata.map((el) => el.zindex > z ? {...el, zindex: el.zindex - 1} : el))
            */
        }      
        props.SetClickedID("un2");
        props.SetClickedType("Board");
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const zfront = () => {
        const currentZ = props.Tdata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex > currentZ ? {...el, zindex: (el.zindex - 1)} : (el.zindex === currentZ ? {...el, zindex: props.IID.current + props.TID.current} : el)));
        props.SetTData(props.Tdata.map((el) => el.zindex > currentZ ? {...el, zindex: el.zindex - 1} : (el.zindex === currentZ ? {...el, zindex: props.IID.current + props.TID.current} : el)));
        setAnchorEl(null);
    }
    const zbehind = () => {
        const currentZ = props.Tdata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)));
        props.SetTData(props.Tdata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)));
        setAnchorEl(null);
    }

    const zforward = () => {
        const currentZ = props.Tdata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
        props.SetTData(props.Tdata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ + 1} : el));
        setAnchorEl(null);
    }

    const zbackward = () => {
        const currentZ = props.Tdata.find((el) => el.id === props.ClickedID).zindex;
        props.SetIData(props.Idata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
        props.SetTData(props.Tdata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === props.ClickedID) ? {...el, zindex: currentZ - 1} : el));
        setAnchorEl(null);
    }


    
    return(
        <MenuList>
            <Stack direction = "row" style={{height: "80px"}}>
                <Typography variant="h4" style={{marginTop:"18px", marginLeft:"10px"}}>텍스트</Typography>
                <IconButton aria-label="addPhoto" onClick={handleClick} style={{marginLeft:"80px", marginTop:"17px", height:"40px"}}>
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
                <IconButton onClick={deletButtonClick} style={{marginLeft:"5px", marginTop:"17px", height:"40px"}}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </Stack>
            <Divider/>
            <br/>
            <TextPos Tdata = {props.Tdata} SetTData = {props.SetTData} ClickedID={props.ClickedID} CurrentData = {data} zoomRatio = {props.zoomRatio} temHeight = {props.temHeight} temWidth = {props.temWidth}></TextPos>
            <Divider/>
            <br/>
            <TextFont Tdata = {props.Tdata} SetTData = {props.SetTData} ClickedID={props.ClickedID} CurrentData = {data} backColorBol = {props.backColorBol} SetBackColorBol = {props.SetBackColorBol} zoomRatio = {props.zoomRatio} changeFlag = {props.changeFlag} setChangeFlag = {props.setChangeFlag}></TextFont>      
        </MenuList>
    )
}