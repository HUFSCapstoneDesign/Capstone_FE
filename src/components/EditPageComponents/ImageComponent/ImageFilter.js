import React, { memo } from "react";
import { Typography, TextField, Tooltip, Box, Slider} from "@mui/material";
import { RowBox } from "../../../styles/emotion";

function ImageFilter(props) {
    const ChangeValue = (e) => {
        if(['brightness', 'contrast', 'saturate'].includes(props.target)) props.updateImage(props.id, {[props.target]: e.target.value + 100})
        else if(['grayscale', 'invert', 'sepia' ].includes(props.target)) props.updateImage(props.id, {[props.target]: e.target.value})
        else if(props.target === 'blur') props.updateImage(props.id, {[props.target]: e.target.value * 0.1})
        else if(props.target === 'hue') props.updateImage(props.id, {[props.target]: e.target.value * 3.6})
    }

    var minValue = 0;
    var value = props.data;
    if(['brightness', 'contrast', 'saturate'].includes(props.target)) {
        value -= 100;
        minValue -= 100;
    }
    else if(props.target === 'blur') value = parseInt(value*10);
    else if(props.target === 'hue') value = parseInt(value / 3.6);

    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }

    return(
        <>
            <hr style={{marginTop:"15px"}}></hr>
            <Box sx = {{width: 240, marginLeft: 1.5}}>
            <Typography variant="h6" style={{color: "#999999", fontSize:"18px", marginLeft:"10px"}}>{props.targetVal}</Typography>
            <RowBox>
                <Slider value={value} onChange={ChangeValue}
                    min = {minValue} max = {100} step={1}
                    style={{marginLeft: "20px", width: "170px"}}
                    valueLabelDisplay="auto"
                    slots={{valueLabel: ValueLabelComponent}}
                    sx = {{color: "#70E000"}}></Slider>
                <TextField value={value} min = {minValue} max = {100} step = {1} onChange={ChangeValue}
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    
                    size = "small"
                    sx = {{width: "80px", left:"10px", top:"-5px"}}></TextField>
                </RowBox>
            </Box>
        </>
    )
}
export default memo(ImageFilter);