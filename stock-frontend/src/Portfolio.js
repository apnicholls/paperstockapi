import React, { useState, useEffect } from 'react'

function Portfolio() {

    const [getBank, setGetBank] = useState();
    const [currentPortfolio, setCurrentPortfolio] = useState();

    const bankAccount = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/wallet`);
        let json = await res.json();
        console.log(json)
        setGetBank(json)
    };

    const fetchStocks = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/stocks`);
        let json = await res.json();
        console.log('This is the stocks', json)
        setCurrentPortfolio(json);
    };

    // onClick={() => {}}
    // onClick={() => {sellStock(item.id)}}
    const sellStock = async (id) => {
        const sell = await fetch(`http://localhost:3000/api/v1/stocks/${id}`, {method: 'DELETE'});
        let json = await sell.json();
        console.log(json)

    };
    //  let id = ev.stock.id
    // const change = await destroy(`http://localhost:3000/api/v1/stocks`);  
    // let 
    // console.log(ev.stock.id)
    // } 
    //fetch(‘url’/:id, {method: ‘DELETE’})
    // await fetch(`http://localhost:3000/api/v1/stocks/${id}`, {method: ‘DELETE’})


    useEffect(() => {
        bankAccount()
        fetchStocks()
    }, [])

    return (
        <div className="grid-template-rows: repeat(3, minmax(0, 1fr)) border bg-yellow-50">

            <div className={'p-5'}>
                <h1 className={'text-3xl text-center font-bold'} > MY PORTFOLIO</h1>
            </div>

            <div className={'p-5'}>
                {currentPortfolio && <table className="table-auto w-2/3 m-auto">
                    <thead>
                        <tr className={'p-2'}>
                            <th className={'w-1/4'}>Name</th>
                            <th className={'w-1/4'}>Quantity</th>
                            <th className={'w-1/4'}>Value</th>
                            <th className={'w-1/4'}>Buy/Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPortfolio.map((item, idx) => {
                            return <tr key={idx}>
                                <td className={'text-center'}>{item.name}</td>
                                <td className={'text-center'}>{item.quantity}</td>
                                <td className={'text-center'}>{item.value}</td>
                                <td className={'text-center'}><span onClick={() => {sellStock(item.id)}} className={'bg-gray-700 rounded text-white text-m pl-5 pr-5'}>Sell</span></td>
                            </tr>
                        })}
                    </tbody>
                </table>}
                {!currentPortfolio && <h1>Loading...</h1>}
            </div>

            <div className={'p-5'}>
                <table className="table-auto m-auto font-bold text-2xl">
                    <thead>
                        <tr>
                            <th className={'w-1/3'}></th>
                            <th className={'w-1/3'}></th>
                            <th className={'w-1/3'}></th>
                        </tr>
                    </thead>
                    <tbody className={''}>
                        <tr>
                            <td className={''}>Account Value: </td>
                            <td className={'ml-10'}>{getBank && getBank[0] && <h1>${getBank[0].value}</h1>}</td>
                            <td>
                                <span onClick={bankAccount} className={'bg-gray-600 curser-pointer p-2 rounded text-white text-xl pl-5 pr-5'}>Refresh</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;