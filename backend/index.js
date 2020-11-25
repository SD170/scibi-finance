const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

const dbpool = require('./created_modules/dbpool');
const db = dbpool['db'];

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//created_module_data_func
const dataClear = require('./created_modules/dataClear');
const { commaDollerSeparator } = require('./created_modules/dataClear');


// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
    //     res.sendFile(__dirname + '/templates/index.html')
    // })
    
    
    app.get('/dso-vs-dpo',(req,res)=>{
        
        sql='select Month,Quarter,Year,Cal_Gap,DPO,DSO,Gap from `chart_data`.`Dso vs Dpo`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Year','Cal_Gap','DPO','DSO','Gap');
            res.json(newResult);
        })
        
    })
    
    // app.get('/balance-sheet',(req,res)=>{
    app.get('/balance-trend',(req,res)=>{
    
        sql='select Type,Month,Year,Value,`Value (copy)` from `chart_data`.`Balance Sheet`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            const newResult = dataClear.commaDollerSeparator(result, 'Value (copy)');
            res.json(newResult);
        })
    
    })
    
    app.get('/cash-flow',(req,res)=>{
        
        sql='select Activity,`Cash Flow` from `chart_data`.`CashFlow`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            
            const newResult = dataClear.commaDollerSeparator(result, 'Cash Flow');
            // console.log(newResult);
            res.json(newResult);
        })
        
    })
    
    
    
    
    app.get('/gpm',(req,res)=>{
        
        sql='select Client, TotalNew from `chart_data`.`GPM`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const otherRemoved = dataClear.otherRemoveFromKey(result,'Client','Others');
            const newResult = dataClear.commaDollerSeparator(otherRemoved, 'TotalNew');
            res.json(newResult);
        })
        
    }) 

    // app.get('/gross-profit',(req,res)=>{
    app.get('/gp-share',(req,res)=>{
        
        sql='select Client, Cal_Total from `chart_data`.`Gross Profit`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Cal_Total');
            const otherTotal = dataClear.otherSumFromKeyAndMakeTotalOf(newResult,'Client','Others','Cal_Total') //make sum of all others in client col...and make total of Cal_total col whenever there is other.
            res.json(otherTotal);
        })
        
    }) 
    
    app.get('/income-by-country',(req,res)=>{
        
        sql='select Country,Type,Value from `chart_data`.`Income by Country`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Value');
            res.json(newResult);
        })
        
    })
    
    app.get('/accounts-payable',(req,res)=>{
        
        //not null is not working ...false is
        sql='select `Accounts Payable`,`Accounts Receivable - Trade`,Inventory from `chart_data`.`Main`'+
        'where Inventory is not false';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result,'Accounts Payable','Accounts Receivable - Trade','Inventory');
            res.json(newResult);
        })
        
    })
    
    app.get('/liquidity',(req,res)=>{
        
        //not null is not working ...false is
        sql='select `Month`,`Year`,`Quick Ratio`,`Current Ratio`,`Cash Ratio` from `chart_data`.`Main`'+
        'where `Quick Ratio` is not false';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            res.json(result);
        })
        
    })
    
    app.get('/operating-cycle',(req,res)=>{
        
        //not null is not working ...false is
        sql='select `Month`,`Year`,`Operating Cycle`,`Cash Coversion Cycle` from `chart_data`.`Main`'+
        'where `Operating Cycle` is not false';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            res.json(result);
        })
        
    })

    
    app.get('/net-working',(req,res)=>{
        
        //not null is not working ...false is
        sql='select `Month`,`Year`,`Net Working Capital excl. Cash and Current Debt (copy)` from `chart_data`.`Main`'+
        'where `Operating Cycle` is not false';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result,'Net Working Capital excl. Cash and Current Debt (copy)');
            res.json(newResult);
        })
        
    })

    app.get('/revenue',(req,res)=>{
        
        sql='select Client, Total from `chart_data`.`Revenue`';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Total');
            const otherTotal = dataClear.otherSumFromKeyAndMakeTotalOf(newResult,'Client','Others','Total') //make sum of all others in client col...and make total of Cal_total col whenever there is other.
            res.json(otherTotal);
        })
        
    }) 

    //filter
    app.get('/revenue-vs-profit',(req,res)=>{
        
        sql='select *  from `chart_data`.`Revenue vs Profit Margin` ORDER BY Client';
        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Revenue (copy)','Expenditure','Gross Profit','Year','Profit Margin');
            console.log(newResult)
            res.json(newResult);
        })
        
    }) 
    

    //filter
    app.get('/revenue-vs-gross',(req,res)=>{
        
        sql='select Month, Year, Quarter, `Cal_GP Actual`,`Cal_GP Budget`,`Cal_Rev Actual`,`Cal_Rev Budget`  from `chart_data`.`Sheet35`'+
        'where `Cal_GP Actual` is not false or'+
        '`Cal_GP Budget` is not false or'+
        '`Cal_Rev Actual` is not false or'+
        '`Cal_Rev Budget` is not false';

        db.query(sql,(err,result)=>{
            if(err)throw err;
            // commaDollerSeparator for making it float, removing $ and ,
            const newResult = dataClear.commaDollerSeparator(result, 'Revenue (copy)');
            res.json(newResult);
        })
        
    }) 

    app.post('/dso-vs-dpo/search',(req,res)=>{
        
        // console.log(req.body);
        const searchedMonths = req.body.Month;
        const searchedQuarter = req.body.Quarter;
        // const searchedYear = req.body.Year;
        const searchedYear = `('$2,016')`;
        sql = `SELECT * FROM \`chart_data\`.\`Dso vs Dpo\`
        WHERE
        Month IN ${searchedMonths} AND
        Quarter IN ${searchedQuarter} AND
        Year IN ${searchedYear}`;
        // console.log(sql)
        db.query(sql,(err,result)=>{
            if(err)throw err;
            else{
                // console.log(result);
                const newResult = dataClear.commaDollerSeparator(result, 'Gap','Year')
                res.json(newResult);
            }   
            
        })
        
    })


app.post('/search',(req,res)=>{
    const searchedFactory = req.body.factory;
    const searchedLocation = req.body.location;
    const searchedRegion = req.body.region;
    const searchedItem = req.body.item;
    const searchedSalesperson = req.body.salesperson;
    const searchedStartdate = req.body.startdate;
    const searchedEnddate = req.body.enddate;
    
    sql = `SELECT 
    InvoiceDate, ItemID, Quantity, Sales, Cost, CustomerID, Location, Factory, SalesPerson, Transactions, Region
    FROM data
    WHERE
    InvoiceDate >= '${searchedStartdate}T18:30:00:000Z'
    AND InvoiceDate <= '${searchedEnddate}T18:30:00:000Z'
    AND Factory LIKE '%${searchedFactory}%'
    AND Location LIKE '%${searchedLocation}%'
    AND Region LIKE '%${searchedRegion}%'
    AND ItemID LIKE '%${searchedItem}%'
    AND SalesPerson LIKE '%${searchedSalesperson}%'
    ORDER BY Sales DESC
    `

    db.query(sql,(err,result)=>{
        if(err)throw err;
        else{
            
            res.json(result);
        }   
        
    })

})



//Listening to port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Process started at port:5000');    
})

