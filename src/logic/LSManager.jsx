const LSManager = {
    getVar: function getVar(varName) {
        if (varName in localStorage)
            return localStorage.getItem(varName)
        return;
    },
    
    setVar: function setVar(varName, value) {
        localStorage.setItem(varName, value);
        return value;
    },

    getVarElseSet: function getVarElseSet(varName, Else) {
        if (this.getVar(varName) != null)
            return this.getVar(varName);
        localStorage.setItem(varName, Else);
        return Else;
    }
}

export default LSManager