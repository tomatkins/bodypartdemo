/**
 * @file
 * Behaviors for the drupalcoders_bootstrap theme.
 */

(function ($, _, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.drupalcoders_bootstrap = {
    attach: function (context) {
    	
     //Dropdown Mobile Menu
      if($(window).innerWidth() < 768) {

      	$('.expanded.dropdown').click(function() {

      		$(this).children('ul').slideToggle(); // Change the the speed of the animation. 1000 = 1 second.

      	});
      }
      
      }
  };
})(window.jQuery, window._, window.Drupal, window.drupalSettings);