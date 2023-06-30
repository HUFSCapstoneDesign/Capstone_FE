import React, {memo, useEffect, useState, useRef}from "react";
import { ImageResize, Wrapper, Rotate } from "../../../styles/emotion";

function ImageView(props) {
    console.log(`rendering Image ${props.el.id}`);
    const wrapRef = useRef(null);
    const [imgPos, setImgPos] = useState({x: props.el.x, y: props.el.y});
    const [imgSize, setImgSize] = useState({width: props.el.width, height: props.el.height});
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        setImgPos({x: props.el.x , y: props.el.y});
    }, [props.el.x, props.el.y])

    useEffect(() => {
        setImgSize({width: props.el.width, height: props.el.height });
    }, [props.el.width, props.el.height]);

    useEffect(() => {
        setRotation(parseInt(props.el.rotation ? props.el.rotation : 0));
    }, [props.el.rotation])
    
    //move
    useEffect(() => {
        const target = document.getElementById("un2");
        const x = target.getBoundingClientRect().left;
        const y = target.getBoundingClientRect().top;
        const imgWidth = imgSize.width * props.zoomRatio;
        const imgHeight = imgSize.height * props.zoomRatio;
        let startX, startY;
        let isDrag = false;
        let dragFlag = false;
        const tem = document.getElementById("un1");

        const mouseDown = (e) => {
            startX = (e.pageX - wrapRef.current.getBoundingClientRect().left);
            startY = (e.pageY - wrapRef.current.getBoundingClientRect().top);
            if(e.target.className === "Image") isDrag = true;
        }
        const mouseMove = (e) => {
            if(isDrag) {
                const posX = e.clientX - x - startX < 0 ? 0 : e.clientX - x - startX + imgWidth < props.temWidth * props.zoomRatio ? e.clientX - x - startX : props.temWidth * props.zoomRatio - imgWidth;
                const posY = e.clientY - y - startY < 0 ? 0 : e.clientY - y - startY + imgHeight < props.temHeight * props.zoomRatio ? e.clientY - y - startY : props.temHeight * props.zoomRatio - imgHeight;
                setImgPos({x: posX / props.zoomRatio, y: posY / props.zoomRatio});
                dragFlag = true;
            }
        }

        const mouseUp = (e) => {
            if(isDrag && props.flag) {
                isDrag = false;
                const posX = e.clientX - x - startX < 0 ? 0 : e.clientX - x - startX + imgWidth < props.temWidth * props.zoomRatio ? e.clientX - x - startX : props.temWidth * props.zoomRatio - imgWidth;
                const posY = e.clientY - y - startY < 0 ? 0 : e.clientY - y - startY + imgHeight < props.temHeight * props.zoomRatio ? e.clientY - y - startY : props.temHeight * props.zoomRatio - imgHeight;
                props.updateImage(props.el.id, {x: parseInt(posX / props.zoomRatio), y: parseInt(posY / props.zoomRatio)});
            }   
        }

        if(props.flag && tem) {
            tem.addEventListener('mousedown', mouseDown);
            tem.addEventListener('mousemove', mouseMove)
            tem.addEventListener('mouseup', mouseUp);
        }

        return(() => {
            if(dragFlag){
                props.setClick("un2", "Board");
            }   
            tem.removeEventListener('mousedown', mouseDown);
            tem.removeEventListener('mousemove', mouseMove);
            tem.removeEventListener('mouseup', mouseUp);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flag]);

    //resize
    useEffect(() => {
        const imgWidth = imgSize.width;
        const imgHeight = imgSize.height;
        const imgPosX = imgPos.x;
        const imgPosY = imgPos.y;
        let startPos;
        let isDrag = false;
        let width, height, posX, posY;
        const id = ["LT", "LB", "RT", "RB"];
        let dragType;
        const tem = document.getElementById("un1");

        const mouseDown = (e) => {
            startPos = {x: e.clientX, y: e.clientY};
            if(id.includes(e.target.id)) {
                isDrag = true;
                dragType = e.target.id;
            }
        }

        const mouseMove = (e) => {
            if(isDrag && id.includes(dragType)) {
                if((rotation >= 0 && rotation <= 90) || (rotation >= 270 && rotation < 360)) {
                    if(dragType === "LT" || dragType === "LB") width = imgWidth * props.zoomRatio - (e.clientX - startPos.x);  
                    else width = imgWidth * props.zoomRatio + (e.clientX - startPos.x);
                    if(dragType === "LT"|| dragType === "RT") height = imgHeight * props.zoomRatio - e.clientY + startPos.y;
                    else height = imgHeight * props.zoomRatio + e.clientY - startPos.y;
                    if(dragType === "LT" || dragType === "LB") posX = imgPosX * props.zoomRatio + e.clientX - startPos.x;
                    else posX = imgPosX * props.zoomRatio;
                    if(dragType === "LT" || dragType === "RT") posY = imgPosY * props.zoomRatio + e.clientY - startPos.y;
                    else posY = imgPosY * props.zoomRatio;
                }
                
                else if(rotation > 90 && rotation < 270) {
                    if(dragType === "RT" || dragType === "RB") width = imgWidth * props.zoomRatio - (e.clientX - startPos.x);  
                    else width = imgWidth * props.zoomRatio + (e.clientX - startPos.x);
                    if(dragType === "RB"|| dragType === "LB") height = imgHeight * props.zoomRatio - e.clientY + startPos.y;
                    else height = imgHeight * props.zoomRatio + e.clientY - startPos.y;
                    if(dragType === "RT" || dragType === "RB") posX = imgPosX * props.zoomRatio + e.clientX - startPos.x;
                    else posX = imgPosX * props.zoomRatio;
                    if(dragType === "RB" || dragType === "LB") posY = imgPosY * props.zoomRatio + e.clientY - startPos.y;
                    else posY = imgPosY * props.zoomRatio;
                }
                setImgSize({width: width / props.zoomRatio, height: height / props.zoomRatio});
                setImgPos({x: posX / props.zoomRatio, y: posY / props.zoomRatio});
            }
        }

        const mouseUp = (e) => {
            if(isDrag) {
                isDrag = false;
                props.updateImage(props.el.id, {x: parseInt(posX / props.zoomRatio), y: parseInt(posY / props.zoomRatio), width: parseInt(width / props.zoomRatio), height: parseInt(height / props.zoomRatio)});
            }
        }

        if(props.flag && tem) {
            tem.addEventListener('mousedown', mouseDown);
            tem.addEventListener('mousemove', mouseMove)
            tem.addEventListener('mouseup', mouseUp);
        }

        return(() => {
            tem.removeEventListener('mousedown', mouseDown);
            tem.removeEventListener('mousemove', mouseMove);
            tem.removeEventListener('mouseup', mouseUp);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flag])

    //rotate
    useEffect(() => {
        let isDrag = false;
        const target = document.getElementById("un2");
        const x = target.getBoundingClientRect().left;
        const y = target.getBoundingClientRect().top;
        const tem = document.getElementById("un1");
        let newRotation = 0;

        const mouseDown = (e) => {
            if(e.target.id === "rotate" && props.flag) {
                isDrag = true;
            }
        }

        const mouseMove = (e) => {
            if(isDrag) {
                const offsetX = e.clientX - x - (imgPos.x + imgSize.width / 2);
                const offsetY = e.clientY - y - (imgPos.y + imgSize.height / 2);
                newRotation = (Math.atan2(offsetY, offsetX) * (180 / Math.PI) + 450) % 360;
                setRotation(newRotation);
            }
        }

        const mouseUp = (e) => {
            isDrag = false;
            props.updateImage(props.el.id, {rotation: parseInt(newRotation)});
        }
        
        if(props.flag && tem) {
            tem.addEventListener('mousedown', mouseDown);
            tem.addEventListener('mousemove', mouseMove);
            tem.addEventListener('mouseup', mouseUp);
        }

        return() => {
            tem.removeEventListener('mousedown', mouseDown);
            tem.removeEventListener('mousemove', mouseMove);
            tem.removeEventListener('mouseup', mouseUp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.flag])

    

    const ChangeCID = (e) => {
        e.stopPropagation();
        props.setClick(props.el.id, "Image");
    }

    const ChangeImage = (e) => {
        props.setUpdateID(props.el.id);
        props.inputRef.current.click();
    }

    return(
        <Wrapper ref = {wrapRef} width = {imgSize.width} height = {imgSize.height} x = {imgPos.x} y = {imgPos.y} flag = {props.flag} zoomRatio = {props.zoomRatio} rotation = {rotation} zIndex = {props.flag ? 99999999 : props.el.zindex}>
            {props.flag && <div style={{ display: "flex", justifyContent: "center"}}>
                <Rotate id = "rotate" width = {imgSize.width} zoomRatio={props.zoomRatio} style={{zIndex: '99999999'}}></Rotate>
            </div>}
            {props.flag &&<ImageResize id = "LT" width = {imgSize.width} height = {imgSize.height} zoomRatio = {props.zoomRatio}></ImageResize>}
            {props.flag && <ImageResize id = "LB" width = {imgSize.width} height = {imgSize.height} zoomRatio = {props.zoomRatio}></ImageResize>}
            {props.flag && <ImageResize id = "RT" width = {imgSize.width} height = {imgSize.height} zoomRatio = {props.zoomRatio}></ImageResize>}
            {props.flag &&<ImageResize id = "RB" width = {imgSize.width} height = {imgSize.height} zoomRatio = {props.zoomRatio}></ImageResize>}
            <img id = {props.el.id} src = {props.el.src} alt="이미지"
                style={{
                    position: "absolute",
                    width: imgSize.width * props.zoomRatio, 
                    height: imgSize.height * props.zoomRatio,
                    borderStyle: props.el.borderstyle,
                    borderWidth: `${props.el.bordersize * props.zoomRatio}px`,
                    borderColor: props.el.bordercolor,
                    borderRadius: props.el.radius,
                    left: "5px",
                    top: "5px",
                    opacity: props.el.opacity,
                    filter: `blur(${props.el.blur}px) brightness(${props.el.brightness}%) contrast(${props.el.contrast}%) grayscale(${props.el.grayscale}%) hue-rotate(${props.el.hue}deg) invert(${props.el.invert}%) saturate(${props.el.saturate}%) sepia(${props.el.sepia}%)`,
                    boxSizing: "border-box"
                }} 
                draggable = "false" className = "Image"
                onClick={ChangeCID}
                onDoubleClick={ChangeImage}
            />
        </Wrapper>
    )
}
export default memo(ImageView);