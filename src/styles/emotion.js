import styled from '@emotion/styled'

export const MainPage = styled.div`
    display: flex;
    flex-direction: column;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`


export const FlexMain = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    border: 1px solid #ddd;
    background-color: red;
`

export const InputMain = styled.div`
    position: relative
    display: flex;
    flex-direction: row;
    width: 370px;
    border: 1px solid black;
    background-color: white;
    line-height: 10px;
    overflow-y: auto;

`

export const DisplayMain = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #ddd;
    overflow:auto;
`

export const Template = styled.div`
    position: absolute;
    width: ${(props) => props.zoomRatio * props.temWidth}px;
    height: ${(props) => props.zoomRatio * props.temHeight}px;
    left: ${(props) => props.lWidth > props.zoomRatio * props.temWidth ? (props.lWidth - props.zoomRatio * props.temWidth)/2 : 0}px;
    margin-right: 200px;
    border: 1px solid #ddd;
    background-color: white;
`

export const TextInput = styled.textarea`
    position: absolute;
    width: 19vw;
    height: 30px;
    border: 1px solid black;
`

export const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 2%;
`