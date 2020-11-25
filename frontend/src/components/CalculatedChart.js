import React from 'react';
import ChartCanvas from './ChartCanvas';
import backend from '../api/backend';

class Form extends React.Component{
    state={
        backendRawData:[],
        data:{}

    }

    // dataGetOnMount= (data) =>{
        
    //     this.setState({data:[{}]})
    // }
    
    componentDidMount(){
        this.backendRawData();
    }
    
    backendRawData = async() =>{
        const {data} = await backend.get('/dso-vs-dpo/');
        // console.log(data)
        const keyNameArray = [0,1,2]
        const startingDataObj = {};
        
        //making a preselected state of all selected

        keyNameArray.forEach((index)=>{

            const keyName = Object.keys((data)[0])[index]

            const options = []; 
            data.forEach((d)=>{
                options.push(d[keyName]);
            }) 
            const distinctArray = options.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    
            const returnArray = [];
            distinctArray.forEach((i)=>{
                returnArray.push({name: String(i), id: String(keyName)});
            })

            startingDataObj[keyName]=returnArray;

        })

        // console.log(startingDataObj)
        this.setState({
            backendRawData:data,
            data:startingDataObj
        });
    }

    onMultiSelect =(selectedList, selectedItem)=>{
        // console.log(selectedList);
        // this.setState({dataArray:selectedList})
        if(selectedList.length<1){
            alert('Select at least one option');
        }else{
            this.setState(prevState=>({
                ...prevState,
                backendRawData:{
                    ...prevState.backendRawData
                },
                data:{
                    ...prevState.data,
                    [selectedList[0].id]:selectedList
                }
            }))
        }
    }
    onMultiRemove=(selectedList, removedItem) =>{
        // console.log(selectedList);
        // this.setState({dataArray:selectedList})
        if(selectedList.length<1){
            alert('Select at least one option');
        }else{
            this.setState(prevState=>({
                ...prevState,
                backendRawData:{
                    ...prevState.backendRawData
                },
                data:{
                    ...prevState.data,
                    [selectedList[0].id]:selectedList
                }
            }))
        }
    }


    
    // keyName={Object.keys(this.state.backendRawData[0])[0]} 

    render(){
        if(this.state.backendRawData.length<1){
            return(
                <div> </div>
            );
        }        

        // console.log(this.state.data)
        
        return(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <ChartCanvas data={this.state.data}/>
            </div>
        );
    }
}

export default Form;

