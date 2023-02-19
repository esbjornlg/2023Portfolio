import React, { useState, useRef, useEffect } from 'react'
import '../../index.scss'
import HTMLElem from './HTMLElem'
import langPack from '../../lang.jsx'
import styling from '../../logic/styling'

const HTMLBG = ({Language, navTrigger, scrollEvent, Links}) => {
    const [pageIndex, setPageIndex] = useState();
    const bgCompSwitch = useRef();
    const Lang = new langPack();

    const getElemTree = (arr, element) => {
        arr.push({nodeInfo: {nodeName: element.nodeName.toLowerCase(), className: element.className, textContent: element.textContent}, children: []});
        for (let i= 0; i < element.children.length; i++)
            arr[arr.length - 1]["children"].push(getElemTree(arr[arr.length-1]["children"], element.children[i]));
    }

    const makeHTMLElemTree = (elemObj, index) => {
        return (<div key={index} className={"bgHTMLContent " + (elemObj.children.length ? "" : "flexRow")} style={{marginLeft: "40px"}}>
                    <HTMLElem CompName={elemObj["nodeInfo"]["nodeName"]} ClassName={elemObj["nodeInfo"]["className"]} CompParams={[]} TextContent={elemObj["nodeInfo"]["textContent"]}/>
                        {elemObj.children.map((e, i) => { if (e) return makeHTMLElemTree(e, i)})}
                    <h3 className="bgHTMLOff">
                    {"</"}<span style={{color: "var(--htmlComp)"}}>{elemObj["nodeInfo"]["nodeName"]}</span>{">"}</h3>
                </div>)
    }

    const [BGHTML, setBGHTML] = useState([]);
    const [headerHTML, setHeaderHTML] = useState([]);

    const updateBG = () => {
        const linkIndex = styling.getPageIndex();
        setPageIndex(linkIndex);
        let bgHTMLArr = [];
        getElemTree(bgHTMLArr, document.getElementById(Links[linkIndex]));
        setBGHTML(makeHTMLElemTree(bgHTMLArr[0], 0));
        if (headerHTML.length == 0) {
            let HeaderHTMLArr = [];
            getElemTree(HeaderHTMLArr, document.getElementById("mainPageHeader"));
            setHeaderHTML(makeHTMLElemTree(HeaderHTMLArr[0], 0));
        }
        for (let i = 0; i < bgCompSwitch.current.children.length; i++) {
            if (bgCompSwitch.current.children[i].getAttribute("name") && Links[linkIndex] == bgCompSwitch.current.children[i].getAttribute("name").toLowerCase()) {
                bgCompSwitch.current.children[i].classList.add("bgHTMLOn");
                bgCompSwitch.current.children[i].classList.remove("bgHTMLOff");
                continue;
            }
            bgCompSwitch.current.children[i].classList.remove("bgHTMLOn");
            bgCompSwitch.current.children[i].classList.add("bgHTMLOff");
        }
    }

    useEffect(() => {
        if (pageIndex != styling.getPageIndex())
            updateBG();
    }, [navTrigger, scrollEvent])

    useEffect(() => {
        updateBG();
    }, [Language])

    return (
        <div id="HTMLBG" className="HTMLBG">
            {(window.innerWidth > 1170) ? headerHTML : <></>}
            <div ref={bgCompSwitch}>
                <HTMLElem CompName="About" CompParams={["Language", "navTrigger"]} isClosing={true}/>
                {pageIndex == 0 ? BGHTML : <></>}
                <HTMLElem CompName="Projects" CompParams={["Language", "navTrigger"]} isClosing={true}/>
                {pageIndex == 1 ? BGHTML : <></>}
                <HTMLElem CompName="Experience" CompParams={["Language", "navTrigger"]} isClosing={true}/>
                {pageIndex == 2 ? BGHTML : <></>}
                <HTMLElem CompName="Contact" CompParams={["Language", "navTrigger"]} isClosing={true}/>
                {pageIndex == 3 ? BGHTML : <></>}
            </div>
        </div>
    )
}

export default HTMLBG