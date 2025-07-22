class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null; 
    }
}

class HashMap {
    constructor() {
        this.bucketsArray = new Array(16).fill(null) 
        this.loadFactor = 0.75; 
        this.capacity = this.bucketsArray.length; 
        this.occupiedBuckets = 0; 
    }

    hash(key, capacity = this.capacity) {
        let hashKey = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashKey = (hashKey * prime + key.charCodeAt(i)) % capacity;
        }

        return hashKey;
    }

    set(key, value) {
        const index = this.hash(key);
        let dataToBeInserted = new Node(key, value);
        
        // Case 1: No node at this bucket yet
        if (!this.bucketsArray[index]) { 
            this.bucketsArray[index] = dataToBeInserted;
            this.occupiedBuckets++;
            if (this.occupiedBuckets / this.capacity > this.loadFactor) {
                this.resize(); // Resize if load factor exceeded
            } 
            return;
        }

        // Case 2: Traverse the chain to update or append
        let currentNode = this.bucketsArray[index];
        while (currentNode) {
            if (currentNode.key === key) {
                currentNode.value = value; // Update existing key
                return;
            }
            if (!currentNode.next) {
                currentNode.next = dataToBeInserted; // Append new node
                return;
            }
            currentNode = currentNode.next; // Move to next node
        }
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBucketsArray = new Array(newCapacity).fill(null);

        for (let i = 0; i < this.capacity; i++) {
            let current = this.bucketsArray[i];

            while (current !== null) {
                const newHash = this.hash(current.key, newCapacity);
                const newNode = new Node(current.key, current.value);

                // Insert new node into newBucketsArray[newHash]
                if (!newBucketsArray[newHash]) {
                    newBucketsArray[newHash] = newNode;
                } else {
                    let head = newBucketsArray[newHash];
                    while (head.next !== null) {
                        head = head.next;
                    }
                    head.next = newNode;
                }

                current = current.next;
            }
        }

        this.capacity = newCapacity;
        this.bucketsArray = newBucketsArray;
    }

    get (key) {
        const index = this.hash(key);
        let currentNode = this.bucketsArray[index];

        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode.value; // Return the value if key matches
            }
            currentNode = currentNode.next; // Move to next node in chain
        }

        return undefined; // Key not found

    }

    has (key) {
        const index = this.hash(key);
        let currentNode = this.bucketsArray[index];

        while (currentNode) {
            if (currentNode.key === key) {
                return true; 
            }
            currentNode = currentNode.next; 
            }

        return false;

    }

    remove (key) {
        const index = this.hash(key);
        let currentNode = this.bucketsArray[index];
        let previousNode = null;

        while (currentNode) {
            if (currentNode.key === key) {
                if (previousNode) {
                    previousNode.next = currentNode.next; // Bypass the node to remove it
                } else {
                    this.bucketsArray[index] = currentNode.next; // Remove head node
                }
                this.occupiedBuckets--;
                return true; // Successfully removed
            }
            previousNode = currentNode;
            currentNode = currentNode.next; 
        }

        return false;

    }

    length() {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            let currentNode = this.bucketsArray[i];
            while (currentNode) {
                count++;
                currentNode = currentNode.next; 
            }
        }
        return count;
    }

    clear() {
        this.bucketsArray = new Array(16).fill(null); 
        this.occupiedBuckets = 0; 
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let currentNode = this.bucketsArray[i];
            while (currentNode) {
                keysArray.push(currentNode.key); 
                currentNode = currentNode.next; 
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let currentNode =this.bucketsArray[i];
            while (currentNode) {
                valuesArray.push(currentNode.value);
                currentNode = currentNode.next;
            }
        }
    
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            let currentNode = this.bucketsArray[i];
            while (currentNode) {
                entriesArray.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        }
        return entriesArray;
    }
}

export default HashMap;