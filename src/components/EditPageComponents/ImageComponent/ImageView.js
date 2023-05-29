import {React, useEffect, useState} from "react";
import {Rnd} from "react-rnd";

export default function ImageView({Idata, SetIData, ClickedID, SetClickedID, ClickedType, SetClickedType, Tdata, SetTData, inputRef, handleImageUpload, flag, SetFlag, TID, IID, img, setImg, zoomRatio, updatedFile, setUpdatedFile, updatedID, setUpdatedID}) {
    
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });

    const ChangeCID = (e) => {
        e.stopPropagation() 

        if (ClickedType === "Text") {
            const data = Tdata.find((el) => el.id === ClickedID);          
            if(data && data.size === "") {
                SetTData(Tdata.map((el) => el.id === ClickedID  ? {...el, size: 15} : el));
            }
        }

        if(ClickedType === "Image") {
            const data = Idata.find((el) => el.id === ClickedID);
            (data && (data.opacity === 0)) && SetIData(Idata.filter((el) => el.id !== ClickedID));
        }

        SetClickedID(e.target.id);
        SetClickedType(e.target.className);
    }
    
    const handleButtonClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if(img) {
            const handleMouseDown = (e) => {
                setStartPos({ x: e.layerX, y: e.layerY});
                setIsDragging(true);
            };

            const handleMouseMove = (e) => {
                if (isDragging) {
                  setEndPos({ x: e.layerX, y: e.layerY});
                }
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                SetFlag(false);
                document.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

            if(flag) {
                document.addEventListener('mousedown', handleMouseDown);
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
            if(!flag) {
                IID.current = IID.current + 1;
                SetIData([{id: `${IID.current}`, x: parseInt(startPos.x / zoomRatio), y: parseInt(startPos.y / zoomRatio), width: parseInt((endPos.x - startPos.x) / zoomRatio), height: parseInt((endPos.y - startPos.y) / zoomRatio), src: img, zindex: IID.current + TID.current, borderstyle:"none", bordersize: 0.5, bordercolor: "#000000", radius: 0, opacity: 1, blur: 0 , brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0}, ...Idata]);
                const IDdata = updatedID;
                IDdata[`${IID.current}`] = updatedFile;
                setUpdatedFile(null);
                setUpdatedID(IDdata);
                SetClickedID(`${IID.current}`);
                SetClickedType("Image")
                setImg(null);
            }
        }       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag, isDragging]);


    return(
        <>
            <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleImageUpload}/>
            {(isDragging && img) && <div style= {{border: "1px solid black", width: endPos.x - startPos.x, height: endPos.y - startPos.y, marginLeft: startPos.x, marginTop: startPos.y}}></div>}
            {Idata.map((el) =>
                <Rnd
                    id = {el.id}
                    className = "Image"
                    key = {el.id}
                    style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: (el.id === ClickedID && ClickedType === "Image") ? `dashed ${zoomRatio}px black`:"0",
                        zIndex: (el.zindex),
                    }}
                    bounds="parent"
                    size = {{width: el.width * zoomRatio, height: el.height * zoomRatio}}
                    position = {{x: el.x * zoomRatio, y: el.y * zoomRatio}}
                    onClick = {e => ChangeCID(e)}
                    onDragStop = {(e,d) => SetIData(Idata.map((ell) => ell.id === el.id ? {...ell, x: parseInt(d.x / zoomRatio), y: parseInt(d.y / zoomRatio)} : ell))}
                    onResizeStop = {(e, direction, ref, delta, position) => {
                        SetIData(Idata.map((ell) => ell.id === el.id ? {...ell, x: parseInt(position.x / zoomRatio), y: parseInt(parseFloat(position.y) / zoomRatio), width: parseInt(parseFloat(ref.style.width) / zoomRatio), height: parseInt(parseFloat(ref.style.height) / zoomRatio)} : ell));
                        SetClickedID(el.id);
                    }}

                    resizeHandleStyles = {{
                        bottomRight: (ClickedID === el.id && ClickedType === "Image") && {
                            border: "solid 1px white",
                            background: "blue",
                            width: `${zoomRatio*5}px`,
                            height: `${zoomRatio*5}px`,
                            borderRadius: "50%",
                            bottom:"-4px",
                            right: "-4px"
                        },
                        bottomLeft: (ClickedID === el.id && ClickedType === "Image") &&{       
                            border: "solid 1px white",
                            background: "blue",
                            width: `${zoomRatio*5}px`,
                            height: `${zoomRatio*5}px`,
                            borderRadius: "50%",
                            bottom:"-4px",
                            left: "-4px"         
                        },
                        topLeft: (ClickedID === el.id && ClickedType === "Image") &&{
                            border: "solid 1px white",
                            background: "blue",
                            width: `${zoomRatio*5}px`,
                            height: `${zoomRatio*5}px`,
                            borderRadius: "50%",
                            top:"-4px",
                            left: "-4px"
                        },
                        topRight: (ClickedID === el.id && ClickedType === "Image") &&{
            
                            border: "solid 1px white",
                            background: "blue",
                            width: `${zoomRatio*5}px`,
                            height: `${zoomRatio*5}px`,
                            borderRadius: "50%",
                            top:"-4px",
                            right: "-4px"
                            
                        }
                    }}>
                        <img id = {el.id} src = {el.src} alt="이미지" 
                            style={{
                                width: "100%", 
                                height: "100%",
                                borderStyle: el.borderstyle,
                                borderWidth: `${el.bordersize * zoomRatio}px`,
                                borderColor: el.bordercolor,
                                borderRadius: el.radius,
                                zIndex: el.zindex,
                                opacity: el.opacity,
                                filter: `blur(${el.blur}px) brightness(${el.brightness}%) contrast(${el.contrast}%) grayscale(${el.grayscale}%) hue-rotate(${el.hue}deg) invert(${el.invert}%) saturate(${el.saturate}%) sepia(${el.sepia}%)`
                            }} 
                            draggable = "false" className = "Image" onDoubleClick={handleButtonClick}></img>
                </Rnd>
            )}
        </>
    )
}