import React from 'react';
import simpleChartMaker from '../chartFunctions/simpleChartMaker';
import clientChartMaker from '../chartFunctions/clientChartMaker';
import backend from '../api/backend';
import { Chart } from "react-google-charts";


class SimpleChart extends React.Component{
    state={backendResponse:[]}

    // makeBracketedArray=(data)=>{
    //     let finalObject = {};
    //     const keys = Object.keys(data);
    //     // console.log(keys);
    //     keys.forEach((k)=>{
    //         let itemObjectArray=[];
    //         let itemString = "";
    //         itemString+="('";
    //         data[k].forEach((d)=>{
    //             itemObjectArray.push(d.name);
    //         })
    //         itemString+=itemObjectArray.join("','");
    //         itemString+="')";
    //         finalObject[k]=itemString;
    //     })
    //     return(finalObject);
    // }

    componentDidMount(){
        backend.get('/revenue-vs-profit').then(({data})=>{
            this.setState({backendResponse:data})
        })
    }

    UNSAFE_componentWillReceiveProps(){
        backend.get('/revenue-vs-profit').then(({data})=>{
            this.setState({backendResponse:data})
        })
    }

    // monthSetteler = (finalArray) =>{
    //     const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] 
    //     for (let i = 1; i < finalArray.length; i++) {
    //         finalArray[i][0]=months[i]
    //     }
    //     console.log(finalArray)
    //     return finalArray
    // }  
    monthSetteler = (finalArray) =>{
        const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] 
        for (let i = 1; i < finalArray.length; i++) {
            finalArray[i][0]=months[i]
        }
        // console.log(finalArray)
        return finalArray
    }  
    
    topAmount = (finalArray, amt) =>{
        // finalArray
        console.log(finalArray);
        const topArr = [];
        for(let i=0;i<finalArray.length;i++){
            for(let j=1;j<finalArray.length;j++){
                if(finalArray[i][1]>finalArray[j][1]){
                    let temp = finalArray[i];
                    finalArray[i]=finalArray[j];
                    finalArray[j]=temp;
                }
            }
        }
        for(let i=0;i<amt;i++){
            topArr.push(finalArray[i]);
        }

        // console.log(finalArray)
        return topArr;
    }  
    
  
    
    render(){
        if(this.state.backendResponse.length<1){
            return(
            <div>
                {/* loading.. */}

            </div>
            );
        }
        // console.log(clientChartMaker(this.state.backendResponse,['Client'],['Expenditure','Gross Profit']));

        return(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div>

                    <div className="chart-item">

                        <Chart
                        width={'700px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div> </div>}
                        data={(this.monthSetteler(clientChartMaker(this.state.backendResponse,['Month'],['Expenditure','Gross Profit'])))}
                        options={{
                            title: 'Expenditure vs Gross Profit',
                            titleTextStyle: { color: '#000000',
                                    // // fontName: '#000000',
                                    fontSize: 20,
                                    bold: true
                            },
                            pointSize: 4,
                            chartArea: { width: '60%' },
                            hAxis: {
                                title: 'Month',
                                // minValue: 0,
                            },
                            vAxis: {
                                title: 'Expenditure vs Gross Profit',
                            },
                            colors: ['#2e8744','#ffae00']

                            // series: { 0: { type: 'bars' } },
                        }}
                        legendToggle
                        />
                    </div>

                    <div className="chart-item">

                        <Chart
                        width={'700px'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div> </div>}
                        data={(this.topAmount(clientChartMaker(this.state.backendResponse,['Client'],['Revenue (copy)']),6))}
                        options={{
                            title: 'Revenue',
                            titleTextStyle: { color: '#000000',
                                    // // fontName: '#000000',
                                    fontSize: 20,
                                    bold: true
                            },
                            chartArea: { width: '70%' },
                            // hAxis: {
                            //     title: 'Month',
                            //     // minValue: 0,
                            // },
                            // vAxis: {
                            //     title: 'Expenditure vs Gross Profit',
                            // },
                            colors: ['#b8b4ab','#f5bd40','#e04826','#56ba77','#2d54a1','#8916db']

                            // series: { 0: { type: 'bars' } },
                        }}
                        legendToggle
                        />
                    </div>
                </div>
            <div >
                
                <div className="chart-item">
                <Chart
                    width={'700px'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div> </div>}
                    data={(this.topAmount(clientChartMaker(this.state.backendResponse,['Client'],['Profit Margin']),6))}
                    options={{
                        title: 'Profit Margin Percentage',
                        titleTextStyle: { color: '#000000',
                                // // fontName: '#000000',
                                fontSize: 20,
                                bold: true
                        },
                        chartArea: { width: '70%' },
                        // hAxis: {
                        //     title: 'Month',
                        //     // minValue: 0,
                        // },
                        // vAxis: {
                        //     title: 'Expenditure vs Gross Profit',
                        // },
                        colors: ['#b8b4ab','#f5bd40','#e04826','#56ba77','#2d54a1','#8916db'],
                        pieHole: 0.4,

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
                        data={(clientChartMaker(this.state.backendResponse,['Client'],['Expenditure','Revenue (copy)']))}
                        options={{
                            title: 'Expenditure vs Revenue ',
                            titleTextStyle: { color: '#000000',
                                    // // fontName: '#000000',
                                    fontSize: 20,
                                    bold: true
                            },
                            pointSize: 4,
                            chartArea: { width: '70%' },
                            hAxis: {
                                title: 'Client',
                                // minValue: 0,
                            },
                            vAxis: {
                                title: 'Expenditure vs Revenue',
                            },
                            colors: ['#2e8744','#ffae00'],

                            // series: { 0: { type: 'bars' } },
                        }}
                        legendToggle
                        />      
                    </div>
                </div>

            </div>
        );
    }
}


export default SimpleChart;