# Project Objective

Create a widget with a weather forecast.

This widget allows you to receive weather information:

- In any city upon request
- Based on the user’s current geolocation

The user will also be able to select for what period he wants to know the weather:

- Currently
- For the next 5 days

# Project stages

Stage 1:
Prepare the project design.
Required design elements:
1. Search line for entering a city or town.
2. Button to get the user's current geolocation.
3. Button for receiving weather forecast.
4. A block or several blocks with received weather information.
5. Switch to select which data to receive. Current weather or 5 day forecast.


Stage 2:
Design a top-level structure of React components for the entire application.
Record what components will be in the project and how they interact with each other.

Stage 3:
Create a search string component.

Stage 4:
Create a button to get the user's current location.
Please note that the user may not give permission to read his location. Process this case.

Stage 5:
Create a button to get the weather.
The interface should clearly reflect what kind of weather it shows: by geolocation or a manually specified city.

Stage 6:
Implement the logic for retrieving weather data for a given location from the API. Add the appropriate handler to the button.
Please note that the user may not enter anything into the search bar and may not use the geolocation function. In this case, you can show the user a special message.

Stage 7:
Add a component (or components) to display the weather data you received from the API in the previous step.
Data that needs to be shown to the user:
1. Temperature in degrees Celsius.
2. Text description of the weather: for example, “cloudy.” And the corresponding picture. You can use your own icons or use those offered by OpenWeather.
3. Pressure.
4. Humidity.
5. Wind speed.
6. Sunrise and sunset times.
Please note that the data may not arrive. This happens for various reasons: from an error in the request to lack of data on the server. Help the user understand what happened.

Stage 8:
Add a component that will allow you to switch options for receiving weather - for the current moment or 5 days in advance.

Stage 9:
Remember that the current weather data format is different from the 5-day forecast data format. Make the widget work correctly in both cases.