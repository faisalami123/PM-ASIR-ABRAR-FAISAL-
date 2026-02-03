// ================== Global Variables ==================
const content = document.getElementById("content");
let currentLang = "bn";   // default বাংলা
let currentPage = "home"; // default homepage

// ================== Language Toggle ==================
document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "bn" ? "en" : "bn";
  document.getElementById("langToggle").innerText =
    currentLang === "bn" ? "🌐 English" : "🌐 বাংলা";

  if (currentPage === "home") showHome();
  else if (currentPage === "symptoms") showSymptoms();
  else if (currentPage === "firstaid") showFirstAid();
  else if (currentPage === "categories") showCategories();
  else if (currentPage === "about") showAbout();
  else if (currentPage === "food") showFoodSection();
  else if (currentPage === "problems") showCommonProblems();

});

// ================== Dark Mode Toggle ==================
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ================== Side Menu Toggle ==================
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("show");
}

// ================== Get Data ==================
function getSymptoms() {
  return currentLang === "bn" ? symptoms_bn : symptoms_en;
}
function getFirstAid() {
  return currentLang === "bn" ? firstAid_bn : firstAid_en;
}
function getCategories() {
  return currentLang === "bn" ? categories_bn : categories_en;
}

// ================== Home Page ==================
function showHome() {
  currentPage = "home";
  content.innerHTML = `
    <div class="welcome">
      <img src="welcome.jpg" alt="Welcome" class="welcome-img">
      <h2>${currentLang === "bn" ? "স্বাগতম Health Guide এ" : "Welcome to Health Guide"}</h2>
      <p>${currentLang === "bn" ? "আপনার সমস্যার প্রাথমিক ধারণা নিন" : "Get a preliminary idea of your problem"}</p>
    </div>

    <div class="home-grid">
      <div class="home-card">
        <img src="symptom.jpg" class="home-img">
        <button class="home-btn" onclick="showSymptoms()">${currentLang === "bn" ? "উপসর্গ" : "Symptom Checker"}</button>
      </div>
      <div class="home-card">
        <img src="firstaid.jpg" class="home-img">
        <button class="home-btn" onclick="showFirstAid()">${currentLang === "bn" ? "প্রাথমিক চিকিৎসা" : "Home Care"}</button>
      </div>
      <div class="home-card">
        <img src="categories.jpg" class="home-img">
        <button class="home-btn" onclick="showCategories()">${currentLang === "bn" ? "ক্যাটাগরি" : "Categories"}</button>
      </div>
      <div class="home-card">
        <img src="about.jpg" class="home-img">
        <button class="home-btn" onclick="showAbout()">${currentLang === "bn" ? "সম্পর্কে" : "About"}</button>
      </div>
    </div>

    <div class="food-entry">
      <div class="home-card">
        <img src="food.jpg" class="home-img">
        <button class="home-btn" onclick="showFoodSection()">
          🍎 ${currentLang === "bn" ? "খাবার যাচাই করুন" : "Check Food"}
        </button>
      </div>
    </div>
  `;
}

// ================== Symptoms Page ==================
function showSymptoms() {
  currentPage = "symptoms";
  const data = getSymptoms();
  content.innerHTML = `<h2>${currentLang === "bn" ? "উপসর্গ বাছাই করুন" : "Select a Symptom"}</h2><div class="food-grid">`;

  for (let s in data) {
    const imgFile = s.toLowerCase().replace(/\s+/g, "") + ".jpg";
    content.innerHTML += `
      <div class="food-card" onclick="showDetail('${s}')">
      <img src="${imgFile}" class="food-img" alt="${s}">
        <p>${s}</p>
      </div>
    `;
  }

  content.innerHTML += `</div>`;
}

// ================== Symptom Detail ==================
function showDetail(symptom) {
  const data = getSymptoms();
  const s = data[symptom];
  content.innerHTML = `
    <button class="back-btn" onclick="showSymptoms()">← ${currentLang === "bn" ? "ফিরে যান" : "Back"}</button>
    <h2>${symptom}</h2>
    <div><b>${currentLang === "bn" ? "সম্ভাব্য কারণ:" : "Possible Causes:"}</b> ${s.causes.join(", ")}</div>
    <div><b>${currentLang === "bn" ? "ডাক্তার দেখাবেন:" : "Doctor:"}</b> ${s.doctor}</div>
    <div><b>${currentLang === "bn" ? "ঘরে করণীয়:" : "Home Care:"}</b> ${s.home.join(", ")}</div>
    <div><b>⚠️ ${currentLang === "bn" ? "সতর্কতা:" : "Warning:"}</b> ${s.warning}</div>
  `;
}

// ================== First Aid Page ==================
function showFirstAid() {
  currentPage = "firstaid";
  const data = getFirstAid();
  content.innerHTML = `
    <h2>${currentLang === "bn" ? "প্রাথমিক চিকিৎসা" : "Home Care / First Aid"}</h2>
    <div class="search-section">
      <input type="text" id="firstAidSearch" placeholder="${currentLang === "bn" ? "সমস্যা লিখুন..." : "Search problem..."}" />
      <button onclick="searchFirstAid()">🔍 ${currentLang === "bn" ? "খুঁজুন" : "Search"}</button>
    </div>
    <div class="food-grid">
  `;

  for (let problem in data) {
    const imgFile = problem.toLowerCase().replace(/\s+/g, "") + ".jpg";
    content.innerHTML += `
      <div class="food-card" onclick="showFirstAidDetail('${problem}')">
        <img src="${imgFile}" class="food-img" alt="${problem}">
        <p>${problem}</p>
      </div>
    `;
  }

  content.innerHTML += `</div>`;
}

function showFirstAidDetail(problem) {
  const data = getFirstAid();
  const steps = data[problem];
  content.innerHTML = `
    <h2>${problem}</h2>
    <ul>${steps.map(step => `<li>${step}</li>`).join("")}</ul>
    <button class="back-btn" onclick="showFirstAid()">← ${currentLang === "bn" ? "ফিরে যান" : "Go Back"}</button>
  `;
}

function searchFirstAid() {
  const query = document.getElementById("firstAidSearch").value.trim().toLowerCase();
  const data = getFirstAid();
  content.innerHTML = `<h2>${currentLang === "bn" ? "সার্চ ফলাফল" : "Search Result"}</h2><div class="food-grid">`;
  let found = false;

  for (let problem in data) {
    if (problem.toLowerCase().includes(query)) {
      const imgFile = problem.toLowerCase().replace(/\s+/g, "") + ".jpg";
      content.innerHTML += `
        <div class="food-card" onclick="showFirstAidDetail('${problem}')">
          <img src="${imgFile}" class="food-img" alt="${problem}">
          <p>${problem}</p>
        </div>
      `;
      found = true;
    }
  }

  content.innerHTML += `</div>`;

  if (!found) {
    content.innerHTML += `<p>❌ ${currentLang === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}</p>`;
  }
}





  // ================== Symptom Search ==================
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const data = getSymptoms();
  let found = false;

  content.innerHTML = `<h2>${currentLang === "bn" ? "সার্চ ফলাফল" : "Search Result"}</h2><div class="food-grid">`;

  for (let s in data) {
    if (s.toLowerCase().includes(query)) {
      const imgFile = s.toLowerCase().replace(/\s+/g, "") + ".jpg";
      content.innerHTML += `
        <div class="food-card" onclick="showDetail('${s}')">
          <img src="${imgFile}" class="food-img" alt="${s}">
          <p>${s}</p>
        </div>
      `;
      found = true;
    }
  }

  content.innerHTML += `</div>`;

  if (!found) {
    content.innerHTML += `<p>❌ ${currentLang === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}</p>`;
  }
});

// Enter চাপলেও search কাজ করবে
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});


