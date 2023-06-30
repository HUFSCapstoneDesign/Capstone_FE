import React, { memo } from "react";
import { Box, Typography, Slider, TextField, Tooltip } from "@mui/material";
import { RowBox } from "../../../styles/emotion";

function ImageOpacity(props) {

    const ChangeOpacity = (e) => {
        props.updateImage(props.id, {opacity: 1 - Number(e.target.value) * 0.01});
    }

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
         <Box sx = {{width: 240, marginLeft: 1.5}}>                
                <Typography variant="h6" style={{fontSize:"18px", marginLeft:"5px"}}>투명도</Typography>
                <RowBox>
                    <Slider
                        id = "opacity-slider"
                        value={100 - parseInt(props.opacity * 100 )}
                        onChange={ChangeOpacity}
                        min={0} max={100} step={1}
                        style={{marginLeft: "20px", width: "170px"}}
                        valueLabelDisplay="auto"
                        slots={{valueLabel: ValueLabelComponent}}
                        sx = {{color: "#70E000"}}
                    />
                    <TextField
                        value={100 - parseInt(props.opacity * 100)}
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
export default memo(ImageOpacity);