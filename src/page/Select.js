import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Info from "../components/SelectComponents/Info";
import "../styles/Select.css";
import axios from "axios";

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

  let searched = props.data[0];
  if (check === 1) {
    searched = props.data[0].filter((item) => item.name.includes(userInput));
  } else if (check === 2) {
    searched = props.data[0].filter((item) =>
      item.category.name.includes(userSelect)
    );
  }

  const lis = [];
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  for (let i = 0; i < props.data[1].length; i++) {
    let temp = props.data[1][i];
    lis.push(
      <input
        className="category"
        type="button"
        value={temp.name}
        key=""
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
        key={temp.id}
        className="templete"
        onClick={() => {
          getId(temp.id);
          setInfoOpen(!InfoOpen);
        }}
      >
        <img
          className="mainImage"
          src={temp.introduce.main_image_src}
          alt=""
        ></img>
        <div className="templeteInfo">
          <span className="templeteCate">{temp.category.name}</span>
          <span className="templeteTitle">{temp.name}</span>
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
  const temp = [
    [{ id: 0, name: "템플릿", introduce: { main_image_src: mainimage,}, category: { name: "카테고리" } }],
    [{name: "카테고리"},]];

  const [data, setData] = useState(temp);
  useEffect(() => {
    async function data() {
      const d = await axios.get("http://127.0.0.1:8000/templates");
      setData(d.data);
    }
    data();
  }, []);

  const sample = [];
  for (let i = 1; i < 10; i++) {
    sample.push({
      id: i,
      category: { name: "카테고리" + i },
      name: "템플릿Title" + i,
      introduce: { main_image_src: mainimage },
    });
  }


  return (
    <div className="templeteContainer">
      <Search data={data}></Search>
    </div>
  );
}

export default Select;