function showCategories() {
  currentPage = "categories";
  const data = getCategories();
  content.innerHTML = `<h2>${currentLang === "bn" ? "ক্যাটাগরি" : "Categories"}</h2>`;

  for (let cat in data) {
    content.innerHTML += `<h3>${cat}</h3><div class="food-grid">`;
    data[cat].forEach(symptom => {
      // সবসময় ইংরেজি key দিয়ে ছবি লোড করুন
      const englishKey = currentLang === "bn" 
        ? Object.keys(symptoms_en).find(key => symptoms_bn[symptom] && key) || symptom 
        : symptom;

      const imgFile = englishKey.toLowerCase().replace(/\s+/g, "") + ".jpg";

      content.innerHTML += `
        <div class="food-card" onclick="showDetail('${symptom}')">
          <img src="/${imgFile}" class="food-img" alt="${symptom}">
          <p>${symptom}</p>
        </div>
      `;
    });
    content.innerHTML += `</div>`;
  }
}


function showFoodSection() {
  currentPage = "food";
  const lang = currentLang === "bn" ? "bn" : "en";

  content.innerHTML = `
    <h2>${lang === "bn" ? "খাবারের ক্যাটাগরি" : "Food Categories"}</h2>
    <div class="search-section">
      <input type="text" id="foodSearch" placeholder="${lang === "bn" ? "খাবার লিখুন..." : "Search food..."}" />
      <button onclick="searchFood()">🔍 ${lang === "bn" ? "খুঁজুন" : "Search"}</button>
    </div>
  `;

  for (let cat in foodData) {
    const catName = lang === "bn"
      ? (cat === "Fruits" ? "ফল" : cat === "Vegetables" ? "সবজি" : cat === "Grains" ? "শস্য" : cat === "Legumes" ? "ডাল" : cat === "Meat" ? "মাংস" : cat === "Fish" ? "মাছ" : cat === "Eggs" ? "ডিম" : cat === "Dairy" ? "দুধজাত খাবার" : cat === "Beverages" ? "পানীয়" : cat === "Snacks" ? "নাস্তা" : cat === "Sweets" ? "মিষ্টি" : cat)
      : cat;

    content.innerHTML += `<h3>${catName}</h3><div class="food-grid">`;

    foodData[cat][lang].forEach((food, i) => {
      const foodKey = foodData[cat]["en"][i]; // ইংরেজি key ধরে রাখুন
      const imgFile = foodKey.toLowerCase().replace(/\s+/g, "") + ".jpg";

      content.innerHTML += `
        <div class="food-card" onclick="showFoodDetail('${foodKey}')">
          <img src="/${imgFile}" class="food-img" alt="${food}">
          <p>${food}</p>
        </div>
      `;
    });

    content.innerHTML += `</div>`;
  }
}




// ================== Food Categories ==================
const foodData = {
  Fruits: { 
    en: ["Apple","Banana","Orange","Mango"], 
    bn: ["আপেল","কলা","কমলা","আম"] 
  },
  Vegetables: { 
    en: ["Carrot","Spinach","Potato","Tomato"], 
    bn: ["গাজর","পালং শাক","আলু","টমেটো"] 
  },
  Grains: { 
    en: ["Rice","Wheat","Oats","Corn"], 
    bn: ["ভাত","গম","ওটস","ভুট্টা"] 
  },
  Legumes: { 
    en: ["Lentils","Chickpeas","Soybean"], 
    bn: ["মসুর ডাল","ছোলা","সয়াবিন"] 
  },
  Meat: { 
    en: ["Chicken","Beef","Mutton","Duck"], 
    bn: ["মুরগি","গরুর মাংস","খাসির মাংস","হাঁস"] 
  },
  Fish: { 
    en: ["Rui","Hilsa","Katla","Shrimp","Salmon"], 
    bn: ["রুই","ইলিশ","কাতলা","চিংড়ি","স্যামন"] 
  },
  Eggs: { 
    en: ["Egg"], 
    bn: ["ডিম"] 
  },
  Dairy: { 
    en: ["Milk","Yogurt","Cheese","Butter"], 
    bn: ["দুধ","দই","চিজ","মাখন"] 
  },
  Beverages: { 
    en: ["Water","Juice","Tea","Coffee"], 
    bn: ["পানি","জুস","চা","কফি"] 
  },
  Snacks: { 
    en: ["Burger","Pizza","Sandwich","Fries"], 
    bn: ["বার্গার","পিজ্জা","স্যান্ডউইচ","ফ্রেঞ্চ ফ্রাই"] 
  },
  Sweets: { 
    en: ["Cake","Ice Cream","Chocolate"], 
    bn: ["কেক","আইসক্রিম","চকোলেট"] 
  }
};


