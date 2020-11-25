import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import backend from '../api/backend';

class SelectField extends React.Component{

    constructor() {
        super();
        this.state ={
            options:[]
        }
    }
      

    
    optionsLoad =()=>{
        // making the dataset distinct
        const options = []; 
        this.props.data.forEach((d)=>{
            options.push(d[this.props.keyName]);
        }) 
        const distinctArray = options.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

        const returnArray = [];
        distinctArray.forEach((i)=>{
            returnArray.push({name: String(i), id: String(this.props.keyName)});
        })


        this.setState({
            options:returnArray,
        });

    }

    
    componentDidMount(){
        this.optionsLoad();
        // this.getSelected();

    }

    render(){
        // console.log(this.state.options)
        if(this.state.options.length<1){
            return <div> </div>
        }

        return(
            <div>
            <Multiselect closeOnSelect="false" showCheckbox="true" options={this.state.options} displayValue="name" onRemove={this.props.onMultiRemove} onSelect={this.props.onMultiSelect} selectedValues={this.state.options} />
            </div>
        );        
    }
}

export default SelectField;

