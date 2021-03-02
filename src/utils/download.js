const _userAgent = navigator.userAgent.toLowerCase();
const isChrome = _userAgent.indexOf("chrome") > -1;
const isSafari = _userAgent.indexOf("safari") > -1;
const isFireFox = _userAgent.indexOf("firefox") > -1;
// @ts-ignore
const isIE = !!window.ActiveXObject || "ActiveXObject" in window;

console.log(_userAgent, isChrome, isSafari, isFireFox, isIE);
export const downloadFile = sUrl => {
    console.log(sUrl);
    if (/(iP)/g.test(navigator.userAgent)) {
        return false;
    }

    if (isChrome || isSafari || isFireFox) {
        let link = document.createElement("a");
        link.href = sUrl;
        if (link.download !== undefined) {
            link.download = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
        }

        if (document.createEvent) {
            let e = document.createEvent("MouseEvents");
            e.initEvent("click", true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    if (isIE) {
        const iframe = document.createElement("iframe");
        iframe.src = sUrl;
        iframe.id = "saveFileFrame";
        iframe.style.display = "none";
        iframe.onload = function () {
            document.frames["saveFileFrame"].document.execCommand("saveAs");
            iframe.removeNode(true);
        };
        document.body.appendChild(iframe);
        return true;
    }

    if (sUrl.indexOf("?") === -1) {
        sUrl += "?download";
    }

    window.open(sUrl, "_self");
    return true;
};

export const downloadBase64Img = {
    // 下载图片
    download(name, imgData) {
        // const imgData = 'base64---------' // 这里放需要下载的base64
        this.downloadFile(name, imgData);
    },
    // 下载
    downloadFile(fileName, content) {
        const aLink = document.createElement("a");
        const blob = this.base64ToBlob(content); // new Blob([content]);

        const evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    },
    // base64转blob
    base64ToBlob(code) {
        const parts = code.split(";base64,");
        const contentType = parts[0].split(":")[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;

        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
    }
};
