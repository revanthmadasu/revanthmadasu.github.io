function onShare () {
    console.log("Share clicked");
    window.navigator
    .share({
      url: "https://swiggy.com/",
      title: "Share-Title",
      text: "shareText"
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}