function searchFood() {
  const query = document.getElementById("foodSearch").value.trim().toLowerCase();
  const lang = currentLang === "bn" ? "bn" : "en";

  content.innerHTML = `<h2>${lang === "bn" ? "সার্চ ফলাফল" : "Search Result"}</h2><div class="food-grid">`;
  let found = false;

  // সব ক্যাটাগরির খাবার ঘুরে দেখা
  for (let cat in foodData) {
    foodData[cat][lang].forEach((food, i) => {
      const foodKey = foodData[cat]["en"][i]; // ইংরেজি key ধরে রাখুন
      if (food.toLowerCase().includes(query)) {
        const imgFile = foodKey.toLowerCase().replace(/\s+/g, "") + ".jpg";
        content.innerHTML += `
          <div class="food-card" onclick="showFoodDetail('${foodKey}')">
            <img src="/${imgFile}" class="food-img" alt="${food}">
            <p>${food}</p>
          </div>
        `;
        found = true;
      }
    });
  }

  content.innerHTML += `</div>`;

  if (!found) {
    content.innerHTML += `<p>❌ ${lang === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}</p>`;
  }
}


function showFoodDetail(foodKey) {
  const lang = currentLang === "bn" ? "bn" : "en";

  const nutritionData = {
    "Apple": {
      name: { en: "Apple", bn: "আপেল" },
      calories: 52,
      protein: "0.3g",
      fat: "0.2g",
      carbs: "14g",
      good: { en: "Rich in fiber and Vitamin C", bn: "ফাইবার ও ভিটামিন C সমৃদ্ধ" },
      bad: { en: "Too much may cause stomach upset", bn: "অতিরিক্ত খেলে পেটের সমস্যা হতে পারে" },
      healthScore: 85
    },
    "Banana": {
      name: { en: "Banana", bn: "কলা" },
      calories: 89,
      protein: "1.1g",
      fat: "0.3g",
      carbs: "23g",
      good: { en: "High in potassium", bn: "পটাশিয়াম সমৃদ্ধ" },
      bad: { en: "Too much may raise sugar levels", bn: "অতিরিক্ত খেলে রক্তে শর্করা বাড়তে পারে" },
      healthScore: 80
    }
    // আরও খাবার যোগ করুন...
  };

  const info = nutritionData[foodKey];
  if (!info) {
    content.innerHTML = `<p>❌ ${lang === "bn" ? "এই খাবারের তথ্য নেই" : "No data available for this food."}</p>`;
    return;
  }

  content.innerHTML = `
    <button class="back-btn" onclick="showFoodSection()">← ${lang === "bn" ? "ফিরে যান" : "Back"}</button>
    <h2>${info.name[lang]}</h2>
    <img src="/${foodKey.toLowerCase()}.jpg" class="food-img-large">
    <p><b>${lang === "bn" ? "ক্যালোরি:" : "Calories:"}</b> ${info.calories}</p>
    <p><b>${lang === "bn" ? "প্রোটিন:" : "Protein:"}</b> ${info.protein}</p>
    <p><b>${lang === "bn" ? "চর্বি:" : "Fat:"}</b> ${info.fat}</p>
    <p><b>${lang === "bn" ? "কার্বোহাইড্রেট:" : "Carbs:"}</b> ${info.carbs}</p>
    <p><b>✅ ${lang === "bn" ? "ভালো দিক:" : "Good:"}</b> ${info.good[lang]}</p>
    <p><b>❌ ${lang === "bn" ? "খারাপ দিক:" : "Bad:"}</b> ${info.bad[lang]}</p>
    <p><b>${lang === "bn" ? "স্বাস্থ্য স্কোর:" : "Health Score:"}</b> ${info.healthScore}%</p>
  `;
}

