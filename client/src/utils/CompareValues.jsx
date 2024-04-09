export default function deepEqual(obj1, obj2) {
  // Get the keys of the two objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and compare the values
  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // If the value is an object, recursively call deepEqual
    if (typeof val1 === "object" && typeof val2 === "object") {
      if (!deepEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      // If the values are not equal, return false
      return false;
    }
  }

  // If all keys and values are equal, return true
  return true;
}
