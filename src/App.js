// 替換為你的 OpenWeatherMap API 金鑰
const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

// DOM 元素
const findRamenBtn = document.getElementById("find-ramen-btn");
const locationInput = document.getElementById("location-input");
const weatherInfo = document.getElementById("weather-info");
const shopList = document.getElementById("shop-list");

// 模擬的拉麵店數據
const ramenShops = [
  { name: "一蘭拉麵", address: "東京拉麵街 123 號" },
  { name: "拉麵凪", address: "京都拉麵大道 456 號" },
  { name: "一風堂", address: "大阪拉麵大道 789 號" },
];

// 獲取天氣資訊
async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      weatherInfo.textContent = `溫度：${data.main.temp}°C，天氣：${data.weather[0].description}`;
    } else {
      weatherInfo.textContent = "無法獲取天氣資訊，請確認位置是否正確。";
    }
  } catch (error) {
    weatherInfo.textContent = "天氣資訊獲取失敗，請稍後再試。";
  }
}

// 顯示拉麵店列表
function displayRamenShops() {
  shopList.innerHTML = ""; // 清空現有列表
  ramenShops.forEach((shop) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${shop.name} - 地址：${shop.address}`;
    shopList.appendChild(listItem);
  });
}

// 主邏輯
findRamenBtn.addEventListener("click", () => {
  const location = locationInput.value;
  if (!location) {
    alert("請輸入你的位置！");
    return;
  }

  // 獲取天氣資訊
  getWeather(location);

  // 顯示拉麵店
  displayRamenShops();
});
