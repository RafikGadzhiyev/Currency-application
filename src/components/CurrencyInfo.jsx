export default function CurrencyInfo(props) {
    console.log(props);
    return (

        <li
            className="currency_today"
        >


            <span>
                {props.data.Date.slice(0, 10).split('-').reverse().join`.`}
            </span>
            <span>
                {(props.currency.Value / props.nominal).toFixed(7)}
            </span>
            <br />
            <span
                className={props.diff < 0 ? 'less' : 'great'}
            >
                {
                    props.diff
                }%
            </span>

        </li>
    )
}