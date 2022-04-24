let postId = decodeURI(location.pathname.split("/").pop());
console.log(postId);

let docRef = window.localStorage.getItem(postId);
console.log(JSON.parse(docRef));


const titleField = document.querySelector('#title');
const publishField = document.querySelector('#publish');
const articleField = document.querySelector('#article');
const footerField = document.querySelector('#relatedPost');



function initializePost(docRef) {
  let postData = JSON.parse(docRef);
  if((postData === null) || (postData === undefined)) {
    location.replace("/");
  } else {
    setupPost(JSON.stringify(postData));
  }
}

function setupPost(data) {
  console.log("DATA: " + data);
  let obj = JSON.parse(data);


  titleField.innerText = obj.title;
  publishField.innerText = `Published on: ${obj.publishedAt}`;
  addArticle(articleField, obj.article);
  addFooter(footerField);
}

function addArticle(element, dataPack) {
  console.log("Building Article...");
  data = dataPack.split("\n").filter(item => item.length);
  console.log(data);
  console.log(element);

  data.forEach(item => {
      // check for heading
      console.log(item);
      if(item[0] == '#'){
          console.log("Processing Header Text");
          let hCount = 0;
          let i = 0;
          while(item[i] == '#'){
              hCount++;
              i++;
          }
          let tag = `h${hCount}`;
          element.innerHTML += `<${tag}>${item.slice(hCount, item.length)}\n</${tag}>`
      }
      //checking for image format
      else if(item[0] == "!" && item[1] == "["){
          console.log("Processing Photo");
          let seperator;

          for(let i = 0; i <= item.length; i++){
              if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                  seperator = i;
              }
          }

          let alt = item.slice(2, seperator);
          let src = item.slice(seperator + 2, item.length - 1);
          element.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
      }

      else{
          console.log("Processing Standard Text");
          element.innerHTML += `<p>${item}</p>`;
      }
  })
}

function addFooter(element) {
  console.log("Building Footer...");
  let footData = randData()
  console.log("Selected Articles: " + footData)
  let data1 = JSON.parse(window.localStorage.getItem(footData[0]))
  let data2 = JSON.parse(window.localStorage.getItem(footData[1]))


  document.querySelector('#refTitle1').innerText = `${data1.title}`
  document.querySelector('#publishDate1').innerText = `Date: ${data1.publishedAt}`
  document.querySelector('#sample').innerText = makeSample(data1, 100);
  document.querySelector('#link1').href = `/${data1.docName}`


  document.querySelector('#refTitle2').innerText = `${data2.title}`
  document.querySelector('#publishDate2').innerText = `Date: ${data2.publishedAt}`
  document.querySelector('#sample2').innerText = makeSample(data2, 100);
  document.querySelector('#link2').href = `/${data2.docName}`
}

function randData() {
  let store = window.localStorage;
  let storageLength = store.length;
  let arrayStore = []
  for(let i = 0; i <= storageLength - 1; i++) {
    console.log(`Store Key ${i}: ${store.key(i)}`);
    if ((store.key(i) === 'posts') || (store.key(i) === postId)){
      console.log(`Matches Current Post`);
    } else {
      console.log('Adding to arrayStore');
      arrayStore.push(store.key(i))
    }
  }
  console.log(`Available Content: ${arrayStore} with length ${arrayStore.length}`)

  let article1 = arrayStore[Math.floor(Math.random() * arrayStore.length)]
  console.log(`${article1} selected`);
  arrayStore.splice(arrayStore.indexOf(article1), arrayStore.indexOf(article1) + 1)
  console.log(arrayStore)
  let article2 = arrayStore[Math.floor(Math.random() * arrayStore.length)]
  console.log(`${article2} selected`)
  return [article1, article2]
}


function makeSample(data, limit) {
  let artiSet = ''
  data = data.article;
  data = data.toString().replace(/\t/g, '').split('\r\n');
  data = data.toString().replace(/\n/g, ' ');
  data = data.toString().replace(/#/g, '');
  console.log(data);
  for(let i = 0; i <= limit; i++) {
    artiSet += data[i]
    if(data[i+1] === undefined || data[i+1] === null) {
      i = 1000;
    }
  }
  console.log(artiSet);
  return `${artiSet}...`
}



initializePost(docRef);
