# Fetch API Learning Template 🌤️

A beginner-friendly template to learn and practice the Fetch API with HTML, CSS, and JavaScript.

## 📁 Files Structure

```
weather-web/
├── index.html    # Main HTML structure
├── styles.css    # Styling and layout
├── script.js     # JavaScript with Fetch API examples
└── README.md     # This file
```

## 🚀 Getting Started

1. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

2. **No API Key Required! 🎉**
   - This template uses [Open-Meteo](https://open-meteo.com/) - a completely FREE weather API
   - No sign-up, no API key, no credit card needed
   - Just open and start using it!

3. **Start Learning!**
   - Read the comments in `script.js` to understand the code
   - Try modifying the code to see what happens
   - Complete the practice exercises at the bottom of `script.js`

## 📚 What You'll Learn

- **Fetch API Basics**: How to make HTTP requests
- **Promises**: Understanding `.then()` and `.catch()`
- **Async/Await**: Modern way to handle asynchronous code
- **Error Handling**: How to handle API errors gracefully
- **DOM Manipulation**: Displaying fetched data in the UI
- **Event Listeners**: Handling user interactions

## 🎯 Key Concepts

### 1. Basic Fetch Syntax
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### 2. Async/Await Syntax (Recommended)
```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 3. Error Handling
Always check if the response is OK:
```javascript
if (!response.ok) {
    throw new Error('Network response was not ok');
}
```

## 🛠️ Customization Ideas

1. **Change the API**: Try different APIs like:
   - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - No API key needed
   - [Dog API](https://dog.ceo/dog-api/) - Random dog images
   - [Joke API](https://official-joke-api.appspot.com/) - Random jokes
   - [Cat Facts](https://catfact.ninja/) - Cat facts

2. **Modify the UI**: 
   - Change colors in `styles.css`
   - Add more input fields
   - Create different card layouts

3. **Add Features**:
   - Save favorite cities
   - Show weather history
   - Add weather icons
   - Create a forecast view

## 📝 Practice Exercises

Check the bottom of `script.js` for practice exercises. Start with:
1. Add validation for empty inputs
2. Display loading states
3. Handle different error types
4. Add more data fields

## 🔗 Helpful Resources

- [MDN Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript.info - Fetch](https://javascript.info/fetch)
- [Async/Await Tutorial](https://javascript.info/async-await)

## 💡 Tips

- Always handle errors when making API calls
- Check API documentation for required parameters
- Use browser DevTools (F12) to debug your code
- Start with simple APIs before moving to complex ones
- Read the API response structure before displaying data

## 🐛 Troubleshooting

**Problem**: "Failed to fetch" error
- **Solution**: Check your internet connection and API endpoint URL

**Problem**: City not found
- **Solution**: Make sure you've entered a valid city name. Try major cities like "London", "Tokyo", "New York"

**Problem**: CORS errors
- **Solution**: Some APIs don't allow browser requests. Use a proxy or test with a server

**Problem**: Data not displaying
- **Solution**: Check browser console (F12) for errors and verify the API response structure

## 📄 License

This is a learning template - feel free to use and modify as needed!

---

Happy Learning! 🎓

