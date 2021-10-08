// traductor de SmallLang a LaTeX by NatanVek
        //este programa asume que las productorias y las sumatorias son implementadas 
        //de una manera particular 
        //ej: ⅀(i = 0; |lista| - 1) 

// en proceso

let reemplazos : {[reemplazar : string] : string } = {
    "{": "\\{",
    "}": "\\}",
    "ℤ": "$\\ent$",
    "≡": "$\\equiv$",
    "ℝ": "$\\mathbb{R}$",
    "ℜ": "$\\mathbb{R}$",
    "⅀": "$\\sum_",
    "∑": "$\\sum_",
    "ℿ": "$\\prod_",
    "∏": "$\\prod_",
    "∨L": "$\\oLuego$",
    "∧L": "$\\yLuego$",
    "∧": "$\\wedge$",
    "&&": "$\\wedge$",
    "∨": "$\\vee$",
    "||": "$\\vee$",
    "≥": "$\\geq$",
    "≤": "$\\leq$",
    "<": "$<$",
    "∈": "$\\in$",
    "≠": "$\\neq$",
    "⟶L": "$\\implicaLuego$",
    "⟶": " $\\implica$ ",
    "∀": "$\\forall$",
    "⟨": "$\\langle$",
    "⟩": "$\\rangle$",
    "|": "$\\mid$",
    'ₐ': "$_a$",
    'ₑ': "$_e$",
    'ᵢ': "$_i$",
    'ₒ': "$_o$",
    'ₕ': "$_h$",
    'ₗ': "$_l$",
    'ₘ': "$_m$",
    'ₙ': "$_n$",
    'ⱼ': "$_j$",
    'ₖ': "$_k$",
    'ᵣ': "$_r$",
    'ₛ': "$_s$",
    'ₜ': "$_t$",
    'ᵥ': "$_v$",
    'ₓ': "$_x$",
    'ᵤ': "$_u$",
    '₀': "$_0$",
    '₁': "$_1$",
    '₂': "$_2$",
    '₃': "$_3$",
    '₄': "$_4$",
    '₅': "$_5$",
    '₆': "$_6$",
    '₇': "$_7$",
    '₈': "$_8$",
    '₉': "$_9$",
    '⁰': "$^0$",
    '¹': "$^1$",
    '²': "$^2$",
    '³': "$^3$",
    '⁴': "$^4$",
    '⁵': "$^5$",
    '⁶': "$^6$",
    '⁷': "$^7$",
    '⁸': "$^8$",
    '⁹': "$^9$",
    '∃': "$\\exists$",
    '∄': "$\\nexists$",
    '    ': "\\indent ",
    '\t': "\\indent ",
    '\n': "\n\\\\"
};

export function convertToLatex(str : string) : string {
    for (let key in reemplazos) {
        let reg = new RegExp(cleanStr(key), 'g');
        str = str.replace(reg, reemplazos[key]); 
    }
    str = boldAndIndent("aux", str);
    str = boldAndIndent("pred", str);
    str = boldAndIndent("proc", str);
    str = fixSum("sum", str);
    str = fixSum("prod", str);
    return str;
}

//-----------------------------------------
//-----------------------------------------

function boldAndIndent(command : string, str : string) : string {
    for (let i = 0; i < str.length; i++) {
        if (found(command, str, i)) {
            let name = str.substring(i, str.indexOf("(", i));
            str = replace(str, name, "\\noindent \\textbf{" + name + "}", i);
            i += update_i(name, "\\noindent \\textbf{" + name + "}");
        }
    }
    return str;
}

function fixSum(command : string, str : string) {
    for (let i = 0; i < str.length; i++) {
        if (found(command, str, i)) {
            i = str.indexOf("(", i);
            let final = nextPar("()", str, i);
            str = replaceAll(str, "$"," ", i, final);
            str = replace(str, "(", "{", i);
            str = replace(str, ";", "}^{", i);
            str = replace(str, ")", "}$", final);
        }
    }
    return str;
}


function nextPar(type : string, str : string, pos : number) {
    let chars = type;
    let actualPos = pos;
    let contador = 1;
    while (contador) {
        let c = str[++actualPos];
        if (c === chars[0]) {
            contador++;
        } else if (c === chars[1]) {
            contador--;
        }
        if (actualPos >= str.length) {
            console.error("no cerraste un parentesis o corchete");
            return; // stop(); // fede : ts no reconoce esta funcion
        }
    }
    return actualPos;
}
function replaceAll(str : string, p1 : string, p2 : string, from = 0, to = str.length) {
    let tail = str.substring(from, to);
    tail = replaceAll(tail, p1, p2); 
    return str.substring(0, from) + tail + str.substr(to, str.length);
}

function update_i(p1 : string, p2 : string) {
    return p2.length - p1.length;
}

function found(keyword : string, str : string, ubicacion : number) {
    for (let i = 0; i < keyword.length; i++) {
        if (str[ubicacion + i] !== keyword[i]) 
            return false;
    }
    return true;
}

function replace(str : string, p1 : string, p2 : string, from = 0) {
    let tail = str.substring(from, str.length);
    tail = tail.replace(p1, p2);
    return str.substring(0, from) + tail;
}

function cleanStr(str : string)
{
    return str.replace(/[#-}]/g, '\\$&');
}
// function addStr(str, index, stringToAdd) {
//     return str.substring(0, index) + stringToAdd + str.substr(index)
// }