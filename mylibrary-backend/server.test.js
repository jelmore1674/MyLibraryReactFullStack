const app = require('./server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

describe('GET / Server Is Working', () => {
    // Should Return Server is Working
    it('get the / route', async() => {
        const response = await request.get('/');

        expect(response.status).toEqual(200);
        expect(response.body).toBe('Server is working');
    });
});

describe('POST /register', () => {
    it('should return 401 if no email, password, or name is provided', async() => {
        const response = await request.post('/register').send({
            name: 'Justin',
            email: 'justin@gmail.com',
        });
        expect(response.status).toEqual(401);
        expect(response.body).toBe('Missing credentials');
    });

    it('should return 201', async() => {
        const user = {
            name: 'Justin',
            email: 'justin@gmail.com',
            password: 'me',
        };
        const response = await request.post('/register').send(user);
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                userid: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
            })
        );
    });
});

describe('POST /signin', () => {
    const login = {
        email: 'justin@gmail.com',
        password: 'me',
    };
    it('should return 202', async() => {
        const res = await request.post('/signin').send(login);
        expect(res.status).toEqual(202);
    });
    it('should return user object', async() => {
        const res = await request.post('/signin').send(login);
        expect(res.body).toEqual(
            expect.objectContaining({
                userid: expect.any(Number),
                email: expect.any(String),
                name: expect.any(String),
            })
        );
    });
});

describe('/library-item Route', () => {
    describe('GET /library-item/:userid Route', () => {
        it('should return array of books', async() => {
            const res = await request.get('/library-item/3');
            expect(res.body).toContainEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    title: expect.any(String),
                    author: expect.any(String),
                    pages: expect.any(Number),
                    completed: expect.any(Boolean),
                    userid: expect.any(Number),
                })
            );
        });
        it('should return status 202', async() => {
            const res = await request.get('/library-item/3');
            expect(res.status).toEqual(202);
        });
    });
    describe('POST /library-item/ Route', () => {
        const newBook = {
            userid: 3,
            title: 'dummy',
            author: 'dummy',
            pages: 45,
            completed: false,
            email: 'justin@gmail.com',
        };
        it('should return status 201', async() => {
            const res = await request.post('/library-item').send(newBook);
            expect(res.status).toEqual(201);
        });
        it('should return successfully added book', async() => {
            const res = await request.post('/library-item').send(newBook);
            expect(res.body).toBe('Successfully added book');
        });
    });
});