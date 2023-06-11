---
title: Asynchronous JavaScript — Callback, Promise and Async-Await Functions
meta: The useEffect hook is an essential part of React hooks.
slug: async
---

While developing a dynamic web application, one of the primary challenges is making numerous AJAX calls. JavaScript, being a synchronous and single-threaded language, lacks the ability to automatically create and execute multiple threads in parallel, following a sequential top-to-bottom execution.

This raises the question of how JavaScript can handle this task efficiently with an asynchronous programming model in a production environment. The answer lies in its asynchronous environment. Web browsers provide mechanisms such as callback functions, promises, and async-await to tackle this type of functionality.

Let's delve deeper into these concepts and explore what they offer.

## But first, what are AJAX calls?
AJAX calls, short for Asynchronous JavaScript and XML calls, are a technique used in web development to send and retrieve data from a server without reloading the entire webpage. They allow for asynchronous communication with the server, enabling dynamic updates and improved user experience. AJAX calls are commonly used to fetch data, submit forms, and interact with APIs.

# Callback:
A callback function is a function that gets executed after another function has completed its task. It is a fundamental concept derived from functional programming. In JavaScript, functions can accept other functions as arguments, and these functions are referred to as callback functions.

Here's an example illustrating the usage of callback functions:

```
function processData(data, callback) {
  // Perform some data processing
  const processedData = data.toUpperCase();

  // Invoke the callback function with the processed data
  callback(processedData);
}

function displayData(result) {
  console.log('Processed data:', result);
}

const input = 'hello world';

processData(input, displayData);
```

In this example, the processData function accepts data and a callback function as arguments. It processes the data (in this case, converting it to uppercase) and then invokes the callback function, passing the processed data as an argument. The displayData function is defined separately and handles the processed data by logging it to the console.

# Promises:
Promises are objects in JavaScript that represent the eventual completion or failure of an asynchronous operation. They provide a cleaner and more structured approach to handle asynchronous code compared to callback functions.

Here's an example demonstrating the use of promises:

```
function performTask() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();

    if (randomNumber < 0.5) {
      resolve('Task completed successfully');
    } else {
      reject('Task failed');
    }
  });
}

performTask()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
In this example, the performTask function returns a promise that simulates a task. Inside the promise, a random number is generated, and if the number is less than 0.5, the promise is resolved with the message 'Task completed successfully'. Otherwise, if the number is greater than or equal to 0.5, the promise is rejected with the message 'Task failed'.

The .then() method is used to handle the resolved promise and log the success message, while the .catch() method is used to handle the rejected promise and log the error message.

# Async-Await:


