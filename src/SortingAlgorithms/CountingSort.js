export function countingSortAnimations(array)
{
	const animations = [];
	countingSort(array, animations);
	return animations;
}

function countingSort(array, animations)
{
	const length = array.length;
	const max_element = Math.max(...array);
	const count = Array(max_element+1);
	const answer = Array(array.length);
	count.fill(0);
	for(let i = 0; i < length; i++)
	{
		animations.push(i);
		count[array[i]]++;
	}
	for(let i = 1; i <= max_element; i++)
		count[i] += count[i-1];
	for(let i = length-1; i >= 0; i--)
	{
		count[array[i]] -= 1;
		answer[count[array[i]]] = array[i];
		animations.push([count[array[i]], array[i]]);
	}
	console.log(answer);
}
