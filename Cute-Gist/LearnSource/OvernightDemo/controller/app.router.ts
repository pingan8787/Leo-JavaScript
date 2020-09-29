import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {res.send('Hello get!')});
router.post('/', (req: Request, res: Response) => {res.send('Hello post!')});
router.put('/', (req: Request, res: Response) => {res.send('Hello put!')});
router.delete('/', (req: Request, res: Response) => {res.send('Hello delete!')});
router.get('/user', (req: Request, res: Response) => {res.send('Hello api/user!')});

export default router;