class RAM {
    static memory = new Map();

    static set(key, value) {
        this.memory.set(key, value);
    }

    static delete(key) {
        return this.memory.delete(key);
    }

    static get(key) {
        return this.memory.get(key);
    }

    static clear() {
        this.memory.clear();
    }

    static multipleDelete(keys) {
        let result = true, aux;

        keys.forEach(element => {
            aux = this.memory.delete(element);
            if(!aux) result = false;
        });

        return result;
    }

    static toString() {
        const iterator = this.memory.entries();
        let result = "{", key, value, array;

        for(let i = 0; i < this.memory.size; i++) {
            
        }

        return this.memory;
    }
}

module.exports = RAM;