import React from 'react';
import backend from '../api/backend';
import comboChartMaker from '../chartFunctions/comboChartMaker';
import { Chart } from "react-google-charts";

class ChartCanvas extends React.Component{
    state={backendResponse:[]}

    makeBracketedArray=(data)=>{
        let finalObject = {};
        const keys = Object.keys(data);
        // console.log(keys);
        keys.forEach((k)=>{
            let itemObjectArray=[];
            let itemString = "";
            itemString+="('";
            data[k].forEach((d)=>{
                itemObjectArray.push(d.name);
            })
            itemString+=itemObjectArray.join("','");
            itemString+="')";
            finalObject[k]=itemString;
        })
        return(finalObject);
    }

    componentDidMount(){
        const backendSendData = this.makeBracketedArray(this.props.data);
        backend.post('/dso-vs-dpo/search',backendSendData).then(({data})=>{
            this.setState({backendResponse:data})
        })
    }
    // UNSAFE_componentWillReceiveProps(){
    //     console.log('unsafe')
    //     const backendSendData = this.makeBracketedArray(this.props.data);
    //     backend.post('/dso-vs-dpo/search',backendSendData).then(({data})=>{
    //         this.setState({backendResponse:data})
    //     })
    // }
    UNSAFE_componentWillReceiveProps(){
        const backendSendData = this.makeBracketedArray(this.props.data);
        backend.post('/dso-vs-dpo/search',backendSendData).then(({data})=>{
            this.setState({backendResponse:data})
        })
    }

    monthSetteler = (finalArray) =>{
        const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] 
        for (let i = 1; i < finalArray.length; i++) {
            finalArray[i][0]=months[i]
        }
        // console.log(finalArray)
        return finalArray
    }  
    
    // componentDidUpdate(){
    //     const backendSendData = this.makeBracketedArray(this.props.data);
    //     console.log(backendSendData);
    //     backend.post('/dso-vs-dpo/search',backendSendData).then(({data})=>{
    //         this.setState({backendResponse:data})
    //     })
    // }
    
    render(){
        if(this.state.backendResponse.length<1){
            return(
            <div>
               
            </div>
            );
        }
        // console.log(this.state.backendResponse);
        //data,stringrow,numberrow,width,height,title,vaxixTitle,haxisTitle,seriesType,series,seriesIndexArray
        // console.log(comboChartMaker(this.state.backendResponse,[],[],'500px','300px','title','vaxis','haxis','bars','line',[1]));
        // console.log(comboChartMaker(this.state.backendResponse,[],[]));
        // comboChartMaker(this.state.backendResponse,['Month'],['Gap','DPO','DSO']);

        return(
            <div style={{ display: 'flex'}}>
                <div className="chart-item">
                    
                    <Chart
                    width={'700px'}
                    height={'400px'}
                    chartType="ComboChart"
                    loader={<div> </div>}
                    data={this.monthSetteler(comboChartMaker(this.state.backendResponse,['Month'],['DPO','DSO']))}
                    options={{
                        title: 'DSO vs DPO',
                        titleTextStyle: { color: '#000000',
                                // // fontName: '#000000',
                                fontSize: 20,
                                bold: true
                        },
                        chartArea: { width: '70%' },
                        hAxis: {
                            title: 'DSO vs DPO',
                            // minValue: 0,
                        },
                        vAxis: {
                            title: 'Month',
                        },    
                        seriesType: 'bars',
                        colors: ['#13bf38', '#0fdbc0']
                        // series: { 0: { type: 'bars' } },
                    }}
                    legendToggle
                    />
                </div>

                <div className="chart-item">

                    <Chart
                    width={'700px'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div> </div>}
                    data={this.monthSetteler(comboChartMaker(this.state.backendResponse,['Month'],['Gap']))}
                    options={{
                        title: '$Gap per Month',
                        titleTextStyle: { color: '#000000',
                                // // fontName: '#000000',
                                fontSize: 20,
                                bold: true
                        },
                        chartArea: { width: '70%' },
                        hAxis: {
                            title: '$Gap',
                            // minValue: 0,
                        },
                        vAxis: {
                            title: 'Month',
                        },
                        colors: ['#2e8744']

                        // series: { 0: { type: 'bars' } },
                    }}
                    legendToggle
                    />
                </div>    
            </div>
        );
    }
}

export default ChartCanvas;