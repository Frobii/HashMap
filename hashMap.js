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

        return hashCode;
    }

    let set = (key, value) => {
        // let index = hash(key) % buckets.length;
        let index = key;
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

let hashMap1 = hashMap();

for (let i = 0; i < 13; i ++) { // i < 13 Should double the length of the array (reached 75% capacity)
    hashMap1.set(i, 'hello hashMap');
}

console.log(hashMap1.buckets);