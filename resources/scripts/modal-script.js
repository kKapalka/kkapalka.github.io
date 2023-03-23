$(document).ready(function() {
  // Show modal window when project card is clicked
  $('.card').click(function() {
    var targetModal = $(this).attr('data-target');
    $(targetModal).modal('show');
  });
});