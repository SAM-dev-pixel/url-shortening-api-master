// burger button clicked
((burger)=> {
  
  const navLinks = document.querySelector('.nav-links-contain');
  burger.addEventListener('click', ()=> navLinks.classList.toggle('show'));
  
})(document.querySelector('.burger-btn'));

// async await fetch
const getShortLink =async(link)=> {
  try {
    // show shortener loading
    shortenLoading.classList.add('load');
    const result = await fetch('https://api.shrtco.de/v2/shorten?url=' + link);
    return result.json();
  } catch(err) {
    // show error message and remove loading
    alert('Oops! Something went wrong. Try again...');
    shortenLoading.classList.remove('load');
  }
}

const shortenContain = document.querySelector('.shorten-link-contain');
const shortenBtn = document.querySelector('.shorten-btn');
const shortenInputContain = document.querySelector('.shorten-input-contain');
const shortenInput = document.querySelector('.shorten-input');
const shortenLoading = document.querySelector('.shorten-loading');

// shorten button clicked
shortenBtn.addEventListener('click', async(e)=> {
  e.preventDefault();
  // get input value
  const value = shortenInput.value;
  const results = await getShortLink(value);
  
  if(results.ok) {
    // remove the previous shortener loading and error marks
    shortenLoading.classList.remove('load');
    shortenInputContain.classList.remove('error');
    shortenInput.classList.remove('error');
    // add shorten result
    shortenContain.append(shortenResult(results.result));
  } else {
    // if fail, shows error marks
    shortenInputContain.classList.add('error');
    shortenInput.classList.add('error');
  }
  
});

// create result element
function shortenResult(result) {
  const div = document.createElement('div');
  div.classList.add('shorten-result-box');
  div.innerHTML = `<p class="link-target">${result['original_link']}</p>
          <p href="#" class="link-result">${result['short_link3']}</p>
          <a href="#" class="copy-btn">Copy</a>`
  return div;
}
// copy button clicked
shortenContain.addEventListener('click', (e)=> {
  e.preventDefault();
  if(e.target.classList.contains('copy-btn')) {
    // get the link result shorten
    const shortLink = e.target.previousElementSibling;
    // copy to the clipboard
    navigator.clipboard.writeText(shortLink.textContent);
    // change copy button style
    e.target.classList.add('clicked');
    e.target.textContent = 'Copied!';
    
  }
});
