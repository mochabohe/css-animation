const fs = require('fs');

const dataJsPath = 'c:\\Users\\25198\\Desktop\\DC-Project\\css-animation\\src\\data.js';
let dataJsStr = fs.readFileSync(dataJsPath, 'utf-8');

const htmlPath = 'c:\\Users\\25198\\Desktop\\DC-Project\\css-animation\\index.html';
let htmlStr = fs.readFileSync(htmlPath, 'utf-8');

// data.js swap
const p1 = dataJsStr.indexOf('  // ========== 加载反馈类 ==========');
const p2 = dataJsStr.indexOf('  // ========== 交互按钮类 ==========');
const p3 = dataJsStr.indexOf('  // ========== 文字特效类 ==========');

if (p1 !== -1 && p2 !== -1 && p3 !== -1) {
    const pre = dataJsStr.substring(0, p1);
    const loadingBlock = dataJsStr.substring(p1, p2);
    const interactiveBlock = dataJsStr.substring(p2, p3);
    const post = dataJsStr.substring(p3);
    
    fs.writeFileSync(dataJsPath, pre + interactiveBlock + loadingBlock + post, 'utf-8');
    console.log('Swapped data.js successfully');
} else {
    console.log('p1, p2, p3 not found in data.js', p1, p2, p3);
}

// index.html swap
const h1 = htmlStr.indexOf('          <!-- 加载反馈类 -->');
const h2 = htmlStr.indexOf('          <!-- 交互按钮类 -->');
const h3 = htmlStr.indexOf('          <!-- 文字特效类 -->');

if (h1 !== -1 && h2 !== -1 && h3 !== -1) {
    const preH = htmlStr.substring(0, h1);
    const loadingBlockH = htmlStr.substring(h1, h2);
    const interactiveBlockH = htmlStr.substring(h2, h3);
    const postH = htmlStr.substring(h3);
    
    fs.writeFileSync(htmlPath, preH + interactiveBlockH + loadingBlockH + postH, 'utf-8');
    console.log('Swapped index.html successfully');
} else {
    console.log('h1, h2, h3 not found in index.html', h1, h2, h3);
}

