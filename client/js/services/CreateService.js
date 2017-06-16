(function () {
  'use strict';

  angular.module('app').service('CreateService', CreateService);

  CreateService.$inject = ['$rootScope', '$filter', '$state','HotelDetails'];

  function CreateService($rootScope, $filter, $state,HotelDetails) {

   var self = this;

    return {
    	 init: init,
       datapop:datapop,
       finddatapop:finddatapop,
       editdatapop:editdatapop,
       createdata:createdata,
       searchservice:searchservice,
       deleterecord:deleterecord

    }; 


    function init() {            
        $rootScope.datalisting = {};        

    } 

  	function datapop() {
      console.log("DATA");
  		return HotelDetails.find().$promise;
  	}

     function deleterecord(arg) {
       return HotelDetails.deleteById({id: arg}).$promise;
     }

    

    function searchservice(arg) {
        var searchword = "%"+arg+"%";         
        console.log("serrvice",searchword);
        return HotelDetails.find({   
          filter: {      
            where: {
              or: [{'area': {like: searchword}}, {'foodtype': {like: searchword}}, {'restaurantName': {like: searchword}}]
            } 
          }       
         }).$promise;
    }

    function finddatapop(arg) {
       self.index = arg;
        return HotelDetails.findOne({
          filter: {
            where: {
              id: self.index
            }
          }
        }).$promise;
    }    
  

    function editdatapop(arg,data){
      self.index = arg;
      return HotelDetails.updateAttributes({
      id: self.index
      },{ 
        "description": data.description,
        "restaurantName": data.restaurantName,
        "foodtype": data.foodtype,
        "area": data.area       
      }).$promise;
    }

    function createdata(arg){    
        return HotelDetails.create({    
        "description": arg.description,
        "restaurantName": arg.restaurantName,
        "foodtype": arg.foodtype,
        "area": arg.area     
        }).$promise;
    }




}


})();
