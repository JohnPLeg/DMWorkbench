export function getObjectDifferences(obj1, obj2, path = '') {
  const differences = [];

  // Handle null/undefined cases
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    if (obj1 !== obj2) {
      differences.push({
        type: 'changed',
        path: path || 'root',
        oldValue: obj1,
        newValue: obj2
      });
    }
    return differences;
  }

  // Handle primitive types
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    if (obj1 !== obj2) {
      differences.push({
        type: 'changed',
        path: path || 'root',
        oldValue: obj1,
        newValue: obj2
      });
    }
    return differences;
  }

  // Handle arrays
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
      differences.push({
        type: 'type_changed',
        path: path,
        oldValue: obj1,
        newValue: obj2,
        oldType: Array.isArray(obj1) ? 'array' : typeof obj1,
        newType: Array.isArray(obj2) ? 'array' : typeof obj2
      });
      return differences;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      return compareArrays(obj1, obj2, path, differences);
    }
  }

  // Get all unique keys from both objects
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const hasKey1 = obj1.hasOwnProperty(key);
    const hasKey2 = obj2.hasOwnProperty(key);

    if (!hasKey1 && hasKey2) {
      // Key added
      differences.push({
        type: 'added',
        path: currentPath,
        newValue: obj2[key]
      });
    } else if (hasKey1 && !hasKey2) {
      // Key removed
      differences.push({
        type: 'removed',
        path: currentPath,
        oldValue: obj1[key]
      });
    } else if (hasKey1 && hasKey2) {
      // Key exists in both, check for changes
      const nestedDiffs = getObjectDifferences(obj1[key], obj2[key], currentPath);
      differences.push(...nestedDiffs);
    }
  }

  return differences;
}

/**
 * Compare arrays and find differences
 */
function compareArrays(arr1, arr2, path, differences) {
  const maxLength = Math.max(arr1.length, arr2.length);

  // Check if array length changed
  if (arr1.length !== arr2.length) {
    differences.push({
      type: 'array_length_changed',
      path: path,
      oldLength: arr1.length,
      newLength: arr2.length
    });
  }

  // Compare each element
  for (let i = 0; i < maxLength; i++) {
    const currentPath = `${path}[${i}]`;

    if (i >= arr1.length) {
      // Element added
      differences.push({
        type: 'added',
        path: currentPath,
        newValue: arr2[i]
      });
    } else if (i >= arr2.length) {
      // Element removed
      differences.push({
        type: 'removed',
        path: currentPath,
        oldValue: arr1[i]
      });
    } else {
      // Element exists in both arrays
      const nestedDiffs = getObjectDifferences(arr1[i], arr2[i], currentPath);
      differences.push(...nestedDiffs);
    }
  }

  return differences;
}

