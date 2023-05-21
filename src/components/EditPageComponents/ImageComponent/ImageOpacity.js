import React from "react";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { RowBox } from "../../../styles/emotion";
import {TextField, Typography, Tooltip} from "@mui/material";

export default function ImageOpacity (props) {

    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }

    const ChangeOpacity = (e) => {
        props.SetIData(props.Idata.map((el) => el.id === props.ClickedID ? {...el, opacity: 1 - Number(e.target.value) * 0.01} : el))
    }

    return(
        <>
            <Box sx = {{width: 240, marginLeft: 1.5}}>                
                <Typography variant="h6" style={{fontSize:"18px", marginLeft:"5px"}}>투명도</Typography>
                <RowBox>
                    <Slider
                        id = "opacity-slider"
                        value={props.CurrentData ? 100 - (props.CurrentData.opacity * 100 ): ""}
                        onChange={ChangeOpacity}
                        min={0} max={100} step={1}
                        style={{marginLeft: "20px", width: "170px"}}
                        valueLabelDisplay="auto"
                        slots={{valueLabel: ValueLabelComponent}}
                        sx = {{color: "#70E000"}}
                    />
                    <TextField
                        value={props.CurrentData ? 100 - parseInt(props.CurrentData.opacity * 100) : ""}
                        onInput={ChangeOpacity}
                        id="opacity-number"
                        min = {0} max = {100} step={1}
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
        </>    
    )
}