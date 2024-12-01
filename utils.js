// TODO
//
// - Finish writing tests
//
// - Add a 'left align' option to printSpecial so that the extra space is added on the right instead of the left.
//
// - Make sure the highlights array is properly transformed in flipX, flipY, and invert.
//
// Add tests for the following:
// - set having coordinats that are in the form of objects and arrays.
// 
//
// Add functionality to pass an object in for print replacements.
// Add functionality to pass a coordinate into findFirst that finds the first instance of an element after that coordinate.
// Make it so that tests automatically detects when a function exists (i.e. is being exported) but doesn't have a test.
// Remove vectors.


/** A one dimensional range class. Contains various methods for working with ranges. */
class range {
    /**
     * Create a range between two integer. Can be negative.
     * @param {number} start - The start of the range. 
     * @param {number} end - The end of the range.
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns true if the range contains the value, else otherwise.
     * @param {number} value - The value to check. 
     * @returns {boolean}
     */
    contains(value) {
        if (typeof value != "number") throw new Error(highlight("You can only check if a range contains a number.", "red"));
        if ((value >= this.start && value <= this.end) || (value <= this.start && value >= this.end)) return true;
        else return false;
    }
    /**
     * Returns true if the range overlaps with the range passed in, else otherwise. 
     * @param {range} r - The range to check.
     * @returns {boolean}
     */
    overlaps(r) {
        if (typeof r != "object" || typeof r.start != 'number' || typeof r.end != 'number') throw new Error(highlight("Input must be another range.", "red"));
        if (this.contains(r.start) || this.contains(r.end)) return true;
        else return false;
    }
    /**
     * Returns true if the range is a subset of the range passed in, else otherwise.
     * @param {range} r - The range to check.
     * @returns {boolean}
     */
    subset(r) {
        if (typeof r != "object" || typeof r.start != 'number' || typeof r.end != 'number') throw new Error(highlight("Input must be another range.", "red"));
        if (this.start >= r.start && this.end <= r.end) return true;
        else return false;
    }
    /**
     * Returns the intersection of the range and the range passed in.
     * @param {range} r - The range to intersect with.
     * @returns {range|undefined} - Returns the intersection of the range and the range passed in. Returns undefined if the ranges do not overlap.
     */
    intersection(r) {
        if (typeof r != "object" || typeof r.start != 'number' || typeof r.end != 'number') throw new Error(highlight("Input must be another range.", "red"));
        if (!this.overlaps(r)) return undefined;
        return new range(Math.max(this.start, r.start), Math.min(this.end, r.end));
    }
    /**
     * Applies a callback function to every value in the range and returns an array of the results.
     * @param {function} func - A function to apply to each element in the range. It's called with (e) where e is the element.
     * @returns {Array}
     */
    forEach(func) {
        let returnArray = [];
        for (let i = this.start; i <= this.end; i++) {
            returnArray.push(func(i));
        }
        return returnArray;
    }
    /**
     * Returns the direction of the range. 1 if the range is increasing, -1 if the range is decreasing.
     * @returns {number}
     */
    direction() {
        if (this.start < this.end) return 1;
        else return -1;
    }
    /**
     * Returns the value at the index passed in. -1 returns the end of the range.
     * @param {number} index - Number from 0 to the length of the range. -1 returns the end of the range.
     * @returns - The value at the index passed in.
     */
    at(index) {
        if (index == -1) return this.end;
        if (index < 0 || index > this.length) return undefined;
        return this.start + this.direction() * index;
    }
    /**
     * Returns the length of the range.
     * @returns {number}
     */
    get length() {
        return Math.abs(this.end - this.start);
    }
    /**
     * Returns the index of a range based on a given value.
     * @param {number} value - A value within the range to find the index of.
     * @returns {number} - The index of the value within the range. Returns undefined if the value is not in the range.
     */
    indexOf(value) {
        if (this.contains(value)) return Math.abs(value - this.start);
        else return undefined;
    }
    /**
     * Returns the "opposite" value of the value passed in. For example, if the range is 0 to 10, opposite(5) returns 10 - 5 = 5.
     */
    opposite(value) {
        if (typeof value != "number") throw new Error(highlight("You can only find the opposite of a number.", "red"));
        if (!this.contains(value)) throw new Error(highlight("You can only find the opposite of a number in the range.", "red"));
        return this.end - value + this.start;
    }
}

