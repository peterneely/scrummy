'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Device', DeviceService);

  DeviceService.$inject = ['screenSize'];

  function DeviceService(screenSize) {

    return {
      isDesktop: isDesktop,
      isLargeDesktop: isLargeDesktop,
      isMobile: isMobile,
      isPortable: isPortable,
      isTablet: isTablet
    };

    function isDesktop(){
      return screenSize.is('md');
    }

    function isLargeDesktop(){
      return screenSize.is('lg');
    }

    function isMobile(){
      return screenSize.is('xs');
    }

    function isPortable(){
      return screenSize.is('xs, sm');
    }

    function isTablet(){
      return screenSize.is('sm');
    }
  }

})();