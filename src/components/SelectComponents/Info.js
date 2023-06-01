import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Info.css";
import axios from "axios";

//test img
import timage from "../../images/testing.png";

function TempleteTag(props) {
  const lis = [];
  for (let i = 0; i < props.tagList.length; i++) {
    let temp = props.tagList[i];
    lis.push(<li className="tag" key = {i}># {temp.tag_name}</li>);
  }
  return <ol className="tagList">{lis}</ol>;
}

function Info(props) {
  const navigate = useNavigate();
  const sample = [
    { category: { name: '' }, id: 1, introduce: { full_image_src: timage }, name: "템플릿 이름",},
    [{tag_name: "템플릿 태그"},]];
  const [infomation, setInfomation] = useState(sample);

  useEffect(() => {
    async function data(id) {  
      const d = await axios.get(`http://127.0.0.1:8000/templates/${id}/explain`);
      setInfomation(d.data);
    }
    data(props.id);
  }, []);

  const onClickButton = async (id) => {
    const Ed = await axios.get(`http://127.0.0.1:8000/templates/${id}/edit`);
    if(Ed.data) {
      const Tdata = Ed.data[2].map((el, i) => ({id: `${i + 1}`, x: el.x, y: el.y, content: el.content, size: el.size, font: String(el.font), bold: el.bold, italic: el.italic, underlined: el.underlined, align: el.align, textcolor: el.textcolor, textopa: el.textopa, backcolor: el.backcolor, backopa: el.backopa, zindex: el.zindex}))
      const Idata = Ed.data[0].map((el, i) => ({id: `${i + 1}`, x: el.x, y: el.y, src: el.src, width: el.width, height: el.height, zindex: el.zindex, borderstyle: el.borderstyle, bordersize: el.bordersize, bordercolor: el.bordercolor, opacity: el.opacity, radius: el.radius, blur: el.blur, brightness : el.brightness, contrast: el.contrast, grayscale: el.grayscale, hue: el.hue, invert:el.invert, saturate: el.saturate, sepia: el.sepia}))
      navigate('/edit', {state: {Tdata: Tdata, Idata: Idata, temWidth: Ed.data[1].width, temHeight: Ed.data[1].height, pageFlag: true, updatedID: {}}})
    }
  };

  function closeInfo() {
    props.closeInfo();
  }

  const id = 0;
  return (
    <div className="Info">
      <div className="InfoBody">
        <button id="InfoCloseBtn" onClick={closeInfo}>
          ✖
        </button>

        <div className="introduce">
          <div className="imgScrollBox">
            <img src={infomation[0].introduce.full_image_src} alt=""></img>
          </div>
          <div className="description">
            <div className="templeteName">{infomation[0].name}</div>
            <TempleteTag tagList={infomation[1]}></TempleteTag>
            <button id="startEditBtn" onClick={() => onClickButton(props.id)}>편집하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
