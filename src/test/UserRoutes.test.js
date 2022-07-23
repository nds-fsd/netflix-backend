const supertest = require('supertest');
const { app, server } = require('../index');
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require('../mongo');
const { User, generateJWT } = require('../mongo/schemas/user');



describe('User Router TEST', () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        if (connectionError) console.log(connectionError);
    });
    afterAll(async () => {
        await disconnectDB();
        server.close();
    });

    let adminUser;
    let adminHeaders;

    it('ADMIN user exists', async () => {
        adminUser = await User.findOne({ role: "ADMIN" });
        expect(adminUser).toBeDefined();
        expect(adminUser.email).toBe('admin@fakeflix.com');
        adminHeaders = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + generateJWT(adminUser)
        }
    })
    let normalUser;
    let normalUserHeaders;

    describe('POST /user', () => {
        it('ADMIN can create new USER', async () => {
            const res = await fakeRequest.post('/user').set(adminHeaders).send({
                name: 'Jose Manuel',
                email: 'jcano@nuclio.com',
                password: 'nuclio',
            });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Jose Manuel');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
            normalUser = res.body;
            normalUserHeaders = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + generateJWT(normalUser)
            }
        });

        it('USER can not create new USER', async () => {
            const res = await fakeRequest.post('/user').set(normalUserHeaders).send({
                name: 'Jose Manuel',
                email: 'jcano2@nuclio.com',
                password: 'nuclio',
            });
            expect(res.status).toBe(403);
        });
    });
    describe('GET /user', () => {
        it('ADMIN can get all USERS', async () => {
            const res = await fakeRequest.get('/user').set(adminHeaders);
            expect(res.status).toBe(200);
        });

        it('ADMIN can get a USER', async () => {
            const res = await fakeRequest.get(`/user/${normalUser._id}`).set(adminHeaders);
            expect(res.status).toBe(200);

        }
        );
        it('USER can get profile', async () => {
            const res = await fakeRequest.get(`/user/${normalUser._id}`).set(normalUserHeaders);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Jose Manuel');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
        });

        it('USER cant get other profile', async () => {
            const res = await fakeRequest.get(`/user/${adminUser._id}`).set(normalUserHeaders);
            expect(res.status).toBe(403);
        });

    });
    let normalUserToFailUpdate;
    let normalUsertoFailUpdateHeaders;

    describe('PATCH /user', () => {

        it('ADMIN create a dummy USER to fail update later', async () => {
            const res = await fakeRequest.post('/user').set(adminHeaders).send({
                name: 'Pedro',
                email: 'Pedro@collaso.com',
                password: 'nuclio',
            });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Pedro');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
            normalUserToFailUpdate = res.body;
            normalUsertoFailUpdateHeaders = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + generateJWT(normalUserToFailUpdate)
            }
        })

        it('ADMIN can update a USER', async () => {
            const res = await fakeRequest.patch(`/user/${normalUser._id}`).set(adminHeaders).send({
                name: 'Jose Manuel2',
            });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Jose Manuel2');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
        })

        it('ADMIN can update his profile', async () => {
            const res = await fakeRequest.patch(`/user/${adminUser._id}`).set(adminHeaders).send({
                name: 'Jose Manuel2',
            });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Jose Manuel2');
            expect(res.body.role).toBe('ADMIN');
            expect(res.body.password).not.toBe('nuclio');
        })

        it('User can update his profile', async () => {
            const res = await fakeRequest.patch(`/user/${normalUser._id}`).set(normalUserHeaders).send({
                name: 'Jose Manuel2',
            });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Jose Manuel2');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
        })

        it('User cant update other profile', async () => {
            const res = await fakeRequest.patch(`/user/${adminUser._id}`).set(normalUserHeaders).send({
                name: 'Jose Manuel2',
            });
            expect(res.status).toBe(403);
        })

    });

    let normalUserToDelete;
    let normalUserToDeleteHeaders;


    describe('DELETE /user', () => {

        it('ADMIN create a dummy USER', async () => {
            const res = await fakeRequest.post('/user').set(adminHeaders).send({
                name: 'Arian',
                email: 'Arian@collaso.com',
                password: 'nuclio',
            });
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Arian');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
            normalUserToDelete = res.body;
            normalUserToDeleteHeaders = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + generateJWT(normalUserToDelete)
            }
        })

        it('ADMIN can update a USER', async () => {
            const res = await fakeRequest.patch(`/user/${normalUserToDelete._id}`).set(adminHeaders).send({
                favs: ['62aa4330b220a5b8dbced19b'],
            });
            expect(res.status).toBe(200);
            expect(res.body.favs[0]).toBe('62aa4330b220a5b8dbced19b');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
            normalUserToDelete = res.body;
        })

        it('USER can delete his profile', async () => {
            const res = await fakeRequest.delete(`/user/${normalUser._id}`).set(normalUserHeaders);
            expect(res.status).toBe(204)
        })

        it('USER can not delete other profile', async () => {
            const res = await fakeRequest.delete(`/user/${normalUserToDelete._id}`).set(normalUserHeaders);
            expect(res.status).toBe(403)
        })

        it('ADMIN can delete a USER FAV Movie', async () => {
            const res = await fakeRequest.delete(`/user/${normalUserToDelete._id}/favs/${normalUserToDelete.favs[0]}`).set(adminHeaders);
            expect(res.status).toBe(204);
        })

        it('ADMIN can update a USER', async () => {
            const res = await fakeRequest.patch(`/user/${normalUserToDelete._id}`).set(adminHeaders).send({
                favs: ['62aa4330b220a5b8dbced19b'],
            });
            expect(res.status).toBe(200);
            expect(res.body.favs[0]).toBe('62aa4330b220a5b8dbced19b');
            expect(res.body.role).toBe('USER');
            expect(res.body.password).not.toBe('nuclio');
            normalUserToDelete = res.body;
        })

        it('USER can not delete a another USER Fav Movie', async () => {
            const res = await fakeRequest.delete(`/user/${normalUserToDelete._id}/favs/${normalUserToDelete.favs[0]}`).set(normalUserHeaders);
            expect(res.status).toBe(403);
        })

        it('USER can delete a Fav Movie', async () => {
            console.log(`Estos son los datos del usuario: ${normalUserToDelete.favs[0]}`);
            const res = await fakeRequest.delete(`/user/${normalUserToDelete._id}/favs/${normalUserToDelete.favs[0]}`).set(normalUserToDeleteHeaders);
            expect(res.status).toBe(204);
        })

        it('ADMIN can delete a user', async () => {
            const res = await fakeRequest.delete(`/user/${normalUserToDelete._id}`).set(adminHeaders);
            expect(res.status).toBe(204);
        })


    });
});