function showFoodDetail(foodKey) {
  const lang = currentLang === "bn" ? "bn" : "en";
  const info = nutritionData[foodKey]; // data.js থেকে তথ্য নেবে

  if (!info) {
    content.innerHTML = `<p>❌ ${lang === "bn" ? "এই খাবারের তথ্য নেই" : "No data available for this food."}</p>`;
    return;
  }

  content.innerHTML = `
    <button class="back-btn" onclick="showFoodSection()">← ${lang === "bn" ? "ফিরে যান" : "Back"}</button>
    <h2>${info.name[lang]}</h2>
    <img src="images/${foodKey.toLowerCase().replace(/\s+/g,"")}.jpg" class="food-img-large">

    <p><b>${lang === "bn" ? "ক্যালোরি:" : "Calories:"}</b> ${info.calories} (${lang === "bn" ? "প্রায়" : "Approx."})</p>
    <p><b>${lang === "bn" ? "প্রোটিন:" : "Protein:"}</b> ${info.protein} (${lang === "bn" ? "প্রায়" : "Approx."})</p>
    <p><b>${lang === "bn" ? "চর্বি:" : "Fat:"}</b> ${info.fat} (${lang === "bn" ? "প্রায়" : "Approx."})</p>
    <p><b>${lang === "bn" ? "কার্বোহাইড্রেট:" : "Carbs:"}</b> ${info.carbs} (${lang === "bn" ? "প্রায়" : "Approx."})</p>

    <p><b>✅ ${lang === "bn" ? "ভালো দিক:" : "Good:"}</b> ${info.good[lang]}</p>
    <p><b>❌ ${lang === "bn" ? "খারাপ দিক:" : "Bad:"}</b> ${info.bad[lang]}</p>
    <p><b>${lang === "bn" ? "স্বাস্থ্য স্কোর:" : "Health Score:"}</b> ${info.healthScore}% (${lang === "bn" ? "প্রায়" : "Approx."})</p>
  `;
}

function showAbout() {
  // অন্য সেকশনগুলো লুকান
  document.getElementById("content").style.display = "none";
  
  // About সেকশন দেখান
  document.getElementById("about").style.display = "block";
}

function showSection(sectionId) {
  // সব সেকশন লুকান
  document.getElementById("content").style.display = "none";
  document.getElementById("about").style.display = "none";
  // চাইলে অন্য সেকশন যেমন symptoms, firstAid ইত্যাদি থাকলে সেগুলোও এখানে লুকাতে হবে

  // নির্দিষ্ট সেকশন দেখান
  document.getElementById(sectionId).style.display = "block";
}

function toggleLanguage() {
  const currentLang = document.documentElement.lang;

  if (currentLang === "bn") {
    document.documentElement.lang = "en";

    // About section English
    document.getElementById("aboutTitle").innerText = "About Health Guide";
    document.getElementById("aboutPurpose").innerText = "Health Guide is designed to give users a preliminary idea of their problems — simple, fast, and free.";
    document.getElementById("aboutFeaturesTitle").innerText = "Features";
    document.getElementById("feature1").innerText = "Preliminary health idea based on symptoms";
    document.getElementById("feature2").innerText = "Food-related information";
    document.getElementById("feature3").innerText = "Home care / First aid guide";
    document.getElementById("feature4").innerText = "Bangla and English language support";
    document.getElementById("feature5").innerText = "Dark mode toggle";
    document.getElementById("aboutLimitationsTitle").innerText = "Limitations";
    document.getElementById("aboutLimitations").innerText = "⚠️ This app is not a substitute for a doctor.";
    document.getElementById("aboutFutureTitle").innerText = "Future Plans";
    document.getElementById("aboutFuture").innerText = "We plan to add more features in the future — such as live doctor chat, symptom history tracking, and offline mode.";

  } else {
    document.documentElement.lang = "bn";

    // About section Bangla
    document.getElementById("aboutTitle").innerText = "About Health Guide";
    document.getElementById("aboutPurpose").innerText = "Health Guide তৈরি হয়েছে যেন ব্যবহারকারী তাদের সমস্যার প্রাথমিক ধারণা নিতে পারেন — সহজ ভাষায়, দ্রুত এবং বিনামূল্যে।";
    document.getElementById("aboutFeaturesTitle").innerText = "বৈশিষ্ট্য";
    document.getElementById("feature1").innerText = "লক্ষণ অনুসারে preliminary health ধারণা";
    document.getElementById("feature2").innerText = "খাদ্য সম্পর্কিত তথ্য";
    document.getElementById("feature3").innerText = "Home care / First aid গাইড";
    document.getElementById("feature4").innerText = "বাংলা ও ইংরেজি ভাষা সাপোর্ট";
    document.getElementById("feature5").innerText = "Dark mode toggle";
    document.getElementById("aboutLimitationsTitle").innerText = "সতর্কতা";
    document.getElementById("aboutLimitations").innerText = "⚠️ এই অ্যাপটি চিকিৎসকের বিকল্প নয়।";
    document.getElementById("aboutFutureTitle").innerText = "ভবিষ্যৎ পরিকল্পনা";
    document.getElementById("aboutFuture").innerText = "ভবিষ্যতে আরও ফিচার যোগ করা হবে — যেমন live doctor chat, symptom history tracking, এবং offline mode।";
  }
}




