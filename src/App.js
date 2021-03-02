import './App.css'
import {Slider} from "./components/Slider"
import {Draw} from "./utils/draw"
import {downloadBase64Img} from "./utils/download";
import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.draw = ""
        this.state = {
            SliderValue: 2
        }
    }

    componentDidMount() {
        this.draw = new Draw({element: 'draw'})
        this.draw.init()
    }

    sliderChange(e) {
        this.setState({SliderValue: e.target.value})
        this.draw.changeLine(this.state.SliderValue)
    }

    download() {
        const img = document.getElementById("draw").toDataURL("image/png");
        downloadBase64Img.download("image", img)
    }

    render() {
        return (
            <div className="draw-content">
                <canvas id="draw"/>
                <div className="operating-btn-list">
                    <button onClick={() => this.download()}>下载</button>
                    <button onClick={() => this.draw.checkPen()}>画笔</button>
                    <button onClick={() => this.draw.cleaning()}>橡皮擦</button>
                    <button onClick={() => this.draw.undo()}>撤销</button>
                    <button onClick={() => this.draw.reset()}>重绘</button>
                    <div className="range-set">
                        <Slider change={(e) => {
                            this.sliderChange(e)
                        }} max="12" min="1" value={this.state.SliderValue}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
