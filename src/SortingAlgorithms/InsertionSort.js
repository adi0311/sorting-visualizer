export function insertionSortAnimations(array)
{
	const animations = [];
	insertionSort(array, animations);
	return animations;
}

function insertionSort(array, animations)
{
	const length = array.length;
	for(let i = 1; i < length; i++)
	{
		const temp = array[i];
		var j = i-1;
		while(j >= 0 && array[j] > temp)
		{
			animations.push([i, j+1]);
			animations.push([i, j+1]);
			animations.push([j+1, array[j]]);
			array[j+1] = array[j];
			j--;
		}
		animations.push([j+1, j+1]);
		animations.push([j+1, j+1]);
		animations.push([j+1, temp]);
		array[j+1] = temp;
	}
}
