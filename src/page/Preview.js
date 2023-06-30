import { React, useState, useRef, useEffect } from "react";
import "../styles/Preview.css";
import { Link } from "react-router-dom";
import { MainPage } from "../styles/emotion";
import AWS from 'aws-sdk';
import uuid from 'react-uuid';
import axios from 'axios'
import imageCompression from "browser-image-compression";
import { useData } from "../store";

import {
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import Box from '@mui/material/Box';
import { DisplayMain } from "../styles/emotion";
import { Template } from "../styles/emotion";
import html2canvas from "html2canvas";
import ImageCropping from "../components/PreviewComponents/ImageCropping";

function AddInfo(props) {
  const textarea = useRef();
  const {categoryData} = useData();

  const titleChange = (e) => {
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    props.setTitle(e.target.value);
  };

  function check_enter(event) {
    if (event.code === "Enter") {
      event.preventDefault();
    }
  }

  const categoryChange = (e) => {
    props.setCategory(e.target.value);
  };

  const ImageSave = () => {
    const link = props.imageLink;
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="addinfo">
      <textarea
        ref={textarea}
        className="title"
        type="text"
        placeholder="제목을 입력하세요"
        rows={1}
        onChange={titleChange}
        onKeyPress={check_enter}
      ></textarea>
      <span className="name">| 카테고리</span>
      <select className="category" onChange={categoryChange}>
        {categoryData.map((item, idx) => (
          <option value={item.name ? item.name : ""} key={idx}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="name">| 태그</span>
      <AddTag setTag={props.setTag}></AddTag>
      <Button
          variant="contained"
          onClick={ImageSave}
          style={{position:"absolute", top: "600px", left:"140px"}}
      >이미지</Button>
    </div>
  );
}

function AddTag(props) {
  const [Tagitem, setTagitem] = useState(null);
  const [TagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...TagList];
    Tagitem && updatedTagList.push(Tagitem);
    setTagList(updatedTagList);
    setTagitem("");
    props.setTag(updatedTagList);
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = TagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
    props.setTag(filteredTagList);
  };

  return (
    <div className="TagBox">
      <input
        className="InsertTag"
        type="text"
        placeholder="추가할 태그를 입력하세요"
        onChange={(e) => setTagitem(e.target.value)}
        value={ Tagitem ? Tagitem : ""}
        onKeyPress={onKeyPress}
      />
      {TagList.map((tagItem, index) => {
        return (
          <div className="TagItem" key={index}>
            <div>{tagItem}</div>
            <button className="DeleteTag" onClick={deleteTagItem}>
              ✖
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Result() {
  const {TextData, ImageData} = useData();
  console.log(TextData); 
  const rgba = (rgb, opa) => {
    return (
      "rgba(" +
      String(rgb.substr(0, 3)) +
      "," +
      String(rgb.substr(3, 3)) +
      "," +
      String(rgb.substr(6, 3)) +
      "," +
      String(opa) +
      ")"
    );
  };
  return (
    <>
      {TextData.map(
        (el) =>
          el.content && (
            <pre
              key={`${"1" + el.id}`}
              style={{
                position: "absolute",
                marginLeft: `${el.x}px`,
                marginTop: `${el.y}px`,
                zIndex: el.zindex,
                background: rgba(el.backcolor, el.backopa),
                fontFamily: `${el.font}`,
                fontSize: `${el.size}px`,
                fontWeight: el.bold ? "bold" : "normal",
                fontStyle: el.italic ? "italic" : "normal",
                textDecorationLine: el.underlined ? "underline" : "none",
                textAlign: `${el.align}`,
                color: rgba(el.textcolor, el.textopa),
                zIndex: el.zindex,
                resize: "none",
                outline: "none",
                whiteSpace: "pre",
                paddingLeft: el.align === "left" ? "2px" : el.align === "right" ? "5px" : "5px",
                paddingRight: el.align === "left" ? "5px" : el.align === "right" ? "2px" : "5px",
                paddingTop: "3px",
                paddingBottom: "7px",
                transform: `rotate(${parseInt(el.rotation)}deg)`
              }}
            >
              {el.content}
            </pre>
          )
      )}
      {ImageData.map((el) => (
        <img
          key={`${"2"+el.id}`}
          crossOrigin="anonymous"
          src={el.src.startsWith("http") ? el.src + '?' + new Date().getTime() : el.src}
          alt={"이미지"}
          style={{
            position: "absolute",
            left: el.x,
            top: el.y,
            width: el.width,
            height: el.height,
            borderStyle: el.borderstyle,
            borderWidth: `${el.bordersize}px`,
            borderColor: el.bordercolor,
            borderRadius: el.radius,
            zIndex: el.zindex,
            opacity: el.opacity,
            transform: `rotate(${el.rotation}deg)`,
            filter: `blur(${el.blur}px) brightness(${el.brightness}%) contrast(${el.contrast}%) grayscale(${el.grayscale}%) hue-rotate(${el.hue}deg) invert(${el.invert}%) saturate(${el.saturate}%) sepia(${el.sepia}%)`,
          }}
        ></img>
      ))}
    </>
  );
}

function Preview(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState();
  const widthRef = useRef(null);
  const [lWidth, setlWidth] = useState(0);
  const [imageLink, setImageLink] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const {updateID} = useData();
  const {TextData, ImageData, temWidth, temHeight, categoryData} = useData();
  
  useEffect(() => {
    setlWidth(document.getElementById("display").offsetWidth);
    const setWidth = () => {
      setlWidth(document.getElementById("display").offsetWidth);   
    }
    window.addEventListener('resize', setWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return() => {
      window.removeEventListener('resize', setWidth);
  }
  }, []);

  useEffect(() => {
    html2canvas(document.getElementById("view"), {useCORS: true, allowTaint: true}).then((canvas) => {
      const link = document.createElement("a");
      link.download = "image";
      link.href = canvas.toDataURL("image/jpeg");
      setImageLink(link);
      const imageURL = link.href.replace('/^data:image\/\w+;base,/','');
      setMainImage(ImageCropping(imageURL));
      function dataURLtoFile(dataURL) {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'fullImage.jpg', { type: mime });
      }

      setFullImage(dataURLtoFile(imageURL));
    });
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const uploadData = async() => {
    const option = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    }

    let NTdata = TextData.map((el) => ({x: el.x, y: el.y, content: el.content, size: el.size, font: el.font, bold: el.bold, italic: el.italic, underlined: el.underlined, align: el.align, textcolor: el.textcolor, textopa: el.textopa, backcolor: el.backcolor, backopa: el.backopa, zindex: el.zindex}));
    let NIdata = ImageData.map((el) => ({id: el.id, x: el.x, y: el.y, src: el.src, width: el.width, height: el.height, zindex: el.zindex, borderstyle: el.borderstyle, bordersize: el.bordersize, bordercolor: el.bordercolor, opacity: el.opacity, radius: el.radius, blur: el.blur, brightness : el.brightness, contrast: el.contrast, grayscale: el.grayscale, hue: el.hue, invert:el.invert, saturate: el.saturate, sepia: el.sepia}))
    let TIdata = [];
    NIdata.forEach(function(el) {
      let flag = true;
      for(var key in updateID) {
        if(el.id === key) {
          flag = false;
          break;
        }
      }
      if(flag) {
        TIdata.push(el);
      }
    })
    AWS.config.update({
      region: "",
      accessKeyId: "",
      secretAccessKey: "",
    })

    const upload = async(file, id) => {
      try {
        const compressedFile = await imageCompression(file, option);
        const s3 = new AWS.S3.ManagedUpload({
          params: {
            Bucket:  "templates-image-bucket",
            Key: `${uuid() + file.lastModified + file.name}`,
            Body: compressedFile, 
            ACL: 'public-read'
          }})
        const promise = await s3.promise();
        let data = NIdata.find((el) => el.id === id);
        data.src = promise.Location;
        TIdata.push(data);
      }
      catch(error) {
        console.log("upload error");
        console.log(error);
      }
    }

    for(var key in updateID) {
      upload(updateID[key], key);
    }

    const intSrc = [mainImage, fullImage];
    
    var intURL = [null, null];
    for (var i = 0; i < 2; i++) {
      try{
        const compressedFile = await imageCompression(intSrc[i], option);
        const s3 = new AWS.S3.ManagedUpload({
        params: {
          Bucket:  "templates-image-bucket",
          Key: `${uuid() + intSrc[i].lastModified + intSrc[i].name}`,
          Body: compressedFile, 
          ACL: 'public-read'
        }})
        const promise = await s3.promise();
        intURL[i] = promise.Location; 
      }
      catch(error) {
        console.log("upload error");
        console.log(error);
      }      
    }
    const TagData = tag ? tag.map((el) => ({"tagName": el})) : {};
    TIdata = TIdata.map((el) => ({x: el.x, y: el.y, src: el.src, width: el.width, height: el.height, zindex: el.zindex, borderstyle: el.borderstyle, bordersize: el.bordersize, bordercolor: el.bordercolor, opacity: el.opacity, radius: el.radius, blur: el.blur, brightness : el.brightness, contrast: el.contrast, grayscale: el.grayscale, hue: el.hue, invert:el.invert, saturate: el.saturate, sepia: el.sepia}))    
    console.log({"images": TIdata, "texts": NTdata, "tags": TagData, "category" : categoryData, "fullImageSrc" : intURL[1], "mainImageSrc": intURL[0], "templateName": title});
     /*
    axios 데이터 전송
    await axios.post("url", {"images": TIdata, "texts": NTdata, "tags": TagData, "category" : categoryData, "fullImageSrc" : intURL[1], "mainImageSrc": intURL[0], "templateName": title}).then(function(response) {
      console.log("데이터 전송 완료")
    }).catch(function(error)) {
      console.log("axios.post 오류 발생")
    }
    */
  }


  return (
    <MainPage>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" style={{ backgroundColor: "#1F1F1F" }}>
          <Toolbar variant="dense" style={{ marginLeft: "-10px" }}>
            <Link
              to="/edit"
            >
              <Button sx={{ color: "white" }}>편집하기</Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Link to="/select">
              <Button sx={{ color: "white" }} onClick={uploadData}>저장하기</Button>
            </Link> 
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div className="preview">
      <AddInfo
          setTitle={setTitle}
          setCategory={setCategory}
          setTag={setTag}
          imageLink = {imageLink}
        ></AddInfo>
        <DisplayMain ref={widthRef} id="display">
          <Template
            id="view"
            temWidth={temWidth}
            temHeight={temHeight}
            lWidth={lWidth}
            zoomRatio={1}
          >
            <Result></Result>
          </Template>
        </DisplayMain>
      </div>
    </MainPage>
  );
}

export default Preview;
