import { Link } from "react-router-dom";

export default function Currency(props) {

    const onMouseOverHandler = e => {
        let currentElement = e.target; /*@type {HTMLElement} */
        if (currentElement.tagName !== 'BUTTON') {
            currentElement = currentElement.closest('button');
        };

        let startX = e.pageX + 10, /*@type {Number} */
            startY = e.pageY + 10; /*@type {Number} */

        let childs = Array.from(currentElement.children).map(e => Array.from(e.classList)) /*@type {Array<DomTokenList>}*/;

        if (childs.some(e => e.includes('tooltip-container'))) return;

        let tooltip = document.createElement("div");
        tooltip.style.cssText = `
            left: ${startX}px,
            top: ${startY}px;
        `
        tooltip.classList.add('tooltip-container');
        tooltip.textContent = currentElement.dataset.tooltip

        currentElement.insertAdjacentElement('beforeend', tooltip);

        const onMouseOutHandler = e => {
            tooltip.remove();
            return;
        }

        const onMouseMoveHandler = e => {
            let currentElement = e.target; /*@type {HTMLElement} */
            if (currentElement.tagName !== 'BUTTON') {
                currentElement = currentElement.closest('button');
            };
            let childs = Array.from(currentElement.children).map(e => Array.from(e.classList));

            if (!childs.some(e => e.includes('tooltip-container'))) return;

            let x = e.pageX + 10, /*@type {Number} */
                y = e.pageY + 10; /*@type {Number} */

            let tooltip = currentElement.querySelector('.tooltip-container') /*@type {HTMLDivElement} */
            let styles = getComputedStyle(tooltip);

            if (x + parseInt(styles.width) > document.body.clientWidth) {
                x -= parseInt(styles.width) + 10;
            }

            if (x < 0) {
                x += parseInt(styles.width) + 10;
            }

            if (y + parseInt(styles.height) > window.innerHeight + window.scrollY) {
                y -= parseInt(styles.height) + 10;
            }
            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';

        }

        currentElement.addEventListener('mousemove', onMouseMoveHandler);
        currentElement.addEventListener('mouseout', onMouseOutHandler);

    }

    return (
        <li
            className="currency"
            onMouseOver={e => onMouseOverHandler(e)}
        >
            <Link
                to={`/chosen/${props.currency.CharCode}`}
            >
                <button
                    className="currency-open_button"
                    data-tooltip={props.currency.Name}
                >
                    <span>
                        {props.currency.CharCode}
                    </span>
                    <span>
                        {(props.currency.Value / props.currency.Nominal).toFixed(3)}
                    </span>
                    <br />
                    <span
                        className={props.diff < 0 ? 'less' : 'great'}
                    >
                        {
                            props.diff.toFixed(3)
                        }
                    </span>
                </button>
            </Link>
        </li>
    )
}