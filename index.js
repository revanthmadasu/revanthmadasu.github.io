const shareUrl = "http://localhost:3000/preview";
const shareTitle = "Share link with recipient";
const shareText = "I've roasted you via Swiggy #RoastyourDost. Click on the link below to see https://swiggy.onelink.me/888564224/0h55bm0i";
const shareImg = "https://res.cloudinary.com/swiggy/image/upload/nye-2021/generic_share_image";
const shareVideo = "https://res.cloudinary.com/swiggy/video/upload/fl_attachment/v1658469799/roast_dost/download-without-msg.mp4";
function toDataUrl(isVideo, shareFileUrl, callback) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (isVideo) {
        const video = document.createElement("video");
        video.src = shareVideo;
        video.addEventListener('loadeddata', function() {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            callback(canvas);
        });
    } else {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = shareFileUrl;
        img.onload = () => {
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                callback(canvas);
            }
        };
    }
}

function changeStatus(status) {
    document.getElementById("share-status").innerHTML = status;
}
function onShare () {
    // console.log("Share clicked");
    // changeStatus("Sharing");
    window.navigator
    .share({
      url: "https://swiggy.com/",
      title: "Share-Title",
      text: "shareText"
    })
    .then((res) => {
      console.log(res);
    //   console.log(`Sharing done res: ${res}`);
    //   changeStatus("Sharing Done");

    })
    .catch((err) => {
    //   console.log(err);
    //   changeStatus("Sharing Failed");
    });
}

function onShareImage() {
    // console.log("Share Image clicked");
    // changeStatus("Sharing");
    toDataUrl(false, shareImg, (canvas) => {
        canvas.toBlob(function (blob) {
            if (blob) {
                const file = new File([blob], "share.png", { type: blob.type });
                const payload = {
                    url: shareUrl,
                    title: shareTitle,
                    text: shareText,
                    files: [file],
                };
                (window?.navigator).share(payload).then((res) => {
                    // console.log(`Sharing done res: ${res}`)
                    // changeStatus("Sharing Done");
                }).catch((err) => {
                    // console.log(`Sharing error err: ${err}`)
                    // changeStatus("Sharing Failed");
                });;
                // console.log(`Share Image Payload: ${JSON.stringify(payload)}`);
            }
        });
    });

}

function onShareVideo() {
    // console.log("Share Video clicked");
    // changeStatus("Sharing");
    toDataUrl(true, shareVideo, (canvas) => {
        canvas.toBlob(function (blob) {
            if (blob) {
                const file = new File([blob], "share.mp4", { type: blob.type });
                const payload = {
                    url: shareUrl,
                    title: shareTitle,
                    text: shareText,
                    files: [file],
                };
                (window?.navigator).share(payload).then((res) => {
                    // console.log(`Sharing done res: ${res}`)
                    // changeStatus("Sharing Done");
                }).catch((err) => {
                    // console.log(`Sharing error err: ${err}`)
                    // changeStatus("Sharing Failed");
                });;
                // console.log(`Share Image Payload: ${JSON.stringify(payload)}`);
            }
        });
    });

}

function onShareBasic() {
    // console.log("Share basic clicked");
    const payload = {
        url: shareUrl,
        title: shareTitle,
        text: shareText,
    };
    // changeStatus("Sharing");
    (window?.navigator).share(payload).then((res) => {
        // console.log(`Sharing done res: ${res}`)
        // changeStatus("Sharing Done");
    }).catch((err) => {
        // console.log(`Sharing error err: ${err}`)
        // changeStatus("Sharing Failed");
    });
    // console.log(`Share Basic Payload: ${JSON.stringify(payload)}`);
    return;
}
