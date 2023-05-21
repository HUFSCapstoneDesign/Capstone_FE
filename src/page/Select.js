import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Info from "../components/SelectComponents/Info";
import "../styles/Select.css";

//더미mainimage
import mainimage from "../images/main.jpg";

//검색창
function Search(props) {
  const [check, setcheck] = useState();

  const [userSelect, setUserSelect] = useState("");
  const getCate = (e) => {
    setUserSelect(e.target.value);
    setcheck(2);
  };

  const [userInput, setUserInput] = useState("");
  const getValue = (e) => {
    setUserInput(e.target.value);
    setcheck(1);
  };

  let searched = props.data;
  if (check === 1) {
    searched = props.data.filter((item) => item.title.includes(userInput));
  } else if (check === 2) {
    searched = props.data.filter((item) => item.category.includes(userSelect));
  }

  const lis = [];
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  for (let i = 0; i < props.data.length; i++) {
    let temp = props.data[i];
    lis.push(
      <input
        className="category"
        type="button"
        value={temp.category}
        key={temp.id}
        onClick={getCate}
      ></input>
    );
  }
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="템플릿 이름 입력"
          onChange={getValue}
        ></input>
      </div>
      <Slider {...settings}>{lis}</Slider>
      <TempleteList data={searched}></TempleteList>
    </div>
  );
}

//템플릿 나열
function TempleteList(props) {
  const [InfoOpen, setInfoOpen] = useState(false);

  const lis = [];
  for (let i = 0; i < props.data.length; i++) {
    let temp = props.data[i];
    lis.push(
      <li
        className="templete"
        onClick={() => {
          getId(temp.id);
          setInfoOpen(!InfoOpen);
        }}
      >
        <img className="mainImage" src={temp.mainimage} alt=""></img>
        <div className="templeteInfo">
          <span className="templeteCate">{temp.category}</span>
          <span className="templeteTitle">{temp.title}</span>
        </div>
      </li>
    );
  }

  const [selectid, setselectid] = useState();
  const getId = (e) => {
    setselectid(e);
  };

  //탬플릿 클릭하면 Info(팝업창) 생성
  return (
    
    <section>
      <ol className="templete_area">{lis}</ol>
      {InfoOpen && (
        <Info id={selectid} closeInfo={() => setInfoOpen(!InfoOpen)}></Info>
      )}
    </section>
  );
}

function Select() {
  //더미데이터
  const data = [];
  for (let i = 1; i < 10; i++) {
    data.push({
      id: i,
      title: "템플릿Title" + i,
      category: "카테고리" + i,
      mainimage: mainimage,
    });
  }
  //템플릿의 id, title, category, mainimage 필요

  return (
    <div className="templeteContainer">
      <Search data={data}></Search>
    </div>
  );
}

export default Select;
