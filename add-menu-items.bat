@echo off
echo Adding menu items to restaurant...

echo Getting admin token...
for /f "tokens=*" %%i in ('curl -s -X POST http://localhost:3000/api/auth/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@restaurant.com\",\"password\":\"admin123\"}" ^| findstr "token"') do set TOKEN_RESPONSE=%%i

echo %TOKEN_RESPONSE%

echo Adding Varan Bhaat...
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU1MjgzNjIsImV4cCI6MTczNTUzNTU2Mn0.gKbxNEM9bWhid0RSFCUWCY" -d "{\"name\":\"Varan Bhaat\",\"description\":\"Traditional Maharashtrian dal and rice combo, served with homemade ghee and pickle\",\"price\":120,\"category\":\"Main Course\",\"prepTime\":25,\"spiceLevel\":\"mild\",\"isVegetarian\":true,\"isVegan\":false,\"isGlutenFree\":true,\"isAvailable\":true}"

echo Adding Bharli Vangi...
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU1MjgzNjIsImV4cCI6MTczNTUzNTU2Mn0.gKbxNEM9bWhid0RSFCUWCY" -d "{\"name\":\"Bharli Vangi\",\"description\":\"Stuffed brinjal curry with aromatic spices and peanut masala\",\"price\":160,\"category\":\"Main Course\",\"prepTime\":35,\"spiceLevel\":\"medium\",\"isVegetarian\":true,\"isVegan\":true,\"isGlutenFree\":true,\"isAvailable\":true}"

echo Adding Misal Pav...
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU1MjgzNjIsImV4cCI6MTczNTUzNTU2Mn0.gKbxNEM9bWhid0RSFCUWCY" -d "{\"name\":\"Misal Pav\",\"description\":\"Spicy sprouted lentil curry topped with farsan, onions, and served with pav bread\",\"price\":80,\"category\":\"Snacks\",\"prepTime\":15,\"spiceLevel\":\"hot\",\"isVegetarian\":true,\"isVegan\":false,\"isGlutenFree\":false,\"isAvailable\":true}"

echo Adding Puran Poli...
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU1MjgzNjIsImV4cCI6MTczNTUzNTU2Mn0.gKbxNEM9bWhid0RSFCUWCY" -d "{\"name\":\"Puran Poli\",\"description\":\"Sweet flatbread stuffed with jaggery and lentil filling, served with ghee\",\"price\":100,\"category\":\"Desserts\",\"prepTime\":20,\"spiceLevel\":\"none\",\"isVegetarian\":true,\"isVegan\":false,\"isGlutenFree\":false,\"isAvailable\":true}"

echo Adding Kothimbir Vadi...
curl -X POST http://localhost:3000/api/menu -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzU1MjgzNjIsImV4cCI6MTczNTUzNTU2Mn0.gKbxNEM9bWhid0RSFCUWCY" -d "{\"name\":\"Kothimbir Vadi\",\"description\":\"Steamed and fried coriander dumplings with spicy chutney\",\"price\":90,\"category\":\"Snacks\",\"prepTime\":20,\"spiceLevel\":\"medium\",\"isVegetarian\":true,\"isVegan\":true,\"isGlutenFree\":false,\"isAvailable\":true}"

echo All menu items added successfully!
