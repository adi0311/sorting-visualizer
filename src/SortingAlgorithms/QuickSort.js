export function quickSortAnimations(array)
{
	const animations = [];
	const low = 0;
	const high = array.length - 1;
	quickSort(array, low, high, animations);
	return animations;
}


function quickSort(arr, low, high, animations)
{
	if(low >= high)
		return;
	const partition_index = partition(arr, low, high, animations);
	quickSort(arr, low, partition_index-1, animations);
	quickSort(arr, partition_index+1, high, animations);
	return arr;
}

function partition(arr, low, high, animations)
{
	var par_index = low;
	var par_element = arr[high];
	for(let i = low; i < high; i++)
	{
		animations.push([i, par_index]);
		animations.push([i, par_index]);
		if(arr[i] < par_element)
		{
			animations.push([i, arr[par_index]]);
			animations.push([par_index, arr[i]]);
			const temp = arr[i];
			arr[i] = arr[par_index];
			arr[par_index] = temp;
			par_index += 1;
			continue;
		}
		animations.push([i, arr[i]]);
		animations.push([par_index, arr[par_index]]);
	}
	animations.push([par_index, high]);
	animations.push([par_index, high]);
	animations.push([par_index, arr[high]]);
	animations.push([high, arr[par_index]]);
	const temp = arr[par_index];
	arr[par_index] = arr[high];
	arr[high] = temp;
	return par_index;
}
