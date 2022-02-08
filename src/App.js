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
        <>
            <h1>Alpaca generator</h1>
            <div className='container'>
                <div className='alpaca-container'>
                    <div className="alpaca-images">
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
                        <button>
                            <i className="fas fa-download"/>
                            Download
                        </button>
                    </div>

                </div>

                <div className='buttons-container'>
                    <div className="buttons-accessory">
                        <h2 className='title'>Accessorize the alpaca's</h2>
                        {
                            data.buttonsAccessories.map((button, i) => (
                                <button
                                    key={button}
                                    className='button-accessories-styles'
                                    onClick={() => handleChangeAccessory(button, i)}
                                >
                                    {button}
                                </button>
                            ))
                        }
                    </div>
                    <div className="buttons-styles">
                        <h2 className='title'>Style</h2>
                        {
                            data.buttonStyles[index][accessory || 'hair'].map(style => (
                                    <button
                                        key={style}
                                        className='button-accessories-styles'
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
        </>
        /* <div className='container'>
             <div className="grid-container">
                 <div className='alpaca-images'>
                     {
                         styleArray.map(img => (
                             <img
                                 key={img.accessory}
                                 src={`${route}/${img.accessory}/${img.style}.png`}
                                 alt={`${img.accessory}-${img.style}`}
                             />
                         ))
                     }
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
         </div>*/
    );
}

export default App;
