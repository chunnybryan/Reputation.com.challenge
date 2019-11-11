/*jshint expr: true */

!(function() {
    'use strict';

    var element = document.getElementsByClassName('reputation-widget')[0];
    if (element) {
        var tk = element.getAttribute('data-tk'),
            lk = element.getAttribute('data-lk'),
            lc = element.getAttribute('data-lc'),
            widgetId = element.getAttribute('data-widget-id'),
            env = element.getAttribute('env'),
            region = element.getAttribute('region'),
            protocol = /^http:/.test(document.location) ? 'http' : 'https',
            iframe,
            widget;

        // Create iframe
        iframe = document.createElement('iframe');
        iframe.id = 'reputation-widget-0'; // ?
        iframe.style.border = '1px solid #ccc';

        // Determine iframe src
        if (env && env === 'local') {
            iframe.src = 'http://localhost:3334/';
        } else {
            iframe.src = protocol + '://' + (env ? env + '-' : '') + 'widgets' + (region && region !== 'us' ? '-' + region : '') + '.reputation.com/';
        }
        iframe.src += 'widgets/' + widgetId + '/run?tk=' + tk;

        if (lc) {
            iframe.src += '&lc=' + lc;
        } else if (lk) {
            iframe.src += '&lk=' + lk;
        }

        // Apply widget parameters
        window.addEventListener('message', function(event) {
            widget = event.data;

            if (widget.id === widgetId) {
                iframe.title = widget.name;

                if (widget.widgetTypeID === 'inbox') {
                    iframe.allowTransparency = 'true';

                    iframe.style.border = '0px';
                    iframe.style.position = 'fixed';
                    iframe.style.height = '100%';
                    iframe.style.width = '100%';
                    iframe.style.bottom = '0px';
                    iframe.style.right = '0px';
                } else if (widget.parameters) {
                    if (widget.parameters.width && widget.parameters.widthUnits) {
                        iframe.style.width = widget.parameters.width + widget.parameters.widthUnits;
                    }

                    if (widget.parameters.height) {
                        iframe.style.height = widget.parameters.height + 'px';
                    }
                }
            }
        });

        // Replace element
        element.parentNode.replaceChild(iframe, element);
    }

}());