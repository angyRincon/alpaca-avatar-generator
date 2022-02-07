import data from "./data";
import {useState} from "react";

function App() {
    const route = '/assets/alpaca'
    const [accessory, setAccessory] = useState('')
    const [index, setIndex] = useState(0)
    const [styleArray, setStyleArray] = useState(data.initialData)

    const handleChangeAccessory = (localAccessory, i) => {
        setIndex(i)
        setAccessory(localAccessory)
    }

    const handleChangeStyle = (localStyle) => {
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

    return (
        <div className='container'>
            <div className="grid-container">
                <div className='alpaca-images'>
                    <div className="images">
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
                    <div className='buttons'>
                        <button onClick={handleRandom}>Random</button>
                        <button>Download</button>
                    </div>
                </div>

                <div className='buttonsContainer'>
                    <h2>Accessorize the alpaca</h2>
                    <div className='button-accessories-container'>
                        {
                            data.buttonsAccessories.map((button, i) => (
                                <button
                                    key={button}
                                    className='button-accessories'
                                    onClick={() => handleChangeAccessory(button, i)}
                                >
                                    {button}
                                </button>
                            ))
                        }
                    </div>

                    <h2>Style</h2>
                    <div>
                        {
                            data.buttonStyles[index][accessory || 'hair'].map(style => (
                                    <button
                                        key={style}
                                        className='button-accessories'
                                        onClick={() => handleChangeStyle(style)}
                                    >
                                        {style}
                                    </button>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
