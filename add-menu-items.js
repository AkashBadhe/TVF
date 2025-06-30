const https = require('https');
const http = require('http');

const API_BASE = 'http://localhost:3000/api';
let authToken = '';

// Helper function to make HTTP requests
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Login as admin first
async function loginAdmin() {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const response = await makeRequest(`${API_BASE}/auth/admin/login`, options, {
      email: 'admin@restaurant.com',
      password: 'admin123'
    });
    
    if (response.status === 200 && response.data.success) {
      authToken = response.data.data.token;
      console.log('Admin login successful');
      return true;
    } else {
      console.error('Admin login failed:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Admin login failed:', error.message);
    return false;
  }
}

// Menu items based on Amravati-style restaurant
const menuItems = [
  {
    name: "Varan Bhaat",
    description: "Traditional Maharashtrian dal and rice combo, served with homemade ghee and pickle",
    price: 120,
    category: "Main Course",
    prepTime: 25,
    spiceLevel: "mild",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true
  },
  {
    name: "Bharli Vangi",
    description: "Stuffed brinjal curry with aromatic spices and peanut masala",
    price: 160,
    category: "Main Course",
    prepTime: 35,
    spiceLevel: "medium",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isAvailable: true
  },
  {
    name: "Misal Pav",
    description: "Spicy sprouted lentil curry topped with farsan, onions, and served with pav bread",
    price: 80,
    category: "Snacks",
    prepTime: 15,
    spiceLevel: "hot",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    name: "Puran Poli",
    description: "Sweet flatbread stuffed with jaggery and lentil filling, served with ghee",
    price: 100,
    category: "Desserts",
    prepTime: 20,
    spiceLevel: "none",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    name: "Kothimbir Vadi",
    description: "Steamed and fried coriander dumplings with spicy chutney",
    price: 90,
    category: "Snacks",
    prepTime: 20,
    spiceLevel: "medium",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    name: "Batata Vada",
    description: "Deep-fried potato dumplings in gram flour batter, served with chutneys",
    price: 60,
    category: "Snacks",
    prepTime: 15,
    spiceLevel: "mild",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isAvailable: true
  },
  {
    name: "Solkadhi",
    description: "Refreshing drink made with coconut milk and kokum",
    price: 40,
    category: "Beverages",
    prepTime: 5,
    spiceLevel: "none",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isAvailable: true
  },
  {
    name: "Bharleli Bhendi",
    description: "Okra stuffed with spiced onion and peanut mixture",
    price: 140,
    category: "Main Course",
    prepTime: 30,
    spiceLevel: "medium",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isAvailable: true
  }
];

// Add menu items
async function addMenuItems() {
  if (!authToken) {
    console.error('Not authenticated');
    return;
  }

  for (const item of menuItems) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await makeRequest(`${API_BASE}/menu`, options, item);
      
      if (response.status === 201) {
        console.log(`✅ Added: ${item.name}`);
      } else {
        console.error(`❌ Failed to add ${item.name}:`, response.data);
      }
    } catch (error) {
      console.error(`❌ Failed to add ${item.name}:`, error.message);
    }
  }
}

// Main function
async function main() {
  const loginSuccess = await loginAdmin();
  if (loginSuccess) {
    await addMenuItems();
    console.log('✅ All menu items processed!');
  }
}

main().catch(console.error);
