myApp.controller('mainController', ['$rootScope','$scope','$http', function($rootScope, $scope, $http, requestFactory) {  
     
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    (function refresh(){
        (function getRequestAjax() {
            requestFactory.getRequestAjax('GET','/api/contatos','','refresh');
            $rootScope.$on('refresh', function (event, data, status) {
                console.log("Contatos: ", data);
                $scope.contatos = data;
                $scope.formContato = {};

            });
        })();
    })();
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarContato = function() {
        (function getRequestAjax() {
            requestFactory.getRequestAjax('POST','/api/contatos',$scope.formContato,'createContacts');
            $rootScope.$on('createContacts', function (event, data, status) {
                // Limpa o formulário para criação de outros contatos
                $scope.formContato = {};
                $scope.contatos = data;
                console.log(data);

            });
        })();
    };
 
    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarContato = function(id) {
        $http.delete('/api/contatos/' + id)
            .success(function(data) {
                $scope.contatos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Ao clicar no botão Editar, edita o contato
    $scope.editarContato = function(id) {
        $http.get('/api/contatos/' + id)
            .success(function(data) {
                $scope.formContato = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarContato = function() {        
        $http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato)
        .success( function(response){
            refresh();
        });
    };
 
}]);