// ================== Show Common Problems ==================
function showCommonProblems() {
  currentPage = "problems";
  const lang = currentLang === "bn" ? "bn" : "en";

  content.innerHTML = `
    <h2>${lang === "bn" ? "সাধারণ সমস্যা" : "Common Problems"}</h2>
    <div class="search-section">
      <input type="text" id="problemSearch" placeholder="${lang === "bn" ? "সমস্যা লিখুন..." : "Search problem..."}" />
      <button onclick="searchCommonProblems()">🔍 ${lang === "bn" ? "খুঁজুন" : "Search"}</button>
    </div>
    <div class="problem-grid">
  `;

  for (let key in commonProblemsData) {
    const problem = commonProblemsData[key][lang].title;
    const imgFile = key.toLowerCase() + ".jpg"; // key অনুযায়ী ইমেজ নাম

    content.innerHTML += `
      <div class="problem-card">
        <img src="${imgFile}" class="food-img" alt="${problem}">
        <p>${problem}</p>
        <button onclick="showProblemDetail('${key}')">${lang === "bn" ? "বিস্তারিত" : "Details"}</button>
      </div>
    `;
  }

  content.innerHTML += `</div>`;
}

// ================== Show Problem Detail ==================
function showProblemDetail(key) {
  const lang = currentLang === "bn" ? "bn" : "en";
  const info = commonProblemsData[key][lang];

  content.innerHTML = `
    <button class="back-btn" onclick="showCommonProblems()">← ${lang === "bn" ? "ফিরে যান" : "Back"}</button>
    <h2>${info.title}</h2>
    <p><b>${lang === "bn" ? "কারণ:" : "Causes:"}</b> ${info.causes}</p>
    <p><b>${lang === "bn" ? "লক্ষণ:" : "Signs:"}</b> ${info.signs}</p>
    <p><b>${lang === "bn" ? "প্রতিকার:" : "Remedies:"}</b> ${info.remedies}</p>
  `;
}

// ================== Search Common Problems ==================
function searchCommonProblems() {
  const query = document.getElementById("problemSearch").value.trim().toLowerCase();
  const lang = currentLang === "bn" ? "bn" : "en";

  content.innerHTML = `<h2>${lang === "bn" ? "সার্চ ফলাফল" : "Search Result"}</h2><div class="problem-grid">`;
  let found = false;

  for (let key in commonProblemsData) {
    const problem = commonProblemsData[key][lang].title.toLowerCase();
    if (problem.includes(query)) {
      const imgFile = key.toLowerCase() + ".jpg";
      content.innerHTML += `
        <div class="problem-card">
          <img src="${imgFile}" class="food-img" alt="${problem}">
          <p>${commonProblemsData[key][lang].title}</p>
          <button onclick="showProblemDetail('${key}')">${lang === "bn" ? "বিস্তারিত" : "Details"}</button>
        </div>
      `;
      found = true;
    }
  }

  content.innerHTML += `</div>`;

  if (!found) {
    content.innerHTML += `<p>❌ ${lang === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}</p>`;
  }
}





