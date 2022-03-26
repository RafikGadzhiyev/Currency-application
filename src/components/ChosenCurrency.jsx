import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { CircularProgress } from "@mui/material";
import { CurrencyContext } from "../context/currency.context";
import './../styles/main.scss'
import CurrencyInfo from "./CurrencyInfo";

export default function ChosenCurrency() {
    const state = useContext(CurrencyContext);
    const { currencyName } = useParams();
    const [totalDaysValue, setTotalDaysValue] = useState([]);

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            state.setCurrencyState(() => result)
                        })
                }
            })
        if (state.currencyState) {
            get10DaysResult();
        }
        state.setChosenCurrency(() => currencyName);
    }, [])

    const get10DaysResult = async () => {
        let totalDays = 10,
            url = 'https://www.cbr-xml-daily.ru/daily_json.js',
            total = [];
        while (totalDays--) {
            let response = await fetch(url),
                result;
            if (response.ok) {
                result = await response.json();
            }

            if (result) {
                url = result.PreviousURL;
            }
            total.push(result);
        }

        setTotalDaysValue(() => total);
    }


    return (
        <div>
            {
                !totalDaysValue.length &&
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            }
            {
                !!totalDaysValue.length &&
                <>
                    <div className="info-container">
                        <h1
                            className="info-title"
                        >10 work-day result</h1>
                        <span
                            className="info-currency_name"
                        >{state.currencyState.Valute[currencyName].Name}</span>
                    </div>
                    <ul
                        className="currency_list"

                    >
                        {totalDaysValue.map((e) => {
                            return Object.values(e.Valute).map((item, i) => {
                                if (item.CharCode === currencyName) {
                                    let currency = state.currencyState.Valute[currencyName];
                                    let nominal = currency.Nominal;
                                    let diff = (100 - item.Previous * 100 / item.Value);

                                    return <CurrencyInfo
                                        key={i}
                                        data={e}
                                        currency={item}
                                        nominal={nominal}
                                        diff={diff}
                                    />
                                }
                                return null;
                            })
                        })}
                    </ul>
                </>
            }
        </div>
    )
}