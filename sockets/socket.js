const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConnectado, usuarioDesconnectado, saveMessage } = require('../controllers/socket');

//Mensajes de Sockets
io.on('connection', client => {

    //Verificar autenticacion
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) { return client.disconnect(); }

    //Cliente autenticado
    usuarioConnectado(uid);

    //Ingresar usuario a sala chat particular
    //sala global. client.uid
    client.join(uid);

    //Escuchar mensaje del cliente
    client.on('mensaje-personal', async (payload) => {
        await saveMessage(payload)
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconnectado(uid);
    });
});