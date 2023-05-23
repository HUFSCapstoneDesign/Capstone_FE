import React, { Fragment, useState, useRef } from "react";
import "../styles/Preview.css";

function Header() {
  return <div className="header"></div>;
}

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
        {props.sample.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
      <span className="name">| 태그</span>
      <AddTag setTag={props.setTag}></AddTag>
    </div>
  );
}

function AddTag(props) {
  const [Tagitem, setTagitem] = useState();
  const [TagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...TagList];
    updatedTagList.push(Tagitem);
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
        value={Tagitem}
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
  return <div className="result"></div>;
}

function Preview(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState();

  const sampleCategory = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
  ];

  return (
    <Fragment>
      <Header> </Header>
      <div className="preview">
        <AddInfo
          sample={sampleCategory}
          setTitle={setTitle}
          setCategory={setCategory}
          setTag={setTag}
        ></AddInfo>
        <Result></Result>
      </div>
    </Fragment>
  );
}

export default Preview;
