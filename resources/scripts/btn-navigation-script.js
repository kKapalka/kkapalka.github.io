$(document).ready(function() {
  // Hide the "up" button on page load
  $("#btn-up").hide();

  // Add click event listener to the "up" button
  $("#btn-up").click(function() {
    // Get the previous section
    var prevSection = $("section.active").prev();

    // Scroll to the previous section
    $("html, body").animate({
      scrollTop: prevSection.offset().top
    }, 1000);

    // Update the active section
    $("section.active").removeClass("active");
    prevSection.addClass("active");

    // Show or hide the "up" and "down" buttons
    if (prevSection.is("#jumbotron")) {
      $("#btn-up").hide();
    }
    $("#btn-down").show();
  });

  // Add click event listener to the "down" button
  $("#btn-down").click(function() {
    // Get the next section
    var nextSection = $("section.active").next();

    // Scroll to the next section
    $("html, body").animate({
      scrollTop: nextSection.offset().top
    }, 1000);

    // Update the active section
    $("section.active").removeClass("active");
    nextSection.addClass("active");
      if (nextSection.is("#contact")) {
        $("#btn-down").hide();
      } else {
        $("#btn-down").show();
      }
  });

  // Add scroll event listener to the document
  $(document).scroll(function() {
    // Get the current section
    var currentSection = null;
    $("section").each(function() {
      if ($(this).offset().top <= $(document).scrollTop()) {
        currentSection = $(this);
      }
    });

    // Update the active section
    if (currentSection != null && !currentSection.hasClass("active")) {
      $("section.active").removeClass("active");
      currentSection.addClass("active");

      // Show or hide the "up" and "down" buttons
      if (currentSection.is("#jumbotron")) {
        $("#btn-up").hide();
      } else {
        $("#btn-up").show();
      }
      if (currentSection.is("#contact")) {
        $("#btn-down").hide();
      } else {
        $("#btn-down").show();
      }
    }
  });
});