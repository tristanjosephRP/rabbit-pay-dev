import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RabbitPayApp from './presentation/App'
import './index.css'
import 'react-spring-bottom-sheet/dist/style.css'

const container = document.getElementById('root')
// const root = ReactDOMClient.createRoot(container as HTMLElement)

render(
  <BrowserRouter>
    <React.StrictMode>
      <RabbitPayApp />
    </React.StrictMode>
  </BrowserRouter>,
  container 
)
