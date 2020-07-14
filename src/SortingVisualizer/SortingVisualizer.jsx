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
import {Dropdown, Menu, Input, Label, Button, Dimmer, Header, Icon, List, Divider, Message } from 'semantic-ui-react'


const MAX_ELEMENT = 500;

const MIN_ELEMENT = 10;

const DELAY_TIME = 20;

let animations, frames, sort_type;

export default class SortingVisualizer extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			array: [],
			size: 0,
			active: false,
			active1: false,
		};
	}

    handleOpenCode = () => this.setState({ active: true })

    handleCloseCode = () => this.setState({ active: false })

    handleOpenInput = () => this.setState({ active1: true })

    handleCloseInput = () => this.setState({ active1: false })

	componentDidMount()
	{
		this.resetArray();
	}

	resetArray(size=60)
	{
		const array = [];
		for(let i = 0; i <= size; i++)
			array.push(randomint(MIN_ELEMENT, MAX_ELEMENT));
		this.setState({array: array, size: size});
		this.changeColor('cyan');
		const button = document.getElementById("buttonSort");
		button.style.display = "none";
		const element = document.getElementById("arr-container");
		element.style.display = "none";
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
		const length = answer.length;
		if(answer.length < 5)
			for(let i = 0; i < 5-length; i++)
				answer.push(randomint(MIN_ELEMENT, MAX_ELEMENT));
		this.setState({array: answer, size: answer.length});
		this.changeColor('cyan');
	}
	
	mergeSort()
	{
		animations = mergeSortAnimations(this.state.array.slice());
		frames = 3;
		this.activate_sort_button();
		sort_type = 1;
	}

	bubbleSort()
	{
		animations = bubbleSortAnimations(this.state.array.slice());
		frames = 4;
		this.activate_sort_button();
		sort_type = 1;
	}

	selectionSort()
	{
		animations = selectionSortAnimations(this.state.array.slice());
		frames = 4;
		this.activate_sort_button();
		sort_type = 1;
	}

	quickSort()
	{
		animations = quickSortAnimations(this.state.array.slice());
		frames = 4;
		this.activate_sort_button();
		sort_type = 1;
	}

	heapSort()
	{
		animations = heapSortAnimations(this.state.array.slice());
		frames = 4;
		this.activate_sort_button();
		sort_type = 1;
	}

	insertionSort()
	{
		animations = insertionSortAnimations(this.state.array.slice());
		frames = 3;
		this.activate_sort_button();
		sort_type = 1;
	}

	countingSort()
	{
		animations = countingSortAnimations(this.state.array.slice());
		this.activate_sort_button();
		sort_type = 0;
	}

	radixSort()
	{
		animations = radixSortAnimations(this.state.array.slice());
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
		this.deactivate_sort_button();
		this.disableButtons();
		sort_type === 0 ? this.playAnimations_n_algo(): this.playAnimations_nlogn_and_n2_algo();
	}

	playAnimations_n_algo()
	{
		const bars = document.getElementsByClassName("array-bar");
		const length = animations.length;
		const original_length = bars.length;
		let delay_multiplier = 0;
		let parity = 0;
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
			this.changeColor('violet');
			this.ableButtons();
		}, DELAY_TIME * delay_multiplier);
	}

	deactivate_sort_button()
	{
		const button = document.getElementById("buttonSort");
		button.style.display = "none";
	}

	playAnimations_nlogn_and_n2_algo()
	{
		const length = animations.length;
		let button;
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
			this.changeColor('purple');
			this.ableButtons();
		}, DELAY_TIME * (length+1));
	}

	disableButtons()
	{
		const button_list = ["buttonGenerate", "Selector", "SizeSetter", "userdefinedarray"];
		for(let i = 0; i < button_list.length; i++)
		{
			document.getElementById(button_list[i]).style.pointerEvents = 'none';
		}
	}

	ableButtons()
	{
		const button_list = ["buttonGenerate", "Selector", "SizeSetter", "userdefinedarray"];
		for(let i = 0; i < button_list.length; i++)
		{
			document.getElementById(button_list[i]).style.pointerEvents = 'auto';
		}
	}

	changeColor(color)
	{
		const bars = document.getElementsByClassName("array-bar");
		for(let i = 0; i < bars.length; i++)
			bars[i].style.backgroundColor = color;
	}

	showTextArea()
	{
		const element = document.getElementById("arr-container");
		element.style.display = "block";
	}

	changeSize()
	{
		const element = document.getElementById("newSize").value;
		const temp = parseInt(element);
		console.log(temp);
		this.handleCloseInput();
		if(!isNaN(temp))
		{
			this.resetArray(temp);
			return;
		}
		this.resetArray();
	}

	render()
	{
		const{ array, active, active1 } = this.state;
		return (
			<div>
				<Menu inverted>
					<Menu.Item id="buttonGenerate"
						onClick={() => this.resetArray()}
						className="buttons bouncy"
					>
						Generate a random Array
					</Menu.Item>
					<Menu.Item className="buttons bouncy" id="Selector">
						<Dropdown text="Select Algo">
							<Dropdown.Menu>
								<Dropdown.Item
									onClick={() => this.mergeSort()}
									id="buttonMerge"
								>
									Merge Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.quickSort()}
									id="buttonQuick"
								>
									Quick Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.heapSort()}
									id="buttonHeap"
								>
									Heap Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.bubbleSort()}
									id="buttonBubble"
								>
									BubbleSort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.selectionSort()}
									id="buttonSelection"
								>
									Selection Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.insertionSort()}
									id="buttonInsertion"
								>
									Insertion Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.countingSort()}
									id="buttonCounting"
								>
									Counting Sort
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.radixSort()}
									id="buttonRadix"
								>
									Radix Sort
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
					<Menu.Item id="buttonSort"
						onClick={() => this.playAnimations()}
						className="buttons bouncy"
					>
						Sort
					</Menu.Item>
					<Menu.Item
						id="userdefinedarray"
						onClick={() => this.showTextArea()}
						className="buttons bouncy"
					>
						Custom Array
					</Menu.Item>
					<Menu.Item className="buttons bouncy">
						<div
							content='Show'
							onClick={this.handleOpenCode}
						>
							Color Code
						</div>

						<Dimmer active={active} onClickOutside={this.handleCloseCode} page>
							<Header as='h2' icon inverted>
								<Icon name='code' />
									Color Code
								<Header.Subheader>
									<Divider/>
									<List>
										<List.Item>
											<Label as="div" color='teal' tag>
												Unsorted Array
											</Label>
										</List.Item>
										<Divider/>
										<List.Item>
											<Label as="div" color='red' tag>
												Element Being Compared
											</Label>
										</List.Item>
										<Divider/>
										<List.Item>
											<Label as="div" color='purple' tag>
												Sorted Array
											</Label>
										</List.Item>
										<Divider/>
										<List.Item>
											<Label as="div" color='green' tag>
												Height Swap
											</Label>
										</List.Item>
									</List>
								</Header.Subheader>
							</Header>
						</Dimmer>
					</Menu.Item>
					<Menu.Item className="buttons bouncy">
						<div
							onClick={this.handleOpenInput}
							id="SizeSetter"
						>
							Set Size
						</div>

						<Dimmer active={ active1 } onClickOutside={ this.handleCloseInput } page>
						  	<Header as='h3' icon inverted>
								Enter size of Array
								<Header.Subheader>
									<Input
										action={{
											content: "Set Size",
											onClick: this.changeSize.bind(this),
										}}
										id="newSize"
									/>
								</Header.Subheader>
						  	</Header>
						</Dimmer>
					</Menu.Item>
				</Menu>
				<div className="array-input" style={{display: "none"}} id="arr-container">
					<Message info>
						<Message.Header>
							<Icon name="info"/>
							Custom Array
						</Message.Header>
						<p>
							Provide <strong>atleast 5 </strong>
							numbers separated by <strong>space </strong>
							between the range <strong>10 - 500</strong>
						</p>
					</Message>
					<Input
						fluid
						action={{
							content: "Visualize",
							onClick: this.userDefinedArray.bind(this),
						}}
						placeholder="Provide an array"
						id="user-array"
					/>
				</div>
				<div>
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
