const stringFormatter = (string) => {
    let formattedString = string.charAt(0).toUpperCase() + string.slice(1)
    return formattedString
}

function nameConvert(string){
    if(string.includes(" ")){
        return string.toLowerCase().replace(/\s+/g, '_');
    }
    else{
        return string.toLowerCase()
    }
}

function reverseNameConvert(str) {
  str = str.replace(/_/g, ' ');
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  str = words.join(' ');
  return str;
  }


module.exports = {stringFormatter, nameConvert, reverseNameConvert}