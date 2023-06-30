import {create} from 'zustand'

export const useData = create(set => ({
    TextData:[],
    ImageData: [],
    temWidth: 0,
    temHeight: 0,
    updateID: {},
    categoryData: null,
    InitialText: (newText) => set({TextData: newText}),
    InitialImage: (newImage) => set({ImageData: newImage}),
    UpdateText: (id, object) => set(state => ({TextData: state.TextData.map((el) => el.id === id ? {...el, ...object} : el)})),
    UpdateImage: (id, object) => set(state => ({ImageData: state.ImageData.map((el) => el.id === id ? {...el, ...object} : el)})),
    AddText: (id, x, y, width, height, zindex) => set(state => ({TextData: [...state.TextData, {id: id, x: x, y: y, content: "", size: 20, font: "'Nanum Pen Script', cursive", bold: false, italic: false, underlined: false, align: "left", textcolor: "000000000", textopa: 1, backcolor: "255255255", backopa: 0, zindex: zindex, width: width, height: height, flag: false}]})),
    AddImage: (id, x, y, width, height, src, zindex) => set(state => ({ImageData: [{id: id, x: x, y: y, width: width, height: height, src: src, zindex: zindex, borderstyle:"none", bordersize: 0.5, bordercolor: "#000000", radius: 0, opacity: 1, blur: 0 , brightness : 100, contrast: 100, grayscale: 0, hue: 0, invert:0, saturate: 100, sepia: 0}, ...state.ImageData]})),
    DeleteText: (id) => set(state => ({TextData: state.TextData.filter((el) => el.id !== id)})),
    DeleteImage: (id) => set(state => ({ImageData: state.ImageData.filter((el) => el.id !== id)})),
    setTemSize: (width, height) => set({temWidth: width, temHeight: height}),
    AddUpdateID: (id, src) => set(state => ({updateID: {...state.updateID, [id]: src}})),
    InitialCategoryData: (data) => set({categoryData: data})
}))