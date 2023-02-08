import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas'
import '../custom.css'
import NavBar from '../components/navbar'
import 'toastr/build/toastr.min.js'
import { BrowserRouter} from "react-router-dom";
import 'toastr/build/toastr.css'


class App extends React.Component{

  render(){ 
    return(
      <>
        <NavBar />
        <div className='container'>
          <BrowserRouter>
            <Rotas/>
          </BrowserRouter>
        </div>
      </>
    )  
  }
}

export default App;
