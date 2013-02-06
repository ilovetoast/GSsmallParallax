/*!
 * GreenSock Parallax: a simple and small parallax plugin.
 * http://steeleimage.com/portfolio/fsbi
 *
 * Copyright 2012, Michael Steele
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://steeleimage.com/1icense
 *
 * Date: Wed Jan 6 13:50:00 2012 -0400
 *
 * Version 1.0.0
 *
 */
  
function gsParallax(align) {

    if (align === 'left') {
        align = '0% ';
    } else if (align === 'right') {
        align = '100% ';
    } else {
        align = '50% ';
    }
    var staticValCheck = null;
    var staticVal = null;
    var winY = null;
    var coord = null;

    $('[data-sp-object], [data-sp-parallax]').each(function() {

        var key = null;
        var $obj = $(this); //A simple Parallax Item    
        //parallax
        if ($obj.data('sp-parallax')) {
            //Get each command from data-sp
            var speed = $obj.data('sp-parallax');

            //Check for current property value, else set 0
            staticValCheck = parseInt($(this).data('sp-offset'));
            staticVal = isNaN(staticValCheck) ? 0 : staticValCheck;
            $obj.css('background-position', align + staticVal);
            key = 'parallax';

        } //parallax
        if ($obj.data('sp-object')) {
            //Get each command from data-sp
            var rawData = $obj.data('sp-object');
            var commands = rawData.split(":");

            //Get property and speed
            var property = commands[0],
                speed = commands[1];

            //Check for current property value, else set 0
            staticValCheck = parseInt($(this).css(property));
            staticVal = isNaN(staticValCheck) ? 0 : staticValCheck;
            key = 'object';
        }
        //TODO add support for multiple properties
        $(window).scroll(function() {

            if (key === 'parallax') {
                winY = -($(window).scrollTop() / speed); //speed
                coord = align + (staticVal + winY) + 'px'; //apply speed to attribute
                TweenMax.to($obj, 0.8, {
                    css: {
                        backgroundPosition: coord
                    },
                    ease: Cubic.easeOut
                });
            }

            if (key === 'object') {

                var winY = -($(window).scrollTop() / speed); //speed
                var coord = (staticVal + winY) + 'px'; //apply speed to attribute
                var cssProps = new Object();
                cssProps[property] = coord;

                TweenMax.to($obj, 0.8, {
                    css: cssProps,
                    ease: Cubic.easeOut
                });
            }
        });
    });
}
