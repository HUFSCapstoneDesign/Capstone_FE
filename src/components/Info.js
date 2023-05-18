import React from "react";
import "../styles/Info.css";

//더미 fullimage
import fullimage from "../images/testing.png";

function TempleteTag(props) {
  const lis = [];
  for (let i = 0; i < props.sample.length; i++) {
    let temp = props.sample[i];
    lis.push(<li class="tag"># {temp.tag}</li>);
  }
  return <ol class="tagList">{lis}</ol>;
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

  return (
    <div className="Info">
      <div className="InfoBody">
        <button id="InfoCloseBtn" onClick={closeInfo}>
          ✖
        </button>

        <div class="introduce">
          <div class="imgScrollBox">
            <img src={fullimage} alt=""></img>
          </div>
          <div class="description">
            <div class="templeteName">{title}</div>
            <TempleteTag sample={taglist}></TempleteTag>
            <button id="startEditBtn">편집하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
