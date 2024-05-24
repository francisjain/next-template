// COMMON FUNCTION TO REMOVE ALL CHARECTERS OTHER THAN DIGITS FROM A STRING 
export const filterDigitsOnly = (numString: string) => {
  let newValue = "";
  for (let i = 0; i < numString.length; i++) {
    if (numString.charAt(i) >= '0' && numString.charAt(i) <= '9') {
      newValue = newValue + numString.charAt(i);
    }
  }
  return (newValue);
};

// COMMON FUNCTION TO REMOVE ALL CHARECTERS OTHER THAN DIGITS AND DOT FROM A STRING 
export const filterDigitsDotOnly = (numString: string) => {
  let newValue = "";
  for (let i = 0; i < numString.length; i++) {
    if (i === 0 && numString.charAt(i) >= '0' && numString.charAt(i) <= '9') {
      newValue = newValue + numString.charAt(i);
    }
    else if (i > 0 && ((numString.charAt(i) >= '0' && numString.charAt(i) <= '9') || numString.charAt(i) === '.')) {
      newValue = newValue + numString.charAt(i);
    }
  }
  return (newValue);
};

// COMMON FUNCTION TO CONVERT HTML TO STRING
export const convertHtmlToString = (str: string) => {
  if (str !== "" || str !== null) {
    const html = str;
    const div = document.createElement("div");
    div.innerHTML = html.replace(/<\/[^>]+>/g, match => match + ' ');
        
    const text = div.textContent  || div.innerText  || "";
    return text

  }
}


// COMMON FUNCTION TO CONVERT HTML TO STRING
export const getFirstConvertLine = (content: string) => {
  if (content) {
    const isHtml = content.includes('<p>');

    if (isHtml) {
      const match = content.match(/<p>(.*?)<\/p>/);
      return match ? match[1].trim() : '';
    } else {
      return content.split('\n')[0].trim();
    }
  }

  return ''; // Return an empty string if no content is provided
}

