---
title: The BigO
meta: Big O notation is a fundamental concept in computer science and software engineering, particularly in the world of JavaScript.
slug: bigO
---

# The Big O
## What is it?

Big O notation is a fundamental concept in computer science and software engineering, particularly in the world of JavaScript. It is a way of measuring the efficiency of an algorithm and predicting its behavior as the input size increases. Big O notation is represented as a mathematical function of the input size, typically denoted as "n", that describes how the number of operations performed by the algorithm scales with the input size.

## Why do you need to understand it? 

One of the significant advantages of Big O notation in JavaScript development is that it helps developers identify performance issues in their code. Even minor inefficiencies can add up to significant delays in loading and processing times, which can affect user experience. By understanding the Big O notation of their code, developers can pinpoint the most time-consuming operations and focus on optimizing them. Furthermore, it can also help developers choose the best algorithms and data structures for a given problem. Different algorithms and data structures have different time complexities, and selecting the most appropriate one is crucial to achieving the best performance. Big O notation enables developers to determine the most efficient approach to solve a problem.


**There are many other time complexities, but these are some of the most common ones used in Big O notation to describe the performance of algorithms:**

- O(1)
- O(n)
- O(log n) 
- O(n^2)
- O(2^n)
- O(n log n)

Here is a great graph to picture it: ![graph](https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png)
## O(1)
Operations with constant time complexity take the same amount of time to complete regardless of the input size.

__*An example of this would be accessing an element in an array by index.*__


```
const arr = [1, 2, 3, 4, 5];
const firstElement = arr[0]; // Takes the same amount of time regardless of array size
```


## O(n)
Operations with linear time complexity have a running time that is directly proportional to the input size.

__*An example of this would be searching an unsorted array for a specific value.*__

```
const arr = [1, 2, 3, 4, 5];
const valueToFind = 4;

let index = -1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === valueToFind) {
    index = i;
    break;
  }
}
console.log(index); // Output: 3
```

## O(log n) 
Operations with quadratic time complexity have a running time that is proportional to the square of the input size.

__*An example of this would be comparing all elements in an array using nested loops.*__

```
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(`${arr[i]} compared to ${arr[j]}`);
  }
}
```

## O(n^2)
Operations with quadratic time complexity have a running time that is proportional to the square of the input size.

__*An example of this would be comparing all elements in an array using nested loops.*__

```
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    console.log(`${arr[i]} compared to ${arr[j]}`);
  }
}
```

## O(log n)
Operations with logarithmic time complexity have a running time that grows slowly as the input size grows.

__*An example of this would be performing a binary search on a sorted array.*__

```
const arr = [1, 2, 3, 4, 5];
const valueToFind = 4;

let low = 0;
let high = arr.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === valueToFind) {
    console.log(mid); // Output: 3
    break;
  } else if (arr[mid] < valueToFind) {
    low = mid + 1;
  } else {
    high = mid - 1;
  }
}
```

## O(n log n) 
Operations with log-linear time complexity have a running time that grows slightly faster than logarithmic time complexity.

__*An example of this would be sorting an array using the mergesort algorithm.*__

```
function merge(left, right) {
  let sortedArr = [] // the sorted items will go here
  while (left.length && right.length) {
    // Insert the smallest item into sortedArr
    if (left[0] < right[0]) {
      sortedArr.push(left.shift())
    } else {
      sortedArr.push(right.shift())
    }
  }
  // Use spread operators to create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right]
}
merge([1, 4], [2, 6, 9]) // [1, 2, 4, 6, 9]
```

## The moral of the story...
There are endless ways to solve algorithms and data structures but it's important to keep in mind that some ways are better than others. Practice those Leetcode and HackerRank challenges until you can do them. Then practice them again until you can do them better. 