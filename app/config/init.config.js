const db = require("../models/puntoDeVentas");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const controller = require("../controllers/auth.controller");
const { DB } = require("./db.config");
const Role = db.role;
const User = db.user;
const RolePermiso = db.roles_permisos;
const Empleado = db.empleado;
const Permiso = db.permiso;
const TipoPag = db.tipopago;
const Cliente = db.cliente;
const Talonario = db.talonario;
const Vents = db.ventas;
const Sesion = db.sesion;
const Numer = db.numero;
const Fact = db.factura;
const tipoProduc = db.tipoproducto;
const product = db.producto;
const detallevent = db.detalleventa;
const Sucursal = db.sucursal;
const Arqueo = db.arqueo;


exports.initial = async () => {
    try {
        const existeRol = await Role.count();
        if (existeRol !== 0) {
            return existeRol;
        }

        const role = await Role.create({
            id: 1,
            rol: "root",
            descripcion: "super usuario",
        });
        const role2 = await Role.create({
            id: 2,
            rol: "Empleados",
            descripcion: "Super usuario Empleados",
        });
        const permisos = await Permiso.bulkCreate([{
            permiso: "Crear Arqueo",
            descripcion: "Acceder al modulo de Crear arqueo"
        }, {
            permiso: "Actualizar Arqueo",
            descripcion: "Acceder al modulo de Actualizar Arqueo"
        },
        {
            permiso: "Borrar Arqueo",
            descripcion: "Acceder al modulo de Borrar Aqueo"
        },
        {
            permiso: "Mostrar o buscar Arqueo",
            descripcion: "Acceder al modulo de Mostrar o buscar Arqueo"
        },
        {
            permiso: "Crear Cliente",
            descripcion: "Acceder al modulo de Crear Cliente"
        },
        {
            permiso: "Actualizar Cliente",
            descripcion: "Acceder al modulo de Actualizar Cliente"
        },
        {
            permiso: "Borrar Cliente",
            descripcion: "Acceder al modulo de Borrar Cliente"
        },
        {
            permiso: "Mostrar y buscar Cliente",
            descripcion: "Acceder al modulo de Mostrar y buscar Cliente"
        },
        {
            permiso: "Crear Empleado",
            descripcion: "Acceder al modulo de Crear Empleado"
        },
        {
            permiso: "Actualizar Empleado",
            descripcion: "Acceder al modulo de Actualizar Empleado"
        },
        {
            permiso: "Borrar Empleado",
            descripcion: "Acceder al modulo de Borrar Empleado"
        },
        {
            permiso: "Mostrar y buscar Empleado",
            descripcion: "Acceder al modulo de Mostrar y buscar Empleado"
        },
        {
            permiso: "traer Factura",
            descripcion: "Acceder al modulo de traer Factura"
        },
        {
            permiso: "Ver tipo Pago",
            descripcion: "Acceder al modulo de Ver tipo Pago"
        },
        {
            permiso: "Insertar Factura",
            descripcion: "Acceder al modulo de Insertar Factura"
        },
        {
            permiso: "Convertir String",
            descripcion: "Acceder al modulo de Convertir String"
        },
        {
            permiso: "Crear Permiso",
            descripcion: "Acceder al modulo de Crear Permiso"
        },
        {
            permiso: "Actualizar Permiso",
            descripcion: "Acceder al modulo de Actualizar Permiso"
        },
        {
            permiso: "Bajar Permiso",
            descripcion: "Acceder al modulo de Bajar Permiso"
        },
        {
            permiso: "Mostrar o buscar Permiso",
            descripcion: "Acceder al modulo de Mostrar o buscar Permiso"
        },
        {
            permiso: "Crear Producto",
            descripcion: "Acceder al modulo de Crear Producto"
        },
        {
            permiso: "Actualizar Producto",
            descripcion: "Acceder al modulo de Actualizar Producto"
        },
        {
            permiso: "Borrar Producto",
            descripcion: "Acceder al modulo de Borrar Producto"
        },
        {
            permiso: "Mostrar y buscar Producto",
            descripcion: "Acceder al modulo de Mostrar y buscar Producto"
        },
        {
            permiso: "Crear roles",
            descripcion: "Acceder al modulo de Crear roles"
        },
        {
            permiso: "bajar roles",
            descripcion: "Acceder al modulo de bajar roles"
        },
        {
            permiso: "actualizar roles",
            descripcion: "Acceder al modulo de actualizar roles"
        },
        {
            permiso: "Mostrar y Buscar Roles",
            descripcion: "Acceder al modulo de Mostrar y Buscar Roles"
        },
        {
            permiso: "Crear Talonario",
            descripcion: "Acceder al modulo de Crear Talonario"
        },
        {
            permiso: "Actualizar Talonario",
            descripcion: "Acceder al modulo de Actualizar Talonario"
        },
        {
            permiso: "Borrar Talonario",
            descripcion: "Acceder al modulo de Borrar Talonario"
        },
        {
            permiso: "Mostrar y buscar Talonario",
            descripcion: "Acceder al modulo de Mostrar y buscar Talonario"
        },
        {
            permiso: "Crear Tipo pago",
            descripcion: "Acceder al modulo de Crear Tipo pago"
        },
        {
            permiso: "Actualizar Tipo pago",
            descripcion: "Acceder al modulo de Actualizar Tipo pago"
        },
        {
            permiso: "Borrar Tipo pago",
            descripcion: "Acceder al modulo de Borrar Tipo pago"
        },
        {
            permiso: "Mostrar y buscar Tipo pago",
            descripcion: "Acceder al modulo de Mostrar y buscar Tipo pago"
        },
        {
            permiso: "Crear tipo producto",
            descripcion: "Acceder al modulo de Crear tipo producto"
        },
        {
            permiso: "Actualizar tipo producto",
            descripcion: "Acceder al modulo de Actualizar tipo producto"
        },
        {
            permiso: "Borrar tipo producto",
            descripcion: "Acceder al modulo de Borrar tipo producto"
        },
        {
            permiso: "Mostrar y buscar tipo producto",
            descripcion: "Acceder al modulo de Mostrar y buscar tipo producto"
        },
        {
            permiso: "Crear Detalle Venta",
            descripcion: "Acceder al modulo de Crear Detalle Venta"
        },
        {
            permiso: "Mostrar detalle ventas",
            descripcion: "Acceder al modulo de Buscar detalle ventas"
        },
        {
            permiso: "Bajar Usuario",
            descripcion: "Acceder al modulo de Bajar Usuario"
        },
        {
            permiso: "Crear Usuario",
            descripcion: "Acceder al modulo de Crear Usuario"
        },

        {
            permiso: "Crear Venta",
            descripcion: "Acceder al modulo de Crear Venta"
        },
        {
            permiso: "Buscar o Mostrar ventas",
            descripcion: "Acceder al modulo de buscar Venta"
        },
        {
            permiso: "Traer o buscar  Factura",
            descripcion: "Acceder al modulo de Traer Factura"
        },
        {
            permiso: "Editar Factura",
            descripcion: "Acceder al modulo de Editar Factura"
        },
        {
            permiso: "Imprimir Factura",
            descripcion: "Acceder al modulo de Imprimir Factura"
        },
        ]);
        await role.addPermisos(permisos[0]);
        await role.addPermisos(permisos[1]);
        await role.addPermisos(permisos[2]);
        await role.addPermisos(permisos[3]);
        await role.addPermisos(permisos[4]);
        await role.addPermisos(permisos[5]);
        await role.addPermisos(permisos[6]);
        await role.addPermisos(permisos[7]);
        await role.addPermisos(permisos[8]);
        await role.addPermisos(permisos[9]);
        await role.addPermisos(permisos[10]);
        await role.addPermisos(permisos[11]);
        await role.addPermisos(permisos[12]);
        await role.addPermisos(permisos[13]);
        await role.addPermisos(permisos[14]);
        await role.addPermisos(permisos[15]);
        await role.addPermisos(permisos[16]);
        await role.addPermisos(permisos[17]);
        await role.addPermisos(permisos[18]);
        await role.addPermisos(permisos[19]);
        await role.addPermisos(permisos[20]);
        await role.addPermisos(permisos[21]);
        await role.addPermisos(permisos[22]);
        await role.addPermisos(permisos[23]);
        await role.addPermisos(permisos[24]);
        await role.addPermisos(permisos[25]);
        await role.addPermisos(permisos[26]);
        await role.addPermisos(permisos[27]);
        await role.addPermisos(permisos[28]);
        await role.addPermisos(permisos[29]);
        await role.addPermisos(permisos[30]);
        await role.addPermisos(permisos[31]);
        await role.addPermisos(permisos[32]);
        await role.addPermisos(permisos[33]);
        await role.addPermisos(permisos[34]);
        await role.addPermisos(permisos[35]);
        await role.addPermisos(permisos[36]);
        await role.addPermisos(permisos[37]);
        await role.addPermisos(permisos[38]);
        await role.addPermisos(permisos[39]);
        await role.addPermisos(permisos[40]);
        await role.addPermisos(permisos[41]);
        await role.addPermisos(permisos[42]);
        await role.addPermisos(permisos[43]);
        await role.addPermisos(permisos[44]);
        await role.addPermisos(permisos[45]);
        await role.addPermisos(permisos[46]);
        await role.addPermisos(permisos[47]);
        await role.addPermisos(permisos[48]);
        await role2.addPermisos(permisos[8]);
        await role2.addPermisos(permisos[9]);
        await role2.addPermisos(permisos[10]);
        await role2.addPermisos(permisos[11]);
        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento: Date("2002-20-2"),
            sexo: "M",
        });
        await RolePermiso.bulkCreate([{
            idRol: "2",
            idPermiso: "6"
        },{
            idRol: "2",
            idPermiso: "7"
        }]);
        await Empleado.create({
            id: 2,
            dni: "02013",
            nombre: "Erick",
            apellido: "Reyes",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento: Date("2002-20-2"),
            sexo: "M",
        });
        await Empleado.create({
            id: 3,
            dni: "1709-1995-00562",
            nombre: "Willian Josue",
            apellido: "Ortez Euceda",
            direccion: "San Lorenzo, Valle",
            telefono: "98139935",
            fechaNacimiento: Date("1995-08-07"),
            sexo: "M",
        });
        await User.create({
            usuario: "root",
            password: bcrypt.hashSync(config.secret, 8),
            email: "root@soft.com",
            idEmpleado: 1,
            idRol: 1
        });
        await User.create({
            usuario: "erick",
            password: bcrypt.hashSync(config.secret, 8),
            email: "erick@soft.com",
            idEmpleado: 2,
            idRol: 2
        });
        await User.create({
            usuario: "Willian Josue",
            password: bcrypt.hashSync(config.secret, 8),
            email: "wjoe1995@live.com",
            idEmpleado: 3,
            idRol: 1
        });
        //tipo de pago WJOE1995
        await TipoPag.create({
            idTipoPago: 1,
            tipoDePago: "Efectivo",
            descripcionTipoPago: "Pago en efectivo",
        });
        await TipoPag.create({
            idTipoPago: 2,
            tipoDePago: "Tarjeta Credito/Debito",
            descripcionTipoPago: "Pago con tarjeta de credito/debito",
        });
        await TipoPag.create({
            idTipoPago: 3,
            tipoDePago: "Credito",
            descripcionTipoPago: "Factura que sera pagada en determinado tiempo",
        });
        await Cliente.create({
            dni: "000",
            email: "email",
            rtn: "000",
            nombreCliente: "Consumidor Final",
            direccion: "Honduras",
            telefonoCliente: "0000-0000",
        });
        await Cliente.create({
            dni: "0611-1955-00493",
            email: "pedroortez174@gmail.com",
            rtn: "0611955004930",
            nombreCliente: "Pedro Juan",
            direccion: "San Lorenzo, Valle",
            telefonoCliente: "9825-6668"
        });
        await Cliente.create({
            dni: "1709-1969-00551",
            email: "anapastoraeuceda16@gmail.com",
            rtn: "17091969005512",
            nombreCliente: "Ana Pastora Euceda Mata",
            direccion: "El Tular, Nacaome, Valle",
            telefonoCliente: "8766-6076"
        });
        await Cliente.create({
            dni: "0611-1986-00847",
            email: "maytirivera0611@gmail.com",
            rtn: "0611986008472",
            nombreCliente: "Mayti Melissa Rivera Carbajal",
            direccion: "Los Limones, Pespire, Choluteca",
            telefonoCliente: "9998-9588"
        });
        await Sucursal.create({
            nombreSucursal: "X",
            lemaSucursal: "X"
        });
        await Talonario.create({
            rangoInicialFactura: "00110701",
            idSucursal: '1',
            rangoFinalFactura: "00112000",
            cai: "EAF199-B70479-5343AB-538F3E-045B55-C6",
            fechaLimiteEmision: "2025-06-03",
            active: true,
            isDelete: false
        });
        await Talonario.create({
            rangoInicialFactura: "00112001",
            idSucursal: '1',
            rangoFinalFactura: "00112500",
            cai: "EAF199-B70479-5343AB-538F3E-045C35-C6",
            fechaLimiteEmision: "2030-06-03",
            active: false,
            isDelete: false
        });
        await Sesion.create({
            fecha: "2020-06-03",
            token: "123456789",
            idUsuario: 1
        });
        await tipoProduc.create({
            tipoProducto: "Refresco",
            descripcionProducto: "Bebida con Soda",
            isvTipoProducto: 10
        });
        await tipoProduc.create({
            tipoProducto: "Embutidos",
            descripcionProducto: "Diferentes tipos de carnes",
            isvTipoProducto: 10
        });

        await tipoProduc.create({
            tipoProducto: "Lacteos",
            descripcionProducto: "Productos derivados de la leche",
            isvTipoProducto: 10
        });

        await product.create({
            codigoProducto: "1",
            nombreProducto: "Coca Cola",
            precioProducto: 18,
            cantidadProducto: 500,
            image:"images/1660425726953no-image.png",
            isvProducto: 10,
            descProducto: 0,
            isExcento: false,
            idTipoProducto: 1
        });
        await product.create({
            codigoProducto: "2",
            nombreProducto: "Mortadela",
            precioProducto: 25,
            cantidadProducto: 250,
            image:"images/1660425726953no-image.png",
            isvProducto: 10,
            descProducto: 0,
            isExcento: false,
            idTipoProducto: 2
        });
        await product.create({
            codigoProducto: "3",
            nombreProducto: "Mantequilla",
            precioProducto: 45,
            cantidadProducto: 250,
            image:"images/1660425726953no-image.png",
            isvProducto: 10,
            descProducto: 0,
            isExcento: false,
            idTipoProducto: 3
        });






        await Sesion.create({
            fecha: "2020-7-03",
            token: "123456789",
            idUsuario: 2
        });
        await Sesion.create({
            fecha: "2020-8-03",
            token: "123456789",
            idUsuario: 2
        });
        await Sesion.create({
            fecha: "2020-9-03",
            token: "123456789",
            idUsuario: 2
        });
        await Sesion.create({
            fecha: "2020-10-03",
            token: "123456789",
            idUsuario: 2
        });
        await Sesion.create({
            fecha: "2020-11-03",
            token: "123456789",
            idUsuario: 2
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: null,
            efectivoApertura: 25000,
            efectivoCierre: null,
            otrosPagos: null,
            ventaCredito: null,
            ventaTotal: null,
            efectivoTotal: null,
            idUsuario: 1,
            idSesion: 1,
            isActive: true
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: null,
            efectivoApertura: 20000,
            efectivoCierre: null,
            otrosPagos: null,
            ventaCredito: null,
            ventaTotal: null,
            efectivoTotal: null,
            idUsuario: 1,
            idSesion: 2,
            isActive: true
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: "2020-06-03",
            efectivoApertura: 10000,
            efectivoCierre: 10000,
            otrosPagos: 20000,
            ventaCredito: 2345,
            ventaTotal: 5678,
            efectivoTotal: 10000,
            idUsuario: 2,
            idSesion: 3,
            isActive: false
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: "2020-06-03",
            efectivoApertura: 10000,
            efectivoCierre: 10000,
            otrosPagos: 20000,
            ventaCredito: 2345,
            ventaTotal: 5678,
            efectivoTotal: 10000,
            idUsuario: 2,
            idSesion: 4,
            isActive: false
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: "2020-06-03",
            efectivoApertura: 10000,
            efectivoCierre: 10000,
            otrosPagos: 20000,
            ventaCredito: 2345,
            ventaTotal: 5678,
            efectivoTotal: 10000,
            idUsuario: 3,
            idSesion: 5,
            isActive: false
        });
        await Arqueo.create({
            fechaInicio: "2020-06-03",
            fechaFinal: "2020-06-03",
            efectivoApertura: 10000,
            efectivoCierre: 10000,
            otrosPagos: 20000,
            ventaCredito: 2345,
            ventaTotal: 5678,
            efectivoTotal: 10000,
            idUsuario: 3,
            idSesion: 6,
            isActive: false
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 5432.23,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 1
        });
        await Vents.create({
            totalISV: 500,
            totalVenta: 50000,
            totalDescuentoVenta: 5076.23,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 2
        });
        await Vents.create({
            totalISV: 2300,
            totalVenta: 23000,
            totalDescuentoVenta: 2376.23,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 3
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 5765.23,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 4
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 5654.23,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 4
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 4564.23,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 1
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 2345.53,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 2
        });
        await Vents.create({
            totalISV: 0,
            totalVenta: 45000.23,
            totalDescuentoVenta: 0,
            puntoDeEmision: "001",
            establecimiento: "001",
            tipo: "01",
            idSesion: 1,
            idUsuario: 1,
            idCliente: 3
        });

        await detallevent.create({
            cantidad: 2,
            precioUnitario: 18,
            isvAplicado: 10,
            descuentoAplicado: 10,
            totalDetalleVenta: 36,
            idVentas: 1,
            idProducto: 1
        });


        await detallevent.create({
            cantidad: 3,
            precioUnitario: 25,
            isvAplicado: 10,
            descuentoAplicado: 0,
            totalDetalleVenta: 75,
            idVentas: 1,
            idProducto: 2
        });

        await detallevent.create({
            cantidad: 1,
            precioUnitario: 45,
            isvAplicado: 10,
            descuentoAplicado: 0,
            totalDetalleVenta: 45,
            idVentas: 1,
            idProducto: 3
        });
        await detallevent.create({
            cantidad: 5,
            precioUnitario: 18,
            isvAplicado: 10,
            descuentoAplicado: 10,
            totalDetalleVenta: 90,
            idVentas: 2,
            idProducto: 1
        });
        await detallevent.create({
            cantidad: 7,
            precioUnitario: 25,
            isvAplicado: 10,
            descuentoAplicado: 10,
            totalDetalleVenta: 175,
            idVentas: 2,
            idProducto: 1
        });
        await detallevent.create({
            cantidad: 4,
            precioUnitario: 45,
            isvAplicado: 10,
            descuentoAplicado: 10,
            totalDetalleVenta: 180,
            idVentas: 2,
            idProducto: 1
        });




    
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110701',
                numero: '001-00110701',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110702',
                numero: '001-00110702',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110703',
                numero: '001-00110703',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110704',
                numero: '001-00110704',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110705',
                numero: '001-00110705',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110706',
                numero: '001-00110706',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110707',
                numero: '001-00110707',
                idTalonario: 1,
            });
            await Numer.create({
                puntoEmision: '000',
                establecimiento: '001',
                tipo: '01',
                correlativo: '00110708',
                numero: '001-00110708',
                idTalonario: 1,
            });

            await Fact.create({
                idFactura: 1,
                numeroFactura: "001-00110701",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 5432.23,
                subTotalFactura: 5432.23,
                cantidadLetras: "CINCO MIL TRESCIENTOS TREINTA Y DOS SOLES CON 23/100",
                estado: true,
                idTipoPago: 1,
                idCliente: 1,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 1,
                idTalonario: 1,
                idNumero: 1,
       
            });
            await Fact.create({
                idFactura: 2,
                numeroFactura: "001-00110702",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 50000,
                subTotalFactura: 50000,
                cantidadLetras: "CINCUENTA MIL 00/100",
                estado: true,
                idTipoPago: 1,
                idCliente: 2,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 2,
                idTalonario: 1,
                idNumero: 2,
              
            });
            await Fact.create({
                idFactura: 3,
                numeroFactura: "001-00110703",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 23000,
                subTotalFactura: 23000,
                cantidadLetras: "VEINTITRES MIL 00/100",
                estado: true,
                idTipoPago: 2,
                idCliente: 3,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 3,
                idTalonario: 1,
                idNumero: 3,
              
            });
            await Fact.create({
                idFactura: 4,
                numeroFactura: "001-00110704",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 5654.23,
                subTotalFactura: 5654.23,
                cantidadLetras: "CINCO MIL SEISCIENTOS CINCUENTA Y CUANTRO 23/100",
                estado: true,
                idTipoPago: 2,
                idCliente: 4,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 4,
                idTalonario: 1,
                idNumero: 4,
            
            });
            await Fact.create({
                idFactura: 5,
                numeroFactura: "001-00110705",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 7654.23,
                subTotalFactura: 7654.23,
                cantidadLetras: "SIETE MIL SEISCIENTOS CINCUENTA Y CUANTRO 23/100",
                estado: true,
                idTipoPago: 3,
                idCliente: 2,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 5,
                idTalonario: 1,
                idNumero: 5,
          
            });
            await Fact.create({
                idFactura: 6,
                numeroFactura: "001-00110706",
                fechaFactura: "2020-06-03",
                descuentoTotalFactura: 0,
                isvTotalFactura: 0,
                totalFactura: 8654.23,
                subTotalFactura: 8654.23,
                cantidadLetras: "OCHO MIL SEISCIENTOS CINCUENTA Y CUANTRO 23/100",
                estado: true,
                idTipoPago: 3,
                idCliente: 4,
                idUsuario: 1,
                idEmpleado: 1,
                idVenta: 6,
                idTalonario: 1,
                idNumero: 6,
           
            });
        } catch (error) {
            console.log(error);
        }


    };