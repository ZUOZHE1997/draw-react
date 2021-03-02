export class Draw {
    constructor(options) {
        // 获取canvas实例
        this.canvas = document.getElementById(options.element);
        this.ctx = this.canvas.getContext("2d");
        // 初始化画笔
        this.painting = false;
        this.lastPoint = {x: undefined, y: undefined};
        this.clear = false; //是否亲清除
        this.history = []; // 记录
        this.lineWidth = 3; // 笔刷大小
    }
    // 初始化
    init() {
        this.canvas.width = document.body.clientWidth - 10;
        this.canvas.height = document.body.clientHeight - 10;
        this.canvas.onmousedown = e => {
            this.readyDraw(e);
        };
        this.canvas.onmousemove = e => {
            this.drawing(e);
        };
        this.canvas.onmouseup = () => {
            this.stopDraw();
        };
    }
    // 开始准备绘制
    readyDraw(e) {
        let firstDot = this.ctx.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        ); //在这里储存绘图表面
        this.saveData(firstDot);
        this.painting = true;
        let x = e.offsetX;
        let y = e.offsetY;
        this.lastPoint = {x: x, y: y};
        this.ctx.save();
        this.drawCircle(x, y, 0);
    }
    // 鼠标点击canvas正在绘画
    drawing(e) {
        if (this.painting) {
            let x = e.offsetX;
            let y = e.offsetY;
            let newPoint = {x: x, y: y};
            this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y);
            this.lastPoint = newPoint;
        }
    }
    // 停止绘制
    stopDraw() {
        this.painting = false;
    }
    // 鼠标点击画点
    drawCircle(x, y, radius) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        if (this.clear) {
            this.ctx.clip();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
    // 鼠标平移划线
    drawLine(x1, y1, x2, y2) {
        this.ctx.lineWidth = this.lineWidth; // 笔刷大小
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        if (this.clear) {
            this.ctx.save();
            this.ctx.globalCompositeOperation = "destination-out";
            this.ctx.stroke();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.closePath();
            this.ctx.clip();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        } else {
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
    // 清除
    cleaning() {
        this.clear = true;
    }
    // 清空
    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // 撤销
    undo() {
        if (this.history.length < 1) return false;
        this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
        this.history.pop();
    }
    // 自动保存每一步,上限为储存10步，太多了怕挂掉
    saveData(data) {
        this.history.length === 10 && this.history.shift();
        this.history.push(data);
    }
    // 切换画笔的宽度
    changeLine(value) {
        this.lineWidth = value;
    }
    // 选择画笔
    checkPen() {
        this.clear = false;
    }
}
