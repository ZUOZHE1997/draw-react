import "./Slider.css"

export function Slider(props) {
    return (
        <div>
            <input
                className="slider"
                type="range"
                max={props.max}
                min={props.min}
                step="1"
                value={props.value}
                onInput={(e) => props.change(e)}
            />
            <p className="title">
                <span>小</span>
                <span>大</span>
            </p>
        </div>
    )
}
