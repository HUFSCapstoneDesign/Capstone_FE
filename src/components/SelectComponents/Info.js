import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/Info.css";
import axios from "axios";

//test img
import timage from "../../images/testing.png";

function TempleteTag(props) {
  const lis = [];
  for (let i = 0; i < props.sample.length; i++) {
    let temp = props.sample[i];
    lis.push(<li className="tag" key = {i}># {temp.tagName}</li>);
  }
  return <ol className="tagList">{lis}</ol>;
}

function Info(props) {
  // props.id = 팝업창에 띄울 템플릿의 id
  // id에 해당하는 fullImageSrc, tag, templateName 불러오기

  //더미데이터

  /* 
  [
    {
      category: {name: '템플릿 카테고리 01'},
      id: 1,
      introduce: {full_image_src: "full_image_src", main_image_src: "main_image_src"}
      name: "템플릿 01"
    },
    [
      {tag_name: "템플릿 태그 01"},
      {tag_name: "템플릿 태그 02"},
      {tag_name: "템플릿 태그 03"}
    ]
  ]
  
  */
  useEffect(() => {
    const id = 1; //일단 1번 아이디 설정 => link에 id 전달해야함
    async function data(id) {
      const d = await axios.get(`http://172.30.1.50:8000/templates/${id}/explain`);
      console.log(d.data);
    }
    data(1);
  }, [])
  const taglist = [
    { tagName: "This" },
    { tagName: "is" },
    { tagName: "sample" },
    { tagName: "tag" },
    { tagName: "sampletag" },
  ];
  const templateName = "템플릿 이름";
  const fullImageSrc = timage;

  const onClickButton = async(id) => {
    const Ed = await axios.get(`http://172.30.1.50:8000/templates/${id}/edit`);
    console.log(Ed.data);
  }

  function closeInfo() {
    props.closeInfo();
  }

  /*
    Tdata = data.map((el, index) => ({id: `${index + 1}`, x: el.x, y: el.y, content: el.content, size: el.size, font: el.font, bold: el.bold, italic: el.italic, underlined: el.underlined, align: el.align, textcolor: el.text_color, textopa: el.textopa, backcolor: el.back_color, backopa: el.backopa, zindex: el.zindex}))
    Idata = data.map((el, index) => ({id: `${index + 1}`, x: el.x, y: el.y, src: el.src, width: el.width, height: el.height, zindex: el.zindex, borderstyle: el.border_style, bordersize: el.border_size, bordercolor: el.border_color, opacity: el.opacity, radius: el.radius, blur: el.blur, brightness : el.brightness, contrast: el.contrast, grayscale: el.gray_scale, hue: el.hue, invert:el.invert, saturate: el.saturate, sepia: el.sepia}))
  */
 
  const Tdata = [
    {id: "1", x: 50, y:150, content: "text1\ntext1text1", size: 20, font: "'Nanum Pen Script', cursive", bold: true, italic: false, underlined: false, align: "left", textcolor: "161250079", textopa: 0.3, backcolor: "255253085", backopa: 0.7, zindex: 4, },
    {id: "2", x: 150, y:50, content: "text2\ntestestest\ntestest", size: 20, font: "'Single Day', cursive", bold: false, italic: false, underlined: true, align: "center", textcolor: "093110250", textopa: 0.6, backcolor:"000035245", backopa: 0.5, zindex: 5,},
    {id: "3", x: 300, y:400, content: "text3", size: 15, font: "'Hi Melody', cursive", bold: true, italic: true, underlined:false, align: "right", textcolor: "116027124", textopa: 1, backcolor:"234054128", backopa:1, zindex: 6, }
  ];

  const Idata = [
    {id: "1", x: 200, y: 150, src: "https://templates-image-bucket.s3.ap-northeast-2.amazonaws.com/sample1.jpg", width: 200, height: 200, zindex: 1, borderstyle: "none", bordersize: 0, bordercolor: "#000000", opacity: 1, radius: 10, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
    {id: "2", x: 50, y: 300, src: "https://templates-image-bucket.s3.ap-northeast-2.amazonaws.com/sample2.jpg", width: 150, height: 250, zindex: 2, borderstyle: "dotted", bordersize: 1, bordercolor: "#000000", opacity: 0.7, radius: 0, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
    {id: "3", x: 400, y: 400, src: "https://templates-image-bucket.s3.ap-northeast-2.amazonaws.com/sample3.jpg", width: 250, height: 150, zindex: 3, borderstyle:"dashed", bordersize: 0.5, bordercolor: "#00ff00", opacity: 0.5, radius: 30, blur: 0 , brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0}
  ];

  const temWidth = 700;
  const temHeight = 3000;

  const id = 0;
  return (
    <div className="Info">
      <div className="InfoBody">
        <button id="InfoCloseBtn" onClick={closeInfo}>
          ✖
        </button>

        <div className="introduce">
          <div className="imgScrollBox">
            <img src={fullImageSrc} alt=""></img>
          </div>
          <div className="description">
            <div className="templeteName">{templateName}</div>
            <TempleteTag sample={taglist}></TempleteTag>
            <Link to="/edit"/*+[templete id] */ state={{Tdata: Tdata, Idata: Idata, id: id, temWidth: temWidth, temHeight: temHeight, pageFlag: true, updatedID: {}}}>
              <button id="startEditBtn" onClick={() => onClickButton(1)}>편집하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
