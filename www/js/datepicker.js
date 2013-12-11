function startDatepicker()
{
	var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'yymmdd',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    dateOrder: 'yymmdd',
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 1
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'btn': {
                    preset: 'date',
                    showOnFocus: false
                },
                'inline': {
                    preset: 'date',
                    display: 'inline'
                }
            }

           $('#starttime').val('').scroller('destroy').scroller($.extend(opt['datetime'], { theme: 'android', mode: 'scroller' }));
           $('#endtime').val('').scroller('destroy').scroller($.extend(opt['datetime'], { theme: 'android', mode: 'scroller' }));
           //$('#test').val('').scroller('destroy').scroller($.extend(opt['time'], { theme: 'android', mode: 'scroller' }));
}