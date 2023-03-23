function getMostVisible($elements) {
    var element,
        viewportHeight = $(window).height(),
        max = 0;
    $elements.each(function() {
        var visiblePx = getVisibleHeightPx($(this), viewportHeight);
        if (visiblePx > max) {
            max = visiblePx;
            element = this;
        }
    });
    return $elements.filter(element);
}

function getVisibleHeightPx($element, viewportHeight) {
    var rect = $element.get(0).getBoundingClientRect(),
        height = rect.bottom - rect.top,
        visible = {
            top: rect.top >= 0 && rect.top < viewportHeight,
            bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        },
        visiblePx = 0;

    if (visible.top && visible.bottom) {
        // Whole element is visible
        visiblePx = height;
    } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
    } else if (visible.bottom) {
        visiblePx = rect.bottom;
    } else if (height > viewportHeight && rect.top < 0) {
        var absTop = Math.abs(rect.top);

        if (absTop < height) {
            // Part of the element is visible
            visiblePx = height - absTop;
        }
    }

    return visiblePx;
}

$(document).ready(function() {
  // Hide the "up" button on page load
  var largestSection = getMostVisible($("section"))
  largestSection.addClass("active");

  // Show or hide the "up" and "down" buttons
  if (largestSection.is("#jumbotron")) {
    $("#btn-up").hide();
  } else {
    $("#btn-up").show();
  }
  if (largestSection.is("#contact")) {
    $("#btn-down").hide();
  } else {
    $("#btn-down").show();
  }
  // Add click event listener to the "up" button
  $("#btn-up").click(function() {
    // Get the previous section
    var mostVisible = getMostVisible($("section"))
    
    var scrollTop = $(window).scrollTop()

    var prevSection = mostVisible.prev();
    var top = prevSection.offset().top;
    if ((scrollTop - top) > $(window).height()) {
      top = mostVisible.offset().top
    }

    if (mostVisible.is("#jumbotron")) {
      top = 0
    }
    // Scroll to the previous section
    $("html, body").animate({
      scrollTop: top
    }, 1000);

    // Show or hide the "up" and "down" buttons
    if (prevSection.is("#jumbotron")) {
      $("#btn-up").hide();
    }
    $("#btn-down").show();
  });

  // Add click event listener to the "down" button
  $("#btn-down").click(function() {
    var mostVisible = getMostVisible($("section"))
    var scrollTop = $(window).scrollTop()
    var nextSection = mostVisible.next();

    var top = nextSection.offset().top;
    if ((top - scrollTop) > $(window).height()) {
      top = mostVisible.offset().top
    }
    // Scroll to the next section
    $("html, body").animate({
      scrollTop: top
    }, 1000);

      if (nextSection.is("#contact")) {
        $("#btn-down").hide();
      } else {
        $("#btn-down").show();
      }
    $("#btn-up").show();
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
      
    }
// Show or hide the "up" and "down" buttons
      if($(window).scrollTop() === 0) {
        $("#btn-up").hide();
      } else {
        $("#btn-up").show();
      }
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $("#btn-down").hide();
      } else {
        $("#btn-down").show();
      }
  });
});