/** A two dimensional vector class. Contains various methods for vector math. */
class vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Returns the length of the vector.
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    // Returns the angle from the x axis to the vector. (radians)
    argument() {
        return Math.atan2(this.y, this.x);
    }
    // Adds the vector passed in to the vector.
    add(vec) {
        return new vector(this.x + vec.x, this.y + vec.y);
    }
    // Subtracts the vector passed in from the vector.
    subtract(vec) {
        return new vector(this.x - vec.x, this.y - vec.y);
    }
    // Multiplies the vector by the scalar passed in.
    multiply(scalar) {
        return new vector(this.x * scalar, this.y * scalar);
    }
    // Rotates the vector by the angle passed in. (radians)
    rotate(angle) {
        let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new vector(x, y);
    }
    // Prints the vector in the form (x, y).
    print() {
        console.log("(" + this.x + ", " + this.y + ")");
    }

}
/** Same as vector, but in 3 dimensions. */
class vector3D extends vector {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    argument(axis) {
        if (axis == "x") return Math.atan2(this.y, this.z);
        else if (axis == "y") return Math.atan2(this.z, this.x);
        else if (axis == "z") return Math.atan2(this.x, this.y);
    }
    add(vector) {
        return new vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    subtract(vector) {
        return new vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    multiply(scalar) {
        return new vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
    }
}
/**  
 * A two dimensional array class. Contains various methods for working with arrays. 
 * Allows for arrays with negative and backwards ranges, unlike normal arrays. Also has a print method with advanced formatting.
 */
class array {
    /**
     * Create an array. Can be called in 3 ways:
     * 
     * array(range1, range2, fillItem) - Creates an array with the given ranges and fills it with the fillItem.
     * 
     * array(2DArray) - Creates an array with the given 2D array.
     * 
     * array(2DArray, fillItem) - Creates an array with the given 2D array and overrides it with the fillItem.
     * 
     */
    constructor(range1, range2 = "undefined", fillItem = "undefined") {

        // Properties
        this.highlights;
        this.array;
        this.range1;
        this.range2;

        // Highlights
        this.highlights = [];

        if (typeof range1 == "object" && (typeof range1.start != "number" || typeof range1.end != "number")) {
            // If the first argument is a utils array, become a clone of it.
            if (range1 instanceof array) {
                this.array = range1.array;
                this.range1 = range1.range1;
                this.range2 = range1.range2;
                this.highlights = range1.highlights;
                return;
            }
            // Allows an array to be passed in as the first argument.
            if (!is2DArray(range1)) throw new Error(highlight("If you pass an object into the first argument array function, it must be a 2D array.", "red"));
            
            // Extrapolates range data from the array.
            this.array = range1;
            this.range1 = new range(0, range1.length - 1);
            const MAX_LENGTH = Math.max(...range1.map(x => x.length));
            this.range2 = new range(0,MAX_LENGTH-1);
    
            // Fills empty spaces with zeroes.
            for (let i = 0; i < range1.length; i++) {
                for (let j = 0; j < MAX_LENGTH; j++) {
                    if (!exists(range1[i][j])) {
                        range1[i].push(0)
                    }
                }
            }
            // If a 2nd paramater was also passed in, its the fillItem.
            if (range2 != "undefined") {
                if (fillItem != "undefined") throw new Error(highlight("If you pass an array as the first argument, you can only pass one other argument (fill item).", "red"));
                this.forEach(_ => range2);
            }

            return;
        }

        // If the first isn't an array, proceed as normal.

        // If the first argument is not a range, make it a range.
        if (typeof range1 == "object") this.range1 = range1;
        else if (typeof range1 == "number") this.range1 = new range(0, range1 - Math.sign(range1));
        else throw new Error(highlight("Range1 must be a number or a range object.", "red"));

        // If the second argument is not a range, make it a range.
        if (typeof range2 == "object") this.range2 = range2;
        else if (typeof range2 == "number") this.range2 = new range(0, range2 - Math.sign(range2));
        else throw new Error(highlight("Range2 must be a number or a range object.", "red"));
        // Create and populate the array.
        this.array = [];

        for (let i = 0; i <= this.range1.length; i ++) {
            this.array.push([]);
            for (let j = 0; j <= this.range2.length; j++) {
                if (fillItem == "undefined") this.array[i].push(0);
                else this.array[i].push(fillItem);
            }
        }
    }
    /**
     * Normalizes inputs to an array with x and y coordinates.
     * @param {number|Object|Array} x - x coordinate of the array. Alternatively can be an object in the form of {x: number, y: number} or an array in the form of [number, number].
     * @param {number} y - y coordinate of the array.
     */
    #normalizeInput(x, y = undefined) {
        if (!exists(x)) throw new Error(highlight("You must pass in at least one argument.", "red"));
         // Single input shenanigans.
         if (!exists(y) || typeof x == "object" || typeof x == "array") {
            // If the input is an object of type {x: number, y: number}, use that.
            if (exists(x.x) && exists(x.y) && Object.keys(x).length == 2) return [x.x, x.y];
            // If the input is an array of type [number, number], use that.
            else if (exists(x[0]) && exists(x[1]) && x.length == 2) return x;
            // You fucked up if you got here.
            else {
                throw new Error(highlight("If you try to call a function with only one paramater, you must use an object in the form of {x: number, y: number} or an array in the form of [number, number]. You tried to call it with ", "red") + x);
            }
        }
        if (typeof x != "number" || typeof y != "number") throw new Error(highlight("You can only index an array with numbers. (You tried to index with x:" + x + ", y:" + y + "", "red"));
        // Return the value at the given coordinates.
        return [x, y];
    }
    /**
     * Shifts this array's x range forward by a given amount.
     * @param {number} amount - The amount to shift the range forward by.
     */
    shiftXRange(amount) {
        if (typeof amount != "number") throw new Error(highlight("You can only shift the range by a number.", "red"));
        this.range1 = new range(this.range1.start + amount, this.range1.end + amount);
    }
    /**
     * Shifts this array's y range forward by a given amount.
     * @param {number} amount - The amount to shift the range forward by.
     */    
    shiftYRange(amount) {
        if (typeof amount != "number") throw new Error(highlight("You can only shift the range by a number.", "red"));
        this.range2 = new range(this.range2.start + amount, this.range2.end + amount);
    }
    /**
     * Gets the value of the array at the given coordinates. Can be negative.
     * @param {number|Object|Array} x - x coordinate of the array. Alternatively can be an object in the form of {x: number, y: number} or an array in the form of [number, number].
     * @param {number} y - y coordinate of the array. If x is an object or array, this is ignored.
     * @returns {any}
     */
    get(x, y = undefined) {
        let [X, Y] = this.#normalizeInput(x, y);
        if (!this.range1.contains(X)) return undefined;
        if (!this.range2.contains(Y)) return undefined;
        return this.array[this.range1.indexOf(X)][this.range2.indexOf(Y)];
    }
    /**
     * Sets the value of the array at the given coordinates. Can be negative.
     * @param {number} x - x coordinate of the array. Alternatively can be an object in the form of {x: number, y: number} or an array in the form of [number, number].
     * @param {number} y - y coordinate of the array. If x is an object or array, this is ignored.
     * @param {any} value - The value to set the array at the given coordinates to.
     */
    set(x, y, value = 'nothing') {
        let [X, Y] = this.#normalizeInput(x, y);
        if (value == 'nothing') {
            if (typeof x == "number") throw new Error(highlight("It seems like you've tried to set something to be the keyword \"nothing\".", "red"));
            else value = y;
        }
        // Makes sure the coordinates are numbers that are in range.
        if (typeof X != "number" || typeof Y != "number") throw new Error(highlight("You can only index an array with numbers. (You tried to index with x:" + X + ", y:" + Y + "", "red"));
        if (!this.range1.contains(X)) throw new Error(highlight("You tried to set an x coordinate of " + X + " in an array with an X range of " + this.range1.start + " to " + this.range1.end, "red"));
        if (!this.range2.contains(Y)) throw new Error(highlight("You tried to set a y coordinate of " + Y + " in an array with a Y range of " + this.range2.start + " to " + this.range2.end, "red"));
        // Set the value at the given coordinates.
        this.array[this.range1.indexOf(X)][this.range2.indexOf(Y)] = value;
    }
    /**
     * Highlights the string stored at the given coordinates. Can be negative. Optionally pass in a color at the end to change the color.
     * @param {number} x - x coordinate of the array. Alternatively can be an object in the form of {x: number, y: number} or an array in the form of [number, number].
     * @param {number} y - y coordinate of the array. If x is an object or array, this is ignored.
     * @param {string} color - The color to highlight the string with. Defaults to green.
     */ 
    highlight(x, y, color = "green") {
        let [X, Y] = this.#normalizeInput(x, y);
        let value = this.get(X, Y);
        if (colorCodes[y]) color = y;
        if (typeof value == "number") value = String(value);
        if (typeof value != "string") throw new Error(highlight("You can only highlight strings.", "red"));
        this.highlights.push({x:x, y:y, color:color});
    }
    /**
     * @param {boolean} coords - Whether or not to print coordinate helpers.
     * @param {Array} replacements - Replacements can take in functions or values. For example, replacements = [[(x) => x % 2 == 0, " "], [1, "#"]] will replace all even numbers with spaces and all 1s with #s. Replacements do not affect the original array, and only display in the print function.
     */
    print(coords = false, replacements = []) {
        if (replacements != [] && !is2DArray(replacements) && typeof replacements != "function") {
            throw new Error(highlight("Replacements must be a 2D array. You passed in [" + replacements + "]\n", "red") + 
                "E.g.\n" +
                highlight("\t[[\"0\", \".\"], [\"1\", \"#\"]]\n", 'green') +
                "to replace 0s with periods and 1s with hashtags. You could also use functions to do the same thing, like this:" +
                highlight("\n\t[(x) => x==\"0\", \".\"], [(x) => x==\"1\", \"#\"]]\n", 'green') + 
                "or like this " +
                highlight("\n\t(x) => {if (x == \"0\") return \".\"; if (x == \"1\" return \"#\"; else return x;}\n", 'green')
                );
        }
        if (is2DArray(replacements)) {
            for (let replacement of replacements) {
                if (replacement.length != 2) {
                    throw new Error(highlight("Each replacement must be an array with 2 elements. You passed in " + replacement + "\n", "red"));
                }
            }
        }
        // Gets a line string from a line of the array. Uses replacements.
        function getLineString(line) {
            let linestring = "";
            for (let i = 0; i < line.length; i++) {

                let hasBeenReplaced = false;
                if (typeof replacements == "function") {
                    linestring += replacements(line[i]);
                }
                else {
                    for (let replacement of replacements) {
                        // If the replacement is a function and it evaluates to true, replace.
                        if ((typeof replacement[0] == "function" && replacement[0](line[i])) || replacement[0] == line[i]) {
                            if (typeof replacement[1] == "function") {
                                linestring += replacement[1](line[i]);
                            }
                            else {
                                linestring += replacement[1];
                            }
                            hasBeenReplaced = true;
                            break;
                        }
                    }
                    if (!hasBeenReplaced) {
                        linestring += line[i];
                    }
                }
            }
            return linestring;
        }
        // Prints extra coordinate helpers if coords is true.
        if (coords) {
            let linestringLength =  getLineString(this.array[0]).replace(/\x1b\[[0-9]*m/g, "").length;
            console.log("    ", String(this.range2.start) + String(this.range2.end).padStart(linestringLength - this.range2.start.toString().length, " "));
            console.log("    +".padEnd(linestringLength + 5, "-"))
        }
        for (let i = 0; i < this.array.length; i++) {
            let linestring = "";
            // Prints extra coordinate helpers if coords is true.
            if (coords) {
                if (i == 0) {
                    linestring += String(this.range1.start).padStart(4, " ") + "|";
                }
                else if (i == this.array.length - 1) {
                    linestring += String(this.range1.end).padStart(4, " ") + "|";
                }
                else {
                    linestring += "    |";
                }
            }
            // Creates the string for the current line of the array to be printed.
            linestring += getLineString(this.array[i]);
            console.log(linestring);
        }
        // Separates each line with a newline.
        console.log();
    }
    /**
     * Flips the x position of all the items in the array. Does not return anything.
     */
    flipX() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].reverse();
        }
        return;
    }
    /**
     * Flips the y position of all the items in the array. Does not return anything.
     */
    flipY() {
        this.array.reverse();
        return;
    }
    /**
     * Swaps the x and y values of all the items in the array, or "transposes" it.
     * @returns {array} - Returns a new array with the x and y values swapped.
     */
    invert() {
        let newArray = new array(this.range2, this.range1);
        for (let i = 0; i < this.array.length; i ++) {
            for (let j = 0; j < this.array[i].length; j++) {
                newArray.set(this.range2.at(j), this.range1.at(i), this.get(this.range1.at(i), this.range2.at(j)));
            }
        }
        return newArray;
    }
    /**
     * Converts the array into a normal javascript array.
     * @returns {Array} - Returns a normal javascript array. 
     */
    toArray() {
        return this.array;
    }
    // Applies a function to every item in the array.
    /**
     * @deprecated Use map instead.
     * Applies a callback function to every item in the array.
     * @param {function} func - A function to apply to each element in the array. It's called with (e) where e is the element.
     * Transformations are applied in place and override the original array. They happen simultaneously.
     */
    forEach(func) {
        let tempArray = [];
        for (let i = 0; i < this.array.length; i++) {
            tempArray.push([]);
            for (let j = 0; j < this.array[i].length; j++) {
                tempArray[i].push(func(this.get(this.range1.at(i), this.range2.at(j))));
            }
        }
        this.array = tempArray;
        return;
    }
    /**
     * @deprecated. Use map instead.
     * Applies a callback function to every item in the array.
     * @param {function} func - A function to apply to each element in the array. It's called with (array, x, y).
     * Transformations are applied in place and override the original array. They happen simultaneously.
     */
    forEachIJ(func) {
        let tempArray = [];
        for (let i = 0; i < this.array.length; i++) {
            tempArray.push([]);
            for (let j = 0; j < this.array[i].length; j++) {
                tempArray[i].push(func(this, this.range1.at(i), this.range2.at(j)));
            }
        }
        this.array = tempArray;
    }
    /**
     * Maps the array to a new array and returns a copy.
     * @param {function} func - A function to apply to each element in the array. It's called with (e, x, y, array) where e is the element.
     */
    map(func) {
        if (typeof func == 'undefined') {
            console.warn(highlight("WARNING: You didn't pass in a function to map. Returning a copy of the array.", 'orange'));
            return this.clone();
        }
        if (typeof func != "function") throw new Error(highlight("You can only map an array with a function. You tried ", "red") + func);
        let tempArray = [];
        for (let i = 0; i < this.array.length; i++) {
            tempArray.push([]);
            for (let j = 0; j < this.array[i].length; j++) {
                tempArray[i].push(func(this.get(this.range1.at(i), this.range2.at(j)), this.range1.at(i), this.range2.at(j), this));
            }
        }
        tempArray = new array(tempArray);
        tempArray.range1 = this.range1;
        tempArray.range2 = this.range2;
        return tempArray;
    }
    /**
     * Gets the neighbors of a certain position in the array in a square with radius of size. Passing in no argument gets non-diagonal size 1 neighbors.
     * If size = 0, neighbors are ordered in the order of up, down, left, right. Otherwise they are ordered from top left to bottom right.
     * @param {number} x - x coordinate of the array. Can also be an object in the form of {x: number, y: number} or [number, number].
     * @param {number} y - y coordinate of the array. If x is an object or array, this is ignored.
     * @param {number} size - The radius of the square to get neighbors from. Defaults to 0 (non-diagonal 1-neighbors).
     */
    neighbors(x, y, size = 0) {
        let [X, Y] = this.#normalizeInput(x, y);
        if ((typeof x == "object" || typeof x == "array") && y != undefined) size = y;
        let neighbors = [];
        if (size == 0) {
            if (this.range1.contains(X - 1) && this.range2.contains(Y)) {
                neighbors.push({x: X - 1, y: Y});
            }
            if (this.range1.contains(X + 1) && this.range2.contains(Y)) {
                neighbors.push({x: X + 1, y: Y});
            }
            if (this.range1.contains(X) && this.range2.contains(Y - 1)) {
                neighbors.push({x: X, y: Y - 1});
            }
            if (this.range1.contains(X) && this.range2.contains(Y + 1)) {
                neighbors.push({x: X, y: Y + 1});
            }
        }
        else {
            for (let i = X - size; i <= X + size; i++) {
                for (let j = Y - size; j <= Y + size; j++) {
                    if (i == X && j == Y) continue;
                    if (this.range1.contains(i) && this.range2.contains(j)) {
                        neighbors.push({x: i, y: j});
                    }
                }
            }
        }
        return neighbors;
    }
    /**
     * Gets an array of each of the rows in the array.
     * @returns {Array} - An array of each of the rows in the array.
     */
    get rows() {
        return this.array;
    }
    /**
     * Gets an array of each of the columns in the array.
     * @returns {Array} - An array of each of the columns in the array.
     */
    get columns() {
        let columns = [];
        for (let i = 0; i < this.array[0].length; i++) {
            columns.push([]);
            for (let j = 0; j < this.array.length; j++) {
                columns[i].push(this.array[j][i]);
            }
        }
        return columns;
    }
    /** 
     * Clones the array and returns a copy.
     */
    clone() {
        let newArray = new array(this.range1, this.range2);
        newArray.array = this.array.map(x => x.slice());
        return newArray;
    }
    /**
     * Prints the array auto-formatted with coordinate helpers on by default.
     * @param {boolean} coordHelpers - Whether or not to print coordinate helpers. Defaults to true.
     * @param {number} extraSpace - Minimum amount of leading spaces to pad each item with. Defaults to 0.
     */
    printSpecial(coordHelpers = true, extraSpace = 0) {
        let maxLength = 0;
        this.forEachIJ((arr, i, j) => {
            if (String(arr.get(i, j)).replace(/\x1b\[[0-9]*m/g, "").length > maxLength) maxLength = String(arr.get(i, j)).replace(/\x1b\[[0-9]*m/g, "").length;
            return arr.get(i, j);
        });
        // Adds highlights
        this.highlights.map(item => this.set(item.x, item.y, highlight(this.get(item.x, item.y), item.color)))
        this.print(coordHelpers, x => {
            let returnString = '';
            for (let i = 0; i < maxLength - String(x).replace(/\x1b\[[0-9]*m/g, "").length + extraSpace; i++) {
                returnString += ' ';
            }
            return returnString + x;
        });
        // Removes highlights
        this.highlights.map(item => this.set(item.x, item.y, this.get(item.x, item.y).replace(/\x1b\[[0-9]*m/g, "")))


    }
    /**
     * Finds the first instance of a specific element in the array
     * @returns {Object} the x and y coordinates of the element, given by {x: x-coord, y: y-coord}.
     */
    find(element) {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array.length; j++) {
                if (compareItems(element, this.array[i][j])) return {x: this.range1.at(i), y: this.range2.at(j)};
            }
        }
        console.warn(highlight("WARNING: element could not be found using array.find(). Returning undefined.", 'orange'));
        return;
    }
    /** 
     * Finds all instances of a specific element in the array
     * @returns {Array} An array of x and y coordinates in the form of objects. (e.g. [{x: 1, y: 1}, {x: 2, y: 2}])
     */
    findAll(element) {
        let returnArray = [];
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array.length; j++) {
                if (compareItems(element, this.array[i][j])) returnArray.push({x: this.range1.at(i), y: this.range2.at(j)});
            }
        }
        if (returnArray == []) {
            console.warn(highlight("WARNING: element could not be found using array.findAll(). Returning empty list.", 'orange'));
        }
        return returnArray;
    }
    /**
     * Replaces all instances of a specific element in the array with another element.
     * @param {any} element - The element to replace.
     * @param {any} replacement - The element to replace it with.
     * @returns {array} - Returns a new array with the element replaced.
     */
    replaceAll(element, replacement) {
        return this.map((x) => {
            if (compareItems(x, element)) return replacement;
            else return x;
        }
        );
    }
    /**
     * Replaces the first instance of a specific element in the array with another element.
     * @param {any} element - The element to replace.
     * @param {any} replacement - The element to replace it with.
     * @returns {array} - Returns a new array with the first instance of the element replaced.
    */
    replaceFirst(element, replacement) {
        let found = false;
        return this.map((x) => {
            if (!found && compareItems(x, element)) {
                found = true;
                return replacement;
            }
            else return x;
        });
    }
    /**
     * Returns the sum of all the elements in the array.
     * @returns {number} - The sum of all the elements in the array.
     */
    sum() {
        let sum = 0;
        this.map(x => {
            if (typeof x != "number") throw new Error(highlight("You tried to add " + x + " to the sum, but it's not a number.", "red"));
            sum += x;
        });
        return sum;
    }

    
}
/** Nothing to see here. Just your average jaiden. */ 
class jaiden {
    /**
     * Creates a jaiden.
     */
    constructor() {
        this.name = "jaiden";
    }
    /**
     * Says the name of the jaiden.
     */
    sayName() {
        console.log(this.name);
    }
    /**
     * Inverts the name of the jaiden.
     */
    invert() {
        this.name = this.name.reverse()
    }
}
/**
 * Returns true if the item passed in is a 2D array, false otherwise.
 * @param {Array} array 
 * @returns {boolean}
 */
