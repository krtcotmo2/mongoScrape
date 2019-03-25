/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const defineSection = (arg) => {
  return arg === undefined ? 'Not Catergorized' : arg;
};

$('#btnGet').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/getArticles',
  })
    .then((results) => {
      results.articles.forEach((element) => {
        const card = `<div class="card col-3  m-2 px-0">
        <h5 class="card-header text-uppercase">Section: ${defineSection(element.section)}</h5>
        <div class="card-body">
          <h5 class="card-title"><a href="https://www.cnn.com${element.link}" target="_blank">${element.headline}</a></h5>
          
          <a href="#" class="btn btn-primary">Save</a>
          <a href="#" class="btn btn-danger">Add Comment</a>
        </div>
      </div>`;
        $('#articles').append(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
