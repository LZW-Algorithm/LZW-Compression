function lzwCompressWithVisualFeedback(inputData) {
    if (!inputData) return [];

    let output = [];
    let [dict, , dictLen] = _initializeDictionary();
    let currentString = "";
    let visualFeedback = document.getElementById("visual-feedback");
    visualFeedback.innerText = "";

    for (let byte of _stringToUtf8(inputData)) {
        let char = String.fromCharCode(byte);
        let combinedString = currentString + char;

        if (dict[combinedString] !== undefined) {
            currentString = combinedString;
        } else {
            if (currentString !== "") output.push(dict[currentString]);

            visualFeedback.innerText += `Adding to dictionary: "${combinedString}" with code ${dictLen}\n`;

            dict[combinedString] = dictLen++;
            currentString = char;

            if (dictLen >= DICT_SIZE) {
                [dict, , dictLen] = _initializeDictionary();
                visualFeedback.innerText += `Dictionary size limit reached. Reinitializing dictionary.\n`;
            }
        }
    }

    if (currentString !== "") output.push(dict[currentString]);
    return output;
}

// LZW 해제 압축 함수
function lzwDecompress(encodingArray) {
    if (!encodingArray || encodingArray.length === 0) return "";

    let [ , reverseDict, dictLen] = _initializeDictionary();
    let prevCode = encodingArray[0];
    let currentString = reverseDict[prevCode];
    let output = [currentString];

    for (let i = 1; i < encodingArray.length; i++) {
        let code = encodingArray[i];
        let newString;

        if (code < dictLen) {
            newString = reverseDict[code];
        } else if (code === dictLen) {
            newString = currentString + currentString[0];
        } else {
            throw new Error("Invalid LZW decompression code: " + code);
        }

        output.push(newString);
        reverseDict[dictLen++] = currentString + newString[0];
        currentString = newString;

        if (dictLen >= DICT_SIZE) [ , reverseDict, dictLen] = _initializeDictionary();
    }

    return output.join("");
}

function _initializeDictionary() {
    let dictionary = {};
    let reverseDictionary = [];
    for (let i = 0; i < 256; i++) {
        let char = String.fromCharCode(i);
        dictionary[char] = i;
        reverseDictionary[i] = char;
    }
    return [dictionary, reverseDictionary, 256];
}

const _stringToUtf8 = (str) => Array.from(new TextEncoder().encode(str));
const _utf8ToString = (utf8Array) => new TextDecoder().decode(new Uint8Array(utf8Array));

const DICT_SIZE = 512;
