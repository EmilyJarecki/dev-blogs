---
title: useEffect
meta: The useEffect hook is an essential part of React hooks.
slug: useEffect
---

The useEffect hook is an essential part of React hooks. The useEffect hook is used to manage side effects in functional components, such as fetching data from an API, subscribing to events, or manipulating the DOM. In this post, we'll explore the useEffect hook and provide some coding examples to illustrate its usage.

The useEffect hook is used to perform side effects in functional components. A side effect is any change that is made outside the scope of the component itself, such as modifying the DOM or fetching data from an API. In class components, side effects were managed using lifecycle methods such as componentDidMount and componentDidUpdate. The useEffect hook provides a way to manage side effects in functional components, allowing us to avoid class components altogether.

Here's an example of using useEffect to fetch data from an API:

```
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data.map(item => <p key={item.id}>{item.text}</p>)}
    </div>
  );
}
```

In this example, we define a functional component called MyComponent. The component uses the useState hook to define a state variable called data, which will hold the data fetched from the API. We use the useEffect hook to fetch the data when the component is mounted. The [] in the second argument of useEffect indicates that the effect should only be run once when the component mounts. Finally, we render the data using the map method.

The useEffect hook also allows us to clean up side effects when a component unmounts or when a new effect is triggered. Here's an example:

```
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>{count}</p>
    </div>
  );
}
```


In this example, we define a functional component called MyComponent. The component uses the useState hook to define a state variable called count, which will hold the current count. We use the useEffect hook to set up an interval that increments the count every second. 

**The [] in the second argument of useEffect indicates that the effect should only be run once when the component mounts. Finally, we clean up the interval using the return statement of useEffect.**


In conclusion, the useEffect hook is an essential part of React hooks, providing a way to manage side effects in functional components. It allows us to fetch data from APIs, subscribe to events, and manipulate the DOM. The useEffect hook also allows us to clean up side effects when a component unmounts or when a new effect is triggered. By mastering the useEffect hook, you can create more powerful and efficient React components.