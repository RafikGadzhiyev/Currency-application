import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChosenCurrency from './components/ChosenCurrency';
import Main from './components/Main';
import { CurrencyContext } from './context/currency.context'
import { CircularProgress } from "@mui/material";

function App() {
	const [currencyState, setCurrencyState] = useState(null);
	const [chosenCurrency, setChosenCurrency] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const state = {
		currencyState, setCurrencyState, 
		chosenCurrency, setChosenCurrency,
		isLoading, setIsLoading
	}

	useEffect(() => {
		setIsLoading(() => true);
			fetch('https://www.cbr-xml-daily.ru/daily_json.js')
			.then(response => {
				if(response.ok){
					response.json()
					.then(result => {
						setCurrencyState(() => result)
						setIsLoading(() => false);
					})
				}
			})
		
	}, [])

	return (
		<CurrencyContext.Provider
			value = {state}
		>
			{
				isLoading && 
				<CircularProgress
					sx ={{
						position: 'absolute',
						top: '50%',
						left:'50%',
						transform: 'translate(-50%, -50%)'
					}}
				/>

			}

			{
				!isLoading &&
				<Router>
				<div className="App">
					<Routes>
						<Route
							path ='/'
							element = {<Main/>}
						/>
						<Route
							path = '/chosen/:currencyName'
							element = {<ChosenCurrency/>}
						/>
					</Routes>
				</div>
			</Router>
			}
		</CurrencyContext.Provider>
	);
}

export default App;
