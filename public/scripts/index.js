/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const defineSection = (arg) => {
  return arg === undefined ? 'Not Catergorized' : arg;
};
const createArticles = (results) => {
  $('#articles').html('');
  results.articles.forEach((element) => {
    const card = `<div class="card col-11 col-md-5 col-xl-3  m-2 px-0">
          <h5 class="card-header text-uppercase">Section: ${defineSection(element.section)}</h5>
          <div class="card-body">
            <h5 class="card-title"><a href="${element.link}" target="_blank">${element.headline}</a></h5>
            <button class="btn btn-primary btnSave">Save</button>
            <button class="btn btn-danger btnAddNote">Add/Edit Comment</button>
          </div>
        </div>`;
    $('#articles').append(card);
  });
};
$('#btnGet').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/getArticles',
  })
    .then((results) => {
      createArticles(results);
    })
    .catch((err) => {
      console.log(err);
    });
});
$(document).on('click', '.btnSave', (evt) => {
  $.ajax({
    method: 'POST',
    url: '/saveArticle',
    data: {
      title: $(evt.target).parent().find('h5').text(),
      section: $(evt.target).parent().parent().find('.card-header')
        .text()
        .replace('Section: ', ''),
      url: $(evt.target).parent().find('a').attr('href'),
    },
  })
    .then((response) => {
      console.log(response);
    });
});
$(document).on('click', '#btnSaved', () => {
  $.ajax({
    method: 'GET',
    url: '/getSavedArticle',
  })
    .then((response) => {
      $('#articles').html('');
      response.forEach((element) => {
          const comments = element.note == undefined ? "":`<div>Comment: ${element.note.comment}<br/>By: ${element.note.author}`;
        const card = `<div class="card col-11 col-md-5 col-xl-3  m-2 px-0" data-id=${element._id}>
             <h5 class="card-header text-uppercase">Section: ${defineSection(element.section)}</h5>
             <div class="card-body">
               <h5 class="card-title"><a href="${element.url}" target="_blank">${element.title}</a></h5>
               <button class="btn btn-primary btnSave">Save</button>
               <button class="btn btn-danger btnAddNote">Add Comment</button>
               ${comments}
             </div>
           </div>`;
        $('#articles').append(card);
      });
    });
});
$(document).on('click', '.btnAddNote', (evt) => {
  const theID = $(evt.target).parent().parent().data('id');
  $('#exampleModalCenter').modal();
  $('#curId').val(theID);
  $('#curHead').val($(evt.target).parent().find('h5').text());
  $('#curUrl').val($(evt.target).parent().find('a').attr('href'));
  $('#curSection').val($(evt.target).parent().parent().find('.card-header')
  .text()
  .replace('Section: ', ''));
});
$(document).on('click', '.bntSaveComment', (evt) => {
  const theID = $(evt.target).parent().find('#curId').val();
  let theUrl;
  let theData;
  if (theID) {
     theUrl = `/updateComment/${theID}`;
     theData = {
          author: $('#author').val(),
          comment: $('#authorComment').val(),
          id: theID,
        };
  } else {
    theUrl = '/newComment';
    theData = {
     author: $('#author').val(),
     comment: $('#authorComment').val(),
     title: $(evt.target).parent().find('#curHead').val(),
     section: $(evt.target).parent().find('#curSection').val(),
     url: $(evt.target).parent().find('#curUrl').val(),
   };
  }
  $.ajax({
    method: 'POST',
    url: theUrl,
    data: theData,
  })
    .then((response) => {

    })
    .catch((err) => {

    })
});
