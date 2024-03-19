export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherData(latitude, longitude);
            resolve(data);
          } catch (error) {
            reject(new Error('Error fetching weather data: ' + error.message));
          }
        },
        (error) => {
          reject(new Error('Error fetching weather data: ' + error.message));
        }
      );
    } else {
      reject(new Error('Geolocation is not supported'));
    }
  });
};

/**
 * What are promises used for and why are they important
 * When would you use a promise?
 *
 * What does a try catch do / why would you use it
 *
 * side homework: when to const, function, and let
 */

/**
 * This function will return a large set of data for the last 24 hours of weather
 * @param {number} latitude The latitude of the user
 * @param {number} longitude The longitude of the user
 * returns a data JSON object of the users location
 */
export async function fetchWeatherData(latitude, longitude) {
  const apiURL = `https://api.open-meteo.com/v1/bom?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high&forecast_days=1`;
  const res = await fetch(apiURL);
  return res.json();
}
