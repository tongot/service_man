const GetCoverImage = (images) => {
  let coverImages = images.filter((item) => item.is_cover == true);
  if (coverImages.length > 0) {
    return images[0].image;
  }
};
const formartDate = (date) => {
  var newDate = new Date(date);
  return (
    newDate.getDate() +
    "/" +
    newDate.getMonth() +
    "/" +
    newDate.getFullYear() +
    " " +
    newDate.getHours() +
    ":" +
    newDate.getMinutes()
  );
};
export { GetCoverImage, formartDate };
