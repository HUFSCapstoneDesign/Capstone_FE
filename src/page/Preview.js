import { React, useState, useRef, useEffect } from "react";
import "../styles/Preview.css";
import { Link, useLocation } from "react-router-dom";
import { MainPage } from "../styles/emotion";
import AWS from 'aws-sdk';
import uuid from 'react-uuid';
import axios from 'axios'
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
        {props.sample.map((item, idx) => (
          <option value={item.value ? item.value : ""} key={idx}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="name">| 태그</span>
      <AddTag setTag={props.setTag}></AddTag>
      <Button
        variant="contained"
        style={{ position: "absolute", left: "110px", top: "600px" }}
        onClick={ImageSave}
      >
        이미지
      </Button>
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

function Result({ Idata, Tdata }) {
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
      {Tdata.map(
        (el) =>
          el.content && (
            <pre
              key={el.id}
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
                paddingLeft: el.align === "left" ? "2px" : el.align === "right" ? "10px" : "10px",
                paddingRight: el.align === "left" ? "10px" : el.align === "right" ? "2px" : "10px",
                paddingTop: "3px",
                paddingBottom:"3px"
              }}
            >
              {el.content}
            </pre>
          )
      )}
      {Idata.map((el) => (
        <img
          key={el.id}
          src={el.src}
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
    html2canvas(document.getElementById("view")).then((canvas) => {
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

  const sampleCategory = [
    { id: 1, name: "패션" },
    { id: 2, name: "test2" },
  ];
  const location = useLocation();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const uploadData = async() => {
    const Tdata = location.state.Tdata;
    const Idata = location.state.Idata;
    console.log(location.state.updatedID);

    AWS.config.update({
      region: "",
      accessKeyId: "",
      secretAccessKey: "",
    })

    const upload = async(file) => {
      const s3 = new new AWS.S3.ManagedUpload({
      params: {
        Bucket: "bucket",
        Key: uuid() + file.lastModified,
        Body: file, 
        ACL: 'public-read'
      }})
      try {
        const promise = await s3.promise();
        return promise.Location;
        //Idata에 id해당되는 부분 src쪽 내용 수정
      }
      catch(error) {
        console.log("upload error");
        return null;
      }
    }
    // aws 사진 전송
    /*
    updatedID에 들어있는 value 값 aws에 업로드
    해당 key에 해당되는 Idata의 src 부분 url 교체
    const updatedID = location.state.updatedID
    for(var key in updatedID) {
      const URL = upload(updatedID[key]);
      const Ndata = Idata.map((el) => el.id === key ? {...el, src: URL} : el);
      URL && Idata = Ndata;
    }

    const MainURL = upload(mainImage);
    MainURL && setMainImage(MainURL);

    const FullURL = upload(fullImage);
    FullURL && setFullImage(FullURL);
    */
    
    const Tkey = ["flag", "width", "height", "id"];
    const Ikey = ["id"];
    Tdata.map((el) => (Tkey.map((ell) => delete el[ell])));
    Idata.map((el) => (Ikey.map((ell) => delete el[ell])));
    const TagData = tag ? tag.map((el) => ({"tagName": el})) : {};
    console.log({"images": Idata, "texts": Tdata, "tags": TagData, "categoryId" : category, "fullImageSrc" : fullImage, "mainImageSrc": mainImage, "templateName": title});
    /*
    axios 데이터 전송
    await axios.post("url", {"images": Idata, "texts": Tdata, "tags": TagData, "categoryId" : category, "fullImageSrc" : fullImage, "mainImageSrc": mainImage, "templateName": title}).then(function(response) {
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
              state={{
                Tdata: location.state.Tdata,
                Idata: location.state.Idata,
                temHeight: location.state.temHeight,
                temWidth: location.state.temWidth,
                pageFlag: false,
                updatedID: location.state.updatedID,
              }}
            >
              <Button sx={{ color: "white" }}>편집하기</Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Button sx={{ color: "white" }} onClick={uploadData}>저장하기</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div className="preview">
        <AddInfo
          sample={sampleCategory}
          setTitle={setTitle}
          setCategory={setCategory}
          setTag={setTag}
          imageLink = {imageLink}
        ></AddInfo>
        <DisplayMain ref={widthRef} id="display">
          <Template
            id="view"
            temWidth={location.state.temWidth}
            temHeight={location.state.temHeight}
            lWidth={lWidth}
            zoomRatio={1}
          >
            <Result
              Tdata={location.state.Tdata}
              Idata={location.state.Idata}
            ></Result>
          </Template>
        </DisplayMain>
      </div>
    </MainPage>
  );
}

export default Preview;
