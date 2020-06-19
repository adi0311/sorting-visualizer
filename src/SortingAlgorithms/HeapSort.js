export function heapSortAnimations(array)
{
	const animations = [];
	const length = array.length;
	heapSort(array, animations, length);
	return animations;
}

function leftChild(parent)
{
	return parent * 2 + 1;
}

function rightChild(parent)
{
	return parent * 2 + 2;
}

function heapify(array, index, animations, length)
{
	const left = leftChild(index);
	const right = rightChild(index);
	var largest_index = index;
	if(left < length && array[left] > array[largest_index])
		largest_index = left;
	if(right < length && array[right] > array[largest_index])
		largest_index = right;
	if(largest_index !== index)
	{
		animations.push([index, largest_index]);
		animations.push([index, largest_index]);
		animations.push([index, array[largest_index]]);
		animations.push([largest_index, array[index]]);
		const temp = array[largest_index];
		array[largest_index] = array[index];
		array[index] = temp;
		heapify(array, largest_index, animations, length);
	}
}

function heapSort(array, animations, length)
{
	const mid = Math.floor(length/2)-1;
	for(let i = mid; i >= 0; i--)
		heapify(array, i, animations, length);
	for(let i = length-1; i > 0; i--)
	{
		animations.push([0, i]);
		animations.push([0, i]);
		animations.push([0, array[i]]);
		animations.push([i, array[0]]);
		const temp = array[i];
		array[i] = array[0];
		array[0] = temp;
		heapify(array, 0, animations, i);
	}
}
