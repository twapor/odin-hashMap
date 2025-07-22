import HashMap from "./HashMap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.length());
test.set('apple', 'green'); // Update existing key
console.log(test.get('apple')); // Should return 'green'
console.log(test.has('banana')); // Should return true
console.log(test.has('zebra')); // Should return false 
console.log(test.capacity); // Should return 16
console.log(test.occupiedBuckets);
console.log(test.occupiedBuckets / test.capacity); // Should return the load factor
test.set('kiwi', 'brown'); // Add another key-value pair
console.log(test.capacity); // Should return 16
console.log(test.occupiedBuckets); 
test.set('night', 'black');
console.log(test.occupiedBuckets); 
test.set('mango', 'yellow'); // Add another key-value pair
console.log(test.occupiedBuckets); 
console.log(test.capacity); // Should return 32

test.clear(); // Clear the hashmap
console.log(test.length()); // Should return 0
