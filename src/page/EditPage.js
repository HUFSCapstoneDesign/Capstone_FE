import {React, useState, useRef} from "react";
import { MainPage, FlexMain, InputMain, DisplayMain, Template} from "../styles/emotion";
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

    //rotation button size = [50,50]
    const [zoomRatio, setZoomRatio] = useState(1);
    const [zoomView, setZoomView] = useState(false);
    const [ClickedID, SetClickedID] = useState("");
    const [ClickedType, SetClickedType] = useState("");
    const [backColorBol, SetBackColorBol] = useState(true);
    const newImageID = useRef({});
    const inputRef = useRef();
    const newRef = useRef();
    const [img, setImg] = useState(null);
    const [flag, SetFlag] = useState(false);
    const [changeFlag, setChangeFlag]  = useState(true);
    const [newChangeID, setNewChangeID] = useState(null);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
    });

      const temWidth = 700;
      const temHeight = 3000;
      const [Tdata, SetTData] = useState([
        {id: "1", x: 50, y:150, content: "text1\ntext1text1", size: 20, font: "'Nanum Pen Script', cursive", bold: true, italic: false, underlined: false, align: "left", textcolor: "161250079", textopa: 0.3, backcolor: "255253085", backopa: 0.7, zindex: 4},
        {id: "2", x: 150, y:50, content: "text2\ntestestest\ntestest", size: 20, font: "'Single Day', cursive", bold: false, italic: false, underlined: true, align: "center", textcolor: "093110250", textopa: 0.6, backcolor:"000035245", backopa: 0.5, zindex: 5},
        {id: "3", x: 300, y:400, content: "text3", size: 15, font: "'Hi Melody', cursive", bold: true, italic: true, underlined:false, align: "right", textcolor: "116027124", textopa: 1, backcolor:"234054128", backopa:1, zindex: 6}
      ])
    
      const [Idata, SetIData] = useState([
        {id: "1", x: 200, y: 150, src: "Test1.jpg", width: 200, height: 200, zindex: 1, borderstyle: "none", bordersize: 0, bordercolor: "#000000", opacity: 1, radius: 10, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
        {id: "2", x: 50, y: 300, src: "Test2.jpg", width: 150, height: 250, zindex: 2, borderstyle: "dotted", bordersize: 1, bordercolor: "#000000", opacity: 0.7, radius: 0, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
        {id: "3", x: 400, y: 400, src: "Test3.jpg", width: 250, height: 150, zindex: 3, borderstyle:"dashed", bordersize: 0.5, bordercolor: "#00ff00", opacity: 0.5, radius: 30, blur: 0 , brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0}
      ])
    
      const TID = useRef(Tdata.length);
      const IID = useRef(Idata.length);
    


    const handleImageUpload = (e) => {
        if(e.target.files[0]) {
            const file = e.target.files[0]; // 선택한 파일 가져오기
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                SetIData(Idata.map((el) => el.id === ClickedID ? {...el, src: reader.result} : el))
            }
        }
    };

    const NewImage = () => {
        newRef.current.click();
    }

    //템플릿 사이즈 필요(변수 불러와야됨) => 화면 중간에 나오도록
    const NewText = () => {
        TID.current += 1;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `23px 'Nanum Pen Script', cursive`;
        const width = context.measureText("글자를 입력해주세요").width
        const height =  32;
        SetTData([{id: String(TID.current), x: 0, y: 0, content: "", size: 20, font: "'Nanum Pen Script', cursive", bold: false, italic: false, underlined: false, align: "left", textcolor: "000000000", textopa: 1, backcolor: "255255255", backopa: 0, zindex: IID.current + TID.current, rotation: 0, width: width, height: height}, ...Tdata]);
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
            if(data && ((data.content === "")||(data.textopa === 0) || (data.textcolor === "255255255" && data.textcolor === "255255255"))) {
                SetTData(Tdata.filter((el) => el.id !== ClickedID));
            }
            
            else if(data && data.size === "") {
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
                            <Button sx={{color: "white"}}>미리보기</Button>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <FlexMain style={{overflowY: "auto"}}>
                <InputMain id = "board">
                    {(ClickedType === "Text" ? 
                    <TextOpt Tdata={Tdata} SetTData={SetTData} Idata = {Idata} SetIData = {SetIData} ClickedID={ClickedID} SetClickedID = {SetClickedID} SetClickedType = {SetClickedType} backColorBol = {backColorBol} SetBackColorBol = {SetBackColorBol} zfront = {zfront} zbehind = {zbehind} zforward = {zforward} zbackward = {zbackward} IID = {IID} TID = {TID} zoomRatio = {zoomRatio} changeFlag = {changeFlag} setChangeFlag = {setChangeFlag} temHeight = {temHeight} temWidth = {temWidth}></TextOpt>
                     : (ClickedType === "Image" ? 
                     <ImageOpt style = {{overflow:"auto"}} Idata={Idata} SetIData={SetIData} Tdata = {Tdata} SetTData={SetTData} ClickedID={ClickedID} SetClickedID = {SetClickedID} inputRef = {inputRef} handleImageUpload = {handleImageUpload} newImageID = {newImageID} SetClickedType = {SetClickedType} zfront = {zfront} zbehind = {zbehind} zforward = {zforward} zbackward = {zbackward} IID = {IID} TID = {TID} zoomRatio = {zoomRatio} temHeight = {temHeight} temWidth = {temWidth}></ImageOpt> : 
                     <div></div>))}  
                </InputMain>

                <DisplayMain id = "un1" onClick={ChangeCID} className="Board">
                    <Template id = "un2" className="Board" style = {{cursor: (flag && img) ? "crosshair" : "default"}} zoomRatio = {zoomRatio} width = {window.visualViewport.width} temHeight = {temHeight} temWidth = {temWidth}>
                        <TextView Tdata = {Tdata} SetTData={SetTData} Idata = {Idata} SetIData = {SetIData} ClickedID = {ClickedID} SetClickedID = {SetClickedID} ClickedType = {ClickedType} SetClickedType = {SetClickedType} SetBackColorBol = {SetBackColorBol} zoomRatio = {zoomRatio} changeFlag = {changeFlag} setChangeFlag = {setChangeFlag} newChangeID = {newChangeID} setNewChangeID = {setNewChangeID} temHeight = {temHeight} temWidth = {temWidth}></TextView>
                        <ImageView Idata = {Idata} SetIData = {SetIData} ClickedID = {ClickedID} SetClickedID = {SetClickedID} ClickedType = {ClickedType} SetClickedType = {SetClickedType} Tdata = {Tdata} SetTData = {SetTData} inputRef = {inputRef} handleImageUpload = {handleImageUpload} flag = {flag} SetFlag = {SetFlag} TID = {TID} IID = {IID} img = {img} setImg = {setImg} zoomRatio = {zoomRatio}></ImageView>
                    </Template>                  
                </DisplayMain>
            </FlexMain>
        </MainPage>
    )
}