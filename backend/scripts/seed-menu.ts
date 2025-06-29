import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { MenuService } from '../src/menu/menu.service';
import { CreateMenuItemDto } from '../src/menu/dto/create-menu-item.dto';
import { CreateCategoryDto } from '../src/menu/dto/create-category.dto';
import { Category } from '../src/menu/schemas/category.schema';

async function seedMenuData() {
  console.log('Starting menu data seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const menuService = app.get(MenuService);

  try {
    // First, create categories
    console.log('Creating categories...');
    const categories = [
      {
        name: 'Main Course',
        description: 'Traditional Amravati main dishes',
        sortOrder: 1,
        isActive: true,
      },
      {
        name: 'Appetizers',
        description: 'Starters and snacks',
        sortOrder: 2,
        isActive: true,
      },
      {
        name: 'Rice & Biryani',
        description: 'Rice dishes and biryanis',
        sortOrder: 3,
        isActive: true,
      },
      {
        name: 'Breads',
        description: 'Indian breads and rotis',
        sortOrder: 4,
        isActive: true,
      },
      {
        name: 'Desserts',
        description: 'Traditional sweets and desserts',
        sortOrder: 5,
        isActive: true,
      },
      {
        name: 'Beverages',
        description: 'Drinks and beverages',
        sortOrder: 6,
        isActive: true,
      },
    ] as CreateCategoryDto[];

    const createdCategories: Category[] = [];
    for (const category of categories) {
      try {
        const existing = await menuService.getAllCategories();
        const found = existing.find(c => c.name === category.name);
        if (!found) {
          const created = await menuService.createCategory(category);
          createdCategories.push(created);
          console.log(`Created category: ${created.name}`);
        } else {
          createdCategories.push(found);
          console.log(`Category already exists: ${found.name}`);
        }
      } catch (error) {
        console.error(`Error creating category ${category.name}:`, error.message);
      }
    }

    // Create menu items
    console.log('Creating menu items...');
    const mainCourseId = (createdCategories.find(c => c.name === 'Main Course') as any)?._id?.toString();
    const appetizersId = (createdCategories.find(c => c.name === 'Appetizers') as any)?._id?.toString();
    const riceId = (createdCategories.find(c => c.name === 'Rice & Biryani') as any)?._id?.toString();
    const breadsId = (createdCategories.find(c => c.name === 'Breads') as any)?._id?.toString();
    const dessertsId = (createdCategories.find(c => c.name === 'Desserts') as any)?._id?.toString();
    const beveragesId = (createdCategories.find(c => c.name === 'Beverages') as any)?._id?.toString();

    const menuItems: CreateMenuItemDto[] = [
      // Main Course
      {
        name: 'Amravati Special Chicken Curry',
        description: 'Traditional Amravati-style spicy chicken curry with authentic local spices',
        price: 280,
        categoryId: mainCourseId,
        ingredients: ['chicken', 'onions', 'tomatoes', 'amravati masala', 'ginger', 'garlic'],
        allergens: [],
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: true,
        preparationTime: 25,
        nutritionalInfo: {
          calories: 320,
        },
        isAvailable: true,
      },
      {
        name: 'Mutton Rassa',
        description: 'Spicy mutton curry in traditional Amravati style with rich gravy',
        price: 350,
        categoryId: mainCourseId,
        ingredients: ['mutton', 'onions', 'tomatoes', 'red chilies', 'garam masala'],
        allergens: [],
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: true,
        preparationTime: 35,
        nutritionalInfo: {
          calories: 420,
        },
        isAvailable: true,
      },
      {
        name: 'Tarri Poha',
        description: 'Famous Amravati breakfast dish with spicy tarri and poha',
        price: 120,
        categoryId: mainCourseId,
        ingredients: ['poha', 'onions', 'potatoes', 'tarri masala', 'peanuts'],
        allergens: ['peanuts'],
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isSpicy: true,
        preparationTime: 15,
        nutritionalInfo: {
          calories: 250,
        },
        isAvailable: true,
      },
      {
        name: 'Amravati Dal Bafla',
        description: 'Traditional lentil curry with baked wheat balls',
        price: 180,
        categoryId: mainCourseId,
        ingredients: ['toor dal', 'wheat flour', 'ghee', 'ginger', 'garlic'],
        allergens: ['gluten', 'dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        preparationTime: 30,
        nutritionalInfo: {
          calories: 380,
        },
        isAvailable: true,
      },

      // Appetizers
      {
        name: 'Amravati Misal Pav',
        description: 'Spicy sprouts curry with pav bread, topped with onions and sev',
        price: 100,
        categoryId: appetizersId,
        ingredients: ['mixed sprouts', 'onions', 'tomatoes', 'pav bread', 'sev'],
        allergens: ['gluten'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: true,
        preparationTime: 20,
        nutritionalInfo: {
          calories: 280,
        },
        isAvailable: true,
      },
      {
        name: 'Sabudana Vada',
        description: 'Crispy fried sabudana fritters with green chutney',
        price: 80,
        categoryId: appetizersId,
        ingredients: ['sabudana', 'potatoes', 'peanuts', 'green chilies'],
        allergens: ['peanuts'],
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 15,
        nutritionalInfo: {
          calories: 220,
        },
        isAvailable: true,
      },

      // Rice & Biryani
      {
        name: 'Amravati Chicken Biryani',
        description: 'Aromatic basmati rice cooked with spiced chicken in traditional style',
        price: 320,
        categoryId: riceId,
        ingredients: ['basmati rice', 'chicken', 'saffron', 'biryani masala', 'fried onions'],
        allergens: ['dairy'],
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 40,
        nutritionalInfo: {
          calories: 450,
        },
        isAvailable: true,
      },
      {
        name: 'Vegetable Pulao',
        description: 'Fragrant rice cooked with mixed vegetables and whole spices',
        price: 180,
        categoryId: riceId,
        ingredients: ['basmati rice', 'mixed vegetables', 'whole spices', 'ghee'],
        allergens: ['dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 25,
        nutritionalInfo: {
          calories: 320,
        },
        isAvailable: true,
      },

      // Breads
      {
        name: 'Jowar Bhakri',
        description: 'Traditional sorghum flatbread served with ghee',
        price: 60,
        categoryId: breadsId,
        ingredients: ['jowar flour', 'water', 'salt', 'ghee'],
        allergens: ['dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 10,
        nutritionalInfo: {
          calories: 180,
        },
        isAvailable: true,
      },
      {
        name: 'Bajra Roti',
        description: 'Pearl millet flatbread with butter',
        price: 50,
        categoryId: breadsId,
        ingredients: ['bajra flour', 'water', 'salt', 'butter'],
        allergens: ['dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 8,
        nutritionalInfo: {
          calories: 160,
        },
        isAvailable: true,
      },

      // Desserts
      {
        name: 'Puran Poli',
        description: 'Sweet flatbread stuffed with jaggery and lentil filling',
        price: 120,
        categoryId: dessertsId,
        ingredients: ['wheat flour', 'chana dal', 'jaggery', 'ghee', 'cardamom'],
        allergens: ['gluten', 'dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        preparationTime: 20,
        nutritionalInfo: {
          calories: 280,
        },
        isAvailable: true,
      },
      {
        name: 'Shrikhand',
        description: 'Creamy yogurt dessert flavored with saffron and cardamom',
        price: 100,
        categoryId: dessertsId,
        ingredients: ['yogurt', 'sugar', 'saffron', 'cardamom', 'pistachios'],
        allergens: ['dairy', 'nuts'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 15,
        nutritionalInfo: {
          calories: 220,
        },
        isAvailable: true,
      },

      // Beverages
      {
        name: 'Masala Chai',
        description: 'Traditional spiced tea with milk and aromatic spices',
        price: 30,
        categoryId: beveragesId,
        ingredients: ['tea leaves', 'milk', 'ginger', 'cardamom', 'sugar'],
        allergens: ['dairy'],
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 5,
        nutritionalInfo: {
          calories: 80,
        },
        isAvailable: true,
      },
      {
        name: 'Fresh Lime Water',
        description: 'Refreshing lime water with mint and black salt',
        price: 40,
        categoryId: beveragesId,
        ingredients: ['lime juice', 'water', 'mint', 'black salt', 'sugar'],
        allergens: [],
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isSpicy: false,
        preparationTime: 3,
        nutritionalInfo: {
          calories: 35,
        },
        isAvailable: true,
      },
    ];

    // Use the bulk create method
    const result = await menuService.createMultipleMenuItems(menuItems);
    
    console.log('\n=== BULK CREATION RESULTS ===');
    console.log(`Successfully created: ${result.created} items`);
    console.log(`Failed to create: ${result.failed} items`);
    
    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach(error => {
        console.log(`- Item ${error.index}: ${error.error}`);
      });
    }

    console.log('\nMenu data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding menu data:', error);
  } finally {
    await app.close();
  }
}

// Run the seeding function
seedMenuData().catch(console.error);
