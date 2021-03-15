import React, { useState, useEffect } from 'react'
/* var Chart = require('chart.js');
var myChart = new Chart(ctx, {...}); */

function Search(props) {
    const [inputText, setInputText] = useState('');
    const [currentQuote, setCurrentQuote] = useState();
    const [currentStockQuote, setCurrentStockQuote] = useState();
    const [ticker, setTicker] = useState();
    const [buyQuantity, setBuyQuantity] = useState(0);

    const [getBank, setGetBank] = useState();

    const bankAccount = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setGetBank(json)
    };

    useEffect(() => {
        bankAccount()
    }, [])

    const fetchQuote = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/stocks/search/${inputText}`);
        let json = await res.json();
        console.log(json)
        setCurrentQuote(json)
        setCurrentStockQuote(json)
        setTicker(inputText)
        setInputText('')

    };
    const onInputChange = async (ev) => {
        console.log(ev.currentTarget.value)
        setInputText(ev.currentTarget.value);
    };

    const buyStock = async () => {
        console.log('buying stock')
        console.log(bankAccount)
        if (buyQuantity ==0){
            alert('Buy quantity needs to be greater than 0!')
        }
        let cashNeeded = buyQuantity * currentStockQuote.data.price;
        console.log('Cash Needed is', cashNeeded)

        let addToBank = +cashNeeded - +getBank[0].value.replace(",", '');
        console.log('test', addToBank)
        console.log(getBank[0].value)
       // const spend = await fetch(`http://localhost:3000/api/v1/wallet/1`) 

        if (cashNeeded > bankAccount.value) {
            alert("You don't have enough cash on hand")
        } else {
            let body = {
                name: ticker,
                quantity: buyQuantity,
                value: currentStockQuote.data.price,
            }

            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers:{}
            };
            options.headers["Accept"] = "application/json, text/plain, */&";
            options.headers["Content-Type"] = "application/json;charset=utf-8";
            console.log(options);


            const res = await fetch(`http://localhost:3000/api/v1/stocks`, options);
            let json = await res.json();
            console.log(json)
            setBuyQuantity(0)
        }
    };

    const onBuyChange = async (ev) => {
        setBuyQuantity(ev.currentTarget.value);
    };

   
    return (
        <div className={`border p-5 color-black p-10 bg-gray-200`}>

            <div className="grid grid-cols-2 ">
                <div className={'mt-5'}>
                    <input value={inputText} onChange={onInputChange} type="text" className={'border w-full p-3 rounded-full color-blue border-gray-300'} />
                </div>

                <div className={'mt-8 ml-10'}>
                    <span onClick={fetchQuote} className={'bg-gray-600 curser-pointer p-2 rounded text-white mt-10 text-xl pl-5 pr-5'}>Get Quote</span>
                </div>
            </div>
            {ticker && <div className="grid grid-cols-2">
                <div className={'mt-10 ml-14'}>
                    <h1 className={'text-2xl'}>{ticker} : {currentStockQuote && <span>&nbsp;&nbsp;{currentStockQuote.data.currency} {currentStockQuote.data.price}</span>}</h1>
                </div>
                <div className={'mt-10'}>
                    <span>
                        <input type="number" onChange={onBuyChange} className={'border'} value={buyQuantity} />&nbsp;&nbsp;
                    <span className={'bg-blue-300 p-2 rounded curser-pointer test-white text-xl pl-5 pr-5'} onClick={buyStock}>Buy</span>
                    </span>
                </div>
            </div>}

        </div>
    );
};

export default Search;