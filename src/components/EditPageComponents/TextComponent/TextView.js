import {React, useEffect, useState} from "react";
import {Rnd} from "react-rnd";




export default function TextView({Tdata, SetTData, Idata, SetIData, ClickedID, SetClickedID, ClickedType, SetClickedType, SetBackColorBol, zoomRatio, changeFlag, setChangeFlag, newChangeID, setNewChangeID, temHeight, temWidth}) {

    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        const textSize = [];
        Tdata.map((el) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = `${el.size + 3}px ${el.font}`;
            const text = el.content.split("\n");
            const width = (Math.max(...text.map((ell) => context.measureText(ell).width)))
            const height = (text.length) * (el.size + 12)
            textSize.push([width, height]);
        })
        SetTData(Tdata.map((el, index) => el ? {...el, width: textSize[index][0], height: textSize[index][1]} : el))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoomRatio])
    
    useEffect(() => {
        if(ClickedID && ClickedType === "Text") {
            const target = document.getElementById(ClickedID);
            target.style.width = "0";
            target.style.height = "0";
            const width = target.scrollWidth;
            const height = target.scrollHeight;
            const data = Tdata.find((el) => el.id === ClickedID);
            const pointX = (width/zoomRatio + data.x + 5 > temWidth) ? data.x - (width/zoomRatio + data.x + 5 - temWidth) : data.x;
            const pointY = (height/zoomRatio + data.y > temHeight) ? data.y - (width/zoomRatio + data.x - temHeight) : data.y;
            SetTData(Tdata.map((el) => el.id === ClickedID ? {...el, width: parseInt(width / zoomRatio + 5), height: parseInt(height / zoomRatio), x: pointX, y: pointY} : el));
            target.style.width = "100%";
            target.style.height = "100%";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeFlag]) 

    const contentUpdate = (e) => {
        setChangeFlag(!changeFlag)
        SetTData(Tdata.map((el) => el.id === ClickedID ? {...el, content: e.target.value} : el))
        if(e.target.id === newChangeID) setNewChangeID(null);
    };


    const rgba = (rgb, opa) => {
        return "rgba(" + String(rgb.substr(0,3)) + "," + String(rgb.substr(3,3)) + "," + String(rgb.substr(6,3)) + "," + String(opa) + ")" 
    }

    function ChangeCID(e) {
        e.stopPropagation() 

        if (ClickedType === "Text" && newChangeID !== ClickedID) {
            const data = Tdata.find((el)=> el.id === ClickedID)
            if(data && data.size === "") {
                SetTData(Tdata.map((el) => el.id === ClickedID  ? {...el, size: 15} : el));
                SetClickedID(e.target.id);
                SetClickedType(e.target.className);
            } 
        }

        if(ClickedType === "Image") {
            const data = Idata.find((el) => el.id === ClickedID);
            (data && (data.opacity === 0)) && SetIData(Idata.filter((el) => el.id !== ClickedID));
        }
        console.log(isMoving);
        SetClickedID(e.target.id);
        SetClickedType(e.target.className);
        SetBackColorBol(Tdata.find((el) => el.id === e.target.id).backopa !== 0);
        const CurrentData = Tdata.find((el) => el.id === e.target.id)
        if(CurrentData && CurrentData.flag && !isMoving) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = `${CurrentData.size + 3}px ${CurrentData.font}`;
            const width = context.measureText("글씨를 입력해주세요").width
            const height = (CurrentData.size + 12)
            console.log(e.type);
            SetTData(Tdata.map((el) => el.id === e.target.id ? {...el, content: "", flag: false, width: width, height: height} : el))
        }
        setIsMoving(false);
    }

    return(
        <>
            {Tdata.map((el, index) => 
            
            <Rnd
                className="Text"
                key={el.id}
                position={{x: parseInt(el.x * zoomRatio), y: parseInt(el.y*zoomRatio)}}
                style={{position: "absolute", zIndex: el.zindex, transform: `scale(${zoomRatio})`, transformOrigin: 'top left'}}
                bounds="parent"
                size = {{width: parseInt(el.width*zoomRatio), height: parseInt(el.height*zoomRatio)}}
                onDrag = {()=> setIsMoving(true)}
                onDragStop={(e,d) => {
                    SetTData(Tdata.map((ell) => (ell.id === el.id ? {...ell, x: parseInt(d.x / zoomRatio), y: parseInt(d.y/zoomRatio)} : ell)));
                    e.stopPropagation();
                }}
                
                enableResizing={{
                    bottom: false,
                    top: false,
                    left: false,
                    right: false,
                    bottomLeft: false,
                    bottomRight: false,
                    topLeft: false,
                    topRight: false
                }}
            >
                <textarea id = {el.id} onInput={contentUpdate} onClick={ChangeCID} placeholder="텍스트를 입력해주세요" 
                    style = {{
                        position: "absolute",
                        border: (ClickedID === el.id && ClickedType === "Text") ? `1.5px dotted black` : "none",
                        whiteSpace: "pre",
                        width: "100%",
                        height: "100%",
                        overflow:"hidden",
                        background: rgba(el.backcolor, el.backopa),
                        fontFamily: `${el.font}`,
                        fontSize: `${el.size * zoomRatio}px`, 
                        fontWeight: (el.bold) ? "bold" : "normal", 
                        fontStyle: (el.italic) ? "italic" : "normal", 
                        textDecorationLine: (el.underlined) ? "underline" : "none", 
                        textAlign: `${el.align}`, 
                        color: rgba(el.textcolor, el.textopa),
                        zIndex: (el.zindex),
                        resize: "none",
                        outline: "none",
                    }} 
                    className="Text" value={el.content ? el.content : ""}></textarea>
            </Rnd>)
            }
                
        </>
    )
}