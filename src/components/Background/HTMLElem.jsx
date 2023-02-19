import '../../index.scss'

const HTMLElem = ({CompName, ClassName, CompParams, TextContent, isClosing}) => {
    return (
        <>
            <h3 className="bgHTMLOff" name={CompName}>{"<"}<span style={{color: "var(--htmlComp)"}}>{CompName}</span>
                {ClassName && typeof(ClassName) == "string" ? (<span> className=<span style={{color: "var(--htmlString)"}}>{`"${ClassName}"`}</span></span>) : ""}
                 {CompParams.map((p, index) => {return (<span key={index}><>{" " + p + "="}</><span>{"{"}</span><span style={{color: "var(--htmlParam)"}}>{p}</span>{"} "}<span></span></span>)})}{isClosing ? "/>" : ">"}{TextContent ? TextContent.substring(0, 29).substring(0, TextContent.substring(0, 29).length - 1) + "..." : ""}</h3>
        </>
    )
}

export default HTMLElem