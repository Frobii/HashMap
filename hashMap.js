const hashMap = () => {
    let buckets = new Array(16);
    let loadFactor = 0.75;
    
    let checkIndexBounds = (index) => {
        if (index < 0 || index >= buckets.length) {
            console.log('Error: Trying to access index out of bound')
            throw new Error("Trying to access index out of bound");
        }
    }

    let loadFactorReached = () => {
        let totalBuckets = 0;
        let tableSize = buckets.length;
        
        for (let i = 0; i < tableSize; i++) {
            if (typeof buckets[i] !== 'undefined') {
                totalBuckets += 1;
            }
        }

        return totalBuckets >= tableSize * loadFactor
    }

    let hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % buckets.length;
    }

    let set = (key, value) => {
        let index = hash(key);

        checkIndexBounds(index);
        if (loadFactorReached()) {
            buckets.length = buckets.length * 2;
            index = hash(key) % buckets.length;
        }

        buckets[index] = {key: key, value: value};
    }

    let get = (key) => {
        let index = hash(key);

        return buckets[index];
    }

    let has = (key) => {
        let index = hash(key);
        let bucket = buckets[index];

        return bucket !== undefined && bucket.key === key;
    }

    let remove = (key) => {
        let index = hash(key);
        let bucket = buckets[index];

        if (bucket !== undefined && bucket.key === key) {
            delete buckets[index]
            return true
        } else {
            return false
        }
    }

    let length = () => {
        let tally = 0;
        for (let i = 0; i < buckets.length; i ++) {
            if (buckets[i]) {
                tally += 1;
            }
        }
        return tally;
    }

    let clear = () => {
        for (let i = 0; i < buckets.length; i ++) {
            if (buckets[i]) {
                delete buckets[i]
            }
        }
    }

    return {
        buckets,
        set,
        get,
        has,
        remove,
        length,
        clear,
    }
}

function randomString() { // Generates a random 4 length string for testing
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 4; i++) {
        let randomPos = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPos, randomPos + 1);
    }

    return randomString;
}

let hashMap1 = hashMap();
let getKey = 'testkey';

for (let i = 0; i < 20; i ++) { // adjust the number of loops until the loadFactor is reached at least once
    let randomKey = randomString();
    hashMap1.set(randomKey, 'hello hashMap');
}
hashMap1.set(getKey, 'hello getKey');

// TESTING SET
console.log('TESTING SET');
console.log(hashMap1.buckets);
console.log('length of hashMap:', hashMap1.buckets.length);
// TESTING GET
console.log('TESTING GET');
console.log(hashMap1.get(getKey));
// TESTING HAS
console.log('TESTING HAS');
console.log('should be true:', hashMap1.has(getKey));
console.log('should be false:', hashMap1.has('this is definitely not a key'));
// TESTING REMOVE
console.log('TESTING REMOVE');
console.log('should be true:', hashMap1.remove(getKey));
console.log('testKey should be removed:', hashMap1.buckets);
console.log('should be false:', hashMap1.remove('this is definitely not a key'));
// TESTING LENGTH
console.log(hashMap1.length())
// TESTING CLEAR
hashMap1.clear()
console.log('this should be empty:', hashMap1.buckets)