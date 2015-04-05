/**
 * This file contains all Drupal behaviours of the Imroth theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    /**
     * Front page click.
     */
    Drupal.behaviors.frontPageClick = {
        attach: function () {
            // wait for DOM load complete
            $(document).ready(function () {
                $('body.front img').once(function () {

                    // featured produkt
                    var link = '/node/40';
                    $(this)
                        .unbind('click')
                        .attr('href', link)
                        .css('cursor', 'pointer')
                        .bind('click', function () {
                            window.location = link;
                        });
                });
            });

        }
    };

    /**
     * Make equal column heights on Kommunikation pages.
     */
    Drupal.behaviors.equalColumnHeights = {
        attach: function () {
            // local functions
            var maxHeight = 0,
                $content = $('#content'),
                _calcMaxHeight = function() {
                    // get max height
                    var iHeight = $(this).innerHeight();
                    if (iHeight > maxHeight) {
                        maxHeight = iHeight;
                    }
                },
                _adjustHeight = function() {
                    // adjust heights of each column
                    var iHeight = $(this).innerHeight();
                    if (maxHeight > iHeight) {
                        $(this).innerHeight(maxHeight);
                    }
                },
                _fixColumns = function(nodes) {
                    maxHeight = 0;
                    var columns = nodes.find('.at-panel > .region:not(.region-conditional-stack) > .region-inner');
                    columns.each(_calcMaxHeight);
                    columns.each(_adjustHeight);
                },
                makeEqualColumns = function() {
                    // equal column heights of specific nodes (not for mobile)
                    if ($(window).width() > 480) {
                        var $items = $content.find('.ui-tabs .ui-tabs-panel').not(':hidden');
                        if ($items.length <= 0) {
                            $items = $(document).find('body.node-type-page-text-image article.node-page-text-image');
                        }
                        _fixColumns($items);
                    }
                };

            // equalize columns on pages
            $(document).ready(function(){
                // call makeEqualColumns() when tab is activated (no page reload)
                // Version jQuery UI 1.10
                $content.find('.ui-tabs').on('tabsactivate', function () {
                    makeEqualColumns();
                });

                // call makeEqualColumns() on page reload
                $(window).load(makeEqualColumns);
            });

        }
    };

    /**
     * Styles active trail of superfish nav-bar-menu.
     */
    Drupal.behaviors.activeTrailStyling = {
        attach: function () {
            // add right border to first level menu items
            var $sf = $('#superfish-1'),
                $menus = $sf.find('li'),
                $topMenus = $sf.find('>li'),
                _setActiveMenu = function () {
                    $menus.removeClass('active-menu');
                    $menus.has('a.active').addClass('active-menu');
                },
                _setLinkBorders = function() {
                    // reset border class
                    $topMenus.find('>a').addClass('right-border');

                    // disable right borders for the two last items, the active item and its predecessor
                    var $activeTopMenu = $sf.find('>li.active-menu > a');
                    $activeTopMenu.removeClass('right-border');
                    $activeTopMenu.parent().prev().find('>a').removeClass('right-border');
                    $topMenus.last().find('>a').removeClass('right-border');
                    $topMenus.last().prev().find('>a').removeClass('right-border');

                };

            // first correct active-trail of superfish
            $menus.on('click', function() {
                _setActiveMenu();
                _setLinkBorders();
            });

            // initialize borders on page load
            $(document).ready(function() {
                _setActiveMenu();
                _setLinkBorders();
            });

        }
    };

})(jQuery);