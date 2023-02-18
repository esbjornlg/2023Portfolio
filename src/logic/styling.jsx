const helper = {
    getColorType: function getColorType(str) {
        if (str.substring(0, 1) == "#")
            return "hex";
        if (str.substring(0, 4) == "rgba")
            return "rgba";
        if (str.substring(0, 3) == "rgb")
            return "rgb";
        return "other";
    },

    getRGBArr: function getRGBArr(str) {
        return str.substring(4, str.length - 1).replace(/[() ]/gi, "").split(",");
    },

    parseRGB: function parseRGB(rgbStr) {
        let rgb = this.getRGBArr(rgbStr);
        return {r: rgb[0], g: rgb[1], b: rgb[2]};
    },

    parseRGBA: function parseRGBA(rgbaStr) {
        let rgb = this.getRGBArr(rgbaStr);
        return {r: rgb[0], g: rgb[1], b: rgb[2], a: rgb[3]};
    },

    parseHex: function parseHex(hexStr) {
        console.log("Hex: " + hexStr);
        let r = parseInt(hexStr.substring(1, 3), 16);
        let g = parseInt(hexStr.substring(3, 5), 16);
        let b = parseInt(hexStr.substring(5, 7), 16);
        return {r: r, g: g, b: b};
    },

    getColorArr: function parseColor(str) {
        let colorType = this.getColorType(str);
        let colorArr;
        switch (colorType) {
            case "hex":
                colorArr = this.parseHex(str);
                break;
            case "rgb":
                colorArr = this.parseRGB(str);
                break;
            case "rgba":
                colorArr = this.parseRGBA(str);
        }
        console.log(colorType);
        return colorArr;
    },

    getElemScrollCompletion: function getElemScrollCompletion(elem, scrollElem) {
        if (!elem)
          return;
        // return 1;
        const ScrollTop = scrollElem.getBoundingClientRect().top;
        const ScrollBottom = scrollElem.getBoundingClientRect().bottom;
        const ScrollMid = ScrollBottom - (ScrollBottom - ScrollTop)/2
        const elemTop = elem.getBoundingClientRect().top;
        const elemBottom = elem.getBoundingClientRect().bottom;
        const elemMid = elemBottom - (elemBottom - elemTop)/2
        return (1 - Math.abs(elemMid - ScrollMid)/(Math.abs((ScrollBottom - ScrollTop))));
      }
}

export default helper