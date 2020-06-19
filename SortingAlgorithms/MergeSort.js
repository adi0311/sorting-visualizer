export function mergeSortAnimations(array)
{
	const animations = [];
	const low = 0;
	const high = array.length-1;
	const AuxiliaryArray = array.slice();
	mergeSort(array, AuxiliaryArray, low, high, animations);
	return animations;
}


function mergeSort(arr, aux, low, high, animations)
{
	if(low === high)
		return;
	const mid = Math.floor((low + high) / 2);
	mergeSort(aux, arr, low, mid, animations);
	mergeSort(aux, arr, mid+1, high, animations);
	merge(arr, aux, low, mid, high, animations);
}

function merge(arr, aux, low, mid, high, animations)
{
	var i = low;
	var j = mid + 1;
	var k = low;
	while(i <= mid && j <= high)
	{
	    animations.push([i, j]);
	    animations.push([i, j]);
	    if(aux[i] <= aux[j])
	    {
	        animations.push([k, aux[i]])
	        arr[k++] = aux[i++];
	        continue;
	    }
	    animations.push([k, aux[j]]);
	    arr[k++] = aux[j++];
	}
	while(i <= mid)
	{
	    animations.push([i, i]);
	    animations.push([i, i]);
        animations.push([k, aux[i]])
	    arr[k++] = aux[i++];
	}
	while(j <= high)
	{
	    animations.push([j, j]);
	    animations.push([j, j]);
        animations.push([k, aux[j]])
	    arr[k++] = aux[j++];
	}
}