function is2DArray(array) {
    if (!Array.isArray(array)) return false;
    for (let item of array) {
        if (!Array.isArray(item)) return false;
    }
    return true;
}
/**
 * Returns true if the item passed in exists, else otherwise.
 * @param {any} value 
 * @returns {boolean}
 */
function exists(value) {
    if (value == undefined) return false;
    if (value == null) return false;
    if (Number.isNaN(value)) return false;
    else return true;
}
/**
 * Compares two items and returns true if they are structurally equal, else otherwise.
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
function compareItems(a,b) {
    if (a === undefined && b === undefined) {
        console.warn(highlight("WARNING: compareItems received two undefineds. "));
    }
    if (typeof a != typeof b) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length != b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!compareItems(a[i], b[i])) return false;
        }
        return true;
    }
    else if (typeof a == "object" && typeof b == "object") {
        if (Object.keys(a).length != Object.keys(b).length) return false;
        for (let [key, value] of Object.entries(a)) {
            if (!exists(b[key])) return false;
            if (!compareItems(value, b[key])) return false;
        }
        return true;
    }
    else {
        return a == b;
    }
}
/**
 * returns the gcd of an arbitrary number of numbers.
 * @returns {number} - The gcd of the two numbers.
 */
function gcd() {
    if (Array.isArray(arguments[0])) return gcd(...arguments[0]);
    if (arguments.length > 2) return gcd(arguments[0], gcd(...Array.from(arguments).slice(1)));
    let a = arguments[0];
    let b = arguments[1];
    if (typeof a != "number" || typeof b != "number") throw new Error(highlight("You can only find the gcd of numbers.", "red"));
    if (b == 0) return a;
    return gcd(b, a % b);
}
/** 
 * Returns the lcm of an arbitrary number of numbers.
 * @returns {number} - The lcm of the two numbers.
 */
function lcm() {
    if (Array.isArray(arguments[0])) return lcm(...arguments[0]);
    if (arguments.length > 2) return lcm(arguments[0], lcm(...Array.from(arguments).slice(1)));
    let a = arguments[0];
    let b = arguments[1];
    if (typeof a != "number" || typeof b != "number") throw new Error(highlight("You can only find the lcm of numbers.", "red"));
    return Math.abs(a * b) / gcd(a, b);
}
/**
 * Decomposes a number into its prime factors. Optional secondary argument to return only the unique prime factors.
 * @param {number} n - The number to decompose.
 * @param {boolean} unique - Whether or not to return only the unique prime factors.
 * @returns {Array} - An array of the prime factors of the number.
 */
