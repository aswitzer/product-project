angular.module("myApp")
	.controller("myCtrl", ['$scope', '$location', 'MyApis', 'Helper', function($scope, $location, MyApis, Helper) {

	$scope.cData = {
		products: [],
		selectedProduct: null,
		selectedPartner: null,
		dataLoading: false
	}

	$scope.buyProduct = function buyProduct(product) {
		$location.path('/buyProduct').search({id: product.id});
	};
	$scope.hideProductDetails = function hideProductDetails() {
		 $scope.cData.selectedProduct = null;
	};
	$scope.displayProductDetails = function displayProductDetails(product) {
		$scope.cData.selectedProduct = product;
	};

	$scope.filterProductsByPartner = function filterProductsByPartner(partner) {
		//alert("Partner selected: " + partner.name);
		$scope.cData.selectedPartner = partner;

    $scope.cData.dataLoading = true;
    MyApis.getFilteredProducts(partner.id).then(function(products) {
			$scope.cData.products = products;
		}, function(errorMessage) {}).finally(function() { $scope.cData.dataLoading=false});

		// Clear the Search Input if we select a Partner
		$scope.cData.searchInput=null;
	};

	$scope.getProducts = function getProducts(partner) {
		$scope.cData.dataLoading = true;
		MyApis.getProducts().then(function(products) {
			$scope.cData.products = products;
		}, function(errorMessage) {}).finally(function() { $scope.cData.dataLoading=false});
	};

	$scope.getPartners = function getPartners() {
		$scope.cData.dataLoading = true;
		MyApis.getPartners().then(function(partners) {
			$scope.cData.partners = partners;
		}, function(errorMessage) {}).finally(function() { $scope.cData.dataLoading=false});
	};

	$scope.init = function init() {
		$scope.getProducts();
		$scope.getPartners();
	};

	$scope.init();

}]);
