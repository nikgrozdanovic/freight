import express from 'express';

const app = express();

app.get('/', (req: Request) => {
    console.log(req.url);
})

app.listen(3001, () => {
    console.log('started')
});