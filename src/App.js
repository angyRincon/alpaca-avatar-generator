import data from "./data";
import {useState} from "react";
import download from 'downloadjs'
import { toPng } from 'html-to-image'

function App() {
    const route = 'assets/alpaca'
    const [accessory, setAccessory] = useState('hair')
    const [index, setIndex] = useState(0)
    const [styleArray, setStyleArray] = useState(data.initialData)
    const [selectedStyle, setSelectedStyle] = useState(null)

    const handleChangeAccessory = (localAccessory, i) => {
        setIndex(i)
        setSelectedStyle(null)
        setAccessory(localAccessory)
    }

    const handleChangeStyle = (localStyle, localIndex) => {
        setSelectedStyle(localIndex)
        const alpacaChanged = styleArray.map(alpaca => {
            if (alpaca.accessory === accessory) alpaca.style = localStyle
            return alpaca
        })
        setStyleArray(alpacaChanged)
    }

    const handleRandom = () => {
        let arrayStyles = []
        for (let styleValue of styleArray) {
            for (let value of data.buttonStyles) {
                const randomIndex = Math.floor(Math.random() * value[Object.keys(value)[0]].length)
                const newObject = {
                    accessory: Object.keys(value)[0],
                    style: value[Object.keys(value)[0]][randomIndex]
                }
                if (styleValue.accessory === newObject.accessory && styleValue.accessory) {
                    styleValue.style = newObject.style
                    arrayStyles = [...arrayStyles, {accessory: styleValue.accessory, style: styleValue.style}]
                }
            }
        }
        setStyleArray(arrayStyles)
    }

    const downloadImage = () => {
        const alpacaCanvasNode = document.getElementById('alpaca')
        toPng(alpacaCanvasNode).then(dataUrl => {
            download(dataUrl, 'my-alpaca.png')
        })
    }

    return (
        <>
            <h1>Alpaca generator</h1>
            <div className='container'>
                <div className='alpaca-container'>
                    <div className="alpaca-images" id='alpaca'>
                        {
                            styleArray.map(img => (
                                <img
                                    key={img.accessory}
                                    src={`${route}/${img.accessory}/${img.style}.png`}
                                    alt={`${img.accessory}-${img.style}`}
                                />
                            ))
                        }
                    </div>

                    <div className="alpaca-buttons">
                        <button onClick={handleRandom}>
                            <i className="fas fa-random"/>
                            Random
                        </button>

                        <button onClick={downloadImage}>
                            <i className="fas fa-download"/>
                            Download
                        </button>
                    </div>
                </div>

                <div className='buttons-container'>
                    <h2 className='title'>Accessorize the alpaca's</h2>
                    <div className="buttons-accessory">
                        {
                            data.buttonsAccessories.map((button, i) => (
                                <button
                                    key={button}
                                    className={i !== index ? 'button-accessories-styles' : 'active'}
                                    onClick={() => handleChangeAccessory(button, i)}
                                >
                                    {button}
                                </button>
                            ))
                        }
                    </div>

                    <h2 className='title'>Style</h2>
                    <div className="buttons-styles">
                        {
                            data.buttonStyles[index][accessory || 'hair'].map((style, i) => (
                                    <button
                                        key={style}
                                        className={selectedStyle !== i ? 'button-accessories-styles' : 'active'}
                                        onClick={() => handleChangeStyle(style, i)}
                                    >
                                        {style}
                                    </button>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
