const searchBtn = document.querySelector("#search");
// const APIInput = document.querySelector('#api-key')
// const address = document.querySelector('#address')
searchBtn.addEventListener("click", function () {
  const address = document.querySelector("#address").value;
  const APIInput = document.querySelector("#api-key").value;
  const norad = document.querySelector("#norad").value;
  const URLApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${APIInput}`;
  fetch(URLApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.features[0].center[0], data.features[0].center[1]);
      const lat = data.features[0].center[0];
      const lon = data.features[0].center[1];
      const URLSpace = `https://satellites.fly.dev/passes/${norad}?lat=${lon}&lon=${lat}&limit=1&days=15&visible_only=true`;
      fetch(URLSpace)
        .then((res) => res.json())
        .then((data) => {
          const rise = document.querySelector("#rise");
          const culmination = document.querySelector("#culmination");
          const set = document.querySelector("#set");
          console.log(data[0].rise.utc_datetime);
          console.log(data);
          rise.innerText = data[0].rise.utc_datetime;
          culmination.innerText = data[0].culmination.utc_datetime;
          set.innerText = data[0].set.utc_datetime;
        });
    });
});
