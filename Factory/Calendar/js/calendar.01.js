function setStyle(id, style, value) {
    id.style[style] = value;
}

function opacity(el, opacity) {
    setStyle(el, "filter:", "alpha(opacity=" + opacity + ")");
    setStyle(el, "-moz-opacity", opacity / 100);
    setStyle(el, "-khtml-opacity", opacity / 100);
    setStyle(el, "opacity", opacity / 100);
}


months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var stored_Date;
var _parent, _node;

function calendar(node, parent, init_time) {

    _parent = parent;
    _node = node;

    if (init_time == null || undefined) {
        var date = new Date();
    } else {
        var date = new Date(init_time);
    }
    stored_Date = date;

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    if (year <= 200) {
        year += 1900;
    }
    if (year % 4 == 0 && year != 1900) {
        days_in_month[1] = 29;
    }
    total = days_in_month[month];
    var date_today = day + ' ' + months[month] + ' ' + year;
    _begin_day = date;

    // Set _begin_day as frst day of month
    _begin_day.setDate(1);
    if (_begin_day.getDate() == 2) {
        _begin_day = setDate(0);
    }
    // The value returned by getDay() is an integer corresponding to the day of the week: 
    // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. 
    _begin_day = _begin_day.getDay();

    var str_table = "";
    str_table = '<table class="cal_calendar" ><tbody id="cal_body"><tr><th colspan="7" id="cal_head">' + date_today + '</th></tr>';
    str_table += '<tr class="cal_d_weeks"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

    week = 0;
    for (i = 1; i <= _begin_day; i++) {
        str_table += '<td class="cal_days_bef_aft">';        
        var that_day = new Date(new Date().setDate(new Date().getDate() - day - _begin_day + i));
        str_table += that_day.getDate();
        str_table += "<div style = 'display:hidden'>" + that_day + " </div>"
        str_table += '</td>';
        week++;
    }
    for (i = 1; i <= total; i++) {
        if (week == 0) {
            str_table += '<tr>';
        }
        var that_day = new Date(new Date().setDate(new Date().getDate() - day + i));

        if (day == i) {
            str_table += '<td class="cal_today">' + "<div style = 'display:hidden'>" + that_day + " </div>" + i + '</td>';
        } else {
            str_table += '<td>' + "<div style = 'display:hidden'>" + that_day + " </div>" + i + '</td>';
        }
        week++;
        if (week == 7) {
            str_table += '</tr>';
            week = 0;
        }
    }
    for (i = 1; week != 0; i++) {
        var that_day = new Date(new Date().setDate(new Date().getDate() + i));
        str_table += '<td class="cal_days_bef_aft">';
        str_table += "<div style = 'display:hidden'>" + that_day + " </div>";
        str_table += i;
        str_table += '</td>';
        // console.log('that day: ', that_day);
        week++;
        if (week == 7) {
            str_table += '</tr>';
            week = 0;
        }
    }
    str_table += '</tbody></table>';
    node.innerHTML = str_table;
    parent.appendChild(node);
    opacity(document.getElementById('cal_body'), 70);
    // Add left and right button for cal_head
    var bnt_left = document.createElement("div");
    bnt_left.style.cssText = 'float:left; margin-left: 10px; width: 20%;cursor:pointer';
    bnt_left.innerHTML = '<i class="fa fa-caret-left fa-2x"></i>';
    bnt_left.addEventListener('click', function(event) {
        event.stopPropagation();
        setTime(-1)
    });
    document.getElementById('cal_head').appendChild(bnt_left);

    var bnt_right = document.createElement("div");
    bnt_right.style.cssText = 'float:right; margin-right: 10px; width: 20%;cursor:pointer';
    bnt_right.innerHTML = '<i class="fa fa-caret-right fa-2x"></i>';
    bnt_right.addEventListener('click', function(event) {
        event.stopPropagation();
        setTime(1)
    })

    document.getElementById('cal_head').appendChild(bnt_right);
    bnt_center = document.getElementById('cal_head');
    bnt_center.style.cssText = ' cursor:pointer';
    bnt_center.addEventListener('click', function(){ setTime(0)})
    

    return true;
}

function setTime(val) {    
    stored_Date.setMonth(stored_Date.getMonth() + val);
    if (val == 0){
        stored_Date = new Date(); // current time
    }
    // remove elements of _node

    while (_node.firstChild) {
        _node.removeChild(_node.firstChild);
    }
    calendar(_node, _parent, stored_Date);
}
