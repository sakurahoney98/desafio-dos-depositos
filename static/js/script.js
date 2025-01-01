


const table = document.getElementById('numbers').getElementsByTagName('tbody')[0];
const divSort = document.getElementById('sort-numbers');
const divAlter = document.getElementById('alter-goal');
const divBox = document.getElementById('box');
const columns = 10;
const textReal = document.getElementById('real').getElementsByTagName('h1')[0];
const textDeposits = document.getElementById('deposits').getElementsByTagName('h1')[0];
const textRemaining = document.querySelector('th');
const messageBox = document.querySelector('.message');
const buttonMark = document.querySelector('#btn-mark');
const lastSorteds = document.querySelector('#last-sorteds').querySelectorAll('h3')[1];
let goal = 0;
let deposits = 0;
let remaining = 0;
let maxDeposits = 0;
let arrayDeposited = [];


fetch('/goal', {
		method: 'POST',
		
				}).then(response => response.json()) // Converte a resposta para JSON
	.then(data => {

		goal = parseInt(data.deposits_value[0][1]);
		deposits = parseInt(data.deposits_value[0][2]);
		remaining = deposits - parseInt(data.deposits_value[1]) ;
		console.log(goal)
		console.log(deposits)
		console.log(remaining)

		atualizeGoalReal(goal)
		textRemaining.innerHTML = "Restantes: " + remaining;
		textDeposits.innerHTML = deposits;





				
		
	})

	fetch('/atualized', {
		method: 'POST',
		
				}).then(response => response.json()) // Converte a resposta para JSON
	.then(data => {

		arrayDeposited = data.deposited_numbers.flat();
		setTimeout(function(){
atualizeTable();

		},1000)
		
	})

buttonMark.disabled = true;
lastSorteds.innerHTML = sessionStorage.getItem('last_sorteds') ? sessionStorage.getItem('last_sorteds') : " - "









function atualizeData(){
	

	
		


		let percentDeposited = (deposits - remaining)/deposits;

		percentDeposited *= 100;

		percentDeposited = parseInt(percentDeposited);

		const divBarProgress = document.getElementById('bar-progress');

		divBarProgress.style.width = divBarProgress.innerHTML = percentDeposited + "%"
	
	


}


//Incrementação da table

function atualizeTable(){


	let currentPosition = 0;
	let currentLine = 0;

	
	//table.innerHTML = " ";
	//table.innerHTML = "<tr><th colspan='" + columns + "'>Restantes: " + remainingValues() + "</th></tr>";
	



	while(currentPosition < deposits){
		let line = document.createElement('tr')
		line.id = 'line-' + currentLine;
		table.appendChild(line);
		let savePosition = 0;

		for(let i = 0; i < columns && currentPosition < deposits; i++, currentPosition++){

			let column = document.createElement('td');
			let id = currentPosition + 1;
			column.id = id;
			column.innerHTML = '<td><button onclick="actionButton(' + id + ')">' + id + '</button></td>';
		
			if (arrayDeposited.includes(id)){
				column.className = 'deposited'
			}
			line.appendChild(column);


			savePosition = i;
		}
		if(savePosition < (columns - 1)){
			for(let j = 1; j < (columns - savePosition); j++){

				line.appendChild(document.createElement('td'))

			}
		}

		currentLine++;


	}
	
	
	atualizeData();
	

}






function actionButton(id){
	let column = document.getElementById(id);

	console.log('remaining: ' + remaining)

	if(column.className === 'deposited'){
		if(confirm("O valor selecionado está com o status de depositado, deseja remover essa informação?")){
			column.className = '';
			atualizeDataBase(id, 'false');
			arrayDeposited.splice(arrayDeposited.indexOf(id))
			remaining += 1;
		}

	}else{

		column.className = 'deposited';
		atualizeDataBase(id, 'true');
		arrayDeposited.push(id);
		remaining -= 1;
	}

	
	textRemaining.innerHTML = 'Restantes: ' + remaining;
	atualizeData();
}

function atualizeDataBase(id, status){
	const formData = new FormData();
	formData.append('number', id);
	formData.append('status', status);

	fetch('/deposited', {
		method: 'POST',
		body: formData
	})
}



function openSort(){
	
	divBox.style.display = 'flex';
	divSort.style.display = 'block';  
	divAlter.style.display = 'none';



}

function openAlter(){
	
	divBox.style.display = 'flex';
	divSort.style.display = 'none';  
	divAlter.style.display = 'block';



}

function closePopUp(){

	
	divBox.style.display = 'none';


}

function atualizeGoal(type){

	


	
	let valueSelect = document.getElementById('type-select').value;
	let valueInput = document.getElementById('new-goal').value;
	let real = 0;
	let maxDeposits = 0;
	let sum = 0;



	
	

	if(valueSelect === 'value'){
		real = valueInput;
		for(let i = 1; sum < real;i++){
			sum += i;
			maxDeposits = i;
		}

	}else{
		maxDeposits = valueInput;

		for(let j = 1; j <= maxDeposits; j++){
			real += j;
		}

	}

	
	

	const formData = new FormData();
	formData.append('deposits', maxDeposits);
	formData.append('value', real);
	formData.append('type', type);

	fetch('/alter', {
		method: 'POST',
		body: formData
	})
setTimeout(function(){
	location.reload();
},1000)


}

function atualizeGoalReal(real){
	let newReal = real.toString();
	let aux = newReal;
	let decimalValues = [];

	while (aux.length > 3){
		let max = aux.length;
		decimalValues.push(aux.substring(max - 3, max))

		

		aux = aux.substring(0, max - 3);

		


	}
	newReal = aux;
	
	for(let k = decimalValues.length - 1; k >= 0; k--){
		newReal += '.' + decimalValues[k];
	}

	textReal.textContent = 'R$ ' + newReal + ',00'

}

function sortNumbers(){

	const formData = new FormData();
	formData.append('value-real', document.getElementById('value-real').value);
	console.log(document.getElementById('value-real').value)
	fetch('/sort', {
		method: 'POST',
		body: formData
				}).then(response => response.json()) // Converte a resposta para JSON
	.then(data => {

		messageBox.innerHTML = data.sorted_numbers.join(' - ');
		console.log(messageBox.innerHTML !== "")
		buttonMark.disabled = messageBox.innerHTML === "";
		sessionStorage.setItem('last_sorteds', messageBox.innerHTML);

		lastSorteds.innerHTML = messageBox.innerHTML;

		
		
	})



}

function markTable(){



	let numbersToMark = messageBox.innerHTML.replace(/\s+/g, '').split('-').map(Number);

	arrayDeposited.push(numbersToMark);

	const formData = new FormData();
	formData.append('numbers', JSON.stringify(numbersToMark));
	
	fetch('/serie', {
		method: 'POST',
		body: formData
	})

	setTimeout(function(){

		window.location.reload();

	}, 1000)




}