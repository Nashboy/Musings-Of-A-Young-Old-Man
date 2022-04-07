const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// // banner
// const bannerImage = document.querySelector('#banner-upload');
// const banner = document.querySelector(".banner");
// let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


// HERE I WAS BUILDING A TEST CASE TO SEE IF IT WOULD WORK IN THIS JS
const el = document.getElementById("test");
el.addEventListener("click", alert("I AM ALIVE"))

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
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}
