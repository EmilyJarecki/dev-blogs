---
title: Asynchronous JavaScript — Callback, Promise and Async-Await Functions
meta: Let's dive deep into the 3 types of asynchronous functions. 
slug: async
---

While developing a dynamic web application, one of the primary challenges is making numerous AJAX calls. JavaScript, being a synchronous and single-threaded language, lacks the ability to automatically create and execute multiple threads in parallel, following a sequential top-to-bottom execution.

This raises the question of how JavaScript can handle this task efficiently with an asynchronous programming model in a production environment. The answer lies in its asynchronous environment. Web browsers provide mechanisms such as callback functions, promises, and async-await to tackle this type of functionality.

Let's delve deeper into these concepts and explore what they offer.

**But first, what are AJAX calls?**
> AJAX calls, short for Asynchronous JavaScript and XML calls, are a technique used in web development to send and retrieve data from a server without reloading the entire webpage. They allow for asynchronous communication with the server, enabling dynamic updates and improved user experience. AJAX calls are commonly used to fetch data, submit forms, and interact with APIs.

## Callback:
![Callback Functions](https://miro.medium.com/v2/format%3Awebp/1%2Aexgznl7z65gttRxLsMAV2A.png)


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


> Processed data: HELLO WORLD
```

> In this example, the processData function accepts data and a callback function as arguments. It processes the data (in this case, converting it to uppercase) and then invokes the callback function, passing the processed data as an argument. The displayData function is defined separately and handles the processed data by logging it to the console.

## Promises:
![Promises](https://programmerhumor.io/wp-content/uploads/2023/03/programmerhumor-io-programming-memes-24eeb665f9acf14.jpg)
Promises are objects in JavaScript that represent the eventual completion or failure of an asynchronous operation. They are used to handle tasks that take time to complete, such as fetching data from a server or reading a file. 

They also provide a way to handle these tasks in a more organized and predictable manner by allowing us to specify what should happen when the task is successfully completed or when an error occurs. 

Think of promises as a way to handle the outcome of an asynchronous task, whether it succeeds or fails, so that we can take appropriate actions in our code based on that outcome.

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


// when the randomly generated number is less than 0.5:
> Task completed successfully


// when the randomly generated number is greater than or equal to 0.5:
> Task failed
```
> In this example, the performTask function returns a promise that simulates a task. Inside the promise, a random number is generated, and if the number is less than 0.5, the promise is resolved with the message 'Task completed successfully'. Otherwise, if the number is greater than or equal to 0.5, the promise is rejected with the message 'Task failed'.

> The .then() method is used to handle the resolved promise and log the success message, while the .catch() method is used to handle the rejected promise and log the error message.

## Async-Await:
![Async-Await](https://miro.medium.com/v2/resize%3Afit%3A1136/format%3Awebp/1%2AQJpDCVVeYhklYJ3uJGNRXQ.jpeg)
Async-await functions allow you to write asynchronous operations, but without blocking the execution thread. By marking a function as "async" and using the "await" keyword, you can pause the function's execution until a promise is resolved, making it appear like a regular blocking function call. 

**Async:**
Async functions will always return a value. Using async simply implies that a promise will be returned.

**Await:**
The keyword Await makes JavaScript wait until the promise returns a result. It has to be noted that it only makes the async function block wait and not the whole program execution.

This helps eliminate callback hell and makes asynchronous programming feel more intuitive and sequential.

Here's an example demonstrating async-await functions:

```
function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Waited for ' + duration + ' milliseconds');
    }, duration);
  });
}

async function performTask() {
  console.log('Task started');
  
  try {
    const result = await wait(2000);
    console.log(result);
    console.log('Task completed');
  } catch (error) {
    console.log('Error:', error);
  }
}

performTask();


> Task started
> Waited for 2000 milliseconds
> Task completed
```
> In this example and inside the performTask function, we use the "await" keyword before the wait function call. This pauses the execution of the function until the promise from wait is resolved or rejected. Once the promise is resolved, the result is assigned to the result variable, and we log the result along with a completion message. If there's an error during the promise execution, it's caught in the catch block, and an error message is logged.

> When calling performTask(), the function is executed asynchronously. The "Task started" message is logged, followed by a 2-second delay due to the await wait(2000) statement. After the delay, the resolved value is logged as "Waited for 2000 milliseconds" and the "Task completed" message is displayed.
