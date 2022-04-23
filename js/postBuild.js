const postTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// // banner
// const bannerImage = document.querySelector('#banner-upload');
// const banner = document.querySelector(".banner");
// let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


// HERE I WAS BUILDING A TEST CASE TO SEE IF IT WOULD WORK IN THIS JS
const el = document.getElementById("test");
el.addEventListener("click", () => alert("I AM ALIVE"))

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
    console.log("UPLOADING PHOTO.....")
})


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



publishBtn.addEventListener('click', () => {
  makePost(articleField.value, postTitleField.value);
})


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
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${postTitle}-${id}`;
        let date = new Date(); // for published at info


        let newPost = new PostData(docName, date, title, article);
        console.log(newPost);
        window.localStorage.setItem('posts', JSON.stringify(newPost));
        let bruh = JSON.parse(window.localStorage.getItem('posts'))
        console.log(`The title of this post is "${bruh.title}" with the content of "${bruh.article}" and it was published on ${bruh.publishedAt} under the name ${bruh.docName}`)
        // .then(() => {
        //     location.href = `/${docName}`;
        // })
        // .catch((err) => {
        //     console.error(err);
        // })
    }
  }
