﻿/* jQuery Nxeed's Tree Menu v1 | (c) 2014 Nxeed | https://github.com/nxeed */

(function($) {
    var defaults = {
        autoParentDetection: true,
        autoActiveDetection: true,
        itemsUniqueClasses: true,
        parentClass: 'parent',
        activeClass: 'active',
        selectedClass: 'selected',
        expandClass: 'opened',
        collapseClass: 'closed',
        spoilerButtonClickMinX: 4,
        spoilerButtonClickMaxX: 20,
        spoilerButtonClickMinY: 8,
        spoilerButtonClickMaxY: 24,
        slideEffect: true,
        postRender : function () { $.noop }
    };

    var methods = {
        init: function(params) {
            var options = $.extend({}, defaults, params);

            var items = this.find('li');
            var parentIndex = 0;

            $.each(items, function(num, item) {
                item = $(item);

                if (options.autoParentDetection) {
                    if (item.has('ul')[0]) {
                        item.addClass(options.parentClass);
                        item.attr('id',"node-"+num); //Adding id to all tree elements
                    }
                }

                if (options.itemsUniqueClasses) {
                    item.addClass('item-' + num);
                }

            });

            var parents = this.find('.' + options.parentClass);

            $.each(parents, function(num, parent) {
                parent = $(parent);

                parent.addClass(options.collapseClass);

                if (parent.has('.' + options.selectedClass)[0]) {
                    parent.removeClass(options.collapseClass).addClass(options.expandClass);

                    if (options.autoActiveDetection) {
                        parent.addClass(options.activeClass);
                    }
                }
                options.postRender(); //Added to invoke js function passed as param, if it is not passed $.noop will be invoked

                //Thinesh - Add id for parent node
                if (options.autoParentDetection) {
                    parent.attr('id','parentnode-' + parentIndex);
                    parentIndex++;
                }
                
                //Thinesh - Hide expansion of child node if parent has selected.
                //if (parent.hasClass(options.selectedClass)) {
                    //parent.removeClass(options.activeClass).removeClass(options.collapseClass).addClass(options.expandClass);
                //}
            });

            $('.' + options.collapseClass + ' > ul', this).hide();

            $('.' + options.parentClass + ' > a', this).click(function(e) {
                var posX = $(this).offset().left;
                var posY = $(this).offset().top;


//                var clickX = e.pageX - posX;
                // vijayanand.vp link position is now moved by 15 px after changes for alignment.
                var clickX = e.pageX - posX + 15;
                var clickY = e.pageY - posY;

                if (clickX <= options.spoilerButtonClickMaxX && clickX >= options.spoilerButtonClickMinX && clickY <= options.spoilerButtonClickMaxY && clickY >= options.spoilerButtonClickMinY) {
                    var item = $(this).parent('li');
                    var content = $(this).parent('li').children('ul');

                    item.toggleClass(options.expandClass).toggleClass(options.collapseClass);

                    if (options.slideEffect) {
                        content.slideToggle();
                    } else {
                        content.toggle();
                    }

                    e.preventDefault();
                }
                options.postRender(); //Added to invoke js function passed as param, if it is not passed $.noop will be invoked
            });
        }
    };

    $.fn.ntm = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод "' + method + '" не найден в плагине jQuery.ntm');
        }
    };
})(jQuery);
