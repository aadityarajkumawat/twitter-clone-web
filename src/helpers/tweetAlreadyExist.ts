export const tweetAlreadyExist = (
  arr1: Array<any>,
  arr2: Array<any>,
  arr3: Array<any>,
  id: number
): boolean => {
  let found = false;
  for (let i = 0; i < arr1.length; i++) {
    const arr = arr1;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    const arr = arr2;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  for (let i = 0; i < arr3.length; i++) {
    const arr = arr3;
    if (arr[i].tweet_id === id) {
      found = true;
    }
  }
  return found;
};
