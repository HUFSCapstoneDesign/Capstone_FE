import styled from '@emotion/styled'

export const MainPage = styled.div`
    display: flex;
    flex-direction: column;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
`


export const FlexMain = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100% - 40px);
    width: 100%;
    border: 1px solid #ddd;
    background-color: red;
    box-sizing: border-box;
    overflow: hidden;
`

export const InputMain = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px; 
    border: 1px solid black;
    background-color: white;  
    box-sizing: border-box;
    overflow-y: auto;

`

export const DisplayMain = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: calc(100% - 300px);
    background-color: #ddd;
    box-sizing: border-box;
    padding: 100px;
    overflow:auto;
`

export const Template = styled.div`
    position: absolute;
    width: ${(props) => props.zoomRatio * props.temWidth}px;
    height: ${(props) => props.zoomRatio * props.temHeight}px;
    left: ${(props) => props.lWidth - 100 > props.zoomRatio * props.temWidth ? (props.lWidth - props.zoomRatio * props.temWidth)/2 : 100}px;
    background-color: white;
    box-sizing: border-box;
`

export const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 2%;
    box-sizing: border-box;
`

export const TextInput = styled.textarea`
    position: absolute;
    white-space: pre;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
    box-sizing: border-box;
`

export const Wrapper = styled.div`
    position: absolute;
    width: ${(props) => (props.width * props.zoomRatio + 10)}px;
    height: ${(props) => (props.height * props.zoomRatio + 10)}px;
    left: ${(props) => (props.x * props.zoomRatio - 5)}px;
    top: ${(props) => (props.y * props.zoomRatio - 5)}px;
    border: ${(props) => (props.flag ? "1.5px dotted black" : "none")};
    box-sizing: border-box;
    cursor: ${(props) => props.flag ? "move" : "auto"};
    z-index: ${(props) => props.zIndex};
    transform: rotate(${(props) => props.rotation}deg);
`

export const ImageResize = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    left: ${(props) => (props.id === "LT" || props.id === "LB") ? "-5px" :`${props.width * props.zoomRatio + 5}px`};
    top: ${(props) => (props.id === "LT" || props.id === "RT") ? "-5px" : `${props.height * props.zoomRatio + 5}px`};
    background: blue;
    box-sizing: border-box;
    cursor: ${(props) => (props.id === "LT" || props.id === "RB") ? "nw-resize" : "ne-resize"};
`

export const Rotate = styled.button`
    position: absolute;
    width: 10px;
    height: 15px;
    border-radius: 100px;
    top: -50px;
    box-sizing: border-box;
    background: white;
    border: 2px solid #69FF33;
    cursor: default;
`