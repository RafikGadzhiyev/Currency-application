import { useContext } from "react"
import { CurrencyContext } from "../context/currency.context"

export default function MainHeader() {
    const state = useContext(CurrencyContext);

    return (<header className="main-header">
        <h1>
            today: {state.currencyState.Date.slice(0, 10).split('-').reverse().join`.`}
        </h1>
        <span>Все приведено в 1-ому номиналу</span>
    </header>)
}