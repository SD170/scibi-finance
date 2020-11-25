
const twoSameRowRemove = function(result){
    const newResult = [];
    for(let i=1;i<result.length;i=i+2){
        newResult.push(result[colNames[i]]);
    }
    return newResult
}
const threeSameRowRemove = function(result){
    const newResult = [];
    for(let i=0;i<result.length;i=i+3){
        newResult.push(result[colNames[i]]);
    }
    return newResult
}

const commaDollerSeparator = function(result, ...colNames){
    const newRes = [];
    for(let i=0;i<colNames.length;i++){
        result.forEach(res =>{
            try{
                res[colNames[i]] = res[colNames[i]].replace("$", "");
                res[colNames[i]] = res[colNames[i]].replace("%", "");
                res[colNames[i]] = res[colNames[i]].replace(/,/g, '');
                res[colNames[i]] = parseFloat(res[colNames[i]]);
            }catch{

            }
            // console.log(res,colNames);
    
            newRes.push(res);
        })
    }

    return newRes;
}

const otherRemoveFromKey = function(result,key,value){
    const newRes = [];
    result.forEach(res =>{
        if(key in res){
            if(res[key] === value){
            }else{
                newRes.push(res);
            }
        }else{}
    })
    return newRes;
}

const otherSumFromKeyAndMakeTotalOf = function(result,key,value,sumField){
    const newRes = [];
    let OthersTotal = 0;
    result.forEach(res =>{
        if(key in res){
            if(res[key] === value){
                OthersTotal+=res[sumField]
            }else{
                newRes.push(res);
            }
        }else{}
    })
    
    const otherObj = {};
    otherObj[key]=value;
    otherObj[sumField]=OthersTotal;
    newRes.push(otherObj);

    return newRes;
}

module.exports = {
    'twoSameRowRemove':twoSameRowRemove,
    'threeSameRowRemove':threeSameRowRemove,
    'commaDollerSeparator':commaDollerSeparator,
    'otherRemoveFromKey':otherRemoveFromKey,
    'otherSumFromKeyAndMakeTotalOf' :otherSumFromKeyAndMakeTotalOf,
}