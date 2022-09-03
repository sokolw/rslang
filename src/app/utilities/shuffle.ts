const shuffle: <T>(arr: Array<T>) => T[] = (arr) => {
  const resultArr = arr;
  let currentIndex = resultArr.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [resultArr[currentIndex], resultArr[randomIndex]] = [
      resultArr[randomIndex],
      resultArr[currentIndex],
    ];
  }

  return resultArr;
};

export default shuffle;
