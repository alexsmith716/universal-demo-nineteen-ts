
// Closes responsive menu when a scroll trigger link is clicked
$(document).on('click','.js-scroll-trigger',function(e) {
  $(".navbar-collapse.show").collapse('hide');
});

// Hide navbar when modals trigger
$(document).on('show.bs.modal','.app-modal',function(e) {
  $('.navbar').addClass('d-none');
});

$(document).on('hidden.bs.modal','.app-modal',function(e) {
  $('.navbar').removeClass('d-none');
});
