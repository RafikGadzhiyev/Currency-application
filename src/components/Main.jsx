import { useContext } from "react"
import { CurrencyContext } from "../context/currency.context";
import './../styles/main.scss'
import Currency from "./Currency";
import MainHeader from "./MainHeader";

export default function Main() {
    const state = useContext(CurrencyContext);

    return (
        <div className="main-container">
            {
                state && state.currencyState &&
                <>
                    <MainHeader />
                    <main className="main_content-container">
                        <ul
                            className="currency_list"

                        >
                            {
                                Object.values(state.currencyState.Valute).map((e, i) => {
                                    let diff = (100 - e.Previous * 100 / e.Value);

                                    return <Currency
                                        key={i}
                                        currency={e}
                                        diff={diff}
                                    />
                                }
                                )
                            }
                        </ul>
                    </main>
                </>
            }
        </div>
    )
}