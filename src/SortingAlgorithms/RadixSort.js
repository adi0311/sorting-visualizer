export function radixSortAnimations(array)
{
	const animations = []
	radixSort(array, animations)
	return animations;
}

function countingSort(array, animations, div, length)
{

	const count = Array(length);
	const answer = Array(length);
	var digit;
	count.fill(0);
	for(let i = 0; i < length; i++)
	{
		animations.push(i);
		digit = Math.floor(array[i] / div) % 10;
		count[digit]++;
	}
	for(let i = 1; i < 10; i++)
		count[i] += count[i-1];
	for(let i = length-1; i >= 0; i--)
	{
		digit = Math.floor(array[i] / div) % 10;
		count[digit]--;
		animations.push([count[digit], array[i]])
		answer[count[digit]] = array[i];
	}
	return answer;
}

function radixSort(array, animations)
{
	var i = 1;
	const length = array.length;
	const maximum_value = Math.max(...array);
	while(Math.floor(maximum_value / i) > 0)
	{
		array = countingSort(array, animations, i, length);
		i *= 10;
	}
}
