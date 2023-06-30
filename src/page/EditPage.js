import React, {useCallback, useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import { useData } from "../store";
import { MainPage, FlexMain, InputMain, DisplayMain, Template} from "../styles/emotion";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton, Box, Button, AppBar, Toolbar, Slider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import TextView from '../components/EditPageComponents/TextComponent/TextView'
import ImageView from "../components/EditPageComponents/ImageComponent/ImageView";
import TextOpt from "../components/EditPageComponents/TextComponent/TextOpt";
import ImageOpt from "../components/EditPageComponents/ImageComponent/ImageOpt";

export default function EditPage() {
    const inputRef = useRef(null);
    const [newImageSrc, setNewImageSrc] = useState(null);
    const [updateType, setUpdateType] = useState(null);
    const [zoomRatio, setZoomRatio] = useState(1);
    const [lWidth, setlWidth] = useState(0);
    const [ClickedID, setClickedID] = useState("un1");
    const [ClickedType, setClickedType] = useState("Board");
    const [startPos, setStartPos] = useState({x: 0, y: 0});
    const [addImageDrag, setAddImageDrag] = useState(false);
    const [endPos, setEndPos] = useState({x: 0, y: 0});
    const [zoomView, setZoomView] = useState(false);
    const {TextData, ImageData, temWidth, temHeight, UpdateText, UpdateImage, AddImage, AddText, AddUpdateID} = useData();
    const TID = useRef(TextData.length);
    const IID = useRef(ImageData.length);
    const [scrollH, setScrollH] = useState(0);
    const widthRef = useRef(null);
    const [TextSizeFlag, setTextSizeFlag] = useState(() => {
        const result = {};
        for(const obj of TextData) {
            const {id} = obj;
            result[id] = true;
        }
        return result;
    });
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
    });

    useEffect(() => {
        let isDragging = false;
        let startPos, endPos;
        
        const mouseDown = (e) => {
            setStartPos({x: e.layerX, y: e.layerY})
            startPos = {x: e.layerX, y: e.layerY};
            isDragging = true;
        }

        const mouseMove = (e) => {
            if(isDragging) {
                setEndPos({x: e.layerX, y: e.layerY})
                endPos = {x: e.layerX, y: e.layerY}
            }
        }

        const mouseUp = (e) => {
            IID.current += 1;
            AddImage(String(IID.current), parseInt(startPos.x / zoomRatio), parseInt(startPos.y / zoomRatio), parseInt((endPos.x - startPos.x)/zoomRatio), parseInt((endPos.y - startPos.y)/zoomRatio), newImageSrc, TID.current + IID.current);
            setClick(String(IID.current), "Image");
            AddUpdateID(String(IID.current), newImageSrc);
            setNewImageSrc(null);        
        }
        if(newImageSrc) {          
            document.addEventListener('mousedown', mouseDown);
            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp);
        }
        return(() => {
            document.removeEventListener('mousedown', mouseDown);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newImageSrc])
    useEffect(() => {
        setlWidth(document.getElementById("un1").offsetWidth);
        const setWidth = () => {
            setlWidth(document.getElementById("un1").offsetWidth);
        }
        window.addEventListener('resize', setWidth);
        return() => {
            window.removeEventListener('resize', setWidth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const updateText = useCallback((id, data) => {
        UpdateText(id, data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateImage = useCallback((id, data) => {
        UpdateImage(id, data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setClick = useCallback((id, type) => {
        setClickedID(id);
        setClickedType(type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickEvent = (e) => {
        setClickedID(e.target.id);
        setClickedType(e.target.calssName);
    }

    const setTextSize = useCallback((id, flag) => {
        setTextSizeFlag({...TextSizeFlag, [id]: flag})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setUpdateID = useCallback((id) => {
        setUpdateType(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const updateScroll = (e) => {
        setScrollH(e.target.scrollTop)
    }

    const ChangeImage = (e) => {
        if(e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            if(updateType) {
                reader.onloadend = () => {
                    updateImage(updateType, {src: reader.result});
                    AddUpdateID(updateType, reader.result);
                    setUpdateType(null);
                }    
            }
            else {
                //new Image
                reader.onloadend = () => {
                    setNewImageSrc(reader.result);
                    setAddImageDrag(true);
                    setStartPos({x: 0, y: 0});
                    setEndPos({x: 0, y: 0});
                }
            }
        }
    }

    const newText = () => {
        TID.current += 1;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `23px 'Nanum Pen Script', cursive`;
        const width = context.measureText("텍스트를 입력해주세요").width
        const height =  32;
        AddText(String(TID.current), parseInt((temWidth - width)/2), parseInt(scrollH + (widthRef.current.offsetHeight - height)/2), width, height, TextData.length + ImageData.length + 1);
        setClick(String(TID.current), "Text");
    }

    const newImage = () => {
        inputRef.current.click();
    }

    const ClickView = () => {
        setZoomView(!zoomView);
    }

    const handleZoom = (e) => {
        setZoomRatio(e.target.value / 100)
    }

    return(
        <MainPage>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" style={{backgroundColor: "#1F1F1F"}}>
                        <Toolbar variant="dense" style={{marginLeft:"-10px", height:"40px"}}>
                            <IconButton aria-label="addImage" onClick = {newImage}>
                                <AddPhotoAlternateIcon sx={{color: "white", fontSize: 30}}></AddPhotoAlternateIcon>
                                <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={ChangeImage}/>
                            </IconButton>
                            <IconButton aria-label="addText" onClick={newText}>
                                <TextIncreaseIcon sx={{color: "white", fontSize: 30}}></TextIncreaseIcon>
                            </IconButton>
                            <IconButton aria-label="zoom" onClick={ClickView}>
                                <ZoomInIcon sx={{color: "white", fontSize: 30}}></ZoomInIcon>
                            </IconButton>
                            {zoomView && <Slider onChange={handleZoom} min={50} max={300} sx={{width: "150px", color:"white"}} value={zoomRatio*100}></Slider>}
                            <Box sx={{ flexGrow: 1 }} />
                            <Link to="/preview">           
                                <Button sx={{color: "white"}}>미리보기</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <FlexMain>
                <InputMain id = "board">
                    {ClickedType === "Text" ? <TextOpt ClickedID = {ClickedID} updateText = {updateText} setTextSize = {setTextSize} TextSizeFlag = {TextSizeFlag[ClickedID]} setClick = {setClick}></TextOpt> 
                    : ClickedType === "Image" ? <ImageOpt ClickedID = {ClickedID} updateImage = {updateImage} setClick = {setClick} inputRef = {inputRef} setUpdateID = {setUpdateID}></ImageOpt> 
                    : <div></div>}
                </InputMain>
                <DisplayMain id = "un1" className="Board" onClick={onClickEvent} ref={widthRef} onScroll={updateScroll}>
                    <Template id = "un2" className="Board" onClick = {onClickEvent} zoomRatio = {zoomRatio} temHeight = {temHeight} temWidth = {temWidth} lWidth = {lWidth} style={{cursor: (addImageDrag && newImageSrc) ? "crosshair" : "default"}}>
                        {(newImageSrc) && <div style = {{border: "1px solid black", width: (endPos.x - startPos.x), height: (endPos.y - startPos.y), marginLeft: (startPos.x), marginTop: (startPos.y)}}></div>}
                        {TextData.map((el) => <TextView key = {el.id} el = {el} zoomRatio = {zoomRatio} updateText = {updateText} setClick = {setClick} flag = {(el.id === ClickedID && ClickedType === "Text")} TextSizeFlag = {TextSizeFlag[el.id]} setTextSize = {setTextSize} temWidth = {temWidth} temHeight = {temHeight}></TextView>)}
                        {ImageData.map((el) => <ImageView key = {el.id} el = {el} zoomRatio = {zoomRatio} updateImage = {updateImage} flag = {(el.id === ClickedID && ClickedType === "Image")} setClick = {setClick} setUpdateID = {setUpdateID} inputRef = {inputRef} temWidth = {temWidth} temHeight = {temHeight}></ImageView>)}
                    </Template>                  
                </DisplayMain>
            </FlexMain>
        </MainPage>
    )
}