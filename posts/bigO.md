---
title: The BigO
meta: Big O notation is a fundamental concept in computer science and software engineering, particularly in the world of JavaScript.
slug: bigO
---

## What is it?

Big O notation is a fundamental concept in computer science and software engineering, particularly in the world of JavaScript. It is a way of measuring the efficiency of an algorithm and predicting its behavior as the input size increases. Big O notation is represented as a mathematical function of the input size, typically denoted as "n", that describes how the number of operations performed by the algorithm scales with the input size.

## Why do you need to understand it? 

One of the significant advantages of Big O notation in JavaScript development is that it helps developers identify performance issues in their code. Even minor inefficiencies can add up to significant delays in loading and processing times, which can affect user experience. By understanding the Big O notation of their code, developers can pinpoint the most time-consuming operations and focus on optimizing them. 

Furthermore, it can also help developers choose the best algorithms and data structures for a given problem. Different algorithms and data structures have different time complexities, and selecting the most appropriate one is crucial to achieving the best performance. Big O notation enables developers to determine the most efficient approach to solve a problem.


**There are many other time complexities, but these are some of the most common ones used in Big O notation to describe the performance of algorithms:**

- O(1)
- O(n)
- O(log n) 
- O(n<sup>2</sup>)
- O(2<sup>n</sup>)
- O(n log n)

Here is a great graph to picture it: ![graph](https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png)
## O(1)
Operations with constant time complexity take the same amount of time to complete regardless of the input size.

__*An example of this would be accessing an element in an array by index.*__


```
const arr = [1, 2, 3, 4, 5];
const firstElement = arr[0]; 
```

Accessing the first element of the array using the index 0 takes the same amount of time regardless of the size of the array, since the index calculation is constant time, making the time complexity O(1).

## O(n)
Operations with linear time complexity have a running time that is directly proportional to the input size.

__*An example of this would be searching an unsorted array for a specific value.*__


```
function bigO(array) {
  let sum = 0;
  let product = 1;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  for (let i = 0; i < array.length; i++) {
    product *= array[i];
  }
  console.log(sum + ", " + product);
}
```

It's important to note that the fact that this function uses an array twice doesn't matter. What's different here is that something is *happening* to the variable after iterating through it- adding or multiplying it into the array. 

Since both loops iterate over all n elements of the array, the time complexity of each loop is O(n). Therefore, the overall time complexity of the function is O(n) + O(n) = O(2n), which is simplified to O(n).

## O(log n) 
Operations with logarithmic time complexity have a running time that is proportional to the square of the input size.

__*An example of this would be a binary search where we compare all elements in the array*__

```
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // target not found
}
```

This one uses a little bit more math. The algorithm works by dividing the search space in half at each iteration. In each iteration, the algorithm checks whether the middle element of the search space is equal to the target value or not. If the middle element is equal to the target value, the search is successful and the algorithm returns the index of the middle element. Otherwise, the search space is divided in half again, and the algorithm continues searching in the appropriate half. 

This process is repeated until the target value is found or the search space is empty. Since the search space is divided in half at each iteration, the number of iterations required to find the target value grows logarithmically with the size of the input array.

It takes up more time than a linear time complexity since we are doing something but not as much as a constant because we don't have to go through each element. 


## O( n<sup>2</sup> )
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

The outer loop iterates n times where n is the length of the array arr. For each iteration of the outer loop, the inner loop also iterates n times, giving a total of n*n or n<sup>2</sup> iterations. Therefore, the time complexity of this code is O(n<sup>2</sup>).

## O(2<sup>n</sup>)
Operations with exponential time complexity have a running time that grows as the input size grows, and is not good. 

__*An example of this would be the recursive Fibonacci function.*__

```
function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
```

In this example, the number of function calls doubles with each increase in n. For example, if we call fibonacci(5), the function will be called a total of 15 times. 

Why? 

```
fibonacci(5) = fibonacci(4) + fibonacci(3)
              = (fibonacci(3) + fibonacci(2)) + (fibonacci(2) + fibonacci(1))
              = ((fibonacci(2) + fibonacci(1)) + (fibonacci(1) + fibonacci(0))) + ((fibonacci(1) + fibonacci(0)) + 1)
              = (((fibonacci(1) + fibonacci(0)) + 1) + 1) + ((1 + 0) + 1)
              = (((1 + 0) + 1) + 1) + 2
              = 5
```

The final output of calling fibonacci(5) is 5, which is the 5th number in the Fibonacci sequence.


If we call fibonacci(10), where the 10th number is 55, the function will be called a total of 1,023 times. As n gets larger, the time required to compute the result grows *very* quickly.

> A more efficient approach is to use an iterative algorithm or a memorized recursive algorithm which stores previously computed values in an array or object to avoid redundant calculations.

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

Merge sort is a sorting algorithm that works by dividing an array into smaller and smaller pieces, sorting those pieces, and then combining them back together. It does this recursively until the entire array is sorted.

Each time the array is divided into smaller pieces, it takes O(n) time to split the array into two halves. Since this happens recursively, the total time complexity for dividing the array is O(log n).

Then, each time two sorted arrays are combined back together, it takes O(n) time to compare and merge the two arrays into one sorted array. Since this happens for every pair of arrays that are combined, the total time complexity for combining all the arrays is O(n log n).

## The moral of the story...
There are endless ways to solve algorithms and data structures but it's important to keep in mind that some ways are better than others. Practice those Leetcode and HackerRank challenges until you can do them. Then practice them again until you can do them better. 