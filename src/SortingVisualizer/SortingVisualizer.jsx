import React, {Component} from 'react';
import './SortingVisualizer.css';
import {mergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import {bubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.js';
import {selectionSortAnimations} from '../SortingAlgorithms/SelectionSort.js';
import {quickSortAnimations} from '../SortingAlgorithms/QuickSort.js';
import {heapSortAnimations} from '../SortingAlgorithms/HeapSort.js';
import {insertionSortAnimations} from '../SortingAlgorithms/InsertionSort.js';
import {countingSortAnimations} from '../SortingAlgorithms/CountingSort.js';
import {radixSortAnimations} from '../SortingAlgorithms/RadixSort.js';

const MAX_ELEMENT = 500;

const MIN_ELEMENT = 5;

const DELAY_TIME = 20;

const BUTTON_LIST = [
						"buttonMerge", "buttonSelection", "buttonQuick",
						"buttonBubble", "buttonInsertion", "buttonRadix",
						"buttonCounting", "buttonHeap", "buttonUser", "buttonSort"
					];

var animations, frames, sort_type;

export default class SortingVisualizer extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			array: [],
			size: 0,
		};
	}

	componentDidMount()
	{
		this.resetArray();
		const button = document.getElementById("buttonSort");
		button.style.display = "none";
	}

	resetArray(size=60)
	{
		const array = [];
		for(let i = 0; i <= size; i++)
			array.push(randomint(MIN_ELEMENT, MAX_ELEMENT));
		this.setState({array: array, size: size});
		this.changeColor('cyan');
	}

	userDefinedArray()
	{
		const input = document.getElementById("user-array").value;
		const arr = input.split(" ");
		const answer = [];
		for(let i = 0; i < arr.length; i++)
		{
			const temp = parseInt(arr[i]);
			console.log(temp);
			if(!isNaN(temp))
			{
				if(temp < MIN_ELEMENT)
					answer.push(MIN_ELEMENT);
				else if(temp > MAX_ELEMENT)
					answer.push(MAX_ELEMENT);
				else
					answer.push(temp);
			}
			else
			{
				this.resetArray();
				return;
			}
		}
		console.log(answer);
		this.setState({array: answer, size: answer.length});
		console.log(this.state.array);
		this.changeColor('cyan');
	}

	deactivate()
	{
		for(let i = 0; i < BUTTON_LIST.length; i++)
		{
			const button = document.getElementById(BUTTON_LIST[i]);
			button.classList.remove("active");
		}
	}
	
	mergeSort()
	{
		animations = mergeSortAnimations(this.state.array.slice());
		frames = 3;
		this.deactivate();
		const button = document.getElementById("buttonMerge");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	bubbleSort()
	{
		animations = bubbleSortAnimations(this.state.array.slice());
		frames = 4;
		this.deactivate();
		const button = document.getElementById("buttonBubble");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	selectionSort()
	{
		animations = selectionSortAnimations(this.state.array.slice());
		frames = 4;
		this.deactivate();
		const button = document.getElementById("buttonSelection");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	quickSort()
	{
		animations = quickSortAnimations(this.state.array.slice());
		frames = 4;
		this.deactivate();
		const button = document.getElementById("buttonQuick");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	heapSort()
	{
		animations = heapSortAnimations(this.state.array.slice());
		frames = 4;
		this.deactivate();
		const button = document.getElementById("buttonHeap");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	insertionSort()
	{
		animations = insertionSortAnimations(this.state.array.slice());
		frames = 3;
		this.deactivate();
		const button = document.getElementById("buttonInsertion");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 1;
	}

	countingSort()
	{
		animations = countingSortAnimations(this.state.array.slice());
		this.deactivate();
		const button = document.getElementById("buttonCounting");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 0;
	}

	radixSort()
	{
		animations = radixSortAnimations(this.state.array.slice());
		this.deactivate();
		const button = document.getElementById("buttonRadix");
		button.classList.add("active");
		this.activate_sort_button();
		sort_type = 0;
	}

	activate_sort_button()
	{
		const button = document.getElementById("buttonSort");
		button.style.display = "inline";
	}

	playAnimations()
	{
		sort_type == 0 ? this.playAnimations_n_algo(): this.playAnimations_nlogn_and_n2_algo();
	}

	playAnimations_n_algo()
	{
		const bars = document.getElementsByClassName("array-bar");
		const length = animations.length;
		const original_length = bars.length;
		var delay_multiplier = 0;
		var parity = 0;
		for(let i = 0; i < length; i++)
		{
			if(i % original_length === 0)
				parity = 1 - parity;
			if(parity & 1)
			{
				setTimeout(() => {
		        	var valueStyle = bars[i % original_length].style;
					valueStyle.backgroundColor = 'red';
					}, delay_multiplier++ * DELAY_TIME);
				setTimeout(() => {
		        	var valueStyle = bars[i % original_length].style;
					valueStyle.backgroundColor = 'cyan';
					}, delay_multiplier++ * DELAY_TIME);
				continue;
			}
            setTimeout(() => {
                    const [newvalue, newheight] = animations[i];
                    var valueStyle = bars[newvalue].style;
                    valueStyle = bars[newvalue].style;
                    valueStyle.backgroundColor = 'green';
                    valueStyle.height = `${newheight}px`;
                }, delay_multiplier++ * DELAY_TIME);
            setTimeout(() => {
                    const [newvalue, newheight] = animations[i];
                    var valueStyle = bars[newvalue].style;
                    valueStyle = bars[newvalue].style;
                    valueStyle.backgroundColor = 'cyan';
                    valueStyle.height = `${newheight}px`;
                }, delay_multiplier++ * DELAY_TIME);
		}
		setTimeout(() => {
			this.changeColor('blue');
		}, DELAY_TIME * delay_multiplier);
	}

	playAnimations_nlogn_and_n2_algo()
	{
		const length = animations.length;
		var button;
		for(let i = 0; i < BUTTON_LIST.length; i++)
		{
			button = document.getElementById(BUTTON_LIST[i]);
			button.disabled = true;
		}
		for(let i = 0; i < length; i++)
		{
			const bars = document.getElementsByClassName("array-bar");
			if(i % frames <= 1)
			{
                const [valueOne, valueTwo] = animations[i];
                const valueOneStyle = bars[valueOne].style;
                const valueTwoStyle = bars[valueTwo].style;
				const color = (i % frames === 0)? 'red': 'cyan';
				setTimeout(() => {
						valueOneStyle.backgroundColor = color;
						valueTwoStyle.backgroundColor = color;
					}, i * DELAY_TIME);
				continue;
			}
            setTimeout(() => {
                    const [newvalue, newheight] = animations[i];
                    var valueOneStyle = bars[newvalue].style;
                    valueOneStyle = bars[newvalue].style;
                    valueOneStyle.height = `${newheight}px`;
                }, i * DELAY_TIME);
		}
		setTimeout(() => {
			this.changeColor('blue');
			for(let i = 0; i < BUTTON_LIST.length; i++)
			{
				button = document.getElementById(BUTTON_LIST[i]);
				button.disabled = false;
			}
			button.style.display = "none";
			this.deactivate();
		}, DELAY_TIME * (length+1));
	}

	changeColor(color)
	{
		const bars = document.getElementsByClassName("array-bar");
		for(let i = 0; i < bars.length; i++)
			bars[i].style.backgroundColor = color;
	}

	render()
	{
		const{array} = this.state;
		return (
			<div>
				<div className="nav-bar">
					<button id="buttonGenerate"
						onClick={() => this.resetArray()}
						className="buttons bouncy"
					>
						Generate a random Array
					</button>
					<button style={{animationDelay:0.07+'s'}} id="buttonMerge"
						onClick={() => this.mergeSort()}
						className="buttons bouncy"
					>
						MergeSort
					</button>
					<button style={{animationDelay:0.14+'s'}} id="buttonSelection"
						onClick={() => this.selectionSort()}
						className="buttons bouncy"
					>
						SelectionSort
					</button>
					<button style={{animationDelay:0.21+'s'}} id="buttonBubble"
						onClick={() => this.bubbleSort()}
						className="buttons bouncy"
					>
						BubbleSort
					</button>
					<button style={{animationDelay:0.28+'s'}} id="buttonQuick"
						onClick={() => this.quickSort()}
						className="buttons bouncy"
					>
						QuickSort
					</button>
					<button style={{animationDelay:0.35+'s'}} id="buttonHeap"
						onClick={() => this.heapSort()}
						className="buttons bouncy"
					>
						HeapSort
					</button>
					<button style={{animationDelay:0.42+'s'}} id="buttonInsertion"
						onClick={() => this.insertionSort()}
						className="buttons bouncy"
					>
						InsertionSort
					</button>
					<button style={{animationDelay:0.49+'s'}} id="buttonCounting"
						onClick={() => this.countingSort()}
						className="buttons bouncy"
					>
						CountingSort
					</button>
					<button style={{animationDelay:0.56+'s'}} id="buttonRadix"
						onClick={() => this.radixSort()}
						className="buttons bouncy"
					>
						RadixSort
					</button>
					<button id="buttonSort"
						onClick={() => this.playAnimations()}
						className="buttons"
					>
						Sort
					</button>
				</div>
				<div className="array-input">
					<input type="text" placeholder="Give an array" id="user-array"/>
					<button id="buttonUser"
						onClick={() => this.userDefinedArray()}
						className="buttons">
							Visualize
					</button>
				</div>
				<div className="array-container">
					{array.map((value, index) => (
						<div className="array-bar" style={{height: `${value}px`}} key={index}>
						</div>
					))}
				</div>
			</div>
		);
	}
}

function randomint(min, max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}
