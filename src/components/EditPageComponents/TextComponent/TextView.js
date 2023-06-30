import React, {memo, useEffect, useRef, useState} from "react";
import { Wrapper, TextInput, Rotate } from "../../../styles/emotion";


function TextView(props) {
    const isMoving = useRef(false);
    const wrapRef = useRef(null);
    const [textPos, setTextPos] = useState({x: props.el.x, y: props.el.y});
    const [rotation, setRotation] = useState(props.el.rotation ? props.el.rotation : 0);
    console.log(`rendering Text ${props.el.id}`);

    const rgba = (rgb, opa) => {
        return "rgba(" + String(rgb.substr(0,3)) + "," + String(rgb.substr(3,3)) + "," + String(rgb.substr(6,3)) + "," + String(opa) + ")" 
    }
    
    const UpdateSize = () => {
        const target = document.getElementById(props.el.id);
        target.style.width = "0";
        target.style.height = "0";
        const width = parseInt(target.scrollWidth) + 5;
        const height = parseInt(target.scrollHeight) + 5;
        props.updateText(props.el.id, {width: parseInt(width / props.zoomRatio), height: parseInt(height / props.zoomRatio)})
        target.style.width = "100%";
        target.style.height = "100%";
    }
    useEffect(() => {
        UpdateSize(props.el.content);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.TextSizeFlag])

    useEffect(() => {
        setTextPos({x: props.el.x, y: props.el.y});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.el.x, props.el.y])

    useEffect(() => {
        setRotation(parseInt(props.el.rotation ? props.el.rotation : 0));
    }, [props.el.rotation])
    
    const contentUpdate = (e) => {
        props.updateText(props.el.id, {content: e.target.value});
        UpdateSize();
    }

    useEffect(() => {
        const target = document.getElementById("un2");
        const tem = document.getElementById("un1");
        const x = target.getBoundingClientRect().left;
        const y = target.getBoundingClientRect().top;   
        let startX, startY;
        let isDrag = false;

        const mouseDown = (e) => {
            startX = e.pageX - wrapRef.current.getBoundingClientRect().left;
            startY = e.pageY - wrapRef.current.getBoundingClientRect().top
            if(e.target.className.split(' ')[0] === "Text") isDrag = true;
        }
        const mouseMove = (e) => {
            if(isDrag) {
                const posX = e.clientX - x - startX < 0 ? 0 : e.clientX - x - startX + props.el.width * props.zoomRatio < props.temWidth * props.zoomRatio ? e.clientX - x - startX : props.temWidth * props.zoomRatio - props.el.width * props.zoomRatio;
                const posY = e.clientY - y - startY < 0 ? 0 : e.clientY - y - startY + props.el.height * props.zoomRatio < props.temHeight * props.zoomRatio ? e.clientY - y - startY : props.temHeight * props.zoomRatio - props.el.height * props.zoomRatio;
               setTextPos({x: posX / props.zoomRatio, y: posY / props.zoomRatio});   
            }
        }

        const mouseUp = (e) => {
            if(isDrag) {
                isDrag = false;
                const posX = e.clientX - x - startX < 0 ? 0 : e.clientX - x - startX + props.el.width * props.zoomRatio < props.temWidth * props.zoomRatio ? e.clientX - x - startX : props.temWidth * props.zoomRatio - props.el.width * props.zoomRatio;
                const posY = e.clientY - y - startY < 0 ? 0 : e.clientY - y - startY + props.el.height * props.zoomRatio < props.temHeight * props.zoomRatio ? e.clientY - y - startY : props.temHeight * props.zoomRatio - props.el.height * props.zoomRatio;
                props.updateText(props.el.id, {x: parseInt(posX / props.zoomRatio), y: parseInt(posY / props.zoomRatio)});
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
    }, [props.flag]);

    useEffect(() => {
        let isDrag = false;
        const target = document.getElementById("un2");
        const tem = document.getElementById("un1");
        const x = target.getBoundingClientRect().left;
        const y = target.getBoundingClientRect().top;
        let newRotation = props.el.rotation;

        const mouseDown = (e) => {
            if(e.target.id === "rotate" && props.flag) {
                isDrag = true;
            }
        }

        const mouseMove = (e) => {
            if(isDrag) {
                const offsetX = e.clientX - x - (textPos.x + props.el.width / 2);
                const offsetY = e.clientY - y - (textPos.y + props.el.height / 2);
                newRotation = (Math.atan2(offsetY, offsetX) * (180 / Math.PI) + 450) % 360;
                setRotation(newRotation);
            }
        }

        const mouseUp = (e) => {
            isDrag = false;
            props.updateText(props.el.id, {rotation: parseInt(newRotation)});
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
        props.setClick(e.target.id, e.target.className.split(' ')[0]);
        if(props.el.flag && !(isMoving.current)) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = `${props.el.size}px ${props.el.font}`;
            const width = context.measureText("텍스트를 입력해주세요").width
            const height = (props.el.size + 12)
            props.updateText(e.target.id, {content: "", flag: false, width: width, height: height});
        }
        isMoving.current = (false);
    }

    return(
        <Wrapper ref = {wrapRef} width = {props.el.width} height = {props.el.height} x = {textPos.x} y = {textPos.y} flag = {props.flag} zoomRatio = {props.zoomRatio} rotation = {rotation} zIndex = {props.flag ? 99999999 : props.el.zindex}>
            {props.flag && <div style={{ display: "flex", justifyContent: "center"}}>
                <Rotate id = "rotate" width = {props.el.width} zoomRatio = {props.zoomRatio}></Rotate>
            </div>}
            <TextInput id = {props.el.id} onInput={contentUpdate} onClick={(e) => ChangeCID(e)} placeholder="텍스트를 입력해주세요" 
                style = {{
                    background: rgba(props.el.backcolor, props.el.backopa),
                    fontFamily: `${props.el.font}`,
                    fontSize: `${props.el.size * props.zoomRatio}px`, 
                    fontWeight: (props.el.bold) ? "bold" : "normal", 
                    fontStyle: (props.el.italic) ? "italic" : "normal", 
                    textDecorationLine: (props.el.underlined) ? "underline" : "none", 
                    textAlign: `${props.el.align}`, 
                    color: rgba(props.el.textcolor, props.el.textopa),
                    zIndex: (props.el.zindex)
                }} 
                className="Text" value={props.el.content ? props.el.content : ""}></TextInput>
        </Wrapper>
    )
}
export default memo(TextView);