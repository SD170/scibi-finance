import React from 'react';
import CalculatedChart from './components/CalculatedChart';
import SimpleChart from './components/SimpleChart';
import './App.css'

class App extends React.Component{


    render(){
        return(
            <div>
                <h1 className="image-loader">Finance Dashboard</h1>
                <SimpleChart />
                <CalculatedChart />
            </div>
        );
    }
}

export default App;
