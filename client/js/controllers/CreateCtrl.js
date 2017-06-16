// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

(function () {
  'use strict';


angular.module('app').controller('CreateCtrl', CreateCtrl);

    CreateCtrl.$inject = ['$state','$filter', '$scope','$rootScope','CreateService'];
  
    function CreateCtrl($state,$filter, $scope,$rootScope,CreateService) {
          

          initialize();


          /* ## To initalize ## */
          function initialize() {
               CreateService.init();
               datalisting(); 
               $scope.datalisting = {};
               $scope.searchdatalisting = {};
               $scope.searchvalue = "";

          }


         /* ## To initalize data listing ## */
          function datalisting(){            
                CreateService.datapop().then(function (data) {                  
                  $scope.datalisting = data;
                });

          }

          $scope.searchlist = function(data) {
            CreateService.searchservice(data).then(function (respdata) {             
            console.log("respon:sear",respdata); 
               $scope.searchdatalisting =  respdata;                          
            });
          };


          $scope.confirmDelete = function(data) {
            CreateService.deleterecord(data).then(function (respdata) { 
              datalisting();                                         
            });
          };


         /* ## EDIT AND ADD FUNCTION ## */
         $scope.toggle = function (modalstate, id) {
             $scope.modalstate = modalstate;             

            switch (modalstate) {

              case 'add':
                $scope.form_title = "Add Restaurant";  
                $scope.mode = "add";
                $scope.reslist = [];
              break;

              case 'edit':
                $scope.form_title = "Edit Restaurant";
                $scope.mode = "edit";
                $scope.id = id;                
                CreateService.finddatapop($scope.id).then(function (data) {             
                  $scope.reslist = data;

                  //console.log("editfunc", $scope.reslist);
                });                    
              break;

              default:
              break;

            }  

            $('#myModal').modal('show');

         };

          /* ## EDIT AND ADD SAVE FUNCTION ## */

          $scope.ResSave = function (modalstate, id, data) {

            $scope.modalstate = modalstate;
            $scope.data = data;
            $scope.id = id           

            switch (modalstate) {

              case 'add':
                $scope.form_title = "Add Restaurant";               
                CreateService.createdata($scope.data).then(function(data) {
                  datalisting();
                  $('#myModal').modal('hide');
                });
                
              break;

              case 'edit':
                $scope.form_title = "Edit Restaurant";                              
                CreateService.editdatapop($scope.id,$scope.data).then(function(data) {
                  datalisting();
                  $('#myModal').modal('hide');
                });               
              

              default:
              break;

          }
        };


    }

})();



 

