import { updateProductsFile } from './updateProducts';

console.log('Starting test update...');

updateProductsFile()
  .then(() => {
    console.log('Test completed successfully!');
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 