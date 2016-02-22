/**
 * Created by Ahmatov on 22.02.2016 022.
 */
console.log('flicker loaded');
$(document).ready(function () {

    var plate_width = 111;
    var plate_height = plate_width;
    var max_x_step = 9;
    var max_y_step = 5;
    var total_plates = 24;
    var min_delay = 1000;
    var rand_delay = 8000;
    var used_plates = [];
    var x_step;
    var y_step;
    var plate_number;
    var fadeTo_speed = 500;
    var fadeOut_speed = 1500;
    var fadeDelay_speed = 1500;

    function rand(nmbr) {
        var cur_nmbr = Math.floor(Math.random() * nmbr);
        return cur_nmbr;
    }

    function ololo(max_x_step, max_y_step) {
        x_step = rand(max_x_step);
        y_step = rand(max_y_step);
        plate_number = y_step * max_x_step + x_step;
        for (q = 1; q <= total_plates; q++) {
            if (plate_number == used_plates[q]) {
                ololo(max_x_step, max_y_step);
                break;
            }
        }
    }

    function init_flicker() {
        for (i = 1; i <= total_plates; i++) {
            flicker(i);
        }
    }

    function flicker(c_n) {
        var plate = '#plate-' + c_n;
        $(plate).fadeTo(fadeOut_speed, 0);
        ololo(max_x_step, max_y_step);
        used_plates[c_n] = plate_number;
        var x_pos = plate_width * x_step + 'px';
        var y_pos = plate_height * y_step + 'px';

        function sec2() {
            $(plate).css("background-image", "url(../img/plate_sprite.jpg)");
            $(plate).css("backgroundPosition", x_pos + " " + y_pos);
            $(plate).fadeTo(fadeTo_speed, 1);
            sec1("ret-" + c_n);
        }

        function sec() {
            flicker(c_n);
        }

        var inter = Math.floor(Math.random() * rand_delay) + min_delay;

        function sec1(der) {
            clearTimeout(der);
            der = setTimeout(sec, inter);
        }

        setTimeout(sec2, fadeDelay_speed);
    }

    init_flicker();
});
