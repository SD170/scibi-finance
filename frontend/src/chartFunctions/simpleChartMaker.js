const simpleChartMaker =(data,stringRowArray,noRowArray)=>{
    // console.log(data)
    const finalArrayOfArrays = []
    
    const headerArray = [];
    stringRowArray.forEach((i) => {
        headerArray.push(i);    
    });    
    noRowArray.forEach((i) => {
        headerArray.push(i);    
    });

    finalArrayOfArrays.push(headerArray);

    // console.log(data)
    data.forEach((d)=>{
        const temp = [];

        stringRowArray.forEach((s)=>{
            temp.push(d[s]);
        })
        noRowArray.forEach((n)=>{
            temp.push(d[n]);
        })
        finalArrayOfArrays.push(temp)
    })

    // console.log(finalArrayOfArrays);
    return(finalArrayOfArrays);

    

}

export default simpleChartMaker;