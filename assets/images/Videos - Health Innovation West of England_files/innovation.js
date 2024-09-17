jQuery(document).ready(function() {

    // filter for networking and events
      jQuery(document).on("click", ".filter", function(){
        let filterBy = jQuery(this).data('filter-by');

        jQuery('.filter').removeClass('selected');
        jQuery(this).addClass('selected')

        if("all" == filterBy){
            jQuery('.events').fadeIn();
            jQuery('.networking').fadeIn();
        }

        if("events" == filterBy){
            jQuery('.events').fadeIn();
            jQuery('.networking').fadeOut();
        }

        if("networking" == filterBy){
            jQuery('.events').fadeOut();
            jQuery('.networking').fadeIn();
        }

        return false;
    });

      // Filter for funding and opportunities
    jQuery(document).on("click", ".filter-funding", function(){
        let filterBy = jQuery(this).data('filter-by');
        let ajaxurl = '/wp-admin/admin-ajax.php';

        jQuery('#content-grid').slideUp();
        jQuery('.filter').removeClass('selected');
        jQuery(this).addClass('selected')

        if("all" == filterBy){
            action = 'funding_load_all';
        }

        if("open" == filterBy){
            action = 'funding_load_open';
        }

        if("closed" == filterBy){
            action = 'funding_load_closed';
        }

        let data = {
            'action': action,
            'page': 1,
        };

        jQuery.post(ajaxurl, data, function (response) {
            if (jQuery.trim(response) !== '') {
                jQuery('#content-grid').html(response).slideDown();
            } else {
                jQuery(more).hide();
            }
        });
        return false;
    });

    jQuery(document).on("click", "#load-more", function () {

        let type = jQuery(this).attr('data-type');
        let page = jQuery(this).attr('data-page');
        let status = jQuery(this).attr('data-status');

        console.log(type);
        let action = '';
        let ajaxurl = '/wp-admin/admin-ajax.php';
        let target = '#content-grid';
        let more = '#more';

        if ('ie-funding' == type) {

            action = 'funding_load_more';
            if ('open' == status) {
                action = 'funding_load_more_open';
            }
            if ('closed' == status) {
                action = 'funding_load_more_closed';
            }
        }

        if ('networking' == type) {
            action = 'networking_load_more';
            target = '#content-grid-networking';
            more = "#more-networking";
        }

        if ('events' == type) {
            action = 'events_load_more';
            target = '#content-grid-events';
            more = "#more-events";
        }

        if ('ie-case-study' == type) {
            action = 'case_studies_load_more';
        }

        if ('news' == type) {
            action = 'news_load_more';
        }

        if ('post' == type) {
            console.log("BLOG");
            action = 'blog_load_more';
        }

        let data = {
            'action': action,
            'page': page,
        };

        jQuery.post(ajaxurl, data, function (response) {
            if (jQuery.trim(response) !== '') {
                jQuery(more).remove();
                jQuery(target).append(response).fadeIn();
            } else {
                jQuery(more).hide();
            }
        });
        return false;
    });

});
