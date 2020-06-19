export function bubbleSortAnimations(array)
{
	const animations = [];
	bubbleSort(animations, array);
	return animations;
}

function bubbleSort(animations, arr)
{
	const len = arr.length;
	for(let i = 0; i < len-1; i++)
	{
		for(let j = 0; j < len-i-1; j++)
		{
			animations.push([j, j+1]);
			animations.push([j, j+1]);
			if(arr[j] > arr[j+1])
			{
				animations.push([j+1, arr[j]]);
				animations.push([j, arr[j+1]]);
				const temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				continue;
			}
			animations.push([j, arr[j]]);
			animations.push([j+1, arr[j+1]]);
		}
	}
}
