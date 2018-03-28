let formatStar = (number) => {
  let bintang = "";
  for(let i = 0; i < number; i++) {
    bintang+="*";
  }

  return bintang;
}

module.exports = formatStar;
