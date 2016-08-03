// Code goes here

(function(){
  'use strict';
  // Constructor function for myController
  function Controller($scope, localStorageService){
    var vm = this;
    // Form object
    vm.formData = {};

    // Getting pascal data from local storage
    var pascalTriangle = localStorageService.get('pascalTriangle');
    
    pascalTriangle ? vm.pascalTriangle = pascalTriangle : vm.pascalTriangle = [];

    // Array to hold repeating number from 0-3 based on pascal Triangle length
    vm.classArray = [];

    vm.createPascalTriangle = createPascalTriangle.bind(this);

    // Create pasal triangle based on the parameters
    function createPascalTriangle (numRows, form) {
      if (form.$valid){
        var pascalTriangle = [];
        for (var i = 0; i < numRows; i++) {

          pascalTriangle[i] = new Array(i+1);

          for (var j = 0; j < i+1; j++) {
            if (j === 0 || j === i) {
              pascalTriangle[i][j] = 1;
            } else if (j < i) {
              pascalTriangle[i][j] = pascalTriangle[i-1][j-1] + pascalTriangle[i-1][j];
            } else {
              continue;
            }
          }
        }
        vm.pascalTriangle = pascalTriangle
        localStorageService.set('pascalTriangle',vm.pascalTriangle);
      }
    }

    $scope.$watch(angular.bind(vm, function () {
      return vm.pascalTriangle;
    }), function (newVal) {
      if (newVal){
       var i = 0;
       vm.classArray = [];
       var j = 0;
       for (i = 0; j < newVal.length; i++){
         // reduce the i value to 0 when the i value exceeds 3
         if (i > 3){
           i = 0;
         }
         vm.classArray.push(i);
         j += 1;
       }
      }
    });

  }
  angular.module('myApp', ['LocalStorageModule'])
    .controller('myController', [
      '$scope',
      'localStorageService',
      Controller
    ])

})();
