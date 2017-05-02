var calc = {

  operators: [ '+', '-', 'x', '/', '*', 'π' ],
  format: function(str) {
    str = str.replace(/\s/g, '');
    return str.split('').map(function(v) {
      return calc.operators.includes(v) ? (' ' + v + ' ') : v;
    }).join('');
  },
  enterNum: function(e) {
    var num = $(e.target).text(),
        $inputDisp = $("#inputDisp"),
        currentDisp = $inputDisp.val(),
        newDisp = calc.format( currentDisp + num );

    if (currentDisp === '0') {
      $inputDisp.val( calc.format( num ) );
    } else {
      $inputDisp.val( newDisp );
    }
  },
  enterOperator: function(e) {
    var operator = $(e.target).text(),
        $inputDisp = $('#inputDisp'),
        currentDisp = $inputDisp.val(),
        newDisp = calc.format( currentDisp + operator ),
        prevAnswer = $('.prevAnswer').text().split('=')[1];

    if ( currentDisp === '' && prevAnswer ) {
      $inputDisp.val( calc.format( prevAnswer + operator ));
    } else if ( currentDisp === '' ) {
      $inputDisp.val( calc.format( '0' + operator ));
    } else {
      $inputDisp.val( newDisp );
    }
  },
  processExpression: function() {
    var expression = $('#inputDisp').val().replace(/[x]/g, '*')
                                           .replace(/[π]/g, '' + Math.PI),
        $inputDisp = $('#inputDisp');

    if ( calc.notValid(expression) ) {

      $inputDisp.val('Expression not valid');
    } else {
      var output = eval( expression );
      $inputDisp.val(output);
      if (output === 'Infinity') {return; }
      if (output === 'NaN') {return; }
      calc.displayAns();
    }


  },
  processAC: function() {
    var $inputDisp = $('#inputDisp'),
        val = $inputDisp.val();

    if (val === '') {
      $('.prevAnswer').text('');
    }

    $inputDisp.val('');


  },
  processSqr: function() {
    var expression = $('#inputDisp').val().replace(/[x]/g, '*')
                                           .replace(/[π]/g, '' + Math.PI),
        $inputDisp = $('#inputDisp');

    if ( calc.notValid(expression) ) {
      $("#inputDisp").val('Expression not valid');
    };

    var output = Math.sqrt( +eval(expression) );
    $inputDisp.val('' + output);
  },
  processPercent: function() {
    var expression = $('#inputDisp').val().replace(/[x]/g, '*')
                                           .replace(/[π]/g, '' + Math.PI),
        $inputDisp = $('#inputDisp');

    if ( calc.notValid(expression) ) {
      $("#inputDisp").val('Expression not valid');
    };

    var output = '' + ( +eval(expression) / 100 );
    $inputDisp.val(output);
  },
  displayAns: function() {
    var $prevAnswer = $('.prevAnswer'),
        val = $('#inputDisp').val();

    if ( val === 'Infinity' || val === 'Expression not valid') {
      return;
    }

    $prevAnswer.text( 'Ans=' + val );
  },
  notValid: function(str) {
    arr = str.split(' ');
    for (var i = 0; i < arr.length; i++ ) {

      if ( i % 2 === 1 && !this.operators.includes( arr[i] )) {
        return true;
      }
      if ( i % 2 === 0 && +arr[i] === 'NaN'  ) {
        return true;
      }
      if ( arr[i] === 'NaN' ) {
        return true;
      }
      if ( arr.includes('NaN') ) {
        return true;
      }
    }

  },
  clearNotValid: function() {
    var val = $('#inputDisp').val();
    if ( val === 'Infinity' || val === 'Expression not valid') {
      $('#inputDisp').val('');
    }
  },
  callBacks: function() {
    $('.btn').on('click', this.clearNotValid);
    $('.num').on( 'click', this.enterNum );
    $('.operator').on( 'click', this.enterOperator );
    $('.equals').on('click', this.processExpression);
    $('.ac').on('click', this.processAC);
    $('.sqr').on('click', this.processSqr);
    $('.percent').on('click', this.processPercent);
  },
  init: function() {
    this.callBacks();
  }
}
