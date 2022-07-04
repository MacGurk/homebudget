import express from 'express';
import api from './api';
import {createMapping} from './mappings/mapper';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

createMapping();

export default app;
