import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/Info.css";

//더미 fullimage
import fullimage from "../../images/testing.png";

function TempleteTag(props) {
  const lis = [];
  for (let i = 0; i < props.sample.length; i++) {
    let temp = props.sample[i];
    lis.push(<li className="tag" key = {i}># {temp.tag}</li>);
  }
  return <ol className="tagList">{lis}</ol>;
}

function Info(props) {
  // props.id = 팝업창에 띄울 템플릿의 id
  // id에 해당하는 fullimage, category, title 불러오기

  //더미데이터
  const taglist = [
    { tag: "This" },
    { tag: "is" },
    { tag: "sample" },
    { tag: "tag" },
    { tag: "sampletag" },
  ];
  const title = "템플릿 이름";

  function closeInfo() {
    props.closeInfo();
  }

  const Tdata = [
    {id: "1", x: 50, y:150, content: "text1\ntext1text1", size: 20, font: "'Nanum Pen Script', cursive", bold: true, italic: false, underlined: false, align: "left", textcolor: "161250079", textopa: 0.3, backcolor: "255253085", backopa: 0.7, zindex: 4, },
    {id: "2", x: 150, y:50, content: "text2\ntestestest\ntestest", size: 20, font: "'Single Day', cursive", bold: false, italic: false, underlined: true, align: "center", textcolor: "093110250", textopa: 0.6, backcolor:"000035245", backopa: 0.5, zindex: 5,},
    {id: "3", x: 300, y:400, content: "text3", size: 15, font: "'Hi Melody', cursive", bold: true, italic: true, underlined:false, align: "right", textcolor: "116027124", textopa: 1, backcolor:"234054128", backopa:1, zindex: 6, }
  ];

  const Idata = [
    {id: "1", x: 200, y: 150, src: "Test1.jpg", width: 200, height: 200, zindex: 1, borderstyle: "none", bordersize: 0, bordercolor: "#000000", opacity: 1, radius: 10, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
    {id: "2", x: 50, y: 300, src: "Test2.jpg", width: 150, height: 250, zindex: 2, borderstyle: "dotted", bordersize: 1, bordercolor: "#000000", opacity: 0.7, radius: 0, blur: 0, brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0},
    {id: "3", x: 400, y: 400, src: "Test3.jpg", width: 250, height: 150, zindex: 3, borderstyle:"dashed", bordersize: 0.5, bordercolor: "#00ff00", opacity: 0.5, radius: 30, blur: 0 , brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0}
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
            <img src={fullimage} alt=""></img>
          </div>
          <div className="description">
            <div className="templeteName">{title}</div>
            <TempleteTag sample={taglist}></TempleteTag>
            <Link to="/edit"/*+[templete id] */ state={{Tdata: Tdata, Idata: Idata, id: id, temWidth: temWidth, temHeight: temHeight, pageFlag: true, updatedID: {}}}>
              <button id="startEditBtn">편집하기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
