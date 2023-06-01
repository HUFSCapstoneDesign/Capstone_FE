import {React, useState, useRef, useEffect} from "react";
import { MainPage, FlexMain, InputMain, DisplayMain, Template} from "../styles/emotion";
import { Link, useLocation } from "react-router-dom";
import TextOpt from "../components/EditPageComponents/TextComponent/TextOpt";
import TextView from "../components/EditPageComponents/TextComponent/TextView";
import ImageOpt from "../components/EditPageComponents/ImageComponent/ImageOpt";
import ImageView from "../components/EditPageComponents/ImageComponent/ImageView";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slider from '@mui/material/Slider';
import ZoomInIcon from '@mui/icons-material/ZoomIn';


export default function EditPage() {
    const location = useLocation();
    const [Tdata, SetTData] = useState(location.state.Tdata); 
    const [Idata, SetIData] = useState(location.state.Idata);
    const pageFlag = location.state.pageFlag;

    const [zoomRatio, setZoomRatio] = useState(1);
    const [zoomView, setZoomView] = useState(false);
    const [ClickedID, SetClickedID] = useState("un1");
    const [ClickedType, SetClickedType] = useState("Board");
    const [backColorBol, SetBackColorBol] = useState(true);
    const newImageID = useRef({});
    const inputRef = useRef();
    const newRef = useRef();
    const [img, setImg] = useState(null);
    const [flag, SetFlag] = useState(false);
    const [changeFlag, setChangeFlag]  = useState(true);
    const [newChangeID, setNewChangeID] = useState(null);
    const widthRef = useRef(null);
    const [lWidth,setlWidth] = useState(0);
    const temRef = useRef(null);
    const [scrollH, setScrollH] = useState(0);
    const [zflag, setZflag] = useState(-1);
    const [z, setZ] = useState(Tdata.length + Idata.length + 1);
    const [updatedID, setUpdatedID] = useState(location.state.updatedID);
    const [updatedFile, setUpdatedFile] = useState(null);

    const updateScroll = (e) => {
        setScrollH(e.target.scrollTop)
    }

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
    
    useEffect(() => {
        if (zflag !== -1) {
            SetTData(Tdata.map((el) => el.zindex > z ? {...el, zindex: el.zindex - 1} : el))
            SetIData(Idata.map((el) => el.zindex > z ? {...el, zindex: el.zindex - 1} : el))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [zflag])

    useEffect(() => {
        if(pageFlag) {
            const textSize = [];
            Tdata.map((el) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                context.font = `${el.size + 3}px ${el.font}`;
                const text = el.content.split("\n");
                const width = (Math.max(...text.map((ell) => context.measureText(ell).width)));
                const height = (text.length) * (el.size * 1.3);
                textSize.push([width, height]);
            })
            SetTData(Tdata.map((el, index) => el ? {...el, width: textSize[index][0], height: textSize[index][1], flag: true} : el));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [])

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
    });

    const temWidth = location.state.temWidth;
    const temHeight = location.state.temHeight;
    
    
    const TID = useRef(Tdata.length);
    const IID = useRef(Idata.length);
    
    const handleImageUpload = (e) => {
        if(e.target.files[0]) {
            const file = e.target.files[0]; // 선택한 파일 가져오기
            setUpdatedFile(file);
            SetIData(Idata.map((el) => el.id === ClickedID ? {...el, src: URL.createObjectURL(file)} : el));
            const IDdata = updatedID;
            IDdata[`${ClickedID}`] = file;
            setUpdatedID(IDdata);
        }
    };

    const NewImage = () => {
        newRef.current.click();
    }

    const NewText = () => {
        TID.current += 1;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `23px 'Nanum Pen Script', cursive`;
        const width = context.measureText("텍스트를 입력해주세요").width
        const height =  32;
        SetTData([{id: String(TID.current), x: (temWidth - width)/2, y: scrollH + (widthRef.current.offsetHeight - height)/2, content: "", size: 20, font: "'Nanum Pen Script', cursive", bold: false, italic: false, underlined: false, align: "left", textcolor: "000000000", textopa: 1, backcolor: "255255255", backopa: 0, zindex: IID.current + TID.current, rotation: 0, width: width, height: height, flag: false}, ...Tdata]);
        SetClickedID(String(TID.current));    
        SetClickedType("Text");
        setNewChangeID(String(TID.current));
    }

    const ClickView = () => {
        setZoomView(!zoomView);
    }

    const handleZoom = (e) => {
        setZoomRatio(e.target.value / 100)
        setChangeFlag(!changeFlag);
    }
        

    const ImageSave = (e) => {
        if(e.target.files[0]) {
            const file = e.target.files[0]; // 선택한 파일 가져오기
            setUpdatedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImg(reader.result)
                SetFlag(true);
            }
        }
    }

    const zfront = () => {
        const currentZ = (ClickedType === "Text") ? Tdata.find((el) => el.id === ClickedID).zindex : Idata.find((el) => el.id === ChangeCID).zindex;
        SetIData(Idata.map((el) => el.zindex > currentZ ? {...el, zindex: el.zindex - 1} : (el.zindex === currentZ ? {...el, zindex: IID.current + TID.current} : el)))
        SetTData(Tdata.map((el) => el.zindex > currentZ ? {...el, zindex: el.zindex - 1} : (el.zindex === currentZ ? {...el, zindex: IID.current + TID.current} : el)))
    }

    const zbehind = () => {
        const currentZ = (ClickedType === "Text") ? Tdata.find((el) => el.id === ClickedID).zindex : Idata.find((el) => el.id === ChangeCID).zindex;
        SetIData(Idata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)))
        SetTData(Tdata.map((el) => el.zindex < currentZ ? {...el, zindex: el.zindex + 1} : (el.zindex === currentZ ? {...el, zindex: 1} : el)))
    }

    const zforward = () => {
        const currentZ = (ClickedType === "Text") ? Tdata.find((el) => el.id === ClickedID).zindex : Idata.find((el) => el.id === ChangeCID).zindex;
        SetIData(Idata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === ClickedID) ? {...el, zindex: currentZ + 1} : el))
        SetTData(Tdata.map((el) => el.zindex === currentZ + 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === ClickedID) ? {...el, zindex: currentZ + 1} : el))
    }

    const zbackward = () => {
        const currentZ = (ClickedType === "Text") ? Tdata.find((el) => el.id === ClickedID).zindex : Idata.find((el) => el.id === ChangeCID).zindex;
        SetIData(Idata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === ClickedID) ? {...el, zindex: currentZ - 1} : el))
        SetTData(Tdata.map((el) => el.zindex === currentZ - 1 ? {...el, zindex: currentZ} : (el.zindex === currentZ && el.id === ClickedID) ? {...el, zindex: currentZ - 1} : el))
    }

    const ChangeCID = (e) => {

        if (ClickedType === "Text" && newChangeID !== ClickedID) {
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

    return(
        <MainPage>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" style={{backgroundColor: "#1F1F1F"}}>
                        <Toolbar variant="dense" style={{marginLeft:"-10px"}}>
                            <IconButton aria-label="addPhoto" onClick={NewImage}>
                                <AddPhotoAlternateIcon sx={{color: "white", fontSize: 30}}></AddPhotoAlternateIcon>
                                <input type="file" accept="image/*" ref={newRef} style={{ display: 'none' }} onChange={ImageSave}/>
                            </IconButton>
                            <IconButton aria-label="addText" onClick={NewText}>
                                <TextIncreaseIcon sx={{color: "white", fontSize: 30}}></TextIncreaseIcon>
                            </IconButton>
                            <IconButton aria-label="addText" onClick={ClickView}>
                                <ZoomInIcon sx={{color: "white", fontSize: 30}}></ZoomInIcon>
                            </IconButton>
                            {zoomView && <Slider onChange={handleZoom} min={50} max={300} sx={{width: "150px", color:"white"}} value={zoomRatio*100}></Slider>}
                            <Box sx={{ flexGrow: 1 }} />
                            <Link to="/preview" state = {{Tdata: Tdata, Idata: Idata, temHeight: temHeight, temWidth: temWidth, updatedID: updatedID, categoryData: location.state.categoryData}}>           
                                <Button sx={{color: "white"}}>미리보기</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <FlexMain style={{overflowY: "auto"}}>
                <InputMain id = "board">
                    {(ClickedType === "Text" ? 
                    <TextOpt Tdata={Tdata} SetTData={SetTData} Idata = {Idata} SetIData = {SetIData} ClickedID={ClickedID} SetClickedID = {SetClickedID} SetClickedType = {SetClickedType} backColorBol = {backColorBol} SetBackColorBol = {SetBackColorBol} zfront = {zfront} zbehind = {zbehind} zforward = {zforward} zbackward = {zbackward} IID = {IID} TID = {TID} zoomRatio = {zoomRatio} changeFlag = {changeFlag} setChangeFlag = {setChangeFlag} temHeight = {temHeight} temWidth = {temWidth} zflag = {zflag} setZflag = {setZflag} setZ = {setZ}></TextOpt>
                     : (ClickedType === "Image" ? 
                     <ImageOpt style = {{overflow:"auto"}} Idata={Idata} SetIData={SetIData} Tdata = {Tdata} SetTData={SetTData} ClickedID={ClickedID} SetClickedID = {SetClickedID} inputRef = {inputRef} handleImageUpload = {handleImageUpload} newImageID = {newImageID} SetClickedType = {SetClickedType} zfront = {zfront} zbehind = {zbehind} zforward = {zforward} zbackward = {zbackward} IID = {IID} TID = {TID} zoomRatio = {zoomRatio} temHeight = {temHeight} temWidth = {temWidth} zflag = {zflag} setZflag = {setZflag} setZ = {setZ}></ImageOpt> : 
                     <div></div>))}  
                </InputMain>

                <DisplayMain id = "un1" onClick={ChangeCID} className="Board" ref={widthRef} onScroll={updateScroll}>
                    <Template id = "un2" className="Board" ref = {temRef} style = {{cursor: (flag && img) ? "crosshair" : "default"}} zoomRatio = {zoomRatio} temHeight = {temHeight} temWidth = {temWidth} lWidth = {lWidth} >
                        <TextView Tdata = {Tdata} SetTData={SetTData} Idata = {Idata} SetIData = {SetIData} ClickedID = {ClickedID} SetClickedID = {SetClickedID} ClickedType = {ClickedType} SetClickedType = {SetClickedType} SetBackColorBol = {SetBackColorBol} zoomRatio = {zoomRatio} changeFlag = {changeFlag} setChangeFlag = {setChangeFlag} newChangeID = {newChangeID} setNewChangeID = {setNewChangeID} temHeight = {temHeight} temWidth = {temWidth}></TextView>
                        <ImageView Idata = {Idata} SetIData = {SetIData} ClickedID = {ClickedID} SetClickedID = {SetClickedID} ClickedType = {ClickedType} SetClickedType = {SetClickedType} Tdata = {Tdata} SetTData = {SetTData} inputRef = {inputRef} handleImageUpload = {handleImageUpload} flag = {flag} SetFlag = {SetFlag} TID = {TID} IID = {IID} img = {img} setImg = {setImg} zoomRatio = {zoomRatio} updatedFile = {updatedFile} setUpdatedFile = {setUpdatedFile} updatedID = {updatedID} setUpdatedID = {setUpdatedID}></ImageView>
                    </Template>                  
                </DisplayMain>
            </FlexMain>
        </MainPage>
    )
}