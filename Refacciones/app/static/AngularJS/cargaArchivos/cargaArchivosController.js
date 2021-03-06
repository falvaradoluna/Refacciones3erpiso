registrationModule.controller('cargaArchivosController', function ($route, $scope, $rootScope, $location, cargaArchivosRepository, userFactory, alertFactory) {

    $scope.definiciones = [];
    $scope.preciosAgregados = [];
    $scope.configuracionNombre;
    $scope.listaPrecio = [];
    $scope.cargaPrecios = {};
    $scope.listaCampos = [];
    $scope.fieldsFile = [];







    $scope.init = function () {

        //redirecciona al login si no hay un usuario logeado
        var userData = userFactory.getUserData();
        if (userData == null || userData == undefined)
            location.href = '/';
        $scope.userData = userFactory.getUserData();

        // obtener las marcas

        cargaArchivosRepository.getMarcas().then(function (result) {

            console.log('getMarcas del Repository');
            if (result.data.length > 0) {

                console.log('data length mayor a zero');
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
        console.log('Posicion Seleccionada');
        console.log($scope.campoSeleccionado);
        console.log($scope.campoSeleccionado.idCampo);
        console.log($scope.campoSeleccionado.campo);
        console.log($scope.fieldSeleccionado);
        console.log($scope.fieldSeleccionado.field);


        var definicion = {
            idCampo: $scope.definiciones.length,
            idCampoCatalogo: $scope.campoSeleccionado.idCampo,
            campo: $scope.campoSeleccionado.campo,
            posicion: $scope.fieldSeleccionado.field
            //posicion: $scope.posicion
        }
        $scope.definiciones.unshift(definicion);

    }

    // ------------------------------------------ ELIMINA COTIZACIONES

    $scope.showCancelaPosicion = function (definicion, idx) {

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


    $scope.subir = function () {
        console.log('LLegue a Subir Archivo');
        console.log('Nombre del Archivo');
        console.log($scope.archivo.file);

    };


    $scope.exportar = function () {
        console.log('Entre a Exportar');
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
        /*Checks whether the file is a valid excel file*/
        if (regex.test($("#excelfile").val().toLowerCase())) {
            var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
            if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
                xlsxflag = true;
                var file = $('#excelfile')[0].files[0]
                if (file) {
                    var archivo = file.name;
                    // console.log(file.name);
                };
                $scope.nombreArchivo = file.name;
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

                    console.log('Sheer Name');
                    console.log(sheet_name_list);



                    var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                    sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                        /*Convert the cell value to Json*/
                        if (xlsxflag) {
                            $scope.listaPrecio = XLSX.utils.sheet_to_json(workbook.Sheets[y], {
                                range: 0,
                                header: function (column_name, column_number, column_letter) {
                                    console.log('Change Name ??');
                                    console.log(column_name.replace(/ /g, "_"));
                                    return column_name.split(' ').join('_');
                                }
                                //header: function(column_name, column_number, column_letter) { return column_name.replace(/\s(.)/g, function($$,$1) { return $1.toUpperCase()}); }
                                //header: function(column_name, column_number, column_letter) { return column_name.replace(/ /g,"_"); }


                            });
                            console.log('entre en xlsxflag')
                            console.log($scope.listaPrecio);
                        }
                        else {
                            $scope.listaPrecio = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y])
                                ;
                        }
                        if ($scope.listaPrecio.length > 0 && cnt == 0) {
                            BindTable($scope.listaPrecio, '#exceltable');
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
        PoblarFieldsFile(jsondata);
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
        var columnSet = [];
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
    function PoblarFieldsFile(jsondata) {/*Function used to get all column names from JSON and bind the html table header*/
        var columnSet = [];
        var headerTr$ = $('<tr/>');
        var numCampo = 1;
        for (var i = 0; i < 1; i++) {
            var rowHash = jsondata[i];
            for (var key in rowHash) {
                //console.log('Valor de key');
                //console.log(key);

                if (key != '__rowNum__') {

                    var fieldFile = {
                        idField: numCampo,
                        field: key
                    }
                    numCampo = numCampo + 1;
                    //console.log(fieldFile);

                    $scope.fieldsFile.push(fieldFile);

                }

                // console.log('Array Fileds');
                //  console.log($scope.fieldsFile);

            }
        }

        //console.log($scope.fieldsFile)
        $scope.fields = $scope.fieldsFile;

        var fieldFile = {
            idField: 0,
            field: 'Seleccione un campo del Archivo.'
        }

        $scope.fields.unshift(fieldFile);
        $scope.fieldSeleccionado = $scope.fields[0];

        console.log('Combo');
        console.log($scope.fields);

    };


    $scope.modalEnviar = function () {
        var precios = [];
        angular.forEach($scope.listaPrecio, function (value, key) {
            precios.push({
                precio: value
            });
        });

        var campos = [];
        angular.forEach($scope.definiciones, function (value, key) {
            campos.push({
                definicion: value
            });
        });

        var file = $('#excelfile')[0].files[0]
        if (file) {
            var archivo = file.name;
            // console.log(file.name);
        };
        $scope.nombreArchivo = file.name;
        var inserta = {
            idUsuario: $scope.userData.idUsuario,
            idMarca: $scope.marcaSeleccionada.idMarca,
            precios: precios,
            campos: campos,
            archivo
        };

        console.log($scope.marcaSeleccionada);
        console.log($scope.userData);
        console.log(archivo);
        console.log('XML Precios');
        console.log(precios);
        console.log('XML Campos');
        console.log(campos);
        console.log($scope.nombreArchivo);





        // inserta = $scope.marcaSeleccionada == null || $scope.marcaSeleccionada == undefined ? false : inserta;
        // inserta = $scope.userData == null || $scope.userData == undefined ? false : inserta;

        cargaArchivosRepository.insPrecios(inserta).then(function (result) {
            console.log(result.data);
            if (result.data.length > 0 && (result.data[0].control == 1)) {
                alertFactory.success('Se cargo correctamente la lista de precios');

            } else{
                alertFactory.info('Ocurrio un error al agregar la lista.');
            }

        });
    };

});