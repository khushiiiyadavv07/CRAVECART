import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


createRoot(document.getElementById('root')).render( //ye line index.html s root element ko render krwati h and createRoot() ye react ko bolta h ki bhai yeh tera area h (jo root element humne render krwaya), yaha tu apna poora UI control krega 
    <BrowserRouter>  {/*iska kaam h app me different pages handle krna without reloading*/}
        <Provider store={store}> {/*this is the part of redux toolkit*/}
            <App />  {/*//yaha p hum jo b code likhenge vo browser m dikh jaayega */}
        </Provider>
    </BrowserRouter>,
)
