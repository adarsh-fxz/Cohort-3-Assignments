/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/
function isPalindrome(str) {
  // const cleanedStr = str.replace(/[^0-9a-z]/gi, '').toLowerCase();

  let cleanedStr = '';
  for (let char of str) {
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9')) {
          cleanedStr += char.toLowerCase();
      }
  }

  let start = 0;
  let end = cleanedStr.length - 1;
  while (start < end) {
    if (cleanedStr[start] !== cleanedStr[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

module.exports = isPalindrome;
