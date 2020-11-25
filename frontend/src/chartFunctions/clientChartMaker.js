const clientChartMaker =(data,stringRowArray,noRowArray)=>{
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
    const ClientArray = [];
        for(let i=0;i<data.length-1;i++){
            const temp = [];
            // if(data[i].Client !== data[i+1].Client){
            if(!ClientArray.includes(data[i].Client)){
                ClientArray.push(data[i].Client)
                
                stringRowArray.forEach((s)=>{
                    temp.push(data[i][s]);
                })
                noRowArray.forEach((n)=>{
                    temp.push(data[i][n]);
                })
                finalArrayOfArrays.push(temp)
            }
                // }
        }

    // console.log(finalArrayOfArrays)
    return(finalArrayOfArrays)

    

}

export default clientChartMaker;