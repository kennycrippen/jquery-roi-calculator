// mobile detection
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// begin document ready
$(document).ready(function() {

  // tooltips
  $( document ).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

  // sticky
  if( !isMobile.any() ){
    $('#sticker').sticky();
  }

  $('input').bind('keyup', function () {

    // getting the values of inputs for calculation
    var estimatorQty              = $('#estimator-qty').val();
    var estimatorPay              = $('#estimator-pay').val();
    var bidTime                   = $('#bid-time').val();
    var totalBidsYear             = $('#total-bids-year').val();
    var awardBidRatio             = $('#award-bid-ratio').val();
    var projectedTimeSavings      = $('#projected-time-savings').val();
    var investmentCost            = $('#investment-cost').val();

    // validate digits only
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $( "#left-form" ).validate({
      rules: {
        field: {
          digits: true
        }
      }
    });

    // show dollar sign on key up
    $('span.dollar-bill-yall').show();


    // formulas to spit out values 
    $('#estimator-cost-per-hr').html(parseFloat((estimatorPay / 2080) * estimatorQty || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var estimatorCostPerHour = $('#estimator-cost-per-hr').text().replace(/,/g, '');

    $('#cost-per-bid').html(parseFloat(((estimatorQty * estimatorPay) / 2080) * bidTime || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var costPerBid = $('#cost-per-bid').text().replace(/,/g, '');

    $('#jobs-awarded-per-year').html(parseFloat(totalBidsYear / awardBidRatio || 0).toFixed(2));
    var jobsAwardedPerYear = $('#jobs-awarded-per-year').text();

    $('#cost-per-job-awarded').html(parseFloat((totalBidsYear * costPerBid) / jobsAwardedPerYear || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var costPerJobAwarded = $('#cost-per-job-awarded').text().replace(/,/g, '');

    if((costPerJobAwarded * jobsAwardedPerYear) > (estimatorQty * estimatorPay)) {
      $('#total-estimating-cost-per-year').html(parseFloat(estimatorQty * estimatorPay || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    } else {
      $('#total-estimating-cost-per-year').html(parseFloat(costPerJobAwarded * jobsAwardedPerYear || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    }

    $('#hours-saved-per-bid').html(parseFloat(bidTime * (projectedTimeSavings / 100) || 0).toFixed(2));
    var hoursSavedPerBid = $('#hours-saved-per-bid').text();

    $('#savings-per-bid').html(parseFloat(hoursSavedPerBid * estimatorCostPerHour || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var savingsPerBid = $('#savings-per-bid').text().replace(/,/g, '');

    $('#savings-per-job-awarded').html(parseFloat(totalBidsYear * savingsPerBid / jobsAwardedPerYear || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var savingsPerJobAwarded = $('#savings-per-job-awarded').text().replace(/,/g, '');

    $('#savings-per-year').html(parseFloat(savingsPerBid * totalBidsYear || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    var savingsPerYear = $('#savings-per-year').text().replace(/,/g, '');

    $('#project-management').html(parseFloat(hoursSavedPerBid * totalBidsYear || 0).toFixed(2));
    var projectManagement = $('#project-management').text();

    $('#jobs-no-additional-cost').html(parseFloat(projectManagement / (bidTime - hoursSavedPerBid) || 0).toFixed(2));
    var jobsNoAdditionalCost = $('#jobs-no-additional-cost').text();

    $('#awarded-jobs-no-additional-cost').html(parseFloat(jobsNoAdditionalCost / awardBidRatio || 0).toFixed(2));

    $('#jobs-bid-sage-pays-for-itself').html(parseFloat(investmentCost / savingsPerBid || 0).toFixed(2));

    $('#jobs-awarded-sage-pays-for-itself').html(parseFloat(investmentCost / savingsPerJobAwarded || 0).toFixed(2));

    $('#months-sage-pays-for-itself').html(parseFloat(investmentCost / ((jobsAwardedPerYear * savingsPerJobAwarded) / 12) || 0).toFixed(2));

    $('#ongoing-annual-savings').html(parseFloat(savingsPerYear || 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

  });


}); // end document ready
