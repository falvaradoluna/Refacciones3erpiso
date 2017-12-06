registrationModule.controller('cargaArchivosController', function ($route, $scope, $rootScope, $location, cargaArchivosRepository, userFactory, alertFactory) {

    $scope.definiciones = [];
    $scope.preciosAgregados = [];    
    $scope.configuracionNombre;
    
    
   

   
    

    $scope.init = function () {
        
        //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if (userData == null || userData == undefined)
            location.href = '/';
        $scope.userData = userFactory.getUserData();

        // obtener las marcas
       
        cargaArchivosRepository.getMarcas().then(function (result) {

            if (result.data.length > 0) {

                $scope.marcas = result.data;

                // inicializacion
                var marca = {
                    idMarca: 0,
                    marca: 'Seleccione una marca.'
                }
                $scope.marcas.unshift(marca);
                $scope.marcaSeleccionada = $scope.marcas[0];
            } else
                alertFactory.info('No se pudieron cargar las marcas');
        });

        // 2 obtener los campós del archivo a procesar
        cargaArchivosRepository.getCampos().then(function (result) {
            
                        if (result.data.length > 0) {
            
                            $scope.campos = result.data;
                            console.log($scope.campos);
            
                            // inicializacion
                            var campo = {
                                idCampo: 0,
                                campo: 'Seleccione un campo.'
                            }
                            $scope.campos.unshift(campo);
                            $scope.campoSeleccionado = $scope.campos[0];
                        } else
                            alertFactory.info('No se pudieron cargar los campos');
                    });
        
    };

    $scope.init();

    $scope.reiniciaBusqueda = function () {
        $scope.busquedaCotizacion = '';
    }



    // ------------------------------------------ AGREGA CAMPO Definition
    $scope.agregarDeficionCampo = function () {
        console.log('Posicion');
        console.log($scope.posicion);
        var definicion = {
            idCampo: 1,
            campo: $scope.campoSeleccionado.campo,
            posicion: $scope.posicion
        }
        $scope.definiciones.unshift(definicion);

    }


    // ------------------------------------------ ELIMINA COTIZACIONES

    $scope.showCancelaPosicion = function (definicion,idx) {
              
                console.log('Se llama a showCancelaPosicion');
                console.log(definicion);
                console.log('Valor de Index??')
                console.log(idx);
        
                $scope.idCampo = definicion.idCampo;
                $scope.nombreCampoCancela = definicion.campo
                $scope.posicionCampoCancela = definicion.posicion
                $scope.idxCancela = idx;
                $('#modalElimina').modal('show')
            };
        
    $scope.cancelaPosicion = function () {
                console.log('llegue a cancelaPosicion');
                console.log('Valor de Index??');
                //console.log(idx);
                console.log($scope.idxCancela);

                $scope.definiciones.splice($scope.idxCancela, 1);

            };


    $scope.subir = function() {
            console.log('LLegue a Subir Archivo');
            console.log('Nombre del Archivo');
            console.log($scope.archivo.file);

    };
    
    
    $scope.exportar =function () {  
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
        /*Checks whether the file is a valid excel file*/  
        if (regex.test($("#excelfile").val().toLowerCase())) {  
            var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
            if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
                xlsxflag = true;  
               
            }  
            /*Checks whether the browser supports HTML5*/  
            if (typeof (FileReader) != "undefined") {  
                var reader = new FileReader();  
                reader.onload = function (e) {  
                    var data = e.target.result;  
                    /*Converts the excel data in to object*/  
                    if (xlsxflag) {  
                        var workbook = XLSX.read(data, { type: 'binary' });  
                    }  
                    else {  
                        var workbook = XLS.read(data, { type: 'binary' });  
                    }  
                    /*Gets all the sheetnames of excel in to a variable*/  
                    var sheet_name_list = workbook.SheetNames;  
     
                    var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                    sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                        /*Convert the cell value to Json*/  
                        if (xlsxflag) {  
                            var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]); 
                           console.log(exceljson); 
                        }  
                        else {  
                            var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                        }  
                        if (exceljson.length > 0 && cnt == 0) {  
                            BindTable(exceljson, '#exceltable');  
                            cnt++;  
                        }  
                    });  
                    $('#exceltable').show();  
                }  
                if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                    reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
                }  
                else {  
                    reader.readAsBinaryString($("#excelfile")[0].files[0]);  
                }  
            }  
            else {  
                alert("Sorry! Your browser does not support HTML5!");  
            }  
        }  
        else {  
            alert("Favor cargar un carchivo valido");  
        }  
    };
    
    
    function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
        var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/  
        for (var i = 0; i < 10; i++) {  
            var row$ = $('<tr/>');  
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
                var cellValue = jsondata[i][columns[colIndex]];  
                if (cellValue == null)  
                    cellValue = "";  
                row$.append($('<td/>').html(cellValue));  
            }  
            $(tableid).append(row$);  
        }  
    };  
    function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
        var columnSet = [10];  
        var headerTr$ = $('<tr/>');  
        for (var i = 0; i < jsondata.length; i++) {  
            var rowHash = jsondata[i];  
            for (var key in rowHash) {  
                if (rowHash.hasOwnProperty(key)) {  
                    if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                        columnSet.push(key);  
                        headerTr$.append($('<th/>').html(key));  
                    }  
                }  
            }  
        }  
        $(tableid).append(headerTr$);  
        return columnSet;  
    };
    
    $scope.modalEnviar = function () {
        
   };

});