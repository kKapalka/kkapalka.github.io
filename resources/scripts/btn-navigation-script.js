$(document).ready(function() {
  var btnUp = $("#btn-up");
  var btnDown = $("#btn-down");
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    btnUp.hide();
    btnDown.hide();
  } else {    
    var sections = $("section"); 
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

function onUpClick() {
  var mostVisible = getMostVisible(sections)    
    var scrollTop = $(window).scrollTop()
    var top = mostVisible.prev().offset().top;
    if ((scrollTop - top) > $(window).height()) {
      top = mostVisible.offset().top
    }
    // Scroll to the previous section
    $("html, body").animate({
      scrollTop: top
    }, 1000);
}

function onDownClick() {
  var mostVisible = getMostVisible(sections)
    var scrollTop = $(window).scrollTop()
    var top = mostVisible.next().offset().top;
    if ((top - scrollTop) > $(window).height()) {
      top = mostVisible.offset().top
    }
    // Scroll to the next section
    $("html, body").animate({
      scrollTop: top
    }, 1000);
}

function changeButtonVisibility() {
  var scrollTop = $(window).scrollTop();
  if(scrollTop === 0) {
    btnUp.hide();
  } else {
    btnUp.show();
  }
  if(scrollTop + $(window).height() == $(document).height()) {
    btnDown.hide();
  } else {
    btnDown.show();
  }
}

  changeButtonVisibility();
  btnUp.click(onUpClick);
  btnDown.click(onDownClick);
  $(document).scroll(changeButtonVisibility);
  $(window).resize(changeButtonVisibility);
  }

  
});