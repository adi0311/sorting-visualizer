export function selectionSortAnimations(array)
{
	const animations = [];
	selectionSort(array, animations);
	return animations;
}


function selectionSort(array, animations)
{
	const n = array.length;
	for(let i = 0; i < n-1; i++)
	{
		for(let j = i+1; j < n; j++)
		{
			animations.push([i, j]);
			animations.push([i, j]);
			if(array[i] > array[j])
			{
				animations.push([i, array[j]]);
				animations.push([j, array[i]]);
				const temp = array[j];
				array[j] = array[i];
				array[i] = temp;
				continue;
			}
			animations.push([i, array[i]]);
			animations.push([j, array[j]]);
		}
	}
}
