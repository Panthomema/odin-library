export { containsObject };

function containsObject(arr, target) {
  return arr.find(obj => JSON.stringify(obj) === JSON.stringify(target)) !== undefined;
}