function primeFactors(n, unique = false) {
    if (typeof n != "number") throw new Error(highlight("You can only find the prime factors of a number.", "red"));
    let factors = [];
    for (let i = 2; i <= n; i++) {
        while (n % i == 0) {
            factors.push(i);
            n /= i;
        }
    }
    if (unique) return [...new Set(factors)];
    else return factors;

}
/**
 * Returns true if the two numbers passed in are coprime, else otherwise.
 * @param {number} a - Integer 1.
 * @param {number} b - Integer 2.
 * @returns {boolean} - Whether or not the two numbers are coprime.
 */
function coprime(a, b) {
    if (typeof a != "number" || typeof b != "number") throw new Error(highlight("You can only check if two numbers are coprime.", "red"));
    if (gcd(a, b) == 1) return true;
    else return false;
}
/**
 * Returns the unique elements of an array in the same order that each one first appeared.
 * @param {Array} arr - The array to find the unique elements of. 
 * @returns 
 */
function unique(arr) {
    if (!Array.isArray(arr)) throw new Error(highlight("You can only find the unique elements of an array.", "red"));
    return [...new Set(arr)];
}
/**
 * Prints the status of a test.
 * @param {string} name - Name of function that was tested.
 * @param {boolean|undefined} isWorking - Whether or not the test was successful. Undefined for unable to be tested.
 * @param {string} errMsg - The error message to print if the test failed.
 */
function printStatus(name, isWorking, errMsg) {
    if (typeof isWorking == 'undefined') {
        console.log('\x1b[33m- %s\x1b[0m', name + ' was unable to be tested! ' + errMsg)
    }
    else if (isWorking) {
        console.log('\x1b[32m- %s\x1b[0m', name + ' working! ')
    }
    else {
        console.log('\x1b[31m- %s\x1b[0m', name + ' not working! ' + errMsg)
    }
}
/**
 * Function for parsing advent of code inputs.
 * @param {string} input - The input to parse.
 * @param {string} parseString - The structure of the input.
 * {variable} denotes that an object should be created with the name of the variable as the key and the value as the value.
 * {variable:parseString} denotes that an object should be created with the variable as the key and the value parsed with the parseString as the value.
 * arr(separator)[parseString] denotes that an array should be created with the separator as the separator and the parseString as the structure of the array.
 * obj(separator)[parseString with {key} and {value}] denotes that an object should be created with the separator as the separator and the parseString as the structure of the object. {key} and {value} are replaced with the key and value of the object.
 * # parses as a number. Only usable inside arrays.
 * $ parses as a string. Only usable inside arrays.
 * @returns {Object|Array|number}
 */
function parse(input, parseString) {
    if (parseString == "#") {
        if (!exists(parseInt(input))) throw new Error(highlight("Could not parse " + input + " as a number.", "red"));
        return parseInt(input);
    }
    if (parseString == "$") {
        return input;
    }

    function separate(string) {
        let pieces = [ {type: "text", value:""} ];
        for (let i = 0; i < string.length; i++) {
        // Array
        if (string.slice(i, i + 4) == "arr(") {
            let separator = "";
            let content = "";
            let openParentheses = 1;
            let j = i + 4;
            while (openParentheses > 0) {
                if (string[j] == "(") openParentheses++;
                if (string[j] == ")") openParentheses--;
                separator += string[j];
                j++;
            }
            separator = separator.slice(0, -1);
            if (string.slice(j, j + 1) != "[") {
                throw new Error(highlight("Expected [ after arr(...)",  "red"));
            }
            else {
                openBrackets = 1;
                j += 1;
                while (openBrackets > 0) {
                    if (string[j] == "[") openBrackets++;
                    if (string[j] == "]") openBrackets--;
                    content += string[j];
                    j++;
                }
                content = content.slice(0, -1);
            }
            pieces.push({type: "array", value: content, sepString: separator});
            i = j - 1;
        }
        // Object
        else if (string.slice(i, i + 4) == "obj(") {
            let separator = "";
            let content = "";
            let openParentheses = 1;
            let j = i + 4;
            while (openParentheses > 0) {
                if (string[j] == "(") openParentheses++;
                if (string[j] == ")") openParentheses--;
                separator += string[j];
                j++;
            }
            separator = separator.slice(0, -1);
            if (string.slice(j, j + 1) != "[") {
                console.error("Error: expected [ after obj(...)");
            }
            else {
                openBrackets = 1;
                j += 1;
                while (openBrackets > 0) {
                    if (string[j] == "[") openBrackets++;
                    if (string[j] == "]") openBrackets--;
                    content += string[j];
                    j++;
                }
                content = content.slice(0, -1);
            }
            pieces.push({type: "object", value: content, sepString: separator});
            i = j - 1;
        }
        // Variable
        else if (string[i]=="{") {
            let inside = "";
            let openBrackets = 1;
            let j = i + 1;
            while (openBrackets > 0) {
                
                if (string[j] == "{") openBrackets++;
                if (string[j] == "}") openBrackets--;
                inside += string[j];
                j++;
            }
            inside = inside.slice(0, -1);
            if (inside.includes(":")) {
                pieces.push({type: "key-value", name: inside.split(":")[0], content: inside.split(":").slice(1).join(":")});
            }
            else {
                pieces.push({type: "variable", name: inside});
            }
            i = j - 1;
        }
        // Plaintext
        else {
            if (pieces.at(-1).type == "text") {
                pieces[pieces.length - 1].value += string[i];
            }
            else {
                pieces.push({type: "text", value: string[i]});
            }
        }
     } 
     return pieces;
    }

    let pieces = separate(parseString);

    // Clean edges
    // console.log("BEFORE: " + input, pieces);
    if (pieces[0].type == "text") {
        input = input.slice(pieces[0].value.length);
        pieces.shift();
    }
    // console.log(pieces);
    if (pieces.at(-1).type == "text") {
        input = input.slice(0, -pieces.at(-1).value.length);
        pieces.pop();
    }
    // console.log("AFTER: " + input, pieces);


    // Separate by text
    let brokenInput = [input];
    for (let p = 0; p < pieces.length; p++) {
        if (pieces[p].type == "text") {
            end = brokenInput.pop();
            brokenInput.push(...end.split(pieces[p].value).filter(x => x != ""));
            pieces.splice(p, 1);
            p--;
        }
    }
    // console.log(brokenInput, pieces)

    // Makes sure stuff is going all right.
    if (brokenInput.length != pieces.length) {
        throw new Error(highlight("brokenInput and pieces are not the same length.", "red"));
        // console.log(brokenInput);
        // console.log(pieces);
    }

    // If its just a single array then return that.
    if (pieces.length == 1 && pieces[0].type == "array") {
        let returnArray = [];
        for (let item of brokenInput[0].split(pieces[0].sepString).filter(x => x != "")) {
            returnArray.push(parse(item, pieces[0].value));
        }
        return returnArray;
    }

    // Otherwise its an object.
    let returnObject = {};

    // If its just a single object then parse it properly.
    if (pieces.length == 1 && pieces[0].type == "object") {
        for (let item of brokenInput[0].split(pieces[0].sepString).filter(x => x != "")) {
            // console.log("parsing " + item + " with " + pieces[0].value)
            let parsed = parse(item, pieces[0].value);
            returnObject[parsed['key']] = parsed['value'];
        }
        return returnObject;
    }
    
    // Objecty stuff
    for (let i = 0; i < brokenInput.length; i++) {
        if (pieces[i].type == "variable") {
            returnObject[pieces[i].name] = brokenInput[i];
        }
        if (pieces[i].type == "key-value") {
            returnObject[pieces[i].name] = parse(brokenInput[i], pieces[i].content);
        }
    }
    return returnObject;
}
/**
 * Permutes an array or a string in all possible ways.
 * @param {Array|string} array - The array/string to permute.
 * @returns {Array} - Returns an array of all possible permutations of the array/string.
 */
function permutations(array) {
    if (array.length > 9) throw new Error(highlight("You can't permute an array with more than 9 items.", "red"));
    if (!Array.isArray(array) && typeof array != "string") throw new Error(highlight("You can only permute arrays and strings, but you tried to permute" + array, "red"));
    if (array.length > 20) throw new Error(highlight("You can't permute an array with more than 20 items.", "red"));
    if (array.length == 1) return [array];
    let perms = [];
    for (let i = 0; i < array.length; i++) {
        perms.push(...permutations(array.slice(0, i).concat(array.slice(i + 1))).map(x => [array[i]].concat(x)));
    }
    if (typeof array == "string") perms = perms.map(x => x.join(""));
    return perms;
}
/** returns all the ways to make a length n string from a and b.
* @param {number} n - The length of the string.
* @param {string} a - The first character.
* @param {string} b - The second character.
* @param {string} c - How many of the first character there are.
* @returns {Array} - Returns an array of all possible strings.
*/
function abStrings(n, a, b, c) {
    // c is how many of the first character there are.
    if (n == 0) return [""];
    if (n == 1) {
        if (c == 1) return [a];
        else return [b];
    }
    let strings = [];
    if (c > 0) {
        strings.push(...abStrings(n - 1, a, b, c - 1).map(x => a + x));
    }
    strings.push(...abStrings(n - 1, a, b, c + 1).map(x => b + x));
    return strings;

}
/**
 * Gets the display length of a string. (i.e. how many characters wide it is when you console.log it.)
 * @param {string} str - the string you want to know the length of
 * @returns {Number} the length of the string
 */
