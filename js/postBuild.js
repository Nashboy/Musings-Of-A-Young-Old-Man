const postTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// // banner
// const bannerImage = document.querySelector('#banner-upload');
// const banner = document.querySelector(".banner");
// let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
    console.log("UPLOADING PHOTO.....")
})

publishBtn.addEventListener('click', () => {
  makePost(articleField.value, postTitleField.value);
})

// Creates Functional Tab Button in textarea
document.querySelector('.article').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});




// Upload Image Function
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}


// Post OBJECT
function PostData(docName, date, title, article) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  this.title = title;
  this.article = article;
  this.publishedAt = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  this.docName = docName;
}



const makePost = (article, title) => {
    if(!localStorage.getItem('posts')) {
      localStorage.setItem('posts', "Empty")
    }
    console.log("POSTING....");
    if(article.length && title.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let postTitle = title.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 6; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${postTitle}-${id}`;
        let date = new Date(); // for published at info


        let newPost = new PostData(docName, date, title, article);
        console.log(newPost);
        window.localStorage.setItem(docName, JSON.stringify(newPost));
        window.localStorage.setItem('posts', JSON.stringify(newPost));
        let bruh = JSON.parse(window.localStorage.getItem(docName));
        console.log(`The title of this post is "${bruh.title}" with the content of "${bruh.article}" and it was published on ${bruh.publishedAt} under the name ${bruh.docName}`)
        fetch('/:blog')
          .then(() => {
              location.href = `/${docName}`;
          })
          .catch((err) => {
              console.error(err);
          })
    }
  }


  // const typeSpace = document.querySelector('.article');
  //
  // // typeSpace.style.fontStyle = "italic";
  //
  // typeSpace.addEventListener('input', () => {
  //   console.log("Animation Start")
  //   animateText(typeSpace);
  // })


  // function animateText(textSpace) {
  //   console.log('Animating Text...')
  //   let text = textSpace.value;
  //   console.log(text)
  //   let item;
  //   for(var i = 0; i<text.length; i++) {
  //     item = text[i]
  //     console.log(item)
  //     if (item === '*') {
  //       //check for bold
  //       if (text[i+1] === '*') {
  //         for(var f = i+2; f <= text.length; f++){
  //           if(text[f] === "*" && text[f+1] === "*") {
  //             console.log("Bolding...")
  //             text.substring(i+2,f).style.fontWeight = 'bold'
  //             return
  //           }
  //         }
  //       }
  //       //italic
  //       else {
  //         for(var f = i+1; f <= text.length; f++){
  //           if(text[f] === "*") {
  //             console.log("Italic...");
  //             console.log(`${text} Substring: ${text.substring(i+1,f)}`);
  //             text.substring(i+1,f).style.fontStyle = 'italic'
  //             // textSpace.innnerHTML += `<span class="italic">${text.substring(i+1,f)}</span>`
  //             console.log(text);
  //             return
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return
  // }
