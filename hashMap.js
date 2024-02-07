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
        console.log(totalBuckets)

        return totalBuckets >= tableSize * loadFactor
    }

    let hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    let set = (key, value) => {
        let index = hash(key) % buckets.length;

        checkIndexBounds(index);
        if (loadFactorReached()) {
            buckets.length = buckets.length * 2;
            index = hash(key) % buckets.length;
        }

        buckets[index] = {key: key, value: value};
    }

    return {
        buckets,
        set,
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

for (let i = 0; i < 40; i ++) { // i < 13 Should double the length of the array (reached 75% capacity)
    let randomKey = randomString();
    hashMap1.set(randomKey, 'hello hashMap');
}

console.log(hashMap1.buckets);
console.log('length of hashMap:', hashMap1.buckets.length)