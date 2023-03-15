import { Sorter } from "./interfaces";
const fs = require("fs")
export class DefaultSorter implements Sorter {
  timed_sort(array: number[]): { array: number[]; milliseconds: number } {
    let start = Date.now();
    let temp = this.sort(array);
    let end = Date.now();
    return { array: temp, milliseconds: end - start };
  }
  sort(array: number[]): number[] {
    // TODO: use the default array sort method
    return array.sort((a,b) => {return a - b})
    throw new Error("Method not implemented.");
  }
  shuffle(array: number[]): number[] {
    // https://stackoverflow.com/a/2450976
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}

export class DefaultSorterTimeLogger extends DefaultSorter {
  override timed_sort(array: number[]): {
    array: number[];
    milliseconds: number;
  } {
    let temp = super.timed_sort(array);
    // TODO: log the sorting time to console
    console.log(temp.milliseconds)
    return temp;
  }
}

export class BubbleSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[]): number[] {
    // TODO: implement bubblesort
    let noSwaps;
    for (let i = array.length; i > 0; i--) {
        noSwaps = true;
        for (let j = 0; j < i - 1; j++) {
            if (array[j + 1] < array[j]) {
                // Swap
                [array[j + 1], array[j]] = [array[j], array[j + 1]];
                // Make 'noSwaps' false
                noSwaps = false;
            }
        }
        // End the iterations if there were no swaps made in one full pass
        if (noSwaps) {
            break;
        }
    }
    return array;
    throw new Error("Method not implemented.");
  }
}

export class QuickSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[], left: number = 0, right: number = array.length-1): number[] {
    // TODO: implement quicksort
    // Base case is that the left and right pointers don't overlap, after which we'll be left with an array of 1 item
    if (left < right) {
      let pivotIndex = this.partition(array, left, right);
    
      // For left subarray, which is everything to the left of the pivot element
      this.sort(array, left, pivotIndex - 1);
    
      // For the right sub array, which is everything to the right of the pivot element
      this.sort(array, pivotIndex + 1, right);
  }
  // Return the array, when it's of length 1 i.e, left === right
  return array;
    throw new Error("Method not implemented.");
  }
  private partition(array: number[], start: number = 0, end: number = array.length - 1) {
    // Let's choose the pivot to be the array[start] element
    let pivot = array[start];
    let swapIdx = start;

    for (let i = start + 1; i <= end; i++) {
        if (array[i] < pivot) {
            swapIdx++;
            // Swap current element with the element at the new pivot index
            [array[i], array[swapIdx]] = [array[swapIdx], array[i]];
        }
    }
  
    // Swap the pivot element with the element at the pivotIndex index
    [array[swapIdx], array[start]] = [array[start], array[swapIdx]];
  
    // Return the index of the pivot element after swapping
    return swapIdx;
}
}

export class BogoSorter extends DefaultSorterTimeLogger {
  sort(array: number[]): number[] {
    // TODO: implement Bogosort
    return this._sort(array)
    throw new Error("Method not implemented.");
  }

   private _sort(array: number[]): number[] {
    var sorted = false;
        while(!sorted){
            array = this.shuffle(array);
            sorted = this.isSorted(array);
        }
        return array;
  }

  private isSorted(array: number[]) {
    for(var i = 1; i < array.length; i++){
      if (array[i-1] > array[i]) {
          return false;
      }
  }
  return true;

  }

  shuffle(array: number[]): number[] {
    var count = array.length, temp: number, index: number;

        while(count > 0){
            index = Math.floor(Math.random() * count);
            count--;

            temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
      return array;
  }
}

// this sorter does the parent sort and also dumps the result to file
export class BogoSorterTimeFileDumper extends BogoSorter {
  override timed_sort(array: number[]): {
    array: number[];
    milliseconds: number;
  } {
    // TODO: log the sorting time to file
    // https://nodejs.dev/en/learn/writing-files-with-nodejs/
    const temp = super.timed_sort(array)
    try {
      fs.writeFileSync('./bogotime.txt', temp.milliseconds.toString());
      // file written successfully
    } catch (err) {
      console.error(err);
    }
    return temp;
    throw new Error("Method not implemented.");
  }
}