function getStringDisplayLength(str) {
    return str.replace(/\x1b\[[0-9]*m/g, "").length;
}
/**
 * Returns the ASCII value of a character.
 * @param {string} char - The character to get the ASCII value of.
 * @returns {number} - The ASCII value of the character.
 */
function ASCII(char) {
    if (typeof char != "string") throw new Error(highlight("You can only get the ASCII value of a string.", "red"));
    if (char.length != 1) throw new Error(highlight("You can only get the ASCII value of a single character.", "red"));
    return char.charCodeAt(0);
}


const tests = {
    arrayTests: {
        constructor: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "constructor";

            // TESTS BEGIN HERE
        
            // Makes sure exists function works.
            if (!tests.functionTests.exists(false)) {
                errMsg = "Unable to test exists function.";
                isWorking = undefined;
errMsg = "Test not implimented yet."
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Make sure 1D arrays are not accepted.
            try {
                let testArr = [1, 2, 3]
                let myArr = new array(testArr);
                errMsg = "2d array constructor accepted a 1d array.";
                isWorking = false;
                printStatus(name, isWorking, errMsg); return;
            }
            catch {
                // Do nothing.
            }
            // Makes sure 2d arrays are accepted.
            try {
                let testArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
                let myArr = new array(testArr);
            }
            catch {
                errMsg = "2d array constructor did not accept a 2d array.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Makes a basic array with ranges, and makes sure all of its basic properties are correct.
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let myArr; 
            let myArr2;
            try {
                myArr = new array(new range(-5, 7), 10);
                myArr2 = new array(new range(45, 3), -10);
            }
            catch {
                errMsg = "Array constructor returned an error when passed in valid inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // If the constructor did not return anything, something is wrong.
            if (!exists(myArr) || !exists(myArr2)) {
                errMsg = "Array constructor did not return / returned undefined";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure that each part of the array type exists.
            if (!exists(myArr.range1) || !exists(myArr2.range1)) {
                errMsg = "Array constructor did not return a range1"
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists(myArr.range2) || !exists(myArr2.range2)) {
                errMsg = "Array constructor did not return a range1"
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists(myArr.array) || !exists(myArr2.array)) {
                errMsg = "Array constructor only contained a range1 and range2, was missing an array."
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure range1 was properly set.
            if (myArr.range1.start != -5 || myArr2.range1.start != 45) {
                errMsg = "Array range set using range object has incorrect starting pos.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range1.end != 7 || myArr2.range1.end != 3) {
                errMsg = "Array range set using range object has incorrect ending pos.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure range2 was properly set.
            if (myArr.range2.start != 0 || myArr.range2.start != 0) {
                errMsg = "Array range set using a number has incorrect starting pos.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range2.end != 9 || myArr2.range2.end != -9) {
                errMsg = "Array range set using a number has incorrect ending pos.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the array is the right length.
            if (myArr.array.length != 13 || myArr2.array.length != 43) {
                errMsg = "Internal \"x\" array length is not correct";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.array[0].length != 10 || myArr2.array[0].length != 10) {
                errMsg = "Internal \"y\" array length is not correct";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
            
        },
        shiftXRange: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "shiftXRange";

            // TESTS BEGIN HERE

            // Makes sure arrays are constructing properly.
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            
            // Makes sure that the shiftXRange function works.
            let myArr = new array(new range(-5, 7), 10);
            try {
                myArr.shiftXRange(5);
            }
            catch {
                errMsg = "shiftXRange returned an error when passed in valid inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range1.start != 0 || myArr.range1.end != 12 || myArr.range2.start != 0 || myArr.range2.end != 9) {
                errMsg = "shiftXRange did not shift the range correctly.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the shiftXRange function works with negative numbers.
            try {
                myArr.shiftXRange(-5);
            }
            catch {
                errMsg = "shiftXRange returned an error when passed in valid (negative) inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range1.start != -5 || myArr.range1.end != 7 || myArr.range2.start != 0 || myArr.range2.end != 9) {
                errMsg = "shiftXRange did not shift the range correctly. (negative input)";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the shiftXRange function only accepts numbers.
            try {
                myArr.shiftXRange("5");
                myArr.shiftXRange([5, 5]);
                myArr.shiftXRange({ "5": 5 });
                myArr.shiftXRange(true);
                errMsg = "shiftXRange did not throw an error when passed in an array.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
                // This should throw an error.
            }

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        shiftYRange: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "shiftYRange";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure that the shiftYRange function works.
            let myArr = new array(new range(-5, 7), 10);
            try {
                myArr.shiftYRange(5);
            }
            catch {
                errMsg = "shiftYRange returned an error when passed in valid inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range1.start != -5 || myArr.range1.end != 7 || myArr.range2.start != 5 || myArr.range2.end != 14) {
                errMsg = "shiftYRange did not shift the range correctly.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the shiftYRange function works with negative numbers.
            try {
                myArr.shiftYRange(-5);
            }
            catch {
                errMsg = "shiftYRange returned an error when passed in valid (negative) inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myArr.range1.start != -5 || myArr.range1.end != 7 || myArr.range2.start != 0 || myArr.range2.end != 9) {
                errMsg = "shifTYRange did not shift the range correctly. (negative input)";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the shiftYRange function only accepts numbers.
            try {
                myArr.shiftYRange([5, 5]);
                myArr.shiftYRange({ "5": 5 });
                myArr.shiftYRange(true);
                errMsg = "shiftYRange did not throw an error when passed in an array.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
                // This should throw an error.
            }
            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        get: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "get";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let basicArray = [];
            for (let i = -5; i <= 7; i++) {
                basicArray.push([]);
                for (let j = 0; j <= 9; j++) {
                    basicArray[i + 5].push([i,j].join(','));
                }
            }
            let myArr = new array(basicArray);
            myArr.range1 = new range(-5, 7);
            myArr.range2 = new range(0, 9);
            // Makes sure that the get function works.
            try {
                if (myArr.get(0, 0) != "0,0") {
                    errMsg = "get did not return the correct value.";
                    isWorking = false;
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }   
                if (myArr.get({x: 3, y: 1}) != "3,1") {
                    errMsg = "get did not return the correct value when passed in an object.";
                    isWorking = false;
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (myArr.get(5, 5) != "5,5") {
                    errMsg = "get did not return the correct value when passed in valid inputs";
                    isWorking = false;
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (myArr.get(-5, 0) != "-5,0") {
                    errMsg = "get did not return the correct value when passed in valid inputs";
                    isWorking = false;
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                errMsg = "get returned an error when passed in valid inputs";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            try {
                myArr.get({x: true, y: true});
                errMsg = "get did not throw an error when passed in an object with invalid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
                // This should throw an error.
            }

            try {
                myArr.get({x: "5", y: "5"});
                errMsg = "get did not throw an error when passed in an object with invalid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
            }
            
            try {
                myArr.get({x: undefined, y: undefined});
                errMsg = "get did not throw an error when passed in an object with invalid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
            }

            try {
                myArr.get([1,2,3]);
                errMsg = "get did not throw an error when passed in an array with more than 2 elements.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
                
            }
            catch {
            }

            try {
                myArr.get(1);
                errMsg = "get did not throw an error when passed in a number.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
            }

            try {
                myArr.get({x:1,y:1,z:1});
                errMsg = "get did not throw an error when passed in an object with too many properties.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
            }
            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;;
        },
        set: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "set";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let myArr = new array(-10, 10);
            try {
                myArr.set(-9, 9, 1);
                if (myArr.get(-9, 9) != 1) {
                    errMsg = "set did not set the correct value.";
                    isWorking = false;
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                errMsg = "set threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            myArr.set(-9, 8, 2);
            if (
                myArr.toArray().at(-1)[0] != 0 ||
                myArr.toArray().at(-1)[1] != 0 ||
                myArr.toArray().at(-1)[2] != 0 ||
                myArr.toArray().at(-1)[3] != 0 ||
                myArr.toArray().at(-1)[4] != 0 ||
                myArr.toArray().at(-1)[5] != 0 ||
                myArr.toArray().at(-1)[6] != 0 ||
                myArr.toArray().at(-1)[7] != 0 ||
                myArr.toArray().at(-1)[8] != 2 ||
                myArr.toArray().at(-1)[9] != 1
            ) {
                errMsg = "set did not set the correct value.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        // This one is unlike the others, requires visual confirmation by the user.
        print: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "print";

            // TESTS BEGIN HERE
            console.log("\x1b[34m%s\x1b[0m", "Testing print... Please make sure the outputs match their descriptions.\n");
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if(!tests.arrayTests.map(false)) {
                errMsg = "Unable to use the map function on an array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if(!tests.arrayTests.set(false)) {
                errMsg = "Unable to set values in array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if(!tests.functionTests.is2DArray(false)) {
                errMsg = "Unable to check if an array is 2D.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                console.log("Testing \x1b[34mprint\x1b[35m(\x1b[33mtrue\x1b[35m)\x1b[0m. You should see an array from 0 to 9 on the top and from 0 to -9 on the left. The bottom right corner should be 1, the one to the left of it should be 2, and the rest should be 0.");
                let myArr = new array(-10, 10);
                myArr.set(-9, 9, 1);
                myArr.set(-9, 8, 2);
                myArr.print(true);
            }
            catch {
                errMsg = "print threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                console.log("Testing  \x1b[34mprint\x1b[35m(\x1b[33mfalse\x1b[m, \x1b[34mfunction\x1b[35m)\x1b[0m. You should see multiple concentric circles, with red corners on the outermost ring, then orange, then green, etc. all the way to gray. You should not see any coordinate indicators on either side of it.")
                let myNewArr = new array(40, 40);
                let colors = [
                    "\x1b[30m██\x1b[0m",
                    "\x1b[34m██\x1b[0m",
                    "\x1b[36m██\x1b[0m",
                    "\x1b[32m██\x1b[0m",
                    "\x1b[33m██\x1b[0m",
                    "\x1b[31m██\x1b[0m",
                    "\x1b[35m██\x1b[0m",
                    "\x1b[37m██\x1b[0m"
                ]
                // turns a num from 0 to 1 into a color from 0 to 7
                function closestColor(num) {
                    return colors[Math.round(num * 7)];
                }
                function f(x, y) {
                    return Math.sqrt(x**2 + y**2);
                }
                myNewArr.map((_, i, j) => {
                    return f(i/39 - 0.5, j/39 - 0.5);
                }).print(false, closestColor)
            }
            catch {
                errMsg = "print threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                //print(false, [replacement1, replacement2, ...])
                console.log("Testing \x1b[34mprint\x1b[35m(\x1b[33mtrue\x1b[0m, \x1b[36m[\x1b[31mreplacement1\x1b[0m,\x1b[31m replacement2\x1b[0m, ...\x1b[36m]\x1b[35m)\x1b[0m. You should see a standard multiplication table with the letter S where the product is zero, and the letter L where the product is greater than 9.");
                let myArr = new array(5, 5);
                myArr.map((_, i, j) => {
                    return i * j;
                }).print(true, [[x => (x == 0), "S"], [x => (x > 9), "L"]]);
            }
            catch {
                errMsg = "print threw an error when passed in valid inputs. (replacements with an array of replacement functions)";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // Makes sure the print function properly throws an error when passed in invalid replacements.
            try {
                myArr.print(true, [[1, 2], 2, 3]);
                errMsg = "print did not throw an error when passed in an array of invalid replacements.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {
            }

            // TESTS END HERE
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        flipX: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "flipX";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.arrayTests.map(false)) {
                errMsg = "Unable to run forEachIJ.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.functionTests.compareItems(false)) {
                errMsg = "Unable to compare items.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            try {
                let myArr = new array(new range(10, -10), -5, [5, 5]);
                myArr = myArr.map((_, i, j) => ({x: i, y: j, value: ["hello", "world", i, j]}))
                myArr.flipX();
            }
            catch {
                errMsg = "flipX threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        flipY: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "flipY";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.arrayTests.map(false)) {
                errMsg = "Unable to run forEachIJ.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.functionTests.compareItems(false)) {
                errMsg = "Unable to compare items.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            try {
                let myArr = new array(new range(10, -10), -5, [5, 5]);
                myArr = myArr.map((_, i, j) => ({x: i, y: j, value: ["hello", "world", i, j]}))
                myArr.flipY();
            }
            catch {
                errMsg = "flipX threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        invert: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "invert";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
errMsg = "Test not implimented yet.";

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        toArray: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "toArray";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        forEach: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "forEach";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            try {
                let myArr = new array(new range(10, -10), -5);
                myArr.forEach((_, i, j) => {
                    return i + j;
                }
                )
            }
            catch {
                errMsg = "forEach threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        forEachIJ: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "forEachIJ";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.functionTests.compareItems(false)) {
                errMsg = "Unable to compare items.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                let myArr = new array(new range(10, -10), -5);
                myArr.forEach(_ => "hello");
                // TODO
            }
            catch {
                errMsg = "forEachIJ threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        map: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "map";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.functionTests.compareItems(false)) {
                errMsg = "Unable to compare items.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            let myArr;
            try {
                myArr = new array(new range(3, -3), -5);
                myArr = myArr.map((_, i, j) => {
                    return i + j;
                });
            }
            catch {
                errMsg = "map threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            const correctAnswer = [
                [3,2,1,0,-1],
                [2,1,0,-1,-2],
                [1,0,-1,-2,-3],
                [0,-1,-2,-3,-4],
                [-1,-2,-3,-4,-5],
                [-2,-3,-4,-5,-6],
                [-3,-4,-5,-6,-7]
            ]
            if (!compareItems(myArr.toArray(), correctAnswer)) {
                errMsg = "map did not return the correct value.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            let i = 0;

            try {
                myArr = new array(-3, new range(2, -2));
                myArr = myArr.map(_ => {
                    return i++;
                })
            }
            catch {
                errMsg = "map threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            const correctAnswer2 = [
                [0,1,2,3,4],
                [5,6,7,8,9],
                [10,11,12,13,14]
            ]
            if (!compareItems(myArr.toArray(), correctAnswer2)) {
                errMsg = "map did not return the correct value.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                myArr = myArr.map((x, i, j) => {
                    return x + myArr.get(myArr.range1.opposite(i), myArr.range2.opposite(j));
                })
            }
            catch (err) {
                errMsg = "map threw an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let count = 0;
            myArr.map(x => (x==14)?(count++):0);
            if (count != 15) {
                errMsg = "map did not return the correct value.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        neighbors: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "neighbors";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        clone: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "clone";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        find: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "find";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        findAll: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "findAll";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        replaceAll: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "replaceAll";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        replaceFirst: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "replaceFirst";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        sum: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "sum";

            // TESTS BEGIN HERE
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        // This one also requires visual confirmation by the user.
        printSpecial: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "printSpecial";

            // TESTS BEGIN HERE
            console.log("\n\x1b[34m%s\x1b[0m", "Testing printSpecial... Please make sure the outputs match their descriptions.\n");
            if (!tests.arrayTests.constructor(false)) {
                errMsg = "Unable to construct array.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.arrayTests.map(false)) {
                errMsg = "Map is not working.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!tests.arrayTests.get(false)) {
                errMsg = "get is not working.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                console.log("Testing \x1b[34mprintSpecial\x1b[35m(\x1b[33mtrue\x1b[0m, \x1b[33m1\x1b[35m)\x1b[0m with a 10x10 array of coordinates. No two items should be less than 1 space apart, and at least 1 item should be exactly 1 space apart. Items with an x or y coordinate of 0 have been highlited in purple.")
                let myArr = new array(new range(-5, 5), new range(-5, 5));
                myArr = myArr.map((_, i, j) => {
                    if(i == 0 || j == 0) return "\x1b[35m(" + j + ", " + i + ")\x1b[0m"
                    else return "(" + j + ", " + i + ")"
                })
                myArr.printSpecial(true, 1);
            }
            catch(err) {
                console.log(err)
                errMsg = "printSpecial returned an error when passed in valid inputs.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE
            
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        testAll: function () {
            console.log('\x1b[34m%s\x1b[0m', "Array tests:")
            for (let test in this) {
                if (test == "testAll" || test == "quickTest" || test == "print" || test == "printSpecial") continue;
                this[test]();
            }
            let value = this.quickTest();
            console.log();
            return value;
        },
        quickTest: function (print = true) {
            let summary = "\x1b[32mLooks good!\x1b[0m";
            for (let test in this) {
                if (test == "testAll" || test == "quickTest" || test == "print" || test == "printSpecial") continue;
                let testPassed = this[test](false);
                if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
                if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
            }
            if (print) console.log("\x1b[34mArray tests summary: \x1b[0m" + summary);
            if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
            else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
            else return undefined;
        }
    },
    rangeTests: {
        constructor: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "constructor";

            // TESTS BEGIN HERE
            let myRange;
            let myRange2;
            try {
                myRange = new range(0, 10);
                myRange2 = new range(-15, -30);
            }
            catch {
                isWorking = false;
                errMsg = "Range constructor returned an error.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myRange.start != 0 || myRange.end != 10) {
                isWorking = false;
                errMsg = "Range constructor did not set start and end correctly.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (myRange2.start != -15 || myRange2.end != -30) {
                isWorking = false;
                errMsg = "Range constructor did not set start and end correctly.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg); 
            return isWorking;
        },
        contains: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "contains";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                let myRange = new range(-13, -22);
                if (!myRange.contains(-15)) {
                    isWorking = false;
                    errMsg = "Range contains method returned false for a value within the range.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (myRange.contains(-10)) {
                    isWorking = false;
                    errMsg = "Range contains method returned true for a value outside the range.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (!myRange.contains(-22)) {
                    isWorking = false;
                    errMsg = "Range contains method returned false for the end of the range.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (!myRange.contains(-13)) {
                    isWorking = false;
                    errMsg = "Range contains method returned false for the start of the range.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                isWorking = false;
                errMsg = "Range contains method returned an error.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let myRange2 = new range(0, 0);
            if (!myRange2.contains(0)) {
                isWorking = false;
                errMsg = "Range contains method returned false for a range of length 1.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        overlaps: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "overlaps";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let myRange = new range(-13, -22);
            let myRange2 = new range(-15, -30);
            let myRange3 = new range(-30, -30);
            try {
                if (!myRange.overlaps(myRange2)) {
                    isWorking = false;
                    errMsg = "Range overlaps method returned false for a range that overlaps.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (myRange.overlaps(myRange3)) {
                    isWorking = false;
                    errMsg = "Range overlaps method returned true for a range that does not overlap.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
                if (!myRange2.overlaps(myRange3)) {
                    isWorking = false;
                    errMsg = "Range overlaps method returned false for a range that overlaps.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                isWorking = false;
                errMsg = "Range overlaps method returned an error.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        subset: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "subset";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        intersection: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "intersection";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        forEach: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "forEach";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        direction: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "direction";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        at: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "at";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        }, 
        length: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "length";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        indexOf: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "indexOf";

            // TESTS BEGIN HERE
            if (!tests.rangeTests.constructor(false)) {
                errMsg = "Unable to construct range.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        testAll: function () {
            console.log('\x1b[34m%s\x1b[0m', "Range tests:")
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                this[test]();
            }
            let value = this.quickTest();
            console.log();
            return value;
        },
        quickTest: function (print = true) {
            let summary = "\x1b[32mLooks good!\x1b[0m";
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                let testPassed = this[test](false);
                if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
                if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
            }
            if (print) console.log("\x1b[34mRange tests summary: \x1b[0m" + summary);
            if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
            else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
            else return undefined;
        }
    }, 
    vectorTests: {
        constructor: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "constructor";

            // TESTS BEGIN HERE

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        testAll: function () {
            console.log('\x1b[34m%s\x1b[0m', "Vector tests:")
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                this[test]();
            }
            let value = this.quickTest();
            console.log();
            return value;
        }, 
        quickTest: function (print = true) {
            let summary = "\x1b[32mLooks good!\x1b[0m";
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                let testPassed = this[test](false);
                if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
                if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
            }
            if (print) console.log("\x1b[34mVector tests summary: \x1b[0m" + summary);
            if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
            else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
            else return undefined;
        }
    },
    vector3DTests: {
        constructor: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "constructor";

            // TESTS BEGIN HERE

            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        testAll: function () {
            console.log('\x1b[34m%s\x1b[0m', "Vector3D tests:")
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                this[test]();
            }
            let value = this.quickTest();
            console.log();
            return value;
        },
        quickTest: function (print = true) {
            let summary = "\x1b[32mLooks good!\x1b[0m";
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                let testPassed = this[test](false);
                if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
                if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
            }
            if (print) console.log("\x1b[34mVector3D tests summary: \x1b[0m" + summary);
            if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
            else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
            else return undefined;
        }
    },
    functionTests: {
        is2DArray: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "is2DArray";

            // TESTS BEGIN HERE
            // Makes sure numbers, floats, strings, booleans, etc. are not arrays
            if (is2DArray(0)) {
                isWorking = false;
                errMsg = "is2DArray() returned true for 0.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (is2DArray(1) || is2DArray(1.5) || is2DArray(2) || is2DArray(3) || is2DArray(4) || is2DArray(5) || is2DArray(-6) || is2DArray(7) || is2DArray(8) || is2DArray(9)) {
                isWorking = false;
                errMsg = "is2DArray() returned true for a number.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (is2DArray("hello, world")) {
                isWorking = false;
                errMsg = "is2DArray() returned true for a string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (is2DArray(true) || is2DArray(false)) {
                isWorking = false;
                errMsg = "is2DArray() returned true for a boolean.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            
            // Makes sure arrays of arrays that have other things in them are not arrays
            if (is2DArray([1, 2, 3, 4, 5])) {
                isWorking = false;
                errMsg = "is2DArray() returned true for an array of numbers.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            if (is2DArray([[5], [12], [11], {a: 1, b: {c: [5], d: false}}, [[[0]], 2], "hello, world"])) {
                isWorking = false;
                errMsg = "is2DArray() returned true for an array of mixed types.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Makes sure arrays of arrays are arrays
            if (!is2DArray([])) {
                isWorking = false;
                errMsg = "is2DArray() returned false for an empty array.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!is2DArray([[]])) {
                isWorking = false;
                errMsg = "is2DArray() returned false for an array with an empty array in it.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!is2DArray([[1, 2, 3, 4, 5]])) {
                isWorking = false;
                errMsg = "is2DArray() returned false for an array with an array of numbers in it.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!is2DArray([[1, 2, 3], [4, 5], [7], []])) {
                isWorking = false;
                errMsg = "is2DArray() returned false for an array with arrays of numbers in it.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }


            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        exists: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "exists";

            // TESTS BEGIN HERE
            
            // Makes sure numbers, floats, strings, booleans, etc. all exist
            if (!exists(0)) {
                isWorking = false;
                errMsg = "exists() returned false for 0.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists(1) || !exists(1.5) || !exists(2) || !exists(3) || !exists(4) || !exists(5) || !exists(-6) || !exists(7) || !exists(8) || !exists(9)) {
                isWorking = false;
                errMsg = "exists() returned false for a number.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists("hello, world")) {
                isWorking = false;
                errMsg = "exists() returned false for a string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists(true) || !exists(false)) {
                isWorking = false;
                errMsg = "exists() returned false for a boolean.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists("")) {
                isWorking = false;
                errMsg = "exists() returned false for an empty string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Makes sure undefined, null, and NaN do not exist
            if (exists(undefined)) {
                isWorking = false;
                errMsg = "exists() returned true for undefined.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (exists(null)) {
                isWorking = false;
                errMsg = "exists() returned true for null.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (exists(NaN)) {
                isWorking = false;
                errMsg = "exists() returned true for NaN.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Makes sure arrays and objects exist
            if (!exists([])) {
                isWorking = false;
                errMsg = "exists() returned false for an empty array.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            if (!exists({})) {
                isWorking = false;
                errMsg = "exists() returned false for an empty object.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        compareItems: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "compareItems";

            // TESTS BEGIN HERE
            try {
                let myArr = [1, 2, 3, 4, 5];
                let myArr2 = [1, 2, 3, 4, 5];
                if (!compareItems(myArr, myArr2)) {
                    isWorking = false;
                    errMsg = "compareItems() returned false when given two identical arrays.";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                errMsg = "compareItems() threw an error when given two identical arrays.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            try {
                let myArr = [1, 2, 3, {a: 1, b: {c: [5], d: false}}, [[[0]], 2], "hello, world"]
                let myArr2 = [1, 2, 3, {b: {d: false, c: [5]}, a: 1}, [[[0]], 2], "hello, world"]
                if (!compareItems(myArr, myArr2)) {
                    isWorking = false;
                    errMsg = "compareItems() returned false when given two identical arrays";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                errMsg = "compareItems() threw an error when given two identical arrays.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                let myArr = [1, 2, 3, {a: 1, b: {c: [], d: false}}, [[[0]], 2], "hello, world"]
                let myArr2 = [1, 2, 3, {b: {d: false, c: undefined}, a: 1}, [[[0]], 2], "hello, world"]
                if (compareItems(myArr, myArr2)) {
                    isWorking = false;
                    errMsg = "compareItems() returned true when given two different arrays";
                    if (print) printStatus(name, isWorking, errMsg);
                    return isWorking;
                }
            }
            catch {
                errMsg = "compareItems() threw an error when given two different arrays.";
                isWorking = false;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            // TESTS END HERE   
            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        printStatus: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "printStatus";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."
            errMsg = "Test not yet implemented."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        parse: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "parse";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        permutations: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "permutations";

            // TESTS BEGIN HERE

            // Makes sure compareItems is working
            if(!tests.functionTests.compareItems(false)) {
                errMsg = "compareItems() is not working.";
                isWorking = undefined;
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            
            // Makes sure non-arrays cannot be permuted
            try {
                permutations(0);
                isWorking = false;
                errMsg = "permutations() did not throw an error when passed in non-array integer 0.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {}
            try {
                permutations(true);
                permutations(false);
                isWorking = false;
                errMsg = "permutations() did not throw an error when passed in non-array boolean.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {}
            try {
                permutations({});
                isWorking = false;
                errMsg = "permutations() did not throw an error when passed in non-array object {}.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {}

            // Makes sure arrays and strings can be permuted
            let testStringPermutations;
            try {
                testStringPermutations = permutations("abcd");
            }
            catch {
                isWorking = false;
                errMsg = "permutations() threw an error when passed in a string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let correctStringAnswer = {
                "abcd": true,"abdc": true,"acbd": true,"acdb": true,"adbc": true,"adcb": true,
                "bacd": true,"badc": true,"bcad": true,"bcda": true,"bdac": true,"bdca": true,
                "cabd": true,"cadb": true,"cbad": true,"cbda": true,"cdab": true,"cdba": true,
                "dabc": true,"dacb": true,"dbac": true,"dbca": true,"dcab": true,"dcba": true

            }
            if (testStringPermutations.length != 24) {
                isWorking = false;
                errMsg = "permutations() returned an incorrect value when passed in a string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let testStringAnswer = {};
            testStringPermutations.map(permutation => testStringAnswer[permutation] = true);
            if (!compareItems(testStringAnswer, correctStringAnswer)) {
                isWorking = false;
                errMsg = "permutations() returned an incorrect value when passed in a string.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            try {
                permutations([]);
            }
            catch {
                isWorking = false;
                errMsg = "permutations() threw an error when passed in an empty array.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let testVariable;
            try {
                testVariable = permutations([1, 2, 3, 4]);
            }
            catch {
                isWorking = false;
                errMsg = "permutations() threw an error when passed in an array of numbers.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let correctAnswer = {
                "1,2,3,4": true,
                "1,2,4,3": true,
                "1,3,2,4": true,
                "1,3,4,2": true,
                "1,4,2,3": true,
                "1,4,3,2": true,
                "2,1,3,4": true,
                "2,1,4,3": true,
                "2,3,1,4": true,
                "2,3,4,1": true,
                "2,4,1,3": true,
                "2,4,3,1": true,
                "3,1,2,4": true,
                "3,1,4,2": true,
                "3,2,1,4": true,
                "3,2,4,1": true,
                "3,4,1,2": true,
                "3,4,2,1": true,
                "4,1,2,3": true,
                "4,1,3,2": true,
                "4,2,1,3": true,
                "4,2,3,1": true,
                "4,3,1,2": true,
                "4,3,2,1": true
            }
            if (testVariable.length != 24) {
                isWorking = false;
                errMsg = "permutations() returned an incorrect value when passed in an array of numbers.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            let testAnswer = {};
            testVariable.map(permutation => testAnswer[permutation] = true);
            if (!compareItems(testAnswer, correctAnswer)) {
                isWorking = false;
                errMsg = "permutations() returned an incorrect value when passed in an array of numbers.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }

            // Makes sure permutations of greater than 9 elements throw an error.
            try {
                permutations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                isWorking = false;
                errMsg = "permutations() did not throw an error when passed in an array of 10 numbers.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {}
            try {
                permutations("abcdefghij");
                isWorking = false;
                errMsg = "permutations() did not throw an error when passed in a string of 10 characters.";
                if (print) printStatus(name, isWorking, errMsg);
                return isWorking;
            }
            catch {}
            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        gcd: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "gcd";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        lcm: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "lcm";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        primeFactors: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "primeFactors";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        coprime: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "coprime";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        characters: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "characters";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        unique: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "unique";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        abStrings: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "abStrings";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        ASCII: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "ASCII";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        getStringDisplayLength: function (print = true) {
            let isWorking = true;
            let errMsg = "No error message found.";
            const name = "getStringDisplayLength";

            // TESTS BEGIN HERE
            
            //TODO
            isWorking = undefined;
            errMsg = "Test not implimented yet."

            // TESTS END HERE

            if (print) printStatus(name, isWorking, errMsg);
            return isWorking;
        },
        testAll: function () {
            console.log('\x1b[36m%s\x1b[0m', "Function tests:")
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                this[test]();
            }
            let value = this.quickTest();
            console.log();
            return value;
        },
        quickTest: function (print = true) {
            let summary = "\x1b[32mLooks good!\x1b[0m";
            for (let test in this) {
                if (test == "testAll" || test == "quickTest") continue;
                let testPassed = this[test](false);
                if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
                if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
            }
            if (print) console.log("\x1b[36mFunction tests summary: \x1b[0m" + summary);
            if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
            else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
            else return undefined;
        }
    },
    testAll: function () {
        console.log('\x1b[35m%s\x1b[0m', "\nTesting all utilities...\n")
        for (let test in this) {
            if (test == "testAll" || test == "quickTest" || test == "summarizeAll" || test == "runPrintTests") continue;
            this[test].testAll();
        }
        this.quickTest();
        console.log();
    },
    summarizeAll: function () {
        console.log('\x1b[35m%s\x1b[0m', "Summarizing all utilities...\n")
        let summary = "\x1b[32mLooks good!\x1b[0m";
        for (let test in this) {
            if (test == "testAll" || test == "quickTest" || test == "summarizeAll"|| test == "runPrintTests") continue;
            let testPassed = this[test].quickTest();
            if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
            if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
        }
        console.log("\n\x1b[35mUtilities summary: \x1b[0m" + summary + "\n");
    },
    quickTest: function () {
        let summary = "\x1b[32mLooks good!\x1b[0m";
        for (let test in this) {
            if (test == "testAll" || test == "quickTest" || test == "summarizeAll"|| test == "runPrintTests") continue;
            let testPassed = this[test].quickTest(false);
            if (testPassed === false) summary = "\x1b[31mSome tests failed.\x1b[0m";
            if (summary == "\x1b[32mLooks good!\x1b[0m" && testPassed === undefined) summary = "\x1b[32mNo tests failed\x1b[0m, \x1b[33mbut some were unable to be run.\x1b[0m";
        }
        console.log("\x1b[35mUtilities summary: \x1b[0m" + summary + "\n");
        if (summary == "\x1b[31mSome tests failed.\x1b[0m") return false;
        else if (summary == "\x1b[32mLooks good!\x1b[0m") return true;
        else return undefined;
    },
    // by default, testAll and summarizeAll do not run tests of functions that print to the console. Use this function to run them.
    runPrintTests: function () {
        function smoothStep(x) {
            if (x < 0) return 0;
            if (x > 1) return 1;
            return x*x*(3 - 2*x);
        }
        for (let i = 0; i < 1000; i++) {
        
            // Takes up some time
            for (let j = 0; j < 300000; j++) {
                let x = Math.random();
            }
        
            if (i % 7 == 0) {
                console.clear();
                loadingBar(smoothStep(i/1000), 30);
            }
        }
        
        for (let i = 0; i < 1000; i++) {
        
            // Takes up some time
            for (let j = 0; j < 300000; j++) {
                let x = Math.random();
            }
        
            if (i % 7 == 0) {
                console.clear();
                loadingBar((1+Math.sin(i/100))/2, 40, "red");
                loadingBar((1+Math.cos(i/100))/2, 30, "green");
                loadingBar(1-(1+Math.sin(i/100))/2, 20, "blue");
                loadingBar(1-(1+Math.cos(i/100))/2, 10, "purple");
            }
        }
        console.log('\x1b[35m%s\x1b[0m', "Running print tests...\n")

        console.log('COLORS:')
        for (let color of ["black", "red", "green", "orange", "blue", "purple", "cyan", "white"]) {
            console.log(highlight(characters.square + " " + color.toUpperCase(), color));
        }
        console.log()
        this.arrayTests.print();
        this.arrayTests.printSpecial();
    }
}

const colorCodes = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    orange: "\x1b[33m",
    blue: "\x1b[34m",
    purple: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
}
/**
 * Highlights a string with a color.
 * @param {String} string - The string to be highlighted
 * @param {String} color - The color to highlight the string with. Can be "black", "red", "green", "orange", "blue", "purple", "cyan", or "white".
 * @returns {String} - The highlighted string.
 */
function highlight(string, color = "green") {
    if (!colorCodes[color]) throw new Error(highlight("Invalid color: " + color, "red"));
    return  colorCodes[color] + string + "\x1b[0m";
}
/**
 * Creates a loading bar.
 * @param {Number} percent - Value from 0 to 1.
 * @param {Number} length - The physical length of the loading bar in characters. Does not affect length of the loading bar.
 * @param {String} color color of the loading bar. Can be "black", "red", "green", "orange", "blue", "purple", "cyan", or "white".
 */
function loadingBar(percent, length = 20, color = "green") {
    let shades = [" ", characters.leftOneEighthBlock, characters.leftOneQuarterBlock, characters.leftThreeEighthsBlock, characters.leftHalfBlock, characters.leftFiveEighthsBlock, characters.leftThreeQuartersBlock, characters.leftSevenEighthsBlock, characters.square];
    console.log("        ", characters.cornerDR + new range(0, length + 6).forEach(_ => characters.segmentLR).join('') + characters.cornerDL);
    console.log("LOADING:", characters.segmentUD, (Math.floor(percent * 100) + "%").padStart(4, " "),  new range(0, length - 1).forEach(i => {
        let value = 8 * (percent * length - i);
        if (value < 0) value = 0;
        if (value >= 8) value = 8;
        let shade = highlight(shades[Math.floor(value)], color);
        return shade;
    }).join(''), characters.segmentUD);
    console.log("        ", characters.cornerUR + new range(0, length + 6).forEach(_ => characters.segmentLR).join('') + characters.cornerUL);
}
const characters = {
    blackSquare: colorCodes.black + "\u2588\x1b[0m",
    redSquare: colorCodes.red + "\u2588\x1b[0m",
    greenSquare: colorCodes.green + "\u2588\x1b[0m",
    orangeSquare: colorCodes.orange + "\u2588\x1b[0m",
    blueSquare: colorCodes.blue + "\u2588\x1b[0m",
    purpleSquare: colorCodes.purple + "\u2588\x1b[0m",
    cyanSquare: colorCodes.cyan + "\u2588\x1b[0m",
    whiteSquare: colorCodes.white + "\u2588\x1b[0m",
    lightShade: "\u2591",
    mediumShade: "\u2592",
    darkShade: "\u2593",
    leftOneEighthBlock: "\u258f",
    leftOneQuarterBlock: "\u258e",
    leftThreeEighthsBlock: "\u258d",
    leftHalfBlock: "\u258c",
    leftFiveEighthsBlock: "\u258b",
    leftThreeQuartersBlock: "\u258a",
    leftSevenEighthsBlock: "\u2589",
    square: "\u2588",
    cornerUL: "\u251b",
    cornerUR: "\u2517",
    cornerDL: "\u2513",
    cornerDR: "\u250f",
    segmentUD: "\u2503",
    segmentLR: "\u2501",
    intersectionULR: "\u253b",
    intersectionDLR: "\u2533",
    intersectionLUD: "\u252b",
    intersectionRUD: "\u2523",
    intersectionLRUD: "\u254b",
}
// TODOS:
// - finish basic tests
// - Make tests for the array constructor when used with non-rectangular arrays.

module.exports = {
    range,
    vector,
    vector3D,
    array,
    jaiden,
    exists,
    compareItems,
    gcd,
    lcm,
    primeFactors,
    coprime,
    parse,
    tests,
    is2DArray,
    characters,
    highlight,
    loadingBar,
    permutations,
    unique,
    abStrings,
    ASCII,
    getStringDisplayLength
}