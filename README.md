# Astronomical Data Tool: Frontend

**Languages**: `React + Vite` and `JSX`

**Developer**: Kylee Brown

***

# Brief Summary of Code

I used `react-browser-router` to establish routes and overall create a single page Application. I opted to use the React for this exact purpose as well as its easily integratable syntax, `JSX`, and state management. 

Component-based design was the best choice for this project as I needed to render certain components using the same structure such as the modal for deleting images. This modal component has been set up to be used for file and image deletion. 

Using Reacts `UseState()` along with `UseEffect()` helped when calling to my backend for information like the user files or images. `UseEffect` allowed for me to call functions on component mount, in other words, when the user initially enters/reloads the page. `useState` allowed for simple state management of my files, display of errors to the users, and utilization of loaders. 


Axios was used to communicate with the backend and fetch information based on the current user. This was the first time I have built a frontend web application that communicates with a backend that I had a major part in developing.

***

# Styling

I used the library TailwindCSS to make styling in this project brief. I used Tailwind's simple syntax to create a responsive UI that allows for laptops and phones to access the program without problem. Lastly, I kept tailwind imports and more complex styles in the `Global.CSS` file.

*** 

# Hosting

Hosting is done through a continuous integration and development process to make patch updates efficient.

***

# What Would I do Differently?

### Find new ways to manage the state
Like I said, this is my first attempt at a fullstack project, and If I would do anything differently, it would be to set up components to share the state between multiple components instead of overusing React's `prop` and `useState()` features. While the features are valuable, it's important not to over-rely on one way to share state between components.

### Redux
This leads to the `Redux` conversation. In the future, I will use Redux alongside React to solve the above issue of over complicated state management and data sharing between components. With `Redux`'s `store`, `dispatch` and `subscribe` methods, debugging and the overall development process would have been exemplary. `Redux` would also make the code more readable when it comes to other developers wanting to contribute to my work.

#### Articles on Redux:
* [Why we need Redux in React?](https://www.geeksforgeeks.org/why-we-need-redux-in-react/)
* [Why Use React Redux?](https://react-redux.js.org/introduction/why-use-react-redux)

*Happy Coding!*
